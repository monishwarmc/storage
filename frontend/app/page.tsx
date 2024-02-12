"use client"

import { Contract } from "ethers";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "../public/abi.json";

export default function Page() {
  const [value, setValue] = useState(0);
  const [input, setInput] = useState(0);
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState(""); 
  let conAdd = '0xE225DfFc9Fd5bAf3Dafd7AE56ffB61A14B13DdE6';
  let provider;
  let signer;

  const connect = async () => {
    if (window.ethereum != null && window.ethereum !== undefined) {
      try {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        console.log("Connected to MetaMask!", signer.address);
        setAddress(signer.address);
        const contract = new Contract(conAdd, abi, signer);
        setContract(contract); 
      } catch (error) {
        console.error(error);
      }
    }
  }

  const retrieve = async () => {
    if (contract) { 
      let val = await contract.retrieve();
      console.log(val.toString());
      setValue(val.toString());
    }
  } 

  const store = async () => {
    if (contract) { 
      let tx = await contract.store(input);
      await tx.wait();
      console.log(tx);
    }
  }


  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-16">
      {(address == "") ? (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={connect}>
          Connect
        </button>
      ) : (
        <h1 className="text-xl">{address}</h1>
      )}
      <input
        onChange={(e) => setInput(e.target.value)}
        type="number"
        className="border bg-neutral-500 text-blue-300 border-gray-300 rounded-md py-2 px-1 focus:outline-none focus:border-blue-500"
      />

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={store}>
        Store
      </button>
      <h1 className="text-3xl">Value : {value}</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={retrieve}>
        Retrieve
      </button>
    </div>
  );
}
