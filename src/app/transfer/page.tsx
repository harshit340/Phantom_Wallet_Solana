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
      <main className="flex items-center justify-center min-h-screen">
                <div className="border hover:border-slate-900 rounded p-4">
                    <h1>This is the transfer Page</h1>
                    <input
                        type="text"
                        placeholder="Recipient Public Key"
                        value={receipientKey}
                        onChange={(e) => setReceipientKey(e.target.value)}
                        className="border rounded p-2 mt-4"
                    />
                    <button onClick={sendSols} className="ml-4 p-2 bg-blue-500 text-white rounded">
                        Send 1 LAMPORT
                    </button>
                    {signature && (
                        <div className="mt-4">
                            <h2>Transaction Signature: {signature}</h2>
                        </div>
                    )}
                </div>
            </main>
    </div>
  )
}
