import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateShop = () => {
  const [nameShop, setNameShop] = useState('');
  const [thumbnailShop, setThumbnailShop] = useState('');
  const [descriptionShop, setDescriptionShop] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [shopPhone, setShopPhone] = useState('');
  const [shopEmail, setShopEmail] = useState('');
  const [message, setMessage] = useState('');
  const API_URL = 'http://localhost:8089/api/seller';
  const navigate = useNavigate();

  const handleCreateShop = async (event) => {
    event.preventDefault();

    // Lấy accessToken từ localStorage
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setMessage('❌ Vui lòng đăng nhập để tạo shop.');
      return;
    }

    // Tạo dữ liệu gửi đi
    const shopData = {
      accessToken,
      nameShop,
      thumbnailShop,
      descriptionShop,
      shopAddress,
      shopPhone,
      shopEmail
    };

    try {
      const response = await axios.post(`${API_URL}/create-shop`, shopData, {
    headers: {
    'Content-Type': 'multipart/form-data'
  }
      });
      setMessage('✅ Tạo shop thành công!');
      console.log('Shop created:', response.data);
      // Reset form sau khi tạo thành công
      setNameShop('');
      setThumbnailShop('');
      setDescriptionShop('');
      setShopAddress('');
      setShopPhone('');
      setShopEmail('');
setTimeout(() => {
  navigate('/seller');
}, 5000);

    } catch (error) {
      console.error('Error creating shop:', error);
      setMessage(error.response?.data?.message || '❌ Lỗi khi tạo shop, vui lòng thử lại.');
    }
  };

  return (

 <>
  <div className="ad-auth-wrapper"  style={{
    paddingTop: '300px',
    height: '100vh',
    overflowY: 'auto',
    paddingLeft: '20px',
    paddingRight: '20px',
  }}>
    <div className="ad-auth-box">
      <div className="row align-items-center">
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="ad-auth-img">
            <img src="../../assets/admin/images/auth-img1.png" alt="" />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="ad-auth-content">
<form onSubmit={handleCreateShop}>
              <a href="index.html" className="ad-auth-logo">
                <img src="../../assets/admin/images/logo2.png" alt="" />
              </a>
              <h2>
                <span className="primary">Xin chào,</span>Chào mừng bạn đến với trang TẠO SHOP!
              </h2>
              <p>Vui lòng nhập thông tin chi tiết của bạn bên dưới để tiếp tục</p>
          <div className="ad-auth-form">
  {/* Tên Shop */}
  <div className="ad-auth-feilds mb-30">
    <input
      type="text"
      placeholder="Tên Shop"
      className="ad-input"
      value={nameShop}
      onChange={(e) => setNameShop(e.target.value)}
      required
    />
    <div className="ad-auth-icon">
      {/* icon cửa hàng */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px" fill="#9abeed">
        <path d="M21 7H3V5h18v2zm0 2H3v10h18V9zM5 17v-6h2v6H5zm4 0v-6h2v6H9zm4 0v-6h2v6h-2zm4 0v-6h2v6h-2z"/>
      </svg>
    </div>
  </div>

  {/* Số điện thoại Shop */}
  <div className="ad-auth-feilds mb-30">
    <input
      type="text"
      placeholder="Số Điện Thoại Shop"
      className="ad-input"
      value={shopPhone}
      onChange={(e) => setShopPhone(e.target.value)}
      required
    />
    <div className="ad-auth-icon">
      {/* icon điện thoại */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px" fill="#9abeed">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    </div>
  </div>

  {/* Email Shop */}
  <div className="ad-auth-feilds mb-30">
    <input
      type="email"
      placeholder="Email Shop"
      className="ad-input"
      value={shopEmail}
      onChange={(e) => setShopEmail(e.target.value)}
      required
    />
    <div className="ad-auth-icon">
      {/* icon email */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px" fill="#9abeed">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    </div>
  </div>

  {/* Ảnh đại diện Shop */}
  <div className="ad-auth-feilds mb-30">
    <label>Ảnh đại diện Shop</label>
    <input
      type="file"
      accept="image/*"
      className="ad-input"
      onChange={(e) => setThumbnailShop(e.target.files[0])}
      required
    />
  </div>

  {/* Địa chỉ Shop */}
  <div className="ad-auth-feilds mb-30">
    <input
      type="text"
      placeholder="Địa Chỉ Shop"
      className="ad-input"
      value={shopAddress}
      onChange={(e) => setShopAddress(e.target.value)}
      required
    />
    <div className="ad-auth-icon">
      {/* icon location */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px" fill="#9abeed">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"/>
      </svg>
    </div>
  </div>

  {/* Mô tả Shop */}
<div className="ad-auth-feilds mb-30">
  <textarea
    placeholder="Giới thiệu ngắn gọn về shop..."
    className="ad-input"
    rows={4}
    value={descriptionShop}
    onChange={(e) => setDescriptionShop(e.target.value)}
    required
    style={{
      width: '100%',
      resize: 'vertical',        // cho phép kéo chiều cao nếu cần
      fontSize: '14px',
      padding: '10px 12px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    }}
  ></textarea>
</div>
</div>

              <div className="ad-auth-btn">
                <button   type="submit"
  className="ad-btn ad-login-member">
                  Tạo Shop
                </button>
              </div>
                               {message && <p className="ad-register-text">{message}</p>}

            </form>
          </div>
        </div>
      </div>
      <div className="ad-notifications ad-error">
        <p>
          <span>Hừ!</span>Đã xảy ra lỗi
        </p>
      </div>
    </div>
  </div>
    </>
  );
};

export default CreateShop;