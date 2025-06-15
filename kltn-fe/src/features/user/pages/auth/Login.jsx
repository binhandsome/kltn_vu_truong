// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function Login() {
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
<<<<<<< HEAD
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
                <a href="index.html"> Home</a>
              </li>
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
          <p className="text-center m-b25">
            welcome please login to your account
          </p>
          <form>
            <div className="m-b30">
              <label className="label-title">Email Address</label>
              <input
                name="dzName"
                required=""
                className="form-control"
                placeholder="Email Address"
                type="email"
              />
            </div>
            <div className="m-b15">
              <label className="label-title">Password</label>
              <div className="secure-input ">
                <input
                  type="password"
                  name="password"
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
                    Remember Me
                  </label>
                </div>
              </div>
              <div className="form-group">
                <a className="text-primary" href="forget-password.html">
                  Forgot Password
                </a>
              </div>
            </div>
            <div className="text-center">
              <a
                href="account-dashboard.html"
                className="btn btn-secondary btnhover text-uppercase me-2 sign-btn"
              >
                Sign In
              </a>
              <a
                href="registration.html"
                className="btn btn-outline-secondary btnhover text-uppercase"
              >
                Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</div>
=======

        <div className="page-content bg-light">
		<section className="px-3">
			<div className="row">
				<div className="col-xxl-6 col-xl-6 col-lg-6 start-side-content">
					<div className="dz-bnr-inr-entry">
						<h1>Login</h1>
						<nav aria-label="breadcrumb text-align-start" className="breadcrumb-row">
							<ul className="breadcrumb">
								<li className="breadcrumb-item"><a href="/"> Home</a></li>
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
						<p className="text-center m-b25">welcome please login to your account</p>
						<form>
							<div className="m-b30">
								<label className="label-title">Email Address</label>
								<input name="dzName" required="" className="form-control" placeholder="Email Address" type="email" />
							</div>
							<div className="m-b15">
								<label className="label-title">Password</label>
								<div className="secure-input ">
									<input type="password" name="password" className="form-control dz-password" placeholder="Password" />
									<div className="show-pass">
										<i className="eye-open fa-regular fa-eye"></i>
									</div>
								</div>
							</div>
							<div className="form-row d-flex justify-content-between m-b30">
								<div className="form-group">
								   <div className="custom-control custom-checkbox">
										<input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
										<label className="form-check-label" for="basic_checkbox_1">Remember Me</label>
									</div>
								</div>
								<div className="form-group">
									<a className="/user/auth/forgetPassword" href="/user/auth/forgetPassword">Forgot Password</a>
								</div>
							</div>
							<div className="text-center">
								<a href="account-dashboard.html" className="btn btn-secondary btnhover text-uppercase me-2 sign-btn">Sign In</a>
								<a href="/user/auth/registration" className="btn btn-outline-secondary btnhover text-uppercase">Register</a>
							</div>
						</form>
					</div> 
				</div>
			</div>
		</section>
	</div> 
>>>>>>> 16ccae30b55463b9d7cecae760b95c9aae4fe913

        {/* Footer (đã được xử lý trong App.js) */}
         <ScrollTopButton/>
        <QuickViewModal />
      </div>
    </>
  );
}

export default Login;