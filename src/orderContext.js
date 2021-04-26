import React, { createContext, useReducer, useContext } from "react";
import { initialState, reducer } from "./orderReducer";
const OrderContext = createContext();
export const orderContext = () => useContext(OrderContext);
export const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};
