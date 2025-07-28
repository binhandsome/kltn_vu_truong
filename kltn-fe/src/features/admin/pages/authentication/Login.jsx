import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const loginAdmin = async () => {
    if (!email || !password) {
      return setMessage('❗ Vui lòng nhập email và mật khẩu');
    }

    try {
      const response = await axios.post('http://localhost:8081/api/auth/loginAdmin', {
        email,
        password
      });

      const { accessToken, refreshToken, username } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('username', username);

      window.location.href = '/admin'; // 👉 điều hướng vào trang admin
    } catch (error) {
      const msg = error?.response?.data?.message || 'Đăng nhập thất bại';
      setMessage(msg);
    }
  };

  return (
    <div className="ad-auth-wrapper">
      <div className="ad-auth-box">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="ad-auth-img">
              <img src="../../assets/admin/images/auth-img1.png" alt="" />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="ad-auth-content">
              <form onSubmit={(e) => e.preventDefault()}>
                <a href="/" className="ad-auth-logo">
                  <img src="../../assets/admin/images/logo2.png" alt="Logo" />
                </a>
                <h2>
                  <span className="primary">Xin chào,</span>Chào mừng!
                </h2>
                <p>Vui lòng nhập thông tin chi tiết của bạn bên dưới để tiếp tục</p>

                <div className="ad-auth-form">
                  <div className="ad-auth-feilds mb-30">
                    <input
                      type="text"
                      placeholder="Địa chỉ Email"
                      className="ad-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="ad-auth-feilds">
                    <input
                      type="password"
                      placeholder="Mật khẩu"
                      className="ad-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="ad-other-feilds">
                  <div className="ad-checkbox">
                    <label>
                      <input type="checkbox" className="ad-checkbox" />
                      <span>Nhớ</span>
                    </label>
                  </div>
                  <a className="forgot-pws-btn" href="/admin/forgot-password">
                    Quên mật khẩu?
                  </a>
                </div>

                <div className="ad-auth-btn">
                  <button className="ad-btn ad-login-member" onClick={loginAdmin}>
                    Đăng nhập
                  </button>
                </div>

                {message && <p style={{ color: 'red', marginTop: 10 }}>{message}</p>}

                <p className="ad-register-text">
                  Bạn chưa có tài khoản? <a href="/register">Bấm vào đây</a>
                </p>
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
  );
};

export default Login;
  