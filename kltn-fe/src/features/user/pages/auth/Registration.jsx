import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import QuickViewModal from '../../components/home/QuickViewModal';
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom';
import WOW from 'wowjs';
import { register, sendOtpToEmail } from '../../apiService/authService';

function Registration() {
  const [isOtpInputVisible, setIsOtpInputVisible] = useState(false);
  const [isSendingDisabled, setIsSendingDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [hasBgClass, setHasBgClass] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleSendVerification = async () => {
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
      await sendOtpToEmail(email);
      setMessage('✅ Mã OTP đã được gửi đến email của bạn.');
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register({ username, password, email, otp });
      setMessage(`✅ ${response}`);
      setUsername('');
      setPassword('');
      setEmail('');
      setOtp('');
    } catch (error) {
      setMessage(`❌ ${error.message}`);
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
    <>
      <Helmet><title>Registration - KLTN Fashion Shop</title></Helmet>
      <div className="page-wraper">
        <div className="page-content bg-light">
          <section className="px-3">
            <div className="row align-center-center">
              <div className="col-xxl-6 col-xl-6 col-lg-6 start-side-content">
                <div className="dz-bnr-inr-entry">
                  <h1>Registration</h1>
                  <nav className="breadcrumb-row">
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="/">Home</Link></li>
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
                      <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} required className="form-control" placeholder="Username" />
                    </div>

                    <div className="m-b25">
                      <label className="label-title">Email Address</label>
                     
<div style={{ display: 'flex' }}>
        <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
            placeholder="Email Address"
            type="email"
            style={{ flex: 1 }}
            disabled={isSendingDisabled}
        />
        <button
            type="button"
            className="btn btn-success"
            style={{
                marginLeft: '10px',
                fontSize: '15px',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
            }}
            onClick={handleSendVerification}
            disabled={isSendingDisabled}
        >
            {isSendingDisabled ? `Gửi lại (${countdown}s)` : 'Gửi Mã'}
        </button>
    </div>
                    </div>

                    {isOtpInputVisible && (
                      <div className="m-b25">
                        <input type="text" name="otp" value={otp} onChange={e => setOtp(e.target.value)} required className="form-control" placeholder="Nhập Mã OTP Nhận Từ Email Của Bạn" />
                      </div>
                    )}

                    <div className="m-b40">
                      <label className="label-title">Password</label>
                      <div className="secure-input">
                        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required className="form-control dz-password" placeholder="Password" />
                        <div className="show-pass"><i className="eye-open fa-regular fa-eye" /></div>
                      </div>
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-secondary">Register</button>
                      <Link to="/user/auth/login" className="btn btn-outline-secondary btnhover text-uppercase">Sign In</Link>
                    </div>
                  </form>
                  <br />
                  <div className="text-center">{message && <p>{message}</p>}</div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <ScrollTopButton />
        <QuickViewModal />
      </div>
    </>
  );
}

export default Registration;
