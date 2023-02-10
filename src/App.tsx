import React, { useEffect } from 'react';
import { User } from 'firebase/auth';
import { useCardStore } from './stores/useCardStore';
import { useUserStore } from './stores/useUserStore';
import { useQuotesStore } from './stores/useQuotesStore';
import { useLoginBoxStore } from './stores/useLoginBoxStore';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import Main from '~/components/Main/Main';
import LoginBox from '~/components/LoginModal/LoginModal';
import GlobalStyle from '~/styles/common/GlobalStyle';
import { getStorageData } from '~/utils/sessionStorage';

const App = () => {
    const { updateHistory, updateFavorite, getUserData, requestRandomQuote } = useQuotesStore();
    const { changeDisplayQuote } = useCardStore();
    const { checkLoggedIn } = useUserStore();    
    const { isLoginBoxOpen } = useLoginBoxStore();

    const setLocalData = () => {
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
        });
    }

    const initData = async (user: User | null) => {
        if (!user) {
            setLocalData();
            return;
        }
        
        const latestHistory = await getUserData(user.uid);
        if (latestHistory) changeDisplayQuote(latestHistory);
    }

    useEffect(() => {
        checkLoggedIn(initData);
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