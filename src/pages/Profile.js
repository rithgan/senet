import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

export default function Profile() {
    return (
        <>
            <div class="layout-wrapper layout-content-navbar  ">
                <div class="layout-container">
                    <Menu />
                    <div class="layout-page">
                        <Header />
                        <div class="content-wrapper">
                            <div class="container-xxl flex-grow-1 container-p-y">
                                <div className="row">
                                    <div className="card mb-4">
                                        <h5 className="card-header">Your Profile</h5>
                                        <div className="card-body">
                                            <form id="formAccountSettings" onsubmit="return false" className="fv-plugins-bootstrap5 fv-plugins-framework" noValidate="novalidate">
                                                <div className="row">
                                                    <div className="mb-3 col-sm-6 fv-plugins-icon-container">
                                                        <label htmlFor="companyName" className="form-label">Full Name</label>
                                                        <input type="text" id="companyName" name="companyName" className="form-control" placeholder="ThemeSelection" />
                                                        <div className="fv-plugins-message-container invalid-feedback" />
                                                    </div>
                                                    <div className="mb-3 col-sm-6 fv-plugins-icon-container">
                                                        <label htmlFor="billingEmail" className="form-label">Email</label>
                                                        <input className="form-control" type="text" id="email" name="email" placeholder="john.doe@example.com" />
                                                        <div className="fv-plugins-message-container invalid-feedback" />
                                                    </div>
                                                    <div className="mb-3 col-sm-6">
                                                        <label htmlFor="taxId" className="form-label">Contact Number</label>
                                                        <input type="text" id="taxId" name="taxId" className="form-control" placeholder="Contact Number" />
                                                    </div>
                                                    <div className="mb-3 col-sm-6">
                                                        <label htmlFor="state" className="form-label">Address</label>
                                                        <input className="form-control" type="text" id="state" name="state" placeholder="Address" readOnly />
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
                <div class="layout-overlay layout-menu-toggle"></div>
                <div class="drag-target"></div>
            </div>
        </>
    );
}
