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
import ReactLoader from '../components/ReactLoader';
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
                        {loading ? <><ReactLoader/></> :
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className="row">
                                    <div className="col-md-12  mb-3">
                                        <div className="card h-100">
                                            <div className="card-header align-items-center" style={{padding :"4% 5% 5% 5%"}}>
                                                <div className="col-md-12">
                                                    <div className='row d-flex justify-content-between'>
                                                        <div className='col-12 text-center'>
                                                                <p className="card-text m-0 text-info text-md">Welcome</p>
                                                                <p className="card-text m-0 text-white text-sm">Dear Name</p>
                                                                <p className="card-text m-0 text-white text-sm">Your Reffral Code : 0000000</p>
                                                                <p className="card-text m-0 text-white text-sm">Total Staked : $0000.000</p>
                                                                <button type="submit" className="btn btn-info btn-sm text-sm me-sm-3 mt-2">Copy Referral Link</button>
                                                        </div>
                                                        
                                                    </div>
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                                        <div class="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Staking Reward</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white ">$ 12345.000</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            <i className="bx bx-trending-up bx-sm" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                                        <div class="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Total Reffral Erraning</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> $12345</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            {/* <i className="bx bx-user bx-sm" /> */}
                                                            <i className='bx bx-dollar-circle bx-sm'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                                        <div class="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Todays's Reffral Erraning</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> $12345</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            {/* <i className="bx bx-user bx-sm" /> */}
                                                            <i className='bx bx-dollar-circle bx-sm'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                                        <div class="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Performance Reward</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white ">$ 12345.000</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            <i className="bx bx-trending-up bx-sm" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                                        <div class="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Top-Referral Reward</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white ">$ 12345.000</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            <i className="bx bx-trending-up bx-sm" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                                        <div class="card">
                                            <div className="card-body dashinc" >
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Passive Uni-Level Reward</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white ">$ 12345.000</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            <i className="bx bx-trending-up bx-sm" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                                        <div class="card">
                                            <div className="card-body dashinc" >
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">VIP Uni-Level Reward</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white ">$ 12345.000</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            <i className="bx bx-trending-up bx-sm" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                                        <div class="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">LinkDao Star Royalty</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white ">$ 12345.000</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            <i className="bx bx-trending-up bx-sm" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                                        <div class="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">LinkDao Star Award</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white ">$ 12345.000</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            <i className="bx bx-trending-up bx-sm" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                                        <div class="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Total Team</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> 12345</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            <i className="bx bx-user-plus bx-sm" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                                        <div class="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Active Member</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> 12345</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            <i className="bx bx-user-check bx-sm" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                                        <div class="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">In-Active Member</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> 12345</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            <i className="bx bx-user-x bx-sm" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                                        <div class="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Reffral Wallet Balance</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> $12345</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            {/* <i className="bx bx-user bx-sm" /> */}
                                                            <i className='bx bx-dollar-circle bx-sm'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                                        <div class="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Total Withdrawled</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> $12345</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            {/* <i className="bx bx-user bx-sm" /> */}
                                                            <i className='bx bx-dollar-circle bx-sm'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                                        <div class="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Leverage Wallet</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> $12345</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            {/* <i className="bx bx-user bx-sm" /> */}
                                                            <i className='bx bx-dollar-circle bx-sm'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                        }
                    </div>
                </div>

        </>
    );
}
