import { create } from "zustand";

interface IStore {
    isOpenNav: boolean;
    isOpenLoginModal: boolean;
    toggleNav: () => void;
    toggleLoginModal: () => void;
}

export const useModalStore = create<IStore>((set) => ({
    isOpenNav: false,
    isOpenLoginModal: false,
    toggleNav: () => {
        set(({ isOpenNav }) => ({ isOpenNav: !isOpenNav}))
    },
    toggleLoginModal: () => {
        set(({ isOpenLoginModal }) => ({ isOpenLoginModal: !isOpenLoginModal}))
    }
}));