const Editor = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                {/* Editor */}
                                <h4 className="page-title">Biên tập viên</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        {/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                                    </li>
                                    <li className="breadcrumb-link active">Biên tập viên</li>
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
                                {/* Note Editor */}
                                <h4>Trình chỉnh sửa ghi chú</h4>
                            </div>
                            <div className="card-body">
                                <textarea name="editor" placeholder="Nhập văn bản..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
				
				<div className="ad-footer-btm">
					<p>Copyright 2022 © SplashDash All Rights Reserved.</p>
				</div>	
            </div>
  );
  
  export default Editor;