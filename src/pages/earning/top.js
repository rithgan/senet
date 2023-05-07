import React, { useCallback, useContext, useEffect,useState } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';
import { NetworkContext } from '../../context/NetworkContext';
import axios from 'axios';
const config = require('../../config.json')


export default function Top({ ipAddress, loginData }) {
  const [account] = useContext(NetworkContext);
  const [downline,setDownline] = useState({});
  
  return (
    <>
        <div className="layout-container">
          <Menu />
          <div className="layout-page">
            <Header />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className='row'>
                    <div className="col-md-12  mb-3">
                        <div className="card">
                        <div className="card-header align-items-center ">
                            <div className="card-title mb-0">
                                <h6 className="m-0 me-2 mb-2 text-center text-info">Top-Referral Reward</h6>
                                <div className="d-flex justify-content-between">
                                    <div className="card-info">
                                        <p className="card-text m-0 text-info text-sm">Total Earning</p>
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
                <div className="row">
                    <div className="col-md-4  mb-1">
                      <div className="card h-100">
                        <div className="card-header align-items-center" style={{padding :"3% 5% 3% 5%"}}>
                          <div className="col-md-12">
                            <div className='row d-flex justify-content-between'>
                              <div className='col-6 text-left'>
                                <span className="text-info text-sm">Todays Total Deposit</span>
                              </div>
                              <div className='col-6' style={{textAlignLast:"end"}}>
                                <small className="text-info text-sm">$ 0.000</small>
                              </div>
                            </div>
                            <div className='row d-flex justify-content-between'>
                              <div className='col-6 text-left'>
                                  <small className=" text-sm">Allocated Fund @1% </small>
                              </div>
                              <div className='col-6' style={{textAlignLast:"end"}}>
                                <small className="text-sm">$ 00.00</small>
                              </div>
                            </div>
                            <div className='row d-flex justify-content-between'>
                              <div className='col-8 text-left'>
                                <small className="text-sm">Last Day Roled Over</small>
                              </div>
                              <div className='col-4' style={{textAlignLast:"end"}}>
                              
                              <small className="text-sm">$ 0.000</small>
                              </div>
                            </div>
                            <div className='row d-flex justify-content-between'>
                              <div className='col-8 text-left'>
                                <small className="text-sm">Available for Distribution</small>
                              </div>
                              <div className='col-4' style={{textAlignLast:"end"}}>
                              
                              <small className="text-sm">$ 0.000</small>
                              </div>
                            </div>
                            <div className='row d-flex justify-content-between'>
                              <div className='col-8 text-left'>
                                <small className="text-sm"> Roled Over for Next Day</small>
                              </div>
                              <div className='col-4' style={{textAlignLast:"end"}}>
                              
                              <small className="text-sm">$ 0.000</small>
                              </div>
                            </div>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4  mb-1">
                      <div className="card h-100">
                        <div className="card-header align-items-center" style={{padding :"3% 5% 3% 5%"}}>
                          <div className="col-md-12">
                            <div className='row d-flex justify-content-between'>
                              <div className='col-12 text-left'>
                                <span className="text-info text-sm">Todays Distribution</span>
                              </div>
                              <div className='col-6 text-left'>
                                <span className=" text-sm">Top-1 :  00000000</span>
                              </div>
                              <div className='col-6' style={{textAlignLast:"end"}}>
                                <small className="  text-sm">$ 0.000</small>
                              </div>
                            </div>
                            <div className='row d-flex justify-content-between'>
                              <div className='col-6 text-left'>
                                  <small className="text-sm">Top-Referral-2 </small>
                              </div>
                              <div className='col-6' style={{textAlignLast:"end"}}>
                                <small className="text-sm">$ 00.00</small>
                              </div>
                            </div>
                            <div className='row d-flex justify-content-between'>
                              <div className='col-8 text-left'>
                                <small className="text-sm">Top-Referral-3</small>
                              </div>
                              <div className='col-4' style={{textAlignLast:"end"}}>
                              
                              <small className="text-sm">$ 0.000</small>
                              </div>
                            </div>
                            <div className='row d-flex justify-content-between'>
                              <div className='col-8 text-left'>
                                <small className="text-sm">Top-Referral-4</small>
                              </div>
                              <div className='col-4' style={{textAlignLast:"end"}}>
                              
                              <small className="text-sm">$ 0.000</small>
                              </div>
                            </div>
                            <div className='row d-flex justify-content-between'>
                              <div className='col-8 text-left'>
                                <small className="text-sm"> Top-Referral-5</small>
                              </div>
                              <div className='col-4' style={{textAlignLast:"end"}}>
                              
                              <small className="text-sm">$ 0.000</small>
                              </div>
                            </div>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4  mb-1">
                      <div className="card h-100">
                        <div className="card-header align-items-center" style={{padding :"3% 5% 3% 5%"}}>
                          <div className="col-md-12">
                            <div className='row d-flex justify-content-between'>
                              <div className='col-6 text-left'>
                                <span className="text-white text-sm">Date</span>
                              </div>
                              <div className='col-6' style={{textAlignLast:"end"}}>
                                <small className="text-sm">2022-01-01</small>
                              </div>
                            </div>
                            <div className='row d-flex justify-content-between'>
                              <div className='col-6 text-left'>
                                  <small className="text-sm">Amount of Reward</small>
                              </div>
                              <div className='col-6' style={{textAlignLast:"end"}}>
                                <small className="text-sm">$ 00.00</small>
                              </div>
                            </div>
                            <div className='row d-flex justify-content-between'>
                              <div className='col-8 text-left'>
                                <small className="text-sm">Position</small>
                              </div>
                              <div className='col-4' style={{textAlignLast:"end"}}>
                              
                              <small className="text-sm">1st</small>
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