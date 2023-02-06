import { UserInfo } from "firebase/auth";
import { IQuoteContent, QuotesGroupType } from "./quote.type";

export interface IUserInfo extends Pick<UserInfo, 'displayName' | 'photoURL' | 'uid'> {};

export type UserQuotesType = {
    [key in QuotesGroupType]: IQuoteContent[];
}

export type ChevronEventType = "prev" | "next";

export type CardPositionType = "front" | "back";

