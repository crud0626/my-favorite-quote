import { QuoteData } from '~/App';
import { ResponseQuote } from '~/services/quotesApi';

const STORAGE = window.sessionStorage;

export const getStorageData = (): QuoteData[] | null => {
    const savedData = STORAGE.getItem("mfq-history-list");

    if (savedData) {
        const savedArr = JSON.parse(savedData);
        const dataWithFavorite = savedArr.map((item: ResponseQuote): QuoteData => {
            const newItem: QuoteData = { ...item, favorite: false };
            return newItem;
        });

        return dataWithFavorite;
    }
    
    return null;
}

export const saveStorageData = (data: QuoteData[]) => {
    let saveData: ResponseQuote[] = data.map((item: QuoteData) => {
        const newItem: any = {};

        for(let [key, value] of Object.entries(item)) {
            if(key !== "favorite") {
                newItem[key] = value;
            }
        }

        return newItem;
    });

    STORAGE.setItem("mfq-history-list", JSON.stringify(saveData));
}