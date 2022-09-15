export interface ResponseQuote {
    readonly id: string;
    readonly quote: string;
    readonly author: string;
}

export interface QuoteData extends ResponseQuote {
    readonly favorite: boolean;
}

export interface QuoteStateType {
    front: QuoteData | null;
    back: QuoteData | null;
}