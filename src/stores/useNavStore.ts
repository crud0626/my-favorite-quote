import { create } from "zustand";

interface NavStore {
    isOpenNav: boolean;
    handleNav: () => void;
}

export const useNavStore = create<NavStore>((set) => ({
    isOpenNav: false,
    handleNav: () => {
        set(({ isOpenNav }) => ({ isOpenNav: !isOpenNav}))
    }
}));