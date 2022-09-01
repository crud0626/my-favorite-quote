import { QuoteData } from './../services/quotesApi';

const STORAGE = window.sessionStorage;

export const getStorageData = (): QuoteData[] | null => {
    const data = STORAGE.getItem("mfq-history-list");

    if (data) {
        const dataArr = JSON.parse(data);
        return dataArr.length > 0 ? dataArr : null;
    }
    
    return null;
}

export const saveStorageData = (data: QuoteData[]) => {
    STORAGE.setItem("mfq-history-list", JSON.stringify(data));
}