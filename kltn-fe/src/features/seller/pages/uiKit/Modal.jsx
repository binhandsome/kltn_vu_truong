const Modal = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
								{/* Modal */}
                                <h4 className="page-title">Phương thức</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
										{/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                                    </li>
                                    <li className="breadcrumb-link active">Phương thức</li>
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
						{/* Static Example */}
						<h5>Ví dụ tĩnh</h5>
					  </div>
					  <div className="card-body">
						<div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', position: 'unset' }}>
						  <div className="modal-dialog" role="document">
							<div className="modal-content">
							  <div className="modal-header">
								<h5 className="modal-title">Tiêu đề phương thức</h5>
								<button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
								  <span aria-hidden="true">&times;</span>
								</button>
							  </div>
							  <div className="modal-body">
								<p>12345 aaaa</p>
							  </div>
							  <div className="modal-footer">
								<button type="button" className="btn btn-secondary squer-btn" data-bs-dismiss="modal">Đóng</button>
								<button type="button" className="btn btn-primary squer-btn">Lưu thay đổi</button>
							  </div>
							</div>
						  </div>
						</div>
					  </div>
					</div>
				  </div>
				  <div className="col-sm-12">
					<div className="card">
					  <div className="card-header">
						{/* Basic Modal */}
						<h5>Phương thức cơ bản</h5>
					  </div>
					  <div className="card-body">
						{/* <!-- Button trigger modal --> */}
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target="#exampleModalLong">
						  Đơn giản
						</button>
						{/* <!-- Button trigger modal --> */}
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target="#longc">
						Cuộn nội dung dài
						</button>
						{/* <!-- Button trigger modal --> */}
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target="#model3">
						  Căn giữa theo chiều dọc
						</button>
						{/* <!-- Button trigger modal --> */}
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target="#model4">
						Chú giải công cụ và cửa sổ bật lên
						</button>
						{/* <!-- Button trigger modal --> */}
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target="#model-grid">
						Sử dụng lưới
						</button>
						
					  </div>
					</div>
				  </div>
				  <div className="col-sm-12">
					<div className="card">
					  <div className="card-header">
						{/* Varying modal content */}
						<h5>Nội dung phương thức thay đổi</h5>
					  </div>
					  <div className="card-body">
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target="#exampleModal20" data-whatever="@mdo">Mở hộp thoại cho @mdo</button>
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target="#exampleModal21" data-whatever="@fat">Mở hộp thoại cho @fat</button>
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target="#exampleModal22" data-whatever="@getbootstrap">Mở modal cho @getbootstrap</button>
					  </div>
					</div>
				  </div>
				  <div className="col-sm-12">
					<div className="card">
					  <div className="card-header">
						{/* Sizes modal */}
						<h5>Kích thước phương thức</h5>
					  </div>
					  <div className="card-body">
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target=".bd-example-modal-lg">Phương thức lớn</button>
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target=".bd-example-modal-sm">Phương thức nhỏ</button>
					  </div>
					</div>
				  </div>
				</div>
				<div className="ad-footer-btm">
					<p>Copyright 2022 © SplashDash All Rights Reserved.</p>
				</div>
            </div>
  );
  
  export default Modal;