// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import {handleChange} from '../../apiService/productService'
import WOW from 'wowjs'; 
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Ensure react-router-dom is installed
function ProductDetail() {
    const [hasBgClass, setHasBgClass] = useState(true); 
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const asin = searchParams.get('asin');
	const [products, setProducts] = useState([]);
	const [quantity, setQuantity] = useState(1);
	
let colorAsinArray = [];
try {
  colorAsinArray = typeof products.colorAsin === 'string'
    ? JSON.parse(products.colorAsin)
    : products.colorAsin;
} catch (e) {
  console.error("Không thể parse colorAsin:", e);
  colorAsinArray = [];
}

const fetchProductDetailWithAsin = async (asin) => {
    if (!asin) {
      console.error('ASIN is missing or null');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8083/api/products/productDetail/${asin}`);
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };
  const handleChange = (e) => {
  const value = e.target.value;
  const parsed = parseInt(value);
  if (isNaN(parsed) || parsed < 1) {
    setQuantity(1); 
  } else {
    setQuantity(parsed);
  }
};
  useEffect(() => {
    if (asin) {
      fetchProductDetailWithAsin(asin);
    }
  }, [asin]);

    useEffect(() => {
      if (hasBgClass) {
        document.body.classList.add('bg');
      } else {
        document.body.classList.remove('bg');
      }
      return () => {
        document.body.classList.remove('bg');
      };
    }, [hasBgClass]); 

    useEffect(() => {
        const wow = new WOW.WOW();
        wow.init();
    
        return () => { 
        };
      }, []);

  return (
    <>

        {/* Header (đã được xử lý trong App.js) */}

        <div className="page-content bg-light">
		
		<div className="d-sm-flex justify-content-between container-fluid py-3">
			<nav aria-label="breadcrumb" className="breadcrumb-row">
				<ul className="breadcrumb mb-0">
					<li className="breadcrumb-item"><a href="/"> Home</a></li>
					<li className="breadcrumb-item">Product Thumbnail</li>
				</ul>
			</nav>
		</div>
		
		<section className="content-inner py-0">
			<div className="container-fluid">
				<div className="row">
					<div className="col-xl-6 col-md-6">
						<div className="dz-product-detail sticky-top">
							<div className="swiper-btn-center-lr">
								<div className="swiper product-gallery-swiper2">
									<div className="swiper-wrapper" id="lightgallery">
								{products.images && products.images.length > 0 ? (
  products.images.map((image, index) => (
    <div className="swiper-slide" key={index}>
      <div className="dz-media DZoomImage rounded">
        <a
          className="mfp-link lg-item"
		  href={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_500,h_500/imgProduct/IMG/${image.imageData}`}
          data-src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_500,h_500/imgProduct/IMG/${image.imageData}`}
        >
          <i className="feather icon-maximize dz-maximize top-right"></i>
        </a>
        <img
          style={{ width: '80%', height: '80%' }}
          src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_500,h_500/imgProduct/IMG/${image.imageData}` || '/default-image.jpg'}
          alt="img"
          loading="lazy"
        />
      </div>
    </div>
  ))
) : (
  <p>No images available</p>
)}
						{products.images && products.images.length > 0 ? (
  products.images.map((image, index) => (
    <div className="swiper-slide" key={index}>
      <div className="dz-media DZoomImage rounded">
        <a
          className="mfp-link lg-item"
		  href={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_500,h_500/imgProduct/IMG/${image.imageData}`}
          data-src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_500,h_500/imgProduct/IMG/${image.imageData}`}
        >
          <i className="feather icon-maximize dz-maximize top-right"></i>
        </a>
        <img
          style={{ width: '80%', height: '80%' }}
          src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_500,h_500/imgProduct/IMG/${image.imageData}` || '/default-image.jpg'}
          alt="img"
          loading="lazy"
        />
      </div>
    </div>
  ))
) : (
  <p>No images available</p>
)}						{products.images && products.images.length > 0 ? (
  products.images.map((image, index) => (
    <div className="swiper-slide" key={index}>
      <div className="dz-media DZoomImage rounded">
        <a
          className="mfp-link lg-item"
		  href={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_500,h_500/imgProduct/IMG/${image.imageData}`}
          data-src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_500,h_500/imgProduct/IMG/${image.imageData}`}
        >
          <i className="feather icon-maximize dz-maximize top-right"></i>
        </a>
        <img
          style={{ width: '80%', height: '80%' }}
          src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_500,h_500/imgProduct/IMG/${image.imageData}` || '/default-image.jpg'}
          alt="img"
          loading="lazy"
        />
      </div>
    </div>
  ))
) : (
  <p>No images available</p>
)}
									</div>
								</div>
								<div className="swiper product-gallery-swiper thumb-swiper-lg swiper-vertical">
									<div className="swiper-wrapper">
										{products.images && products.images.length > 0 ? (
											products.images.map((image, index) => (
											<div className="swiper-slide" key={index}>
											<img src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_60,h_60/imgProduct/IMG/${image.imageData}`} alt="img"/>
											
										</div>
											))
										) : (
											  <p>No images available</p>
										
										)}
										{products.images && products.images.length > 0 ? (
											products.images.map((image, index) => (
											<div className="swiper-slide" key={index}>
											<img src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_60,h_60/imgProduct/IMG/${image.imageData}`} alt="img"/>
											
										</div>
											))
										) : (
											  <p>No images available</p>
										
										)}	{products.images && products.images.length > 0 ? (
											products.images.map((image, index) => (
											<div className="swiper-slide" key={index}>
											<img src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_60,h_60/imgProduct/IMG/${image.imageData}`} alt="img"/>
											
										</div>
											))
										) : (
											  <p>No images available</p>
										
										)}
									</div>
								</div>
							</div>	
						</div>	
					</div>
					<div className="col-xl-6 col-md-6">
						<div className="dz-product-detail style-2 p-t50">
							<div className="dz-content">
								<div className="dz-content-footer">
									<div className="dz-content-start">
										<span className="badge bg-purple mb-2">SALE {products.percentDiscount}% Off</span>
										<h4 className="title mb-1">{products.productTitle}</h4>
										<div className="review-num">
											<ul className="dz-rating me-2">
												<li>
													<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M6.74805 0.234375L8.72301 4.51608L13.4054 5.07126L9.9436 8.27267L10.8625 12.8975L6.74805 10.5944L2.63355 12.8975L3.5525 8.27267L0.090651 5.07126L4.77309 4.51608L6.74805 0.234375Z" fill="#FF8A00"></path>
													</svg>
												</li>	
												<li>
													<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M6.74805 0.234375L8.72301 4.51608L13.4054 5.07126L9.9436 8.27267L10.8625 12.8975L6.74805 10.5944L2.63355 12.8975L3.5525 8.27267L0.090651 5.07126L4.77309 4.51608L6.74805 0.234375Z" fill="#FF8A00"></path>
													</svg>
												</li>
												<li>
													<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M6.74805 0.234375L8.72301 4.51608L13.4054 5.07126L9.9436 8.27267L10.8625 12.8975L6.74805 10.5944L2.63355 12.8975L3.5525 8.27267L0.090651 5.07126L4.77309 4.51608L6.74805 0.234375Z" fill="#FF8A00"></path>
													</svg>
												</li>
												<li>
													<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path opacity="0.2" d="M6.74805 0.234375L8.72301 4.51608L13.4054 5.07126L9.9436 8.27267L10.8625 12.8975L6.74805 10.5944L2.63355 12.8975L3.5525 8.27267L0.090651 5.07126L4.77309 4.51608L6.74805 0.234375Z" fill="#5E626F"></path>
													</svg>

												</li>
												<li>
													<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path opacity="0.2" d="M6.74805 0.234375L8.72301 4.51608L13.4054 5.07126L9.9436 8.27267L10.8625 12.8975L6.74805 10.5944L2.63355 12.8975L3.5525 8.27267L0.090651 5.07126L4.77309 4.51608L6.74805 0.234375Z" fill="#5E626F"></path>
													</svg>
												</li>	
											</ul>
											<span className="text-secondary me-2">4.7 Rating</span>
											<a href="javascript:void(0);">(5 customer reviews)</a>
										</div>
									</div>
								</div>
								<p className="para-text">
									{products.productTitle}
								</p>
								
								<div className="meta-content m-b20">
									<span className="price-name">Price</span>
									<span className="price">${((products.productPrice * quantity) - ((products.productPrice * products.percentDiscount / 100) * quantity) ) .toFixed(2)} <del>${(products.productPrice * quantity).toFixed(2)}</del></span>
								</div>
								<div className="product-num gap-md-2 gap-xl-0">
									   <div className="btn-quantity light">
    <label className="form-label fw-bold">Quantity</label>
<div className="input-group light d-flex align-items-center">
  <button
    className="btn btn-dark rounded-circle p-0"
    style={{
      width: '40px',
      height: '40px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      minWidth: 'unset',
      flex: '0 0 auto',
      marginRight: '8px' // tạo khoảng cách bên phải nút -
    }}
    onClick={() => setQuantity(q => Math.max(1, q - 1))}
  >
    -
  </button>

  <input
    type="text"
    value={quantity}
    onChange={handleChange}
    style={{ width: '60px', textAlign: 'center' }}
  />

  <button
    className="btn btn-dark rounded-circle p-0"
    style={{
      width: '40px',
      height: '40px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      minWidth: 'unset',
      flex: '0 0 auto',
      marginLeft: '8px' // tạo khoảng cách bên trái nút +
    }}
    onClick={() => setQuantity(q => q + 1)}
  >
    +
  </button>
</div>

  </div>
									<div className="d-block">
										<label className="form-label">Size</label>
										<div className="btn-group product-size m-0">
  {products.sizes && products.sizes.length > 0 ? (
    <>
      {/* Hiển thị size đầu tiên */}
      <input
        type="radio"
        className="btn-check"
        name="btnradio2"
        id="btnradiol0"
      />
      <label className="btn" htmlFor="btnradiol0">
        {products.sizes[0].sizeName}
      </label>

      {/* Hiển thị các size tiếp theo */}
      {products.sizes.slice(1).map((size, index) => {
        const inputId = `btnradiol${index + 1}`;
        return (
          <React.Fragment key={index}>
            <input
              type="radio"
              className="btn-check"
              name="btnradio2"
              id={inputId}
            />
            <label className="btn" htmlFor={inputId}>
              {size.sizeName}
            </label>
          </React.Fragment>
        );
      })}
    </>
  ) : (
    <p>No size available</p>
  )}
</div>
									</div>
									<div className="meta-content">
										<label className="form-label">Color</label>
										<div className="d-flex align-items-center color-filter">
											{Array.isArray(colorAsinArray) && colorAsinArray.length > 0 ? (
  colorAsinArray.map((item, index) => (
    <div className="form-check" key={index}>
      <input
        className="form-check-input"
        type="radio"
        name="radioNoLabel"
        id={`radioNoLabel-${index}`} // id nên unique
        value={item.code_color}
        aria-label="..."
      />
      <span></span>
    </div>
  ))
) : (
  "khong co gi het"
)}

					
										</div>
									</div>
								</div>
								<div className="btn-group cart-btn">
									<a href="shop-cart.html" className="btn btn-secondary text-uppercase">Add To Cart</a>
									<a href="shop-wishlist.html" className="btn btn-outline-secondary btn-icon">
										<i className="icon feather icon-heart"></i>
										Add To Wishlist
									</a>
								</div>
								<div className="dz-info">
									<ul>
										<li><strong>SKU:</strong></li>
										<li>{products.asin}</li>
									</ul>
									<ul>
										<li><strong>Category:</strong></li>
										<li><a href={`/user/shop/shopWithCategory?salesRank=${products.salesRank}`}>{products.salesRank},</a></li>		
										{products !== null && (
									    <li><a href={`/user/shop/shopWithCategory?productType=${products.productType}`}> {products.productType}</a></li>														
										)}										
									</ul>
									<ul className="social-icon">
										<li><strong>Share:</strong></li>
										<li>
											<a href="https://www.facebook.com/dexignzone" target="_blank" rel="noreferrer">
												<i className="fa-brands fa-facebook-f"></i>
											</a>
										</li>
										<li>
											<a href="https://www.linkedin.com/showcase/3686700/admin/" target="_blank" rel="noreferrer">
												<i className="fa-brands fa-linkedin-in"></i>
											</a>
										</li>
										<li>
											<a href="https://www.instagram.com/dexignzone/" target="_blank" rel="noreferrer">
												<i className="fa-brands fa-instagram"></i>
											</a>
										</li>
										<li>
											<a href="https://twitter.com/dexignzones" target="_blank" rel="noreferrer">
												<i className="fa-brands fa-twitter"></i>
											</a>
										</li>
									</ul>
								</div>
								<ul className="d-md-flex d-none align-items-center">
									<li className="icon-bx-wraper style-3 me-xl-4 me-2">
										<div className="icon-bx">
											<i className="flaticon flaticon-ship"></i>
										</div>
										<div className="info-content">
											<span>FREE</span>
											<h6 className="dz-title mb-0">Shipping</h6>
										</div>
									</li>
									<li className="icon-bx-wraper style-3">
										<div className="icon-bx">
											<i className="flaticon-fast-delivery-1"></i></div>
										<div className="info-content">
											<span>Easy Returns</span>
											<h6 className="dz-title mb-0">30 Days</h6>
										</div>
									</li>
								</ul>
							</div>
							<div className="banner-social-media">
								<ul>
									<li>
										<a href="https://www.instagram.com/dexignzone/">Instagram</a>
									</li>
									<li>
										<a href="https://www.facebook.com/dexignzone">Facebook</a>
									</li>
									<li>
										<a href="https://twitter.com/dexignzones">twitter</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		
		<section className="content-inner-3 pb-0"> 
			<div className="container">
				<div className="product-description">
					<div className="dz-tabs">					
						<ul className="nav nav-tabs center" id="myTab1" role="tablist">
							<li className="nav-item" role="presentation">
								<button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Description</button>
							</li>
							<li className="nav-item" role="presentation">
								<button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Reviews (12)</button>
							</li>
						</ul>
						<div className="tab-content" id="myTabContent">
							<div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
								<div className="row">
									<div className="col-lg-6 m-lg-b0 m-md-b30">
										<div className="section-head style-2 d-block">
											<h2 className="title">Fits women</h2>
											<p>Designed for superior child comfort, OneFit™ provides extra rear-facing legroom and multiple recline options in every mode of use. With the widest range of height adjustments, the easy-adjust headrest system adjusts with the harness to grow with your child. OneFit™ accommodates tiny passengers from the very start with a removable head and body support insert for newborns weighing 5-11 lbs.		</p>
										</div>
										<div className="product-specification">
											<h4 className="specification-title">Specifications</h4>
											<ul>
												<li>Assembled Dimensions (L x W x H): <span>71.1 x 45.7 x 7.6 cm; 700 Grams</span></li>
												<li>Assembled Product Weight: <span>25 lbs.</span></li>
											</ul>
										</div>
										<ul className="specification-list m-b40">
											<li className="list-info">Manufacturer <span>Indra Hosiery Mills</span></li>
											<li className="list-info">ASIN<span>B07WK128569</span></li>
											<li className="list-info">Country of Origin<span>India</span></li>
											<li className="list-info">Department<span>Women</span></li>
											<li className="list-info">Included Components<span>Women's Jacket</span></li>
											<li className="list-info">Item Dimensions LxWxH<span> 71.1 x 45.7 x 7.6 Centimeters</span></li>
											<li className="list-info">Manufacture<span> Indra Hosiery Mills</span></li>
										</ul>
										<div className="product-media row g-xl-4 g-2 m-b40">
											<div className="col-md-3 col-3 col-sm-3 product-media-inner">
												<a href="shop-list.html" className="dz-media">
													<img src="../../assets/user/images/products/dress1.png" alt="/"/>
												</a>
											</div>
											<div className="col-md-3 col-3 col-sm-3 product-media-inner">
												<a href="shop-list.html" className="dz-media">
													<img src="../../assets/user/images/products/dress2.png" alt="/"/>
												</a>
											</div>
											<div className="col-md-3 col-3 col-sm-3 product-media-inner">
												<a href="shop-list.html" className="dz-media">
													<img src="../../assets/user/images/products/dress3.png" alt="/"/>
												</a>
											</div>
											<div className="col-md-3 col-3 col-sm-3 product-media-inner">
												<a href="shop-list.html" className="dz-media">
													<img src="../../assets/user/images/products/dress4.png" alt="/"/>
												</a>
											</div>
										</div>
										<div className="product-info">
											<div className="product-info-inner">
												<h4 className="info-title">Fabric Content</h4>
												<ul className="d-lg-flex d-block align-items-center">
													<li><h6>Seatpad: <span>100% Cotton</span></h6></li>
													<li><h6>Insert: <span>100% Cotton</span></h6></li>
												</ul>
											</div>
											<div className="product-info-inner">
												<h4 className="info-title">Chemical Statement</h4>
												<p className="info-text">The OneFit ClearTex All-In-One Car Seat is produced without the use of intentionally added fire retardant chemical treatments, PFAS, BPA and phthalates.	</p>
											</div>
										</div>
									</div>
									<div className="col-lg-6">
										<div className="row">
											<div className="col-lg-6 col-md-6 m-sm-b20 m-b30">
												<a href="shop-standard.html" className="about-product-wrapper">
													<div className="producṭ-content bg-light">
														<h4 className="product-title">All-in-One Dress</h4>
														<p className="product-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
													</div>
												</a>
											</div>
											<div className="col-lg-6 col-md-6 m-sm-b20 m-b30">
												<a href="shop-standard.html" className="about-product-wrapper">
													<div className="producṭ-content bg-light">
														<h4 className="product-title">Looking wise good</h4>
														<p className="product-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
													</div>
												</a>
											</div>
											<div className="col-lg-6 col-md-6 m-sm-b20 m-b30">
												<a href="shop-standard.html" className="about-product-wrapper">
													<div className="producṭ-content bg-light">
														<h4 className="product-title">100% Made In India</h4>
														<p className="product-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
													</div>
												</a>
											</div>
											<div className="col-lg-6 col-md-6 m-sm-b20 m-b30">
												<a href="shop-standard.html" className="about-product-wrapper">
													<div className="producṭ-content bg-light">
														<h4 className="product-title">100% Cotton</h4>
														<p className="product-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
													</div>
												</a>
											</div>
										</div>
										<div className="dz-product-media dz-media rounded"><img src="../../assets/user/images/shop/product-details/product-style-1/product-details-1.png" alt="/"/></div>
									</div>
								</div>
							</div>
							<div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
								<div className="clear" id="comment-list">
									<div className="post-comments comments-area style-1 clearfix">
										<h4 className="comments-title mb-2">Comments (02)</h4>
										<p className="dz-title-text">There are many variations of passages of Lorem Ipsum available.</p>
										<div id="comment">
											<ol className="comment-list">
												<li className="comment even thread-even depth-1 comment" id="comment-2">
													<div className="comment-body">
													  <div className="comment-author vcard">
															<img src="../../assets/user/images/profile4.jpg" alt="/" className="avatar"/>
															<cite className="fn">Michel Poe</cite> 
													  </div>
												  <div className="comment-content dz-page-text">
													 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
												  </div>
												  <div className="reply">
													 <a rel="nofollow" className="comment-reply-link" href="javascript:void(0);">Reply</a>
												  </div>
											   </div>
											   <ol className="children">
												  <li className="comment byuser comment-author-w3itexpertsuser bypostauthor odd alt depth-2 comment" id="comment-3">
													 <div className="comment-body" id="div-comment-3">
														<div className="comment-author vcard">
														   <img src="../../assets/user/images/profile3.jpg" alt="/" className="avatar"/>
														   <cite className="fn">Celesto Anderson</cite>
														</div>
														<div className="comment-content dz-page-text">
														   <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
														</div>
														<div className="reply">
														   <a className="comment-reply-link" href="javascript:void(0);"> Reply</a>
														</div>
													 </div>
												  </li>
											   </ol>
											</li>
											<li className="comment even thread-odd thread-alt depth-1 comment" id="comment-4">
												<div className="comment-body" id="div-comment-4">
													<div className="comment-author vcard">
														<img src="../../assets/user/images/profile2.jpg" alt="/" className="avatar"/>
														<cite className="fn">Monsur Rahman Lito</cite>
													</div>
													<div className="comment-content dz-page-text">
														<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
													</div>
													<div className="reply">
														<a className="comment-reply-link" href="javascript:void(0);"> Reply</a>
													</div>
												</div>
											</li>
										 </ol>
									  </div>
									<div className="default-form comment-respond style-1" id="respond">
										<h4 className="comment-reply-title mb-2" id="reply-title">Good Comments</h4>
										<p className="dz-title-text">There are many variations of passages of Lorem Ipsum available.</p>
										<div className="comment-form-rating d-flex">
											<label className="pull-left m-r10 m-b20  text-secondary">Your Rating</label>
											<div className="rating-widget">
												<div  className="rating-stars">
													<ul id="stars">
														<li className="star" title="Poor" data-value="1">
															<i className="fas fa-star fa-fw"></i>
														</li>
														<li className="star" title="Fair" data-value="2">
															<i className="fas fa-star fa-fw"></i>
														</li>
														<li className="star" title="Good" data-value="3">
															<i className="fas fa-star fa-fw"></i>
														</li>
														<li className="star" title="Excellent" data-value="4">
															<i className="fas fa-star fa-fw"></i>
														</li>
														<li className="star" title="WOW!!!" data-value="5">
															<i className="fas fa-star fa-fw"></i>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="clearfix">
											<form method="post" id="comments_form" className="comment-form" novalidate>
											   <p className="comment-form-author"><input id="name" placeholder="Author" name="author" type="text" value="" /></p>
											   <p className="comment-form-email"><input id="email" required="required" placeholder="Email" name="email" type="email" value="" /></p>
											   <p className="comment-form-comment"><textarea id="comments" placeholder="Type Comment Here" className="form-control4" name="comment" cols="45" rows="3" required="required"></textarea></p>
											   <p className="col-md-12 col-sm-12 col-xs-12 form-submit">
												  <button id="submit" type="submit" className="submit btn btn-secondary btnhover3 filled">
												  Submit Now
												  </button>
											   </p>
											</form>
										</div>
									  </div>
								   </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		
		<section className="content-inner-1  overflow-hidden">
			<div className="container">
				<div className="section-head style-2 d-md-flex align-items-center justify-content-between">
					<div className="left-content">
						<h2 className="title mb-0">Related products</h2>
					</div>
					<a href="shop-list.html" className="text-secondary font-14 d-flex align-items-center gap-1">See all products
						<i className="icon feather icon-chevron-right font-18"></i>
					</a>			
				</div>
				<div className="swiper-btn-center-lr">
					<div className="swiper swiper-four">
						<div className="swiper-wrapper">
							<div className="swiper-slide">
								<div className="shop-card style-1">
									<div className="dz-media">
										<img src="../../assets/user/images/shop/product/1.png" alt="img" />
										<div className="shop-meta">
														<a href="javascript:void(0);" className="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i className="fa-solid fa-eye d-md-none d-block"></i>
															<span className="d-md-block d-none">Quick View</span>
														</a>
														<div className="btn btn-primary meta-icon dz-wishicon">
															<i className="icon feather icon-heart dz-heart"></i>
															<i className="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div className="btn btn-primary meta-icon dz-carticon">
															<i className="flaticon flaticon-basket"></i>
															<i className="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
									</div>
									<div className="dz-content">
										<h5 className="title"><a href="shop-list.html">Cozy Knit Cardigan Sweater</a></h5>
										<h5 className="price">$80</h5>
									</div>
									<div className="product-tag">
										<span className="badge ">Get 20% Off</span>
									</div>
								</div>
							</div>
							<div className="swiper-slide">
								<div className="shop-card style-1">
									<div className="dz-media">
										<img src="../../assets/user/images/shop/product/2.png" alt="img" />
										<div className="shop-meta">
														<a href="javascript:void(0);" className="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i className="fa-solid fa-eye d-md-none d-block"></i>
															<span className="d-md-block d-none">Quick View</span>
														</a>
														<div className="btn btn-primary meta-icon dz-wishicon">
															<i className="icon feather icon-heart dz-heart"></i>
															<i className="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div className="btn btn-primary meta-icon dz-carticon">
															<i className="flaticon flaticon-basket"></i>
															<i className="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
									</div>
									<div className="dz-content">
										<h5 className="title"><a href="shop-list.html">Sophisticated Swagger Suit</a></h5>
										<h5 className="price">$80</h5>
									</div>
									<div className="product-tag">
										<span className="badge ">Get 20% Off</span>
									</div>
								</div>
							</div>
							<div className="swiper-slide">
								<div className="shop-card style-1">
									<div className="dz-media">
										<img src="../../assets/user/images/shop/product/3.png" alt="img" />
										<div className="shop-meta">
														<a href="javascript:void(0);" className="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i className="fa-solid fa-eye d-md-none d-block"></i>
															<span className="d-md-block d-none">Quick View</span>
														</a>
														<div className="btn btn-primary meta-icon dz-wishicon">
															<i className="icon feather icon-heart dz-heart"></i>
															<i className="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div className="btn btn-primary meta-icon dz-carticon">
															<i className="flaticon flaticon-basket"></i>
															<i className="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
									</div>
									<div className="dz-content">
										<h5 className="title"><a href="shop-list.html">classNameic Denim Skinny Jeans</a></h5>
										<h5 className="price">$80</h5>
									</div>
									<div className="product-tag">
										<span className="badge ">Get 20% Off</span>
									</div>
								</div>
							</div>
							<div className="swiper-slide">
								<div className="shop-card style-1">
									<div className="dz-media">
										<img src="../../assets/user/images/shop/product/4.png" alt="img" />
										<div className="shop-meta">
														<a href="javascript:void(0);" className="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i className="fa-solid fa-eye d-md-none d-block"></i>
															<span className="d-md-block d-none">Quick View</span>
														</a>
														<div className="btn btn-primary meta-icon dz-wishicon">
															<i className="icon feather icon-heart dz-heart"></i>
															<i className="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div className="btn btn-primary meta-icon dz-carticon">
															<i className="flaticon flaticon-basket"></i>
															<i className="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
									</div>
									<div className="dz-content">
										<h5 className="title"><a href="shop-list.html">Athletic Mesh Sports Leggings</a></h5>
										<h5 className="price">$80</h5>
									</div>
									<div className="product-tag">
										<span className="badge ">Get 20% Off</span>
									</div>
								</div>
							</div>
							<div className="swiper-slide">
								<div className="shop-card style-1">
									<div className="dz-media">
										<img src="../../assets/user/images/shop/product/5.png" alt="img" />
										<div className="shop-meta">
														<a href="javascript:void(0);" className="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i className="fa-solid fa-eye d-md-none d-block"></i>
															<span className="d-md-block d-none">Quick View</span>
														</a>
														<div className="btn btn-primary meta-icon dz-wishicon">
															<i className="icon feather icon-heart dz-heart"></i>
															<i className="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div className="btn btn-primary meta-icon dz-carticon">
															<i className="flaticon flaticon-basket"></i>
															<i className="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
									</div>
									<div className="dz-content">
										<h5 className="title"><a href="shop-list.html">Vintage Denim Overalls Shorts</a></h5>
										<h5 className="price">$80</h5>
									</div>
									<div className="product-tag">
										<span className="badge ">Get 20% Off</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="pagination-align">
						<div className="tranding-button-prev btn-prev">
							<i className="flaticon flaticon-left-chevron"></i>
						</div>
						<div className="tranding-button-next btn-next">
							<i className="flaticon flaticon-chevron"></i>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>

        {/* Footer (đã được xử lý trong App.js) */}
		
         <ScrollTopButton/>
        <QuickViewModal />
    </>
  );
}

export default ProductDetail;