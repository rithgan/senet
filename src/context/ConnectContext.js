import { useState, createContext, useEffect, useCallback } from "react";
import Swal from 'sweetalert2'
import web3Modal from "../modal";
import { ethers } from "ethers";

export const ConnectContext = createContext();

export const ConnectProvider = ({ children }) => {
  const [provider, setProvider] = useState();
  const checkNetwork = async()=> {
    const network = await provider.getNetwork();
    if (network.name !== 'bnb') {
      Swal.fire({
        icon: 'error',
        title: 'LinkDao Defi',
        text: 'Error: Please connect to the BSC mainnet. Otherwise all your transactions will fail.'
      })
      return false
    } else {
      // User is connected to the Ethereum mainnet, continue with your logic
      // ...
      console.log("Connected to bsc mainnet")
      return true
    }
  }

  useEffect(()=>{
    const handleProvider = async()=>{
      const instance = await web3Modal().connect();
      let provider = new ethers.providers.Web3Provider(instance,'any');
      setProvider(provider);
    }
    handleProvider()
  },[])

  return (
    <ConnectContext.Provider value={[provider, setProvider, checkNetwork]}>
      {children}
    </ConnectContext.Provider>
  );
};