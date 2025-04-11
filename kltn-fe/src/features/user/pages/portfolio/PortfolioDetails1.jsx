// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function PortfolioDetails1() {
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
		<div className="dz-bnr-inr bg-secondary">
			<div className="container">
				<div className="dz-bnr-inr-entry text-start">
					<h1>Make your fashion look <br /> mire charming</h1>
					<nav aria-label="breadcrumb" className="breadcrumb-row">
						<ul className="breadcrumb">
							<li className="breadcrumb-item"><a href="/"> Home</a></li>
							<li className="breadcrumb-item">Portfolio Details 1</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
		
		<section className="content-inner portfolio-detail-1" id="lightgallery">
			<div className="container">
				<div className="row">
					<div className="col-lg-8 pe-xl-4 pe-lg-4 pe-auto">
						<div className="row">
							<div className="col-xl-6 col-md-6 col-6 m-b30">
								<div className="dz-box portfolio-bx style-1">
									<div className="dz-media rounded">
										<a className="mfp-link lg-item" href="../assets/user/images/portfolio/details/portfolio-detail-1/pic1.jpg" data-src="../assets/user/images/portfolio/details/portfolio-detail-1/pic1.jpg">
											<i className="feather icon-maximize dz-maximize top-right"></i>
										</a>
										<img src="../../assets/user/images/portfolio/details/portfolio-detail-1/pic1.jpg" alt="img" />
									</div>
								</div>
							</div>
							<div className="col-xl-6 col-md-6 col-6 m-b30">
								<div className="dz-box portfolio-bx style-1">
									<div className="dz-media rounded">
										<a className="mfp-link lg-item" href="../assets/user/images/portfolio/details/portfolio-detail-1/pic2.jpg" data-src="../assets/user/images/portfolio/details/portfolio-detail-1/pic2.jpg">
											<i className="feather icon-maximize dz-maximize top-right"></i>
										</a>
										<img src="../../assets/user/images/portfolio/details/portfolio-detail-1/pic2.jpg" alt="img" />
									</div>
								</div>
							</div>
							<div className="col-xl-12 m-b30">
								<div className="dz-detail-box">
									<h2>Research & Planning</h2>
									<p className="m-b30">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p>
									
									<p className="mb-0">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. </p>
								</div>
							</div>
							<div className="col-xl-6 col-md-6 col-6 m-b30">
								<div className="dz-box portfolio-bx style-1">
									<div className="dz-media rounded">
										<a className="mfp-link lg-item" href="../assets/user/images/portfolio/details/portfolio-detail-1/pic3.jpg" data-src="../assets/user/images/portfolio/details/portfolio-detail-1/pic3.jpg">
											<i className="feather icon-maximize dz-maximize top-right"></i>
										</a>
										<img src="../../assets/user/images/portfolio/details/portfolio-detail-1/pic3.jpg" alt="img" />
									</div>
								</div>
							</div>
							<div className="col-xl-6 col-md-6 col-6 m-b30">
								<div className="dz-box portfolio-bx style-1">
									<div className="dz-media rounded">
										<a className="mfp-link lg-item" href="../assets/user/images/portfolio/details/portfolio-detail-1/pic4.jpg" data-src="../assets/user/images/portfolio/details/portfolio-detail-1/pic4.jpg">
											<i className="feather icon-maximize dz-maximize top-right"></i>
										</a>
										<img src="../../assets/user/images/portfolio/details/portfolio-detail-1/pic4.jpg" alt="img" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-4">
						<div className="detail-list-box style-1 sticky-top">
							<ul>
								<li>
									<span className="title">Client</span>
									<span>Martin Stewart</span>
								</li>
								<li>
									<span className="title">Seatpad</span>
									<span>100% Polyester</span>
								</li>
								<li>
									<span className="title">Location</span>
									<span>London, UK</span>
								</li>
								<li>
									<span className="title">Shipping</span>
									<span>Free Shipping</span>
								</li>
								<li>
									<span className="title">Category</span>
									<span>Child Trolly</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
		
		<div className="container">
			<div className="row">
				<div className="col-xl-12">
					<div className="post-pagination style-1">
						<div className="post-prev">
							<a href="portfolio-details-5.html" className="post-inner">
								<div className="inner-icon">
									<i className="icon feather icon-chevron-left"></i>
								</div>
								<div className="dz-media me-3">
									<img src="../../assets/user/images/portfolio/details/portfolio-detail-1/post-pagination/post-1.jpg" alt="" />
								</div>
								<div className="dz-info m-0">
									<span>Swagger</span>
									<h6 className="m-b0">Sophisticated Swagger Suit</h6>
								</div>
							</a>
						</div>
						<div className="post-next">
							<a href="portfolio-details-2.html" className="post-inner">
								<div className="dz-info">
									<span>Sweater</span>
									<h6 className="m-b0">Cozy Knit Cardigan Sweater</h6>
								</div>
								<div className="dz-media">
									<img src="../../assets/user/images/portfolio/details/portfolio-detail-1/post-pagination/post-2.jpg" alt="" />
								</div>
								<div className="inner-icon">
									<i className="icon feather icon-chevron-right"></i>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<section className="content-inner-1 overflow-hidden releted-portfolio">
			<div className="container">
				<div className="section-head style-2">
					<div className="left-content">
						<h2 className="title mb-0">Related Projects</h2>
					</div>			
				</div>
				<div className="swiper-btn-center-lr">
					<div className="swiper swiper-four">
						<div className="swiper-wrapper">
							<div className="swiper-slide">
								<div className="portfolio-box">
									<div className="dz-media">
										<a href="portfolio-details-1.html">
											<img src="../../assets/user/images/portfolio/details/portfolio-detail-1/related-img/pic1.jpg" alt="/" />
										</a>	
									</div>
									<div className="dz-content">
										<div className="product-tag">
											<a href="portfolio-details-1.html">
												<span className="badge badge-primary">Sweater</span>
											</a>
										</div>
										<h5 className="title"><a href="portfolio-details-1.html">Cozy Knit Cardigan Sweater</a></h5>
									</div>
								</div>
							</div>
							<div className="swiper-slide">
								<div className="portfolio-box">
									<div className="dz-media">
										<a href="portfolio-details-1.html">
											<img src="../../assets/user/images/portfolio/details/portfolio-detail-1/related-img/pic2.jpg" alt="/" />
										</a>	
									</div>
									<div className="dz-content">
										<div className="product-tag">
											<a href="portfolio-details-1.html">
												<span className="badge badge-primary">Suit</span>
											</a>
										</div>
										<h5 className="title"><a href="portfolio-details-1.html">Sophisticated Swagger Suit</a></h5>
									</div>
								</div>
							</div>
							<div className="swiper-slide">
								<div className="portfolio-box">
									<div className="dz-media">
										<a href="portfolio-details-1.html">
											<img src="../../assets/user/images/portfolio/details/portfolio-detail-1/related-img/pic3.jpg" alt="/" />
										</a>	
									</div>
									<div className="dz-content">
										<div className="product-tag">
											<a href="portfolio-details-1.html">
												<span className="badge badge-primary">Jeans</span>
											</a>
										</div>
										<h5 className="title"><a href="portfolio-details-1.html">classNameic Denim Skinny Jeans</a></h5>
									</div>
								</div>
							</div>
							<div className="swiper-slide">
								<div className="portfolio-box">
									<div className="dz-media">
										<a href="portfolio-details-1.html">
											<img src="../../assets/user/images/portfolio/details/portfolio-detail-1/related-img/pic4.jpg" alt="/" />
										</a>	
									</div>
									<div className="dz-content">
										<div className="product-tag">
											<a href="portfolio-details-1.html">
												<span className="badge badge-primary">Leggings</span>
											</a>
										</div>
										<h5 className="title"><a href="portfolio-details-1.html">Athletic Mesh Sports Leggings</a></h5>
									</div>
								</div>
							</div>
							<div className="swiper-slide">
								<div className="portfolio-box">
									<div className="dz-media">
										<a href="portfolio-details-1.html">
											<img src="../../assets/user/images/portfolio/details/portfolio-detail-1/related-img/pic1.jpg" alt="/" />
										</a>	
									</div>
									<div className="dz-content">
										<div className="product-tag">
											<a href="portfolio-details-1.html">
												<span className="badge badge-primary">Sweater</span>
											</a>
										</div>
										<h5 className="title"><a href="portfolio-details-1.html">Cozy Knit Cardigan Sweater</a></h5>
									</div>
								</div>
							</div>
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

export default PortfolioDetails1;