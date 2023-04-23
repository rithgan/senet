import React,{useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import { HistoryContext } from '../context/HistoryContext';

export default function Menu() {
  const [isLoggedIn,setIsLoggedIn] = useContext(AuthContext);
  const history = useContext(HistoryContext)
  const handleLogout = () => {
    setIsLoggedIn(false);
    history.push('/');
  };
    return (

        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
          <div className="app-brand demo ">
            <a href="index.html" className="app-brand-link">
              <span className="app-brand-logo demo">
                <img src="assets/ficon.svg" style={{height: '40px', width: 'auto'}} alt='ficon' />
              </span>
              <span className="app-brand-text demo menu-text fw-bolder ms-2">LKD</span>
            </a>
            <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto">
              <i className="bx bx-chevron-left bx-sm align-middle" />
            </a>
          </div>
          <div className="menu-inner-shadow" />
          <ul className="menu-inner py-1">
            {/* Dashboards */}
            <li className="menu-item ">
              <a href="/dash" className="menu-link">
                <i className="menu-icon tf-icons bx bx-envelope" />
                <div data-i18n="Dashboards">Dashboards</div>
              </a>
            </li>
            {/* Layouts */}
            <li className="menu-item active open">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-layout" />
                <div data-i18n="Layouts">Profile</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item active">
                  <a href="/profile" className="menu-link ">
                    <div data-i18n="Collapsed menu">View</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="/downline" className="menu-link">
                    <div data-i18n="Content navbar">DownLine</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="/business" className="menu-link">
                    <div data-i18n="Content nav + Sidebar">Business</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item ">
              <a href="/stake" className="menu-link">
                <i className="menu-icon tf-icons bx bx-envelope" />
                <div data-i18n="Kanban">Stake</div>
              </a>
            </li>
            <li className="menu-item ">
              <a href="/income" className="menu-link">
                <i className="menu-icon tf-icons bx bx-envelope" />
                <div data-i18n="Invoice">Awards/Rewards</div>
              </a>
            </li>
            {/*  <li class="menu-item">
        <a href="javascript:void(0);" class="menu-link menu-toggle">
          <i class='menu-icon tf-icons bx bx-food-menu'></i>
          <div data-i18n="Invoice">Awards</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item">
            <a href="app-invoice-list.html" class="menu-link">
              <div data-i18n="List">Proformence Award</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="app-invoice-preview.html" class="menu-link">
              <div data-i18n="Preview">VIP Award</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="app-invoice-edit.html" class="menu-link">
              <div data-i18n="Edit">Passive reward</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="app-invoice-add.html" class="menu-link">
              <div data-i18n="Add">Top Refrral</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="app-user-view-account.html" class="menu-link">
              <div data-i18n="Account">Royalty</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="app-user-view-account.html" class="menu-link">
              <div data-i18n="Account">Royalty Award</div>
            </a>
          </li>
        </ul>
      </li> */}
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-user" />
                <div data-i18n="Users">Wallet</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="/wallet" className="menu-link">
                    <div data-i18n="List">View</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="/request" className="menu-link">
                    <div data-i18n="Billing & Plans">Withdrawl Request</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item ">
              <a href="/support" className="menu-link">
                <i className="menu-icon tf-icons bx bx-envelope" />
                <div data-i18n="Roles & Permissions">Support</div>
              </a>
            </li>
            <li className="menu-item ">
              <a onClick={handleLogout()} href="/" className="menu-link">
                <i className="menu-icon tf-icons bx bx-envelope" />
                <div data-i18n="Login">Disconnect</div>
              </a>
            </li>
          </ul>
        </aside>
      );
}
