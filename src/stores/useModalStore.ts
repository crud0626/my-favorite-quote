import { create } from "zustand";

interface IState {
    isOpenNav: boolean;
    isOpenLoginModal: boolean;
}

interface IStore extends IState {
    toggleNav: () => void;
    toggleLoginModal: () => void;
}

const initialState: IState = {
    isOpenNav: false,
    isOpenLoginModal: false
}

export const useModalStore = create<IStore>((set) => ({
    ...initialState,
    toggleNav: () => {
        set(({ isOpenNav }) => ({ isOpenNav: !isOpenNav}))
    },
    toggleLoginModal: () => {
        set(({ isOpenLoginModal }) => ({ isOpenLoginModal: !isOpenLoginModal}))
    }
}));