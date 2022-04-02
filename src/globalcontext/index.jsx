import React, { createContext, useReducer, useContext } from "react";
import { initialState, reducer } from "../globalReducer";

const Globalcontext = createContext();

export const GlobalContext = () => useContext(Globalcontext);

const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Globalcontext.Provider value={{ state, dispatch }}>
            {children}
        </Globalcontext.Provider>
    );
};

export default GlobalContextProvider