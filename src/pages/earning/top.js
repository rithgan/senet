import React, { useCallback, useContext, useEffect,useState } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';
import { NetworkContext } from '../../context/NetworkContext';
import axios from 'axios';
import { LoadingContext } from '../../context/LoadingContext';
import ReactLoader from '../../components/ReactLoader';
const config = require('../../config.json')


export default function Top({ ipAddress, loginData }) {
  const [account] = useContext(NetworkContext);
  const [data,setData] = useState({});
  const [loading, setLoading] = useContext(LoadingContext)

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
      url: `${config.baseUrl}/api/topreferral`,
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
                                <h6 className="m-0 me-2 mb-2 text-center text-info">Top-Referral Reward</h6>
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
                { (data?.turnShow) ?
                <>
                <div className="row">
                    <div className="col-md-6  mb-1">
                      <div className="card h-100">
                        <div className="card-header align-items-center" style={{padding :"3% 5% 3% 5%"}}>
                          <div className="col-md-12">
                            
                            <div className='row d-flex justify-content-between'>
                              <div className='col-6 text-left'>
                                  <small className=" text-sm text-info">Today's allocated fund - 1% </small>
                              </div>
                              <div className='col-6' style={{textAlignLast:"end"}}>
                                <small className="text-sm">$ {data?.all?.allocated}</small>
                              </div>
                            </div>
                            <div className='row d-flex justify-content-between'>
                              <div className='col-8 text-left'>
                                <small className="text-sm">Last day rolled over</small>
                              </div>
                              <div className='col-4' style={{textAlignLast:"end"}}>
                              
                              <small className="text-sm">$ {data?.all?.lastday}</small>
                              </div>
                            </div>
                            <div className='row d-flex justify-content-between'>
                              <div className='col-8 text-left'>
                                <small className="text-sm">Available for distribution</small>
                              </div>
                              <div className='col-4' style={{textAlignLast:"end"}}>
                              
                              <small className="text-sm">$ {data?.all?.available}</small>
                              </div>
                            </div>
                            <div className='row d-flex justify-content-between'>
                              <div className='col-8 text-left'>
                                <small className="text-sm"> Roll over for Next Day</small>
                              </div>
                              <div className='col-4' style={{textAlignLast:"end"}}>
                              
                              <small className="text-sm">$ {data?.all?.role}</small>
                              </div>
                            </div>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6  mb-1">
                      <div className="card h-100">
                        <div className="card-header align-items-center" style={{padding :"3% 5% 3% 5%"}}>
                          <div className="col-md-12">
                            <div className='row d-flex justify-content-between'>
                              <div className='col-12 text-left'>
                                <span className="text-info text-sm">Today's Distribution</span>
                              </div>
                            </div>
                              {
                                data?.get?.map((list, index) => {
                                  return (
                                    <>
                                    <div className='row d-flex justify-content-between'>
                                      <div className='col-6 text-left'>
                                          <small className="text-sm">Top-{list.top} : {list.user_lid} </small>
                                      </div>
                                      <div className='col-6' style={{textAlignLast:"end"}}>
                                        <small className="text-sm">$ {list.amt}</small>
                                      </div>
                                    </div>
                                    </>
                                  )
                                })
                              }
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
                </>
                :
                <></>
                } 
                <div className="row">
                    <div className="col-md-4  mb-1">
                      {
                        data?.info?.map((list, index) => {
                          return(
                            <>
                              <div className="card h-100">
                                <div className="card-header align-items-center" style={{padding :"3% 5% 3% 5%"}}>
                                  <div className="col-md-12">
                                    <div className='row d-flex justify-content-between'>
                                      <div className='col-6 text-left'>
                                        <span className="text-white text-sm">Date</span>
                                      </div>
                                      <div className='col-6' style={{textAlignLast:"end"}}>
                                        <small className="text-sm">{list.tdate}</small>
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
                                        <small className="text-sm">Position</small>
                                      </div>
                                      <div className='col-4' style={{textAlignLast:"end"}}>
                                      
                                      <small className="text-sm">{list.top}</small>
                                      </div>
                                    </div>
                                    </div>
                                </div>
                              </div>
                            </>
                          )
                        })
                      }
                      
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