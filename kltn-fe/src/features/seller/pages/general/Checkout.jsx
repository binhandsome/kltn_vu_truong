const Checkout = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
								{/* Checkout */}
                                <h4 className="page-title">Thanh toán</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
										{/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                                    </li>
									{/* Checkout */}
                                    <li className="breadcrumb-link active">Thanh toán</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Table Start --> */}
                <div className="row">
                    {/* <!-- Styled Table Card--> */}
						<div className="col-xl-6 col-lg-6">
                            <div className="card">
                                <div className="card-header">
									{/* Billing Details */}
                                    <h4>Chi tiết thanh toán</h4>
                                </div>
                                <div className="card-body">
                                    <form>
										<div className="row">
											<div className="col-xl-6 col-lg-6">
												<div className="form-group">
													{/* First Name */}
													<label for="text-input" className="col-form-label">Họ</label>
													<input className="form-control" type="text" placeholder=""/>
												</div>
											</div>
											<div className="col-xl-6 col-lg-6">
												 <div className="form-group">
													{/* Last Name */}
													<label for="text-input" className="col-form-label">Tên</label>
													<input className="form-control" type="text" placeholder=""/>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-xl-6 col-lg-6">
												 <div className="form-group">
													{/* Phone */}
													<label for="text-input" className="col-form-label">Số điện thoại</label>
													<input className="form-control" type="text" placeholder=""/>
												</div>
											</div>
											<div className="col-xl-6 col-lg-6">
												 <div className="form-group">
													{/* Email Address */}
													<label for="text-input" className="col-form-label">Địa chỉ Email</label>
													<input className="form-control" type="text" placeholder=""/>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-xl-6 col-lg-6">
												 <div className="form-group s-opt">
													{/* Country Or Region */}
													<label for="region" className="col-form-label">Quốc gia hoặc Khu vực</label>
													<select className="select2 form-control select-opt" id="region">
														<optgroup label="Múi giờ Alaska/Hawaii">
														  <option value="AK">Alaska</option>
														  <option value="HI">Hawaii</option>
                                                         
                                                        </optgroup>
                                                       
														<optgroup label="Múi giờ Thái Bình Dương">
														  <option value="CA">California</option>
														  <option value="NV">Nevada</option>
														  <option value="OR">Oregon</option>
														  <option value="WA">Washington</option>
														</optgroup>
														<optgroup label="Múi giờ miền núi">
														  <option value="AZ">Arizona</option>
														  <option value="CO">Colorado</option>
														  <option value="ID">Idaho</option>
														  <option value="MT">Montana</option>
														  <option value="NE">Nebraska</option>
														  <option value="NM">New Mexico</option>
														  <option value="ND">North Dakota</option>
														  <option value="UT">Utah</option>
														  <option value="WY">Wyoming</option>
														</optgroup>
														<optgroup label="Múi giờ miền Trung">
														  <option value="AL">Alabama</option>
														  <option value="AR">Arkansas</option>
														  <option value="IL">Illinois</option>
														  <option value="IA">Iowa</option>
														  <option value="KS">Kansas</option>
														  <option value="KY">Kentucky</option>
														  <option value="LA">Louisiana</option>
														  <option value="MN">Minnesota</option>
														  <option value="MS">Mississippi</option>
														  <option value="MO">Missouri</option>
														  <option value="OK">Oklahoma</option>
														  <option value="SD">South Dakota</option>
														  <option value="TX">Texas</option>
														  <option value="TN">Tennessee</option>
														  <option value="WI">Wisconsin</option>
														</optgroup>
														<optgroup label="Múi giờ miền Đông">
														  <option value="CT">Connecticut</option>
														  <option value="DE">Delaware</option>
														  <option value="FL">Florida</option>
														  <option value="GA">Georgia</option>
														  <option value="IN">Indiana</option>
														  <option value="ME">Maine</option>
														  <option value="MD">Maryland</option>
														  <option value="MA">Massachusetts</option>
														  <option value="MI">Michigan</option>
														  <option value="NH">New Hampshire</option>
														  <option value="NJ">New Jersey</option>
														  <option value="NY">New York</option>
														  <option value="NC">North Carolina</option>
														  <option value="OH">Ohio</option>
														  <option value="PA">Pennsylvania</option>
														  <option value="RI">Rhode Island</option>
														  <option value="SC">South Carolina</option>
														  <option value="VT">Vermont</option>
														  <option value="VA">Virginia</option>
														  <option value="WV">West Virginia</option>
														</optgroup>
													</select>
                                                    <span className="sel_arrow">
                                                    <i className="fa fa-angle-down "></i>
                                                </span>
												</div>
											</div>
											<div className="col-xl-6 col-lg-6">
												<div className="form-group">
													{/* Address */}
													<label for="text-input" className="col-form-label">Địa chỉ</label>
													<input className="form-control" type="text" placeholder="" id="text-input"/>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-xl-6 col-lg-6">
												<div className="form-group s-opt">
													{/* Town/City */}
													<label for="city" className="col-form-label">Thị trấn/Thành phố</label>
													<select className="select2 form-control select-opt" id="city">
														  <option value="AK">Alaska</option>
														  <option value="HI">Hawaii</option>
														  <option value="CA">California</option>
														  <option value="NV">Nevada</option>
														  <option value="OR">Oregon</option>
														  <option value="WA">Washington</option>
													</select>
                                                    <span className="sel_arrow">
                                                        <i className="fa fa-angle-down "></i>
                                                    </span>
												</div>
											</div>
											<div className="col-xl-6 col-lg-6">
												<div className="form-group s-opt">
													{/* State/Country */}
													<label for="State" className="col-form-label">Bang/Quốc gia</label>
													<select className="select2 form-control select-opt" id="State">
														  <option value="AK">Alaska</option>
														  <option value="HI">Hawaii</option>
														  <option value="CA">California</option>
													</select>
                                                    <span className="sel_arrow">
                                                        <i className="fa fa-angle-down "></i>
                                                    </span>
												</div>
											</div>
										</div>
										<div className="form-group">
											{/* Postal Code */}
											<label for="password-input" className="col-form-label">Mã bưu chính</label>
											<input className="form-control" type="password" placeholder="" id="password-input"/>
										</div>
										<div className="form-group mb-0">
											<div className="checkbox mb-3">
												<input id="checkbox1" type="checkbox"/>
												{/* Check me out */}
												<label for="checkbox1">Kiểm tra tôi</label>
											</div>
										</div>
										<div className="form-group mb-0">
											<button className="btn btn-primary squer-btn mt-2 mr-2" type="submit">Nộp</button>
										</div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6">
							<div className="card table-card ">
								<div className="card-header pb-0">
									<div className="d-flex">
										{/* Product */}
										<h4 style={{ flex: 1}}>Sản phẩm</h4>
										{/* Total */}
										<h4>Tổng cộng</h4>
									</div>
								</div>
								<div className="card-body">
									<div className="chart-holder">
										<div className="row">
											<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
												<div className="ad-checkout-tab">
													{/* Dining Chair */}
													<h5>Ghế ăn</h5>
													<h5>Ceiling Light</h5>
												</div>
											</div>
											<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
												<div className="ad-checkout-tab text-right">
													<h5>$85</h5>
													<h5>$105</h5>
												</div>
											</div>
											<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
												<div className="ad-checkout-tab">
													{/* Subtotal */}
													<h5>Tổng phụ</h5>
													{/* Shipping */}
													<h5>Vận chuyển</h5>
												</div>
											</div>
											<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
												<div className="ad-checkout-tab text-right">
													<h5>$380.10</h5>
													<div className="form-group">
														<div className="checkbox">
															<input id="checkbox0" type="checkbox"/>
															<label for="checkbox0">Lựa chọn 1</label>
														</div>
														<div className="checkbox">
															<input id="checkbox-1" type="checkbox"/>
															<label for="checkbox-1">Lựa chọn 2</label>
														</div>
													</div>
												</div>
											</div>
											<div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
												<div className="ad-checkout-tab">
													<h5>Tổng cộng</h5>
													<div className="ad-radio-button">
														<input id="radio-1" name="radio" type="radio" checked/>
														{/* Check Payments */}
														<label for="radio-1" className="radio-label">Kiểm tra thanh toán</label>
													</div>
													<div className="ad-radio-button">
														<input id="radio-2" name="radio" type="radio"/>
														{/* Cash On Delivery */}
														<label  for="radio-2" className="radio-label">Tiền mặt khi giao hàng</label>
													</div>
													<div className="ad-radio-button">
														<input id="radio-3" name="radio" type="radio"/>
														{/* PayPal */}
														<label for="radio-3" className="radio-label">PayPal</label>
													</div>
													<div className="ad-place-order">
														{/* Place Order */}
														<button type="button" className="btn btn-primary squer-btn mt-2 mr-2">Đặt hàng</button>
													</div>
												</div>
											</div>
											<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
												<div className="ad-checkout-tab text-right">
													<h5>$620.00</h5>
												</div>
											</div>
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
  
  export default Checkout;