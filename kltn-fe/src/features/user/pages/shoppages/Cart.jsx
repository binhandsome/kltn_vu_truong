// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function Cart() {
	const [hasBgClass, setHasBgClass] = useState(true); 
  
	useEffect(() => {
	  if (hasBgClass) {
		document.body.classList.add('bg');
	  } else {
		document.body.classList.remove('bg');
	  }
  
	  return () => {
		// Dọn dẹp: Xóa class khi component bị unmount
		document.body.classList.remove('bg');
	  };
	}, [hasBgClass]); // Chạy lại useEffect khi hasBgClass thay đổi
	useEffect(() => { // New useEffect for WOW.js
		const wow = new WOW.WOW();
		wow.init();
	
		return () => { // Optional cleanup function
			//wow.sync(); // sync and remove the DOM
		};
	  }, []);

  return (
    <>
      <div className="page-wraper">

        {/* Header (đã được xử lý trong App.js) */}

        <div className="page-content bg-light">
		<div className="dz-bnr-inr bg-light" style={{ backgroundImage: `url('../assets/user/images/background/bg1.jpg')` }}>
			<div className="container">
				<div className="dz-bnr-inr-entry">
					<h1>Shop Cart</h1>
					<nav aria-label="breadcrumb" className="breadcrumb-row">
						<ul className="breadcrumb">
							<li className="breadcrumb-item"><a href="/"> Home</a></li>
							<li className="breadcrumb-item">Shop Cart</li>
						</ul>
					</nav>
				</div>
			</div>	
		</div>
		<section className="content-inner shop-account">
			<div className="container">
				<div className="row">
					<div className="col-lg-8">
						<div className="table-responsive">
							<table className="table check-tbl">
								<thead>
									<tr>
										<th>Product</th>
										<th></th>
										<th>Price</th>
										<th>Quantity</th>
										<th>Subtotal</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="product-item-img"><img src="../../assets/user/images/shop/shop-cart/pic1.jpg" alt="/"/></td>
										<td className="product-item-name">Sophisticated Swagger Suit</td>
										<td className="product-item-price">$40.00</td>
										<td className="product-item-quantity">
											<div className="quantity btn-quantity style-1 me-3">
												<input  type="text" value="1" name="demo_vertical2"/>
											</div>
										</td>
										<td className="product-item-totle">$160.00</td>
										<td className="product-item-close"><a href="javascript:void(0);"><i className="ti-close"></i></a></td>
									</tr>
									<tr>
										<td className="product-item-img"><img src="../../assets/user/images/shop/shop-cart/pic2.jpg" alt="/"/></td>
										<td className="product-item-name">Cozy Knit Cardigan Sweater</td>
										<td className="product-item-price">$56.00</td>
										<td className="product-item-quantity">
											<div className="quantity btn-quantity style-1 me-3">
												<input id="demo_vertical3" type="text" value="1" name="demo_vertical2"/>
											</div>
										</td>
										<td className="product-item-totle">$120.00</td>
										<td className="product-item-close"><a href="javascript:void(0);"><i className="ti-close"></i></a></td>
									</tr>
									<tr>
										<td className="product-item-img"><img src="../../assets/user/images/shop/shop-cart/pic3.jpg" alt="/"/></td>
										<td className="product-item-name">Athletic Mesh Sports Leggings</td>
										<td className="product-item-price">$30.00</td>
										<td className="product-item-quantity">
											<div className="quantity btn-quantity style-1 me-3">
												<input id="demo_vertical4" type="text" value="1" name="demo_vertical2"/>
											</div>
										</td>
										<td className="product-item-totle">$40.00</td>
										<td className="product-item-close"><a href="javascript:void(0);"><i className="ti-close"></i></a></td>
									</tr>
									<tr>
										<td className="product-item-img"><img src="../../assets/user/images/shop/shop-cart/pic4.jpg" alt="/"/></td>
										<td className="product-item-name">Plaid Wool Winter Coat </td>
										<td className="product-item-price">$42.00</td>
										<td className="product-item-quantity">
											<div className="quantity btn-quantity style-1 me-3">
												<input id="demo_vertical5" type="text" value="1" name="demo_vertical2"/>
											</div>
										</td>
										<td className="product-item-totle">$160.00</td>
										<td className="product-item-close"><a href="javascript:void(0);"><i className="ti-close"></i></a></td>
									</tr>
									<tr>
										<td className="product-item-img"><img src="../../assets/user/images/shop/shop-cart/pic5.jpg" alt="/"/></td>
										<td className="product-item-name">Satin Wrap Party Blouse</td>
										<td className="product-item-price">$28.00</td>
										<td className="product-item-quantity">
											<div className="quantity btn-quantity style-1 me-3">
												<input id="demo_vertical6" type="text" value="1" name="demo_vertical2"/>
											</div>
										</td>
										<td className="product-item-totle">$45.00</td>
										<td className="product-item-close"><a href="javascript:void(0);"><i className="ti-close"></i></a></td>
									</tr>
									<tr>
										<td className="product-item-img"><img src="../../assets/user/images/shop/shop-cart/pic6.jpg" alt="/"/></td>
										<td className="product-item-name">Suede Ankle Booties Collection</td>
										<td className="product-item-price">$120.00</td>
										<td className="product-item-quantity">
											<div className="quantity btn-quantity style-1 me-3">
												<input id="demo_vertical7" type="text" value="1" name="demo_vertical2" />
											</div>
										</td>
										<td className="product-item-totle">$40.00</td>
										<td className="product-item-close"><a href="javascript:void(0);"><i className="ti-close"></i></a></td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="row shop-form m-t30">
							<div className="col-md-6">
								<div className="form-group">
									<div className="input-group mb-0">
										<input name="dzEmail" required="required" type="text" className="form-control" placeholder="Coupon Code" />
										<div className="input-group-addon">
											<button name="submit" value="Submit" type="submit" className="btn coupon">
												Apply Coupon
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-6 text-end">
								<a href="shop-cart.html" className="btn btn-secondary">UPDATE CART</a>
							</div>
						</div>
					</div>
					<div className="col-lg-4">
						<h4 className="title mb15">Cart Total</h4>
						<div className="cart-detail">
							<a href="javascript:void(0);" className="btn btn-outline-secondary w-100 m-b20">Bank Offer 5% Cashback</a>
							<div className="icon-bx-wraper style-4 m-b15">
								<div className="icon-bx">
									<i className="flaticon flaticon-ship"></i>
								</div>
								<div className="icon-content">
									<span className=" font-14">FREE</span>
									<h6 className="dz-title">Enjoy The Product</h6>
								</div>
							</div>
							<div className="icon-bx-wraper style-4 m-b30">
								<div className="icon-bx">
									<img src="../../assets/user/images/shop/shop-cart/icon-box/pic2.png" alt="/" />
								</div>
								<div className="icon-content">
									<h6 className="dz-title">Enjoy The Product</h6>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
								</div>
							</div>
							<div className="save-text">
								<i className="icon feather icon-check-circle"></i>
								<span className="m-l10">You will save ₹504 on this order</span>
							</div>
							<table>
								<tbody>
									<tr className="total">
										<td>
											<h6 className="mb-0">Total</h6>
										</td>
										<td className="price">
											$125.75
										</td>
									</tr>
								</tbody>
							</table>
							<a href="shop-checkout.html" className="btn btn-secondary w-100">PLACE ORDER</a>
						</div>
					</div>
				</div>
			</div>
		</section>

	</div>

        {/* Footer (đã được xử lý trong App.js) */}
         <ScrollTopButton/>
        <QuickViewModal />
      </div>
    </>
  );
}

export default Cart;