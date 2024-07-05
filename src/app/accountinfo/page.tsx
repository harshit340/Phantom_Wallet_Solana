"use client";
// The dynamic function from Next.js is used to dynamically import components. This is particularly useful for code splitting and improving the initial load time of your application.

import dynamic from "next/dynamic"; 
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL , Connection, clusterApiUrl} from "@solana/web3.js";
import { FC, useEffect, useState } from "react";

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

const devnetConnection = new Connection(clusterApiUrl('devnet'));

export default function Accountinfo() {

    
        const [balance, setBalance] = useState(0);
        const { connection } = useConnection();
        const { publicKey } = useWallet();
      
        useEffect(() => {
          if (!connection || !publicKey) {
            return;
          }
      
          const fetchBalance = async () => {
            try {
                const accountInfo = await connection.getAccountInfo(publicKey);
                if (accountInfo) {
                    const lamports = accountInfo.lamports;
                    setBalance(lamports / LAMPORTS_PER_SOL);
                }
            } catch (error) {
                console.error('Error fetching account info:', error);
            }
        };

        fetchBalance();
      
         
        }, [connection, publicKey]);

  return (
    <div>
      <main>
        <div style={{display:"flex"}}>
          <WalletMultiButton />
          <WalletDisconnectButton/>
          
        </div>
       <h1>Balance: {balance} SOL</h1>
      </main>
    </div>
  )
}

