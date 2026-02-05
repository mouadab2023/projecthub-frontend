import React, {createContext, useContext, useEffect} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ThemeContext = createContext();
const ThemeProvider = ({children}) => {
    const {get,set} = useLocalStorage();
    const [isDark, setIsDark] = React.useState(get("isDark")??false);

    const setMode = (isDark) => {
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