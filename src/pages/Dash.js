import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import { depositedAmt, getRewards, getWithdrawableTotalProfit } from '../contract/stakes';
import { ConnectContext } from '../context/ConnectContext';
import { pool } from '../address';
import { poolABI } from '../abi';
import { NetworkContext } from '../context/NetworkContext';
import { LoadingContext } from '../context/LoadingContext';
import ReactLoader from '../components/ReactLoader';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getBusdPrice, getPrice } from '../utils';
import RadialGauge from '../components/RadialGauge';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const config = require('../config.json')

export default function Dash({ ipAddress, loginData }) {
    const [provider] = useContext(ConnectContext)
    const [deposit, setDeposited] = useState(0)
    const [account] = useContext(NetworkContext)
    const [profit, setProfit] = useState(0)
    const [price, setPrice] = useState(0)
    const [loading, setLoading] = useContext(LoadingContext)
    const [referall, setReferall] = useState("")
    let [growth, setGrowth] = useState(0)
    const [dash, setDash] = useState({})
    const [busdPrice, setBusdPrice] = useState(0)
    const [investments, setInvestments] = useState(0)
    const history = useHistory();

    // const handleInvestments = useCallback(async (pool, poolABI) => {
    //     // let investments = await getRewards(provider, pool, poolABI, account)
    //     // console.log(investments)
    //     // setInvestments(investments[0])
    //     // setMax(investments[1])
    //     setLoading(true)
    //     let packages = await getRewards(provider, pool, poolABI, account)
    //     packages.reverse()
    //     console.log(packages)
    //     let inv = packages.reduce((total,item)=>total.totalInvestment+item.totalInvestment)
    //     setInvestments(inv)
    //     setLoading(false)
    // }, [account, provider, setLoading])

    const handleBusdPrice = useCallback(async () => {
        let pr = await getBusdPrice();
        setBusdPrice(parseFloat(pr).toFixed(3));
    }, []);

    const handlePrice = useCallback(async () => {
        let pr = await getPrice();
        setPrice(parseFloat(pr).toFixed(3));

    }, [setPrice]);

    const handleDeposited = useCallback(async (pool, poolABI) => {
        let res = await depositedAmt(provider, pool, poolABI, account);
        setDeposited(parseFloat(res).toFixed(2));
    }, [account, provider, setDeposited])
    const handleProfit = useCallback(async (pool, poolABI) => {
        let res = await getWithdrawableTotalProfit(
            provider,
            pool,
            poolABI,
            account
        );
        setProfit(parseFloat(res).toFixed(3));
    }, [account, provider, setProfit])

    const handleDash = useCallback(async () => {
        setLoading(true)
        let data = JSON.stringify({
            "address": (loginData.address) ? loginData.address : account,
            "ip": ipAddress,
            "ulid": loginData.ulid
        });

        let axiosConfig = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${config.baseUrl}/api/desk`,
            headers: {
                'address': account,
                'ip': ipAddress,
                'ulid': loginData.ulid,
                'auth': loginData.auth,
                'token': loginData.token,
                'Content-Type': 'application/json'
            },
            data: data
        };
        console.log("login data", axiosConfig)
        axios.request(axiosConfig)
            .then((response) => {
                if (response.data?.status) {
                    console.log(response)
                    setDash(response.data?.info)
                    setGrowth(response.data?.info?.limit_per)
                    //setGrowth(70)
                    if (response.data?.info?.active) {
                        setReferall(response.data?.info?.sponsor_id)
                    }
                    else { setReferall('') }
                }
                else {
                    // Swal.fire({
                    //     icon: 'warning',
                    //     title: 'LinkDao Defi',
                    //     text: response.data?.message
                    // });
                }

                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [setLoading, loginData.address, loginData.ulid, loginData.auth, loginData.token, ipAddress, account]);

    useEffect(() => {
        handleDeposited(pool, poolABI);
        handleProfit(pool, poolABI);
        handlePrice()
        handleDash()
        handleBusdPrice()
        // handleInvestments(pool, poolABI)
    }, [handleDash, handleDeposited, handlePrice, handleProfit, handleBusdPrice])


    return (
        <>
            <div className="layout-container">
                <Menu />
                <div className="layout-page">
                    <Header />
                    {loading ? <><ReactLoader /></> :
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y pt-2">
                                <div className="row">
                                    <div className="col-md-12  mb-2">
                                        <div className="card h-100">
                                            <div className="card-header align-items-center" style={{ padding: "4% 5% 5% 5%" }}>
                                                <div className="col-md-12">
                                                    <div className='row d-flex justify-content-between'>
                                                        <div className='col-12 text-center'>
                                                            <p className="card-text m-0 text-info text-md">Welcome</p>
                                                            <p className="card-text m-0 text-white text-sm">Dear {dash?.name}</p>
                                                            <p className="card-text m-0 text-white text-sm">Your Refferal Code : {referall}</p>
                                                            <p className="card-text m-0 text-white text-sm">Total Staked : $ {dash?.total_invest}</p>
                                                            <CopyToClipboard text={dash?.copyLink}>
                                                                <button className="btn btn-info btn-sm text-sm me-sm-3 mt-2">Copy Referral Link</button>
                                                            </CopyToClipboard>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {/* <div className="col-md-12  mb-2">
                                        <div className="card h-100">
                                            <div className="card-header align-items-center" style={{ padding: "4% 5% 5% 5%" }}>
                                                <div className="col-md-12">
                                                    <div className='row d-flex justify-content-between'>
                                                        <div className='col-12 text-center'>
                                                            <RadialGauge series={growth} />
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div> */}
                                    <div className="col-md-12  mb-2">
                                        <div className="card" >
                                            <div className="card-body dashinc" onClick={() => history.push('/stake')}>
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Total Leverage</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white ">$ {dash?.limit}</small>
                                                        </div>

                                                    </div>
                                                    <div className="card-icon">
                                                        <p className="card-text m-0 text-info text-sm"> Leverage Used</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white ">$ {dash?.limit_inc}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    
                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                                        <div className="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Total Earning</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> $ {dash?.total}</small>
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
                                        <div className="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Today's Earning</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> ${dash?.today}</small>
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
                                        <div className="card" >
                                            <div className="card-body dashinc" onClick={() => history.push('/stake')}>
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Staking Reward</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white ">$ {parseFloat(price * profit * busdPrice).toFixed(3)}</small>
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
                                        <div className="card" onClick={() => history.push('/perform')}>
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Performance Reward</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white ">$ {dash?.Performance_Award}</small>
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
                                        <div className="card" onClick={() => history.push('/top')}>
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Top-Referral Reward</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white ">$ {dash?.Top_Referral_Club}</small>
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
                                        <div className="card" onClick={() => history.push('/passive')}>
                                            <div className="card-body dashinc" >
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Passive Uni-Level Reward</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white ">$ {dash?.Passive_Unilevel_Reward}</small>
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
                                        <div className="card" onClick={() => history.push('/vip')}>
                                            <div className="card-body dashinc" >
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">VIP Uni-Level Reward</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white ">$ {dash?.VIP_Unilevel_Reward}</small>
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
                                        <div className="card" onClick={() => history.push('/star')}>
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">LinkDao Star Royalty</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white ">$ {dash?.Royalty}</small>
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
                                        <div className="card" onClick={() => history.push('/award')}>
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">LinkDao Star Award</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white ">$ {dash?.Award}</small>
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
                                        <div className="card" onClick={() => history.push('/downline')}>
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Total Team Members</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> {dash?.total_downline}</small>
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
                                        <div className="card" onClick={() => history.push('/downline')}>
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Active Members</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> {dash?.Active_downline}</small>
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
                                        <div className="card" onClick={() => history.push('/downline')}>
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">In-Active Member</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> {dash?.Inactive_downline}</small>
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

                                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2" >
                                        <div className="card" >
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Referral Wallet Balance</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> $ {dash?.rbalance}</small>
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
                                        <div className="card" >
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Total Withdrawled</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> $ {dash?.total_with}</small>
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
                                        <div className="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Leverage Wallet</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> $ {dash?.lbalance}</small>
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
