import React, { useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import GlobalStyle from './styles/GlobalStyle';
import { QuoteData, QuotesAPI } from './services/quotesApi';
const quotesAPI = new QuotesAPI();

const App = () => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    const [quote, setQuote] = useState<QuoteData | null>(null);

    const handleNav = () => setIsNavOpen(state => !state);

    useEffect(() => {
        (async function() {
            const resData = await quotesAPI.getInitialQuotes();
            setQuote(resData);
        })();
    }, []);

    return (
        <>
            <GlobalStyle />
                <Header 
                    isNavOpen={isNavOpen} 
                    handleNav={handleNav}
                />
                <Main isNavOpen={isNavOpen} />
                <Footer />
        </>
    );
};

export default App;