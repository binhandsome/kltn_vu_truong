// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function Checkout() {
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
					<h1>Shop Checkout</h1>
					<nav aria-label="breadcrumb" className="breadcrumb-row">
						<ul className="breadcrumb">
							<li className="breadcrumb-item"><a href="/"> Home</a></li>
							<li className="breadcrumb-item">Shop Checkout</li>
						</ul>
					</nav>
				</div>
			</div>	
		</div>
		<div className="content-inner-1">
			<div className="container">
				<div className="row shop-checkout">
					<div className="col-xl-8">
						<h4 className="title m-b15">Billing details</h4>
						<div className="accordion dz-accordion accordion-sm" id="accordionFaq">
							<div className="accordion-item">
								<h2 className="accordion-header" id="headingOne">
									<a href="shop-checkout.html#" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
										Returning customer? Click here to login
										<span className="toggle-close"></span>
									</a>
								</h2>
								<div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionFaq">
									<div className="accordion-body">
										<p className="m-b0">If your order has not yet shipped, you can contact us to change your shipping address</p>
									</div>
								</div>
							</div>
							<div className="accordion-item">
								<h2 className="accordion-header" id="headingTwo">
									<a href="shop-checkout.html#" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseOne">
										Have a coupon? Click here to enter your code
										<span className="toggle-close"></span>
									</a>
								</h2>
								<div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionFaq">
									<div className="accordion-body">
										<p className="m-b0">If your order has not yet shipped, you can contact us to change your shipping address</p>
									</div>
								</div>
							</div>
						</div>
						<form className="row">
							<div className="col-md-6">
								<div className="form-group m-b25">
									<label className="label-title">First Name</label>
									<input name="dzName" required="" className="form-control"/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group m-b25">
									<label className="label-title">Last Name</label>
									<input name="dzName" required="" className="form-control"/>
								</div>
							</div>
							<div className="col-md-12">
								<div className="form-group m-b25">
									<label className="label-title">Company name (optional)</label>
									<input name="dzName" required="" className="form-control"/>
								</div>
							</div>
							<div className="col-md-12">
								<div className="m-b25">
									<label className="label-title">Country / Region *</label>
									<select className="default-select form-select w-100">
										<option selected>India</option>
										<option value="1">Another option</option>
										<option value="2">UK</option>
										<option value="3">Iraq</option>
									</select>	
								</div>
							</div>
							<div className="col-md-12">
								<div className="form-group m-b25">
									<label className="label-title">Street address *</label>
									<input name="dzName" required="" className="form-control m-b15" placeholder="House number and street name"/>
									<input name="dzName" required="" className="form-control" placeholder="Apartment, suite, unit, etc. (optional)"/>
								</div>
							</div>
							<div className="col-md-12">
								<div className="m-b25">
									<label className="label-title">Town / City *</label>
									<select className="default-select form-select w-100">
										<option selected>Kota</option>
										<option value="1">Another option</option>
										<option value="2">Jaipur</option>
										<option value="3">Udaipur</option>
									</select>	
								</div>
							</div>
							<div className="col-md-12">
								<div className="m-b25">
									<label className="label-title">State *</label>
									<select className="default-select form-select w-100">
										<option selected>Rajasthan</option>
										<option value="1">Another option</option>
										<option value="2">Rajasthan</option>
										<option value="3">Rajasthan</option>
									</select>									
								</div>
							</div>
							<div className="col-md-12">
								<div className="form-group m-b25">
									<label className="label-title">ZIP Code *</label>
									<input name="dzName" required="" className="form-control"/>
								</div>
							</div>
							<div className="col-md-12">
								<div className="form-group m-b25">
									<label className="label-title">Phone *</label>
									<input name="dzName" required="" className="form-control"/>
								</div>
							</div>
							<div className="col-md-12">
								<div className="form-group m-b25">
									<label className="label-title">Email address *</label>
									<input name="dzName" required="" className="form-control"/>
								</div>
							</div>
							<div className="col-md-12 m-b25">
								<div className="form-group m-b5">
								   <div className="custom-control custom-checkbox">
										<input type="checkbox" className="form-check-input" id="basic_checkbox_1"/>
										<label className="form-check-label" for="basic_checkbox_1">Create an account? </label>
									</div>
								</div>
								<div className="form-group">
								   <div className="custom-control custom-checkbox">
										<input type="checkbox" className="form-check-input" id="basic_checkbox_2"/>
										<label className="form-check-label" for="basic_checkbox_2">Ship to a different address?</label>
									</div>
								</div>
							</div>
							<div className="col-md-12 m-b25">
								<div className="form-group">
									<label className="label-title">Order notes (optional)</label>
									<textarea id="comments" placeholder="Notes about your order, e.g. special notes for delivery." className="form-control" name="comment" cols="90" rows="5" required="required"></textarea>
								</div>
							</div>
						</form>
					</div>
					<div className="col-xl-4 side-bar">
						<h4 className="title m-b15">Your Order</h4>
						<div className="order-detail sticky-top">
							<div className="cart-item style-1">
								<div className="dz-media">
									<img src="../../assets/user/images/shop/shop-cart/pic1.jpg" alt="/"/>
								</div>
								<div className="dz-content">
									<h6 className="title mb-0">Sophisticated <br/>Swagger Suit</h6>
									<span className="price">$40.00</span>
								</div>
							</div>
							<div className="cart-item style-1 mb-0">
								<div className="dz-media">
									<img src="../../assets/user/images/shop/shop-cart/pic2.jpg" alt="/"/>
								</div>
								<div className="dz-content">
									<h6 className="title mb-0">Cozy Knit Cardigan Sweater</h6>
									<span className="price">$36.00</span>
								</div>
							</div>
							<table>
								<tbody>
									<tr className="subtotal">
										<td>Subtotal</td>
										<td className="price">$100</td>
									</tr>
									<tr className="title">
										<td><h6 className="title font-weight-500">Shipping</h6></td>
										<td></td>
									</tr>
									<tr className="shipping">
										<td>
											<div className="custom-control custom-checkbox">
											  <input className="form-check-input radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
											  <label className="form-check-label" for="flexRadioDefault1">
												Free shipping
											  </label>
											</div>
											<div className="custom-control custom-checkbox">
											  <input className="form-check-input radio" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
											  <label className="form-check-label" for="flexRadioDefault2">
												Flat Rate:
											  </label>
											</div>
										</td>
										<td className="price">25.75</td>
									</tr>
									<tr className="total">
										<td>Total</td>
										<td className="price">$125.75</td>
										
									</tr>
								</tbody>
							</table>
							
							<div className="accordion dz-accordion accordion-sm" id="accordionFaq1">
								<div className="accordion-item">
									<div className="accordion-header" id="heading1">
										<div className="accordion-button collapsed custom-control custom-checkbox border-0" data-bs-toggle="collapse" data-bs-target="#collapse1" role="navigation"  aria-expanded="true" aria-controls="collapse1">
											<input className="form-check-input radio" type="radio" name="flexRadioDefault" id="flexRadioDefault3"/>
											<label className="form-check-label" for="flexRadioDefault3">
												Direct bank transfer
											</label>
										</div>
									</div>
									<div id="collapse1" className="accordion-collapse collapse show" aria-labelledby="heading1" data-bs-parent="#accordionFaq1">
										<div className="accordion-body">
											<p className="m-b0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<div className="accordion-header" id="heading2">
										<div className="accordion-button collapsed custom-control custom-checkbox border-0" data-bs-toggle="collapse" data-bs-target="#collapse2" role="navigation" aria-expanded="true" aria-controls="collapse2">
											<input className="form-check-input radio" type="radio" name="flexRadioDefault" id="flexRadioDefault5"/>
											<label className="form-check-label" for="flexRadioDefault5">
												Cash on delivery
											</label>
										</div>
									</div>
									<div id="collapse2" className="accordion-collapse collapse" aria-labelledby="collapse2" data-bs-parent="#accordionFaq1">
										<div className="accordion-body">
											<p className="m-b0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<div className="accordion-header" id="heading3">
										<div className="accordion-button collapsed custom-control custom-checkbox border-0" data-bs-toggle="collapse" data-bs-target="#collapse3" role="navigation" aria-expanded="true" aria-controls="collapse3">
											<input className="form-check-input radio" type="radio" name="flexRadioDefault" id="flexRadioDefault4"/>
											<label className="form-check-label" for="flexRadioDefault4">
												Paypal
											</label>
											<img src="../../assets/user/images/shop/payment.jpg" alt="/" />
											<a href="javascript:void(0);">What is PayPal?</a>
										</div>
									</div>
									<div id="collapse3" className="accordion-collapse collapse" aria-labelledby="heading3" data-bs-parent="#accordionFaq1">
										<div className="accordion-body">
											<p className="m-b0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
										</div>
									</div>
								</div>
							</div>
							<p className="text">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="javascript:void(0);">privacy policy.</a></p>
							<div className="form-group">
								<div className="custom-control custom-checkbox d-flex m-b15">
									<input type="checkbox" className="form-check-input" id="basic_checkbox_3" />
									<label className="form-check-label" for="basic_checkbox_3">I have read and agree to the website terms and conditions </label>
								</div>
							</div>
							<a href="shop-checkout.html" className="btn btn-secondary w-100">PLACE ORDER</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
        {/* Footer (đã được xử lý trong App.js) */}
         <ScrollTopButton/>
        <QuickViewModal />
      </div>
    </>
  );
}

export default Checkout;