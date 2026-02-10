import React, {createContext, type ReactNode, useEffect} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
type ThemeContextType = {
    isDark: boolean;
    setIsDark: (isDark: boolean) => void;
}
type Props={
    children:ReactNode
}
export const ThemeContext = createContext<ThemeContextType|null>(null);
const ThemeProvider = ({children}:Props) => {
    const {get,set} = useLocalStorage<boolean>();
    const [isDark, setIsDark] = React.useState(get("isDark")??false);

    const setMode = (isDark:boolean) => {
        setIsDark(isDark);
        set("isDark",isDark);
    }
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);
    return (
        <ThemeContext.Provider value={{isDark, setIsDark:setMode}}>
            {children}
        </ThemeContext.Provider>
    )
}
export default ThemeProvider;