const Order = () => (
    <div className="main-content">
    {/* <!-- Page Title Start --> */}
    <div className="row">
        <div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="page-title-wrapper">
                <div className="page-title-box ad-title-box-use">
                    <h4 className="page-title">Orders</h4>
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
                                <a className="ad-btn">Add New Order</a>
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
                    <h4>Orders List</h4>
                </div>
                <div className="card-body">
                    <div className="chart-holder">
                        <div className="table-responsive">
                            <table className="table table-styled mb-0">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="checkbox">
                                                <input id="checkbox1" type="checkbox"/>
                                                <label for="checkbox1"></label>
                                            </div>
                                        </th>
                                        <th>Order ID</th>
                                        <th>Billing Name</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Payment Status</th>
                                        <th>Payment Method</th>
                                        <th>View Details</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="checkbox">
                                                <input id="checkbox2" type="checkbox"/>
                                                <label for="checkbox2"></label>
                                            </div>
                                        </td>
                                        <td>#JH2033</td>
                                        <td>
                                            <span className="img-thumb ">
                                                <img src="../../assets/admin/images/table/1.jpg" alt=" "/>
                                                <span className="ml-2 ">Emily Arnold</span>
                                            </span>
                                        </td>
                                        <td>22/06/2022</td>
                                        <td>$600</td>
                                        <td>
                                            <label className="mb-0 badge badge-primary" title="" data-original-title="Pending">Pending</label>
                                        </td>
                                        <td>
                                            <span className="img-thumb">
                                                <i className="fab fa-cc-paypal"></i>
                                                <span className="ml-2">Paypal</span>
                                            </span>
                                        </td>
                                        <td>
                                            <label className="mb-0 badge badge-primary" title="" data-original-title="Pending">View Detail</label>
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
                                        <td>
                                            <div className="checkbox">
                                                <input id="checkbox3" type="checkbox"/>
                                                <label for="checkbox3"></label>
                                            </div>
                                        </td>
                                        <td>#MK4433</td>
                                        <td>
                                            <span className="img-thumb ">
                                                <img src="../../assets/admin/images/table/4.jpg" alt=" "/>
                                                <span className="ml-2 ">Mark Doe</span>
                                            </span>
                                        </td>
                                        <td>14/07/2022</td>
                                        <td>$700</td>
                                        <td>
                                            <label className="mb-0 badge badge-success" title="" data-original-title="Pending">Success</label>
                                        </td>
                                        <td>
                                            <span className="img-thumb">
                                                <i className="fab fa-cc-visa"></i>
                                                <span className="ml-2">Visa</span>
                                            </span>
                                        </td>
                                        <td>
                                            <label className="mb-0 badge badge-primary" title="" data-original-title="Pending">View Detail</label>
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
                                        <td>
                                            <div className="checkbox">
                                                <input id="checkbox4" type="checkbox"/>
                                                <label for="checkbox4"></label>
                                            </div>
                                        </td>
                                        <td>#MD4578</td>
                                        <td>
                                            <span className="img-thumb">
                                                <img src="../../assets/admin/images/table/7.jpg" alt=" "/>
                                                <span className="ml-2 ">Mark Smith</span>
                                            </span>
                                        </td>
                                        <td>28/08/2022</td>
                                        <td>$800</td>
                                        <td>
                                            <label className="mb-0 badge badge-danger" title="" data-original-title="Pending">Cancel</label>
                                        </td>
                                        <td>
                                            <span className="img-thumb">
                                                <i className="fas fa-credit-card"></i>
                                                <span className="ml-2">Credit Card</span>
                                            </span>
                                        </td>
                                        <td>
                                            <label className="mb-0 badge badge-primary" title="" data-original-title="Pending">View Detail</label>
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
                                        <td>
                                            <div className="checkbox">
                                                <input id="checkbox5" type="checkbox"/>
                                                <label for="checkbox5"></label>
                                            </div>
                                        </td>
                                        <td>#DD1048</td>
                                        <td>
                                            <span className="img-thumb ">
                                                <img src="../../assets/admin/images/table/1.jpg" alt=" "/>
                                                <span className="ml-2 ">Mike Wood</span>
                                            </span>
                                        </td>
                                        <td>13/04/2022</td>
                                        <td>$880</td>
                                        <td>
                                            <label className="mb-0 badge badge-primary" title="" data-original-title="Pending">Pending</label>
                                        </td>
                                        <td>
                                            <span className="img-thumb">
                                                <i className="fab fa-cc-mastercard"></i>
                                                <span className="ml-2">Mastercard</span>
                                            </span>
                                        </td>
                                        <td>
                                            <label className="mb-0 badge badge-primary" title="" data-original-title="Pending">View Detail</label>
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
                                        <td>
                                            <div className="checkbox">
                                                <input id="checkbox6" type="checkbox"/>
                                                <label for="checkbox6"></label>
                                            </div>
                                        </td>
                                        <td>#JH2033</td>
                                        <td>
                                            <span className="img-thumb ">
                                                <img src="../../assets/admin/images/table/3.jpg" alt=" "/>
                                                <span className="ml-2 ">Emily Arnold</span>
                                            </span>
                                        </td>
                                        <td>22/06/2022</td>
                                        <td>$600</td>
                                        <td>
                                            <label className="mb-0 badge badge-success" title="" data-original-title="Pending">Success</label>
                                        </td>
                                        <td>
                                            <span className="img-thumb">
                                                <i className="fab fa-cc-paypal"></i>
                                                <span className="ml-2">Paypal</span>
                                            </span>
                                        </td>
                                        <td>
                                            <label className="mb-0 badge badge-primary" title="" data-original-title="Pending">View Detail</label>
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
                                        <td>
                                            <div className="checkbox">
                                                <input id="checkbox7" type="checkbox"/>
                                                <label for="checkbox7"></label>
                                            </div>
                                        </td>
                                        <td>#MK4433</td>
                                        <td>
                                            <span className="img-thumb ">
                                                <img src="../../assets/admin/images/table/1.jpg" alt=" "/>
                                                <span className="ml-2 ">John Doe</span>
                                            </span>
                                        </td>
                                        <td>14/07/2022</td>
                                        <td>$700</td>
                                        <td>
                                            <label className="mb-0 badge badge-danger" title="" data-original-title="Pending">Cancel</label>
                                        </td>
                                        <td>
                                            <span className="img-thumb">
                                                <i className="fab fa-cc-visa"></i>
                                                <span className="ml-2">Visa</span>
                                            </span>
                                        </td>
                                        <td>
                                            <label className="mb-0 badge badge-primary" title="" data-original-title="Pending">View Detail</label>
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
                                        <td>
                                            <div className="checkbox">
                                                <input id="checkbox8" type="checkbox"/>
                                                <label for="checkbox8"></label>
                                            </div>
                                        </td>
                                        <td>#MD4578</td>
                                        <td>
                                            <span className="img-thumb ">
                                                <img src="../../assets/admin/images/table/7.jpg" alt=" "/>
                                                <span className="ml-2 ">Mark Smith</span>
                                            </span>
                                        </td>
                                        <td>28/08/2022</td>
                                        <td>$800</td>
                                        <td>
                                            <label className="mb-0 badge badge-success" title="" data-original-title="Pending">Success</label>
                                        </td>
                                        <td>
                                            <span className="img-thumb">
                                                <i className="fas fa-credit-card"></i>
                                                <span className="ml-2">Credit Card</span>
                                            </span>
                                        </td>
                                        <td>
                                            <label className="mb-0 badge badge-primary" title="" data-original-title="Pending">View Detail</label>
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
                                        <td>
                                            <div className="checkbox">
                                                <input id="checkbox9" type="checkbox"/>
                                                <label for="checkbox9"></label>
                                            </div>
                                        </td>
                                        <td>#DD1048</td>
                                        <td>
                                            <span className="img-thumb ">
                                                <img src="../../assets/admin/images/table/4.jpg" alt=" "/>
                                                <span className="ml-2 ">Mike Wood</span>
                                            </span>
                                        </td>
                                        <td>13/04/2022</td>
                                        <td>$880</td>
                                        <td>
                                            <label className="mb-0 badge badge-primary" title="" data-original-title="Pending">Pending</label>
                                        </td>
                                        <td>
                                            <span className="img-thumb">
                                                <i className="fab fa-cc-mastercard"></i>
                                                <span className="ml-2">Mastercard</span>
                                            </span>
                                        </td>
                                        <td>
                                            <label className="mb-0 badge badge-primary" title="" data-original-title="Pending">View Detail</label>
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="text-right pt-2">
                        <nav className="d-inline-block">
                        <ul className="pagination mb-0 ">
                          <li className="page-item disabled">
                            <a className="page-link" href="javascript:void(0);" tabIndex="-1"><i className="fas fa-chevron-left"></i></a>
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
    </div>

    <div className="ad-footer-btm">
        <p>Copyright 2022 © SplashDash All Rights Reserved.</p>
    </div>    
</div> 
  );
  
  export default Order;