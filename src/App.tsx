import React, { useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import GlobalStyle from './styles/GlobalStyle';
import { QuoteData, QuotesAPI } from './services/quotesApi';

const quotesAPI = new QuotesAPI();

const App = () => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
    const [quoteHistory, setQuoteHistory] = useState<QuoteData[]>([]);

    const handleNav = () => setIsNavOpen(state => !state);

    const requestData = async (id?: string): Promise<any> => {
        try {
            const resData = await quotesAPI.getQuotesData(id);
            if (resData) {
                const newHistoryList = [...quoteHistory];
                newHistoryList.unshift(resData);

                setQuoteData(resData);
                setQuoteHistory(newHistoryList);
                return true;
            }
        } catch (error) {
            alert("데이터를 요청 하던 도중 에러가 발생했습니다.");
            return false;
        }
    }

    useEffect(() => {
        requestData();
    }, []);

    return (
        <>
            <GlobalStyle />
                <Header 
                    isNavOpen={isNavOpen} 
                    handleNav={handleNav}
                />
                <Main 
                    isNavOpen={isNavOpen} 
                    quoteData={quoteData}
                    quoteHistory={quoteHistory}
                    requestData={requestData}
                />
                <Footer />
        </>
    );
};

export default App;