import { type ReactNode, useEffect, useState, useMemo, useRef } from "react";
import { AppContext } from "./AppContext";
import { useAccount } from "wagmi";
import {
  AuthenticationStatus,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  createAuthenticationAdapter,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { getNonce, getProfile, logout, verifyNonce } from "../utils/api/requests";

interface IProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: IProps) {
  const [authStatus, setAuthStatus] = useState<AuthenticationStatus>("loading");

  const { address, status: walletStatus } = useAccount();

  const fetchingStatusRef = useRef(false);
  const verifyingRef = useRef(false);

  useEffect(() => {
    if (walletStatus === "disconnected") {
      setAuthStatus("unauthenticated");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletStatus]);

  useEffect(() => {
    const fetchStatus = async () => {
      if (fetchingStatusRef.current || verifyingRef.current) return;
      fetchingStatusRef.current = true;
      try {
        const response = await getProfile();
        setAuthStatus(
          response.data.status && walletStatus === "connected"
            ? "authenticated"
            : "unauthenticated",
        );
      } catch (_error) {
        setAuthStatus("unauthenticated");
      } finally {
        fetchingStatusRef.current = false;
      }
    };

    fetchStatus();

    const handleFocus = () => {
      fetchStatus();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const authAdapter = useMemo(() => {
    return createAuthenticationAdapter({
      getNonce: getNonce,

      createMessage: ({ nonce, address, chainId }) => {
        return {
          message: nonce,
          address, // Capture the address here
        };
      },

      getMessageBody: ({ message }) => {
        return message.message; // Adjusted to handle the new message structure
      },

      verify: async ({ message, signature }) => {
        verifyingRef.current = true;

        try {
          const response = await verifyNonce({
            message: message.message,
            signature,
            wallet_address: message.address, // Use the dynamic wallet address
          });

          const authenticated = response.status >= 200 && response.status < 300;

          if (authenticated) {
            setAuthStatus(authenticated ? "authenticated" : "unauthenticated");
            localStorage.setItem("jwt", response.data.data.token);
          }

          return authenticated;
        } catch (error) {
          console.error("Verification failed", error);
          return false;
        } finally {
          verifyingRef.current = false;
        }
      },

      signOut: async () => {
        await logout();
        setAuthStatus("unauthenticated");
        localStorage.removeItem("jwt");
      },
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        authStatus,
      }}
    >
      <RainbowKitAuthenticationProvider adapter={authAdapter} status={authStatus}>
        <RainbowKitProvider
          // can be light theme
          theme={darkTheme({
            // accentColor: "#f8780c",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
          coolMode
        >
          {children}
        </RainbowKitProvider>
      </RainbowKitAuthenticationProvider>
    </AppContext.Provider>
  );
}
