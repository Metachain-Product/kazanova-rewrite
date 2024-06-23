import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useAppContext } from "../contexts/AppContext";

const Home: NextPage = () => {
  const { authStatus } = useAppContext();
  return (
    <div >
      <Head>
        <title>Web3 App</title>
        <meta content='blueprint app' name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <main >
        <ConnectButton />
        <h1>{authStatus}</h1>
      </main>
    </div>
  );
};

export default Home;
