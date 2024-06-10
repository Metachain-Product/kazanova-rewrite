import { appName, projectId } from "../constants/web3";
import {
  trustWallet,
  coinbaseWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { bsc, bscTestnet } from "wagmi/chains";

export const wagamiConfig = getDefaultConfig({
  appName,
  projectId,
  chains: [bsc, ...(process.env.NEXT_APP_ENABLE_TESTNETS === "true" ? [bscTestnet] : [])],
  wallets: [
    {
      groupName: "my wallets",
      wallets: [
        () => trustWallet({ projectId }),
        () => coinbaseWallet({ appName }),
        () => metaMaskWallet({ projectId }),
        () => walletConnectWallet({ projectId }),
      ],
    },
  ],
});
