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
import { ChevronEventType, UserQuotesType } from './types/user.type';
import { IAuthService } from './types/auth.type';
import { IQuoteContent, ResponseQuote } from './types/quote.type';
import { useCardStore } from './stores/useCardStore';
import { useUserStore } from './stores/useUserStore';

interface IProps {
    authService: IAuthService;
    firebaseDB: FirebaseDB;
    quotesAPI: InstanceType<typeof QuotesAPI>;
}

const App = ({ authService, firebaseDB, quotesAPI }: IProps) => {
    const { cardPosition, displayQuotes, changeCardPosition, changeDisplayQuote, updateDisplayQuotes } = useCardStore();
    const { userInfo, userQuotes, updateUserInfo, updateHistory, updateFavorite } = useUserStore();
    const cardWrapperRef = useRef<HTMLDivElement | null>(null);
    const [isLoginBoxOpen, setIsLoginBoxOpen] = useState<boolean>(false);
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
            updateDisplayQuotes(newQuoteData);
        }

        const newUserQuotes = {
            history: newHistory,
            favorite: newFavorite
        };
        
        updateHistory(newUserQuotes.history);
        updateFavorite(newUserQuotes.favorite);
        saveUserData(newUserQuotes);
    };

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

                changeCardPosition();
                changeDisplayQuote(newQuote, cardPosition);
                updateHistory(newQuote);
                handleCardFilp();

                return true;
            }
        } catch (error) {
            alert("데이터를 요청 하던 도중 에러가 발생했습니다.");
            return false;
        }
    }

    const checkUserInfo = () => {
        onAuthStateChanged(authService.auth, (user) => {
            if(user && user.displayName && user.photoURL) {
                updateUserInfo(user);
                getUserData(user.uid);
                return;
            }

            initData();
        });
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
            const { history, favorite } = savedUserData;

            updateHistory(history);
            updateFavorite(favorite);
            changeDisplayQuote(recentQuote, cardPosition);
            changeCardPosition();
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
            const { history, favorite } = userData;
            updateHistory(history);
            updateFavorite(favorite);
            changeDisplayQuote(recentQuote, cardPosition);
            changeCardPosition();
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
                    authService={authService}
                    handleLoginBox={handleLoginBox}
                />
                <Main 
                    cardWrapperRef={cardWrapperRef}
                    authService={authService}
                    requestData={requestData}
                    handleLoginBox={handleLoginBox}
                    onChangeFavorite={onChangeFavorite}
                    handleCardFilp={handleCardFilp}
                />
                <Footer />
                {
                    isLoginBoxOpen &&
                    <LoginBox 
                        authService={authService}
                        getUserData={getUserData}
                        handleLoginBox={handleLoginBox}
                    />
                }
        </>
    );
};

export default App;