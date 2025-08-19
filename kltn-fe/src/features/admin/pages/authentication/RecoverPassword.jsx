import React, { useState } from 'react';
import axios from 'axios';

const RecoverPassword = () => {
  const [step, setStep] = useState(1); // 1: nhập email, 2: nhập OTP + password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    if (!email) {
      setMessage('❗ Vui lòng nhập email');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8765/api/auth/forgotPasswordAdmin', { email });
      setStep(2);
      setMessage('✅ Mã OTP đã được gửi về email của bạn');
    } catch (err) {
      const msg = err?.response?.data || '❌ Gửi OTP thất bại';
      setMessage(msg);
    }
  };

  const resetPassword = async () => {
    if (!otp || !newPassword || !confirmPassword) {
      setMessage('❗ Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('❗ Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8765/api/auth/resetPasswordAdmin', {
        email,
        otp,
        newPassword
      });
      setMessage('✅ Đặt lại mật khẩu thành công, vui lòng đăng nhập lại');
    } catch (err) {
      const msg = err?.response?.data || '❌ Đặt lại mật khẩu thất bại';
      setMessage(msg);
    }
  };

  return (
    <div className="ad-auth-wrapper">
      <div className="ad-auth-box">
        <div className="row align-items-center">
          <div className="col-xl-6">
            <div className="ad-auth-img">
              <img src="../../assets/admin/images/auth-img1.png" alt="Recover Password" />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="ad-auth-content">
              <form onSubmit={(e) => e.preventDefault()}>
                <a href="/" className="ad-auth-logo">
                  <img src="../../assets/admin/images/logo2.png" alt="Logo" />
                </a>
                <h2>
                  <span className="primary">Khôi phục mật khẩu</span>
                </h2>
                <p>
                  {step === 1
                    ? 'Nhập email để nhận mã OTP đặt lại mật khẩu'
                    : 'Nhập mã OTP và mật khẩu mới'}
                </p>

                <div className="ad-auth-form">
                  <input
                    type="email"
                    className="ad-input mb-20"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={step === 2}
                  />
                  {step === 2 && (
                    <>
                      <input
                        type="text"
                        className="ad-input mb-20"
                        placeholder="Mã OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <input
                        type="password"
                        className="ad-input mb-20"
                        placeholder="Mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <input
                        type="password"
                        className="ad-input mb-20"
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </>
                  )}
                </div>

                <div className="ad-auth-btn">
                  <button
                    className="ad-btn ad-login-member"
                    onClick={step === 1 ? sendOtp : resetPassword}
                  >
                    {step === 1 ? 'Gửi mã OTP' : 'Đặt lại mật khẩu'}
                  </button>
                </div>

                {message && (
                  <p style={{ color: message.includes('✅') ? 'green' : 'red', marginTop: 10 }}>
                    {message}
                  </p>
                )}

                <p className="ad-register-text">
                  Trở lại <a href="/admin/login">đăng nhập</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
