import { create } from "zustand";
import { CardPositionType, ChevronEventType } from '~/types/user.type';
import { DisplayQuotesType, IQuoteContent } from '~/types/quote.type';

interface ICardStore {
    cardRotation: number;
    cardPosition: CardPositionType;
    displayQuotes: DisplayQuotesType;
    changeDisplayQuote: (nextQuote: IQuoteContent, direction?: ChevronEventType) => void;
    replaceDisplayQuotes: (targetQuote?: IQuoteContent) => void;
    rotateCard: (direction?: ChevronEventType) => void;
}

export const useCardStore = create<ICardStore>((set, get) => ({
    cardRotation: 0,
    cardPosition: 'front',
    displayQuotes: {
        front: null,
        back: null
    },
    changeDisplayQuote: (nextQuote, direction = 'next') => {
        const nextPosition = get().cardPosition  === 'front' ? 'back' : 'front';
        const newDisplayQuotes = { ...get().displayQuotes };
        newDisplayQuotes[nextPosition] = nextQuote;

        get().rotateCard(direction);
        set(({ 
            cardPosition: nextPosition,
            displayQuotes: newDisplayQuotes
        }));
    },
    /* Favorite, 로그아웃 시 사용됨. */
    replaceDisplayQuotes: (target) => {
        if (!target) {
            set({ displayQuotes: { front: null, back: null }});
            return;
        }

        const displayQuotes = get().displayQuotes;
        const cardPosition = displayQuotes.front?.id === target.id 
        ? "front" : displayQuotes.back?.id === target.id 
        ? "back" : null;
        
        if (cardPosition) {
            const newQuoteData = { ...displayQuotes };
            newQuoteData[cardPosition] = target;

            set({ displayQuotes: newQuoteData });
        }
    },
    rotateCard: (direction = 'next') => {
        const currRotate = get().cardRotation;
        const nextRotate = direction === 'next' ? currRotate + 0.5 : currRotate - 0.5;

        set({ cardRotation: nextRotate });
    }
}));