import './Themes.scss';
import {createContext, ReactNode, useLayoutEffect, useState} from 'react';
import {theme as themeLocalstorage} from '@localstorage';
import {ThemeTypes} from './Data';

export interface PropsTypes {
    theme: ThemeTypes,
    onSetTheme: () => void,
};

// for consuming in children components, initial state
export const Context = createContext<PropsTypes>({
    theme: {
        name: "night",
        background: "black",
    },
    onSetTheme: () => null
});

// Provider in your app
export const Theme = ({children}: {children: ReactNode}) => {

    const theme_default = {name: "night", background: "#1c1c1c"};

    const theme_saved: ThemeTypes = themeLocalstorage.get();

    const theme_selected = theme_saved || theme_default;

    const [theme, setTheme] = useState<ThemeTypes>(theme_selected);

    useLayoutEffect(() => { 
        document.body.style.background = theme.background;
    }, [theme]);

    const onSetTheme = () => {
        let theme_change = theme_default;
        if(theme.name === "night")  theme_change =  {name: "ocean",   background: "#1c1c1c"};
        if(theme.name === "ocean")  theme_change =  {name: "retro",   background: "#1e1e1e"};
        if(theme.name === "retro")  theme_change =  {name: "matrix",  background: "#000000"};
        if(theme.name === "matrix") theme_change =  {name: "night",   background: "#141414"};
        setTheme(theme_change);
        themeLocalstorage.set(theme_change);
    };

    const value: PropsTypes = {
        theme,
        onSetTheme,
    };
  
    return (
        <Context.Provider value={value}>
            <div className={`theme-${theme.name}`}>
                {children}
            </div>
        </Context.Provider>
    )
};

export default Theme