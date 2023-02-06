import { create } from "zustand";

interface ILoginBoxStore {
    isLoginBoxOpen: boolean;
    handleLoginBox: () => void;
}

export const useLoginBoxStore = create<ILoginBoxStore>((set) => ({
    isLoginBoxOpen: false,
    handleLoginBox: () => {
        set(({ isLoginBoxOpen }) => ({ isLoginBoxOpen: !isLoginBoxOpen }));
    }
}));