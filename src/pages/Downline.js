import React, { useCallback, useContext, useEffect,useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import { NetworkContext } from '../context/NetworkContext';
import axios from 'axios';
import { LoadingContext } from '../context/LoadingContext';
import ReactLoader from '../components/ReactLoader';
const config = require('../config.json')


export default function Downline({ ipAddress, loginData }) {
  const [account, setAccount] = useContext(NetworkContext);
  const [downline,setDownline] = useState({});
  const [downlineTable,setDownlineTable] = useState({});
  const [loading, setLoading] = useContext(LoadingContext)
  const [limit, setLimit] = useState(0)
  const [dtfo, setDtfo] = useState('')
  const [dtto, setDtto] = useState('')
  const level = [1, 2, 3, 4, 5, 6,7, 8,9,10,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]
  const handleDownline = useCallback(() => {
    setLoading(true)
    let data = JSON.stringify({
      "address": account,
      "ip": ipAddress,
      "ulid": loginData.ulid
    });
    
    let axiosConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${config.baseUrl}/api/downline`,
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
    // console.log(axiosConfig)
    axios.request(axiosConfig)
    .then((response) => {
      setDownline(response.data)
      // setDownline(config.downline)
      setDownlineTable(response.data.downList)
      // console.log(response.data); 
      setLoading(false)
    })
    .catch((error) => {
      console.log(error);
    });
  },[account, ipAddress, loginData.auth, loginData.token, loginData.ulid, setLoading])

  const handleDownlineSearch = useCallback((e) => {
    e.preventDefault();
    
    let data = JSON.stringify({
      "address": account,
      "ip": ipAddress,
      "ulid": loginData.ulid,
      "search" : {
        "level" : limit,
        "fromdate" : dtfo,
        "uptodate" : dtto
      }
    });
    
    let axiosConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${config.baseUrl}/api/downline`,
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
    // console.log(axiosConfig)
    axios.request(axiosConfig)
    .then((response) => {
      setDownline(response.data)
      // setDownline(config.downline)
      setDownlineTable(response.data.downList)
      // console.log(response.data); 
      
    })
    .catch((error) => {
      console.log(error);
    });
  },[account, dtfo, dtto, ipAddress, limit, loginData.auth, loginData.token, loginData.ulid])

  useEffect(() => {
    handleDownline()
  },[handleDownline])

  return (
    <>
        <div className="layout-container">
          <Menu />
          <div className="layout-page">
            <Header />
            {loading ? <><ReactLoader/></> :
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y pt-2">
                <div>
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-6 mb-2">
                        <div className="card">
                            <div className="card-body dashinc">
                                <div className="d-flex justify-content-between">
                                    <div className="card-info">
                                        <p className="card-text m-0 text-info text-sm">Total Registration</p>
                                        <div className="d-flex align-items-end mb-2">
                                            <small className="text-white ">{downline.total_downline}</small>
                                        </div>
                                        
                                    </div>
                                    <div className="card-icon">
                                        <span className="badge bg-label-info rounded p-2">
                                            <i className="bx bx-user bx-sm" />
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
                                        <p className="card-text m-0 text-info text-sm">Active Members</p>
                                        <div className="d-flex align-items-end mb-2">
                                            <small className="text-white ">{downline.Active_downline}</small>
                                        </div>
                                        
                                    </div>
                                    <div className="card-icon">
                                        <span className="badge bg-label-info rounded p-2">
                                            <i className="bx bx-user bx-sm" />
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
                                        <p className="card-text m-0 text-info text-sm">In-Active Members</p>
                                        <div className="d-flex align-items-end mb-2">
                                            <small className="text-white ">{downline.Inactive_downline}</small>
                                        </div>
                                        
                                    </div>
                                    <div className="card-icon">
                                        <span className="badge bg-label-info rounded p-2">
                                            <i className="bx bx-user bx-sm" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className='col-12'>
                      <div className="card mb-2">
                        <h6 className="card-header text-center text-info">Downline Search</h6>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-12">
                              <form className="row g-3" onSubmit={handleDownlineSearch}>
                                <div className="col-12 col-md-3">
                                  <label className="form-label" htmlFor="paymentName">Level</label>
                                  <select className="form-control" id="level" name="level" onChange={(e) =>setLimit(e.target.value)}>
                                    <option value={0}>Select Level</option>
                                    {level?.map(list=>(
                                      <option value={list}>{list} level</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="col-12 col-md-3">
                                  <label className="form-label" htmlFor="paymentExpiryDate">From Date: Stake Holder</label>
                                  <input type="date" id="paymentExpiryDate" className="form-control " placeholder="Date From" onChange={(e) =>setDtfo(e.target.value)}  />
                                </div>
                                <div className="col-12 col-md-3">
                                  <label className="form-label" htmlFor="paymentCvv">Upto Date: Stake Holder</label>
                                  <div className="input-group input-group-merge">
                                    <input type="date" id="paymentCvv" className="form-control " placeholder="Date Upto" onChange={(e) =>setDtto(e.target.value)} />
                                  </div>
                                </div>
                                <div className="col-12 col-md-3 mt-5 text-center">
                                  <button type="submit" className="btn btn-info btn-sm text-sm me-sm-3 me-1">Search Now</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                  {
                              downline?.downList?.map((list, index)=>{
                                let stake = parseFloat(list?.invest).toFixed(3);
                                return ( 
                    <div className="col-md-4  mb-1" id={index+1}>
                      <div className="card h-100">
                        <div className="card-header align-items-center" style={{padding :"3% 5% 3% 5%"}}>
                          <div className="col-md-12">
                            <div className='row d-flex justify-content-between'>
                              <div className='col-6 text-left'>
                                <span className="text-white text-sm">ID - {list?.uslid}</span>
                              </div>
                              <div className='col-6' style={{textAlignLast:"end"}}>
                                <span className={`${(list.status === 'ACTIVE')?'text-info text-sm':'text-danger text-sm'}`} style={{fontSize:"14px"}}>{list?.status}</span>
                              </div>
                            </div>
                            <div className='row d-flex justify-content-between'>
                              <div className='col-6 text-left'>
                                  <small className="text-sm">Sponsor : {list?.splid}</small>
                              </div>
                              <div className='col-6' style={{textAlignLast:"end"}}>
                                <small className="text-sm">DOS : {list?.adate}</small>
                              </div>
                            </div>
                            <div className='row d-flex justify-content-between'>
                              <div className='col-8 text-left'>
                                <small className="text-sm">Stake Amt. : ${(isNaN(stake))?0:stake}</small>
                              </div>
                              <div className='col-4' style={{textAlignLast:"end"}}>
                              
                              <small className="text-sm">Level : {list?.level}</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    )
                    })
                  }
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