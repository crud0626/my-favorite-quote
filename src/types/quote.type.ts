import { CardPositionType } from "./user.type";

export interface ServerQuoteForm {
    _id: string;
    content: string;
    author: string;
} 

export interface ResponseQuote {
    readonly id: string;
    readonly quote: string;
    readonly author: string;
}

export interface IQuoteContent extends ResponseQuote {
    favorite: boolean;
}

export type DisplayQuotesType = {
    [key in CardPositionType]: IQuoteContent | null;
}

export type QuotesGroupType = 'history' | 'favorite';