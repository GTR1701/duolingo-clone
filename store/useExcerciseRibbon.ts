import { create } from "zustand";


type ExcerciseRibbonState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useExcerciseRibbon = create<ExcerciseRibbonState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));