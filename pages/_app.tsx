import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { queryClientConfig } from "../config/queryClients";
import { wagamiConfig } from "../config/wagami";
import { ToastContainer } from "react-toastify";
import { AppContextProvider } from "../contexts/AppContextProvider";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <WagmiProvider config={wagamiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <ToastContainer />
          <Component {...pageProps} />
        </AppContextProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
