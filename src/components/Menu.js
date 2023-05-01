import React, { useContext, useCallback, useEffect,useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ConnectContext } from '../context/ConnectContext';
import { NetworkContext } from '../context/NetworkContext';
import { IpContext } from '../context/IpContext';
import web3Modal from ".././modal";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { MobileSidebarContext } from '../context/MobileSidebarContext';
import useWindowDimensions from '../hooks/useWindowDimensions';
const config = require('../config.json')

export default function Menu() {
  const [account, setAccount] = useContext(NetworkContext);
  const [provider, setProvider] = useContext(ConnectContext)
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen,setIsSubMenuOpen] = useState(false)
  const [isSubWalletOpen,setIsSubWalletOpen] = useState(false)
  const [ipAddress] = useContext(IpContext);
  const [mobileOpen, setMobileOpen] = useContext(MobileSidebarContext)
  const { height, width } = useWindowDimensions();

  const history = useHistory();
  const refreshState = useCallback(() => {
    setAccount();
  }, [setAccount]);

  const disconnectWallet = useCallback(async () => {
    try {
      console.log("Wallet disconnect called");
      web3Modal().clearCachedProvider();
      // setAccount([])
      refreshState();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }, [refreshState]);

  useEffect(() => {
    if (provider?.on) {
      // const handleAccountsChanged = (accounts) => {
      //   console.log("accountsChanged", accounts);
      //   if (accounts) setAccount(accounts[0]);
      // };

      const handleDisconnect = () => {
        console.log("disconnect");
        disconnectWallet();
      };

      // provider.on("accountsChanged", handleAccountsChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          // provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [disconnectWallet, provider, setAccount]);

  const handleLogout = async () => {
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
  };

  const handleMouseEnter = () => {
    if (width > 1199.98) {
      setIsOpen(true);
    }
    // setTimeout(()=>setIsSubMenuOpen(true),100)
    
  };

  const handleMouseLeave = () => {
    if (width > 1199.98) {
      setIsOpen(false);
    }
    // setIsSubMenuOpen(false)
  };
  let sidebarStyle = {}
  if (width > 1199.98) {
  sidebarStyle = {
    // display: isOpen ? 'block' : 'none',
    width:isOpen?'16.25rem':'5rem'

    // Add other styles as needed
  }}else{
    if (mobileOpen){
      sidebarStyle = {
      // display: isOpen ? 'block' : 'none',
      transform: 'translate3d(0, 0, 0)'
      // Add other styles as needed
    }
    }else{
      sidebarStyle = {
        // display: isOpen ? 'block' : 'none',
        transform: 'translate3d(-100%, 0, 0)'
        // Add other styles as needed
      }
    }
    
  }
  
  const subMenuStyle= {
    display: isSubMenuOpen ? 'block' : 'none',
  }
  const subWalletStyle= {
    display: isSubWalletOpen ? 'block' : 'none',
  }

  useEffect(()=>{
    console.log("mobile open",mobileOpen)
    if(mobileOpen){
      setIsOpen(true)
      // setIsSubMenuOpen(true)
    }else{
      setIsOpen(false)
      // setIsSubMenuOpen(false)
    }
  },[mobileOpen])
  return (

    <aside id="layout-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="layout-menu menu-vertical menu bg-menu-theme" style={sidebarStyle}>
      <div className="app-brand demo ">
        <Link to="/dash" className="app-brand-link">
          <span className="app-brand-logo demo">
            <img src="assets/ficon.svg" style={{ height: '40px', width: 'auto' }} alt='ficon' />
          </span>
          {isOpen?<span className="app-brand-text demo menu-text fw-bolder ms-2">LKD</span>:''}
        </Link>
        {isOpen?<span className="layout-menu-toggle menu-link text-large ms-auto">
          <i className="bx bx-chevron-left bx-sm align-middle" />
        </span>:""}
      </div>
      <div className="menu-inner-shadow" />
      <ul className="menu-inner py-1">
        {/* Dashboards */}
        <li className="menu-item ">
          <Link to="/dash" className="menu-link">
            <i className="menu-icon tf-icons bx bx-envelope" />
            {isOpen?<div data-i18n="Dashboards">Dashboards</div>:""}
          </Link>
        </li>
        {/* Layouts */}
        <li className="menu-item active open" style={sidebarStyle} onClick={()=>setIsSubMenuOpen(!isSubMenuOpen)}>
          <span  className={`menu-link ${isOpen?'menu-toggle':''}`}>
            <i className="menu-icon tf-icons bx bx-user"  />
            {isOpen?<div data-i18n="Layouts">Profile</div>:''}
          </span>
          <ul className="menu-sub" style={subMenuStyle}>
            <li className="menu-item active">
              <Link to="/profile" className="menu-link ">
                <div data-i18n="Collapsed menu">View</div>
              </Link>
            </li>
            <li className="menu-item active">
              <Link to="/downline" className="menu-link">
                <div data-i18n="Content navbar">DownLine</div>
              </Link>
            </li>
            <li className="menu-item active">
              <Link to="/business" className="menu-link">
                <div data-i18n="Content nav + Sidebar">Business</div>
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item ">
          <Link to="/stake" className="menu-link">
            <i className="menu-icon tf-icons bx bx-money" />
            {isOpen?<div data-i18n="Kanban">Stake</div>:''}
          </Link>
        </li>
        <li className="menu-item ">
          <Link to="/income" className="menu-link">
            <i className="menu-icon tf-icons bx bx-calendar-heart" />
            {isOpen?<div data-i18n="Invoice">Awards/Rewards</div>:''}
          </Link>
        </li>
        {/*  <li class="menu-item">
        <Link to="javascript:void(0);" class="menu-link menu-toggle">
          <i class='menu-icon tf-icons bx bx-food-menu'></i>
          <div data-i18n="Invoice">Awards</div>
        </Link>
        <ul class="menu-sub">
          <li class="menu-item">
            <Link to="app-invoice-list.html" class="menu-link">
              <div data-i18n="List">Proformence Award</div>
            </Link>
          </li>
          <li class="menu-item">
            <Link to="app-invoice-preview.html" class="menu-link">
              <div data-i18n="Preview">VIP Award</div>
            </Link>
          </li>
          <li class="menu-item">
            <Link to="app-invoice-edit.html" class="menu-link">
              <div data-i18n="Edit">Passive reward</div>
            </Link>
          </li>
          <li class="menu-item">
            <Link to="app-invoice-add.html" class="menu-link">
              <div data-i18n="Add">Top Refrral</div>
            </Link>
          </li>
          <li class="menu-item">
            <Link to="app-user-view-account.html" class="menu-link">
              <div data-i18n="Account">Royalty</div>
            </Link>
          </li>
          <li class="menu-item">
            <Link to="app-user-view-account.html" class="menu-link">
              <div data-i18n="Account">Royalty Award</div>
            </Link>
          </li>
        </ul>
      </li> */}
        <li className="menu-item active open" style={sidebarStyle} onClick={()=>setIsSubWalletOpen(!isSubWalletOpen)}>
          <span  className={`menu-link ${isOpen?'menu-toggle':''}`}>
            <i className="menu-icon tf-icons bx bx-layout" />
            {isOpen?<div data-i18n="Users">Wallet</div>:''}
          </span>
          <ul className="menu-sub" style={subWalletStyle}>
            <li className="menu-item active">
              <Link to="/wallet" className="menu-link">
                <div data-i18n="List">View</div>
              </Link>
            </li>
            <li className="menu-item active">
              <Link to="/request" className="menu-link">
                <div data-i18n="Billing & Plans">Withdrawl Request</div>
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item ">
          <Link to="/support" className="menu-link">
            <i className="menu-icon tf-icons bx bx-support" />
            {isOpen?<div data-i18n="Roles & Permissions">Support</div>:''}
          </Link>
        </li>
        {/* <li className="menu-item ">
          <Link to="/ticket" className="menu-link">
            <i className="menu-icon tf-icons bx bx-help-circle" />
            {isOpen?<div data-i18n="Roles & Permissions">Ticket</div>:''}
          </Link>
        </li> */}
        <li className="menu-item ">
          <Link onClick={() => handleLogout()} to="/" className="menu-link">
            <i className="menu-icon tf-icons bx bx-exit" />
            {isOpen?<div data-i18n="Login">Disconnect</div>:''}
          </Link>
        </li>
      </ul>
    </aside>
  );
}
