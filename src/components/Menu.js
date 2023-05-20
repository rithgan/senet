import React, { useContext, useCallback, useEffect, useState } from 'react'
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
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const [isSubWalletOpen, setIsSubWalletOpen] = useState(false)
  const [ipAddress] = useContext(IpContext);
  const [mobileOpen, setMobileOpen] = useContext(MobileSidebarContext)
  const { height, width } = useWindowDimensions();

  const history = useHistory();
  const refreshState = useCallback(() => {
    setAccount();
  }, [setAccount]);

  const disconnectWallet = useCallback(async () => {
    try {
        // console.log("Wallet disconnect called");
        web3Modal().clearCachedProvider();
        provider.removeAllListeners();
        // setAccount([])
        //   refreshState();
        //   window.location.reload();
    } catch (error) {
        console.error(error);
    }
}, [provider]);

  // useEffect(() => {
  //   if (provider?.on) {
  //     // const handleAccountsChanged = (accounts) => {
  //     //   console.log("accountsChanged", accounts);
  //     //   if (accounts) setAccount(accounts[0]);
  //     // };

  //     const handleDisconnect = () => {
  //       // console.log("disconnect");
  //       disconnectWallet();
  //     };

  //     // provider.on("accountsChanged", handleAccountsChanged);
  //     provider.on("disconnect", handleDisconnect);

  //     return () => {
  //       if (provider.removeListener) {
  //         // provider.removeListener("accountsChanged", handleAccountsChanged);
  //         provider.removeListener("disconnect", handleDisconnect);
  //       }
  //     };
  //   }
  // }, [disconnectWallet, provider, setAccount]);

  const handleLogout = async () => {
    disconnectWallet()
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
      // console.log('logging out')
      // console.log(response)
      localStorage.removeItem('loginData');
      history.push('/');

    } catch (error) {
      console.error(error)
    }
  };

  const handleMouseEnter = () => {
    if (width > 1199.98) {
      setTimeout(() => setIsOpen(true), 100)
    }
    // setTimeout(()=>setIsSubMenuOpen(true),100)

  };

  const handleMouseLeave = () => {
    if (width > 1199.98) {
      setTimeout(() => setIsOpen(false), 100)
      setIsSubMenuOpen(false)
      setIsSubWalletOpen(false)
    }
    // setIsSubMenuOpen(false)
  };
  let sidebarStyle = {}
  if (width > 1199.98) {
    sidebarStyle = {
      // display: isOpen ? 'block' : 'none',
      width: isOpen ? '16.25rem' : '5rem'

      // Add other styles as needed
    }
  } else {
    if (mobileOpen) {
      sidebarStyle = {
        // display: isOpen ? 'block' : 'none',
        transform: 'translate3d(0, 0, 0)'
        // Add other styles as needed
      }
    } else {
      sidebarStyle = {
        // display: isOpen ? 'block' : 'none',
        transform: 'translate3d(-100%, 0, 0)'
        // Add other styles as needed
      }
    }

  }

  const subMenuStyle = {
    display: isSubMenuOpen ? 'block' : 'none',
  }
  const subWalletStyle = {
    display: isSubWalletOpen ? 'block' : 'none',
  }

  useEffect(() => {
    //console.log("mobile open",mobileOpen)
    if (mobileOpen) {
      setIsOpen(true)
      // setIsSubMenuOpen(true)
    } else {
      setIsOpen(false)
      // setIsSubMenuOpen(false)
    }
  }, [mobileOpen])
  return (

    <aside id="layout-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="layout-menu menu-vertical menu bg-menu-theme" style={sidebarStyle}>
      <div className="app-brand demo ">
        <Link to="/mentor" className="app-brand-link">
          <span className="app-brand-logo demo">
            <img src="assets/ficon.svg" style={{ height: '40px', width: 'auto' }} alt='ficon' />
          </span>
          {isOpen ? <span className="app-brand-text demo menu-text fw-bolder ms-2" style={{ textTransform: "initial" }}>Link<span className='text-info'>Dao</span></span> : ''}
        </Link>
        {isOpen ? <span className="layout-menu-toggle menu-link text-large ms-auto">
          <i className="bx bx-chevron-left bx-sm align-middle" />
        </span> : ""}
      </div>
      <div className="menu-inner-shadow" />
      <ul className="menu-inner py-1">
        {/* Dashboards */}
        <li className="menu-item " onClick={() => setMobileOpen(false)}>
          <Link to="/dash" className="menu-link text-mid">
            <i className="menu-icon tf-icons bx bx-envelope" />
            {isOpen ? <div data-i18n="Dashboards">Dashboard</div> : ""}
          </Link>
        </li>
        <li className="menu-item " onClick={() => setMobileOpen(false)}>
          <Link to="/profile" className="menu-link text-mid">
            <i className="menu-icon tf-icons bx bx-user" />
            {isOpen ? <div data-i18n="Layouts">Profile</div> : ""}
          </Link>
        </li>
        <li className="menu-item " onClick={() => setMobileOpen(false)}>
          <Link to="/stake" className="menu-link text-mid">
            <i className="menu-icon tf-icons bx bx-money" />
            {isOpen ? <div data-i18n="Kanban">Stake</div> : ''}
          </Link>
        </li>
        <li className="menu-item " onClick={() => setMobileOpen(false)}>
          <Link to="/downline" className="menu-link text-mid">
            <i className="menu-icon tf-icons bx bx-user" />
            {isOpen ? <div data-i18n="Kanban">Team</div> : ''}
          </Link>
        </li>
        <li className="menu-item " onClick={() => setMobileOpen(false)}>
          <Link to="/business" className="menu-link text-mid">
            <i className="menu-icon tf-icons bx bx-dollar" />
            {isOpen ? <div data-i18n="Layouts">Business</div> : ""}
          </Link>
        </li>
        {/* Layouts */}
        <li className="menu-item" style={sidebarStyle} onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}>
          <span className={`menu-link text-mid ${isOpen ? 'menu-toggle' : ''}`}>
            <i className="menu-icon tf-icons bx bx-calendar-heart" />
            {isOpen ? <div data-i18n="Layouts">Referral Earning</div> : ''}
          </span>
          <ul className="menu-sub" style={subMenuStyle} >

            <li className="menu-item " onClick={() => setMobileOpen(false)}>
              <Link to="/perform" className="menu-link text-mid">
                <div data-i18n="Content navbar">Performance Reward</div>
              </Link>
            </li>
            <li className="menu-item " onClick={() => setMobileOpen(false)}>
              <Link to="/top" className="menu-link text-mid">
                <div data-i18n="Content navbar">Top-Referral Reward</div>
              </Link>
            </li>
            <li className="menu-item " onClick={() => setMobileOpen(false)}>
              <Link to="/passive" className="menu-link text-mid">
                <div data-i18n="Content navbar">Passive Uni-Level Reward</div>
              </Link>
            </li>
            <li className="menu-item " onClick={() => setMobileOpen(false)}>
              <Link to="/vip" className="menu-link text-mid">
                <div data-i18n="Content navbar">VIP Uni-Level Reward</div>
              </Link>
            </li>
            <li className="menu-item " onClick={() => setMobileOpen(false)}>
              <Link to="/star" className="menu-link text-mid">
                <div data-i18n="Content nav + Sidebar">Star Royalty</div>
              </Link>
            </li>
            <li className="menu-item " onClick={() => setMobileOpen(false)}>
              <Link to="/award" className="menu-link text-mid">
                <div data-i18n="Content nav + Sidebar">Star Awards</div>
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item  " style={sidebarStyle} onClick={() => setIsSubWalletOpen(!isSubWalletOpen)}>
          <span className={`menu-link text-mid ${isOpen ? 'menu-toggle' : ''}`}>
            <i className="menu-icon tf-icons bx bx-layout" />
            {isOpen ? <div data-i18n="Users">Wallet</div> : ''}
          </span>
          <ul className="menu-sub" style={subWalletStyle}>
            <li className="menu-item " onClick={() => setMobileOpen(false)}>
              <Link to="/request" className="menu-link text-mid">
                <div data-i18n="Billing & Plans">Withdrawl</div>
              </Link>
            </li>
            <li className="menu-item " onClick={() => setMobileOpen(false)}>
              <Link to="/wallet" className="menu-link text-mid">
                <div data-i18n="Billing & Plans">Fund Transfer</div>
              </Link>
            </li>
            <li className="menu-item " onClick={() => setMobileOpen(false)}>
              <Link to="/refule" className="menu-link text-mid">
                <div data-i18n="Billing & Plans">Re-Buy Leverage</div>
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item " onClick={() => setMobileOpen(false)}>
          <Link to="/support" className="menu-link text-mid">
            <i className="menu-icon tf-icons bx bx-support" />
            {isOpen ? <div data-i18n="Roles & Permissions">Support</div> : ''}
          </Link>
        </li>
        <li className="menu-item " >
          <Link onClick={() => handleLogout()} to="/" className="menu-link text-mid">
            <i className="menu-icon tf-icons bx bx-exit" />
            {isOpen ? <div data-i18n="Login">Disconnect</div> : ''}
          </Link>
        </li>
      </ul>
    </aside>
  );
}
