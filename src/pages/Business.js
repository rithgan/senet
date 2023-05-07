import React, { useCallback, useContext, useEffect,useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import { NetworkContext } from '../context/NetworkContext';
import axios from 'axios';
import { LoadingContext } from '../context/LoadingContext';
import ReactLoader from '../components/ReactLoader';
const config = require('../config.json')

export default function Business({ipAddress, loginData}) {
    const [account, setAccount] = useContext(NetworkContext);
  const [business,setBusiness] = useState({});
  const [loading, setLoading] = useContext(LoadingContext)
  const [businessTable,setBusinessTable] = useState({});
  
  const handleBusiness = useCallback(() => {
    setLoading(true)
    let data = JSON.stringify({
      "address": account,
      "ip": ipAddress,
      "ulid": loginData.ulid
    });
    
    let axiosConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${config.baseUrl}/api/business`,
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
        setBusiness(response.data)
      // setDownline(config.downline)
      setBusinessTable(response.data.info)
      console.log(response.data); 
      setLoading(false)
    })
    .catch((error) => {
      console.log(error);
    });
  },[account, ipAddress, loginData.auth, loginData.token, loginData.ulid, setLoading])

  useEffect(() => {
    
    handleBusiness()
  },[handleBusiness])
    return (
        <>
                <div className="layout-container">
                    <Menu />
                    <div className="layout-page">
                        <Header />
                        {loading ? <><ReactLoader/></> :
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className='row'>
                                    <div className="col-md-12  mb-3">
                                        <div className="card">
                                        <div className="card-header align-items-center ">
                                            <div className="card-title mb-0">
                                            <h6 className="m-0 me-2 text-center text-info">Business Statistics</h6>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                                        <div class="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Team</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> {business?.total}</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            <i class='bx bx-user-circle bx-sm'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                                        <div class="card">
                                            <div className="card-body dashinc">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text m-0 text-info text-sm">Total Business</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <small className="text-white "> {business?.buss?.toFixed(3)}</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            <i class='bx bx-dollar-circle bx-sm'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    {
                                                business?.info?.map((list, index)=>{
                                                    
                                                    return ( 
                                        <div className="col-md-4  mb-1">
                                            <div className="card h-100">
                                                <div className="card-header align-items-center" style={{padding :"3% 5% 3% 5%"}}>
                                                <div className="col-md-12">
                                                    <div className='row d-flex justify-content-between'>
                                                        <div className='col-12 text-left'>
                                                            <span className="text-sm text-info"> Direct Associate {index+1} : ID - {list?.ulid}</span>
                                                        </div>
                                                    </div>
                                                    <div className='row d-flex justify-content-between'>
                                                        <div className='col-6 text-left'>
                                                            <small className="text-sm text-white"> Total Team Business </small>
                                                        </div>
                                                        <div className='col-6' style={{textAlignLast:"end"}}>
                                                            <small className="text-sm text-white">$ {list?.buss}</small>
                                                        </div>
                                                    </div>
                                                    <div className='row d-flex justify-content-between'>
                                                        <div className='col-6 text-left'>
                                                            <small className="text-sm text-white"> Contact Number </small>
                                                        </div>
                                                        <div className='col-6' style={{textAlignLast:"end"}}>
                                                            <small className="text-sm text-white">+{list?.mcode} {list?.umobile}</small>
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
                            <Footer />
                        </div>
                    }
                    </div>
                </div>
        </>
    );
}
