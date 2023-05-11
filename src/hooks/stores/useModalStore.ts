import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

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

export const useModalStore = create<IStore>()(
    devtools(
        (set) => ({
            ...initialState,
            toggleNav: () => {
                set(({ isOpenNav }) => ({ isOpenNav: !isOpenNav}))
            },
            toggleLoginModal: () => {
                set(({ isOpenLoginModal }) => ({ isOpenLoginModal: !isOpenLoginModal}))
            }
        }), 
        { 
            enabled: process.env.NODE_ENV !== 'production'
        }
    )
);