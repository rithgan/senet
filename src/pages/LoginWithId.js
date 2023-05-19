import React,{useState} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import '../css/sweetalert-dark-theme.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { checkStakeInfo } from '../utils';
const config = require('../config.json')

export default function LoginWithId({ipAddress,onLogin}) {
    const [splid, setSplid] = useState('')
    const history = useHistory();
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            // let address = account, ip = ipAddress
            // connectWallet()
            // console.log(address, ip, history)
            login();
        } catch (err) {
            // console.log(err?.message)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err?.message
            })
        }
    }
    const login = async () => {
        let lid = splid, ip = ipAddress
        let data = JSON.stringify({
            "lid": lid,
            "ip": ip
        });
        let axiosConfig = {
            method: 'post',
            url: `${config.baseUrl}/api/withid`,
            headers: {
                'lid': lid,
                'ip': ip,
                'Content-Type': 'application/json'
            },
            data: data
        };
        let response = await axios.request(axiosConfig)
        response = response.data
        if (response.status) {
            let loginData = response.data
            // console.log(loginData)
            setLoginData(loginData)
            onLogin(response.data)
            let res = checkStakeInfo(ipAddress,loginData)
            if (res===true){
                history.push('/dash');
            }else{
                history.push('/stake');
            }
            // console.log('going to dash')
        }
        else if (response.code === 30) {
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: response?.message
            }).then(() => {
                history.push('/register');
            })
        }
    };
    function setLoginData(loginData) {
        localStorage.setItem('loginData', JSON.stringify(loginData));
    }
    return (
        <div className="container-xxl">
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner py-4">
                    {/* Forgot Password */}
                    <div className="card">
                        <div className="card-body">
                            {/* Logo */}
                            <div className="app-brand justify-content-center">
                                {/* go back to login pages */}
                                <Link to="/" className="app-brand-link gap-2">
                                    <span className="app-brand-logo demo">
                                        <img src="assets/ficon.svg" style={{ height: '40px', width: 'auto' }} alt="ficon" />
                                    </span>
                                    <span className="app-brand-text demo text-body fw-bolder" style={{textTransform : "initial"}}>Link<span className='text-info'>Dao</span></span>
                                </Link>
                            </div>
                            {/* /Logo */}
                            <h4 className="mb-2">Login</h4>
                            <p className="mb-4">Explore the multiple possibilites with our unique Eco-System</p>
                            {/* Connect with lkd form and action, go to dash.php */}
                            <form id="formAuthentication" className="mb-3" onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">USER ID</label>
                                    <input type="text" className="form-control" id="splid" name="splid" placeholder="Enter User ID" value={splid} onChange={(e) => setSplid(e.target.value)}/>
                                </div>
                                <button className="btn btn-primary d-grid w-100">Login</button>
                            </form>
                            <div className="text-center">
                                {/* go back to login php */}
                                <Link to="/" className="d-flex align-items-center justify-content-center">
                                    <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm" />
                                    Back to User login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}