import React, { useContext, useState, useEffect, useCallback } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import { NetworkContext } from '../context/NetworkContext';
import { ConnectContext } from '../context/ConnectContext';
import { withdraw, reInvest, getWithdrawableTotalProfit } from '../contract/stakes';
import { getBusdPrice, uploadStake } from '../utils';
import { pool } from '../address';
import { poolABI } from '../abi';
import axios from 'axios';
import ReactLoader from '../components/ReactLoader';
import { LoadingContext } from '../context/LoadingContext';
import Swal from 'sweetalert2'

const config = require('../config.json')

export default function Request({ ipAddress, loginData }) {
  const [account] = useContext(NetworkContext);
  const [price, setPrice] = useState(0.0)
  const [amount, setAmount] = useState(0.0)
  const [token, SetToken] = useState(0.0)
  const [balance, SetBalance] = useState(0.0)
  const [provider] = useContext(ConnectContext)
  const [profit, setProfit] = useState(0)
  const [busdPrice, setBusdPrice] = useState(0)
  const [loading, setLoading] = useContext(LoadingContext)
  const [info, setInfo] = useState({})
  const handleProfit = async (account) => {
    let res = await getWithdrawableTotalProfit(
      provider,
      pool,
      poolABI,
      account
    );
    setProfit(res);
  };

  const handleBusdPrice = useCallback(async () => {
    let pr = await getBusdPrice();
    setBusdPrice(parseFloat(pr).toFixed(3));
    setPrice(parseFloat(pr).toFixed(3));
  }, []);

  useEffect(() => {
    handleProfit(account);
  })
  const handleWallet = useCallback(() => {
    setLoading(true)
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
      data: data
    };
    // console.log(axiosConfig)
    axios.request(axiosConfig)
      .then((response) => {
        // console.log(response.data)
        SetBalance(response.data?.balance)
        setInfo(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [account, ipAddress, loginData.auth, loginData.token, loginData.ulid, setLoading])


  useEffect(() => {

    handleWallet()
  }, [handleWallet])

  useEffect(() => {
    
    handleBusdPrice()
  }, [handleBusdPrice])

  const handelAmount = (e) => {
    let amt = e.target.value
    if (amt > balance) {
      Swal.fire({
        icon: 'error',
        title: "Lkd Defi",
        text: "Your Balance is Low. Please Check Balance."
      })
    }
    else
      if (amt < 10) {
        Swal.fire({
          icon: 'error',
          title: "Lkd Defi",
          text: "Please Enter valid Amount"
        })
        setAmount(0)
        SetToken(0)
      }
      else {
        setAmount(amt)
        SetToken(amt / price)
      }
  }

  const handelSubmit = (e) => {
    e.preventDefault()
    let data = JSON.stringify({
      "address": account,
      "ip": ipAddress,
      "ulid": loginData.ulid,
      "usd": amount,
      "price": price,
      "token": token
    });

    let axiosConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${config.baseUrl}/api/walletrequest`,
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
    // console.log(axiosConfig)/
    axios.request(axiosConfig)
      .then((response) => {
        // console.log(response.data)
        let res = response.data
        if (res.status) {
          Swal.fire({
            icon: 'info',
            title: 'LinkDao Defi',
            text: res.message
          });
          setAmount(0)
          SetToken(0)

        }
        else {
          Swal.fire({
            icon: 'warning',
            title: 'LinkDao Defi',
            text: res.message
          });
        }
        handleWallet()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleWithdraw = async () => {
    await withdraw(provider, pool, poolABI);
  };

  const handleReInvest = async () => {
    let conf = await reInvest(provider, pool, poolABI);
    let txnHash = conf?.transactionHash
    await uploadStake(txnHash, price * profit, account, ipAddress, loginData, price)
  };
  return (
    <>
      <div className="layout-container">
        <Menu />
        <div className="layout-page">
          <Header />
          {loading ? <><ReactLoader/></> :
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y pt-2">
              <div className='row'>
                <div className="col-md-6  mb-2">
                  <div className="card ">
                    <div className="card-body align-items-center p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="card-title mb-0">
                          <p className='text-info mb-0' >Available Staking Reward </p><p className='text-md'>$ {parseFloat(price * profit * busdPrice).toFixed(3)}</p>
                        </div>
                        <div className="">
                          <p className='mb-0'><br/></p>
                          <p className='text-md'>{parseFloat(profit).toFixed(3)} LKD</p>
                        </div>
                      </div>
                      <div className='text-center mt-2'>
                        <button className='btn  btn-info btn-sm' onClick={() => handleWithdraw()}>Withdraw</button>
                        <button className='btn  btn-info btn-sm ms-3' onClick={() => handleReInvest()}>Re-Stake</button>
                      </div>
                      <div className='text-center mt-4'>
                        <small className="text-light text-center mb-0">Withdrawl Fee - 10%, Minimum withdraw $10 </small><br />
                        <small className="text-info fsmall text_center" style={{ margin: 0 }}>Re-Stake don't have any Fee or Deduction </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6  mb-3">
                  <div className="card ">
                    <div className="card-body align-items-center p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="card-title mb-0">
                          <p className='text-info mb-0' >Available Referral Reward </p><p className='text-md'>$ {balance}</p>
                        </div>
                        <div className="">
                          <p className='mb-0'><br/></p>
                          <p className='text-md'>{balance/busdPrice} LKD</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">

                        <input type="text" className="form-control me-3" placeholder="USDT" value={amount} onChange={handelAmount} />
                        <input type="text" disabled className="form-control " placeholder="LKD" value={token + ' LKD'} />

                      </div>
                      <div className='text-center mt-4'>
                        <button className='btn  btn-info btn-sm' onClick={() => handelSubmit()}>Withdraw</button>
                      </div>
                      <div className='text-center mt-4'>
                        <small className="text-light text-center mb-0">Minimum withdraw $10 </small><br />
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
                          <h6 className="m-0 me-2 text-center text-info">Withdraw History</h6>
                          </div>
                      </div>
                      </div>
                  </div>
              </div>
              <div className='row'>
                { info.list?.map((list, index) => {
                  return (
                    <>
                  <div className="col-md-4  mb-1" id={index}>
                      <div className="card h-100">
                          <div className="card-header align-items-center" style={{padding :"3% 5% 3% 5%"}}>
                          <div className="col-md-12">
                              <div className='row d-flex justify-content-between'>
                                  <div className='col-6 text-left'>
                                      <span className="text-white text-sm">Date</span>
                                  </div>
                                  <div className='col-6' style={{textAlignLast:"end"}}>
                                      <span className={'text-info text-sm'} style={{fontSize:"14px"}}>{list.rdate}</span>
                                  </div>
                              </div>
                              <div className='row d-flex justify-content-between'>
                                  <div className='col-6 text-left'>
                                      <small className="text-sm">Amount</small>
                                  </div>
                                  <div className='col-6' style={{textAlignLast:"end"}}>
                                      <small className="text-sm">$ {list.netAmont}/ {list.netAmont*list.price} LKD </small>
                                  </div>
                              </div>
                              <div className='row d-flex justify-content-between'>
                                  <div className='col-6 text-left'>
                                      <small className="text-sm">Status</small>
                                  </div>
                                  <div className='col-6' style={{textAlignLast:"end"}}>
                                      <small className="text-sm"><span >{list.status}</span></small>
                                  </div>
                              </div>
                              <div className='row d-flex justify-content-between'>
                                  <div className='col-6 text-left'>
                                      <small className="text-sm">Trx Hash</small>
                                  </div>
                                  <div className='col-6' style={{textAlignLast:"end"}}>
                                      <small className="text-sm"><a href={'https://bscscan.com/tx/'+list.thash} className='text-info' target='blank'>Click to View</a></small>
                                  </div>
                              </div>
                          </div>
                          </div>
                      </div>
                  </div>
                 </>
                  )
                })}
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
