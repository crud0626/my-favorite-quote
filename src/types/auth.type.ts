import { Auth } from 'firebase/auth';
import { IUserInfo } from './user.type';

export type ProviderNames = "Google" | "Facebook" | "Github";

export interface IAuthService {
    readonly auth: Auth;
    requestLogin(providerName: ProviderNames): Promise<IUserInfo | null>;
    requestLogout(): Promise<any>;
}