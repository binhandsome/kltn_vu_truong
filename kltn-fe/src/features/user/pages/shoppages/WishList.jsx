// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function WishList() {
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
        <h1>Wishlist</h1>
        <nav aria-label="breadcrumb" className="breadcrumb-row">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html"> Home</a>
            </li>
            <li className="breadcrumb-item">Wishlist</li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  {/*Banner End*/}
  {/* inner page banner End*/}
  <div className="content-inner-1">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="table-responsive">
            <table className="table check-tbl style-1">
              <thead>
                <tr>
                  <th>Product</th>
                  <th />
                  <th>Price</th>
                  <th>Stock</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="product-item-img">
                    <img src="../../assets/user/images/shop/shop-cart/pic1.jpg" alt="/" />
                  </td>
                  <td className="product-item-name">
                    Sophisticated Swagger Suit{" "}
                  </td>
                  <td className="product-item-price">
                    <span>$45.00</span>
                    <strong>$28.00</strong>
                  </td>
                  <td className="product-item-stock">In Stock</td>
                  <td className="product-item-totle">
                    <a
                      href="shop-cart.html"
                      className="btn btn-secondary btnhover text-nowrap"
                    >
                      Add To Cart
                    </a>
                  </td>
                  <td className="product-item-close">
                    <a href="javascript:void(0);">
                      <i className="ti-close" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="product-item-img">
                    <img src="../../assets/user/images/shop/shop-cart/pic2.jpg" alt="/" />
                  </td>
                  <td className="product-item-name">
                    Cozy Knit Cardigan Sweater
                  </td>
                  <td className="product-item-price">
                    <span>$95.00</span>
                    <strong>$56.00</strong>
                  </td>
                  <td className="product-item-stock">In Stock</td>
                  <td className="product-item-totle">
                    <a
                      href="shop-cart.html"
                      className="btn btn-secondary btnhover text-nowrap"
                    >
                      Add To Cart
                    </a>
                  </td>
                  <td className="product-item-close">
                    <a href="javascript:void(0);">
                      <i className="ti-close" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="product-item-img">
                    <img src="../../assets/user/images/shop/shop-cart/pic3.jpg" alt="/" />
                  </td>
                  <td className="product-item-name">
                    Athletic Mesh Sports Leggings
                  </td>
                  <td className="product-item-price">
                    <span>$56.00</span>
                    <strong>$20.00</strong>
                  </td>
                  <td className="product-item-stock">In Stock</td>
                  <td className="product-item-totle">
                    <a
                      href="shop-cart.html"
                      className="btn btn-secondary btnhover text-nowrap"
                    >
                      Add To Cart
                    </a>
                  </td>
                  <td className="product-item-close">
                    <a href="javascript:void(0);">
                      <i className="ti-close" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
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

export default WishList;