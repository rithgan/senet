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
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import '../css/sweetalert-dark-theme.css';
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
  }, []);

  useEffect(() => {
    handleProfit(account);
  })
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
      data: data
    };
    console.log(axiosConfig)
    axios.request(axiosConfig)
      .then((response) => {
        console.log(response.data?.balance)
        SetBalance(response.data?.balance)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [account, ipAddress, loginData.auth, loginData.token, loginData.ulid])


  useEffect(() => {

    handleWallet()
  }, [handleWallet])

  const handlePrice = (() => {

    let axiosConfig = {
      method: 'get',
      url: `https://api.linkdao.network/api/tokenPrice`,
    };
    console.log(axiosConfig)
    axios.request(axiosConfig)
      .then((response) => {
        console.log(response.data)
        setPrice(response.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  })


  useEffect(() => {
    handlePrice()
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
    console.log(axiosConfig)
    axios.request(axiosConfig)
      .then((response) => {
        console.log(response.data)
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
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <div>
                <div className="col-md-12  mb-3">
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
                      <div className='mt-4' style={{ textAlign: "center" }}>
                        <button className='btn  btn-info' onClick={() => handleWithdraw()} >Withdraw</button>
                        <button className='btn  btn-info ms-3' onClick={() => handleReInvest()}>Re-Stake</button>
                      </div>
                      <div className=' mt-4' style={{ textAlign: "center" }}>
                        <small className="text-light text-center mb-0">Withdrawl Fee @10%, Minimum withdraw $10 </small><br />
                        <small className="text-info fsmall text_center" style={{ margin: 0 }}>Re-Stake don't have any Fee or Fedication </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className='col-md-12'>
                  <div className="card mb-4">
                    <h5 className="card-header">Withdrawl Request</h5>
                    <div className="card-body">
                      <form id="formAccountSettings" onSubmit={handelSubmit} className="fv-plugins-bootstrap5 fv-plugins-framework" noValidate="novalidate">
                        <div className="row">
                          <div className="mb-3 col-sm-4 fv-plugins-icon-container">
                            <label htmlFor="companyName" className="form-label"> Wallet Address</label>
                            <input type="text" id="companyName" name="companyName" className="form-control" placeholder="Address" value={account} readOnly />
                          </div>

                          <div className="mb-3 col-sm-4">
                            <label htmlFor="state" className="form-label">Live LKD</label>
                            <input className="form-control" type="text" id="state" name="state" placeholder="Price" readOnly value={price} />
                          </div>
                          <div className="mb-3 col-sm-4">
                            <label htmlFor="state" className="form-label">Wallet Balance USD</label>
                            <input className="form-control" type="text" id="state" name="state" placeholder="Price" readOnly value={balance} />
                          </div>
                          <div className="mb-3 col-sm-4">
                            <label htmlFor="state" className="form-label">Amount ( Min 10 USD)</label>
                            <input className="form-control" type="text" id="state" name="state" placeholder="amount" value={amount} onChange={handelAmount} />
                          </div>
                          <div className="mb-3 col-sm-4">
                            <label htmlFor="state" className="form-label">Recived LKD</label>
                            <input className="form-control" type="text" id="state" name="state" placeholder="amount" readOnly value={token} />
                          </div>
                        </div>
                        <div className="mt-2 text-center">
                          <button type="submit" className="btn btn-info me-2">Process Request</button>
                        </div>
                      </form>
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
