// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function ShopWithCategory() {
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

        <div class="page-content bg-light">
		{/* <!--Banner Start--> */}
		<div class="dz-bnr-inr bg-secondary overlay-black-light" style={{ 
  backgroundImage: "url(images/background/bg1.jpg)"
}}>
			<div class="container">
				<div class="dz-bnr-inr-entry">
					<h1>Shop With Category</h1>
					<nav aria-label="breadcrumb" class="breadcrumb-row">
						<ul class="breadcrumb">
							<li class="breadcrumb-item"><a href="index.html"> Home</a></li>
							<li class="breadcrumb-item">Shop With Category</li>
						</ul>
					</nav>
				</div>
			</div>	
		</div>
		{/* <!--Banner End--> */}
		
		<section class="content-inner-3 pt-3 z-index-unset">
			<div class="container-fluid">
				<div class="row mt-xl-2 mt-0">
					<div class="col-20 col-xl-3">
						<div class="sticky-xl-top">	
							<a href="javascript:void(0);" class="panel-close-btn">																	
								<svg width="35" height="35" viewBox="0 0 51 50" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M37.748 12.5L12.748 37.5" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M12.748 12.5L37.748 37.5" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</a>
							<div class="shop-filter">
								<aside>
									<div class="d-flex align-items-center justify-content-between m-b30">
										<h6 class="title mb-0 fw-normal">
											<svg class="me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="20" height="20"><g id="Layer_30" data-name="Layer 30"><path d="M2.54,5H15v.5A1.5,1.5,0,0,0,16.5,7h2A1.5,1.5,0,0,0,20,5.5V5h2.33a.5.5,0,0,0,0-1H20V3.5A1.5,1.5,0,0,0,18.5,2h-2A1.5,1.5,0,0,0,15,3.5V4H2.54a.5.5,0,0,0,0,1ZM16,3.5a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v2a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5Z"></path><path d="M22.4,20H18v-.5A1.5,1.5,0,0,0,16.5,18h-2A1.5,1.5,0,0,0,13,19.5V20H2.55a.5.5,0,0,0,0,1H13v.5A1.5,1.5,0,0,0,14.5,23h2A1.5,1.5,0,0,0,18,21.5V21h4.4a.5.5,0,0,0,0-1ZM17,21.5a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5v-2a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5Z"></path><path d="M8.5,15h2A1.5,1.5,0,0,0,12,13.5V13H22.45a.5.5,0,1,0,0-1H12v-.5A1.5,1.5,0,0,0,10.5,10h-2A1.5,1.5,0,0,0,7,11.5V12H2.6a.5.5,0,1,0,0,1H7v.5A1.5,1.5,0,0,0,8.5,15ZM8,11.5a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v2a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5Z"></path></g></svg>
											Filter
										</h6>
									</div>
									<div class="widget widget_search">
										<div class="form-group">
											<div class="input-group">
												<input name="dzSearch" required="required" type="search" class="form-control" placeholder="Search Product"/>
												<div class="input-group-addon">
													<button name="submit" value="Submit" type="submit" class="btn">
														<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#0D775E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
															<path d="M17.5 17.5L13.875 13.875" stroke="#0D775E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
														</svg>
													</button>
												</div>
											</div>
										</div>
									</div>
									<div class="widget">
										<h6 class="widget-title">Price</h6>
										<div class="price-slide range-slider">
											<div class="price">
												<div class="range-slider style-1">
													<div id="slider-tooltips2" class="mb-3"></div>
													<span class="example-val" id="slider-margin-value-min2"></span>
													<span class="example-val" id="slider-margin-value-max2"></span>
												</div>
											</div>
										</div>
									</div>
									<div class="widget">
										<h6 class="widget-title">Color</h6>
										<div class="d-flex align-items-center flex-wrap color-filter ps-2">
											<div class="form-check">
												<input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel01" value="#000000" aria-label="..." checked />
												<span></span>
											</div>
											<div class="form-check">
												<input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel02" value="#9BD1FF" aria-label="..." />
												<span></span>
											</div>
											<div class="form-check">
												<input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel03" value="#21B290" aria-label="..."/>
												<span></span>
											</div>
											<div class="form-check">
												<input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel04" value="#FEC4C4" aria-label="..."/>
												<span></span>
											</div>
											<div class="form-check">
												<input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel05" value="#FF7354" aria-label="..."/>
												<span></span>
											</div>
											<div class="form-check">
												<input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel06" value="#51EDC8" aria-label="..."/>
												<span></span>
											</div>
											<div class="form-check">
												<input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel07" value="#B77CF3" aria-label="..."/>
												<span></span>
											</div>
											<div class="form-check">
												<input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel08" value="#FF4A76" aria-label="..."/>
												<span></span>
											</div>
											<div class="form-check">
												<input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel09" value="#3E68FF" aria-label="..."/>
												<span></span>
											</div>
											<div class="form-check">
												<input class="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel20" value="#7BEF68" aria-label="..."/>
												<span></span>
											</div>
										</div>
									</div>
									<div class="widget">
										<h6 class="widget-title">Size</h6>
										<div class="btn-group product-size">
											<input type="radio" class="btn-check" name="btnradio1" id="btnradio101" checked="" />
											<label class="btn" for="btnradio101">4</label>

											<input type="radio" class="btn-check" name="btnradio1" id="btnradiol02" />
											<label class="btn" for="btnradiol02">6</label>

											<input type="radio" class="btn-check" name="btnradio1" id="btnradiol03" />
											<label class="btn" for="btnradiol03">8</label>
										  
											<input type="radio" class="btn-check" name="btnradio1" id="btnradiol04" />
											<label class="btn" for="btnradiol04">10</label>
											
											<input type="radio" class="btn-check" name="btnradio1" id="btnradiol05" />
											<label class="btn" for="btnradiol05">12</label>
											
											<input type="radio" class="btn-check" name="btnradio1" id="btnradiol06" />
											<label class="btn" for="btnradiol06">14</label>
											
											<input type="radio" class="btn-check" name="btnradio1" id="btnradiol07" />
											<label class="btn" for="btnradiol07">16</label>
											
											<input type="radio" class="btn-check" name="btnradio1" id="btnradiol08" />
											<label class="btn" for="btnradiol08">18</label>
											
											<input type="radio" class="btn-check" name="btnradio1" id="btnradiol09" />
											<label class="btn" for="btnradiol09">20</label>
										</div>
									</div>
									
									<div class="widget widget_categories">
										<h6 class="widget-title">Category</h6>
										<ul>
											<li class="cat-item cat-item-26"><a href="blog-category.html">Dresses</a> (10)</li>
											<li class="cat-item cat-item-36"><a href="blog-category.html">Top &amp; Blouses</a> (5)</li>
											<li class="cat-item cat-item-43"><a href="blog-category.html">Boots</a> (17)</li>
											<li class="cat-item cat-item-27"><a href="blog-category.html">Jewelry</a> (13)</li>
											<li class="cat-item cat-item-40"><a href="blog-category.html">Makeup</a> (06)</li> 
											<li class="cat-item cat-item-40"><a href="blog-category.html">Fragrances</a> (17)</li> 
											<li class="cat-item cat-item-40"><a href="blog-category.html">Shaving &amp; Grooming</a> (13)</li> 
											<li class="cat-item cat-item-43"><a href="blog-category.html">Jacket</a> (06)</li> 
											<li class="cat-item cat-item-36"><a href="blog-category.html">Coat</a> (22)</li> 
										</ul>
									</div>
									
									<div class="widget widget_tag_cloud">
										<h6 class="widget-title">Tags</h6>
										<div class="tagcloud"> 
											<a href="blog-tag.html">Vintage </a>
											<a href="blog-tag.html">Wedding</a>
											<a href="blog-tag.html">Cotton</a>
											<a href="blog-tag.html">Linen</a>
											<a href="blog-tag.html">Navy</a>
											<a href="blog-tag.html">Urban</a>
											<a href="blog-tag.html">Business Meeting</a>
											<a href="blog-tag.html">Formal</a>
										</div>
									</div>
									<a href="javascript:void(0);" class="btn btn-sm font-14 btn-secondary btn-sharp">RESET</a>
								</aside>
							</div>
						</div>
					</div>
					<div class="col-80 col-xl-9">
						<h4 class="mb-3">Category</h4>
						<div class="row">
							<div class="col-xl-12">
								<div class="swiper category-swiper">
									<div class="swiper-wrapper">
										<div class="swiper-slide">
											<div class="shop-card">
												<div class="dz-media rounded">
													<img src="../../assets/user/images/shop/product/1.png" alt="image" />
												</div>
												<div class="dz-content">
													<h6 class="title"><a href="shop-list.html">SilkBliss Dress</a></h6>
												</div>
											</div>
										</div>
										<div class="swiper-slide">
											<div class="shop-card">
												<div class="dz-media rounded">
													<img src="../../assets/user/images/shop/product/3.png" alt="image" />
												</div>
												<div class="dz-content">
													<h6 class="title"><a href="shop-list.html">GlamPants</a></h6>
												</div>
											</div>
										</div>
										<div class="swiper-slide">
											<div class="shop-card">
												<div class="dz-media rounded">
													<img src="../../assets/user/images/shop/product/4.png" alt="image"/>
												</div>
												<div class="dz-content">
													<h6 class="title"><a href="shop-list.html">ComfyLeggings</a></h6>
												</div>
											</div>
										</div>
										<div class="swiper-slide">
											<div class="shop-card">
												<div class="dz-media rounded">
													<img src="../../assets/user/images/shop/product/2.png" alt="image"/>
												</div>
												<div class="dz-content">
													<h6 class="title"><a href="shop-list.html">ClassicCapri</a></h6>
												</div>
											</div>
										</div>
										<div class="swiper-slide">
											<div class="shop-card">
												<div class="dz-media rounded">
													<img src="../../assets/user/images/shop/product/3.png" alt="image"/>
												</div>
												<div class="dz-content">
													<h6 class="title"><a href="shop-list.html">DapperCoat</a></h6>
												</div>
											</div>
										</div>
										<div class="swiper-slide">
											<div class="shop-card">
												<div class="dz-media rounded">
													<img src="../../assets/user/images/shop/product/4.png" alt="image"/>
												</div>
												<div class="dz-content">
													<h6 class="title"><a href="shop-list.html">ComfyLeggings</a></h6>
												</div>
											</div>
										</div>
										<div class="swiper-slide">
											<div class="shop-card">
												<div class="dz-media rounded">
													<img src="../../assets/user/images/shop/product/2.png" alt="image"/>	
												</div>
												<div class="dz-content">
													<h6 class="title"><a href="shop-list.html">DenimDream Jeans</a></h6>
												</div>
											</div>
										</div>
										<div class="swiper-slide">
											<div class="shop-card">
												<div class="dz-media rounded">
													<img src="../../assets/user/images/shop/product/4.png" alt="image"/>	
												</div>
												<div class="dz-content">
													<h6 class="title"><a href="shop-list.html">SilkBliss Dress</a></h6>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="filter-wrapper border-top p-t20">
							<div class="filter-left-area">								
								<ul class="filter-tag">
									<li>
										<a href="javascript:void(0);" class="tag-btn">Dresses 
											<i class="icon feather icon-x tag-close"></i>
										</a>
									</li>
									<li>
										<a href="javascript:void(0);" class="tag-btn">Tops
											<i class="icon feather icon-x tag-close"></i>
										</a>
									</li>
									<li>
										<a href="javascript:void(0);" class="tag-btn">Outerwear 
											<i class="icon feather icon-x tag-close"></i>
										</a>
									</li>
								</ul>
								<span>Showing 1–5 Of 50 Results</span>
							</div>
							<div class="filter-right-area">
								<a href="javascript:void(0);" class="panel-btn">
									<svg class="me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="20" height="20"><g id="Layer_28" data-name="Layer 28"><path d="M2.54,5H15v.5A1.5,1.5,0,0,0,16.5,7h2A1.5,1.5,0,0,0,20,5.5V5h2.33a.5.5,0,0,0,0-1H20V3.5A1.5,1.5,0,0,0,18.5,2h-2A1.5,1.5,0,0,0,15,3.5V4H2.54a.5.5,0,0,0,0,1ZM16,3.5a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v2a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5Z"></path><path d="M22.4,20H18v-.5A1.5,1.5,0,0,0,16.5,18h-2A1.5,1.5,0,0,0,13,19.5V20H2.55a.5.5,0,0,0,0,1H13v.5A1.5,1.5,0,0,0,14.5,23h2A1.5,1.5,0,0,0,18,21.5V21h4.4a.5.5,0,0,0,0-1ZM17,21.5a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5v-2a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5Z"></path><path d="M8.5,15h2A1.5,1.5,0,0,0,12,13.5V13H22.45a.5.5,0,1,0,0-1H12v-.5A1.5,1.5,0,0,0,10.5,10h-2A1.5,1.5,0,0,0,7,11.5V12H2.6a.5.5,0,1,0,0,1H7v.5A1.5,1.5,0,0,0,8.5,15ZM8,11.5a.5.5,0,0,1,.5-.5h2a.5.5,0,0,1,.5.5v2a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1-.5-.5Z"></path></g></svg>
									Filter
								</a>
								<div class="form-group">
									<select class="default-select">
										<option>Latest</option>
										<option>Popularity</option>
										<option>Average rating</option>
										<option>Latest</option>
										<option>Low to high</option>
										<option>high to Low</option>
									</select>
								</div>
								<div class="form-group Category">
									<select class="default-select">
										<option>Products</option>
										<option>9 Products</option>
										<option>12 Products</option>
										<option>14 Products</option>
										<option>18 Products</option>
										<option>24 Products</option>
									</select>
								</div>
								<div class="shop-tab">
									<ul class="nav" role="tablist" id="dz-shop-tab">
										<li class="nav-item" role="presentation">
											<a href="shop-with-category.html#tab-list-list" class="nav-link active" id="tab-list-list-btn" data-bs-toggle="pill" data-bs-target="#tab-list-list" role="tab" aria-controls="tab-list-list" aria-selected="true">
												<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
													<g clip-path="url(#clip0_121_190)">
													<path d="M42.667 373.333H96C119.564 373.333 138.667 392.436 138.667 416V469.333C138.667 492.898 119.564 512 96 512H42.667C19.103 512 0 492.898 0 469.333V416C0 392.436 19.103 373.333 42.667 373.333Z" fill="black"></path>
													<path d="M42.667 186.667H96C119.564 186.667 138.667 205.77 138.667 229.334V282.667C138.667 306.231 119.564 325.334 96 325.334H42.667C19.103 325.333 0 306.231 0 282.667V229.334C0 205.769 19.103 186.667 42.667 186.667Z" fill="black"></path>
													<path d="M42.667 0H96C119.564 0 138.667 19.103 138.667 42.667V96C138.667 119.564 119.564 138.667 96 138.667H42.667C19.103 138.667 0 119.564 0 96V42.667C0 19.103 19.103 0 42.667 0Z" fill="black"></path>
													<path d="M230.565 373.333H468.437C492.682 373.333 512.336 392.436 512.336 416V469.333C512.336 492.897 492.682 512 468.437 512H230.565C206.32 512 186.666 492.898 186.666 469.333V416C186.667 392.436 206.32 373.333 230.565 373.333Z" fill="black"></path>
													<path d="M230.565 186.667H468.437C492.682 186.667 512.336 205.77 512.336 229.334V282.667C512.336 306.231 492.682 325.334 468.437 325.334H230.565C206.32 325.334 186.666 306.231 186.666 282.667V229.334C186.667 205.769 206.32 186.667 230.565 186.667Z" fill="black"></path>
													<path d="M230.565 0H468.437C492.682 0 512.336 19.103 512.336 42.667V96C512.336 119.564 492.682 138.667 468.437 138.667H230.565C206.32 138.667 186.666 119.564 186.666 96V42.667C186.667 19.103 206.32 0 230.565 0Z" fill="black"></path>
													</g>
													<defs>
													<clipPath id="clip0_121_190">
													<rect width="512" height="512" fill="white"></rect>
													</clipPath>
													</defs>
												</svg>
											</a>
										</li>
										<li class="nav-item" role="presentation">
											<a href="shop-with-category.html#tab-list-column" class="nav-link" id="tab-list-column-btn" data-bs-toggle="pill" data-bs-target="#tab-list-column" role="tab" aria-controls="tab-list-column" aria-selected="false">
												<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: "new 0 0 512 512" }} width="512" height="512">
													<g>
														<path d="M85.333,0h64c47.128,0,85.333,38.205,85.333,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   C38.205,234.667,0,196.462,0,149.333v-64C0,38.205,38.205,0,85.333,0z"></path>
														<path d="M362.667,0h64C473.795,0,512,38.205,512,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   c-47.128,0-85.333-38.205-85.333-85.333v-64C277.333,38.205,315.538,0,362.667,0z"></path>
														<path d="M85.333,277.333h64c47.128,0,85.333,38.205,85.333,85.333v64c0,47.128-38.205,85.333-85.333,85.333h-64   C38.205,512,0,473.795,0,426.667v-64C0,315.538,38.205,277.333,85.333,277.333z"></path>
														<path d="M362.667,277.333h64c47.128,0,85.333,38.205,85.333,85.333v64C512,473.795,473.795,512,426.667,512h-64   c-47.128,0-85.333-38.205-85.333-85.333v-64C277.333,315.538,315.538,277.333,362.667,277.333z"></path>
													</g>
												</svg>
											</a>
										</li>
										<li class="nav-item" role="presentation">
											<a href="shop-with-category.html#tab-list-grid" class="nav-link" id="tab-list-grid-btn" data-bs-toggle="pill" data-bs-target="#tab-list-grid" role="tab" aria-controls="tab-list-grid" aria-selected="false">
												<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_2" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: "new 0 0 512 512" }} width="512" height="512"><g>
													<path d="M42.667,373.333H96c23.564,0,42.667,19.103,42.667,42.667v53.333C138.667,492.898,119.564,512,96,512H42.667   C19.103,512,0,492.898,0,469.333V416C0,392.436,19.103,373.333,42.667,373.333z"></path>
													<path d="M416,373.333h53.333C492.898,373.333,512,392.436,512,416v53.333C512,492.898,492.898,512,469.333,512H416   c-23.564,0-42.667-19.102-42.667-42.667V416C373.333,392.436,392.436,373.333,416,373.333z"></path>
													<path d="M42.667,186.667H96c23.564,0,42.667,19.103,42.667,42.667v53.333c0,23.564-19.103,42.667-42.667,42.667H42.667   C19.103,325.333,0,306.231,0,282.667v-53.333C0,205.769,19.103,186.667,42.667,186.667z"></path>
													<path d="M416,186.667h53.333c23.564,0,42.667,19.103,42.667,42.667v53.333c0,23.564-19.102,42.667-42.667,42.667H416   c-23.564,0-42.667-19.103-42.667-42.667v-53.333C373.333,205.769,392.436,186.667,416,186.667z"></path>
													<path d="M42.667,0H96c23.564,0,42.667,19.103,42.667,42.667V96c0,23.564-19.103,42.667-42.667,42.667H42.667   C19.103,138.667,0,119.564,0,96V42.667C0,19.103,19.103,0,42.667,0z"></path>
													<path d="M229.333,373.333h53.333c23.564,0,42.667,19.103,42.667,42.667v53.333c0,23.564-19.103,42.667-42.667,42.667h-53.333   c-23.564,0-42.667-19.102-42.667-42.667V416C186.667,392.436,205.769,373.333,229.333,373.333z"></path>
													<path d="M229.333,186.667h53.333c23.564,0,42.667,19.103,42.667,42.667v53.333c0,23.564-19.103,42.667-42.667,42.667h-53.333   c-23.564,0-42.667-19.103-42.667-42.667v-53.333C186.667,205.769,205.769,186.667,229.333,186.667z"></path>
													<path d="M229.333,0h53.333c23.564,0,42.667,19.103,42.667,42.667V96c0,23.564-19.103,42.667-42.667,42.667h-53.333   c-23.564,0-42.667-19.103-42.667-42.667V42.667C186.667,19.103,205.769,0,229.333,0z"></path>
													<path d="M416,0h53.333C492.898,0,512,19.103,512,42.667V96c0,23.564-19.102,42.667-42.667,42.667H416   c-23.564,0-42.667-19.103-42.667-42.667V42.667C373.333,19.103,392.436,0,416,0z"></path>
													</g>
												</svg>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-12 tab-content shop-" id="pills-tabContent">
								<div class="tab-pane fade " id="tab-list-list" role="tabpanel" aria-labelledby="tab-list-list-btn">
									<div class="row">
										<div class="col-md-12 col-sm-12 col-xxxl-6">
											<div class="dz-shop-card style-2">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/1.png" alt="image"/>
												</div>
												<div class="dz-content">
													<div class="dz-header">
														<div>
															<h4 class="title mb-0"><a href="shop-list.html">Sophisticated Swagger Suit
															</a></h4>
															<ul class="dz-tags">
																<li><a href="shop-with-category.html">Accessories,</a></li>
																<li><a href="shop-with-category.html">Sunglasses</a></li>
															</ul>
														</div>
														<div class="review-num">
															<ul class="dz-rating">
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>										
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>
																<li>
																	<i class="flaticon-star-1"></i>
																</li>
																<li>
																	<i class="flaticon-star-1"></i>
																</li>
															</ul>
															<span><a href="javascript:void(0);"> 250 Review</a></span>
														</div>
													</div>
													<div class="dz-body">
														<div class="dz-rating-box">
															<div>
																<p class="dz-para">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has.</p>
															</div>
														</div>
														<div class="rate">
															<div class="d-flex align-items-center mb-xl-3 mb-2">
																<div class="meta-content m-0">
																	<span class="price-name">Price</span>
																	<span class="price">$40.00</span>
																</div>
															</div>
															<div class="d-flex">
																<a href="shop-cart.html" class="btn btn-secondary btn-md btn-icon">
																	<i class="icon feather icon-shopping-cart d-md-none d-block"></i>
																	<span class="d-md-block d-none">Add to cart</span>
																</a>
																<div class="bookmark-btn style-1">
																	<input class="form-check-input" type="checkbox" id="favoriteCheck1"/>
																	<label class="form-check-label" for="favoriteCheck1">
																		<i class="fa-solid fa-heart"></i>
																	</label>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-md-12 col-sm-12 col-xxxl-6">
											<div class="dz-shop-card style-2">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/2.png" alt="image"/>
												</div>
												<div class="dz-content">
													<div class="dz-header">
														<div>
															<h4 class="title mb-0"><a href="shop-list.html">Cozy Knit Cardigan Sweater</a></h4>
															<ul class="dz-tags">
																<li><a href="shop-with-category.html">Accessories,</a></li>
																<li><a href="shop-with-category.html">Sunglasses</a></li>
															</ul>
														</div>
														<div class="review-num">
															<ul class="dz-rating">
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>										
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>
																<li>
																	<i class="flaticon-star-1"></i>
																</li>
																<li>
																	<i class="flaticon-star-1"></i>
																</li>
															</ul>
															<span><a href="javascript:void(0);"> 650 Review</a></span>
														</div>
													</div>
													<div class="dz-body">
														<div class="dz-rating-box">
															<div>
																<p class="dz-para">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has.</p>
															</div>
														</div>
														<div class="rate">
															<div class="d-flex align-items-center mb-xl-3 mb-2">
																<div class="meta-content">
																	<span class="price-name">Price</span>
																	<span class="price">$94.00</span>
																</div>
															</div>
															<div class="d-flex">
																<a href="shop-cart.html" class="btn btn-secondary btn-md btn-icon">
																	<i class="icon feather icon-shopping-cart d-md-none d-block"></i>
																	<span class="d-md-block d-none">Add to cart</span>
																</a>
																<div class="bookmark-btn style-1">
																	<input class="form-check-input" type="checkbox" id="favoriteCheck2"/>
																	<label class="form-check-label" for="favoriteCheck2">
																		<i class="fa-solid fa-heart"></i>
																	</label>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-md-12 col-sm-12 col-xxxl-6">
											<div class="dz-shop-card style-2">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/3.png" alt="image"/>
												</div>
												<div class="dz-content">
													<div class="dz-header">
														<div>
															<h4 class="title mb-0"><a href="shop-list.html">Classic Denim Skinny Jeans</a></h4>
															<ul class="dz-tags">
																<li><a href="shop-with-category.html">Accessories,</a></li>
																<li><a href="shop-with-category.html">Sunglasses</a></li>
															</ul>
														</div>
														<div class="review-num">
															<ul class="dz-rating">
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>										
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>
																<li>
																	<i class="flaticon-star-1"></i>
																</li>
																<li>
																	<i class="flaticon-star-1"></i>
																</li>
															</ul>
															<span><a href="javascript:void(0);"> 458 Review</a></span>
														</div>
													</div>
													<div class="dz-body">
														<div class="dz-rating-box">
															<div>
																<p class="dz-para">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has.</p>
															</div>
														</div>
														<div class="rate">
															<div class="d-flex align-items-center mb-xl-3 mb-2">
																<div class="meta-content">
																	<span class="price-name">Price</span>
																	<span class="price">$35.00</span>
																</div>
															</div>
															<div class="d-flex">
																<a href="shop-cart.html" class="btn btn-secondary btn-md btn-icon">
																	<i class="icon feather icon-shopping-cart d-md-none d-block"></i>
																	<span class="d-md-block d-none">Add to cart</span>
																</a>
																<div class="bookmark-btn style-1">
																	<input class="form-check-input" type="checkbox" id="favoriteCheck3"/>
																	<label class="form-check-label" for="favoriteCheck3">
																		<i class="fa-solid fa-heart"></i>
																	</label>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-md-12 col-sm-12 col-xxxl-6">
											<div class="dz-shop-card style-2">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/4.png" alt="image"/>
												</div>
												<div class="dz-content">
													<div class="dz-header">
														<div>
															<h4 class="title mb-0"><a href="shop-list.html">Athletic Mesh Sports Leggings</a></h4>
															<ul class="dz-tags">
																<li><a href="shop-with-category.html">Accessories,</a></li>
																<li><a href="shop-with-category.html">Sunglasses</a></li>
															</ul>
														</div>
														<div class="review-num">
															<ul class="dz-rating">
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>										
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>
																<li>
																	<i class="flaticon-star-1"></i>
																</li>
																<li>
																	<i class="flaticon-star-1"></i>
																</li>
															</ul>
															<span><a href="javascript:void(0);"> 630 Review</a></span>
														</div>
													</div>
													<div class="dz-body">
														<div class="dz-rating-box">
															<div>
																<p class="dz-para">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has.</p>
															</div>
														</div>
														<div class="rate">
															<div class="d-flex align-items-center mb-xl-3 mb-2">
																<div class="meta-content">
																	<span class="price-name">Price</span>
																	<span class="price">$25.00</span>
																</div>
															</div>
															<div class="d-flex">
																<a href="shop-cart.html" class="btn btn-secondary btn-md btn-icon">
																	<i class="icon feather icon-shopping-cart d-md-none d-block"></i>
																	<span class="d-md-block d-none">Add to cart</span>
																</a>
																<div class="bookmark-btn style-1">
																	<input class="form-check-input" type="checkbox" id="favoriteCheck4"/>
																	<label class="form-check-label" for="favoriteCheck4">
																		<i class="fa-solid fa-heart"></i>
																	</label>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-md-12 col-sm-12 col-xxxl-6">
											<div class="dz-shop-card style-2">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/5.png" alt="image"/>
													<div class="product-tag">
														<span class="badge badge-secondary">Sale</span>
													</div>	
												</div>
												<div class="dz-content">
													<div class="dz-header">
														<div>
															<h4 class="title mb-0"><a href="shop-list.html">Vintage Denim Overalls Shorts</a></h4>
															<ul class="dz-tags">
																<li><a href="shop-with-category.html">Accessories,</a></li>
																<li><a href="shop-with-category.html">Sunglasses</a></li>
															</ul>
														</div>
														<div class="review-num">
															<ul class="dz-rating">
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>										
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>
																<li>
																	<i class="flaticon-star-1"></i>
																</li>
																<li>
																	<i class="flaticon-star-1"></i>
																</li>
															</ul>
															<span><a href="javascript:void(0);"> 520 Review</a></span>
														</div>
													</div>
													<div class="dz-body">
														<div class="dz-rating-box">
															<div>
																<p class="dz-para">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has.</p>
															</div>
														</div>
														<div class="rate">
															<div class="d-flex align-items-center mb-xl-3 mb-2">
																<div class="meta-content">
																	<span class="price-name">Price</span>
																	<span class="price">$45.00</span>
																</div>
																
															</div>
															<div class="d-flex">
																<a href="shop-cart.html" class="btn btn-secondary btn-md btn-icon">
																	<i class="icon feather icon-shopping-cart d-md-none d-block"></i>
																	<span class="d-md-block d-none">Add to cart</span>
																</a>
																<div class="bookmark-btn style-1">
																	<input class="form-check-input" type="checkbox" id="favoriteCheck5"/>
																	<label class="form-check-label" for="favoriteCheck5">
																		<i class="fa-solid fa-heart"></i>
																	</label>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-md-12 col-sm-12 col-xxxl-6">
											<div class="dz-shop-card style-2">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/6.png" alt="image"/>
												</div>
												<div class="dz-content">
													<div class="dz-header">
														<div>
															<h4 class="title mb-0"><a href="shop-list.html">Satin Wrap Party Blouse</a></h4>
															<ul class="dz-tags">
																<li><a href="shop-with-category.html">Accessories,</a></li>
																<li><a href="shop-with-category.html">Sunglasses</a></li>
															</ul>
														</div>
														<div class="review-num">
															<ul class="dz-rating">
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>										
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>
																<li>
																	<i class="flaticon-star-1"></i>
																</li>
																<li>
																	<i class="flaticon-star-1"></i>
																</li>
															</ul>
															<span><a href="javascript:void(0);"> 256 Review</a></span>
														</div>
													</div>
													<div class="dz-body">
														<div class="dz-rating-box">
															<div>
																<p class="dz-para">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has.</p>
															</div>
														</div>
														<div class="rate">
															<div class="d-flex align-items-center mb-xl-3 mb-2">
																<div class="meta-content">
																	<span class="price-name">Price</span>
																	<span class="price">$70.00</span>
																</div>
															</div>
															<div class="d-flex">
																<a href="shop-cart.html" class="btn btn-secondary btn-md btn-icon">
																	<i class="icon feather icon-shopping-cart d-md-none d-block"></i>
																	<span class="d-md-block d-none">Add to cart</span>
																</a>
																<div class="bookmark-btn style-1">
																	<input class="form-check-input" type="checkbox" id="favoriteCheck6"/>
																	<label class="form-check-label" for="favoriteCheck6">
																		<i class="fa-solid fa-heart"></i>
																	</label>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-md-12 col-sm-12 col-xxxl-6">
											<div class="dz-shop-card style-2">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/7.png" alt="image"/>
													<div class="product-tag">
														<span class="badge badge-secondary">Sale</span>
													</div>	
												</div>
												<div class="dz-content">
													<div class="dz-header">
														<div>
															<h4 class="title mb-0"><a href="shop-list.html">Plaid Wool Winter Coat</a></h4>
															<ul class="dz-tags">
																<li><a href="shop-with-category.html">Accessories,</a></li>
																<li><a href="shop-with-category.html">Sunglasses</a></li>
															</ul>
														</div>
														<div class="review-num">
															<ul class="dz-rating">
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>										
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>
																<li>
																	<i class="flaticon-star-1"></i>
																</li>
																<li>
																	<i class="flaticon-star-1"></i>
																</li>
															</ul>
															<span><a href="javascript:void(0);"> 776 Review</a></span>
														</div>
													</div>
													<div class="dz-body">
														<div class="dz-rating-box">
															<div>
																<p class="dz-para">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has.</p>
															</div>
														</div>
														<div class="rate">
															<div class="d-flex align-items-center mb-xl-3 mb-2">
																<div class="meta-content">
																	<span class="price-name">Price</span>
																	<span class="price">$75.00</span>
																</div>
															</div>
															<div class="d-flex">
																<a href="shop-cart.html" class="btn btn-secondary btn-md btn-icon">
																	<i class="icon feather icon-shopping-cart d-md-none d-block"></i>
																	<span class="d-md-block d-none">Add to cart</span>
																</a>
																<div class="bookmark-btn style-1">
																	<input class="form-check-input" type="checkbox" id="favoriteCheck7"/>
																	<label class="form-check-label" for="favoriteCheck7">
																		<i class="fa-solid fa-heart"></i>
																	</label>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-md-12 col-sm-12 col-xxxl-6">
											<div class="dz-shop-card style-2">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/8.png" alt="image"/>
												</div>
												<div class="dz-content">
													<div class="dz-header">
														<div>
															<h4 class="title mb-0"><a href="shop-list.html">Water-Resistant Windbreaker Jacket</a></h4>
															<ul class="dz-tags">
																<li><a href="shop-with-category.html">Accessories,</a></li>
																<li><a href="shop-with-category.html">Sunglasses</a></li>
															</ul>
														</div>
														<div class="review-num">
															<ul class="dz-rating">
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>										
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>
																<li class="star-fill">
																	<i class="flaticon-star-1"></i>
																</li>
																<li>
																	<i class="flaticon-star-1"></i>
																</li>
																<li>
																	<i class="flaticon-star-1"></i>
																</li>
															</ul>
															<span><a href="javascript:void(0);"> 255 Review</a></span>
														</div>
													</div>
													<div class="dz-body">
														<div class="dz-rating-box">
															<div>
																<p class="dz-para">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has.</p>
															</div>
														</div>
														<div class="rate">
															<div class="d-flex align-items-center mb-xl-3 mb-2">
																<div class="meta-content">
																	<span class="price-name">Price</span>
																	<span class="price">$36.00</span>
																</div>
															</div>
															<div class="d-flex">
																<a href="shop-cart.html" class="btn btn-secondary btn-md btn-icon">
																	<i class="icon feather icon-shopping-cart d-md-none d-block"></i>
																	<span class="d-md-block d-none">Add to cart</span>
																</a>
																<div class="bookmark-btn style-1">
																	<input class="form-check-input" type="checkbox" id="favoriteCheck8"/>
																	<label class="form-check-label" for="favoriteCheck8">
																		<i class="fa-solid fa-heart"></i>
																	</label>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="tab-pane fade" id="tab-list-column" role="tabpanel" aria-labelledby="tab-list-column-btn">
									<div class="row gx-xl-4 g-3 mb-xl-0 mb-md-0 mb-3">
										<div class="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/1.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Cozy Knit Cardigan Sweater</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/2.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Sophisticated Swagger Suit</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/3.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Classic Denim Skinny Jeans</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/4.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Athletic Mesh Sports Leggings</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/5.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Vintage Denim Overalls Shorts</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/6.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Satin Wrap Party Blouse</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/7.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Plaid Wool Winter Coat</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/8.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Water-Resistant Windbreaker Jacket</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-4 col-lg-6 col-md-6 col-sm-6 m-md-b15 m-sm-b0 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/9.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Comfy Lounge Jogger Pants</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="tab-pane fade active show" id="tab-list-grid" role="tabpanel" aria-labelledby="tab-list-grid-btn">
									<div class="row gx-xl-4 g-3">
										<div class="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/1.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Cozy Knit Cardigan Sweater</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/2.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Sophisticated Swagger Suit</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/3.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Classic Denim Skinny Jeans</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/4.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Athletic Mesh Sports Leggings</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/5.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Vintage Denim Overalls Shorts</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/6.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Satin Wrap Party Blouse</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/7.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Plaid Wool Winter Coat</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/8.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Water-Resistant Windbreaker Jacket</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/9.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Comfy Lounge Jogger Pants</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/10.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Stylish Fedora Hat Collection</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/11.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Suede Ankle Booties Collection</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
										<div class="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-b30">
											<div class="shop-card style-1">
												<div class="dz-media">
													<img src="../../assets/user/images/shop/product/12.png" alt="image"/>
												<div class="shop-meta">
														<a href="javascript:void(0);" class="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
															<i class="fa-solid fa-eye d-md-none d-block"></i>
															<span class="d-md-block d-none">Quick View</span>
														</a>
														<div class="btn btn-primary meta-icon dz-wishicon">
															<i class="icon feather icon-heart dz-heart"></i>
															<i class="icon feather icon-heart-on dz-heart-fill"></i>
														</div>
														<div class="btn btn-primary meta-icon dz-carticon">
															<i class="flaticon flaticon-basket"></i>
															<i class="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
														</div>
													</div>								
												</div>
												<div class="dz-content">
													<h5 class="title"><a href="shop-list.html">Hiking Outdoor Gear Collection</a></h5>
													<h5 class="price">$80</h5>
												</div>
												<div class="product-tag">
													<span class="badge ">Get 20% Off</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="row page mt-0">
							<div class="col-md-6">
								<p class="page-text">Showing 1–5 Of 50 Results</p>
							</div>
							<div class="col-md-6">
								<nav aria-label="Blog Pagination">
									<ul class="pagination style-1">
										<li class="page-item"><a class="page-link prev" href="javascript:void(0);">Prev</a></li>
										<li class="page-item"><a class="page-link active" href="javascript:void(0);">1</a></li>
										<li class="page-item"><a class="page-link" href="javascript:void(0);">2</a></li>
										<li class="page-item"><a class="page-link" href="javascript:void(0);">3</a></li>
										<li class="page-item"><a class="page-link next" href="javascript:void(0);">Next</a></li>
									</ul>
								</nav>
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

export default ShopWithCategory;