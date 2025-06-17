// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function ShopStyle1() {
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
  {/*Banner Start*/}
  <div
    className="dz-bnr-inr bg-secondary overlay-black-light"
    style={{ backgroundImage: "url(../../assets/user/images/background/bg1.jpg)" }}
  >
    <div className="container">
      <div className="dz-bnr-inr-entry">
        <h1>Shop Style 1</h1>
        <nav aria-label="breadcrumb" className="breadcrumb-row">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html"> Home</a>
            </li>
            <li className="breadcrumb-item">Shop Style 1</li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  {/*Banner End*/}
  <section className="content-inner-1 z-index-unset">
    <div className="container">
      <div className="row m-auto gx-xl-4 g-3 mb-xl-0 mb-md-0 mb-3">
        <div className="col-6 col-xl-4 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-sm-b0 m-b30">
          <div className="shop-card style-1">
            <div className="dz-media">
              <img src="../../assets/user/images/shop/product/1.png" alt="image" />
              <div className="shop-meta">
                <a
                  href="javascript:void(0);"
                  className="btn btn-secondary btn-md btn-rounded"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fa-solid fa-eye d-md-none d-block" />
                  <span className="d-md-block d-none">Quick View</span>
                </a>
                <div className="btn btn-primary meta-icon dz-wishicon">
                  <i className="icon feather icon-heart dz-heart" />
                  <i className="icon feather icon-heart-on dz-heart-fill" />
                </div>
                <div className="btn btn-primary meta-icon dz-carticon">
                  <i className="flaticon flaticon-basket" />
                  <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                </div>
              </div>
            </div>
            <div className="dz-content">
              <h5 className="title">
                <a href="shop-list.html">Cozy Knit Cardigan Sweater</a>
              </h5>
              <h5 className="price">$80</h5>
            </div>
            <div className="product-tag">
              <span className="badge ">Get 20% Off</span>
            </div>
          </div>
        </div>
        <div className="col-6 col-xl-4 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-sm-b0 m-b30">
          <div className="shop-card style-1">
            <div className="dz-media">
              <img src="../../assets/user/images/shop/product/2.png" alt="image" />
              <div className="shop-meta">
                <a
                  href="javascript:void(0);"
                  className="btn btn-secondary btn-md btn-rounded"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fa-solid fa-eye d-md-none d-block" />
                  <span className="d-md-block d-none">Quick View</span>
                </a>
                <div className="btn btn-primary meta-icon dz-wishicon">
                  <i className="icon feather icon-heart dz-heart" />
                  <i className="icon feather icon-heart-on dz-heart-fill" />
                </div>
                <div className="btn btn-primary meta-icon dz-carticon">
                  <i className="flaticon flaticon-basket" />
                  <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                </div>
              </div>
            </div>
            <div className="dz-content">
              <h5 className="title">
                <a href="shop-list.html">Sophisticated Swagger Suit</a>
              </h5>
              <h5 className="price">$80</h5>
            </div>
            <div className="product-tag">
              <span className="badge ">Get 20% Off</span>
            </div>
          </div>
        </div>
        <div className="col-6 col-xl-4 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-sm-b0 m-b30">
          <div className="shop-card style-1">
            <div className="dz-media">
              <img src="../../assets/user/images/shop/product/3.png" alt="image" />
              <div className="shop-meta">
                <a
                  href="javascript:void(0);"
                  className="btn btn-secondary btn-md btn-rounded"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fa-solid fa-eye d-md-none d-block" />
                  <span className="d-md-block d-none">Quick View</span>
                </a>
                <div className="btn btn-primary meta-icon dz-wishicon">
                  <i className="icon feather icon-heart dz-heart" />
                  <i className="icon feather icon-heart-on dz-heart-fill" />
                </div>
                <div className="btn btn-primary meta-icon dz-carticon">
                  <i className="flaticon flaticon-basket" />
                  <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                </div>
              </div>
            </div>
            <div className="dz-content">
              <h5 className="title">
                <a href="shop-list.html">Classic Denim Skinny Jeans</a>
              </h5>
              <h5 className="price">$80</h5>
            </div>
            <div className="product-tag">
              <span className="badge ">Get 20% Off</span>
            </div>
          </div>
        </div>
        <div className="col-6 col-xl-4 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-sm-b0 m-b30">
          <div className="shop-card style-1">
            <div className="dz-media">
              <img src="../../assets/user/images/shop/product/4.png" alt="image" />
              <div className="shop-meta">
                <a
                  href="javascript:void(0);"
                  className="btn btn-secondary btn-md btn-rounded"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fa-solid fa-eye d-md-none d-block" />
                  <span className="d-md-block d-none">Quick View</span>
                </a>
                <div className="btn btn-primary meta-icon dz-wishicon">
                  <i className="icon feather icon-heart dz-heart" />
                  <i className="icon feather icon-heart-on dz-heart-fill" />
                </div>
                <div className="btn btn-primary meta-icon dz-carticon">
                  <i className="flaticon flaticon-basket" />
                  <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                </div>
              </div>
            </div>
            <div className="dz-content">
              <h5 className="title">
                <a href="shop-list.html">Athletic Mesh Sports Leggings</a>
              </h5>
              <h5 className="price">$80</h5>
            </div>
            <div className="product-tag">
              <span className="badge ">Get 20% Off</span>
            </div>
          </div>
        </div>
        <div className="col-6 col-xl-4 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-sm-b0 m-b30">
          <div className="shop-card style-1">
            <div className="dz-media">
              <img src="../../assets/user/images/shop/product/5.png" alt="image" />
              <div className="shop-meta">
                <a
                  href="javascript:void(0);"
                  className="btn btn-secondary btn-md btn-rounded"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fa-solid fa-eye d-md-none d-block" />
                  <span className="d-md-block d-none">Quick View</span>
                </a>
                <div className="btn btn-primary meta-icon dz-wishicon">
                  <i className="icon feather icon-heart dz-heart" />
                  <i className="icon feather icon-heart-on dz-heart-fill" />
                </div>
                <div className="btn btn-primary meta-icon dz-carticon">
                  <i className="flaticon flaticon-basket" />
                  <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                </div>
              </div>
            </div>
            <div className="dz-content">
              <h5 className="title">
                <a href="shop-list.html">Vintage Denim Overalls Shorts</a>
              </h5>
              <h5 className="price">$80</h5>
            </div>
            <div className="product-tag">
              <span className="badge ">Get 20% Off</span>
            </div>
          </div>
        </div>
        <div className="col-6 col-xl-4 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-sm-b0 m-b30">
          <div className="shop-card style-1">
            <div className="dz-media">
              <img src="../../assets/user/images/shop/product/6.png" alt="image" />
              <div className="shop-meta">
                <a
                  href="javascript:void(0);"
                  className="btn btn-secondary btn-md btn-rounded"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fa-solid fa-eye d-md-none d-block" />
                  <span className="d-md-block d-none">Quick View</span>
                </a>
                <div className="btn btn-primary meta-icon dz-wishicon">
                  <i className="icon feather icon-heart dz-heart" />
                  <i className="icon feather icon-heart-on dz-heart-fill" />
                </div>
                <div className="btn btn-primary meta-icon dz-carticon">
                  <i className="flaticon flaticon-basket" />
                  <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                </div>
              </div>
            </div>
            <div className="dz-content">
              <h5 className="title">
                <a href="shop-list.html">Satin Wrap Party Blouse</a>
              </h5>
              <h5 className="price">$80</h5>
            </div>
            <div className="product-tag">
              <span className="badge ">Get 20% Off</span>
            </div>
          </div>
        </div>
        <div className="col-6 col-xl-4 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-sm-b0 m-b30">
          <div className="shop-card style-1">
            <div className="dz-media">
              <img src="../../assets/user/images/shop/product/7.png" alt="image" />
              <div className="shop-meta">
                <a
                  href="javascript:void(0);"
                  className="btn btn-secondary btn-md btn-rounded"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fa-solid fa-eye d-md-none d-block" />
                  <span className="d-md-block d-none">Quick View</span>
                </a>
                <div className="btn btn-primary meta-icon dz-wishicon">
                  <i className="icon feather icon-heart dz-heart" />
                  <i className="icon feather icon-heart-on dz-heart-fill" />
                </div>
                <div className="btn btn-primary meta-icon dz-carticon">
                  <i className="flaticon flaticon-basket" />
                  <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                </div>
              </div>
            </div>
            <div className="dz-content">
              <h5 className="title">
                <a href="shop-list.html">Plaid Wool Winter Coat</a>
              </h5>
              <h5 className="price">$80</h5>
            </div>
            <div className="product-tag">
              <span className="badge ">Get 20% Off</span>
            </div>
          </div>
        </div>
        <div className="col-6 col-xl-4 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-sm-b0 m-b30">
          <div className="shop-card style-1">
            <div className="dz-media">
              <img src="../../assets/user/images/shop/product/8.png" alt="image" />
              <div className="shop-meta">
                <a
                  href="javascript:void(0);"
                  className="btn btn-secondary btn-md btn-rounded"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fa-solid fa-eye d-md-none d-block" />
                  <span className="d-md-block d-none">Quick View</span>
                </a>
                <div className="btn btn-primary meta-icon dz-wishicon">
                  <i className="icon feather icon-heart dz-heart" />
                  <i className="icon feather icon-heart-on dz-heart-fill" />
                </div>
                <div className="btn btn-primary meta-icon dz-carticon">
                  <i className="flaticon flaticon-basket" />
                  <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                </div>
              </div>
            </div>
            <div className="dz-content">
              <h5 className="title">
                <a href="shop-list.html">Water-Resistant Windbreaker Jacket</a>
              </h5>
              <h5 className="price">$80</h5>
            </div>
            <div className="product-tag">
              <span className="badge ">Get 20% Off</span>
            </div>
          </div>
        </div>
        <div className="col-6 col-xl-4 col-lg-4 col-md-4 col-sm-6 m-md-b15 m-sm-b0 m-b30">
          <div className="shop-card style-1">
            <div className="dz-media">
              <img src="../../assets/user/images/shop/product/9.png" alt="image" />
              <div className="shop-meta">
                <a
                  href="javascript:void(0);"
                  className="btn btn-secondary btn-md btn-rounded"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fa-solid fa-eye d-md-none d-block" />
                  <span className="d-md-block d-none">Quick View</span>
                </a>
                <div className="btn btn-primary meta-icon dz-wishicon">
                  <i className="icon feather icon-heart dz-heart" />
                  <i className="icon feather icon-heart-on dz-heart-fill" />
                </div>
                <div className="btn btn-primary meta-icon dz-carticon">
                  <i className="flaticon flaticon-basket" />
                  <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                </div>
              </div>
            </div>
            <div className="dz-content">
              <h5 className="title">
                <a href="shop-list.html">Comfy Lounge Jogger Pants</a>
              </h5>
              <h5 className="price">$80</h5>
            </div>
            <div className="product-tag">
              <span className="badge ">Get 20% Off</span>
            </div>
          </div>
        </div>
      </div>
      <div className="row page mt-0">
        <div className="col-md-6">
          <p className="page-text">Showing 1–5 Of 50 Results</p>
        </div>
        <div className="col-md-6">
          <nav aria-label="Blog Pagination">
            <ul className="pagination style-1">
              <li className="page-item">
                <a className="page-link active" href="javascript:void(0);">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="javascript:void(0);">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="javascript:void(0);">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link next" href="javascript:void(0);">
                  Next
                </a>
              </li>
            </ul>
          </nav>
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

export default ShopStyle1;