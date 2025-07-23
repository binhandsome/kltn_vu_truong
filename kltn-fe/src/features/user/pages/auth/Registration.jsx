import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import QuickViewModal from '../../components/home/QuickViewModal';
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom';
import WOW from 'wowjs';
import { register,checkEmailExists } from '../../apiService/authService';
import axios from 'axios';

function Registration() {
    const API_URL = 'http://localhost:8081/api/auth';
    const [isOtpInputVisible, setIsOtpInputVisible] = useState(false);
    const [isSendingDisabled, setIsSendingDisabled] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [hasBgClass, setHasBgClass] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    // const [message, setMessage] = useState('');
    const [otp, setOtp] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);

    const showToastMessage = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1000);
    };

    const handleSendVerification = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToastMessage("❌ Email không hợp lệ. Vui lòng nhập đúng định dạng email.");
            return;
          }
          const exists = await checkEmailExists(email);
          if (exists) {
            showToastMessage("❌ Email này đã tồn tại trong hệ thống.");
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
            await axios.post(`${API_URL}/sendEmailRegister`, { email });
            showToastMessage("✅ Gửi email xác thực thành công.");
          } catch (error) {
            showToastMessage("❌ Gửi email thất bại, vui lòng thử lại.");
          }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        if (form.checkValidity()) {
            const passwordErrors = [];
            if (password.length < 8) passwordErrors.push("Ít nhất 8 ký tự.");
            if (!/[A-Z]/.test(password)) passwordErrors.push("Ít nhất 1 chữ hoa.");
            if (!/[a-z]/.test(password)) passwordErrors.push("Ít nhất 1 chữ thường.");
            if (!/[0-9]/.test(password)) passwordErrors.push("Ít nhất 1 số.");
            if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) passwordErrors.push("Ít nhất 1 ký tự đặc biệt.");

            if (passwordErrors.length > 0) {
                showToastMessage("Mật khẩu không hợp lệ:\n" + passwordErrors.join('\n'));
                return;
            }

            if (password !== confirmPassword) {
                showToastMessage("Mật khẩu xác nhận không khớp.");
                return;
            }

            try {
                const user = { username, password,confirmPassword, email, otp, dateOfBirth };
                const response = await register(user);
                showToastMessage(response.message);
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                setEmail('');
                setDateOfBirth('');
                setTimeout(() => {
                    window.location.href = '/user/auth/login'; // hoặc navigate('/user/auth/login');
                  }, 1500);
            } catch (error) {
                showToastMessage(`Error: ${error.message}`);
            }
        } else {
            form.reportValidity();
        }
    };

    useEffect(() => {
        if (hasBgClass) document.body.classList.add('bg');
        return () => document.body.classList.remove('bg');
    }, [hasBgClass]);

    useEffect(() => {
        const wow = new WOW.WOW();
        wow.init();
    }, []);

    return (
        <>
            <Helmet>
                <title>Registration - KLTN Fashion Shop</title>
            </Helmet>
            <div className="page-wraper">
                <div className="page-content bg-light">
                    <section className="px-3">
                        <div className="row align-center-center">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 start-side-content">
                                <div className="dz-bnr-inr-entry">
                                    <h1>Registration</h1>
                                    <nav aria-label="breadcrumb text-align-start" className="breadcrumb-row">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to="/">Home</Link>
                                            </li>
                                            <li className="breadcrumb-item">Shop Registration</li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="registration-media">
                                    <img src="../../assets/user/images/registration/pic3.png" alt="Registration" />
                                </div>
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-lg-6 end-side-content">
                                <div className="login-area">
                                    <h2 className="text-secondary text-center">Register Now</h2>
                                    <p className="text-center m-b30">Welcome, please register for your account</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="m-b25">
                                            <label className="label-title">Username</label>
                                            <input name="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="form-control" placeholder="Username" type="text" />
                                        </div>
                                        <div className="m-b25">
                                            <label className="label-title">Email Address</label>
                                            <div style={{ display: 'flex' }}>
                                                <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control" placeholder="Email Address" type="email" style={{ flex: 1 }} disabled={isSendingDisabled} />
                                                <button type="button" className="btn btn-success" style={{ marginLeft: '10px' }} onClick={handleSendVerification} disabled={isSendingDisabled}>
                                                    {isSendingDisabled ? `Gửi lại (${countdown}s)` : 'Gửi Mã'}
                                                </button>
                                            </div>
                                        </div>
                                        {isOtpInputVisible && (
                                            <div className="m-b25">
                                                <input name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="form-control" placeholder="Nhập Mã OTP Nhận Từ Email Của Bạn" type="text" required />
                                            </div>
                                        )}
                                        <div className="m-b40">
                                            <label className="label-title">Password</label>
                                            <div className="secure-input">
                                                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control dz-password" placeholder="Password" />
                                                <div className="show-pass">
                                                    <i className="eye-open fa-regular fa-eye" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="m-b40">
  <label className="label-title">Confirm Password</label>
  <div className="secure-input">
    <input
      type="password"
      name="confirmPassword"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
      className="form-control dz-password"
      placeholder="Confirm Password"
    />
  </div>
</div>
<div className="m-b25">
  <label className="label-title">Date of Birth</label>
  <input
    type="date"
    name="dateOfBirth"
    value={dateOfBirth}
    onChange={(e) => setDateOfBirth(e.target.value)}
    required
    className="form-control"
  />
</div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-secondary">Register</button>
                                            <Link to="/user/auth/login" className="btn btn-outline-secondary btnhover text-uppercase">Sign In</Link>
                                        </div>
                                    </form>
                                    <br />
                                    {/* <div className="text-center">{message && <p>{message}</p>}</div> */}
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
    backgroundColor: '#4caf50',
    color: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    whiteSpace: 'pre-wrap'
  }}>
    {toastMessage}
  </div>
)}

            </div>
        </>
    );
}

export default Registration;
