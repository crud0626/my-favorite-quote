import { IQuoteContent, QuotesGroupType } from "./quote.type";

export interface IUserInfo {
    displayName: string;
    photoURL: string;
    uid: string;
}

export type UserQuotesType = {
    [key in QuotesGroupType]: IQuoteContent[];
}

export type ChevronEventType = "prev" | "next";

export type CardPositionType = "front" | "back";

