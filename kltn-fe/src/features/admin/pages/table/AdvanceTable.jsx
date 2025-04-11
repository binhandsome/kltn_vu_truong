const AdvanceTable = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                <h2 className="page-title bold">Advance Table</h2>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Home</a>
                                    </li>
                                    <li className="breadcrumb-link active">Table</li>
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
                                <h4>Styled Table</h4>
                                <p className="card-desc"> Add class <code>.table.table-styled</code></p>
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
                                                    <td>22/06/2020</td>
                                                    <td>
                                                        <label className="mb-0 badge badge-primary toltiped">Pending</label>
                                                    </td>
                                                    <td className="relative ">
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
                                                            <img src="../../assets/admin/images/table/1.jpg" alt=""/>
                                                            <span className="ml-2 ">Emily Arnold</span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="progress">
                                                            <div className="progress-bar bg-secondary col-2" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </td>
                                                    <td>22/06/2020</td>
                                                    <td>
                                                        <label className="mb-0 badge badge-success toltiped">Pending</label>
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
                                                            <img src="../../assets/admin/images/table/1.jpg" alt=""/>
                                                            <span className="ml-2">Amanda Gray</span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="progress">
                                                            <div className="progress-bar bg-info col-6" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </td>
                                                    <td>22/06/2020</td>
                                                    <td>
                                                        <label className="mb-0 badge badge-info toltiped">Pending</label>
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
                                                            <img src="../../assets/admin/images/table/1.jpg" alt=""/>
                                                            <span className="ml-2">John</span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="progress">
                                                            <div className="progress-bar bg-success col-8" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </td>
                                                    <td>22/06/2020</td>
                                                    <td>
                                                        <label className="mb-0 badge badge-muted toltiped">Pending</label>
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
                                                            <img src="../../assets/admin/images/table/1.jpg" alt=""/>
                                                            <span className="ml-2">Sean Wilson</span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="progress">
                                                            <div className="progress-bar bg-warning col-5" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </td>
                                                    <td>22/06/2020</td>
                                                    <td>
                                                        <label className="mb-0 badge badge-danger toltiped">Pending</label>
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
                                                    <td>22/06/2020</td>
                                                    <td>
                                                        <label className="mb-0 badge badge-warning toltiped">Pending</label>
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
                                                            <img src="../../assets/admin/images/table/1.jpg" alt=""/>
                                                            <span className="ml-2">Owen Glover</span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="progress">
                                                            <div className="progress-bar bg-warning col-10" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </td>
                                                    <td>22/06/2020</td>
                                                    <td>
                                                        <label className="mb-0 badge badge-secondary toltiped">Pending</label>
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
                                                    <td>22/06/2020</td>
                                                    <td>
                                                        <label className="mb-0 badge badge-dark toltiped">Pending</label>
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
                                                            <img src="../../assets/admin/images/table/1.jpg" alt=""/>
                                                            <span className="ml-2">Amanda Gray</span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="progress">
                                                            <div className="progress-bar bg-success col-1" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </td>
                                                    <td>22/06/2020</td>
                                                    <td>
                                                        <label className="mb-0 badge badge-white toltiped">Pending</label>
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
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <!-- Advance Table Card--> */}
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                <h4>Advance Table</h4>
                                <p className="card-desc"> Add class <code>.table.advance-table</code></p>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table advance-table mb-0">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Top Products</th>
                                                    <th>Vendors</th>
                                                    <th>Quantity</th>
                                                    <th>Sold </th>
                                                    <th>Stock</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        1
                                                    </td>
                                                    <td>
                                                        <span className="img-thumb">
                                                            <img className="squer-img" src="assets/images/table/pro1.jpg" alt=""/>
                                                            <span className="ml-2">New Balance Arishi Sport</span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="img-thumb mr-1 mb-1"><img src="../../assets/admin/images/table/1.jpg" alt=""/></span>
                                                        <span className="img-thumb mr-1 mb-1"><img src="../../assets/admin/images/table/2.jpg" alt=""/></span>
                                                        <span className="img-thumb"><img src="../../assets/admin/images/table/3.jpg" alt=""/></span>
                                                    </td>
                                                    <td>
                                                        25
                                                        <label className="mb-0 badge icon-badge badge-danger toltiped ml-2" data-original-title="Insufficient Stock "><i className="fas fa-long-arrow-alt-down "></i></label>
                                                    </td>
                                                    <td>469</td>
                                                    <td>
                                                        <label className="mb-0 badge badge-danger toltiped " title="Out Of Stock">Out Of Stock</label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        2
                                                    </td>
                                                    <td>
                                                        <span className="img-thumb ">
                                                            <img className="squer-img " src="assets/images/table/pro1.jpg" alt=" "/>
                                                            <span className="ml-2 ">New Balance Arishi Sport</span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="img-thumb mr-1 mb-1 "><img src="../../assets/admin/images/table/1.jpg" alt=" "/></span>
                                                        <span className="img-thumb mr-1 mb-1 "><img src="../../assets/admin/images/table/4.jpg" alt=" "/></span>
                                                        <span className="img-thumb "><img src="../../assets/admin/images/table/3.jpg" alt=" "/></span>
                                                    </td>
                                                    <td>
                                                        25
                                                        <label className="mb-0 badge icon-badge badge-danger toltiped ml-2 " data-original-title="Insufficient Stock "><i className="fas fa-long-arrow-alt-down "></i></label>
                                                    </td>
                                                    <td>469</td>
                                                    <td>
                                                        <label className="mb-0 badge badge-danger toltiped " title="Out Of Stock ">Out Of Stock</label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        3
                                                    </td>
                                                    <td>
                                                        <span className="img-thumb ">
                                                            <img className="squer-img " src="assets/images/table/pro2.jpg" alt=" "/>
                                                            <span className="ml-2 ">New Balance Arishi Sport</span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="img-thumb mr-1 mb-1 "><img src="../../assets/admin/images/table/2.jpg" alt=" "/></span>
                                                        <span className="img-thumb "><img src="../../assets/admin/images/table/3.jpg" alt=" "/></span>
                                                    </td>
                                                    <td>
                                                        25
                                                        <label className="mb-0 badge icon-badge badge-success toltiped ml-2" data-original-title="Sufficient Stock "><i className="fas fa-long-arrow-alt-up "></i></label>
                                                    </td>
                                                    <td>469</td>
                                                    <td>
                                                        <label className="mb-0 badge badge-success toltiped " title="Available ">Available</label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>
                                                        <span className="img-thumb ">
                                                            <img className="squer-img " src="assets/images/table/pro1.jpg" alt=" "/>
                                                            <span className="ml-2 ">New Balance Arishi Sport</span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="img-thumb mr-1 mb-1 "><img src="../../assets/admin/images/table/1.jpg" alt=" "/></span>
                                                        <span className="img-thumb mr-1 mb-1 "><img src="../../assets/admin/images/table/2.jpg" alt=" "/></span>
                                                        <span className="img-thumb mr-1 mb-1 "><img src="../../assets/admin/images/table/4.jpg" alt=" "/></span>
                                                        <span className="img-thumb "><img src="../../assets/admin/images/table/3.jpg" alt=" "/></span>
                                                    </td>
                                                    <td>
                                                        25
                                                        <label className="mb-0 badge icon-badge badge-danger toltiped ml-2" data-original-title="Insufficient Stock "><i className="fas fa-long-arrow-alt-down "></i></label>
                                                    </td>
                                                    <td>469</td>
                                                    <td>
                                                        <label className="mb-0 badge badge-danger toltiped " title="Out Of Stock ">Out Of Stock</label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td>
                                                        <span className="img-thumb ">
                                                            <img className="squer-img " src="assets/images/table/pro2.jpg" alt=" "/>
                                                            <span className="ml-2 ">New Balance Arishi Sport</span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="img-thumb mr-1 mb-1 "><img src="../../assets/admin/images/table/1.jpg" alt=" "/></span>
                                                        <span className="img-thumb "><img src="../../assets/admin/images/table/2.jpg" alt=" "/></span>
                                                    </td>
                                                    <td>
                                                        25
                                                        <label className="mb-0 badge icon-badge badge-success toltiped ml-2 " data-original-title="Sufficient Stock "><i className="fas fa-long-arrow-alt-up "></i></label>
                                                    </td>
                                                    <td>469</td>
                                                    <td>
                                                        <label className="mb-0 badge badge-success toltiped " title="Available ">Available</label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>6</td>
                                                    <td>
                                                        <span className="img-thumb ">
                                                            <img className="squer-img " src="assets/images/table/pro2.jpg" alt=" "/>
                                                            <span className="ml-2 ">New Balance Arishi Sport</span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="img-thumb mr-1 mb-1 "><img src="../../assets/admin/images/table/2.jpg" alt=" "/></span>
                                                        <span className="img-thumb "><img src="../../assets/admin/images/table/4.jpg" alt=" "/></span>
                                                    </td>
                                                    <td>
                                                        22
                                                        <label className="mb-0 badge icon-badge badge-success toltiped ml-2 " data-original-title="Sufficient Stock "><i className="fas fa-long-arrow-alt-up "></i></label>
                                                    </td>
                                                    <td>469</td>
                                                    <td>
                                                        <label className="mb-0 badge badge-success toltiped " title="Available ">Available</label>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-right pt-0">
                                <nav className="d-inline-block ">
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

                <div className="row ">
                    {/* <!-- Dragable Table Card--> */}
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                        <div className="card table-card ">
                            <div className="card-header pb-0 ">
                                <h4>Dragable Table</h4>
                                <p className="card-desc "> Add class <code>dragable-container</code></p>
                            </div>
                            <div className="card-body ">
                                <div className="chart-holder ">
                                    <div className="table-responsive ">
                                        <table className="table advance-table mb-0 vertically-middle ">
                                            <thead>
                                                <tr>
                                                    <th><i className="fas fa-th "></i></th>
                                                    <th>Top Products</th>
                                                    <th>Vendors</th>
                                                    <th>Quantity</th>
                                                    <th>Sold </th>
                                                </tr>
                                                </thead>
                                                <tbody className="dragable-container ">
                                                    <tr>
                                                        <td>
                                                            <div className="sort-handler ui-sortable-handle ">
                                                                <i className="fas fa-th "></i>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="img-thumb ">
                                                            <img className="squer-img " src="assets/images/table/pro1.jpg" alt=" "/>
                                                            <span className="ml-2 ">Balance Arishi Sport</span>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="img-thumb mr-1 mb-1 "><img src="../../assets/admin/images/table/1.jpg" alt=" "/></span>
                                                            <span className="img-thumb "><img src="../../assets/admin/images/table/3.jpg" alt=" "/></span>
                                                        </td>
                                                        <td>469</td>
                                                        <td>
                                                            <label className="mb-0 badge badge-danger toltiped ">Todo</label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="sort-handler ui-sortable-handle ">
                                                            <i className="fas fa-th "></i>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="img-thumb ">
                                                            <img className="squer-img " src="assets/images/table/pro3.jpg" alt=" "/>
                                                            <span className="ml-2 ">New Balance Arishi Sport</span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="img-thumb mr-1 mb-1 "><img src="../../assets/admin/images/table/2.jpg" alt=" "/></span>
                                                        <span className="img-thumb "><img src="../../assets/admin/images/table/3.jpg" alt=" "/></span>
                                                    </td>
                                                    <td>469</td>
                                                    <td>
                                                        <label className="mb-0 badge badge-danger toltiped ">Todo</label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="sort-handler ui-sortable-handle ">
                                                                <i className="fas fa-th "></i>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="img-thumb ">
                                                            <img className="squer-img " src="assets/images/table/pro2.jpg" alt=" "/>
                                                            <span className="ml-2 ">Arishi Balance Arishi Sport</span>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="img-thumb mr-1 mb-1 "><img src="../../assets/admin/images/table/1.jpg" alt=" "/></span>
                                                        </td>
                                                        <td>469</td>
                                                        <td>
                                                            <label className="mb-0 badge badge-danger toltiped">Todo</label>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				<div className="ad-footer-btm">
					<p>Copyright 2022 © SplashDash All Rights Reserved.</p>
				</div>
            </div>
  );
  
  export default AdvanceTable;