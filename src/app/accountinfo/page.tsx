/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { useConnection,useWallet} from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import React from 'react'

export default function page() {

    const [balance , setbalance] = React.useState(0);
    const {connection }= useConnection();
    const {publicKey} = useWallet();
    const devnetKey = new PublicKey('29rHdyhBMQHMESWusiVZhDeCigrNGAXoWo45xDMa5s14');

    const requestAirDrop = async(key) =>{
        try{
            const signature = await connection.requestAirdrop(key , 0.5 * LAMPORTS_PER_SOL)
            await connection.confirmTransaction(signature);
            const accountInfo = await connection.getAccountInfo(key);
            if (accountInfo) {
                setbalance(accountInfo.lamports / LAMPORTS_PER_SOL);
            }
        }catch (error) {
            console.error('Error requesting airdrop:', error);
        }
    }

/*     useConnection will retrieve a Connection object and useWallet will get the WalletContextState. WalletContextState has a property publicKey that is null when not connected to a wallet and has the public key of the user’s account when a wallet is connected */
   requestAirDrop(devnetKey);
    React.useEffect(()=>{
        if(!connection || !publicKey){
          return;
        }
     
        const fetchBalance = async () => {
            try {
                const accountInfo = await connection.getAccountInfo(devnetKey);
                if (accountInfo) {
                    const lamports = accountInfo.lamports;
                    setbalance(lamports / LAMPORTS_PER_SOL);
                }
            } catch (error) {
                console.error('Error fetching account info:', error);
            }
        };

        //fetch initial balance
        fetchBalance();
    }, [connection, devnetKey])


  return (
    <div>
       <h1>Balance: {balance} SOL</h1>
    </div>
  )
}
