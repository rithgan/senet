import React,{useContext,useState, useCallback, useEffect} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { NetworkContext } from '../context/NetworkContext';
import axios from 'axios';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import '../css/sweetalert-dark-theme.css';
import web3Modal from ".././modal";
import { ethers } from "ethers";
import { ConnectContext } from '../context/ConnectContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const config = require('../config.json')

export default function Register({ipAddress}) {
    const [account, setAccount] = useContext(NetworkContext);
    const [provider, setProvider] = useContext(ConnectContext)
    const [splid, setSplid] = useState('')
    const history = useHistory();
    const handleRegister = (e)=>{
        e.preventDefault()
        
            connectWallet()
        let data = JSON.stringify({
            "splid":splid,
            "address": account,
            "ip": ipAddress
          });
          
          let axiosConfig = {
            method: 'post',
            url:`${config.baseUrl}/api/register`,
            headers: { 
              'address': account, 
              'ip': ipAddress, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          console.log(axiosConfig)
          axios.request(axiosConfig)
          .then((response) => {
            console.log(JSON.stringify(response));
            let res = (response.data);
            console.log(res.message);
            if(res.status)
            {
                Swal.fire({
                    icon: 'info',
                    title: 'LinkDao Defi',
                    text: res.message
                  })
            }
            else{
                Swal.fire({
                    icon: 'warning',
                    title: 'LinkDao Defi',
                    text: res.message
                  })
                  if(res.code === 30)
                  {
                    history.push('/');
                  }
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
    const handleSlid = (e)=>{
        e.preventDefault()
        checkSplid(splid);
    }

    function checkSplid(slid)
    {
        if(slid.length > 4 && account.length > 10 && ipAddress.length > 6)
        {
        let data = JSON.stringify({
            "splid":slid,
            
          });
          
          let axiosConfig = {
            method: 'post',
            url:`${config.baseUrl}/api/checksponsor`,
            headers: { 
              'address': account, 
              'ip': ipAddress, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          console.log(axiosConfig)
          axios.request(axiosConfig)
          .then((response) => {
            let res = (response.data);
            console.log(res);
            if(res.status)
            {
                setSplid(slid)
                Swal.fire({
                    icon: 'info',
                    title: 'LinkDao Defi',
                    text: res.message
                  })
            }
            else{
            
                Swal.fire({
                    icon: 'warning',
                    title: 'LinkDao Defi',
                    text: res.message
                  })
                }
          })
          .catch((error) => {
            console.log(error);
          });
        }
    }


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
            console.error(error?.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error?.message
              })
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

    useEffect(()=>{
        const queryParameters = new URLSearchParams(window.location.search)
        const type = queryParameters.get("slid")
        console.log(type);
        if(type)
        {
            checkSplid(type);
        }
    })
    return (
        <div className="container-xxl">
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner py-4">
                    {/* Forgot Password */}
                    <div className="card">
                        <div className="card-body">
                            {/* Logo */}
                            <div className="app-brand justify-content-center">
                                {/* go back to login pages */}
                                <Link to="/" className="app-brand-link gap-2">
                                    <span className="app-brand-logo demo">
                                        <img src="assets/ficon.svg" style={{ height: '40px', width: 'auto' }} alt="ficon" />
                                    </span>
                                    <span className="app-brand-text demo text-body fw-bolder" style={{ textTransform: 'capitalize' }}>LinkDao Defi</span>
                                </Link>
                            </div>
                            {/* /Logo */}
                            <h4 className="mb-2">New Staker 🔒</h4>
                            <p className="mb-4">Explore the multiple possibilites with our unique token</p>
                            {/* Connect with lkd form and action, go to dash.php */}
                            <form id="formAuthentication" className="mb-3" onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Sponsor ID</label>
                                    <input type="text" className="form-control" id="splid" name="splid" placeholder="Enter Sponsor ID" value={splid} onChange={(e) => setSplid(e.target.value)} onBlur={handleSlid}/>
                                </div>
                                <button className="btn btn-primary d-grid w-100">Connect With LKD</button>
                            </form>
                            <div className="text-center">
                                {/* go back to login php */}
                                <Link to="/" className="d-flex align-items-center justify-content-center">
                                    <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm" />
                                    Back to login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
