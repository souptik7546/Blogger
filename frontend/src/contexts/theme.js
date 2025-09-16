import { createContext, useContext } from "react";

export const ThemeContext= createContext({
    themeMode:"dark",
    setdarkTheme: ()=>{},
    setlightTheme: ()=>{}
})

export const ThemeProvider= ThemeContext.Provider

