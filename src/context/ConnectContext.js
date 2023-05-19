import { useState, createContext, useEffect } from "react";
import Swal from 'sweetalert2'

export const ConnectContext = createContext();

export const ConnectProvider = ({ children }) => {
  const [provider, setProvider] = useState();
  async function checkNetwork() {
    const network = await provider.getNetwork();
    if (network.name !== 'bnb') {
      Swal.fire({
        icon: 'error',
        title: 'LinkDao Defi',
        text: 'Error: Please connect to the BSC mainnet. Otherwise all you transactions will fail.'
      })
      return false
    } else {
      // User is connected to the Ethereum mainnet, continue with your logic
      // ...
      console.log("Connected to bsc mainnet")
      return true
    }
  }
  return (
    <ConnectContext.Provider value={[provider, setProvider, checkNetwork]}>
      {children}
    </ConnectContext.Provider>
  );
};