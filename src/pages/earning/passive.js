import React, { useCallback, useContext, useEffect,useState } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';
import { NetworkContext } from '../../context/NetworkContext';
import axios from 'axios';
import { LoadingContext } from '../../context/LoadingContext';
import ReactLoader from '../../components/ReactLoader';
const config = require('../../config.json')


export default function Passive({ ipAddress, loginData }) {
  const [account] = useContext(NetworkContext);
  const [data,setData] = useState({});
  const [loading, setLoading] = useContext(LoadingContext)
  const [limit, setLimit] = useState(0)
  const [dtfo, setDtfo] = useState('')
  const [dtto, setDtto] = useState('')
  const level = [1, 2, 3, 4, 5, 6,7, 8,9,10,11,12,13,14,15,16,17,18,19,20]

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
      url: `${config.baseUrl}/api/passive`,
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
      setData(response.data)
      // console.log(response.data); 
      setLoading(false)
      
    })
    .catch((error) => {
      console.log(error);
    });
  },[account, dtfo, dtto, ipAddress, limit, loginData.auth, loginData.token, loginData.ulid, setLoading])
  
  const handleDownline = useCallback(() => {
    setLoading(true)
    let data = JSON.stringify({
      "address": account,
      "ip": ipAddress,
      "ulid": loginData.ulid,
      
    });
    
    let axiosConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${config.baseUrl}/api/passive`,
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
      setData(response.data)
      // console.log(response.data); 
      setLoading(false)
    })
    .catch((error) => {
      // console.log(error);
    });
  },[account, ipAddress, loginData.auth, loginData.token, loginData.ulid, setLoading])
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
                <div className='row'>
                    <div className="col-md-12  mb-2">
                        <div className="card">
                        <div className="card-header align-items-center ">
                            <div className="card-title mb-0">
                                <h6 className="m-0 me-2 mb-2 text-center text-info">Passive Uni-Level Reward</h6>
                                <div className="d-flex justify-content-between">
                                    <div className="card-info">
                                        <p className="card-text m-0 text-info text-sm">Total Earning</p>
                                        <div className="d-flex align-items-end mb-2">
                                            <small className="text-white ">$ {data?.tearn}</small>
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
                    <div className='col-12'>
                      <div className="card mb-2">
                        <h6 className="card-header text-center text-info">Downline Search</h6>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-12">
                              <form className="row g-3" onSubmit={handleDownlineSearch}>
                                <div className="col-12 col-md-3">
                                  <label className="form-label" htmlFor="paymentName">Compressed Level</label>
                                  <select className="form-control" id="level" name="level" onChange={(e) =>setLimit(e.target.value)}>
                                    <option value={0}>Select Level</option>
                                    {level?.map(list=>(
                                      <option value={list}>{list} level</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="col-12 col-md-3">
                                  <label className="form-label" htmlFor="paymentExpiryDate">Earning From Date: </label>
                                  <input type="date" id="paymentExpiryDate" className="form-control " placeholder="Date From" onChange={(e) =>setDtfo(e.target.value)}  />
                                </div>
                                <div className="col-12 col-md-3">
                                  <label className="form-label" htmlFor="paymentCvv">Earning Upto Date: </label>
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
                <div className="row">
                    
                      { data?.info?.map((list, index) =>{
                        return(
                          <>
                          <div className="col-md-4  mb-1">
                          <div className="card h-100" id={index}>
                            <div className="card-header align-items-center" style={{padding :"3% 5% 3% 5%"}}>
                              <div className="col-md-12">
                                <div className='row d-flex justify-content-between'>
                                  <div className='col-6 text-left'>
                                    <span className="text-white text-sm">Date</span>
                                  </div>
                                  <div className='col-6' style={{textAlignLast:"end"}}>
                                    <small className="text-sm">{list.date}</small>
                                  </div>
                                </div>
                                <div className='row d-flex justify-content-between'>
                                  <div className='col-6 text-left'>
                                      <small className="text-sm">Amount of Reward</small>
                                  </div>
                                  <div className='col-6' style={{textAlignLast:"end"}}>
                                    <small className="text-sm">$ {list.amt}</small>
                                  </div>
                                </div>
                                
                                <div className='row d-flex justify-content-between'>
                                  <div className='col-8 text-left'>
                                    <small className="text-sm">Refrence ID / Level</small>
                                  </div>
                                  <div className='col-4' style={{textAlignLast:"end"}}>
                                  
                                  <small className="text-sm">{list.ref} / L-{list.level}</small>
                                  </div>
                                </div>
                                <div className='row d-flex justify-content-between'>
                                  <div className='col-8 text-left'>
                                    <small className="text-sm">Compressed Level</small>
                                  </div>
                                  <div className='col-4' style={{textAlignLast:"end"}}>
                                  
                                  <small className="text-sm">CL-{list.clevel}</small>
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
