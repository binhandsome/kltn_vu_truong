const MyProfile = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                <h4 className="page-title">User Profile</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Dashboard</a>
                                    </li>
                                    <li className="breadcrumb-link active">User Profile</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Products view Start --> */}
				<div className="row">
                <div className="col-xl-4">
                  <div className="card"><grammarly-extension data-grammarly-shadow-root="true" style={{ position: 'absolute', top: '0px', left: '0px', pointerEvents: 'none' }} className="cGcvT"></grammarly-extension>
                    <div className="card-header">
                      <h4 className="card-title mb-0">My Profile</h4>
                      <div className="card-options"><a className="card-options-collapse" href="javascript:;" data-bs-toggle="card-collapse" data-bs-original-title="" title=""><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript:;" data-bs-toggle="card-remove" data-bs-original-title="" title=""><i className="fe fe-x"></i></a></div>
                    </div>
                    <div className="card-body">
                      <form>
						<div className="profile-title">
							<div className="media ad-profile2-img">                        
								<img alt="" src="assets/images/user.jpg"/>
							  <div className="media-body">
								<h5 className="mb-1">MARK JECNO</h5>
								<p>DESIGNER</p>
							  </div>
							</div>
						</div>
                        <div className="mb-3">
                          <label className="form-label">Bio</label>
                          <textarea className="form-control" rows="5" spellcheck="false">On the other hand, we denounce with righteous indignation</textarea>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email-Address</label>
                          <input className="form-control" placeholder="your-email@domain.com" data-bs-original-title="" title=""/>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <input className="form-control" type="password" value="password" data-bs-original-title="" title=""/>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Website</label>
                          <input className="form-control" placeholder="http://Uplor .com" data-bs-original-title="" title=""/>
                        </div>
                        <div className="form-footer">
                          <button className="btn btn-primary squer-btn" data-bs-original-title="" title="">Save</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8">
                  <form className="card">
                    <div className="card-header">
                      <h4 className="card-title mb-0">Edit Profile</h4>
                      <div className="card-options"><a className="card-options-collapse" href="javascript:;" data-bs-toggle="card-collapse" data-bs-original-title="" title=""><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript:;" data-bs-toggle="card-remove" data-bs-original-title="" title=""><i className="fe fe-x"></i></a></div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="mb-3">
                            <label className="form-label">Company</label>
                            <input className="form-control" type="text" placeholder="Company" data-bs-original-title="" title=""/>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                          <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input className="form-control" type="text" placeholder="Username" data-bs-original-title="" title=""/>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                          <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input className="form-control" type="email" placeholder="Email" data-bs-original-title="" title=""/>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input className="form-control" type="text" placeholder="Company" data-bs-original-title="" title=""/>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input className="form-control" type="text" placeholder="Last Name" data-bs-original-title="" title=""/>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input className="form-control" type="text" placeholder="Home Address" data-bs-original-title="" title=""/>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                          <div className="mb-3">
                            <label className="form-label">City</label>
                            <input className="form-control" type="text" placeholder="City" data-bs-original-title="" title=""/>
                          </div>
                        </div>
                        <div className="col-sm-6 col-md-3">
                          <div className="mb-3">
                            <label className="form-label">Postal Code</label>
                            <input className="form-control" type="number" placeholder="ZIP Code" data-bs-original-title="" title=""/>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="mb-3 form-select-btn">
                            <label className="form-label">Country</label>
                            <select className="form-control btn-square form-btn">
                              <option value="0">--Select--</option>
                              <option value="1">Germany</option>
                              <option value="2">Canada</option>
                              <option value="3">Usa</option>
                              <option value="4">Aus</option>
                            </select>
                            <span className="sel_arrow">
                                <i className="fa fa-angle-down "></i>
                            </span>
                          </div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <div>
                            <label className="form-label">About Me</label>
                            <textarea className="form-control" rows="5" placeholder="Enter Your Description"></textarea>
                          </div>
                        </div>
                      </div>
					  <button className="btn btn-primary squer-btn" type="submit" data-bs-original-title="" title="">Update Profile</button>
                    </div>
                  </form>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
					<div className="card table-card">
						<div className="card-header pb-0">
							<h4>Add projects And Upload</h4>
						</div>
						<div className="card-body">
							<div className="chart-holder">
								<div className="table-responsive">
									<table className="table table-styled mb-0">
										<thead>
											<tr>
												<th>Project Name</th>
												<th>Date</th>
												<th>Status</th>
												<th>Price</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Ai Traific</td>
												<td>28 May 2022</td>
												<td>Completed</td>
												<td>$22,124</td>
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
												<td>Ai Traific</td>
												<td>28 May 2022</td>
												<td>Completed</td>
												<td>$22,124</td>
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
												<td>Ai Traific</td>
												<td>28 May 2022</td>
												<td>Completed</td>
												<td>$22,124</td>
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
												<td>Ai Traific</td>
												<td>28 May 2022</td>
												<td>Completed</td>
												<td>$22,124</td>
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
							<div className="text-right mt-2">
								<nav className="d-inline-block">
									<ul className="pagination mb-0">
									  <li className="page-item disabled">
										<a className="page-link" href="javascript:void(0);" tabindex="-1"><i className="fas fa-chevron-left"></i></a>
									  </li>
									  <li className="page-item active"><a className="page-link" href="javascript:void(0);">1</a></li>
									  <li className="page-item">
										<a className="page-link" href="javascript:void(0);">2</a>
									  </li>
									  <li className="page-item"><a className="page-link" href="javascript:void(0);">3</a></li>
									  <li className="page-item">
										<a className="page-link" href="javascript:void(0);"><i className="fas fa-chevron-right"></i></a>
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
  
  export default MyProfile;