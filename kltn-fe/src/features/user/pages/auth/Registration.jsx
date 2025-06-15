// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js

function Registration() {
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
    <div className="row align-center-center">
      <div className="col-xxl-6 col-xl-6 col-lg-6 start-side-content">
        <div className="dz-bnr-inr-entry">
          <h1>Registration</h1>
          <nav
            aria-label="breadcrumb text-align-start"
            className="breadcrumb-row"
          >
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html"> Home</a>
              </li>
              <li className="breadcrumb-item">Shop Registration</li>
            </ul>
          </nav>
        </div>
        <div className="registration-media">
          <img src="../../assets/user/images//registration/pic3.png" alt="/" />
        </div>
      </div>
      <div className="col-xxl-6 col-xl-6 col-lg-6 end-side-content">
        <div className="login-area">
          <h2 className="text-secondary text-center">Registration Now</h2>
          <p className="text-center m-b30">
            Welcome please registration to your account
          </p>
          <form>
            <div className="m-b25">
              <label className="label-title">Username</label>
              <input
                name="dzName"
                required=""
                className="form-control"
                placeholder="Username"
                type="text"
              />
            </div>
            <div className="m-b25">
              <label className="label-title">Email Address</label>
              <input
                name="dzName"
                required=""
                className="form-control"
                placeholder="Email Address"
                type="email"
              />
            </div>
            <div className="m-b40">
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
            <div className="text-center">
              <a
                href="registration.html"
                className="btn btn-secondary btnhover text-uppercase me-2"
              >
                Register
              </a>
              <a
                href="login.html"
                className="btn btn-outline-secondary btnhover text-uppercase"
              >
                Sign In
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
				<div className="row align-center-center">
					<div className="col-xxl-6 col-xl-6 col-lg-6 start-side-content">
						<div className="dz-bnr-inr-entry">
							<h1>Registration</h1>
							<nav aria-label="breadcrumb text-align-start" className="breadcrumb-row">
								<ul className="breadcrumb">
									<li className="breadcrumb-item"><a href="/"> Home</a></li>
									<li className="breadcrumb-item">Shop Registration</li>
								</ul>
							</nav>	
						</div>
						<div className="registration-media">
							<img src="../../assets/user/images/registration/pic3.png" alt="/" />
						</div>
					</div>
					<div className="col-xxl-6 col-xl-6 col-lg-6 end-side-content">
						<div className="login-area">
							<h2 className="text-secondary text-center">Registration Now</h2>
							<p className="text-center m-b30">Welcome please registration to your account</p>
							<form>
								<div className="m-b25">
									<label className="label-title">Username</label>
									<input name="dzName" required="" className="form-control" placeholder="Username" type="text" />
								</div>
								<div className="m-b25">
									<label className="label-title">Email Address</label>
									<input name="dzName" required="" className="form-control" placeholder="Email Address" type="email" />
								</div>
								<div className="m-b40">
									<label className="label-title">Password</label>
									<div className="secure-input ">
										<input type="password" name="password" className="form-control dz-password" placeholder="Password" />
										<div className="show-pass">
											<i className="eye-open fa-regular fa-eye"></i>
										</div>
									</div>
								</div>
								<div className="text-center">
									<a href="/user/auth/registration" className="btn btn-secondary btnhover text-uppercase me-2">Register</a>
									<a href="/user/auth/login" className="btn btn-outline-secondary btnhover text-uppercase">Sign In</a>
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

export default Registration;