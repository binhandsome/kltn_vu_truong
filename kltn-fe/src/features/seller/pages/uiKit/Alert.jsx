const Alert = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
								{/* Alerts */}
                                <h4 className="page-title">Cảnh báo</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
										{/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                                    </li>
                                    <li className="breadcrumb-link active">Cảnh báo</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Products view Start --> */}
				
				<div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
								{/* Alert Links */}
                                <h4>Liên kết cảnh báo</h4>
								{/* Add the alert-link class to any links inside the alert box to create "matching colored links": */}
								<p>Thêm lớp alert-link vào bất kỳ liên kết nào bên trong hộp cảnh báo để tạo "liên kết có màu phù hợp":</p>
                            </div>
                            <div className="card-body">
							  <div className="alert alert-success">
								<strong>Success!</strong> You should <a href="alert.html#" className="alert-link">read this message</a>.
							  </div>
							  <div className="alert alert-info">
								<strong>Info!</strong> You should <a href="alert.html#" className="alert-link">read this message</a>.
							  </div>
							  <div className="alert alert-warning">
								<strong>Warning!</strong> You should <a href="alert.html#" className="alert-link">read this message</a>.
							  </div>
							  <div className="alert alert-danger">
								<strong>Danger!</strong> You should <a href="alert.html#" className="alert-link">read this message</a>.
							  </div>
							  <div className="alert alert-primary">
								<strong>Primary!</strong> You should <a href="alert.html#" className="alert-link">read this message</a>.
							  </div>
							  <div className="alert alert-secondary">
								<strong>Secondary!</strong> You should <a href="alert.html#" className="alert-link">read this message</a>.
							  </div>
							  <div className="alert alert-dark">
								<strong>Dark!</strong> You should <a href="alert.html#" className="alert-link">read this message</a>.
							  </div>
							  <div className="alert alert-light">
								<strong>Light!</strong> You should <a href="alert.html#" className="alert-link">read this message</a>.
							  </div>
							</div>
                        </div>
                    </div>
                </div>
				
				<div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
								{/* Closing Alerts */}
                                <h4>Cảnh báo đóng cửa</h4>
								{/* Alerts are created with the .alert class, followed by a contextual color classes: */}
                                <p>Cảnh báo được tạo bằng lớp .alert, theo sau là các lớp màu theo ngữ cảnh:</p>
                            </div>
                            <div className="card-body">
							  <div className="alert alert-success">
								<strong>Success!</strong> This alert box could indicate a successful or positive action.
								<button type="button" className="close" data-bs-dismiss="alert" aria-label="Close">
									<span aria-hidden="true" style={{ fontSize: '20px' }}>×</span>
								</button>
							  </div>
							  <div className="alert alert-info">
								<strong>Info!</strong> This alert box could indicate a neutral informative change or action.
								<button type="button" className="close" data-bs-dismiss="alert" aria-label="Close">
									<span aria-hidden="true" style={{ fontSize: '20px' }}>×</span>
								</button>
							  </div>
							  <div className="alert alert-warning">
								<strong>Warning!</strong> This alert box could indicate a warning that might need attention.
								<button type="button" className="close" data-bs-dismiss="alert" aria-label="Close">
									<span aria-hidden="true" style={{ fontSize: '20px' }}>×</span>
								</button>
							  </div>
							  <div className="alert alert-danger">
								<strong>Danger!</strong> This alert box could indicate a dangerous or potentially negative action.
								<button type="button" className="close" data-bs-dismiss="alert" aria-label="Close">
									<span aria-hidden="true" style={{ fontSize: '20px' }}>×</span>
								</button>
							  </div>
							  <div className="alert alert-primary">
								<strong>Primary!</strong> Indicates an important action.
								<button type="button" className="close" data-bs-dismiss="alert" aria-label="Close">
									<span aria-hidden="true" style={{ fontSize: '20px' }}>×</span>
								</button>
							  </div>
							  <div className="alert alert-secondary">
								<strong>Secondary!</strong> Indicates a slightly less important action.
								<button type="button" className="close" data-bs-dismiss="alert" aria-label="Close">
									<span aria-hidden="true" style={{ fontSize: '20px' }}>×</span>
								</button>
							  </div>
							  <div className="alert alert-dark">
								<strong>Dark!</strong> Dark grey alert.
								<button type="button" className="close" data-bs-dismiss="alert" aria-label="Close">
									<span aria-hidden="true" style={{ fontSize: '20px' }}>×</span>
								</button>
							  </div>
							  <div className="alert alert-light">
								<strong>Light!</strong> Light grey alert.
								<button type="button" className="close" data-bs-dismiss="alert" aria-label="Close">
									<span aria-hidden="true" style={{ fontSize: '20px' }}>×</span>
								</button>
							  </div>
                            </div>
                        </div>
                    </div>
                </div>
				
				<div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">

								{/* Animated Alerts */}
                                <h4>Cảnh báo hoạt hình</h4>
								{/* The .fade and .show classes adds a fading effect when closing the alert message. */}
                                <p>Các lớp .fade và .show thêm hiệu ứng mờ dần khi đóng thông báo cảnh báo.</p>
                            </div>
                            <div className="card-body">
							  <div className="alert alert-success alert-dismissible fade show">
								<button type="button" className="close" data-bs-dismiss="alert">&times;</button>
								<strong>Success!</strong> This alert box could indicate a successful or positive action.
							  </div>
							  <div className="alert alert-info alert-dismissible fade show">
								<button type="button" className="close" data-bs-dismiss="alert">&times;</button>
								<strong>Info!</strong> This alert box could indicate a neutral informative change or action.
							  </div>
							  <div className="alert alert-warning alert-dismissible fade show">
								<button type="button" className="close" data-bs-dismiss="alert">&times;</button>
								<strong>Warning!</strong> This alert box could indicate a warning that might need attention.
							  </div>
							  <div className="alert alert-danger alert-dismissible fade show">
								<button type="button" className="close" data-bs-dismiss="alert">&times;</button>
								<strong>Danger!</strong> This alert box could indicate a dangerous or potentially negative action.
							  </div>
							  <div className="alert alert-primary alert-dismissible fade show">
								<button type="button" className="close" data-bs-dismiss="alert">&times;</button>
								<strong>Primary!</strong> Indicates an important action.
							  </div>
							  <div className="alert alert-secondary alert-dismissible fade show">
								<button type="button" className="close" data-bs-dismiss="alert">&times;</button>
								<strong>Secondary!</strong> Indicates a slightly less important action.
							  </div>
							  <div className="alert alert-dark alert-dismissible fade show">
								<button type="button" className="close" data-bs-dismiss="alert">&times;</button>
								<strong>Dark!</strong> Dark grey alert.
							  </div>
							  <div className="alert alert-light alert-dismissible fade show">
								<button type="button" className="close" data-bs-dismiss="alert">&times;</button>
								<strong>Light!</strong> Light grey alert.
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
  
  export default Alert;