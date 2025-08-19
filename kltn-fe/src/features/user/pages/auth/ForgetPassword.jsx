import React, { useEffect, useState } from 'react';
import WOW from 'wowjs';
import ScrollTopButton from '../../layout/ScrollTopButton';
import QuickViewModal from '../../components/home/QuickViewModal';
import { requestOtpResetPassword, resetPassword,checkEmailExists} from '../../apiService/authService';

import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
  const navigate = useNavigate();
  const [hasBgClass, setHasBgClass] = useState(true);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  // const [message, setMessage] = useState('');
  const [isOtpInputVisible, setIsOtpInputVisible] = useState(false);
  const [isSendingDisabled, setIsSendingDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

const showToastMessage = (msg) => {
  setToastMessage(msg);
  setShowToast(true);
  setTimeout(() => setShowToast(false), 2000);
};  
  const handleSendVerification = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToastMessage("❌ Email không hợp lệ. Vui lòng nhập đúng định dạng email.");
      return;
    }
    
    const exists = await checkEmailExists(email);
    if (!exists) {
      showToastMessage("❌ Email này không tồn tại trong hệ thống.");
      return;
    }
  
    setIsSendingDisabled(true);
    setIsOtpInputVisible(true);
    setCountdown(60);
  
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSendingDisabled(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
  
    try {
      await requestOtpResetPassword(email);
      showToastMessage("✅ Mã OTP đã được gửi đến email của bạn.");
    } catch (error) {
      showToastMessage(`❌ Lỗi gửi mã OTP: ${error.message}`);
    }
  };
  

  const handleResetPassword = async (e) => {
    e.preventDefault();
  
    const passwordErrors = [];
    if (newPassword.length < 8) passwordErrors.push("Ít nhất 8 ký tự");
    if (!/[A-Z]/.test(newPassword)) passwordErrors.push("Ít nhất 1 chữ hoa");
    if (!/[a-z]/.test(newPassword)) passwordErrors.push("Ít nhất 1 chữ thường");
    if (!/[0-9]/.test(newPassword)) passwordErrors.push("Ít nhất 1 số");
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(newPassword)) passwordErrors.push("Ít nhất 1 ký tự đặc biệt");
  
    if (passwordErrors.length > 0) {
      showToastMessage("❌ Mật khẩu không hợp lệ:\n" + passwordErrors.join('\n'));
      return;
    }
    
    if (newPassword !== confirmNewPassword) {
      showToastMessage("❌ Mật khẩu xác nhận không khớp.");
      return;
    }
  
    try {
      await resetPassword({ email, otp, newPassword });
      localStorage.setItem('resetSuccess', 'Đổi mật khẩu thành công');
      navigate('/user/auth/login');
    } catch (error) {
      showToastMessage(error.message || 'Có lỗi xảy ra khi đặt lại mật khẩu');
    }
  };
  

  useEffect(() => {
    if (hasBgClass) document.body.classList.add('bg');
    return () => document.body.classList.remove('bg');
  }, [hasBgClass]);

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <div className="page-wraper">
      <div className="page-content bg-light">
        <section className="px-3">
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 start-side-content">
              <div className="dz-bnr-inr-entry">
                <h1>Quên mật khẩu</h1>
              </div>
              <div className="registration-media">
                <img src="../../assets/user/images/registration/pic3.png" alt="/" />
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 end-side-content justify-content-center">
              <div className="login-area">
                <h2 className="text-secondary text-center">
                Đặt lại mật khẩu
                  {/* Reset Password */}
                </h2>
                <p className="text-center m-b25">
                Nhập email của bạn để đặt lại mật khẩu
                  {/* Enter your email to reset your password */}
                </p>
                <form onSubmit={handleResetPassword}>
                  <div className="m-b25">
                    <label className="label-title">Địa chỉ Email</label>
                    <div className="d-flex align-items-center" style={{ gap: '10px' }}>
  <input
    type="email"
    className="form-control"
    placeholder="Nhập địa chỉ email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    disabled={isSendingDisabled}
    style={{ flex: 1 }}
  />
  <button
    type="button"
    className="btn btn-success"
    onClick={handleSendVerification}
    disabled={isSendingDisabled}
    style={{ whiteSpace: 'nowrap', padding: '15px 20px' }}
  >
    {isSendingDisabled ? `Gửi lại (${countdown}s)` : 'Gửi Mã'}
  </button>
</div>

                  </div>

                  {isOtpInputVisible && (
                    <>
                      <div className="m-b25">
                        <label className="label-title">OTP</label>
                        <input
                          type="text"
                          className="form-control"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Nhập mã OTP"
                          required
                        />
                      </div>
                      <div className="m-b25">
  <label className="label-title">Mật khẩu mới</label>
  <input
    type="password"
    className="form-control"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    placeholder="Nhập mật khẩu mới"
    required
  />
</div>

<div className="m-b25">
  <label className="label-title">Nhập lại mật khẩu</label>
  <input
    type="password"
    className="form-control"
    value={confirmNewPassword}
    onChange={(e) => setConfirmNewPassword(e.target.value)}
    placeholder="Xác nhận mật khẩu mới"
    required
  />
</div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-secondary">Đặt lại mật khẩu</button>
                      </div>
                    </>
                  )}
                </form>
                {/* {message && (<div className="alert alert-info text-center mt-3" style={{ whiteSpace: 'pre-wrap' }}>{message}</div>)} */}
              </div>
            </div>
          </div>
        </section>
      </div>
      <ScrollTopButton />
      <QuickViewModal />
      {showToast && (
  <div style={{
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    padding: '12px 20px',
    backgroundColor: '#2196f3', // Xanh dương thông báo
    color: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    whiteSpace: 'pre-wrap'
  }}>
    {toastMessage}
  </div>
)}
    </div>
  );
}

export default ForgetPassword;
