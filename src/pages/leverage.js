import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import React, { useCallback, useContext, useEffect,useState } from 'react'
import { NetworkContext } from '../context/NetworkContext';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const config = require('../config.json')
export default function Leverage({ipAddress, loginData}) {
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
                <div className="layout-container">
                    <Menu />
                    <div className="layout-page">
                        <Header />
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div>
                                    <div className='row'>
                                        <div className="col-md-12  mb-3">
                                            <div className="card">
                                            <div className="card-header align-items-center ">
                                                <div className="card-title mb-0">
                                                    <h6 className="m-0 me-2 text-center text-info mb-2">Re-Buy Leverage</h6>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="card-info">
                                                            <p className="card-text m-0 text-info text-sm">Leverage Wallet Balance</p>
                                                            <div className="d-flex align-items-end mb-2">
                                                                <small className="text-white ">0.000</small>
                                                            </div>
                                                        </div>
                                                        <div className="card-icon">
                                                            <span className="badge bg-label-info rounded p-2">
                                                                <i className="bx bx-dollar bx-sm" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-12  mb-3">
                                        <div className="card ">
                                            <div className="card-body align-items-center p-3">
                                                <div className="d-flex align-items-center justify-content-between">
                                                <input type="text" className="form-control me-3" placeholder="Amount for Re-Buy" />
                                                <input type="text" disabled className="form-control " placeholder="Pay Extra LKD" />
                                                </div>
                                                <div className='text-center mt-3'>
                                                    <button className='btn  btn-info btn-sm'>Buy Leverage</button>
                                                </div>
                                                <div className='text-center mt-2'>
                                                    <small className="text-light text-center mb-0 ">Minimum Leverage $100 </small><br />
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-12  mb-3">
                                            <div className="card">
                                            <div className="card-header align-items-center ">
                                                <div className="card-title mb-0">
                                                <h6 className="m-0 me-2 text-center text-info">Leverage History</h6>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-md-4  mb-1" id={1}>
                                            <div className="card h-100">
                                                <div className="card-header align-items-center" style={{padding :"3% 5% 3% 5%"}}>
                                                    <div className="col-md-12">
                                                        <div className='row d-flex justify-content-between'>
                                                            <div className='col-6 text-left'>
                                                                <span className="text-white text-sm">Date</span>
                                                            </div>
                                                            <div className='col-6' style={{textAlignLast:"end"}}>
                                                                <span className={'text-info text-sm'} style={{fontSize:"14px"}}>2022-01-20</span>
                                                            </div>
                                                        </div>
                                                        <div className='row d-flex justify-content-between'>
                                                            <div className='col-6 text-left'>
                                                                <small className="text-sm">Leverage Brought </small>
                                                            </div>
                                                            <div className='col-6' style={{textAlignLast:"end"}}>
                                                                <small className="text-sm">$ 0.000 </small>
                                                            </div>
                                                        </div>
                                                        <div className='row d-flex justify-content-between'>
                                                            <div className='col-6 text-left'>
                                                                <small className="text-sm">Leverage Wallet Dudaction </small>
                                                            </div>
                                                            <div className='col-6' style={{textAlignLast:"end"}}>
                                                                <small className="text-sm">$ 0.000 </small>
                                                            </div>
                                                        </div>
                                                        <div className='row d-flex justify-content-between'>
                                                            <div className='col-6 text-left'>
                                                                <small className="text-sm">Add-On Fund </small>
                                                            </div>
                                                            <div className='col-6' style={{textAlignLast:"end"}}>
                                                                <small className="text-sm">$ 0.000 </small>
                                                            </div>
                                                        </div>
                                                        <div className='row d-flex justify-content-between'>
                                                            <div className='col-6 text-left'>
                                                                <small className="text-sm">Add-On Fund Txn Hash</small>
                                                            </div>
                                                            <div className='col-6' style={{textAlignLast:"end"}}>
                                                            <small className="text-sm"><a href={'https://bscscan.com/tx/'} target='blank'>Click to View</a></small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
        </>
    );
}
