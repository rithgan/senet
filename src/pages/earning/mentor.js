import React, { useCallback, useContext, useEffect,useState } from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Menu from '../../components/Menu';
import { NetworkContext } from '../../context/NetworkContext';
import axios from 'axios';
import { LoadingContext } from '../../context/LoadingContext';
import ReactLoader from '../../components/ReactLoader';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const config = require('../../config.json')

export default function Mentor({ ipAddress, loginData }) {
  const [account] = useContext(NetworkContext);
  const [data,setData] = useState({});
  const [loading, setLoading] = useContext(LoadingContext)
  const history = useHistory();
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
      url: `${config.baseUrl}/api/mentor`,
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
        if(response.data?.isShow)
        {
            setData(response.data)
        }
        else
        {
            history.push('/dash')
        }
      setLoading(false)
    })
    .catch((error) => {
      // console.log(error);
    });
  },[account, history, ipAddress, loginData.auth, loginData.token, loginData.ulid, setLoading])

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
                                    <h6 className="m-0 me-2 mb-2 text-center text-info">Mentor Ship Reward</h6>
                                    <div className="d-flex justify-content-between">
                                        <div className="card-info">
                                            <p className="card-text m-0 text-info text-sm">Total Earning</p>
                                            <div className="d-flex align-items-end mb-2">
                                                <small className="text-white ">$ {data?.mentor}</small>
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
                
                <div className='row'>
                    <div className="col-md-12  mb-2">
                        <div className="card ">
                            <div className="card-body align-items-center p-3">
                                <div className='text-center mt-3'>
                                    <button className='btn  btn-info btn-sm' >Withdrawl</button>
                                </div>
                            </div>
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