const Carousal = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
								{/* Carousal */}
                                <h4 className="page-title">Vòng quay</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
										{/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                                    </li>
                                    <li className="breadcrumb-link active">Vòng quay</li>
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
						{/* Carousal With controls */}
						<h5>Vòng quay với các nút điều khiển</h5>
					  </div>
					  <div className="card-body">
						<div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
						  <div className="carousel-inner">
							<div className="carousel-item active">
							  <img className="d-block w-100" src="../../assets/admin/images/carousal1.jpg" alt="First slide"/>
							</div>
							<div className="carousel-item">
							  <img className="d-block w-100" src="../../assets/admin/images/carousal2.jpg" alt="Second slide"/>
							</div>
							<div className="carousel-item">
							  <img className="d-block w-100" src="../../assets/admin/images/carousal3.jpg" alt="Third slide"/>
							</div>
						  </div>
						  <a className="carousel-control-prev" href="carousal.html#carouselExampleControls" role="button" data-bs-slide="prev">
							<span className="carousel-control-prev-icon" aria-hidden="true"></span>
							<span className="sr-only">Previous</span>
						  </a>
						  <a className="carousel-control-next" href="carousal.html#carouselExampleControls" role="button" data-bs-slide="next">
							<span className="carousel-control-next-icon" aria-hidden="true"></span>
							<span className="sr-only">Next</span>
						  </a>
						</div>
					  </div>
					</div>
				  </div>
				</div>
				<div className="row">
				  <div className="col-sm-12">
					<div className="card">
					  <div className="card-header">
						{/* Carousal With indicators */}
						<h5>Vòng quay với các chỉ số</h5>
					  </div>
					  <div className="card-body">
						<div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
						  {/* <!-- <ol className="carousel-indicators">
							<li data-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
							<li data-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
							<li data-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
						  </ol> --> */}
                          <div className="carousel-indicators">
							<button data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
							<button data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
							<button data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
						  </div>
						  <div className="carousel-inner">
							<div className="carousel-item active">
							  <img className="d-block w-100" src="../../assets/admin/images/carousal4.jpg" alt="First slide"/>
							</div>
							<div className="carousel-item">
							  <img className="d-block w-100" src="../../assets/admin/images/carousal5.jpg" alt="Second slide"/>
							</div>
							<div className="carousel-item">
							  <img className="d-block w-100" src="../../assets/admin/images/carousal6.jpg" alt="Third slide"/>
							</div>
						  </div>
						  <a className="carousel-control-prev" href="carousal.html#carouselExampleIndicators" role="button" data-bs-slide="prev">
							<span className="carousel-control-prev-icon" aria-hidden="true"></span>
							<span className="sr-only">Previous</span>
						  </a>
						  <a className="carousel-control-next" href="carousal.html#carouselExampleIndicators" role="button" data-bs-slide="next">
							<span className="carousel-control-next-icon" aria-hidden="true"></span>
							<span className="sr-only">Next</span>
						  </a>
						</div>
					  </div>
					</div>
				  </div>
				</div>
				<div className="row">
				  <div className="col-sm-12">
					<div className="card">
					  <div className="card-header">
						{/* Carousal With Crossfade */}
						<h5>Vòng xoay với Crossfade</h5>
					  </div>
					  <div className="card-body">
						<div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
						  <div className="carousel-inner">
							<div className="carousel-item active">
							  <img className="d-block w-100" src="../../assets/admin/images/carousal7.jpg" alt="First slide"/>
							</div>
							<div className="carousel-item">
							  <img className="d-block w-100" src="../../assets/admin/images/carousal8.jpg" alt="Second slide"/>
							</div>
							<div className="carousel-item">
							  <img className="d-block w-100" src="../../assets/admin/images/carousal9.jpg" alt="Third slide"/>
							</div>
						  </div>
						  <a className="carousel-control-prev" href="carousal.html#carouselExampleFade" role="button" data-bs-slide="prev">
							<span className="carousel-control-prev-icon" aria-hidden="true"></span>
							<span className="sr-only">Previous</span>
						  </a>
						  <a className="carousel-control-next" href="carousal.html#carouselExampleFade" role="button" data-bs-slide="next">
							<span className="carousel-control-next-icon" aria-hidden="true"></span>
							<span className="sr-only">Next</span>
						  </a>
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
  
  export default Carousal;