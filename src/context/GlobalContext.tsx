import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { GlobalContextTypes as Types } from "./GlobalContextTypes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

const GlobalContext = createContext<Types>(undefined);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Keep track of current user
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
      if (user) {
      }
    });
    return unsubscribeAuth;
  }, []);

  const clearState = () => {};

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        clearState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
