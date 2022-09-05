import React, { useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import GlobalStyle from './styles/GlobalStyle';
import { QuoteData, QuotesAPI } from './services/quotesApi';
import { getStorageData, saveStorageData } from './utils/sessionStorage';
import LoginWrapper from './components/LoginWrapper/LoginWrapper';

const quotesAPI = new QuotesAPI();

export type CardPositionType = "front" | "back";
export interface QuoteStateType {
    front: QuoteData | null;
    back: QuoteData | null;
}

interface IProps {
    onLogIn(): void;
}

const App = ({ onLogIn }: IProps) => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(true);
    const [quoteData, setQuoteData] = useState<QuoteStateType>({
        front: null,
        back: null
    });
    const [quoteHistory, setQuoteHistory] = useState<QuoteData[]>([]);
    const [exposedCard, setExposedCard] = useState<CardPositionType>("front");



    const handleNav = () => setIsNavOpen(state => !state);
    const handleLoginWrapper = () => setIsLoginOpen(state => !state);

    const updateHistory = (newItem: QuoteData) => {
        let newHistory: Array<QuoteData> = quoteHistory.filter(quote => quote.id !== newItem.id);
        
        if(quoteHistory.length > 9) {
            newHistory = newHistory.slice(0, 9);
        } 

        newHistory.unshift(newItem);
        setQuoteHistory(newHistory);
        saveStorageData(newHistory);
    }

    const requestData = async (id?: string): Promise<any> => {
        try {
            const resData = await quotesAPI.getQuotesData(id);
            if (resData) {
                exposedCard === "front" 
                ? setQuoteData({...quoteData, back: resData}) 
                : setQuoteData({...quoteData, front: resData});

                setExposedCard((prevState) => prevState === "front" ? "back" : "front");
                updateHistory(resData);
                return true;
            }
        } catch (error) {
            alert("데이터를 요청 하던 도중 에러가 발생했습니다.");
            return false;
        }
    }

    const init = async () => {
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
                setQuoteData({ ...quoteData, front: resData });
                updateHistory(resData);
            } catch (error) {
                alert("데이터를 요청 하던 도중 에러가 발생했습니다.");
                return false;
            }
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <>
            <GlobalStyle />
                <Header 
                    isNavOpen={isNavOpen} 
                    handleNav={handleNav}
                    onLogIn={onLogIn}
                />
                <Main 
                    isNavOpen={isNavOpen} 
                    quoteData={quoteData}
                    quoteHistory={quoteHistory}
                    exposedCard={exposedCard}
                    requestData={requestData}
                    handleNav={handleNav}
                />
                <Footer />
                {
                    isLoginOpen &&
                    <LoginWrapper
                        handleLoginWrapper={handleLoginWrapper}
                    />
                }
        </>
    );
};

export default App;