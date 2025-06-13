const ProgressBars = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                <h4 className="page-title">Progress Bars</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Dashboard</a>
                                    </li>
                                    <li className="breadcrumb-link active">Progress Bars</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Products view Start --> */}
				
				<div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                <h4>Basic Progress Bar</h4>
                            </div>
                            <div className="card-body">
								<div className="progress">
									<div className="progress-bar" style={{ width: '50%' }}></div>
								</div>
								<br/>
                                <div className="progress">
									<div className="progress-bar" style={{ width: '70%' }}></div>
								</div>
								<br/>
								<div className="progress">
									<div className="progress-bar" style={{ width: '90%' }}></div>
								</div>
                            </div>
                        </div>
                    </div>
					
					<div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                <h4>Progress Bar With Label</h4>
                            </div>
                            <div className="card-body">
								<div className="progress">
									<div className="progress-bar" style={{ width: '50%' }}>50%</div>
								</div>
								<br/>
								<div className="progress">
									<div className="progress-bar" style={{ width: '70%' }}>70%</div>
								</div>
								<br/>
								<div className="progress">
									<div className="progress-bar" style={{ width: '100%' }}>100%</div>
								</div>
                            </div>
                        </div>
                    </div>
					
					<div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                <h4>Progress Bar Height</h4>
                            </div>
                            <div className="card-body">
								<div className="progress" style={{ height: '12px' }}>
									<div className="progress-bar" style={{ width: '40%', height: '12px' }}></div>
								</div>
								<br/>
								<div className="progress" style={{ height: '20px' }}>
									<div className="progress-bar" style={{ width: '50%', height: '20px' }}></div>
								</div>
								<br/>
								<div className="progress" style={{ height: '25px' }}>
									<div className="progress-bar" style={{ width: '60%', height: '25px' }}></div>
								</div>
								<br/>
								<div className="progress" style={{ height: '30px' }}>
									<div className="progress-bar" style={{ width: '70%', height: '30px' }}></div>
								</div>
								<br/>
								<div className="progress" style={{ height: '40px' }}>
									<div className="progress-bar" style={{ width: '90%', height: '40px' }}></div>
								</div>
                            </div>
                        </div>
                    </div>
					
					<div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                <h4>Colored Progress Bars</h4>
                            </div>
                            <div className="card-body">
								{/* <!-- Blue --> */}
								<div className="progress">
								  <div className="progress-bar" style={{ width: '10%' }}></div>
								</div>
								<br/>
								{/* <!-- Green --> */}
								<div className="progress">
								  <div className="progress-bar bg-success" style={{ width: '20%' }}></div>
								</div>
								<br/>
								{/* <!-- Turquoise --> */}
								<div className="progress">
								  <div className="progress-bar bg-info" style={{ width: '30%' }}></div>
								</div>
								<br/>
								{/* <!-- Orange --> */}
								<div className="progress">
								   <div className="progress-bar bg-warning" style={{ width: '40%' }}></div>
								</div>
								<br/>
								{/* <!-- Red --> */}
								<div className="progress">
								  <div className="progress-bar bg-danger" style={{ width: '50%' }}></div>
								</div>
								<br/>
								{/* <!-- White --> */}
								<div className="progress border">
								  <div className="progress-bar bg-white" style={{ width: '60%' }}></div>
								</div>
								<br/>
								{/* <!-- Grey --> */}
								<div className="progress">
								  <div className="progress-bar bg-secondary" style={{ width: '70%' }}></div>
								</div>
                            </div>
                        </div>
                    </div>
					
					<div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                <h4>Striped Progress Bars</h4>
                            </div>
                            <div className="card-body">
								<div className="progress">
									<div className="progress-bar progress-bar-striped" style={{ width: '30%' }}></div>
								</div>
								<br/>
								<div className="progress">
									<div className="progress-bar bg-success progress-bar-striped" style={{ width: '40%' }}></div>
								</div>
								<br/>
								<div className="progress">
									<div className="progress-bar bg-info progress-bar-striped" style={{ width: '50%' }}></div>
								</div>
								<br/>
								<div className="progress">
									<div className="progress-bar bg-warning progress-bar-striped" style={{ width: '60%' }}></div>
								</div>
								<br/>
								<div className="progress">
									<div className="progress-bar bg-danger progress-bar-striped" style={{ width: '70%' }}></div>
								</div>
                            </div>
                        </div>
                    </div>
					
					<div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                <h4>Animated Progress Bar</h4>
                            </div>
                            <div className="card-body">
								<div className="progress">
									<div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '30%' }}>
									</div>
								</div>
								<br/>
								<div className="progress">
									<div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '40%' }}>
									</div>
								</div>
								<br/>
								<div className="progress">
									<div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '60%' }}>
									</div>
								</div>
								<br/>
								<div className="progress">
									<div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '80%' }}>
									</div>
								</div>
								<br/>
								<div className="progress">
									<div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: '100%' }}>
									</div>
								</div>
                            </div>
                        </div>
                    </div>
					
					<div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="card table-card">
                            <div className="card-header pb-0">
                                <h4>Multiple Progress Bars</h4>
                            </div>
                            <div className="card-body">
								<div className="progress">
								  <div className="progress-bar bg-success" style={{ width: '40%' }}>
									Free Space
								  </div>
								  <div className="progress-bar bg-warning" style={{ width: '10%' }}>
									Warning
								  </div>
								  <div className="progress-bar bg-danger" style={{ width: '20%' }}>
									Danger
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
  
  export default ProgressBars;