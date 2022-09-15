import React, { useEffect, useState } from 'react';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import Main from '~/components/Main/Main';
import GlobalStyle from '~/styles/common/GlobalStyle';
import { QuotesAPI } from '~/services/quotesApi';
import { IAuthService, IUserInfo } from '~/services/authService';
import { IFirebaseDB } from '~/services/database';
import { getStorageData, saveStorageData } from '~/utils/sessionStorage';
import { onAuthStateChanged } from 'firebase/auth';
import LoginBox from '~/components/LoginModal/LoginModal';
import { CardPositionType, QuoteData, QuoteStateType, ResponseQuote } from './types/interface';

const quotesAPI = new QuotesAPI();
interface IProps {
    authService: IAuthService;
    firebaseDB: IFirebaseDB;
}

const App = ({ authService, firebaseDB }: IProps) => {
    const [isLoginBoxOpen, setIsLoginBoxOpen] = useState<boolean>(false);
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [quoteHistory, setQuoteHistory] = useState<QuoteData[]>([]);
    const [exposedCard, setExposedCard] = useState<CardPositionType>("front");
    const [favoriteQuotes, setFavoriteQuotes] = useState<QuoteData[]>([]);
    const [quoteData, setQuoteData] = useState<QuoteStateType>({
        front: null,
        back: null
    });
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        displayName: null,
        photoURL: null,
        uid: null
    });

    const handleNav = (): void => setIsNavOpen(state => !state);
    const handleLoginBox = (): void => setIsLoginBoxOpen((prev) => !prev);

    const onChangeFavorite = (target: QuoteData) => {
        // 선택된 quote의 favorite 값 반대로 변환
        const willChangeQuote = { 
            ...target,
            favorite: !target.favorite
        };

        // history에 변경사항 반영
        const newHistory = quoteHistory.map((item: QuoteData) => {
            return item.id === willChangeQuote.id ? willChangeQuote : item;
        });

        // favorite에 변경사항 반영
        const newFavorite = [ ...favoriteQuotes ];
        const matchedIndexInFavorite = newFavorite.findIndex(item => item.id === willChangeQuote.id);
        if(matchedIndexInFavorite !== -1) {
            newFavorite.splice(matchedIndexInFavorite, 1);
        } else {
            newFavorite.unshift(willChangeQuote);
        }

        // 선택된 Quote가 현재 디스플레이되고 있다면 반영
        const cardPosition = quoteData.front?.id === willChangeQuote.id 
        ? "front" : quoteData.back?.id === willChangeQuote.id 
        ? "back" : null;
        
        if(cardPosition) {
            const newQuoteData = { ...quoteData };
            cardPosition === "front" ? newQuoteData.front = willChangeQuote : newQuoteData.back = willChangeQuote;
            setQuoteData(newQuoteData);
        }
        
        setQuoteHistory(newHistory);
        setFavoriteQuotes(newFavorite);
        saveUserData(newHistory, newFavorite);
    };

    const updateHistory = (newItem: QuoteData) => {
        let newHistory: Array<QuoteData> = quoteHistory.filter(quote => quote.id !== newItem.id);
        
        if(quoteHistory.length > 9) {
            newHistory = newHistory.slice(0, 9);
        } 

        newHistory.unshift(newItem);
        setQuoteHistory(newHistory);

        if(userInfo.uid) {
            saveUserData(newHistory);
        } else {
            saveStorageData(newHistory);
        }
    }

    const checkFavoriteQuote = (resQuote: ResponseQuote) => {
        const currentQuote = {
            ...resQuote,
            favorite: false
        };

        if(favoriteQuotes.some(item => item.id === resQuote.id)) {
            currentQuote.favorite = true;
        }

        return currentQuote;
    }

    const requestData = async (id?: string): Promise<any> => {
        try {
            const resData = await quotesAPI.getQuotesData(id);
            if (resData) {
                const newQuote = checkFavoriteQuote(resData);

                exposedCard === "front" 
                ? setQuoteData({...quoteData, back: newQuote}) 
                : setQuoteData({...quoteData, front: newQuote});

                setExposedCard((prevState) => prevState === "front" ? "back" : "front");
                updateHistory(newQuote);
                return true;
            }
        } catch (error) {
            alert("데이터를 요청 하던 도중 에러가 발생했습니다.");
            return false;
        }
    }

    const onLogin = async (): Promise<void> => {
        const userInfo = await authService.requestLogin();
        if(userInfo) {
            setUserInfo(userInfo);
            setIsLoggedIn(true);
            if(userInfo.uid) {
                getUserData(userInfo.uid);
            }
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
            setQuoteHistory([]);
            setFavoriteQuotes([]);
            setIsLoggedIn(false);
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
        });
    }

    const onClickNavContent = (target: QuoteData): void => {
        const displayedQuote = exposedCard === "front" ? quoteData.front : quoteData.back;
        if(displayedQuote?.id !== target.id) {
            requestData(target.id);
        }
    }

    const initData = async () => {
        const storageData: QuoteData[] | null = getStorageData();
        if(storageData) {
            const mostRecentData = storageData[0];
            setQuoteHistory(storageData);
            setQuoteData({
                ...quoteData,
                front: mostRecentData
            });
        } else {
            try {
                const resData = await quotesAPI.getQuotesData();
                if(resData) {
                    const newQuote = checkFavoriteQuote(resData);
                    setQuoteData({ ...quoteData, front: newQuote });
                    updateHistory(newQuote);
                }
            } catch (error) {
                alert("데이터를 요청 하던 도중 에러가 발생했습니다.");
                return false;
            }
        }
    }

    const saveUserData = (newHistory?: QuoteData[], newFavorite?: QuoteData[]) => {
        const newHis = newHistory ? newHistory : quoteHistory;
        const newFav = newFavorite ? newFavorite : favoriteQuotes;
        if(userInfo.uid) {
            firebaseDB.writeUserData(userInfo.uid, newHis, newFav);
        }
    }

    const getUserData = async (userId: string): Promise<void> => {
        const { history, favorite } = await firebaseDB.readUserData(userId);
        if(history && favorite) {
            setQuoteHistory(history);
            setFavoriteQuotes(favorite);
        }
    }

    useEffect(() => {
        checkUserInfo();
        initData();
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
                    isNavOpen={isNavOpen} 
                    quoteData={quoteData}
                    quoteHistory={quoteHistory}
                    exposedCard={exposedCard}
                    isLoggedIn={isLoggedIn}
                    userInfo={userInfo}
                    favoriteQuotes={favoriteQuotes}
                    requestData={requestData}
                    handleNav={handleNav}
                    handleLoginBox={handleLoginBox}
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