import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import { depositedAmt, getWithdrawableTotalProfit} from '../contract/stakes';
import { ConnectContext } from '../context/ConnectContext';
import { pool } from '../address';
import { poolABI } from '../abi';
import { NetworkContext } from '../context/NetworkContext';
import { LoadingContext } from '../context/LoadingContext';
import { TailSpin } from 'react-loader-spinner';
import { getPrice } from '../utils';

export default function Dash() {
  const [provider] = useContext(ConnectContext)
  const [deposited, setDeposited] = useState(0)
  const [account] = useContext(NetworkContext)
  const [profit, setProfit] = useState(0)
  const [price, setPrice] = useState(0)
  const [loading, setLoading] = useContext(LoadingContext)


  const handlePrice = useCallback(async () => {
    let pr = await getPrice();
    setPrice(parseFloat(pr).toFixed(2));
    setLoading(false)
  }, [setLoading]);

  const handleDeposited =useCallback( async (pool, poolABI) => {
    let res = await depositedAmt(provider, pool, poolABI, account);
    setDeposited(parseFloat(res).toFixed(2));
  },[account, provider])
  const handleProfit = useCallback( async (pool,poolABI) => {
    let res = await getWithdrawableTotalProfit(
      provider,
      pool,
      poolABI,
      account
    );
    setProfit(parseFloat(res).toFixed(2));
  },[account, provider])


  useEffect(()=>{
    handleDeposited(pool, poolABI);
    handleProfit(pool, poolABI);
    handlePrice()
  },[handleDeposited, handlePrice, handleProfit])
  

    return (
        <>
                <div className="layout-container">
                    <Menu />
                    <div className="layout-page">
                        <Header />
                        {loading ? <><TailSpin
          height="80"
          width="80"
          color="#ffffff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{margin:'auto'}}
          wrapperClass=""
          visible={true}
        /></> :
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className="row">
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Session</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <h4 className="card-title mb-0 me-2">58,352</h4>
                                                            <small className="text-success">(+29%)</small>
                                                        </div>
                                                        <small>Last Week Analytics</small>
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-primary rounded p-2">
                                                            <i className="bx bx-trending-up bx-sm" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Time On Site</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <h4 className="card-title mb-0 me-2">28m 14s</h4>
                                                            <small className="text-success">(+18%)</small>
                                                        </div>
                                                        <small>Last Week Analytics</small>
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            <i className="bx bx-time-five bx-sm" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Bounce Rate</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <h4 className="card-title mb-0 me-2">62%</h4>
                                                            <small className="text-danger">(-14%)</small>
                                                        </div>
                                                        <small>Last Week Analytics</small>
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-danger rounded p-2">
                                                            <i className="bx bx-pie-chart-alt bx-sm" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Users</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <h4 className="card-title mb-0 me-2">18,472</h4>
                                                            <small className="text-success">(+42%)</small>
                                                        </div>
                                                        <small>Last Week Analytics</small>
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
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Total Staked</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <h4 className="card-title mb-0 me-2">{deposited*price} USDT</h4>
                                                            {/* <small className="text-success"></small> */}
                                                        </div>
                                                        {/* <small>Last Week Analytics</small> */}
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
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Total Withdrawn</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <h4 className="card-title mb-0 me-2">{profit*price} USDT</h4>
                                                            {/* <small className="text-success">(+42%)</small> */}
                                                        </div>
                                                        {/* <small>Last Week Analytics</small> */}
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
                            </div>
                            <Footer />
                        </div>}
                    </div>
                </div>
        </>
    );
}
