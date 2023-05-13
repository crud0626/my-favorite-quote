import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { firebaseDB, quotesAPI } from '~/services';
import { UserQuotesType } from '~/types/user.type';
import { IQuoteContent, QuotesGroupType } from '~/types/quote.type';

interface IState {
    userQuotes: UserQuotesType;
}

interface ResponseRequestQuote {
    newQuote: IQuoteContent;
    newQuotesList: UserQuotesType;
}

interface IStore extends IState {
    updateQuotes: (newQuotes: IQuoteContent, quoteType: QuotesGroupType) => UserQuotesType;
    replaceQuotes: (newQuotes?: UserQuotesType) => void;
    getUserQuotes: (userId: string) => Promise<UserQuotesType | void>;
    requestQuote: (id?: string) => Promise<ResponseRequestQuote | void>;
    onChangeFavorite: (targetQuote: IQuoteContent) => {
        newUserQuotes: UserQuotesType, 
        targetQuote: IQuoteContent
    };
}

const initialState: IState = {
    userQuotes: {
        history: [],
        favorite: []
    }
}

export const useQuotesStore = create<IStore>()(
    devtools(
        (set, get) => ({
            ...initialState,
            updateQuotes: (newQuotes, quoteType) => {
                const { userQuotes } = get();

                const newQuotesList = {...userQuotes};
                const filteredList = newQuotesList[quoteType]
                    .filter(quote => quote.id !== newQuotes.id)
                    .slice(0, 9);
                filteredList.unshift(newQuotes);

                newQuotesList[quoteType] = filteredList;

                set({ userQuotes: newQuotesList });

                return newQuotesList;
            },
            replaceQuotes: (newQuotes) => {
                if (newQuotes) {
                    set({ userQuotes: newQuotes });
                    return;
                }

                set({ userQuotes: initialState.userQuotes});
            },
            getUserQuotes: async (userId) => {
                const userData = await firebaseDB.readUserData(userId);

                if(userData) {
                    set({ userQuotes: userData });
                    return userData;
                }
            },
            requestQuote: async (id) => {
                const { userQuotes, updateQuotes } = get();

                try {
                    const resQuote = await quotesAPI.getQuotesData(id);

                    const isFavorite = userQuotes.favorite.some(item => item.id === resQuote.id);
                    const newQuote: IQuoteContent = {
                        ...resQuote,
                        favorite: isFavorite ? true : false
                    };

                    const newQuotesList = updateQuotes(newQuote, 'history');

                    return { newQuote, newQuotesList };
                } catch (error) {
                    alert("데이터를 요청 하던 도중 에러가 발생했습니다.");
                }
            },
            onChangeFavorite: (targetQuote) => {
                const { history, favorite } = get().userQuotes;
                targetQuote.favorite = !targetQuote.favorite;
                
                const newHistory = history.map(item => item.id === targetQuote.id ? targetQuote : item);
                const newFavorite = [...favorite];

                const targetIndex = newFavorite.findIndex(item => item.id === targetQuote.id);
                if (targetIndex !== -1) {
                    newFavorite.splice(targetIndex, 1);
                } else {
                    newFavorite.unshift(targetQuote);
                }

                const newUserQuotes: UserQuotesType = {
                    history: newHistory,
                    favorite: newFavorite
                }

                set({ userQuotes: newUserQuotes });

                return { newUserQuotes, targetQuote };
            }
        }),
        { 
            enabled: process.env.NODE_ENV !== 'production'
        }
    )
);