import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import QuickViewModal from '../../components/home/QuickViewModal';
import ScrollTopButton from '../../layout/ScrollTopButton';
import WOW from 'wowjs'; 
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../../apiService/authService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [hasBgClass, setHasBgClass] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity()) {
      try {
        const credentials = { email, password };
        const response = await login(credentials);
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('username', response.username);

        toast.success('✅ Đăng nhập thành công, chuyển về trang chủ...');
        setTimeout(() => navigate('/'), 2000);

        setEmail('');
        setPassword('');
      } catch (error) {
        toast.error(`❌ ${error.message}`);
      }
    } else {
      form.reportValidity();
    }
  };

  useEffect(() => {
    if (hasBgClass) {
      document.body.classList.add('bg');
    }
    return () => {
      document.body.classList.remove('bg');
    };
  }, [hasBgClass]);


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
      toast.success(successMsg);
      localStorage.removeItem('resetSuccess');
    }
  }, []);

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <>
      <div className="page-wraper">
        <Helmet>
          <title>Login - KLTN Fashion Shop</title>
        </Helmet>

        <div className="page-content bg-light">
          <section className="px-3">
            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-lg-6 start-side-content">
                <div className="dz-bnr-inr-entry">
                  <h1>Login</h1>
                  <nav className="breadcrumb-row">
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item"><a href="/">Home</a></li>
                      <li className="breadcrumb-item">Login</li>
                    </ul>
                  </nav>
                </div>
                <div className="registration-media">
                  <img src="../../assets/user/images/registration/pic3.png" alt="/" />
                </div>
              </div>

              <div className="col-xxl-6 col-xl-6 col-lg-6 end-side-content justify-content-center">
                <div className="login-area">
                  <h2 className="text-secondary text-center">Login</h2>
                  <p className="text-center m-b25">Welcome, please login to your account</p>

                  <form onSubmit={handleSubmit}>
                    <div className="m-b30">
                      <label className="label-title">Email Address</label>
                      <input
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control"
                        placeholder="Email Address"
                        type="email"
                      />
                    </div>
                    <div className="m-b15">
                      <label className="label-title">Password</label>
                      <div className="secure-input">
                        <input
                          type="password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control dz-password"
                          placeholder="Password"
                          required
                        />
                        <div className="show-pass">
                          <i className="eye-open fa-regular fa-eye" />
                        </div>
                      </div>
                    </div>

                    <div className="form-row d-flex justify-content-between m-b30">
                      <div className="form-group">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
                          <label className="form-check-label" htmlFor="basic_checkbox_1">Remember Me</label>
                        </div>
                      </div>
                      <div className="form-group">
                        <Link to="/user/auth/forgetpassword" className="text-primary">Forgot Password</Link>
                      </div>
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-secondary">Login</button>
                      <Link to="/user/auth/registration" className="btn btn-outline-secondary btnhover text-uppercase">
                        Register
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>

        <ScrollTopButton />
        <QuickViewModal />
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </>
  );
}

export default Login;
