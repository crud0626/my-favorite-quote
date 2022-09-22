import { UserData } from '~/services/database';
import { IQuoteData } from '~/types/interface';

const STORAGE = window.sessionStorage;

export const getStorageData = (): UserData => {
    const userData = {
        history: null,
        favorite: null
    };

    const savedData = STORAGE.getItem("mfq-history-list");

    if (savedData) {
        const sessionData = JSON.parse(savedData);
        userData.history = sessionData.history;
        userData.favorite = sessionData.favorite;
    }

    return userData;
}

export const saveStorageData = (history: IQuoteData[], favorite: IQuoteData[]) => {
    const userData = { history, favorite };

    STORAGE.setItem("mfq-history-list", JSON.stringify(userData));
}