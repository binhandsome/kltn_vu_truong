// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; 
import { login } from '../../apiService/authService';
import { useNavigate } from 'react-router-dom';

function Login() {
	const [hasBgClass, setHasBgClass] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const showToastMessage = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
        e.preventDefault();
      
        // 🌟 Validate client-side
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
          showToastMessage('Vui lòng nhập email');
          return;
        }
        if (!emailRegex.test(email)) {
          showToastMessage('Email phải là Gmail hợp lệ (vd: example@gmail.com)');
          return;
        }
      
        if (!password) {
          showToastMessage('Vui lòng nhập mật khẩu');
          return;
        }
        if (password.length < 6) {
          showToastMessage('Mật khẩu phải có ít nhất 6 ký tự');
          return;
        }
      
        // ✅ Nếu hợp lệ thì tiếp tục đăng nhập
        try {
          const credentials = { email, password };
          const response = await login(credentials);
      
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('username', response.username);
          localStorage.setItem('user', JSON.stringify({ email }));
      
          const meRes = await fetch("http://localhost:8081/api/auth/me", {
            headers: {
              Authorization: `Bearer ${response.accessToken}`
            }
          });
      
          if (meRes.ok) {
            const meData = await meRes.json();
            if (meData?.userId) localStorage.setItem("userId", meData.userId);
            if (meData?.profilePicture) localStorage.setItem("avatar", meData.profilePicture);
          }
      
          
          setEmail('');
          setPassword('');
          localStorage.setItem('loginSuccess','Đăng nhập thành công');
          navigate('/user');
        } catch (error) {
          showToastMessage(`Đăng nhập thất bại: ${error.message}`);
        }
      };
      // Đăng xuất
      useEffect(() => {
        const logoutMsg = localStorage.getItem('logoutSuccess');
        if (logoutMsg) {
          showToastMessage(logoutMsg);
          localStorage.removeItem('logoutSuccess');
        }
      }, []);            
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
    const successMsg = localStorage.getItem('resetSuccess');
    if (successMsg) {
      setMessage(successMsg);
      localStorage.removeItem('resetSuccess');
    }
  }, []);
	useEffect(() => { 
		const wow = new WOW.WOW();
		wow.init();
	
		return () => {
		};
	  }, []);

  return (
    <>
      <div className="page-wraper">

        {/* Header (đã được xử lý trong App.js) */}
<div className="page-content bg-light">
  <section className="px-3">
    <div className="row">
      <div className="col-xxl-6 col-xl-6 col-lg-6 start-side-content">
        <div className="dz-bnr-inr-entry">
          <h1>Login</h1>
          <nav
            aria-label="breadcrumb text-align-start"
            className="breadcrumb-row"
          >
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html"> Trang chủ</a>
              </li>
              <li className="breadcrumb-item">Đăng nhập</li>
            </ul>
          </nav>
        </div>
        <div className="registration-media">
          <img src="../../assets/user/images/registration/pic3.png" alt="/" />
        </div>
      </div>
      <div className="col-xxl-6 col-xl-6 col-lg-6 end-side-content justify-content-center">
        <div className="login-area">
          <h2 className="text-secondary text-center">Đăng nhập</h2>
          <p className="text-center m-b25">
            Chào mừng bạn vui lòng đăng nhập vào tài khoản của bạn
            {/* welcome please login to your account */}
          </p>
          <form onSubmit={handleSubmit}>
            <div className="m-b30">
              <label className="label-title">Địa chỉ Email</label>
              <input
                name="dzName"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required=""
                className="form-control"
                placeholder="Email Address"
                type="email"
              />
            </div>
            <div className="m-b15">
              <label className="label-title">Mật khẩu</label>
              <div className="secure-input ">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control dz-password"
                  placeholder="Password"
                />
                <div className="show-pass">
                  <i className="eye-open fa-regular fa-eye" />
                </div>
              </div>
            </div>
            <div className="form-row d-flex justify-content-between m-b30">
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="basic_checkbox_1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="basic_checkbox_1"
                  >
                    Nhớ
                  </label>
                </div>
              </div>
              <div className="form-group">
                <a className="text-primary" href="/user/auth/forgetpassword">
                  Quên mật khẩu
                </a>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-secondary">Đăng nhập</button>
              <a
                href="/user/auth/registration"
                className="btn btn-outline-secondary btnhover text-uppercase"
              >
                Đăng ký
              </a>
            </div>
          </form>
          <br />
             <div className="text-center">
                                        {message && <p>{message}</p>}
                                    </div>
        </div>
      </div>
    </div>
  </section>
</div>

        {/* Footer (đã được xử lý trong App.js) */}
         <ScrollTopButton/>
        <QuickViewModal />
        {showToast && (
  <div style={{
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    padding: '12px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transition: 'opacity 0.5s ease-in-out'
  }}>
    {toastMessage}
  </div>
)}
      </div>
    </>
  );
}

export default Login;