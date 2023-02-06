import { create } from "zustand";
import { IQuoteContent } from "~/types/quote.type";
import { IUserInfo, UserQuotesType } from '~/types/user.type';

interface IUserStore {
    isLoggedIn: boolean;
    userInfo: IUserInfo | null;
    userQuotes: UserQuotesType;
    updateUserInfo: (userAccount?: IUserInfo | null) => void;
    updateHistory: (newHistory: IQuoteContent[] | IQuoteContent) => void;
    updateFavorite: (newFavoriteList: IQuoteContent[]) => void;
    clearUserQuotes: () => void;
}

export const useUserStore = create<IUserStore>((set) => ({
    isLoggedIn: false,
    userInfo: null,
    userQuotes: {
        history: [],
        favorite: []
    },
    updateUserInfo: (userAccount) => {
        set((prevState) => ({
            ...prevState,
            isLoggedIn: userAccount ? true : false,
            userInfo: userAccount || null,
        }))
    },
    updateHistory: (newHistory) => {
        if(!Array.isArray(newHistory)) {
            set(({ userQuotes }) => {
                const newUserQuotes = { ...userQuotes };
                const filteredList = userQuotes.history
                    .filter(quote => quote.id !== newHistory.id)
                    .slice(0, 9);
    
                newUserQuotes.history = [newHistory, ...filteredList];
    
                return { userQuotes: newUserQuotes };
            });
        } else {
            set((prevState) => {
                const newUserQuotes = { ...prevState.userQuotes };
                newUserQuotes.history = newHistory;

                return {
                    ...prevState,
                    userQuotes: newUserQuotes
                }
            })
        }
    },    
    updateFavorite: (newFavoriteList) => {
        set((prevState) => {
            const newUserQuotes = {...prevState.userQuotes};
            newUserQuotes.favorite = newFavoriteList;

            return {
                ...prevState,
                userQuotes: newUserQuotes
            }
        });
    },
    clearUserQuotes: () => {
        set((prevState) => ({
            ...prevState,
            userQuotes: {
                history: [],
                favorite: []
            }
        }))
    }
}));