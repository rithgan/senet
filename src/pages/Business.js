import React, { useCallback, useContext, useEffect,useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import { NetworkContext } from '../context/NetworkContext';
import axios from 'axios';
import { LoadingContext } from '../context/LoadingContext';
import { TailSpin } from 'react-loader-spinner';
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
                        {loading ? <><TailSpin
          height="80"
          width="80"
          color="#ffffff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{margin:'auto'}}
          wrapperClass=""
          visible={true}
        /></> :
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className="row">
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Downline</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <h4 className="card-title mb-0 me-2">{business?.total}</h4>
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
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Business</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <h4 className="card-title mb-0 me-2">{business?.buss?.toFixed(3)}</h4>
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
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Top Leg</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <h4 className="card-title mb-0 me-2">{business?.top?.toFixed(3)}</h4>
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
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Other Leg</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <h4 className="card-title mb-0 me-2">{business?.other?.toFixed(3)}</h4>
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
                                    <div className="card">
                                        <h5 className="card-header">Business Leg</h5>
                                        <div className="card-datatable table-responsive">
                                            <table className="datatable table border-top ">
                                                <thead>
                                                    <tr>
                                                        <th>LEG</th>
                                                        <th>BUSINESS (USD)</th>
                                                        <th>NAME</th>
                                                        <th>ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        business?.info?.map((list, index)=>{
                                                            return(
                                                                <tr>
                                                                    <td>{index+1}</td>
                                                                    <td>{list.buss}</td>
                                                                    <td>{list.uname} USD</td>
                                                                    <td>{list.ulid}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
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
