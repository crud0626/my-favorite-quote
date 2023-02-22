import React, { useEffect } from 'react';
import { User } from 'firebase/auth';
import { useSetHeight } from './hooks/customs/useSetHeight';
import { useCardStore } from './hooks/stores/useCardStore';
import { useUserStore } from './hooks/stores/useUserStore';
import { useQuotesStore } from './hooks/stores/useQuotesStore';
import Footer from '~/components/Footer/Footer';
import Header from '~/components/Header/Header';
import Main from '~/components/Main/Main';
import GlobalStyle from '~/styles/common/GlobalStyle';
import { getStorageData } from '~/utils/sessionStorage';

const App = () => {
    const { replaceQuotes, getUserQuotes } = useQuotesStore();
    const { changeDisplayQuote } = useCardStore();
    const { addUserStateListener } = useUserStore();    
    
    const setLocalData = () => {
        const savedUserData = getStorageData();

        if(savedUserData) {
            const latestHistory = savedUserData.history[0];
            
            replaceQuotes(savedUserData);
            changeDisplayQuote(latestHistory);
            return;
        }
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
        useSetHeight();
        addUserStateListener(initData);
    }, []);

    return (
        <>
            <GlobalStyle />
                <Header />
                <Main />
                <Footer />
        </>
    );
};

export default App;