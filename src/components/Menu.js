import React, { useContext, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ConnectContext } from '../context/ConnectContext';
import { NetworkContext } from '../context/NetworkContext';
import web3Modal from ".././modal";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


export default function Menu() {
  const [account, setAccount] = useContext(NetworkContext);
  const [provider, setProvider] = useContext(ConnectContext)
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

  const handleLogout = () => {
    // disconnectWallet()
    sessionStorage.removeItem('loginData');
    history.push('/');
  };
  return (

    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
      <div className="app-brand demo ">
        <Link to="/dash" className="app-brand-link">
          <span className="app-brand-logo demo">
            <img src="assets/ficon.svg" style={{ height: '40px', width: 'auto' }} alt='ficon' />
          </span>
          <span className="app-brand-text demo menu-text fw-bolder ms-2">LKD</span>
        </Link>
        <Link to="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto">
          <i className="bx bx-chevron-left bx-sm align-middle" />
        </Link>
      </div>
      <div className="menu-inner-shadow" />
      <ul className="menu-inner py-1">
        {/* Dashboards */}
        <li className="menu-item ">
          <Link to="/dash" className="menu-link">
            <i className="menu-icon tf-icons bx bx-envelope" />
            <div data-i18n="Dashboards">Dashboards</div>
          </Link>
        </li>
        {/* Layouts */}
        <li className="menu-item active open">
          <Link to="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-layout" />
            <div data-i18n="Layouts">Profile</div>
          </Link>
          <ul className="menu-sub">
            <li className="menu-item active">
              <Link to="/profile" className="menu-link ">
                <div data-i18n="Collapsed menu">View</div>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/downline" className="menu-link">
                <div data-i18n="Content navbar">DownLine</div>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/business" className="menu-link">
                <div data-i18n="Content nav + Sidebar">Business</div>
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item ">
          <Link to="/stake" className="menu-link">
            <i className="menu-icon tf-icons bx bx-envelope" />
            <div data-i18n="Kanban">Stake</div>
          </Link>
        </li>
        <li className="menu-item ">
          <Link to="/income" className="menu-link">
            <i className="menu-icon tf-icons bx bx-envelope" />
            <div data-i18n="Invoice">Awards/Rewards</div>
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
        <li className="menu-item">
          <Link to="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-user" />
            <div data-i18n="Users">Wallet</div>
          </Link>
          <ul className="menu-sub">
            <li className="menu-item">
              <Link to="/wallet" className="menu-link">
                <div data-i18n="List">View</div>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/request" className="menu-link">
                <div data-i18n="Billing & Plans">Withdrawl Request</div>
              </Link>
            </li>
          </ul>
        </li>
        <li className="menu-item ">
          <Link to="/support" className="menu-link">
            <i className="menu-icon tf-icons bx bx-envelope" />
            <div data-i18n="Roles & Permissions">Support</div>
          </Link>
        </li>
        <li className="menu-item ">
          <Link onClick={()=>handleLogout()} to="/" className="menu-link">
            <i className="menu-icon tf-icons bx bx-envelope" />
            <div data-i18n="Login">Disconnect</div>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
