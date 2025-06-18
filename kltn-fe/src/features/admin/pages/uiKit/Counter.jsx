const Counter = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
								{/* Counters */}
                                <h4 className="page-title">Quầy</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
										{/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                                    </li>
                                    <li className="breadcrumb-link active">Quầy</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Products view Start --> */}
				<div className="row">
				  <div className="col-sm-12">
					<div className="card">
						<div className="card-header">
							{/* Custom Counters 1 */}
							<h5>Bộ đếm tùy chỉnh 1</h5>
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col-lg-4">
									<div className="int-count2-box counter-text">
										<h1><span className="count-no1" data-to="654" data-speed="3000">654</span><span>+</span></h1>
										{/* personal trainers */}
										<p>Huấn luyện viên cá nhân</p>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="int-count2-box counter-text">
										<h1 className="back-img1"><span className="count-no1" data-to="321" data-speed="3000">321</span><span>+</span></h1>
										{/* trusted clients */}
										<p>Khách hàng đáng tin cậy</p>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="int-count2-box counter-text">
										<h1 className="back-img2"><span className="count-no1" data-to="454" data-speed="3000">454</span><span>+</span></h1>
										{/* awards win */}
										<p>Giành giải thưởng</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				  </div>
				</div>
				<div className="row">
				  <div className="col-sm-12">
					<div className="card">
						<div className="card-header">
							<h5>Bộ đếm tùy chỉnh 2</h5>
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col-lg-4">
									<div className="int-count2-box int-count3 counter-text">
										<h1><span className="count-no1" data-to="654" data-speed="3000">654</span><span>+</span></h1>
										<p>Huấn luyện viên cá nhân</p>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="int-count2-box int-count3 counter-text">
										<h1 className=""><span className="count-no1" data-to="321" data-speed="3000">321</span><span>+</span></h1>
										<p>Khách hàng đáng tin cậy</p>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="int-count2-box int-count3 counter-text">
										<h1 className=""><span className="count-no1" data-to="454" data-speed="3000">454</span><span>+</span></h1>
										<p>Giành giải thưởng</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				  </div>
				</div>
				<div className="row">
				  <div className="col-sm-12">
					<div className="card">
						<div className="card-header">
							<h5>Bộ đếm tùy chỉnh 3</h5>
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col-lg-4">
									<div className="int-count2-box int-count4 counter-text">
										<h1><span className="count-no1" data-to="654" data-speed="3000">654</span><span>+</span></h1>
										<p>Huấn luyện viên cá nhân</p>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="int-count2-box int-count4 counter-text">
										<h1 className=""><span className="count-no1" data-to="321" data-speed="3000">321</span><span>+</span></h1>
										<p>Khách hàng đáng tin cậy</p>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="int-count2-box int-count4 counter-text">
										<h1 className=""><span className="count-no1" data-to="454" data-speed="3000">454</span><span>+</span></h1>
										<p>Giành giải thưởng</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				  </div>
				</div>
				<div className="ad-footer-btm">
					<p>Copyright 2022 © SplashDash All Rights Reserved.</p>
				</div>
            </div>
  );
  
  export default Counter;