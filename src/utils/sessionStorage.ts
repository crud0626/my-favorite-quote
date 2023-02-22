import { UserQuotesType } from '~/types/user.type';

const STORAGE = window.sessionStorage;
const STORAGE_KEY = "mfq-history-list";

export const getStorageData = (): UserQuotesType | null => {
    const savedData = STORAGE.getItem(STORAGE_KEY);

    if (savedData) {
        const sessionData = JSON.parse(savedData);
        return {
            history: sessionData.history,
            favorite: sessionData.favorite
        };
    }

    return null;
}

export const saveStorageData = (userData: UserQuotesType) => {
    STORAGE.setItem(STORAGE_KEY, JSON.stringify(userData));
}