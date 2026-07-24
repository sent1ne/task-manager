import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
    mode: ThemeMode;
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const THEME_KEY = "@field_tasks_theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<ThemeMode>("light");

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const saved = await AsyncStorage.getItem(THEME_KEY);
            if (saved === "dark" || saved === "light") {
                setMode(saved);
            }
        } catch (error) {
            console.error("Error loading theme:", error);
        }
    };

    const toggleTheme = async () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        try {
            await AsyncStorage.setItem(THEME_KEY, newMode);
        } catch (error) {
            console.error("Error saving theme:", error);
        }
    };

    return (
        <ThemeContext.Provider value={{ mode, isDark: mode === "dark", toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
}

// NEW: Theme colors helper
export function useThemeColors() {
    const { isDark } = useTheme();

    return {
        bgScreen: isDark ? "bg-zinc-900" : "bg-zinc-50",
        bgCard: isDark ? "bg-zinc-800" : "bg-white",
        bgInput: isDark ? "bg-zinc-800" : "bg-white",
        border: isDark ? "border-zinc-700" : "border-zinc-200",
        textPrimary: isDark ? "text-white" : "text-zinc-900",
        textSecondary: isDark ? "text-zinc-400" : "text-zinc-600",
        textMuted: isDark ? "text-zinc-300" : "text-zinc-700",
        textPlaceholder: isDark ? "text-zinc-500" : "text-zinc-400",
        iconColor: isDark ? "#A1A1AA" : "#71717A",
        bgInputError: "bg-red-50",
        borderError: "border-red-500",
        inputClass: (hasError: boolean) =>
            `p-4 rounded-xl border text-base ${hasError
                ? "border-red-500 bg-red-50"
                : isDark
                    ? "bg-zinc-800 border-zinc-700 text-white"
                    : "bg-white border-zinc-200 text-zinc-900"
            }`,
    };
}