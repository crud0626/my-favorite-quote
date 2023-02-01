import { IQuoteContent } from '~/types/quote.type';
import { UserQuotesType } from '~/types/user.type';

const STORAGE = window.sessionStorage;

export const getStorageData = (): UserQuotesType => {
    const userData = {
        history: [],
        favorite: []
    };

    const savedData = STORAGE.getItem("mfq-history-list");

    if (savedData) {
        const sessionData = JSON.parse(savedData);
        userData.history = sessionData.history;
        userData.favorite = sessionData.favorite;
    }

    return userData;
}

export const saveStorageData = (history: IQuoteContent[], favorite: IQuoteContent[]) => {
    const userData = { history, favorite };

    STORAGE.setItem("mfq-history-list", JSON.stringify(userData));
}