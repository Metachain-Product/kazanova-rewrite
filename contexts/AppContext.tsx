import { createContext, useContext } from "react";
import { AuthenticationStatus } from "../constants/enums";

interface IAppContext {
  authStatus: AuthenticationStatus;
}

export const AppContext = createContext<IAppContext>({
  authStatus: AuthenticationStatus.LOADING,
});

AppContext.displayName = "AuthAppContext";


export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within the AppContextProvider");
  }
  return context;
}
