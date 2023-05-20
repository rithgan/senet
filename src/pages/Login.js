import React, { useContext, useCallback, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import web3Modal from ".././modal";
import { ConnectContext } from '../context/ConnectContext';
import { NetworkContext } from '../context/NetworkContext';
import { ethers } from "ethers";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Swal from 'sweetalert2'

import { checkStakeInfo } from '../utils';
const config = require('../config.json')

export default function Login({ ipAddress, onLogin }) {
    const [account, setAccount] = useContext(NetworkContext);
    const [provider, setProvider, checkNetwork] = useContext(ConnectContext)
    // const history = useContext(HistoryContext)
    const history = useHistory();

    const connectWallet = useCallback(async () => {
        try {
            //console.log("Wallet connect called");
            const instance = await web3Modal().connect();
            // setInstance(instance);
            let provider = new ethers.providers.Web3Provider(instance,'any');
            setProvider(provider);
            const accounts = await provider.listAccounts();
            if (accounts) {
                setAccount(accounts[0]);
                return account
            }
            return false
            //console.log(account)
        } catch (error) {
            console.error(error?.message);
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: error?.message
            // })
        }
    }, [account, setAccount, setProvider]);

    const refreshState = useCallback(() => {
        setAccount();
    }, [setAccount]);

    const disconnectWallet = useCallback(async () => {
        try {
            // console.log("Wallet disconnect called");
            web3Modal().clearCachedProvider();
            //   setAccount([])
            refreshState();
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }, [refreshState]);

    useEffect(() => {
        if (web3Modal().cachedProvider) {
            connectWallet();
        }
    }, [connectWallet]);

    useEffect(() => {
        if (provider) {
            const handleAccountsChanged = (accounts) => {
                console.log("accountsChanged", accounts);
                if (accounts) setAccount(accounts[0]);
            };

            const handleDisconnect = () => {
                // console.log("disconnect");
                disconnectWallet();
            };
            provider.provider.on("accountsChanged", handleAccountsChanged);
            provider.provider.on("disconnect", handleDisconnect);

            return () => {
                if (provider.provider.removeListener) {
                    provider.provider.removeListener("accountsChanged", handleAccountsChanged);
                    provider.provider.removeListener("disconnect", handleDisconnect);
                }
            };
        }
    }, [disconnectWallet, provider, setAccount]);

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            // let address = account, ip = ipAddress
            let response = await connectWallet()
            // console.log(address, ip, history)
            if (response) {
                console.log(response)
                setTimeout(async()=>{
                    let res = await checkNetwork()
                    console.log(res)
                    if (res) {
                        login();
                    }
                },100)
            }
        } catch (err) {
            // console.log(err?.message)
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: err?.message
            // })
        }
    }

    const login = async () => {

        let address = account, ip = ipAddress
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
        // console.log(axiosConfig)
        let response = await axios.request(axiosConfig)
        response = response.data
        // console.log(response.data)
        if (response.status) {
            // console.log(response,data)
            let loginData = response.data
            loginData.address = address
            setLoginData(loginData)
            onLogin(response.data)
            let res = checkStakeInfo(ipAddress, loginData)
            if (res) {
                history.push('/dash');
            } else {
                history.push('/stake');
            }
            // console.log('going to dash')
        }
        else if (response.code === 30) {
            Swal.fire({
                icon: 'info',
                title: 'LinkDao Defi',
                text: response?.message
            }).then(() => {
                history.push('/register');
            })
        }
    };
    function setLoginData(loginData) {
        localStorage.setItem('loginData', JSON.stringify(loginData));
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
                                    <span className="app-brand-text demo text-body fw-bolder" style={{ textTransform: "initial" }}>Link<span className='text-info'>Dao</span> </span>
                                </Link>
                            </div>
                            {/* /Logo */}
                            <h4 className="mb-2 text-info">Login 🔒</h4>
                            <p className="mb-4">Explore the multiple possibilites with our unique Eco-System.</p>
                            {/* Connect with lkd form and action, go to dash.php */}
                            {/* <form id="formAuthentication" className="mb-3" action="/dash" method="POST"> */}
                            <form id="formAuthentication" className="mb-3" onSubmit={handleLogin}>
                                <button className="btn btn-info d-grid w-100" >Connect With LKD</button>
                            </form>
                            <div className="text-center">
                                {/* registeration button */}
                                <Link to="/register" className="d-flex align-items-center justify-content-center text-info">

                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
