import React,{useCallback,useContext,useEffect,useState} from 'react'
import { ethers } from 'ethers';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { NetworkContext } from '../context/NetworkContext';
import { ConnectContext } from '../context/ConnectContext';
import web3Modal from ".././modal";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import '../css/sweetalert-dark-theme.css';
import axios from 'axios';
import { IpContext } from '../context/IpContext';
import { MobileSidebarContext } from '../context/MobileSidebarContext';
import { getPrice, truncateAddress } from '../utils';
const config = require('../config.json')



export default function Header() {
    const [account, setAccount] = useContext(NetworkContext);
    const [provider, setProvider] = useContext(ConnectContext)
    const history = useHistory();
    const [ipAddress, setIpAddress] = useContext(IpContext)
    const [price, setPrice] = useState(0);
    const [mobileOpen, setMobileOpen] = useContext(MobileSidebarContext)

    const handlePrice = useCallback(async () => {
        let pr = await getPrice();
        setPrice(pr);
      }, []);

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
        handlePrice();
      }, [handlePrice]);

    const handleLogout =useCallback( async () => {
        // disconnectWallet()
        try {
          const loginData = JSON.parse(localStorage.getItem('loginData'));
          let data = JSON.stringify({
            "address": account,
            "ip": ipAddress,
            "ulid": loginData?.ulid
          });
    
          let axiosConfig = {
            method: 'post',
            url: `${config.baseUrl}/api/logout`,
            headers: {
              'address': account,
              'ip': ipAddress,
              'ulid': '6049090',
              'auth': loginData?.auth,
              'token': loginData?.token,
              'Content-Type': 'application/json'
            },
            data: data
          };
          let response = await axios.request(axiosConfig)
          response = response.data
          console.log('logging out')
          console.log(response)
          localStorage.removeItem('loginData'); 
          history.push('/');
    
        } catch (error) {
          console.error(error)
        }
      },[account, history, ipAddress]);

    useEffect(() => {
        console.log(provider)
        if (provider?.on) {
            const handleAccountsChanged = (accounts) => {
                console.log("accountsChanged", accounts);
                if (accounts) {setAccount(accounts[0]);
                handleLogout()
                }
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
    }, [handleLogout, provider, setAccount]);
    return (
        <>
            <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0   d-xl-none ">
                    <span onClick={()=>setMobileOpen(true)} className="nav-item nav-link px-0 me-xl-4" style={{zIndex:9000}}>
                        <i className="bx bx-menu bx-sm" />
                    </span >
                </div>
                <div className="navbar-nav align-items-center">
                    <div className="nav-item navbar-search-wrapper mb-0">
                        <span className="nav-item nav-link search-toggler px-0">
                            <span className="d-none d-md-inline-block text-info">LKD/USD : {price} </span>
                        </span>
                    </div>
                </div>
                <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        {/* Style Switcher */}
                        <li className="nav-item me-2 me-xl-0">
                            <span className="nav-link style-switcher-toggle hide-arrow">
                                <i className="bx bx-sm" />
                            </span>
                        </li>
                        {/*/ Style Switcher */}
                        {/* Quick links  */}
                        <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0">
                            <span className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                <i className="bx bx-grid-alt bx-sm" />
                            </span>
                            <div className="dropdown-menu dropdown-menu-end py-0">
                                <div className="dropdown-menu-header border-bottom">
                                    <div className="dropdown-header d-flex align-items-center py-3">
                                        <h5 className="text-body mb-0 me-auto">Shortcuts</h5>
                                    </div>
                                </div>
                                <div className="dropdown-shortcuts-list scrollable-container">
                                    <div className="row row-bordered overflow-visible g-0">
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                <i className="bx bx-calendar fs-4" />
                                            </span>
                                            <a href="#" className="stretched-link">Calendar</a>
                                            <small className="text-muted mb-0">Appointments</small>
                                        </div>
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                <i className="bx bx-food-menu fs-4" />
                                            </span>
                                            <a href="#" className="stretched-link">Invoice App</a>
                                            <small className="text-muted mb-0">Manage Accounts</small>
                                        </div>
                                    </div>
                                    <div className="row row-bordered overflow-visible g-0">
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                <i className="bx bx-user fs-4" />
                                            </span>
                                            <a href="app-user-list.html" className="stretched-link">User App</a>
                                            <small className="text-muted mb-0">Manage Users</small>
                                        </div>
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                <i className="bx bx-check-shield fs-4" />
                                            </span>
                                            <a href="app-access-roles.html" className="stretched-link">Role Management</a>
                                            <small className="text-muted mb-0">Permission</small>
                                        </div>
                                    </div>
                                    <div className="row row-bordered overflow-visible g-0">
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                <i className="bx bx-pie-chart-alt-2 fs-4" />
                                            </span>
                                            <a href="index.html" className="stretched-link">Dashboard</a>
                                            <small className="text-muted mb-0">User Profile</small>
                                        </div>
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                <i className="bx bx-cog fs-4" />
                                            </span>
                                            <a href="pages-account-settings-account.html" className="stretched-link">Setting</a>
                                            <small className="text-muted mb-0">Account Settings</small>
                                        </div>
                                    </div>
                                    <div className="row row-bordered overflow-visible g-0">
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                <i className="bx bx-help-circle fs-4" />
                                            </span>
                                            <a href="pages-help-center-landing.html" className="stretched-link">Help Center</a>
                                            <small className="text-muted mb-0">FAQs &amp; Articles</small>
                                        </div>
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                <i className="bx bx-window-open fs-4" />
                                            </span>
                                            <a href="modal-examples.html" className="stretched-link">Modals</a>
                                            <small className="text-muted mb-0">Useful Popups</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item me-2 me-xl-0">
                            <span className="btn btn-info text-nowrap">
                                <i className="bx bx-user-check me-1" />{truncateAddress(account)}
                            </span>
                        </li>
                        {/* <li class="nav-item navbar-dropdown dropdown-user dropdown">
							    <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
							      <div class="avatar avatar-online">
							        <img src="assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle">
							      </div>
							    </a>
							    <ul class="dropdown-menu dropdown-menu-end">
							      <li>
							        <a class="dropdown-item" href="login.php" target="_blank">
							          <i class="bx bx-power-off me-2"></i>
							          <span class="align-middle">Log Out</span>
							        </a>
							      </li>
							    </ul>
							  </li> */}
                    </ul>
                </div>
            </nav>
        </>
    )
}
