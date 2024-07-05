"use client"
import { ConnectionProvider, WalletProvider, ReactNode } from '@solana/wallet-adapter-react'
import React, { useMemo } from 'react'
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css');

interface AppwalletproviderProps {
    children: ReactNode;
  }


const Appwalletprovider: React.FC<AppwalletproviderProps> = ({ children }) =>{
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
        ],
        [network]
    );
  return (
  <ConnectionProvider  endpoint={endpoint}>
    <WalletProvider  wallets={wallets} autoConnect>
    <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
  )
}
export default Appwalletprovider;

