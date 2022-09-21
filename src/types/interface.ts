import { Auth } from "firebase/auth";

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

export interface IUserInfo {
    displayName: string | null;
    photoURL: string | null;
    uid: string | null;
}

export interface IAuthService {
    readonly auth: Auth;
    requestLogin(): Promise<IUserInfo | undefined>;
    requestLogout(): Promise<any>;
}