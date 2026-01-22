import React, {createContext, useEffect} from "react";

export const ThemeContext=createContext();
const ThemeProvider = ({children}) => {
    const [isDark, setIsDark] = React.useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    },[isDark]);
    return (
        <ThemeContext.Provider value={{isDark, setIsDark}}>
            {children}
        </ThemeContext.Provider>
    )
}
export default ThemeProvider;