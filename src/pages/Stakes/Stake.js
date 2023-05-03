import React, { useState, useContext, useEffect, useCallback } from 'react'
import { NetworkContext } from '../../context/NetworkContext';
import { ConnectContext } from '../../context/ConnectContext';
import { approve, checkApprove, balance } from '../../contract/token';
import { depositAmount, depositedAmt, dailyReward, getWithdrawableTotalProfit, withdraw, reInvest, getUserInvestmentsByPackage, getRewards } from '../../contract/stakes';
import { LkdToken as address, pool } from "../../address";
import { LkdTokenABI as abi, poolABI } from "../../abi";
import { getPrice, getBusdPrice } from "../../utils";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';
import axios from 'axios';
import "./Stake.css";
const config = require('../../config.json')



export default function Stake({ ipAddress, loginData }) {
  const [status, setStatus] = useState(false)
  const [account] = useContext(NetworkContext)
  const [provider] = useContext(ConnectContext)
  const [deposit, setDeposit] = useState(0)
  const [deposited, setDeposited] = useState(0)
  const [wallet, setWallet] = useState(0)
  const [daily, setDaily] = useState(0)
  const [profit, setProfit] = useState(0)
  const [price, setPrice] = useState(0)
  const [busdPrice, setBusdPrice] = useState(0)
  const [packages, setPackages] = useState([0, 0, 0, 0])
  const [investments, setInvestments] = useState({
    6: 0,
    8: 0,
    10: 0,
    12: 0
  })
  const [max, setMax] = useState({
    6: 1,
    8: 1,
    10: 1,
    12: 1
  })

  const handlePackages = async (pool, poolABI) => {
    let arr = [0, 1, 2, 3]
    let packages = await Promise.all(arr.map(async (i) => {
      return await getUserInvestmentsByPackage(provider, pool, poolABI, account, i)
    }))
    setPackages(packages)
  }

  const handleInvestments = useCallback(async (pool, poolABI) => {
    let investments = await getRewards(provider, pool, poolABI, account)
    console.log(investments)
    setInvestments(investments[0])
    setMax(investments[1])
  }, [account, provider])

  const handleApprove = async (address, abi) => {
    let res = await approve(provider, address, abi, pool);
    console.log(res);
  };
  const handleCheckApprove = async (address, abi) => {
    if (account) {
      let value = await checkApprove(provider, address, abi, account, pool);
      if (parseInt(value.toString()) > 0) setStatus(true);
      else setStatus(false);
      return status;
    }
  };

  const handleDeposit = async (deposit) => {
    let conf = await depositAmount(provider, pool, poolABI, deposit);
    console.log(conf)
    let txnHash = conf?.transactionHash
    await uploadStake(txnHash)

  };

  const uploadStake = async (txnHash) => {

    const currentDate = new Date();

    const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const indianDateTimeFormat = currentDate.toLocaleString('en-IN', options);

    console.log('Indian Date and Time:', indianDateTimeFormat);
    let packId = 0
    if (deposit > 99) {
      packId = 1
    }
    else if (deposit > 199) {
      packId = 2
    }
    else if (deposit > 499) {
      packId = 3
    }


    let data = JSON.stringify({
      "address": account,
      "ip": ipAddress,
      "ulid": loginData.ulid,
      "packId": packId,
      "thash": txnHash,
      "tokenlkd": deposit,
      "price": price,
      "usd": busdPrice,
      "tranTime": indianDateTimeFormat
    });

    let axiosConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${config.baseUrl}/api/stake`,
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
    console.log(axiosConfig)
    try {
      let response = await axios.request(axiosConfig)
      console.log(response.data)
    } catch (err) {
      console.error(err)
    }

  }

  const handleDeposited = async (pool, poolABI) => {
    let res = await depositedAmt(provider, pool, poolABI, account);
    setDeposited(res);
  };

  const handleDailyReward = async () => {
    let res = await dailyReward(provider, pool, poolABI, account);
    setDaily(res);
  };

  const handleProfit = async (account) => {
    let res = await getWithdrawableTotalProfit(
      provider,
      pool,
      poolABI,
      account
    );
    setProfit(res);
  };


  const handleWithdraw = async () => {
    await withdraw(provider, pool, poolABI);
  };

  const handleReInvest = async () => {
    await reInvest(provider, pool, poolABI);
  };

  const handlePrice = useCallback(async () => {
    let pr = await getPrice();
    setPrice(parseFloat(pr).toFixed(3));
  }, []);

  const handleBusdPrice = useCallback(async () => {
    let pr = await getBusdPrice();
    setBusdPrice(parseFloat(pr).toFixed(3));
  }, []);

  const handleWalletAmt = async (address, abi) => {
    let res = await balance(provider, address, abi, account);
    setWallet(res);
  };

  useEffect(() => {
    handleCheckApprove(address, abi);
    handleWalletAmt(address, abi);
    handleDeposited(pool, poolABI);
    handleDailyReward();
    handleProfit(account);
    handlePackages(pool, poolABI)
  });

  useEffect(() => {
    handlePrice();
    handleBusdPrice()
  }, [handlePrice, handleBusdPrice]);

  useEffect(() => {
    handleInvestments(pool, poolABI)
  }, [handleInvestments])

  return (
    <div className="layout-container">
      <Menu />
      <div className="layout-page">
        <Header />
        <div className="content-wrapper">
          <div className='container-xxl flex-grow-1 container-p-y'>
            <div className='row'>
              <div class="col-md-12  mb-3">
                <div className="card">
                  <div className="card-header align-items-center ">
                    <div className="card-title mb-0">
                      <h3 className="m-0 me-2 text-center">Stake Statistics</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div class="col-md-6 mb-3">
                <div className="card ">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="card-title mb-0">
                      <h6 className="m-0 me-2">My Wallet</h6>
                    </div>
                    <div className="">
                      <p className="m-0 me-2">{wallet} LKD</p>
                      <small className="text-muted">{parseFloat(wallet * price).toFixed(3)} USDT</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6  mb-3">
                <div className="card ">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <div className="card-title mb-0">
                      <h6 className="m-0 me-2">Live price</h6>
                    </div>
                    <div className="">
                      <p className="m-0 me-2">{price} LKD</p>
                      <small className="text-muted">{busdPrice} USDT</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6  mb-3">
                <div className="card ">
                  <div className="card-header align-items-center p-1 mt-3">
                    <div className="card-title mb-0">
                      <h5 className="m-0 me-2 text-center text-info">Stake Now</h5>
                    </div>
                  </div>
                  <div className="card-body align-items-center p-3">
                    <div className="d-flex align-items-center justify-content-between">

                      <input type="text" className="form-control" placeholder="USDT" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
                      <input type="text" disabled className="form-control ms-3" placeholder="LKD" value={parseFloat(deposit * price).toFixed(3) + ' LKD'} />

                    </div>
                    <div className='text-center mt-4'>
                      {status
                        ? <>
                          <button className='btn  btn-info' onClick={() => handleDeposit(deposit, wallet)}>Deposit</button>
                          <button className='btn  btn-secondary ms-3' >Approve</button>
                        </>
                        :
                        <>
                          <button className='btn  btn-secondary' >Deposit</button>
                          <button className='btn  btn-info ms-3' onClick={() => handleApprove(address, abi)}>Approve</button>
                        </>
                      }

                    </div>
                    <div className='text-center mt-4'>
                      <small className="text-light  mb-0">Basic ($25-$99) @6% Monthly Return </small> <br /><small className="text-light">Standred ($100-$199) @8% Monthly Return   </small><br />
                      <small className="text-light  mb-0">Super ($200-$499) @10% Monthly Return </small><br /> <small className="text-light ">Premium ($500 & above) @12% Monthly Return   </small>

                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6  mb-3">
                <div className="card ">
                  <div className="card-body align-items-center p-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="card-title mb-0">
                        <p className="m-0 me-2">{parseFloat(price * profit).toFixed(3)}</p>
                        <small className="text-muted">{parseFloat(price * profit * busdPrice).toFixed(3)} USDT</small>
                      </div>
                      <div className="">
                        <p className="m-0 me-2">{profit}</p>
                        <small className="text-muted">{parseFloat(profit * price).toFixed(3)} LKD</small>
                      </div>
                    </div>
                    <div className='text-center mt-4'>
                      <button className='btn  btn-info' onClick={() => handleWithdraw()}>Withdraw</button>
                      <button className='btn  btn-info ms-3' onClick={() => handleReInvest()}>Re-Stake</button>
                    </div>
                    <div className='text-center mt-4'>
                      <small className="text-light text-center mb-0">Withdrawl Fee @10%, Minimum withdraw $10 </small><br />
                      <small className="text-info fsmall text_center" style={{ margin: 0 }}>Re-Stake don't have any Fee or Fedication </small>
                    </div>
                  </div>
                </div>
              </div>
              {/* setting the card of pacakges */}
              {packages.map((val, index) => {
                if (val > 0) {

                  if (index === 0) return (<div className="col-md-6  mb-3">
                    <div key={index} className="card h-100">
                      <div className="card-header d-flex align-items-center justify-content-between">
                        <div className="card-title mb-0">
                          <h5 className="mb-2 me-2 text-info">Basic Stake <span className='text-light' style={{ fontSize: "14px" }}>($25-$99)</span></h5>
                          <small className="">01 May 2023 - 23:23:55</small>
                        </div>

                      </div>
                      <div className="card-body">
                        <div className="d-flex flex-wrap gap-2  mt-2">
                          <div className="d-flex flex-column w-50 me-2">
                            <h6 className="text-nowrap d-block mb-2">Deposit</h6>
                            <p className="mb-0">{val * price} USDT</p>

                          </div>
                          <div className="d-flex flex-column" style={{ textAlign: "right" }}>
                            <h6 className="text-nowrap d-block mb-2">Reward</h6>
                            <p className="mb-0" >{investments[6]} USDT</p>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2 py-3">

                          <div className="d-flex flex-column flex-grow-1">
                            <small className="text-muted text-nowrap d-block mb-2">Return in Progress</small>
                            <div className="d-flex align-items-center">
                              <div className="progress w-100 me-3" style={{ height: "8px" }}>
                                <div className="progress-bar bg-info" role="progressbar" style={{ width: `${(investments[6] / max[6]) * 100}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                              <small>{(investments[6] / max[6]) * 100}%</small>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>)
                  if (index === 1) return (<div key={index} className="col-md-6  mb-3">
                    <div className="card h-100">
                      <div className="card-header d-flex align-items-center justify-content-between">
                        <div className="card-title mb-0">
                          <h5 className="mb-2 me-2 text-info">Standred Stake <span className='text-light ' style={{ fontSize: "14px" }}>($100-$199)</span></h5>
                          <small className="">01 May 2023 - 23:23:55</small>
                        </div>

                      </div>
                      <div className="card-body">
                        <div className="d-flex flex-wrap gap-2  mt-2">
                          <div className="d-flex flex-column w-50 me-2">
                            <h6 className="text-nowrap d-block mb-2">Deposit</h6>
                            <p className="mb-0">{val * price}  USDT</p>

                          </div>
                          <div className="d-flex flex-column" style={{ textAlign: "right" }}>
                            <h6 className="text-nowrap d-block mb-2">Reward</h6>
                            <p className="mb-0" >{investments[8]} USDT</p>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2 py-3">

                          <div className="d-flex flex-column flex-grow-1">
                            <small className="text-muted text-nowrap d-block mb-2">Return in Progress</small>
                            <div className="d-flex align-items-center">
                              <div className="progress w-100 me-3" style={{ height: "8px" }}>
                                <div className="progress-bar bg-info" role="progressbar" style={{ width: `${(investments[8] / max[8]) * 100}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                              <small>{(investments[8] / max[8]) * 100}%</small>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>)
                  if (index === 2) return (<div key={index} className="col-md-6  mb-3">
                    <div className="card h-100">
                      <div className="card-header d-flex align-items-center justify-content-between">
                        <div className="card-title mb-0">
                          <h5 className="mb-2 me-2 text-info">Super Stake <span className='text-light' style={{ fontSize: "14px" }}>($200-$499)</span></h5>
                          <small className="">01 May 2023 - 23:23:55</small>
                        </div>

                      </div>
                      <div className="card-body">
                        <div className="d-flex flex-wrap gap-2  mt-2">
                          <div className="d-flex flex-column w-50 me-2">
                            <h6 className="text-nowrap d-block mb-2">Deposit</h6>
                            <p className="mb-0">{val * price}  USDT</p>

                          </div>
                          <div className="d-flex flex-column" style={{ textAlign: "right" }}>
                            <h6 className="text-nowrap d-block mb-2">Reward</h6>
                            <p className="mb-0" >{investments[10]} USDT</p>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2 py-3">

                          <div className="d-flex flex-column flex-grow-1">
                            <small className="text-muted text-nowrap d-block mb-2">Return in Progress</small>
                            <div className="d-flex align-items-center">
                              <div className="progress w-100 me-3" style={{ height: "8px" }}>
                                <div className="progress-bar bg-info" role="progressbar" style={{ width: `${(investments[10] / max[10]) * 100}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                              <small>{(investments[10] / max[10]) * 100}%</small>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>)

                  if (index === 3) return (<div key={index} className="col-md-6  mb-3">
                    <div className="card h-100">
                      <div className="card-header d-flex align-items-center justify-content-between">
                        <div className="card-title mb-0">
                          <h5 className="mb-2 me-2 text-info">Premium Stake <span className='text-light' style={{ fontSize: "14px" }}>($500 and Above)</span></h5>
                          <small className="">01 May 2023 - 23:23:55</small>
                        </div>

                      </div>
                      <div className="card-body">
                        <div className="d-flex flex-wrap gap-2  mt-2">
                          <div className="d-flex flex-column w-50 me-2">
                            <h6 className="text-nowrap d-block mb-2">Deposit</h6>
                            <p className="mb-0">{val * price}  USDT</p>

                          </div>
                          <div className="d-flex flex-column" style={{ textAlign: "right" }}>
                            <h6 className="text-nowrap d-block mb-2">Reward</h6>
                            <p className="mb-0" >{investments[12]} USDT</p>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2 py-3">

                          <div className="d-flex flex-column flex-grow-1">
                            <small className="text-muted text-nowrap d-block mb-2">Return in Progress</small>
                            <div className="d-flex align-items-center">
                              <div className="progress w-100 me-3" style={{ height: "8px" }}>
                                <div className="progress-bar bg-info" role="progressbar" style={{ width: `${(investments[12] / max[12]) * 100}%` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                              <small>{(investments[12] / max[12]) * 100}%</small>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>)
                }
              })}






              {/* end the card of pacakges */}
            </div>

          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
