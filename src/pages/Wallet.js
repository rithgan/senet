import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

export default function Wallet() {
    return (
        <>
            <div className="layout-wrapper layout-content-navbar  ">
                <div className="layout-container">
                    <Menu />
                    <div className="layout-page">
                        <Header />
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="card-info">
                                                            <p className="card-text">Wallet balance</p>
                                                            <div className="d-flex align-items-end mb-2">
                                                                <h4 className="card-title mb-0 me-2">58,352 USD</h4>
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
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="card-info">
                                                            <p className="card-text">Address LKD Balance</p>
                                                            <div className="d-flex align-items-end mb-2">
                                                                <h4 className="card-title mb-0 me-2">58,352 USD</h4>
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
                                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="card-info">
                                                            <p className="card-text">Live Price</p>
                                                            <div className="d-flex align-items-end mb-2">
                                                                <h4 className="card-title mb-0 me-2">58,352 LKD/USD</h4>
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
                                            <div className="card-header border-0">
                                                <div className="d-flex justify-content-between">
                                                    <h3 className="card-title">Withdrawal History</h3>
                                                    <a href="/request" className="btn  btn-sm rounded-pill btn-info">Add Request</a>
                                                </div>
                                            </div>
                                            <div className="card-datatable table-responsive">
                                                <table className="datatable table border-top ">
                                                    <thead>
                                                        <tr>
                                                        </tr><tr>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">Amount</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">Net Paid</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">Order Date</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">Status</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">Withdrawal Date</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">Details</th>
                                                            <th className="text-uppercase text-primery text-xxs font-weight-bolder">Remarks</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
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
