import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

export default function Support() {
    return (
        <>
            <div class="layout-wrapper layout-content-navbar  ">
                <div class="layout-container">
                    <Menu />
                    <div class="layout-page">
                        <Header />
                        <div class="content-wrapper">
                            <div class="container-xxl flex-grow-1 container-p-y">
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
                                                            <a href="javascript:void(0)" className="btn btn-info text-nowrap">
                                                                <i className="bx bx-user-check me-1" />Add New Ticket
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-6 col-md-6">
                                            <div className="card">
                                                <div className="card-header">
                                                    <div className="d-flex align-items-start">
                                                        <div className="d-flex align-items-start">
                                                            <div className="avatar me-3">
                                                                <img src="assets/img/icons/brands/social-label.png" alt="Avatar" className="rounded-circle" />
                                                            </div>
                                                            <div className="me-2">
                                                                <h5 className="mb-1"><a href="javascript:;" className="h5 stretched-link text-info">Support Ticket</a></h5>
                                                                <div className="client-info d-flex align-items-center">
                                                                    <h6 className="mb-0 me-1">Subject:</h6><span>Christian Jimenez</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center flex-wrap">
                                                        <div className="bg-lighter p-2 rounded me-auto mb-3">
                                                            <h6 className="mb-1">Start Date: <span className="text-body fw-normal">14/2/21</span></h6>
                                                            <span>Pending/Solved</span>
                                                        </div>
                                                        <div className="text-end mb-3">
                                                            <h6 className="mb-1">Complition Date: <span className="text-body fw-normal">28/2/22</span></h6>
                                                        </div>
                                                    </div>
                                                    <h6>Message</h6>
                                                    <p className="mb-0">We are Consulting, Software Development and Web Development Services.</p>
                                                </div>
                                                <div className="card-body border-top">
                                                    <h6>Replay</h6>
                                                    <p className="mb-0">We are Consulting, Software Development and Web Development Services.</p>
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
