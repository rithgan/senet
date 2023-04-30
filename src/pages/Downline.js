import React, { useCallback, useContext, useEffect,useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import { NetworkContext } from '../context/NetworkContext';
import axios from 'axios';
const config = require('../config.json')


export default function Downline({ ipAddress, loginData }) {
  const [account, setAccount] = useContext(NetworkContext);
  const [downline,setDownline] = useState({});
  const [downlineTable,setDownlineTable] = useState({});
  const level = [1, 2, 3, 4, 5, 6,7, 8,9,10,11,13,14,15,16,17,18,19,20,21]
  const handleDownline = useCallback(() => {
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
    console.log(axiosConfig)
    axios.request(axiosConfig)
    .then((response) => {
      setDownline(response.data)
      // setDownline(config.downline)
      setDownlineTable(response.data.downList)
      console.log(response.data); 
      
    })
    .catch((error) => {
      console.log(error);
    });
  },[account, ipAddress, loginData.auth, loginData.token, loginData.ulid])

  useEffect(() => {
    handleDownline()
  },[handleDownline])

  return (
    <>
        <div className="layout-container">
          <Menu />
          <div className="layout-page">
            <Header />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <div>
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="card-info">
                              <p className="card-text">Total Registration</p>
                              <div className="d-flex align-items-end mb-2">
                                <h4 className="card-title mb-0 me-2">{downline.total_downline}</h4>
                              </div>
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
                    <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="card-info">
                              <p className="card-text">Verified</p>
                              <div className="d-flex align-items-end mb-2">
                                <h4 className="card-title mb-0 me-2">{downline.Active_downline}</h4>
                              </div>
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
                    <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="card-info">
                              <p className="card-text">Un-Verified</p>
                              <div className="d-flex align-items-end mb-2">
                                <h4 className="card-title mb-0 me-2">{downline.Inactive_downline}</h4>
                              </div>
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
                  <div className="row">
                    <div className="card mb-4">
                      <h5 className="card-header">Downline Search</h5>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12">
                            <form className="row g-3">
                              <div className="col-12 col-md-3">
                                <label className="form-label" htmlFor="paymentName">Level</label>
                                <select className="form-control" id="level" name="level">
                                  <option>Select Level</option>
                                  {level?.map(list=>(
                                    <option value={list}>{list} level</option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-6 col-md-3">
                                <label className="form-label" htmlFor="paymentExpiryDate">From Date: Stake Holder</label>
                                <input type="date" id="paymentExpiryDate" className="form-control " placeholder="Date From" />
                              </div>
                              <div className="col-6 col-md-3">
                                <label className="form-label" htmlFor="paymentCvv">Upto Date: Stake Holder</label>
                                <div className="input-group input-group-merge">
                                  <input type="date" id="paymentCvv" className="form-control " placeholder="Date Upto" />
                                </div>
                              </div>
                              <div className="col-6 col-md-3 mt-5 text-center">
                                <button type="submit" className="btn btn-primary me-sm-3 me-1">Search Now</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="card">
                      <h5 className="card-header">Downline List</h5>
                      <div className="card-datatable table-responsive">
                        <table className="datatable table border-top ">
                          <thead>
                            <tr>
                              <th>id</th>
                              <th>Name</th>
                              <th>Level</th>
                              <th>Stake(USD)</th>
                              <th>Date Of Registration</th>
                              <th>Status</th>
                              <th>Date Of Activation</th>
                              <th>Sponsor Name</th>
                              <th>Sponsor ID</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              downline?.downList?.map((list, index)=>{
                                
                                return (<tr>
                                  <td>{index+1}</td>
                                  <td>{list.name}</td>
                                  <td>{list.name} Level</td>
                                  <td>{list.invest}</td>
                                  <td>{list.jdate}</td>
                                  <td>{list.status}</td>
                                  <td>{list.adate}</td>
                                  <td>{list.sname}</td>
                                  <td>{list.splid}</td>
                                </tr>)
                                
                              })

                            }
                          </tbody>
                        </table>
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