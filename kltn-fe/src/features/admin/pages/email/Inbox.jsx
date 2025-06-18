const Inbox = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
								{/* Inbox */}
                                <h4 className="page-title">Hộp thư đến</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
										{/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                                    </li>
									{/* Inbox */}
                                    <li className="breadcrumb-link active">Hộp thư đến</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Products view Start --> */}
              
					<div className="row">
						<div className="col-lg-3 col-md-4">
							<div className="card card-body">
								<div className="compose-btn">
									<a href="javascript:;" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-target="#composemodal">
										{/* Compose */}
										Soạn
									</a>
								</div>
								<ul className="inbox-menu">
									<li className="active">
										{/* Inbox */}
										<a href="javascript:;"><i className="fas fa-download"></i>Hộp thư đến <span className="mail-count">(5)</span></a>
									</li>
									<li>
										{/* Important */}
										<a href="javascript:;"><i className="far fa-star"></i> Quan trọng</a>
									</li>
									<li>
										{/* Sent Mail */}
										<a href="javascript:;"><i className="far fa-paper-plane"></i> Thư đã gửi</a>
									</li>
									<li>
										{/* Drafts */}
										<a href="javascript:;"><i className="far fa-file-alt"></i> Bản nháp <span className="mail-count">(13)</span></a>
									</li>
									<li>
										{/* Trash */}
										<a href="javascript:;"><i className="far fa-trash-alt"></i> Rác</a>
									</li>
								</ul>
							</div>
						</div>
						
						<div className="col-lg-9 col-md-8">
							<div className="card">
								<div className="card-body pb-0">
									<div className="email-header">
										<div className="row">
											<div className="col top-action-left">
												<div className="float-left">
													<div className="btn-group dropdown-action">
														{/* Select */}
														<button type="button" className="btn btn-primary squer-btn dropdown-toggle" data-bs-toggle="dropdown">Lựa chọn</button>
														<div className="dropdown-menu">
															{/* All */}
															<a className="dropdown-item" href="javascript:;">Tất cả</a>
															{/* None */}
															<a className="dropdown-item" href="javascript:;">Không có</a>
															<div className="dropdown-divider"></div> 
															{/* Read */}
															<a className="dropdown-item" href="javascript:;">Đọc</a>
															{/* Unread */}
															<a className="dropdown-item" href="javascript:;">Chưa đọc</a>
														</div>
													</div>
													<div className="btn-group dropdown-action">
														{/* Actions */}
														<button type="button" className="btn btn-primary squer-btn dropdown-toggle" data-bs-toggle="dropdown">Hành động</button>
														<div className="dropdown-menu">
															{/* Reply */}
															<a className="dropdown-item" href="javascript:;">Hồi đáp</a>
															{/* Forward */}
															<a className="dropdown-item" href="javascript:;">Phía trước</a>
															{/* Archive */}
															<a className="dropdown-item" href="javascript:;">Lưu trữ</a>
															<div className="dropdown-divider"></div> 
															{/* Mark As Read */}
															<a className="dropdown-item" href="javascript:;">Đánh dấu là đã đọc</a>
															{/* Mark As Unread */}
															<a className="dropdown-item" href="javascript:;">Đánh dấu là chưa đọc</a>
															<div className="dropdown-divider"></div> 
															{/* Delete */}
															<a className="dropdown-item" href="javascript:;">Xóa bỏ</a>
														</div>
													</div>
													<div className="btn-group dropdown-action mail-search">
														{/* Search Messages */}
														<input type="text" placeholder="Tìm kiếm tin nhắn" className="form-control search-message"/>
													</div>
												</div>
											</div>
											<div className="col-auto top-action-right">
												<div className="ad-inbox-list">
													<div className="text-right">
														<button type="button" title="" data-bs-toggle="tooltip" className="btn btn-primary squer-btn d-md-inline-block" data-original-title="Refresh"><i className="fas fa-sync-alt"></i></button>
														<div className="btn-group">
															<a className="btn btn-white"><i className="fas fa-angle-left"></i></a>
															<a className="btn btn-white"><i className="fas fa-angle-right"></i></a>
														</div>
													</div>
													<div className="text-right">
														{/* Showing 10 of 112 */}
														<span className="text-muted d-md-inline-block">Hiển thị 10 trong số 112 </span>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="email-content">
										<div className="table-responsive">
											<table className="table table-inbox table-hover">
												
												<tbody>
													<tr className="unread clickable-row">
														<td>
															<div className="checkbox checkbox-inbox">
																<input id="checkbox1" type="checkbox"/>
																<label for="checkbox1"></label>
															</div>
														</td>
														<td><span className="mail-important"><i className="fas fa-star starred"></i></span></td>
														<td className="name">John Doe</td>
														<td className="subject">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</td>
														<td><i className="fas fa-paperclip"></i></td>
														<td className="mail-date">13:14</td>
													</tr>
													<tr className="unread clickable-row">
														<td>
														<div className="checkbox checkbox-inbox">
															<input id="checkbox2" type="checkbox"/>
															<label for="checkbox2"></label>
														</div>
													</td>
														<td><span className="mail-important"><i className="far fa-star"></i></span></td>
														<td className="name">Envato Account</td>
														<td className="subject">Important account security update from Envato</td>
														<td></td>
														<td className="mail-date">8:42</td>
													</tr>
													<tr className="clickable-row">
														<td>
														<div className="checkbox checkbox-inbox">
															<input id="checkbox3" type="checkbox"/>
															<label for="checkbox3"></label>
														</div>
													</td>
														<td><span className="mail-important"><i className="far fa-star"></i></span></td>
														<td className="name">Twitter</td>
														<td className="subject">HRMS Bootstrap Admin Template</td>
														<td></td>
														<td className="mail-date">30 Tháng 11</td>
													</tr>
													<tr className="unread clickable-row">
														<td>
														<div className="checkbox checkbox-inbox">
															<input id="checkbox4" type="checkbox"/>
															<label for="checkbox4"></label>
														</div>
													</td>
														<td><span className="mail-important"><i className="far fa-star"></i></span></td>
														<td className="name">Richard Parker</td>
														<td className="subject">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</td>
														<td></td>
														<td className="mail-date">18 Sep</td>
													</tr>
													<tr className="clickable-row">
														<td>
														<div className="checkbox checkbox-inbox">
															<input id="checkbox5" type="checkbox"/>
															<label for="checkbox5"></label>
														</div>
													</td>
														<td><span className="mail-important"><i className="far fa-star"></i></span></td>
														<td className="name">John Smith</td>
														<td className="subject">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</td>
														<td></td>
														<td className="mail-date">21 Aug</td>
													</tr>
													<tr className="clickable-row">
														<td>
															<div className="checkbox checkbox-inbox">
																<input id="checkbox6" type="checkbox"/>
																<label for="checkbox6"></label>
															</div>
														</td>
														<td><span className="mail-important"><i className="far fa-star"></i></span></td>
														<td className="name">me, Robert Smith (3)</td>
														<td className="subject">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</td>
														<td></td>
														<td className="mail-date">1 Aug</td>
													</tr>
													<tr className="unread clickable-row">
														<td>
															<div className="checkbox checkbox-inbox">
																<input id="checkbox7" type="checkbox"/>
																<label for="checkbox7"></label>
															</div>
														</td>
														<td><span className="mail-important"><i className="far fa-star"></i></span></td>
														<td className="name">Codecanyon</td>
														<td className="subject">Welcome To Codecanyon</td>
														<td></td>
														<td className="mail-date">Jul 13</td>
													</tr>
													<tr className="clickable-row">
														<td>
															<div className="checkbox checkbox-inbox">
																<input id="checkbox8" type="checkbox"/>
																<label for="checkbox8"></label>
															</div>
														</td>
														<td><span className="mail-important"><i className="far fa-star"></i></span></td>
														<td className="name">Richard Miles</td>
														<td className="subject">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</td>
														<td><i className="fas fa-paperclip"></i></td>
														<td className="mail-date">May 14</td>
													</tr>
													<tr className="unread clickable-row">
														<td>
															<div className="checkbox checkbox-inbox">
																<input id="checkbox9" type="checkbox"/>
																<label for="checkbox9"></label>
															</div>
														</td>
														<td><span className="mail-important"><i className="far fa-star"></i></span></td>
														<td className="name">John Smith</td>
														<td className="subject">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</td>
														<td></td>
														<td className="mail-date">11/11/16</td>
													</tr>
													<tr className="clickable-row">
														<td>
															<div className="checkbox checkbox-inbox">
																<input id="checkbox10" type="checkbox"/>
																<label for="checkbox10"></label>
															</div>
														</td>
														<td><span className="mail-important"><i className="fas fa-star starred"></i></span></td>
														<td className="name">Mike Litorus</td>
														<td className="subject">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</td>
														<td></td>
														<td className="mail-date">10/31/16</td>
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
  
  export default Inbox;