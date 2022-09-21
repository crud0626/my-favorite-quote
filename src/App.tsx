import React, { useEffect, useState } from 'react';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import Main from '~/components/Main/Main';
import LoginBox from '~/components/LoginModal/LoginModal';
import GlobalStyle from '~/styles/common/GlobalStyle';
import { QuotesAPI } from '~/services/quotesApi';
import { IFirebaseDB } from '~/services/database';
import { getStorageData, saveStorageData } from '~/utils/sessionStorage';
import { onAuthStateChanged } from 'firebase/auth';
import { IAuthService, IQuoteData, IQuotesState, IResponseQuote, IUserInfo } from '~/types/interface';
import { CardPositionType } from '~/types/type';

const quotesAPI = new QuotesAPI();

interface IProps {
    authService: IAuthService;
    firebaseDB: IFirebaseDB;
}

const App = ({ authService, firebaseDB }: IProps) => {
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

    const handleNav = (): void => setIsNavOpen(state => !state);
    const handleLoginBox = (): void => setIsLoginBoxOpen((prev) => !prev);

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

        if(userInfo.uid) {
            saveUserData(newHistory);
        } else {
            saveStorageData(newHistory);
        }
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
            setHistoryList([]);
            setFavoriteList([]);
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

    const onClickNavContent = (target: IQuoteData): void => {
        const displayedQuote = cardPosition === "front" ? displayQuotes.front : displayQuotes.back;
        if(displayedQuote?.id !== target.id) {
            requestData(target.id);
        }
    }

    const initData = async () => {
        const storageData: IQuoteData[] | null = getStorageData();
        if(storageData) {
            const mostRecentData = storageData[0];
            setHistoryList(storageData);
            setDisplayQuotes({
                ...displayQuotes,
                front: mostRecentData
            });
        } else {
            try {
                const resData = await quotesAPI.getQuotesData();
                if(resData) {
                    const newQuote = checkFavoriteQuote(resData);
                    setDisplayQuotes({ ...displayQuotes, front: newQuote });
                    updateHistory(newQuote);
                }
            } catch (error) {
                alert("데이터를 요청 하던 도중 에러가 발생했습니다.");
                return false;
            }
        }
    }

    const saveUserData = (newHistory?: IQuoteData[], newFavorite?: IQuoteData[]) => {
        const newHis = newHistory ? newHistory : historyList;
        const newFav = newFavorite ? newFavorite : favoriteList;
        if(userInfo.uid) {
            firebaseDB.writeUserData(userInfo.uid, newHis, newFav);
        }
    }

    const getUserData = async (userId: string): Promise<void> => {
        const { history, favorite } = await firebaseDB.readUserData(userId);
        if(history && favorite) {
            setHistoryList(history);
            setFavoriteList(favorite);
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
                    displayQuotes={displayQuotes}
                    historyList={historyList}
                    cardPosition={cardPosition}
                    isLoggedIn={isLoggedIn}
                    userInfo={userInfo}
                    favoriteList={favoriteList}
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