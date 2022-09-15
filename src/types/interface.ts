export interface IResponseQuote {
    readonly id: string;
    readonly quote: string;
    readonly author: string;
}

export interface IQuoteData extends IResponseQuote {
    readonly favorite: boolean;
}

export interface IQuotesState {
    front: IQuoteData | null;
    back: IQuoteData | null;
}