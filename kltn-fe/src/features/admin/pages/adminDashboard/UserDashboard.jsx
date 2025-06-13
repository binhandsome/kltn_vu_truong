const UserDashboard = () => (
    <div className="main-content">
    {/* <!-- Page Title Start --> */}
    <div className="row">
        <div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="page-title-wrapper">
                <div className="page-title-box ad-title-box-use">
                    <h4 className="page-title">Users</h4>
                </div>
                <div className="ad-breadcrumb">
                    <ul>
                        <li>
                            <div className="ad-user-btn">
                                <input className="form-control" type="text" placeholder="Search Here..." id="text-input"/>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 56.966 56.966">
                                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
                                    s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
                                    c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
                                    s-17-7.626-17-17S14.61,6,23.984,6z"></path>
                                </svg>
                            </div>
                        </li>
                        <li>
                            <div className="add-group" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <a className="ad-btn">Add User</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Table Start --> */}
    <div className="row">
        {/* <!-- Styled Table Card--> */}
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card table-card">
                <div className="card-header pb-0">
                    <h4>User List</h4>
                </div>
                <div className="card-body">
                    <div className="chart-holder">
                        <div className="table-responsive">
                            <table className="table table-styled mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Customer</th>
                                        <th>Progress</th>
                                        <th>Deliver Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <span className="img-thumb">
                                                <img src="../../assets/admin/images/table/1.jpg" alt=""/>
                                                <span className="ml-2">John</span>
                                            </span>
                                        </td>
                                        <td>
                                            <div className="progress">
                                                <div className="progress-bar bg-primary col-3" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                        <td>22/06/2022</td>
                                        <td>
                                            <label className="mb-0 badge badge-primary" title="Pending">Pending</label>
                                        </td>
                                        <td className="relative">
                                            <a className="action-btn " href="javascript:void(0); ">
                                               <svg className="default-size " viewBox="0 0 341.333 341.333 ">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z "></path>
                                                                <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z "></path>
                                                                <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z "></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                            <div className="action-option ">
                                                <ul>
                                                    <li>
                                                        <a href="javascript:void(0); "><i className="far fa-edit mr-2 "></i>Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0); "><i className="far fa-trash-alt mr-2 "></i>Delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>
                                            <span className="img-thumb">
                                                <img src="../../assets/admin/images/table/2.jpg" alt=" "/>
                                                <span className="ml-2 ">Emily Arnold</span>
                                            </span>
                                        </td>
                                        <td>
                                            <div className="progress">
                                                <div className="progress-bar bg-secondary col-2" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                        <td>02/07/2022</td>
                                        <td>
                                            <label className="mb-0 badge badge-success " title="Pending">Success</label>
                                        </td>
                                        <td className="relative">
                                            <a className="action-btn" href="javascript:void(0);">
                                                <svg className="default-size " viewBox="0 0 341.333 341.333 ">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z "></path>
                                                                <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z "></path>
                                                                <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z "></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                            <div className="action-option">
                                                <ul>
                                                    <li>
                                                        <a href="javascript:void(0);"><i className="far fa-edit mr-2"></i>Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);"><i className="far fa-trash-alt mr-2"></i>Delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>
                                            <span className="img-thumb">
                                                <img src="../../assets/admin/images/table/3.jpg" alt=""/>
                                                <span className="ml-2">Amanda Gray</span>
                                            </span>
                                        </td>
                                        <td>
                                            <div className="progress">
                                                <div className="progress-bar bg-info col-6" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                        <td>22/06/2022</td>
                                        <td>
                                            <label className="mb-0 badge badge-info" title="Pending">Checking</label>
                                        </td>
                                        <td className="relative">
                                            <a className="action-btn" href="javascript:void(0);">
                                                <svg className="default-size " viewBox="0 0 341.333 341.333 ">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z "></path>
                                                                <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z "></path>
                                                                <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z "></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                            <div className="action-option">
                                                <ul>
                                                    <li>
                                                        <a href="javascript:void(0);"><i className="far fa-edit mr-2"></i>Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);"><i className="far fa-trash-alt mr-2"></i>Delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>
                                            <span className="img-thumb">
                                                <img src="../../assets/admin/images/table/7.jpg" alt=""/>
                                                <span className="ml-2">John</span>
                                            </span>
                                        </td>
                                        <td>
                                            <div className="progress">
                                                <div className="progress-bar bg-success col-8" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                        <td>14/08/2022</td>
                                        <td>
                                            <label className="mb-0 badge badge-success" title="Pending">Success</label>
                                        </td>
                                        <td className="relative">
                                            <a className="action-btn" href="javascript:void(0);">
                                                <svg className="default-size " viewBox="0 0 341.333 341.333 ">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z "></path>
                                                                <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z "></path>
                                                                <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z "></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                            <div className="action-option">
                                                <ul>
                                                    <li>
                                                        <a href="javascript:void(0);"><i className="far fa-edit mr-2"></i>Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);"><i className="far fa-trash-alt mr-2"></i>Delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>
                                            <span className="img-thumb">
                                                <img src="../../assets/admin/images/table/4.jpg" alt=""/>
                                                <span className="ml-2">Sean Wilson</span>
                                            </span>
                                        </td>
                                        <td>
                                            <div className="progress">
                                                <div className="progress-bar bg-warning col-5" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                        <td>11/12/2022</td>
                                        <td>
                                            <label className="mb-0 badge badge-danger" title="Pending">Cancel</label>
                                        </td>
                                        <td className="relative">
                                            <a className="action-btn" href="javascript:void(0);">
                                                <svg className="default-size " viewBox="0 0 341.333 341.333 ">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z "></path>
                                                                <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z "></path>
                                                                <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z "></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                            <div className="action-option">
                                                <ul>
                                                    <li>
                                                        <a href="javascript:void(0);"><i className="far fa-edit mr-2"></i>Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);"><i className="far fa-trash-alt mr-2"></i>Delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>
                                            <span className="img-thumb">
                                                <img src="../../assets/admin/images/table/1.jpg" alt=""/>
                                                <span className="ml-2">Claire Langdon</span>
                                            </span>
                                        </td>
                                        <td>
                                            <div className="progress">
                                                <div className="progress-bar bg-dark col-9" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                        <td>24/09/2022</td>
                                        <td>
                                            <label className="mb-0 badge badge-warning" title="Pending">Pending</label>
                                        </td>
                                        <td className="relative">
                                            <a className="action-btn" href="javascript:void(0);">
                                                <svg className="default-size " viewBox="0 0 341.333 341.333 ">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z "></path>
                                                                <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z "></path>
                                                                <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z "></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                            <div className="action-option">
                                                <ul>
                                                    <li>
                                                        <a href="javascript:void(0);"><i className="far fa-edit mr-2"></i>Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);"><i className="far fa-trash-alt mr-2"></i>Delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>
                                            <span className="img-thumb">
                                                <img src="../../assets/admin/images/table/7.jpg" alt=""/>
                                                <span className="ml-2">Owen Glover</span>
                                            </span>
                                        </td>
                                        <td>
                                            <div className="progress">
                                                <div className="progress-bar bg-warning col-10" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                        <td>15/07/2022</td>
                                        <td>
                                            <label className="mb-0 badge badge-secondary" title="Pending">Pending</label>
                                        </td>
                                        <td className="relative">
                                            <a className="action-btn" href="javascript:void(0);">
                                                <svg className="default-size " viewBox="0 0 341.333 341.333 ">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z "></path>
                                                                <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z "></path>
                                                                <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z "></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                            <div className="action-option">
                                                <ul>
                                                    <li>
                                                        <a href="javascript:void(0);"><i className="far fa-edit mr-2"></i>Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);"><i className="far fa-trash-alt mr-2"></i>Delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>
                                            <span className="img-thumb">
                                                <img src="../../assets/admin/images/table/1.jpg" alt=""/>
                                                <span className="ml-2">Ava Sutherland</span>
                                            </span>
                                        </td>
                                        <td>
                                            <div className="progress">
                                                <div className="progress-bar bg-secondary col-3" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                        <td>20/08/2022</td>
                                        <td>
                                            <label className="mb-0 badge badge-success" title="Pending">Success</label>
                                        </td>
                                        <td className="relative">
                                            <a className="action-btn" href="javascript:void(0);">
                                                <svg className="default-size " viewBox="0 0 341.333 341.333 ">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z "></path>
                                                                <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z "></path>
                                                                <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z "></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                            <div className="action-option">
                                                <ul>
                                                    <li>
                                                        <a href="javascript:void(0);"><i className="far fa-edit mr-2"></i>Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);"><i className="far fa-trash-alt mr-2"></i>Delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>
                                            <span className="img-thumb">
                                                <img src="../../assets/admin/images/table/2.jpg" alt=""/>
                                                <span className="ml-2">Amanda Gray</span>
                                            </span>
                                        </td>
                                        <td>
                                            <div className="progress">
                                                <div className="progress-bar bg-success col-1" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </td>
                                        <td>22/06/2022</td>
                                        <td>
                                            <label className="mb-0 badge badge-danger" title="Pending">Cancel</label>
                                        </td>
                                        <td className="relative">
                                            <a className="action-btn" href="javascript:void(0);">
                                                <svg className="default-size " viewBox="0 0 341.333 341.333 ">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z "></path>
                                                                <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z "></path>
                                                                <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z "></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </a>
                                            <div className="action-option">
                                                <ul>
                                                    <li>
                                                        <a href="javascript:void(0);"><i className="far fa-edit mr-2"></i>Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);"><i className="far fa-trash-alt mr-2"></i>Delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="text-right">
                        <nav className="d-inline-block">
                            <ul className="pagination mb-0 ">
                              <li className="page-item disabled ">
                                <a className="page-link" href="javascript:void(0);" tabindex="-1"><i className="fas fa-chevron-left"></i></a>
                              </li>
                              <li className="page-item active "><a className="page-link " href="javascript:void(0); ">1</a></li>
                              <li className="page-item ">
                                <a className="page-link " href="javascript:void(0); ">2</a>
                              </li>
                              <li className="page-item "><a className="page-link " href="javascript:void(0); ">3</a></li>
                              <li className="page-item ">
                                <a className="page-link " href="javascript:void(0); "><i className="fas fa-chevron-right "></i></a>
                              </li>
                            </ul>
                      </nav>
                    </div>
                </div>
            </div>
        </div>
        <div className="ad-footer-btm">
            <p>Copyright 2022 © SplashDash All Rights Reserved.</p>
        </div>
    </div>
</div>
  );
  
  export default UserDashboard;