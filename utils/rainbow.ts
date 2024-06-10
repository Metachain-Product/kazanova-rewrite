import { createAuthenticationAdapter } from "@rainbow-me/rainbowkit";
import { SiweMessage } from "siwe";
import { getNonce, logout, verifyNonce } from "./api/requests";

export const authenticationAdapter = createAuthenticationAdapter({
  getNonce,

  createMessage: ({ nonce, address, chainId }) => {
    return new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Sign in with Ethereum to the app.",
      uri: window.location.origin,
      version: "1",
      chainId,
      nonce,
    });
  },

  getMessageBody: ({ message }) => {
    return message.prepareMessage();
  },

  verify: async ({ message, signature }) => {
    const verifyRes = await verifyNonce({
      message: message.message,
      signature,
    });

    localStorage.setItem("jwt", verifyRes);

    return Boolean(verifyRes.ok);
  },

  signOut: logout,
});
