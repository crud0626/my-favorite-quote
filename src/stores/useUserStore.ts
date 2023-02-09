import { create } from "zustand";
import { IUserInfo } from '~/types/user.type';

interface IUserStore {
    isLoggedIn: boolean;
    userInfo: IUserInfo | null;
    updateUserInfo: (userAccount?: IUserInfo | null) => void;
    // login, logout 추가
}

export const useUserStore = create<IUserStore>((set, get) => ({
    isLoggedIn: false,
    userInfo: null,
    updateUserInfo: (userAccount) => {
        set((prevState) => ({
            ...prevState,
            isLoggedIn: userAccount ? true : false,
            userInfo: userAccount || null,
        }))
    }
}));