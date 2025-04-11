const Cart = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                <h4 className="page-title bold">Cart</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Dashboard</a>
                                    </li>
                                    <li className="breadcrumb-link active">Cart</li>
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
                                <h4>Cart</h4>
                            </div>
                            <div className="card-body pb-4">
                                <div className="chart-holder">
                                    <div className="table-responsive">
                                        <table className="table table-styled mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Prdouct</th>
                                                    <th>Prdouct Name</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
													<th>Action</th>
													<th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="img-chair">
                                                            <img src="../../assets/admin/images/product.png" alt=" "/>
                                                        </div>
                                                    </td>
                                                    <td>Dining Chair</td>
                                                    <td>$86</td>
                                                    <td>
														<div className="int-table-quantity">
															<div className="quantity-wrapper">
																<div className="input-group">
																	<span className="quantity-minus"> - </span>
																	<input type="number" className="quantity" value="2"/>
																	<span className="quantity-plus"> + </span>
																</div>
															</div>
														</div>
													</td>
                                                    <td><a href="javascript:;"><i className="far fa-times-circle"></i></a></td>
                                                    <td>$375</td>
                                                </tr>
												<tr>
                                                    <td>
                                                        <div className="img-chair">
                                                            <img src="../../assets/admin/images/product2.png" alt=" "/>
                                                        </div>
                                                    </td>
                                                    <td>Ceiling Light</td>
                                                    <td>$79</td>
                                                    <td>
														<div className="int-table-quantity">
															<div className="quantity-wrapper">
																<div className="input-group">
																	<span className="quantity-minus"> - </span>
																	<input type="number" className="quantity" value="1"/>
																	<span className="quantity-plus"> + </span>
																</div>
															</div>
														</div>
													</td>
                                                    <td><a href="javascript:;"><i className="far fa-times-circle"></i></a></td>
                                                    <td>$275</td>
                                                </tr>
												<tr>
                                                    <td>
                                                        <div className="img-chair">
                                                            <img src="../../assets/admin/images/product3.png" alt=" "/>
                                                        </div>
                                                    </td>
                                                    <td>Wooden Sofa</td>
                                                    <td>$96</td>
                                                    <td>
														<div className="int-table-quantity">
															<div className="quantity-wrapper">
																<div className="input-group">
																	<span className="quantity-minus"> - </span>
																	<input type="number" className="quantity" value="3"/>
																	<span className="quantity-plus"> + </span>
																</div>
															</div>
														</div>
													</td>
                                                    <td><a href="javascript:;"><i className="far fa-times-circle"></i></a></td>
                                                    <td>$475</td>
                                                </tr>
												<tr>
                                                    <td>
													<div className="ad-breadcrumb ad-breadcrumb2 dd-flex">
														<div className="form-group">
															<div className="ad-user-btn">
																<input className="form-control" type="text" placeholder="Enter Coupan Code"/>
															</div>
														</div>
														<div className="form-group ad-apply-cart">
															<a className="ad-btn">Apply</a>
														</div>
													</div>
													</td>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                    <td><b>Total Price :</b></td>
                                                    <td>$6935.00</td>
                                                </tr>
												<tr>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                    <td><a href="all-product.html" className="btn btn-danger squer-btn mt-2 mr-2">Continue Shopping</a></td>
                                                    <td><a href="checkout.html" className="btn btn-success squer-btn mt-2 mr-2">Checkout</a></td>
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
  
  export default Cart;