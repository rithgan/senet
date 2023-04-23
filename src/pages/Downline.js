import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

export default function Downline() {
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
          <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="card-info">
                    <p className="card-text">Total Registration</p>
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
          <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="card-info">
                    <p className="card-text">Verified</p>
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
          <div className="col-lg-4 col-md-6 col-sm-6 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="card-info">
                    <p className="card-text">Un-Verified</p>
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
        </div>
        <div className="row">
          <div className="card mb-4">
            <h5 className="card-header">Downline Search</h5>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <form className="row g-3">
                    <div className="col-12 col-md-3">
                      <label className="form-label" htmlFor="paymentName">Level</label>
                      <select className="form-control" id="level" name="level">
                        <option>Select Level</option>
                        {/*?php for ($i=1; $i < 21; $i++) 
                	{ 
                		echo "<option*/}$i Level";
                        {'}'}?&gt;
                      </select>
                    </div>
                    <div className="col-6 col-md-3">
                      <label className="form-label" htmlFor="paymentExpiryDate">From Date: Stake Holder</label>
                      <input type="text" id="paymentExpiryDate" className="form-control " placeholder="Date From" />
                    </div>
                    <div className="col-6 col-md-3">
                      <label className="form-label" htmlFor="paymentCvv">Upto Date: Stake Holder</label>
                      <div className="input-group input-group-merge">
                        <input type="text" id="paymentCvv" className="form-control " maxLength={3} placeholder="Date Upto" />
                      </div>
                    </div>
                    <div className="col-6 col-md-3 mt-5 text-center">
                      <button type="submit" className="btn btn-primary me-sm-3 me-1">Search Now</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card">
            <h5 className="card-header">Downline List</h5>
            <div className="card-datatable table-responsive">
              <table className="datatable table border-top ">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Stake(USD)</th>
                    <th>Date Of Registration</th>
                    <th>Status</th>
                    <th>Date Of Activation</th>
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
                <div class="layout-overlay layout-menu-toggle"></div>
                <div class="drag-target"></div>
            </div>
        </>
    );
}
