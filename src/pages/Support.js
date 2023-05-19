import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import React, { useCallback, useContext, useEffect,useState } from 'react'
import { NetworkContext } from '../context/NetworkContext';
import axios from 'axios';
import Swal from 'sweetalert2'

const config = require('../config.json')

export default function Support({ipAddress, loginData}) {
    const [account, setAccount] = useContext(NetworkContext);
    const [ticket, SetTicket] = useState({})
  const handleSupport = useCallback(() => {
    
    let data = JSON.stringify({
      "address": account,
      "ip": ipAddress,
      "ulid": loginData.ulid
    });
    
    let axiosConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${config.baseUrl}/api/support`,
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
        // console.log(response.data)
        SetTicket(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  },[account, ipAddress, loginData.auth, loginData.token, loginData.ulid])


  useEffect(() => {
    
    handleSupport()
  },[handleSupport])

    return (
        <>
                <div className="layout-container">
                    <Menu />
                    <div className="layout-page">
                        <Header />
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y pt-2">
                                <div>
                                    
                                    <div className='row'>
                                        <div className="col-md-12  mb-2">
                                            <div className="card">
                                            <div className="card-header align-items-center ">
                                                <div className="card-title mb-0">
                                                    <h6 className="m-0 text-center text-info">Your Support Tickets</h6>
                                                </div>
                                                <div className='text-center mt-3'>
                                                <Link to="/ticket" className="btn btn-info text-nowrap btn-sm">
                                                        <i className="bx bx-user-check me-1" />Add New Ticket
                                                    </Link>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        { ticket?.info?.map((list, i) =>{
                                                // console.log(list)
                                                return(
                                                    <>
                                                    <div className="col-md-4  mb-1" id={i}>
                                                        <div className="card h-100">
                                                            <div className="card-header align-items-center" style={{padding :"3% 5% 3% 5%"}}>
                                                                <div className="col-md-12">
                                                                    <div className='row d-flex justify-content-between'>
                                                                        <div className='col-6 text-left'>
                                                                            <span className="text-white text-sm">Date</span>
                                                                        </div>
                                                                        <div className='col-6' style={{textAlignLast:"end"}}>
                                                                            <span className={'text-info text-sm'} style={{fontSize:"14px"}}>{list.adate}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row d-flex justify-content-between'>
                                                                        <div className='col-12 text-left'>
                                                                            <small className="text-sm text-info">Subject </small>
                                                                        </div>
                                                                        <div className='col-12 text-left'>
                                                                            <small className="text-sm">{list.user_subject} </small>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row d-flex justify-content-between'>
                                                                        <div className='col-12 text-left'>
                                                                            <small className="text-sm text-info">Message </small>
                                                                        </div>
                                                                        <div className='col-12 text-left'>
                                                                            <small className="text-sm">{list.user_message} </small>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row d-flex justify-content-between'>
                                                                        <div className='col-6 text-left'>
                                                                            <small className="text-sm">Status </small>
                                                                        </div>
                                                                        <div className='col-6' style={{textAlignLast:"end"}}>
                                                                            <small className="text-sm">{list.status} </small>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row d-flex justify-content-between'>
                                                                        <div className='col-6 text-left'>
                                                                            <small className="text-sm">Date of Response</small>
                                                                        </div>
                                                                        <div className='col-6' style={{textAlignLast:"end"}}>
                                                                        <small className="text-sm">{list.rdate}</small>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row d-flex justify-content-between'>
                                                                        <div className='col-12 text-left'>
                                                                            <small className="text-sm text-info">Response </small>
                                                                        </div>
                                                                        <div className='col-12 text-left'>
                                                                            <small className="text-sm">{list.reply} </small>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </>
                                                         
                                                   
                                                )
                                            }) }
                                            
                                        
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
