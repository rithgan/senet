import React from 'react'

export default function Header() {
    return (
        <>
            <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0   d-xl-none ">
                    <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                        <i className="bx bx-menu bx-sm" />
                    </a>
                </div>
                <div className="navbar-nav align-items-center">
                    <div className="nav-item navbar-search-wrapper mb-0">
                        <a className="nav-item nav-link search-toggler px-0" href="javascript:void(0);">
                            <span className="d-none d-md-inline-block text-info">Live Price LKD/USD : </span>
                        </a>
                    </div>
                </div>
                <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        {/* Style Switcher */}
                        <li className="nav-item me-2 me-xl-0">
                            <a className="nav-link style-switcher-toggle hide-arrow" href="javascript:void(0);">
                                <i className="bx bx-sm" />
                            </a>
                        </li>
                        {/*/ Style Switcher */}
                        {/* Quick links  */}
                        <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0">
                            <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                <i className="bx bx-grid-alt bx-sm" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-end py-0">
                                <div className="dropdown-menu-header border-bottom">
                                    <div className="dropdown-header d-flex align-items-center py-3">
                                        <h5 className="text-body mb-0 me-auto">Shortcuts</h5>
                                    </div>
                                </div>
                                <div className="dropdown-shortcuts-list scrollable-container">
                                    <div className="row row-bordered overflow-visible g-0">
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                <i className="bx bx-calendar fs-4" />
                                            </span>
                                            <a href="#" className="stretched-link">Calendar</a>
                                            <small className="text-muted mb-0">Appointments</small>
                                        </div>
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                <i className="bx bx-food-menu fs-4" />
                                            </span>
                                            <a href="#" className="stretched-link">Invoice App</a>
                                            <small className="text-muted mb-0">Manage Accounts</small>
                                        </div>
                                    </div>
                                    <div className="row row-bordered overflow-visible g-0">
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                <i className="bx bx-user fs-4" />
                                            </span>
                                            <a href="app-user-list.html" className="stretched-link">User App</a>
                                            <small className="text-muted mb-0">Manage Users</small>
                                        </div>
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                <i className="bx bx-check-shield fs-4" />
                                            </span>
                                            <a href="app-access-roles.html" className="stretched-link">Role Management</a>
                                            <small className="text-muted mb-0">Permission</small>
                                        </div>
                                    </div>
                                    <div className="row row-bordered overflow-visible g-0">
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                <i className="bx bx-pie-chart-alt-2 fs-4" />
                                            </span>
                                            <a href="index.html" className="stretched-link">Dashboard</a>
                                            <small className="text-muted mb-0">User Profile</small>
                                        </div>
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                <i className="bx bx-cog fs-4" />
                                            </span>
                                            <a href="pages-account-settings-account.html" className="stretched-link">Setting</a>
                                            <small className="text-muted mb-0">Account Settings</small>
                                        </div>
                                    </div>
                                    <div className="row row-bordered overflow-visible g-0">
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                <i className="bx bx-help-circle fs-4" />
                                            </span>
                                            <a href="pages-help-center-landing.html" className="stretched-link">Help Center</a>
                                            <small className="text-muted mb-0">FAQs &amp; Articles</small>
                                        </div>
                                        <div className="dropdown-shortcuts-item col">
                                            <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                                                <i className="bx bx-window-open fs-4" />
                                            </span>
                                            <a href="modal-examples.html" className="stretched-link">Modals</a>
                                            <small className="text-muted mb-0">Useful Popups</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item me-2 me-xl-0">
                            <a href="javascript:void(0)" className="btn btn-info text-nowrap">
                                <i className="bx bx-user-check me-1" />Connected
                            </a>
                        </li>
                        {/* <li class="nav-item navbar-dropdown dropdown-user dropdown">
							    <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
							      <div class="avatar avatar-online">
							        <img src="assets/img/avatars/1.png" alt class="w-px-40 h-auto rounded-circle">
							      </div>
							    </a>
							    <ul class="dropdown-menu dropdown-menu-end">
							      <li>
							        <a class="dropdown-item" href="login.php" target="_blank">
							          <i class="bx bx-power-off me-2"></i>
							          <span class="align-middle">Log Out</span>
							        </a>
							      </li>
							    </ul>
							  </li> */}
                    </ul>
                </div>
            </nav>
        </>
    )
}
