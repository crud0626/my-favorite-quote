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
import { useQuotesStore } from './stores/useQuotesStore';
import { useLoginBoxStore } from './stores/useLoginBoxStore';
import { authService } from './services/authService';

const App = () => {
    const { updateHistory, updateFavorite, getUserData, requestRandomQuote } = useQuotesStore();
    const { changeDisplayQuote } = useCardStore();
    const { updateUserInfo } = useUserStore();    
    const { isLoginBoxOpen } = useLoginBoxStore();

    const initData = () => {
        const savedUserData = getStorageData();

        if(savedUserData) {
            const { history, favorite } = savedUserData;
            const latestHistory = savedUserData.history[0];

            updateHistory(history);
            updateFavorite(favorite);
            changeDisplayQuote(latestHistory);
            return;
        }

        requestRandomQuote()
        .then(newQuote => {
            if (!newQuote) return;

            changeDisplayQuote(newQuote);
        })
    }

    const checkUserInfo = () => {
        onAuthStateChanged(authService.auth, async (user) => {
            if(user && user.displayName && user.photoURL) {
                updateUserInfo(user);
                
                const latestHistory = await getUserData(user.uid);
                if (latestHistory) changeDisplayQuote(latestHistory);
                
                return;
            }

            initData();
        });
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