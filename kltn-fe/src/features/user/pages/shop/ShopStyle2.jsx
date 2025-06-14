// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function ShopStyle2() {
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
    style={{ backgroundImage: "url(images/background/bg1.jpg)" }}
  >
    <div className="container">
      <div className="dz-bnr-inr-entry">
        <h1>Shop Style 2</h1>
        <nav aria-label="breadcrumb" className="breadcrumb-row">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html"> Home</a>
            </li>
            <li className="breadcrumb-item">Shop Style 2</li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  {/*Banner End*/}
  <section className="content-inner-1">
    <div className="container">
      <div className="row m-auto gx-xl-4 g-3 mb-xl-0 mb-md-0 mb-3 justify-content-center">
        <div className=" col-xl-4 col-lg-4 col-md-4 col-sm-6 m-md-b50 m-sm-b0 m-b70">
          <div className="shop-card style-2 ">
            <div className="dz-media">
              <img src="../../assets/user/images/shop/product/shart/1.png" alt="image" />
            </div>
            <div className="dz-content">
              <div>
                <span className="sale-title">up to 79% off</span>
                <h5 className="title">
                  <a href="shop-list.html">
                    Printed Spread Collar Casual Shirt
                  </a>
                </h5>
              </div>
              <h6 className="price">
                $80
                <del>$95</del>
              </h6>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 m-md-b50 m-sm-b0 m-b70">
          <div className="shop-card style-2 ">
            <div className="dz-media">
              <img src="../../assets/user/images/shop/product/shart/2.png" alt="image" />
            </div>
            <div className="dz-content">
              <div>
                <span className="sale-title">up to 79% off</span>
                <h5 className="title">
                  <a href="shop-list.html">
                    Checkered Slim Collar Casual Shirt
                  </a>
                </h5>
              </div>
              <h6 className="price">
                $80
                <del>$95</del>
              </h6>
            </div>
          </div>
        </div>
        <div className=" col-xl-4 col-lg-4 col-md-4 col-sm-6 m-md-b50 m-sm-b0 m-b70">
          <div className="shop-card style-2 ">
            <div className="dz-media">
              <img src="../../assets/user/images/shop/product/shart/3.png" alt="image" />
            </div>
            <div className="dz-content">
              <div>
                <span className="sale-title">up to 79% off</span>
                <h5 className="title">
                  <a href="shop-list.html">
                    Solid Cut Away Collar Casual Shirt
                  </a>
                </h5>
              </div>
              <h6 className="price">
                $80
                <del>$95</del>
              </h6>
            </div>
          </div>
        </div>
        <div className=" col-xl-4 col-lg-4 col-md-4 col-sm-6 m-md-b50 m-sm-b0 m-b70">
          <div className="shop-card style-2 ">
            <div className="dz-media">
              <img src="../../assets/user/images/shop/product/shart/4.png" alt="image" />
            </div>
            <div className="dz-content">
              <div>
                <span className="sale-title">up to 79% off</span>
                <h5 className="title">
                  <a href="shop-list.html">
                    Printed Spread Collar Casual Shirt
                  </a>
                </h5>
              </div>
              <h6 className="price">
                $80
                <del>$95</del>
              </h6>
            </div>
          </div>
        </div>
        <div className=" col-xl-4 col-lg-4 col-md-4 col-sm-6 m-md-b50 m-sm-b0 m-b70">
          <div className="shop-card style-2 ">
            <div className="dz-media">
              <img src="../../assets/user/images/shop/product/shart/5.png" alt="image" />
            </div>
            <div className="dz-content">
              <div>
                <span className="sale-title">up to 79% off</span>
                <h5 className="title">
                  <a href="shop-list.html">
                    Checkered Spread Collar Casual Shirt
                  </a>
                </h5>
              </div>
              <h6 className="price">
                $80
                <del>$95</del>
              </h6>
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

export default ShopStyle2;