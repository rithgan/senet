import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

export default function Request() {
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
                                        <h5 className="card-header">Withdrawl Request</h5>
                                        <div className="card-body">
                                            <form id="formAccountSettings" onsubmit="return false" className="fv-plugins-bootstrap5 fv-plugins-framework" noValidate="novalidate">
                                                <div className="row">
                                                    <div className="mb-3 col-sm-4 fv-plugins-icon-container">
                                                        <label htmlFor="companyName" className="form-label"> Wallet Address</label>
                                                        <input type="text" id="companyName" name="companyName" className="form-control" placeholder="ThemeSelection" readOnly />
                                                    </div>
                                                    <div className="mb-3 col-sm-4 fv-plugins-icon-container">
                                                        <label htmlFor="billingEmail" className="form-label">Email</label>
                                                        <input className="form-control" type="text" id="email" name="email" placeholder="john.doe@example.com" readOnly />
                                                        <div className="fv-plugins-message-container invalid-feedback" />
                                                    </div>
                                                    <div className="mb-3 col-sm-4">
                                                        <label htmlFor="taxId" className="form-label">Contact Number</label>
                                                        <input type="text" id="taxId" name="taxId" className="form-control" placeholder="Contact Number" readOnly />
                                                    </div>
                                                    <div className="mb-3 col-sm-4">
                                                        <label htmlFor="state" className="form-label">Live LKD</label>
                                                        <input className="form-control" type="text" id="state" name="state" placeholder="Price" readOnly />
                                                    </div>
                                                    <div className="mb-3 col-sm-4">
                                                        <label htmlFor="state" className="form-label">Amount ( Min 10 USD)</label>
                                                        <input className="form-control" type="text" id="state" name="state" placeholder="amount" />
                                                    </div>
                                                    <div className="mb-3 col-sm-4">
                                                        <label htmlFor="state" className="form-label">Recived LKD</label>
                                                        <input className="form-control" type="text" id="state" name="state" placeholder="amount" readOnly />
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-center">
                                                    <button type="submit" className="btn btn-primary me-2">Process Request</button>
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
