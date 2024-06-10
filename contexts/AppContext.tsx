import { AuthenticationStatus } from "@rainbow-me/rainbowkit";
import { createContext, useContext } from "react";

interface IAppContext {
  authStatus: AuthenticationStatus;
}

export const AppContext = createContext<IAppContext>({
  authStatus: "loading",
});

AppContext.displayName = "AcademyAppContext";


export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within the AppContextProvider");
  }
  return context;
}
