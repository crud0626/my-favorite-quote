import { create } from "zustand";
import { CardPositionType, ChevronEventType } from '~/types/user.type';
import { DisplayQuotesType, IQuoteContent } from '~/types/quote.type';

interface ICardStore {
    cardRotate: number;
    cardPosition: CardPositionType;
    displayQuotes: DisplayQuotesType;
    changeCardPosition: () => void;
    changeDisplayQuote: (nextQuote: IQuoteContent, currentPosition: CardPositionType) => void;
    updateDisplayQuotes: (newDisplayQuotes: DisplayQuotesType) => void;
    handleCardFlip: (direction?: ChevronEventType) => void;
}

export const useCardStore = create<ICardStore>((set) => ({
    cardRotate: 0,
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
    },
    handleCardFlip: (direction = 'next') => {
        const nextTurn = direction === 'next' ? 0.5 : -0.5;
        set((prevState) => ({
            ...prevState,
            cardRotate: prevState.cardRotate + nextTurn
        }));
    }
}));