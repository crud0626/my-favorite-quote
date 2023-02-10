import { create } from "zustand";
import { authService } from "~/services/authService";
import { onAuthStateChanged, User } from "firebase/auth";
import { ProviderNames } from "~/types/auth.type";
import { IUserInfo } from '~/types/user.type';

interface IUserStore {
    isLoggedIn: boolean;
    userInfo: IUserInfo | null;
    onLogin: (provider: ProviderNames) => Promise<IUserInfo | void>;
    onLogout: () => Promise<boolean>;
    checkLoggedIn: (callbackFn: (user: User | null) => void) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
    isLoggedIn: false,
    userInfo: null,
    onLogin: async (provider) => {
        const userInfo = await authService.requestLogin(provider);

        if (userInfo) {
            set({ userInfo, isLoggedIn: true });
            return userInfo;
        }

        return;
    },
    onLogout: async () => {
        const status = await authService.requestLogout();

        if (!status) {
            window.alert("로그아웃 도중 에러가 발생했습니다.");
            return false;
        }

        set({ userInfo: null, isLoggedIn: false });
        window.alert("로그아웃 되었습니다.");
        return true;
    },
    checkLoggedIn: (callbackFn) => {
        onAuthStateChanged(authService.auth, async (user) => {
            if (user) {
                set({ userInfo: user, isLoggedIn: true });
                callbackFn(user);
            }
        });
    }
}));