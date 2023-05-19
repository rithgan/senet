import React, { useCallback, useContext, useEffect,useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import { NetworkContext } from '../context/NetworkContext';
import axios from 'axios';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
const config = require('../config.json')

export default function Profile({ipAddress, loginData}) {
    const [account] = useContext(NetworkContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState();
  
  const handleProfile = useCallback(() => {
    
    let data = JSON.stringify({
      "address": (loginData.address)?loginData.address:account,
      "ip": ipAddress,
      "ulid": loginData.ulid
    });
    
    let axiosConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${config.baseUrl}/api/profile`,
      headers: { 
        'address': (loginData.address)?loginData.address:account, 
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
        setName(response.data.data?.uname)
        setEmail(response.data.data?.uemail)
        setMobile(response.data.data?.umobile)   
    })
    .catch((error) => {
      // console.log(error);
    });
  },[account, ipAddress, loginData.address, loginData.auth, loginData.token, loginData.ulid])

  
  useEffect(() => {
    
    handleProfile()
  },[handleProfile])

  const handleProfileEdit = (e) => {
    e.preventDefault()
    let data = JSON.stringify({
      "address": (loginData.address)?loginData.address:account,
      "ip": ipAddress,
      "ulid": loginData.ulid,
      "uname" : name,
      "uemail"  : email,
      "umobile" : mobile
    });
    
    let axiosConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${config.baseUrl}/api/profileedit`,
      headers: { 
        'address': (loginData.address)?loginData.address:account, 
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
        setName(response.data.data?.uname)
        setEmail(response.data.data?.uemail)
        setMobile(response.data.data?.umobile)   
    })
    .catch((error) => {
      console.log(error);
    });
  }

    return (
        <>
                <div className="layout-container">
                    <Menu />
                    <div className="layout-page">
                        <Header />
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className="row">
                                    <div className='col-md-12'>
                                        <div className="card mb-4">
                                            <h5 className="card-header text-center text-info">Your Profile</h5>
                                            <div className="card-body">
                                                <form id="formAccountSettings" onSubmit={handleProfileEdit} className="fv-plugins-bootstrap5 fv-plugins-framework" noValidate="novalidate">
                                                    <div className="row">
                                                        <div className="mb-3 col-sm-6 fv-plugins-icon-container">
                                                            <label htmlFor="companyName" className="form-label">Full Name</label>
                                                            <input type="text" id="companyName" name="companyName" className="form-control" placeholder="ThemeSelection" value={name} onChange={(e) => {setName(e.target.value)}}/>
                                                            <div className="fv-plugins-message-container invalid-feedback" />
                                                        </div>
                                                        <div className="mb-3 col-sm-6 fv-plugins-icon-container">
                                                            <label htmlFor="billingEmail" className="form-label">Email</label>
                                                            <input className="form-control" type="text" id="email" name="email" placeholder="john.doe@example.com"  value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                                                            <div className="fv-plugins-message-container invalid-feedback" />
                                                        </div>
                                                        <div className="mb-3 col-sm-6">
                                                            <label htmlFor="taxId" className="form-label">Contact Number</label>
                                                            <PhoneInput id="taxId" name="taxId" className="form-control" defaultCountry="US" placeholder="Contact Number" value={mobile} onChange={setMobile}/>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 text-center">
                                                        <button type="submit" className="btn btn-info me-2 text-sm btn-info">Save changes</button>
                                                    </div>
                                                </form>
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