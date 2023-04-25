import React, { useContext, useCallback, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import web3Modal from ".././modal";
import { ConnectContext } from '../context/ConnectContext';
import { NetworkContext } from '../context/NetworkContext';
import { ethers } from "ethers";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const config = require('../config.json')

export default function Login({ ipAddress,onLogin }) {
    const [account, setAccount] = useContext(NetworkContext);
    const [provider, setProvider] = useContext(ConnectContext)
    // const history = useContext(HistoryContext)
    const history = useHistory();

    const connectWallet = useCallback(async () => {
        try {
            console.log("Wallet connect called");
            const instance = await web3Modal().connect();
            // setInstance(instance);
            let provider = new ethers.providers.Web3Provider(instance);
            setProvider(provider);
            const accounts = await provider.listAccounts();
            if (accounts) {
                setAccount(accounts[0]);
            }
        } catch (error) {
            console.error(error);
        }
    }, [setAccount, setProvider]);

    useEffect(() => {
        if (web3Modal().cachedProvider) {
            connectWallet();
        }
    },[]);

    useEffect(() => {
        if (provider?.on) {
            const handleAccountsChanged = (accounts) => {
                console.log("accountsChanged", accounts);
                if (accounts) setAccount(accounts[0]);
            };

            //   const handleDisconnect = () => {
            //     console.log("disconnect", error);
            //     disconnectWallet();
            //   };

            provider.on("accountsChanged", handleAccountsChanged);
            //   provider.on("disconnect", handleDisconnect);

            return () => {
                if (provider.removeListener) {
                    provider.removeListener("accountsChanged", handleAccountsChanged);
                    //   provider.removeListener("disconnect", handleDisconnect);
                }
            };
        }
    }, [provider, setAccount]);

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            let address = account, ip = ipAddress
            connectWallet()
            console.log(address, ip, history)
            let data = JSON.stringify({
                "address": address,
                "ip": ip
            });
            let axiosConfig = {
                method: 'post',
                url: `${config.baseUrl}/api`,
                headers: {
                    'address': address,
                    'ip': ip,
                    'Content-Type': 'application/json'
                },
                data: data
            };
            let response = await axios.request(axiosConfig)
            response = response.data
            if (response.status) {
                let loginData = response.data
                console.log(loginData)
                setLoginData(loginData)
                onLogin(response.data)
                history.push('/dash');
                console.log('going to dash')
            }
        } catch (err) {
            console.log(err)
        }
    }

    function setLoginData (loginData){
        sessionStorage.setItem('loginData', JSON.stringify(loginData));
    }
    return (
        <div className="container-xxl">
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner py-4">
                    {/* Forgot Password */}
                    <div className="card">
                        <div className="card-body">
                            {/* Logo */}
                            <div className="app-brand justify-content-center">
                                <Link to="/" className="app-brand-link gap-2">
                                    <span className="app-brand-logo demo">
                                        <img src="assets/ficon.svg" style={{ height: '40px', width: 'auto' }} alt='ficon' />
                                    </span>
                                    <span className="app-brand-text demo text-body fw-bolder">LinkDao Defi</span>
                                </Link>
                            </div>
                            {/* /Logo */}
                            <h4 className="mb-2">Login Staker 🔒</h4>
                            <p className="mb-4">Explore the multiple possibilites with our unique token</p>
                            {/* Connect with lkd form and action, go to dash.php */}
                            {/* <form id="formAuthentication" className="mb-3" action="/dash" method="POST"> */}
                            <form id="formAuthentication" className="mb-3" onSubmit={handleLogin}>
                                <button className="btn btn-primary d-grid w-100" >Connect With LKD</button>
                            </form>
                            <div className="text-center">
                                {/* registeration button */}
                                <Link to="/register" className="d-flex align-items-center justify-content-center">
                                    <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm" />
                                    New Staker? Click
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
