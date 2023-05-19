import React, {  useContext, useState } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import { NetworkContext } from '../context/NetworkContext';
import axios from 'axios';
import Swal from 'sweetalert2'

const config = require('../config.json')

export default function Ticket({ipAddress, loginData}) {
    const [account] = useContext(NetworkContext);
  
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const handleTicket = (e) => {
    e.preventDefault()
    if(subject.length > 10 && message.length > 0)
    {
        let data = JSON.stringify({
        "address": account,
        "ip": ipAddress,
        "ulid": loginData.ulid,
        "subject":subject,
        "message":message
        });
    
        let axiosConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${config.baseUrl}/api/ticket`,
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
        axios.request(axiosConfig)  
        .then((response) => {
            // console.log(response.data)
            let res = response.data
            if(res.status)
            {
                Swal.fire({
                    icon: 'info',
                        title: 'LinkDao Defi',
                        text: res.message
                });
                setMessage('');
                setSubject('')
            }
        else{
            Swal.fire({
                icon: 'warning',
                    title: 'LinkDao Defi',
                    text: res.message
            });
        }
        })
        .catch((error) => {
        console.log(error);
        });
    }
    else
    {
        Swal.fire({
            icon: 'warning',
                title: 'LinkDao Defi',
                text: "Please enter subject and message"
        });
    }
  }
    
    return (
        <>
                <div className="layout-container">
                    <Menu />
                    <div className="layout-page">
                        <Header />
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y pt-2">
                                
                                <div className="row">
                                    <div className='col-md-12'>
                                        <div className="card mb-4">
                                        <h6 className="card-header">New Support Ticket</h6>
                                        <div className="card-body">
                                            <form
                                            onSubmit={handleTicket}
                                            className="fv-plugins-bootstrap5 fv-plugins-framework"
                                            >
                                            <div className="row">
                                                
                                                <div className="mb-3 col-sm-6 fv-plugins-icon-container">
                                                <label htmlFor="billingEmail" className="form-label">
                                                    Subject
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="subject"
                                                    name="subject"
                                                    placeholder="Enter Subject"
                                                    value={subject}
                                                    onChange={(e) =>setSubject(e.target.value)}
                                                />
                                                <div className="fv-plugins-message-container invalid-feedback" />
                                                </div>
                                                <div className="mb-3 col-sm-12">
                                                <label htmlFor="taxId" className="form-label">
                                                    Message
                                                </label>
                                                <textarea
                                                    id="taxId"
                                                    name="taxId"
                                                    className="form-control"
                                                    placeholder="Enter Message"
                                                    onChange={(e) =>setMessage(e.target.value)}
                                                    value={message}
                                                />
                                                </div>
                                            </div>
                                            <div className="mt-2 col-sm-12 text-center">
                                                <button type="submit" className="btn btn-info btn-sm me-2">
                                                    Process Ticket
                                                </button>
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
