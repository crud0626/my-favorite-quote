import { create } from "zustand";
import { CardPositionType } from '~/types/user.type';
import { DisplayQuotesType, IQuoteContent } from '~/types/quote.type';

interface ICardStore {
    cardPosition: CardPositionType;
    displayQuotes: DisplayQuotesType;
    changeCardPosition: () => void;
    changeDisplayQuote: (nextQuote: IQuoteContent, currentPosition: CardPositionType) => void;
    updateDisplayQuotes: (newDisplayQuotes: DisplayQuotesType) => void;
}

export const useCardStore = create<ICardStore>((set) => ({
    cardPosition: 'front',
    displayQuotes: {
        front: null,
        back: null
    },
    changeCardPosition: () => {
        set((prevState) => {
            return { 
                ...prevState,
                cardPosition: prevState.cardPosition === 'front' ? 'back' : 'front'
            };
        });
    },
    changeDisplayQuote: (nextQuote, currentPosition) => {
        const nextPosition = currentPosition === 'front' ? 'back' : 'front';
        
        set((prevState) => {
            const newDisplayQuotes = {
                ...prevState.displayQuotes,
                [nextPosition]: nextQuote
            }

            return {
                ...prevState,
                displayQuotes: newDisplayQuotes
            };
        });
    },
    updateDisplayQuotes: (newDisplayQuotes) => {
        set((prevState) => {
            return {
                ...prevState,
                displayQuotes: newDisplayQuotes
            }
        });
    }
}));