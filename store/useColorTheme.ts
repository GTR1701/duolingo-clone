import { create } from "zustand";


type ColorThemeState = {
    isDark: boolean;
    setLightTheme: () => void;
    setDarkTheme: () => void;
};

export const useColorTheme = create<ColorThemeState>((set) => ({
    isDark: false,
    setLightTheme: () => set({ isDark: false }),
    setDarkTheme: () => set({ isDark: true }),
}));