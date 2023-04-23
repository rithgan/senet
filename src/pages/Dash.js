import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

export default function Dash() {
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
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Session</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <h4 className="card-title mb-0 me-2">58,352</h4>
                                                            <small className="text-success">(+29%)</small>
                                                        </div>
                                                        <small>Last Week Analytics</small>
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-primary rounded p-2">
                                                            <i className="bx bx-trending-up bx-sm" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Time On Site</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <h4 className="card-title mb-0 me-2">28m 14s</h4>
                                                            <small className="text-success">(+18%)</small>
                                                        </div>
                                                        <small>Last Week Analytics</small>
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-info rounded p-2">
                                                            <i className="bx bx-time-five bx-sm" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Bounce Rate</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <h4 className="card-title mb-0 me-2">62%</h4>
                                                            <small className="text-danger">(-14%)</small>
                                                        </div>
                                                        <small>Last Week Analytics</small>
                                                    </div>
                                                    <div className="card-icon">
                                                        <span className="badge bg-label-danger rounded p-2">
                                                            <i className="bx bx-pie-chart-alt bx-sm" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Users</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <h4 className="card-title mb-0 me-2">18,472</h4>
                                                            <small className="text-success">(+42%)</small>
                                                        </div>
                                                        <small>Last Week Analytics</small>
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
