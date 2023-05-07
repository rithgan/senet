import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import React, { useCallback, useContext, useEffect,useState } from 'react'
import { NetworkContext } from '../context/NetworkContext';
import axios from 'axios';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import '../css/sweetalert-dark-theme.css';
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
    console.log(axiosConfig)
    axios.request(axiosConfig)  
    .then((response) => {
        console.log(response.data)
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
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card mb-4">
                                                <div className="user-profile-header d-flex flex-column flex-sm-row text-sm-start text-center mb-4">
                                                    <div className="flex-grow-1 mt-3 mt-sm-5">
                                                        <div className="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-4 flex-md-row flex-column gap-4">
                                                            <div className="user-profile-info">
                                                                <h4>Your Support Tickets</h4>
                                                            </div>
                                                            <Link to="/ticket" className="btn btn-info text-nowrap">
                                                                <i className="bx bx-user-check me-1" />Add New Ticket
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        { ticket?.info?.map((list) =>{
                                                console.log(list)
                                                return(
                                                    
                                                         <div className="col-xl-4 col-lg-6 col-md-6">
                                                            <div className="card mt-4">
                                                                <div className="card-header">
                                                                    <div className="d-flex align-items-start">
                                                                        <div className="d-flex align-items-start">
                                                                            <div className="avatar me-3">
                                                                                <img src="assets/img/icons/brands/social-label.png" alt="Avatar" className="rounded-circle" />
                                                                            </div>
                                                                            <div className="me-2">
                                                                                <h5 className="mb-1"><span className="h5 stretched-link text-info">Support Ticket</span></h5>
                                                                                <div className="client-info d-flex align-items-center">
                                                                                    <h6 className="mb-0 me-1">Subject:</h6><br/><span>{list.user_subject}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="card-body">
                                                                    <div className="d-flex align-items-center flex-wrap">
                                                                        <div className="bg-lighter p-2 rounded me-auto mb-3">
                                                                            <h6 className="mb-1">Start Date: <span className="text-body fw-normal">{list.adate}</span></h6>
                                                                            <span>{list.status}</span>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    <h6>Message</h6>
                                                                    <p className="mb-0">{list.user_message}</p>
                                                                </div>
                                                                <div className="card-body border-top">
                                                                <div className="d-flex align-items-center flex-wrap">
                                                                        <div className="bg-lighter p-2 rounded me-auto mb-3">
                                                                            <h6 className="mb-1">Complition Date: <span className="text-body fw-normal">{list.rdate}</span></h6>
                                                                            <span>{list.status}</span>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                    <h6>Replay</h6>
                                                                    <p className="mb-0">{list.reply}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                   
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
