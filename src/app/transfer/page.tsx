/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { useConnection , useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

import React from 'react'

export default function page() {

    const {publicKey , sendTransaction} = useWallet();
    const {connection} = useConnection();
    const [receipientKey, setReceipientKey] = React.useState("");
    const [signature, setSignature] = React.useState("");
    
    const sendSols = async()=>{
        if(!publicKey){
            throw new Error("wallet is not connected !!");
        }
        try{
            const receipient = new PublicKey(receipientKey);
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey:publicKey,
                    toPubkey:receipient,
                    lamports:LAMPORTS_PER_SOL,
                })
            );
            const signature = await sendTransaction(transaction,connection);
            setSignature
        }catch(error){
        console.error("Transaction failed",error);
        }
    };

  return (
    <div>
           <input type="text"  placeholder="Recipient Public Key" value={receipientKey} onChange={(e) => setReceipientKey(e.target.value)}/>    
   <button onClick={sendSols} >Send</button>
                    
                
            
    </div>
  )
}
