import { create } from 'zustand';
import { UserQuotesType } from '~/types/user.type';
import { IQuoteContent } from '~/types/quote.type';
import { firebaseDB } from '~/services/database';
import { quotesAPI } from '~/services/quotesApi';

interface IStore {
    userQuotes: UserQuotesType;
    updateHistory: (newHistory: IQuoteContent[] | IQuoteContent) => void;
    updateFavorite: (newFavoriteList: IQuoteContent[]) => void;
    clearUserQuotes: () => void;
    getUserData: (userId: string) => Promise<IQuoteContent | void>;
    requestRandomQuote: (id?: string) => Promise<IQuoteContent | void>;
    onChangeFavorite: (target: IQuoteContent) => {
        newUserQuotes: UserQuotesType, willChangeQuote: IQuoteContent
    };
}

export const useQuotesStore = create<IStore>((set, get) => ({
    userQuotes: {
        history: [],
        favorite: []
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
    },
    getUserData: async (userId) => {
        const userData = await firebaseDB.readUserData(userId);

        if(userData) {
            const latestHistory = userData.history[0];
            const { history, favorite } = userData;

            set((prevState) => ({
                ...prevState,
                userQuotes: { history, favorite }
            }));

            return latestHistory;
        }
    },
    requestRandomQuote: async (id) => {
        try {
            const resData = await quotesAPI.getQuotesData(id);

            const userFavoriteList = get().userQuotes.favorite;
            const isFavoriteQuote = userFavoriteList.some(item => item.id === resData.id);
            const newQuote: IQuoteContent = {
                ...resData,
                favorite: isFavoriteQuote
            };

            get().updateHistory(newQuote);
            return newQuote;
        } catch (error) {
            alert("데이터를 요청 하던 도중 에러가 발생했습니다.");
        }
    },
    onChangeFavorite: (target) => {
        const willChangeQuote: IQuoteContent = {
            ...target,
            favorite: !target.favorite
        };

        const userQuotes = get().userQuotes;

        // 히스토리에 반영
        const newHistory = userQuotes.history.map((item: IQuoteContent) => {
            return item.id === willChangeQuote.id ? willChangeQuote : item;
        });

        // favorite에 반영
        const newFavorite = [ ...userQuotes.favorite ];
        const matchedIndexInFavorite = newFavorite.findIndex(item => item.id === willChangeQuote.id);
        if(matchedIndexInFavorite !== -1) {
            newFavorite.splice(matchedIndexInFavorite, 1);
        } else {
            newFavorite.unshift(willChangeQuote);
        }

        const newUserQuotes: UserQuotesType = {
            history: newHistory,
            favorite: newFavorite
        }

        set((prevState) => ({
            ...prevState,
            userQuotes: { ...newUserQuotes }
        }));

        return { newUserQuotes, willChangeQuote };
    }
}));