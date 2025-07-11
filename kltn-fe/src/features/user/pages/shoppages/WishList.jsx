import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import WOW from 'wowjs';
import ScrollTopButton from '../../layout/ScrollTopButton';
import QuickViewModal from '../../components/home/QuickViewModal';

function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [hasBgClass, setHasBgClass] = useState(true);
  const [token, setToken] = useState('');

  // Lấy token từ localStorage khi component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    setToken(storedToken);
  }, []);

  // Xử lý hiệu ứng nền
  useEffect(() => {
    if (hasBgClass) {
      document.body.classList.add('bg');
    } else {
      document.body.classList.remove('bg');
    }
    return () => document.body.classList.remove('bg');
  }, [hasBgClass]);

  // Khởi tạo hiệu ứng WOW.js
  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init();
  }, []);

  // Gọi API lấy wishlist
  useEffect(() => {
    if (token) fetchWishlist();
  }, [token]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get('http://localhost:8083/api/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('✅ Wishlist API:', res.data);
      setWishlist(res.data);
    } catch (error) {
      console.error('❌ Lỗi khi lấy wishlist:', error);
    }
  };

  const handleRemove = async (asin) => {
    try {
      await axios.delete(`http://localhost:8083/api/wishlist/${asin}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(wishlist.filter((item) => item.asin !== asin));
    } catch (error) {
      console.error('❌ Lỗi xoá sản phẩm:', error);
    }
  };

  const handleAddToCart = (asin) => {
    alert(`Thêm vào giỏ hàng: ${asin}`);
  };

  return (
    <>
      <Helmet>
        <title>Wishlist - Pixio</title>
      </Helmet>

      <div className="page-wraper">
        <div className="page-content bg-light">
          {/* Banner */}
          <div
            className="dz-bnr-inr bg-secondary overlay-black-light"
            style={{ backgroundImage: "url(../../assets/user/images/background/bg1.jpg)" }}
          >
            <div className="container">
              <div className="dz-bnr-inr-entry">
                <h1>Wishlist</h1>
                <nav aria-label="breadcrumb" className="breadcrumb-row">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item">Wishlist</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

          {/* Content */}
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
                        {wishlist.length > 0 ? (
                          wishlist.map((item) => (
                            <tr key={item.asin}>
                              <td className="product-item-img">
                              <img src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${item.image}`} alt={item.title} width="80"/>
                              </td>
                              <td className="product-item-name">{item.title}</td>
                              <td className="product-item-price">
  ${item.discountedPrice}
</td>

                              <td className="product-item-stock">In Stock</td>
                              <td className="product-item-totle">
                                <button
                                  className="btn btn-secondary btnhover text-nowrap"
                                  onClick={() => handleAddToCart(item.asin)}
                                >
                                  Add To Cart
                                </button>
                              </td>
                              <td className="product-item-close">
                                <button
                                  className="btn text-danger"
                                  onClick={() => handleRemove(item.asin)}
                                >
                                  <i className="ti-close" />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center text-muted">
                              Chưa có sản phẩm yêu thích nào.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ScrollTopButton />
        <QuickViewModal />
      </div>
    </>
  );
}

export default WishList;
