const VectorMap = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                {/* Vector Maps */}
                                <h4 className="page-title">Bản đồ véc tơ</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        {/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                                    </li>
                                    {/* Vector Maps */}
                                    <li className="breadcrumb-link active">Bản đồ véc tơ</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Products view Start --> */}
				
				<div className="row">
					<div className="col-lg-12">
						<div className="card">
						   <div className="card-body">

								<h4 className="card-title">Bản đồ mặc định của Vector</h4>
								<p className="card-title-desc">Ví dụ về bản đồ Vector.</p>
                                <div classname="ad-google-map">
                                    <div id="vmap" style={{ width: "100%", height: 600 }} />
                                </div>
							</div>
						</div>
					</div> 
                    {/* <!-- end col --> */}

				</div>
				<div className="ad-footer-btm">
					<p>Copyright 2022 © SplashDash All Rights Reserved.</p>
				</div>
            </div>
  );
  
  export default VectorMap;