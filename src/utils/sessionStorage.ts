import { UserQuotesType } from '~/types/user.type';

const STORAGE = window.sessionStorage;
const STORAGE_KEY = "mfq-history-list";

export const getStorageData = (): UserQuotesType => {
    const userData = {
        history: [],
        favorite: []
    };

    const savedData = STORAGE.getItem(STORAGE_KEY);

    if (savedData) {
        const sessionData = JSON.parse(savedData);
        userData.history = sessionData.history;
        userData.favorite = sessionData.favorite;
    }

    return userData;
}

export const saveStorageData = (userData: UserQuotesType) => {
    STORAGE.setItem(STORAGE_KEY, JSON.stringify(userData));
}