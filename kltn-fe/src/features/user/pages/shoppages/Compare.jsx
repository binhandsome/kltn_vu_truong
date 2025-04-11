// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function Compare() {
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
		<div className="dz-bnr-inr bg-secondary dz-bnr-inr-md">
			<div className="container-fluid">
				<div className="dz-bnr-inr-entry text-start">
					<h1>Compare</h1>
					<nav aria-label="breadcrumb" className="breadcrumb-row">
						<ul className="breadcrumb">
							<li className="breadcrumb-item"><a href="/"> Home</a></li>
							<li className="breadcrumb-item">Compare</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
		
		<div className="content-inner-1 bg-light">
			<div className="container-fluid">
				<div className="table-responsive overflow-visible">
					<table className="table compare-table">
						<tbody>
							<tr className="compare-product">
								<td></td>
								<td>
									<div className="shop-card style-8">
										<div className="dz-media">
											<img src="../../assets/user/images/shop/product-2/1.png" alt="img"/>
										</div>
										<div className="dz-content">
											<h5 className="title"><a href="javascript:void(0);">Flawless Denim Delights</a></h5>
											<ul className="star-rating">
												<li>
													<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M7.24805 0.734375L9.22301 5.01608L13.9054 5.57126L10.4436 8.77267L11.3625 13.3975L7.24805 11.0944L3.13355 13.3975L4.0525 8.77267L0.590651 5.57126L5.27309 5.01608L7.24805 0.734375Z" fill="#FF8A00"/>
													</svg>
												</li>
												<li>
													<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M7.24805 0.734375L9.22301 5.01608L13.9054 5.57126L10.4436 8.77267L11.3625 13.3975L7.24805 11.0944L3.13355 13.3975L4.0525 8.77267L0.590651 5.57126L5.27309 5.01608L7.24805 0.734375Z" fill="#FF8A00"/>
													</svg>
												</li>
												<li>
													<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M7.24805 0.734375L9.22301 5.01608L13.9054 5.57126L10.4436 8.77267L11.3625 13.3975L7.24805 11.0944L3.13355 13.3975L4.0525 8.77267L0.590651 5.57126L5.27309 5.01608L7.24805 0.734375Z" fill="#FF8A00"/>
													</svg>
												</li>
												<li>
													<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M7.24805 0.734375L9.22301 5.01608L13.9054 5.57126L10.4436 8.77267L11.3625 13.3975L7.24805 11.0944L3.13355 13.3975L4.0525 8.77267L0.590651 5.57126L5.27309 5.01608L7.24805 0.734375Z" fill="#E4E5E8"/>
													</svg>
												</li>
												<li>
													<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M7.24805 0.734375L9.22301 5.01608L13.9054 5.57126L10.4436 8.77267L11.3625 13.3975L7.24805 11.0944L3.13355 13.3975L4.0525 8.77267L0.590651 5.57126L5.27309 5.01608L7.24805 0.734375Z" fill="#E4E5E8"/>
													</svg>
												</li>
											</ul>
											<h6 className="price">
												<del>$45.00</del>
												$40.00
											</h6>
										</div>
									</div>
								</td>
								<td>
									<div className="shop-card style-8">
										<div className="dz-media">
											<img src="../../assets/user/images/shop/product-2/2.png" alt="img"/>
										</div>
										<div className="dz-content">
											<h5 className="title"><a href="javascript:void(0);">Flawless Denim Delights</a></h5>
											<ul className="star-rating">
												<li>
													<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M7.24805 0.734375L9.22301 5.01608L13.9054 5.57126L10.4436 8.77267L11.3625 13.3975L7.24805 11.0944L3.13355 13.3975L4.0525 8.77267L0.590651 5.57126L5.27309 5.01608L7.24805 0.734375Z" fill="#FF8A00"/>
													</svg>
												</li>
												<li>
													<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M7.24805 0.734375L9.22301 5.01608L13.9054 5.57126L10.4436 8.77267L11.3625 13.3975L7.24805 11.0944L3.13355 13.3975L4.0525 8.77267L0.590651 5.57126L5.27309 5.01608L7.24805 0.734375Z" fill="#FF8A00"/>
													</svg>
												</li>
												<li>
													<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M7.24805 0.734375L9.22301 5.01608L13.9054 5.57126L10.4436 8.77267L11.3625 13.3975L7.24805 11.0944L3.13355 13.3975L4.0525 8.77267L0.590651 5.57126L5.27309 5.01608L7.24805 0.734375Z" fill="#FF8A00"/>
													</svg>
												</li>
												<li>
													<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M7.24805 0.734375L9.22301 5.01608L13.9054 5.57126L10.4436 8.77267L11.3625 13.3975L7.24805 11.0944L3.13355 13.3975L4.0525 8.77267L0.590651 5.57126L5.27309 5.01608L7.24805 0.734375Z" fill="#E4E5E8"/>
													</svg>
												</li>
												<li>
													<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M7.24805 0.734375L9.22301 5.01608L13.9054 5.57126L10.4436 8.77267L11.3625 13.3975L7.24805 11.0944L3.13355 13.3975L4.0525 8.77267L0.590651 5.57126L5.27309 5.01608L7.24805 0.734375Z" fill="#E4E5E8"/>
													</svg>
												</li>
											</ul>
											<h6 className="price">
												<del>$45.00</del>
												$40.00
											</h6>
										</div>
									</div>
								</td>
								<td>
									<div className="shop-card style-8">
										<div className="dz-media">
											<img src="../../assets/user/images/shop/product-2/3.png" alt="img"/>
										</div>
										<div className="dz-content">
											<h5 className="title"><a href="javascript:void(0);">Flawless Denim Delights</a></h5>
											<ul className="star-rating">
												<li>
													<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M7.24805 0.734375L9.22301 5.01608L13.9054 5.57126L10.4436 8.77267L11.3625 13.3975L7.24805 11.0944L3.13355 13.3975L4.0525 8.77267L0.590651 5.57126L5.27309 5.01608L7.24805 0.734375Z" fill="#FF8A00"/>
													</svg>
												</li>
												<li>
													<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M7.24805 0.734375L9.22301 5.01608L13.9054 5.57126L10.4436 8.77267L11.3625 13.3975L7.24805 11.0944L3.13355 13.3975L4.0525 8.77267L0.590651 5.57126L5.27309 5.01608L7.24805 0.734375Z" fill="#FF8A00"/>
													</svg>
												</li>
												<li>
													<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M7.24805 0.734375L9.22301 5.01608L13.9054 5.57126L10.4436 8.77267L11.3625 13.3975L7.24805 11.0944L3.13355 13.3975L4.0525 8.77267L0.590651 5.57126L5.27309 5.01608L7.24805 0.734375Z" fill="#FF8A00"/>
													</svg>
												</li>
												<li>
													<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M7.24805 0.734375L9.22301 5.01608L13.9054 5.57126L10.4436 8.77267L11.3625 13.3975L7.24805 11.0944L3.13355 13.3975L4.0525 8.77267L0.590651 5.57126L5.27309 5.01608L7.24805 0.734375Z" fill="#E4E5E8"/>
													</svg>
												</li>
												<li>
													<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M7.24805 0.734375L9.22301 5.01608L13.9054 5.57126L10.4436 8.77267L11.3625 13.3975L7.24805 11.0944L3.13355 13.3975L4.0525 8.77267L0.590651 5.57126L5.27309 5.01608L7.24805 0.734375Z" fill="#E4E5E8"/>
													</svg>
												</li>
											</ul>
											<h6 className="price">
												<del>$45.00</del>
												$40.00
											</h6>
										</div>
									</div>
								</td>
								<td>
									<div className="shop-card style-8">
										<div className="dz-media">
											<img src="../../assets/user/images/upload.png" alt="img" />
										</div>
										<div className="dz-content">
											<h5 className="title"><a href="javascript:void(0);">Add Product</a></h5>
										</div>
									</div>
								</td>
							</tr>
							<tr className="compare-table-head">
								<td><h5>Technical Details</h5></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr className="compare-start">
								<td>Brand</td>
								<td><span><i className="fa-solid fa-check"></i></span>Speedex</td>
								<td><span><i className="fa-solid fa-check"></i></span>Speedex</td>
								<td><span><i className="fa-solid fa-check"></i></span>Speedex</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>Speedex</td>
							</tr>
							<tr>
								<td>Material</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎Stainless Steel</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎Stainless Steel</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎Stainless Steel</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎Stainless Steel</td>
							</tr>
							
							<tr>
								<td>Bottle Type</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎Sipper Bottle</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎Sipper Bottle</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎Sipper Bottle</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎Sipper Bottle</td>
							</tr>
							<tr>
								<td>Colour</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎‎Black</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎‎Black </td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎‎Black</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎‎Black</td>
							</tr>
							<tr>
								<td>Capacity</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎1000 Milliliters</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎1000 Milliliters</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎1000 Milliliters</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎1000 Milliliters</td>
							</tr>
							<tr>
								<td>Special Feature</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>Shatter Proof, Leak Proof</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>Shatter Proof, Leak Proof</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>Shatter Proof, Leak Proof</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>Shatter Proof, Leak Proof</td>
							</tr>
							<tr>
								<td>Age Range (Description)</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎Adult</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎Adult</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎Adult</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎Adult</td>
							</tr>
							<tr>
								<td>Product Dimensions</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎7W x 26H Centimeters</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎7W x 26H Centimeters</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎7W x 26H Centimeters</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎7W x 26H Centimeters</td>
							</tr>
							<tr>
								<td>Product Care Instructions</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎WASH WITH WARM WATER </td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎WASH WITH WARM WATER </td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎WASH WITH WARM WATER </td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎WASH WITH WARM WATER </td>
							</tr>
							<tr>
								<td>Model Name</td>
								<td><span><i className="fa-solid fa-check"></i></span>SIMP_WithSipp-1000ml</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>SIMP_WithSipp-1000ml</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>SIMP_WithSipp-1000ml</td>
								<td><span><i className="fa-solid fa-check"></i></span>SIMP_WithSipp-1000ml</td>
							</tr>
							<tr>
								<td>Recommended Uses For Product</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎Office, School, Picnic, Gym</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎Office, School, Picnic, Gym</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎Office, School, Picnic, Gym</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎Office, School, Picnic, Gym</td>
							</tr>
							<tr>
								<td>Number of Items</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎1‎</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎1</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎1</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎1</td>
							</tr>
							<tr>
								<td>Reusability</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎Reusable</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎Reusable</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎Reusable</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎Reusable</td>
							</tr>
							<tr>
								<td>Shape</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎Round</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎Round</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎Round</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎Round</td>
							</tr>
							<tr>
								<td>Net Quantity</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎1 count</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎1 count</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎1 count</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎1 count</td>
							</tr>
							<tr>
								<td>Country of Origin</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎India</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎India</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎India</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎India</td>
							</tr>
							<tr>
								<td>Item model number</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎SIMP_WithSipp-1000m</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎SIMP_WithSipp-1000m</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎SIMP_WithSipp-1000m</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎SIMP_WithSipp-1000m</td>
							</tr>
							<tr>
								<td>Product Dimensions</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎7 x 7 x 26 cm; 260 Grams</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎7 x 7 x 26 cm; 260 Grams</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎7 x 7 x 26 cm; 260 Grams</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎7 x 7 x 26 cm; 260 Grams</td>
								
							</tr>
							<tr className="compare-end">
								<td>ASIN</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎B08FYVDRNK</td>
								<td><span><i className="fa-solid fa-check"></i></span>‎B08FYVDRNK</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎B08FYVDRNK</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>‎B08FYVDRNK</td>
							</tr>
							<tr className="compare-table-head">
								<td><h5>Additional Information</h5></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr  className="compare-start">
								<td>Item Weight</td>
								<td><span><i className="fa-solid fa-check"></i></span>260 g</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>260 g</td>
								<td><span><i className="fa-solid fa-check"></i></span>260 g</td>
								<td><span><i className="fa-solid fa-check"></i></span>260 g</td>
								
							</tr>
							<tr>
								<td>Item Dimensions</td>
								<td><span><i className="fa-solid fa-check"></i></span>LxWxH	7 x 7 x 26 CM</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>LxWxH	7 x 7 x 26 CM</td>
								<td><span><i className="fa-solid fa-check"></i></span>LxWxH	7 x 7 x 26 CM</td>
								<td><span><i className="fa-solid fa-check"></i></span>LxWxH	7 x 7 x 26 CM</td>	
							</tr>
							<tr>
								<td>Net Quantity</td>
								<td><span><i className="fa-solid fa-check"></i></span>1 count</td>
								<td><span><i className="fa-solid fa-check"></i></span>1 count</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>1 count</td>
								<td><span><i className="fa-solid fa-check"></i></span>1 count</td>
							</tr>
							<tr>
								<td>Included Components	</td>
								<td><span><i className="fa-solid fa-check"></i></span>1 Water Bottle</td>
								<td><span><i className="fa-solid fa-check"></i></span>1 Water Bottle</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>1 Water Bottle</td>
								<td><span><i className="fa-solid fa-check"></i></span>1 Water Bottle</td>
							</tr>
							<tr>
								<td>Generic Name</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>Water Bottles</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>Water Bottles</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>Water Bottles</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>Water Bottles</td>
							</tr>
							<tr className="compare-end">
								<td>Best Sellers Rank</td>
								<td><span><i className="fa-solid fa-check"></i></span>#323 in Home & Kitchen</td>
								<td><span><i className="fa-solid fa-check"></i></span>#323 in Home & Kitchen</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>#323 in Home & Kitchen</td>
								<td className="disable"><span><i className="fa-solid fa-check"></i></span>#323 in Home & Kitchen</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<section className="content-inner companies bg-light p-t0">
			<div className="container">
				<div className="section-inner">
					<div className="section-head style-3 wow fadeInUp" data-wow-delay="0.1s">
						<h2 className="title">We’re just keep growing with 6.3k trusted companies</h2>
						<p>Nullam nec ipsum luctus, vehicula massa in, dictum sapien. Aenean quis luctus ert nulla quam augue.</p>	
					</div>
					<div className="row gx-3 companies-inner">
						<div className="col-md-3 col-sm-4 col-6 p-lg-b30 p-b20 wow fadeInUp" data-wow-delay="0.1s">
							<a href="javascript:void(0);" className="companies-wrapper">
								<div className="companies-media">
									<img src="../../assets/user/images/companies/logo1.png" alt=""/>  
								</div>
							</a>
						</div>
						<div className="col-md-3 col-sm-4 col-6 p-lg-b30 p-b20 wow fadeInUp" data-wow-delay="0.2s">
							<a href="javascript:void(0);" className="companies-wrapper">
								<div className="companies-media">
									<img src="../../assets/user/images/companies/logo2.png" alt=""/>  
								</div>
							</a>
						</div>
						<div className="col-md-3 col-sm-4 col-6 p-lg-b30 p-b20 wow fadeInUp" data-wow-delay="0.3s">
							<a href="javascript:void(0);" className="companies-wrapper">
								<div className="companies-media">
									<img src="../../assets/user/images/companies/logo3.png" alt=""/>  
								</div>
							</a>
						</div>
						<div className="col-md-3 col-sm-4 col-6 p-lg-b30 p-b20 wow fadeInUp" data-wow-delay="0.4s">
							<a href="javascript:void(0);" className="companies-wrapper">
								<div className="companies-media">
									<img src="../../assets/user/images/companies/logo4.png" alt=""/> 
								</div>
							</a>
						</div>
						<div className="col-md-3 col-sm-4 col-6 p-lg-b30 p-b20 wow fadeInUp" data-wow-delay="0.5s">
							<a href="javascript:void(0);" className="companies-wrapper">
								<div className="companies-media">
									<img src="../../assets/user/images/companies/logo5.png" alt=""/>  
								</div>
							</a>
						</div>
						<div className="col-md-3 col-sm-4 col-6 p-lg-b30 p-b20 wow fadeInUp" data-wow-delay="0.6s">
							<a href="javascript:void(0);" className="companies-wrapper">
								<div className="companies-media">
									<img src="../../assets/user/images/companies/logo6.png" alt=""/>  
								</div>
							</a>
						</div>
						<div className="col-md-3 col-sm-4 col-6 p-lg-b30 p-b20 wow fadeInUp" data-wow-delay="0.7s">
							<a href="javascript:void(0);" className="companies-wrapper">
								<div className="companies-media">
									<img src="../../assets/user/images/companies/logo7.png" alt=""/>  
								</div>
							</a>
						</div>
						<div className="col-md-3 col-sm-4 col-6 p-lg-b30 p-b20 wow fadeInUp" data-wow-delay="0.8s">
							<a href="javascript:void(0);" className="companies-wrapper">
								<div className="companies-media">
									<img src="../../assets/user/images/companies/logo8.png" alt="" /> 
								</div>
							</a>
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

export default Compare;