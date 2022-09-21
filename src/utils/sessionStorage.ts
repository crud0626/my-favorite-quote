import { IQuoteData, IResponseQuote } from '~/types/interface';

const STORAGE = window.sessionStorage;

export const getStorageData = (): IQuoteData[] | null => {
    const savedData = STORAGE.getItem("mfq-history-list");

    if (savedData) {
        const savedArr = JSON.parse(savedData);
        const dataWithFavorite = savedArr.map((item: IResponseQuote): IQuoteData => {
            const newItem: IQuoteData = { ...item, favorite: false };
            return newItem;
        });

        return dataWithFavorite;
    }
    
    return null;
}

export const saveStorageData = (data: IQuoteData[]) => {
    let saveData: IResponseQuote[] = data.map((item: IQuoteData) => {
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