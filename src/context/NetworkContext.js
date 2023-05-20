import { useState, createContext, useContext, useEffect, useCallback } from "react";
import { ConnectContext } from "./ConnectContext";
import web3Modal from "../modal";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



export const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [provider, setProvider] = useContext(ConnectContext)
  const history = useHistory();

  const refreshState = useCallback(() => {
    setAccount();
  }, [setAccount]);

  // const disconnectWallet = useCallback( () => {
  //   try {
  //     console.log("Wallet disconnect called");
  //     web3Modal().clearCachedProvider();
  //     //   setAccount([])
  //     // refreshState();
  //     // window.location.reload();
  //     setProvider(null)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);
  useEffect(() => {
    if (provider) {
      const handleAccounts = async () => {
        const accounts = await provider.listAccounts();
        if (accounts) {
          setAccount(accounts[0]);
        }
      }
      handleAccounts()
    }
  })

  useEffect(() => {
    if (provider) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
        history.push('/')
      };

      // const handleDisconnect = () => {
      //   // console.log("disconnect");
      //   disconnectWallet();
      // };
      provider.provider.on("accountsChanged", handleAccountsChanged);
      provider.provider.on("disconnect", () => {
        console.log('Wallet disconnected');
        provider.removeAllListeners();
        history.push('/')
        web3Modal().clearCachedProvider();
        sessionStorage.removeItem('loginData');
        // setProvider(null);
        // window.location.reload()
      });

      // return () => {
      //   if (provider.provider.removeListener) {
      //     console.log("remvoe listener called")
      //     provider.provider.removeListener("accountsChanged", handleAccountsChanged);
      //     provider.provider.removeListener("disconnect", handleDisconnect);
      //   }
      // };
    }
  }, [history, provider, setAccount, setProvider]);
  return (
    <NetworkContext.Provider value={[account, setAccount]}>
      {children}
    </NetworkContext.Provider>
  );
};