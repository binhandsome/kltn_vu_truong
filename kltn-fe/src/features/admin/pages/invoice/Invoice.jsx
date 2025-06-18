const Invoice = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
								{/* Invoice */}
                                <h4 className="page-title">Hóa đơn</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
										{/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                                    </li>
									{/* Invoice */}
                                    <li className="breadcrumb-link active">Hóa đơn</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Table Start --> */}
                <div className="row">
                    <div className="col-lg-12">
						<div className="card">
							<div className="card-body">
								<div className="ad-invoice-title">
									<h4>Đơn hàng - 14812</h4>
								</div>
								<hr/>
								<div className="row">
									<div className="col-sm-6">
										{/* Billed To:  */}
										<h5 className="mb-2">Được thanh toán cho:</h5>
										<p>John Smith</p>
										<p>14812 Main</p>
										<p>Sdr. 2c</p>
										<p>Lorem Ipsum, RY 545782</p>
									</div>
									<div className="col-sm-6 text-sm-end">
										{/* Shipped To: */}
										<h5 className="mb-2">Vận chuyển đến:</h5>
										<p>Jenny Mark</p>
										<p>2211 Main</p>
										<p>Sdr. 2B</p>
										<p>Lorem Ipsum, RY 545782</p>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-6 mt-3">
										{/* Payment Method: */}
										<h5 className="mb-2">Phương thức thanh toán:</h5>
										<p>Visa ending **** 1144</p>
										<p>vd@gmail.com</p>
									</div>
									<div className="col-sm-6 mt-3 text-sm-end">
										{/* Order Date: */}
										<h5 className="mb-2">Ngày đặt hàng:</h5>
										<p>22/12/2022</p>
									</div>
								</div>
								<div className="py-2 mt-3 mb-2">
									{/* Order Summary */}
									<h4 className="font-size-15">Tóm tắt đơn hàng</h4>
								</div>
								<div className="table-responsive">
									<table className="table table-styled mb-0">
										<thead>
											<tr>
												<th style={{ width: '70px' }}>Stt</th>
												<th>Mục</th>
												<th className="text-end">Giá</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>01</td>
												<td>SplashDash - Admin Html Template</td>
												<td className="text-end">$359.00</td>
											</tr>
											
											<tr>
												<td>02</td>
												<td>SplashDash - Landing Template</td>
												<td className="text-end">$749.00</td>
											</tr>

											<tr>
												<td>03</td>
												<td>SplashDash - Admin Html Template</td>
												<td className="text-end">$555.00</td>
											</tr>
											<tr>
												<td colspan="2" className="text-end">Tổng phụ</td>
												<td className="text-end">$4578.00</td>
											</tr>
											<tr>
												<td colspan="2" className="text-end">
													<strong>Vận chuyển</strong></td>
												<td className=" text-end">$14.00</td>
											</tr>
											<tr>
												<td colspan="2" className="text-end">
													<strong>Tổng cộng</strong></td>
												<td className=" text-end"><h4 className="m-0">$45781.00</h4></td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="d-print-none mt-2">
									<div className="float-end">
										<a href="javascript:window.print()" className="btn btn-success waves-effect waves-light me-1"><i className="fa fa-print"></i></a>
										<a href="javascript:;" className="btn btn-primary w-md waves-effect waves-light">Gửi</a>
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
  
  export default Invoice;