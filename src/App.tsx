import React, { useCallback, useEffect, useRef, useState } from 'react';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import Main from '~/components/Main/Main';
import LoginBox from '~/components/LoginModal/LoginModal';
import GlobalStyle from '~/styles/common/GlobalStyle';
import { QuotesAPI } from '~/services/quotesApi';
import { getStorageData, saveStorageData } from '~/utils/sessionStorage';
import { onAuthStateChanged } from 'firebase/auth';
import { rotateRegex } from './constants/regex';
import { FirebaseDB } from './services/database';
import { CardPositionType, ChevronEventType, IUserInfo, UserQuotesType } from './types/user.type';
import { IAuthService, ProviderNames } from './types/auth.type';
import { DisplayQuotesType, IQuoteContent, ResponseQuote } from './types/quote.type';

interface IProps {
    authService: IAuthService;
    firebaseDB: FirebaseDB;
    quotesAPI: InstanceType<typeof QuotesAPI>;
}

const App = ({ authService, firebaseDB, quotesAPI }: IProps) => {
    const cardWrapperRef = useRef<HTMLDivElement | null>(null);
    const [isLoginBoxOpen, setIsLoginBoxOpen] = useState<boolean>(false);
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userQuotes, setUserQuotes] = useState<UserQuotesType>({
        history: [],
        favorite: []
    });
    const [cardPosition, setCardPosition] = useState<CardPositionType>("front");
    const [displayQuotes, setDisplayQuotes] = useState<DisplayQuotesType>({
        front: null,
        back: null
    });
    const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

    const handleNav = useCallback(() => setIsNavOpen(state => !state), []);
    const handleLoginBox = useCallback(() => setIsLoginBoxOpen((prev) => !prev), []);

    const onChangeFavorite = (target: IQuoteContent) => {
        // 선택된 quote의 favorite 값 반대로 변환
        const willChangeQuote = { 
            ...target,
            favorite: !target.favorite
        };

        // history에 변경사항 반영
        const newHistory = userQuotes.history.map((item: IQuoteContent) => {
            return item.id === willChangeQuote.id ? willChangeQuote : item;
        });

        // favorite에 변경사항 반영
        const newFavorite = [ ...userQuotes.favorite ];
        const matchedIndexInFavorite = newFavorite.findIndex(item => item.id === willChangeQuote.id);
        if(matchedIndexInFavorite !== -1) {
            newFavorite.splice(matchedIndexInFavorite, 1);
        } else {
            newFavorite.unshift(willChangeQuote);
        }

        // 선택된 Quote가 현재 디스플레이되고 있다면 반영
        const cardPosition = displayQuotes.front?.id === willChangeQuote.id 
        ? "front" : displayQuotes.back?.id === willChangeQuote.id 
        ? "back" : null;
        
        if(cardPosition) {
            const newQuoteData = { ...displayQuotes };
            cardPosition === "front" ? newQuoteData.front = willChangeQuote : newQuoteData.back = willChangeQuote;
            setDisplayQuotes(newQuoteData);
        }

        const newUserQuotes = {
            history: newHistory,
            favorite: newFavorite
        };
        
        setUserQuotes(newUserQuotes);
        saveUserData(newUserQuotes);
    };

    const updateHistory = (newItem: IQuoteContent) => {
        setUserQuotes((prevState) => {
            const newUserQuotes = { ...prevState };

            const filteredList = prevState.history
                .filter(quote => quote.id !== newItem.id)
                .slice(0, 9);

            newUserQuotes.history = [newItem, ...filteredList];

            // Anti-pattern
            saveUserData(newUserQuotes);

            return newUserQuotes;
        });
    }

    const checkFavoriteQuote = (resQuote: ResponseQuote) => {
        const currentQuote = {
            ...resQuote,
            favorite: false
        };

        if(userQuotes.favorite.some(item => item.id === resQuote.id)) {
            currentQuote.favorite = true;
        }

        return currentQuote;
    }

    const requestData = async (id?: string): Promise<any> => {
        try {
            const resData = await quotesAPI.getQuotesData(id);
            if (resData) {
                const newQuote = checkFavoriteQuote(resData);

                setCardPosition((prevState) => {
                    const nextPosition = prevState === 'front' ? 'back' : 'front';

                    // Anti-Pattern
                    setDisplayQuotes({
                        ...displayQuotes,
                        [nextPosition]: newQuote
                    });

                    return nextPosition;
                });

                updateHistory(newQuote);
                handleCardFilp();

                return true;
            }
        } catch (error) {
            alert("데이터를 요청 하던 도중 에러가 발생했습니다.");
            return false;
        }
    }

    const onLogin = async (providerName: ProviderNames): Promise<void> => {
        const userInfo = await authService.requestLogin(providerName);
        if(userInfo) {
            setUserInfo(userInfo);
            setIsLoggedIn(true);

            if(userInfo.uid) getUserData(userInfo.uid);
        }
    }

    const onLogout = async (): Promise<void> => {
        const status = await authService.requestLogout();

        if(status) {
            setUserInfo(null);
            setUserQuotes({
                history: [],
                favorite: []
            });
            setIsLoggedIn(false);
            window.alert("로그아웃 되었습니다.");
            return;
        }

        alert("로그아웃 도중 에러가 발생했습니다.");
    }

    const checkUserInfo = () => {
        onAuthStateChanged(authService.auth, (user) => {
            if(user && user.displayName && user.photoURL) {
                const { displayName, photoURL, uid } = user;
                setUserInfo({ displayName, photoURL, uid });
                setIsLoggedIn(true);
                getUserData(user.uid);
                return;
            }

            setIsLoggedIn(false);
            initData();
        });
    }

    const onClickNavContent = (targetQuote: IQuoteContent): void => {
        if(displayQuotes[cardPosition]?.id === targetQuote.id) return;

        cardPosition === "front" 
        ? setDisplayQuotes({...displayQuotes, back: targetQuote}) 
        : setDisplayQuotes({...displayQuotes, front: targetQuote});

        setCardPosition((prevState) => prevState === "front" ? "back" : "front");
        updateHistory(targetQuote);
        handleCardFilp();
    }

    const handleCardFilp = (direction: ChevronEventType = "next"): void => {
        if(cardWrapperRef.current) {
            const matched = cardWrapperRef.current.style.transform.match(rotateRegex);
            const prevValue = matched ? +matched[0] : 0;
            const newValue = direction === "prev" ? prevValue - 0.5 : prevValue + 0.5;

            cardWrapperRef.current.style.transform = `rotateY(${newValue}turn)`;
        }
    }

    const initData = () => {
        const savedUserData = getStorageData();

        if(savedUserData) {
            const recentQuote = savedUserData.history[0];
            setUserQuotes(savedUserData);
            setDisplayQuotes({
                ...displayQuotes,
                back: recentQuote
            });
            setCardPosition((prevState) => prevState === "front" ? "back" : "front");
            handleCardFilp();
            return;
        }

        requestData();
    }

    const saveUserData = (newUserQuotes: UserQuotesType) => {
        if(userInfo) {
            firebaseDB.writeUserData(userInfo.uid, newUserQuotes);
            return;
        }

        saveStorageData(newUserQuotes);
    }

    const getUserData = async (userId: string): Promise<void> => {
        const userData = await firebaseDB.readUserData(userId);

        if(userData) {
            const recentQuote = userData.history[0];
            setUserQuotes(userData);
            setDisplayQuotes({
                ...displayQuotes,
                back: recentQuote
            });
            setCardPosition((prevState) => prevState === "front" ? "back" : "front");
            handleCardFilp();
            return;
        }

        initData();
    }

    useEffect(() => {
        checkUserInfo();
    }, []);

    return (
        <>
            <GlobalStyle />
                <Header 
                    isNavOpen={isNavOpen} 
                    isLoggedIn={isLoggedIn}
                    handleNav={handleNav}
                    handleLoginBox={handleLoginBox}
                    onLogout={onLogout}
                />
                <Main 
                    cardWrapperRef={cardWrapperRef}
                    isNavOpen={isNavOpen} 
                    displayQuotes={displayQuotes}
                    userQuotes={userQuotes}
                    cardPosition={cardPosition}
                    isLoggedIn={isLoggedIn}
                    userInfo={userInfo}
                    requestData={requestData}
                    handleNav={handleNav}
                    handleLoginBox={handleLoginBox}
                    handleCardFilp={handleCardFilp}
                    onLogout={onLogout}
                    onChangeFavorite={onChangeFavorite}
                    onClickNavContent={onClickNavContent}
                />
                <Footer />
                {
                    isLoginBoxOpen &&
                    <LoginBox 
                        onLogin={onLogin}
                        handleLoginBox={handleLoginBox}
                    />
                }
        </>
    );
};

export default App;