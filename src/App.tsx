import React, { useCallback, useEffect, useRef, useState } from 'react';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import Main from '~/components/Main/Main';
import LoginBox from '~/components/LoginModal/LoginModal';
import GlobalStyle from '~/styles/common/GlobalStyle';
import { QuotesAPI } from '~/services/quotesApi';
import { getStorageData, saveStorageData } from '~/utils/sessionStorage';
import { onAuthStateChanged } from 'firebase/auth';
import { IAuthService, IFirebaseDB, IQuoteData, IQuotesState, IResponseQuote, IUserInfo } from '~/types/interface';
import { CardPositionType, ChevronEventType, ProviderNames } from '~/types/type';
import { rotateRegex } from './utils/regexPatterns';

interface IProps {
    authService: IAuthService;
    firebaseDB: IFirebaseDB;
    quotesAPI: InstanceType<typeof QuotesAPI>;
}

const App = ({ authService, firebaseDB, quotesAPI }: IProps) => {
    const cardWrapperRef = useRef<HTMLDivElement | null>(null);
    const [isLoginBoxOpen, setIsLoginBoxOpen] = useState<boolean>(false);
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [historyList, setHistoryList] = useState<IQuoteData[]>([]);
    const [cardPosition, setCardPosition] = useState<CardPositionType>("front");
    const [favoriteList, setFavoriteList] = useState<IQuoteData[]>([]);
    const [displayQuotes, setDisplayQuotes] = useState<IQuotesState>({
        front: null,
        back: null
    });
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        displayName: null,
        photoURL: null,
        uid: null
    });

    const handleNav = useCallback(() => setIsNavOpen(state => !state), []);
    const handleLoginBox = useCallback(() => setIsLoginBoxOpen((prev) => !prev), []);

    const onChangeFavorite = (target: IQuoteData) => {
        // 선택된 quote의 favorite 값 반대로 변환
        const willChangeQuote = { 
            ...target,
            favorite: !target.favorite
        };

        // history에 변경사항 반영
        const newHistory = historyList.map((item: IQuoteData) => {
            return item.id === willChangeQuote.id ? willChangeQuote : item;
        });

        // favorite에 변경사항 반영
        const newFavorite = [ ...favoriteList ];
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
        
        setHistoryList(newHistory);
        setFavoriteList(newFavorite);
        saveUserData(newHistory, newFavorite);
    };

    const updateHistory = (newItem: IQuoteData) => {
        let newHistory: Array<IQuoteData> = historyList.filter(quote => quote.id !== newItem.id);
        
        if(historyList.length > 9) {
            newHistory = newHistory.slice(0, 9);
        }

        newHistory.unshift(newItem);
        setHistoryList(newHistory);
        saveUserData(newHistory);
    }

    const checkFavoriteQuote = (resQuote: IResponseQuote) => {
        const currentQuote = {
            ...resQuote,
            favorite: false
        };

        if(favoriteList.some(item => item.id === resQuote.id)) {
            currentQuote.favorite = true;
        }

        return currentQuote;
    }

    const requestData = async (id?: string): Promise<any> => {
        try {
            const resData = await quotesAPI.getQuotesData(id);
            if (resData) {
                const newQuote = checkFavoriteQuote(resData);

                cardPosition === "front" 
                ? setDisplayQuotes({...displayQuotes, back: newQuote}) 
                : setDisplayQuotes({...displayQuotes, front: newQuote});

                setCardPosition((prevState) => prevState === "front" ? "back" : "front");
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
            setUserInfo({
                displayName: null,
                photoURL: null,
                uid: null
            });
            setHistoryList([]);
            setFavoriteList([]);
            setIsLoggedIn(false);
            window.alert("로그아웃 되었습니다.");
            return;
        }

        alert("로그아웃 도중 에러가 발생했습니다.");
    }

    const checkUserInfo = () => {
        onAuthStateChanged(authService.auth, (user) => {
            if(user) {
                setUserInfo({
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    uid: user.uid
                });
                setIsLoggedIn(true);
                getUserData(user.uid);
                return;
            }

            setIsLoggedIn(false);
            initData();
        });
    }

    const onClickNavContent = (targetQuote: IQuoteData): void => {
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
        const { history, favorite } = getStorageData();

        if(history && favorite) {
            const recentQuote = history[0];
            setHistoryList(history);
            setFavoriteList(favorite);
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

    const saveUserData = (history?: IQuoteData[], favorite?: IQuoteData[]) => {
        const newHistory = history ? history : historyList;
        const newFavorite = favorite ? favorite : favoriteList;

        if(userInfo.uid) {
            firebaseDB.writeUserData(userInfo.uid, newHistory, newFavorite);
            return;
        }

        saveStorageData(newHistory, newFavorite);
    }

    const getUserData = async (userId: string): Promise<void> => {
        const { history, favorite } = await firebaseDB.readUserData(userId);

        if(history && favorite) {
            const recentQuote = history[0];
            setHistoryList(history);
            setFavoriteList(favorite);
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
                    historyList={historyList}
                    cardPosition={cardPosition}
                    isLoggedIn={isLoggedIn}
                    userInfo={userInfo}
                    favoriteList={favoriteList}
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