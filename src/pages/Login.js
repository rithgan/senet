import React, { useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { HistoryContext } from '../context/HistoryContext';
const config = require('../config.json')

export default function Login({ ipAddress }) {
    const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);
    const history = useContext(HistoryContext)
    const handleLogin = async (address, ip) => {
        try {
            let request = await axios.post(`${config.baseUrl}/api`, {
                address: address,
                ip: ip
            })
            console.log(request.message)
            if (request.status) {
                setIsLoggedIn(true)
                history.push('/dash');
            }
        } catch (err) {
            console.log(err)
        }
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
                                <a href="/" className="app-brand-link gap-2">
                                    <span className="app-brand-logo demo">
                                        <img src="assets/ficon.svg" style={{ height: '40px', width: 'auto' }} alt='ficon' />
                                    </span>
                                    <span className="app-brand-text demo text-body fw-bolder">LinkDao Defi</span>
                                </a>
                            </div>
                            {/* /Logo */}
                            <h4 className="mb-2">Login Staker 🔒</h4>
                            <p className="mb-4">Explore the multiple possibilites with our unique token</p>
                            {/* Connect with lkd form and action, go to dash.php */}
                            <form id="formAuthentication" className="mb-3" action="/dash" method="POST">
                                <button className="btn btn-primary d-grid w-100">Connect With LKD</button>
                            </form>
                            <div className="text-center">
                                {/* registeration button */}
                                <a href="/register" className="d-flex align-items-center justify-content-center">
                                    <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm" />
                                    New Staker? Click
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
