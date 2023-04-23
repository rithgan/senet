import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

export default function Business() {
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
                                                        <p className="card-text">Downline</p>
                                                        <div className="d-flex align-items-end mb-2">
                                                            <h4 className="card-title mb-0 me-2">58,352</h4>
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
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Business</p>
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
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Top Leg</p>
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
                                    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between">
                                                    <div className="card-info">
                                                        <p className="card-text">Other Leg</p>
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
                                </div>
                                <div className="row">
                                    <div className="card">
                                        <h5 className="card-header">Business Leg</h5>
                                        <div className="card-datatable table-responsive">
                                            <table className="datatable table border-top ">
                                                <thead>
                                                    <tr>
                                                        <th>LEG</th>
                                                        <th>BUSINESS (USD)</th>
                                                        <th>NAME</th>
                                                        <th>ID</th>
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
