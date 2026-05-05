import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [dark, setDark] = useState(false);

    const toggleTheme = () => {
        setDark((prev) => {
            document.documentElement.classList.toggle("dark", !prev);
            return !prev;
        });
    };

    return (
        <ThemeContext.Provider value={{ dark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}