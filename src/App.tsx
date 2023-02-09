import React, { useEffect } from 'react';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import Main from '~/components/Main/Main';
import LoginBox from '~/components/LoginModal/LoginModal';
import GlobalStyle from '~/styles/common/GlobalStyle';
import { getStorageData } from '~/utils/sessionStorage';
import { onAuthStateChanged } from 'firebase/auth';
import { useCardStore } from './stores/useCardStore';
import { useUserStore } from './stores/useUserStore';
import { useLoginBoxStore } from './stores/useLoginBoxStore';
import { useQuotesStore } from './stores/useQuotesStore';
import { authService } from './services/authService';

const App = () => {
    const { cardPosition, changeCardPosition, changeDisplayQuote, handleCardFlip } = useCardStore();
    const { updateHistory, updateFavorite, getUserData, requestRandomQuote } = useQuotesStore();
    const { updateUserInfo } = useUserStore();    
    const { isLoginBoxOpen } = useLoginBoxStore();

    const checkUserInfo = () => {
        onAuthStateChanged(authService.auth, async (user) => {
            if(user && user.displayName && user.photoURL) {
                updateUserInfo(user);
                
                const latestHistory = await getUserData(user.uid);

                if (latestHistory) {
                    changeDisplayQuote(latestHistory, cardPosition);
                    changeCardPosition();
                    handleCardFlip();
                }
                return;
            }

            initData();
        });
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
            handleCardFlip();
            return;
        }

        requestRandomQuote()
        .then(newQuote => {
            if (!newQuote) return;

            changeCardPosition();
            changeDisplayQuote(newQuote, cardPosition);
            handleCardFlip();
        })
    }

    useEffect(() => {
        checkUserInfo();
    }, []);

    return (
        <>
            <GlobalStyle />
                <Header />
                <Main />
                <Footer />
                {
                    isLoginBoxOpen &&
                    <LoginBox />
                }
        </>
    );
};

export default App;