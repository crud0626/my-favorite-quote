import React, { useEffect } from 'react';
import { User } from 'firebase/auth';
import { useCardStore } from './stores/useCardStore';
import { useUserStore } from './stores/useUserStore';
import { useQuotesStore } from './stores/useQuotesStore';
import { useModalStore } from './stores/useModalStore';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import Main from '~/components/Main/Main';
import LoginBox from '~/components/LoginModal/LoginModal';
import GlobalStyle from '~/styles/common/GlobalStyle';
import { getStorageData } from '~/utils/sessionStorage';

const App = () => {
    const { replaceQuotes, getUserQuotes, requestQuote } = useQuotesStore();
    const { changeDisplayQuote } = useCardStore();
    const { checkLoggedIn } = useUserStore();    
    const { isOpenLoginModal } = useModalStore();

    const setLocalData = () => {
        const savedUserData = getStorageData();

        if(savedUserData) {
            const latestHistory = savedUserData.history[0];

            replaceQuotes(savedUserData);
            changeDisplayQuote(latestHistory);
            return;
        }

        requestQuote()
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
        
        const resQuotes = await getUserQuotes(user.uid);
        if (resQuotes) {
            const latestHistory = resQuotes.history[0] || null;
            if (latestHistory) changeDisplayQuote(latestHistory);
        }
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
                    isOpenLoginModal &&
                    <LoginBox />
                }
        </>
    );
};

export default App;