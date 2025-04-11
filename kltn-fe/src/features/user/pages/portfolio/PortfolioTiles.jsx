// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function PortfolioTiles() {
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
		<div className="dz-bnr-inr bg-secondary overlay-black-light" style={{ backgroundImage: `url('../assets/user/images/background/bg1.jpg')` }}>
			<div className="container">
				<div className="dz-bnr-inr-entry">
					<h1>Portfolio Tiles</h1>
					<nav aria-label="breadcrumb" className="breadcrumb-row">
						<ul className="breadcrumb">
							<li className="breadcrumb-item"><a href="/"> Home</a></li>
							<li className="breadcrumb-item">Portfolio Tiles</li>
						</ul>
					</nav>
				</div>
			</div>	
		</div>
		
		<section className="content-inner pt-0 z-index-unset overflow-hidden">
			<div className="site-filters style-2 clearfix center">
				<ul className="filters" data-bs-toggle="buttons">
					<li data-filter=".All" className="btn active">
						<a href="javascript:void(0);">All</a> 
					</li>
					<li data-filter=".Dresses" className="btn">
						<a href="javascript:void(0);">Dresses</a> 
					</li>
					<li data-filter=".Tops" className="btn">
						<a href="javascript:void(0);">Tops</a> 
					</li>
					<li data-filter=".Outerwear" className="btn">
						<a href="javascript:void(0);">Outerwear</a> 
					</li>
					<li data-filter=".jacket" className="btn">
						<a href="javascript:void(0);">Jacket</a> 
					</li>
					<li data-filter=".Formal-wear" className="btn">
						<a href="javascript:void(0);">Formal wear</a> 
					</li>
				</ul>
			</div>
			<div className="container">
				<div className="clearfix">
					<ul id="masonry" className="lightgallery row">
						<li className="card-container col-xl-4 col-lg-4 col-md-6 m-b30 All Tops">
							<div className="portfolio-box style-1">
								<div className="dz-media">
									<a href="portfolio-details-1.html">
										<img src="../../assets/user/images/portfolio/portfolio1/pic1.jpg" alt="/" />
									</a>	
								</div>
								<div className="dz-content">
									<div className="product-tag">
										<a href="portfolio-details-1.html">
											<span className="badge badge-primary">Party Blouse</span>
										</a>
									</div>
									<h4 className="title"><a href="portfolio-details-1.html">Satin Wrap Party Blouse</a></h4>
								</div>
							</div>
						</li>
						<li className="card-container col-xl-4 col-lg-4 col-md-6 m-b30 All Outerwear Formal-wear">
							<div className="portfolio-box style-1">
								<div className="dz-media">
									<a href="portfolio-details-1.html">	
										<img src="../../assets/user/images/portfolio/portfolio1/pic2.jpg" alt="/" />
									</a>
								</div>
								<div className="dz-content">
									<div className="product-tag">
										<a href="portfolio-details-1.html">	
											<span className="badge badge-primary">Jogger Pants</span>
										</a>
									</div>
									<h4 className="title"><a href="portfolio-details-2.html">Comfy Lounge Jogger Pants</a></h4>
								</div>
							</div>
						</li>
						<li className="card-container col-xl-4 col-lg-4 col-md-6 m-b30 All Dresses ">
							<div className="portfolio-box style-1">
								<div className="dz-media">
									<a href="portfolio-details-1.html">	
										<img src="../../assets/user/images/portfolio/portfolio1/pic3.jpg" alt="/" />
									</a>
								</div>
								<div className="dz-content">
									<div className="product-tag">
										<a href="portfolio-details-1.html">	
											<span className="badge badge-primary">Gear Collection</span>
										</a>	
									</div>
									<h4 className="title"><a href="portfolio-details-3.html">Hiking Outdoor Gear Collection</a></h4>
								</div>
							</div>
						</li>
						<li className="card-container col-xl-4 col-lg-4 col-md-6 m-b30 All Tops">
							<div className="portfolio-box style-1">
								<div className="dz-media">
									<a href="portfolio-details-1.html">	
										<img src="../../assets/user/images/portfolio/portfolio1/pic4.jpg" alt="/" />
									</a>
								</div>
								<div className="dz-content">
									<div className="product-tag">
										<a href="portfolio-details-1.html">	
											<span className="badge badge-primary">Overalls </span>
										</a>
									</div>
									<h4 className="title"><a href="portfolio-details-4.html">Vintage Denim Overalls Shorts</a></h4>
								</div>
							</div>
						</li>
						<li className="card-container col-xl-4 col-lg-4 col-md-6 m-b30 All Outerwear jacket Formal-wear">
							<div className="portfolio-box style-1">
								<div className="dz-media">
									<a href="portfolio-details-1.html">	
										<img src="../../assets/user/images/portfolio/portfolio1/pic5.jpg" alt="/" />
									</a>
								</div>
								<div className="dz-content">
									<div className="product-tag">
										<a href="portfolio-details-1.html">
											<span className="badge badge-primary">Winter Coat</span>
										</a>
									</div>
									<h4 className="title"><a href="portfolio-details-5.html">Plaid Wool Winter Coat</a></h4>
								</div>
							</div>
						</li>
						<li className="card-container col-xl-4 col-lg-4 col-md-6 m-b30 All Dresses jacket">
							<div className="portfolio-box style-1">
								<div className="dz-media">
									<a href="portfolio-details-1.html">	
										<img src="../../assets/user/images/portfolio/portfolio1/pic6.jpg" alt="/" />
									</a>
								</div>
								<div className="dz-content">
									<div className="product-tag">
										<a href="portfolio-details-1.html">
											<span className="badge badge-primary">Leggings</span>
										</a>
									</div>
									<h4 className="title"><a href="portfolio-details-1.html">Athletic Mesh Sports Leggings</a></h4>
								</div>
							</div>
						</li>
					</ul>		
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

export default PortfolioTiles;