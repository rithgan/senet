import React, { useCallback, useContext, useEffect,useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import { NetworkContext } from '../context/NetworkContext';
import axios from 'axios';
const config = require('../config.json')

export default function Profile({ipAddress, loginData}) {
    const [account, setAccount] = useContext(NetworkContext);
  const [profile, setProfile] = useState({});
  
  
  const handleProfile = useCallback(() => {
    
    let data = JSON.stringify({
      "address": account,
      "ip": ipAddress,
      "ulid": loginData.ulid
    });
    
    let axiosConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${config.baseUrl}/api/profile`,
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
        setProfile(response.data)
           
    })
    .catch((error) => {
      console.log(error);
    });
  },[account, ipAddress, loginData.auth, loginData.token, loginData.ulid])

  useEffect(() => {
    
    handleProfile()
  },[handleProfile])
    return (
        <>
            <div className="layout-wrapper layout-content-navbar  ">
                <div className="layout-container">
                    <Menu />
                    <div className="layout-page">
                        <Header />
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className="row">
                                    <div className="card mb-4">
                                        <h5 className="card-header">Your Profile</h5>
                                        <div className="card-body">
                                            <form id="formAccountSettings" onSubmit={handleProfile} className="fv-plugins-bootstrap5 fv-plugins-framework" noValidate="novalidate">
                                                <div className="row">
                                                    <div className="mb-3 col-sm-6 fv-plugins-icon-container">
                                                        <label htmlFor="companyName" className="form-label">Full Name</label>
                                                        <input type="text" id="companyName" name="companyName" className="form-control" placeholder="ThemeSelection" value={profile.data?.uname}/>
                                                        <div className="fv-plugins-message-container invalid-feedback" />
                                                    </div>
                                                    <div className="mb-3 col-sm-6 fv-plugins-icon-container">
                                                        <label htmlFor="billingEmail" className="form-label">Email</label>
                                                        <input className="form-control" type="text" id="email" name="email" placeholder="john.doe@example.com"  value={profile.data?.uemail}/>
                                                        <div className="fv-plugins-message-container invalid-feedback" />
                                                    </div>
                                                    <div className="mb-3 col-sm-6">
                                                        <label htmlFor="taxId" className="form-label">Contact Number</label>
                                                        <input type="text" id="taxId" name="taxId" className="form-control" placeholder="Contact Number" value={profile?.data?.umobile} />
                                                    </div>
                                                    <div className="mb-3 col-sm-6">
                                                        <label htmlFor="state" className="form-label">Address</label>
                                                        <input className="form-control" type="text" id="state" name="state" placeholder="Address" value={account} readOnly />
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-center">
                                                    <button type="submit" className="btn btn-info me-2">Save changes</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
                <div className="layout-overlay layout-menu-toggle"></div>
                <div className="drag-target"></div>
            </div>
        </>
    );
}
