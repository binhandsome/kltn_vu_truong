const Pagination = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
								{/* Pagination */}
                                <h4 className="page-title">Phân trang</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
										{/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                                    </li>
                                    <li className="breadcrumb-link active">Phân trang</li>
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
						{/* Custom Pagination */}
						<h5>Phân trang tùy chỉnh</h5>
					  </div>
					  <div className="card-body">
						<div className="int-blog-pagination">
							<ul className="pagination">
							  <li className="page-item"><a className="page-link" href="javascript:;"><i className="fas fa-chevron-left"></i> Lui lại</a></li>
							  <li className="page-item"><a className="page-link" href="javascript:;">1</a></li>
							  <li className="page-item"><a className="page-link" href="javascript:;">2</a></li>
							  <li className="page-item active"><a className="page-link" href="javascript:;">3</a></li>
							  <li className="page-item"><a className="page-link" href="javascript:;">...</a></li>
							  <li className="page-item"><a className="page-link" href="javascript:;">12</a></li>
							  <li className="page-item"><a className="page-link" href="javascript:;">13</a></li>
							  <li className="page-item"><a className="page-link" href="javascript:;">14</a></li>
							  <li className="page-item"><a className="page-link" href="javascript:;">Kế tiếp <i className="fas fa-chevron-right"></i></a></li>
							</ul>
						</div>
					  </div>
					</div>
				  </div>
				</div>
				<div className="row">
				  <div className="col-sm-12">
					<div className="card">
					  <div className="card-header">
						{/* Pagination active states */}
						<h5>Trạng thái hoạt động phân trang</h5>
					  </div>
					  <div className="card-body">
						<div className="mfh-pagination"> 
							<ul>
								<li><a href="javascript:;"><i className="fa fa-angle-left" aria-hidden="true"></i></a></li>
								<li><a href="javascript:;">1</a></li>
								<li className="active"><a href="javascript:;">2</a></li>
								<li><a href="javascript:;">3</a></li>
								<li className="active"><a href="javascript:;">4</a></li>
								<li><a href="javascript:;">5</a></li>
								<li><a href="javascript:;"><i className="fa fa-angle-right" aria-hidden="true"></i></a></li>
							</ul>
						</div>
					  </div>
					</div>
				  </div>
				</div>
				<div className="row">
				  <div className="col-sm-12">
					<div className="card">
					  <div className="card-header">
						{/* Pagination Working with icons */}
						<h5>Phân trang Làm việc với các biểu tượng</h5>
					  </div>
					  <div className="card-body">
						<div className="fb-pagination">
							<ul>
								<li><a href="javascript:;"><i className="fa fa-angle-double-left" aria-hidden="true"></i></a></li>
								<li><a href="javascript:;">01</a></li>
								<li><a href="javascript:;" className="active">02</a></li>
								<li><a href="javascript:;">03</a></li>
								<li><a href="javascript:;">...</a></li>
								<li><a href="javascript:;">04</a></li>
								<li><a href="javascript:;"><i className="fa fa-angle-double-right" aria-hidden="true"></i></a></li>
							</ul>
						</div>
					  </div>
					</div>
				  </div>
				</div>
				<div className="row">
				  <div className="col-sm-12">
					<div className="card">
					  <div className="card-header">
						{/* Sizing */}
						<h5>Định cỡ</h5>
					  </div>
					  <div className="card-body">
						<div className="tp-pagination">
							<ul>
								<li><a href="javascript:;"><i className="fa fa-angle-left" aria-hidden="true"></i></a></li>
								<li><a href="javascript:;">1</a></li>
								<li><a href="javascript:;" className="active">2</a></li>
								<li><a href="javascript:;">3</a></li>
								<li><a href="javascript:;">...</a></li>
								<li><a href="javascript:;">8</a></li>
								<li><a href="javascript:;"><i className="fa fa-angle-right" aria-hidden="true"></i></a></li>
							</ul>
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
  
  export default Pagination;