import { createContext, useReducer, useContext } from "react";
import AppReducer from "./AppReducer";
import { initialState } from "./AppReducer";

const Globalcontext = createContext();

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <Globalcontext.Provider
      value={{ cart: state.cart, user: state.user, dispatch: dispatch }}
    >
      {children}
    </Globalcontext.Provider>
  );
};

export default GlobalProvider;

export const useAuth = () => {
  return useContext(Globalcontext);
};
