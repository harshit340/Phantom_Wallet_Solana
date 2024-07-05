"use client";
// The dynamic function from Next.js is used to dynamically import components. This is particularly useful for code splitting and improving the initial load time of your application.

import dynamic from "next/dynamic"; 

const WalletMultiButton = dynamic(
  ()=>import("@solana/wallet-adapter-react-ui").then((mod)=>mod.WalletMultiButton),
  {ssr:false} // ssr server side rendering is false
);

const WalletConnectButton = dynamic(
  ()=>import("@solana/wallet-adapter-react-ui").then((mod)=>mod.WalletConnectButton),{ssr:false}
);

const WalletDisconnectButton = dynamic(
  ()=>import("@solana/wallet-adapter-react-ui").then((mod)=>mod.WalletDisconnectButton),{ssr:false}
);


export default function Home() {
  return (
    <div>
      <main>
        <div>
          <WalletMultiButton />
            <WalletConnectButton/>
            <WalletDisconnectButton/>
        </div>

      </main>
    </div>
  )
}

