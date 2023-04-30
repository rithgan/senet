import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import React, { useCallback, useContext, useEffect,useState } from 'react'
import { NetworkContext } from '../context/NetworkContext';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const config = require('../config.json')
export default function Wallet({ipAddress, loginData}) {
    const [account, setAccount] = useContext(NetworkContext);
    const [wallet, setWallet] = useState({})
  const handleWallet = useCallback(() => {
    
    let data = JSON.stringify({
      "address": account,
      "ip": ipAddress,
      "ulid": loginData.ulid
    });
    
    let axiosConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${config.baseUrl}/api/wallet`,
      headers: { 
        'address': account, 
        'ip': ipAddress, 
        'ulid': loginData.ulid, 
        'auth': loginData.auth, 
        'token': loginData.token, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    console.log(axiosConfig)
    axios.request(axiosConfig)  
    .then((response) => {
        console.log(response.data)
        setWallet(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  },[account, ipAddress, loginData.auth, loginData.token, loginData.ulid])


  useEffect(() => {
    
    handleWallet()
  },[handleWallet])

    return (
        <>
            <div className="layout-wrapper layout-content-navbar  ">
                <div className="layout-container">
                    <Menu />
                    <div className="layout-page">
                        <Header />
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="card-info">
                                                            <p className="card-text">Wallet balance</p>
                                                            <div className="d-flex align-items-end mb-2">
                                                                <h4 className="card-title mb-0 me-2">{wallet?.balance?.toFixed(3)} USD</h4>
                                                            </div>
                                                        </div>
                                                        <div className="card-icon">
                                                            <span className="badge bg-label-success rounded p-2">
                                                                <i className="bx bx-user bx-sm" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="card-info">
                                                            <p className="card-text">Address LKD Balance</p>
                                                            <div className="d-flex align-items-end mb-2">
                                                                <h4 className="card-title mb-0 me-2">0</h4>
                                                            </div>
                                                        </div>
                                                        <div className="card-icon">
                                                            <span className="badge bg-label-success rounded p-2">
                                                                <i className="bx bx-user bx-sm" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="card-info">
                                                            <p className="card-text">Live Price</p>
                                                            <div className="d-flex align-items-end mb-2">
                                                                <h4 className="card-title mb-0 me-2">0</h4>
                                                            </div>
                                                        </div>
                                                        <div className="card-icon">
                                                            <span className="badge bg-label-success rounded p-2">
                                                                <i className="bx bx-user bx-sm" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="card-info">
                                                            <p className="card-text">Withdrawal Paid</p>
                                                            <div className="d-flex align-items-end mb-2">
                                                                <h4 className="card-title mb-0 me-2">{wallet?.withdrawal_paid?.toFixed(3)} USD</h4>
                                                            </div>
                                                        </div>
                                                        <div className="card-icon">
                                                            <span className="badge bg-label-success rounded p-2">
                                                                <i className="bx bx-user bx-sm" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="card-info">
                                                            <p className="card-text">Withdrawal Pending</p>
                                                            <div className="d-flex align-items-end mb-2">
                                                                <h4 className="card-title mb-0 me-2">{wallet?.withdrawal_pending?.toFixed(3)} USD</h4>
                                                            </div>
                                                        </div>
                                                        <div className="card-icon">
                                                            <span className="badge bg-label-success rounded p-2">
                                                                <i className="bx bx-user bx-sm" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="card-info">
                                                            <p className="card-text">Withdrawal Cancel</p>
                                                            <div className="d-flex align-items-end mb-2">
                                                                <h4 className="card-title mb-0 me-2">{wallet?.withdrawal_cancel?.toFixed(3)} USD</h4>
                                                            </div>
                                                        </div>
                                                        <div className="card-icon">
                                                            <span className="badge bg-label-success rounded p-2">
                                                                <i className="bx bx-user bx-sm" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="card">
                                            <div className="card-header border-0">
                                                <div className="d-flex justify-content-between">
                                                    <h3 className="card-title">Withdrawal History</h3>
                                                    <Link to="/request" className="btn  btn-sm rounded-pill btn-info">Add Request</Link>
                                                </div>
                                            </div>
                                            <div className="card-datatable table-responsive">
                                                <table className="datatable table border-top ">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">Amount</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">TAX</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">Net Paid</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">Order Date</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">Status</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">IS CANCELED</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">TOKEN PRICE</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">USD AMOUNT</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">Withdrawal Date</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">Details</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">Remarks</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            wallet?.list?.map((val, i)=>{
                                                                return(
                                                                    
                                                                        <tr>
                                                                            <td>{i+1}</td>
                                                                            <td>{val.amount}</td>
                                                                            <td>{val.tax}</td>
                                                                            <td>{val.netAmount}</td>
                                                                            <td>{val.rdate}</td>
                                                                            <td>{val.status}</td>
                                                                            <td>{val.cancel}</td>
                                                                            <td>{val.price}</td>
                                                                            <td>{val.usd}</td>
                                                                            <td>{val.amount}</td>
                                                                            <td>{val.wdate}</td>
                                                                            <td>{val.detail}</td>
                                                                            <td>{val.info}</td>
                                                                        </tr>
                                                                    
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
                <div className="layout-overlay layout-menu-toggle"></div>
                <div className="drag-target"></div>
            </div>
        </>
    );
}
