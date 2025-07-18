const GoogleMap = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
								{/* Google Maps */}
                                <h4 className="page-title">Bản đồ Google</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
										{/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                                    </li>
									{/* Google Maps */}
                                    <li className="breadcrumb-link active">Bản đồ Google</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Products view Start --> */}
				<div className="row">
					<div className="col-lg-6">
						<div className="card">
						   <div className="card-body">
								{/* Default Maps */}
								<h4 className="card-title">Bản đồ mặc định</h4>
								{/* Example of google maps. */}
								<p className="card-title-desc">Ví dụ về bản đồ Google.</p>
							   <div className="ad-google-map">
								<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3369734.150220435!2d-96.57871699241277!3d38.99279830162545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1564574037986!5m2!1sen!2sin" allowfullscreen=""></iframe>
							   </div>
							</div>
						</div>
					</div> 
                    {/* <!-- end col --> */}

					<div className="col-lg-6">
						<div className="card">
							<div className="card-body">

								{/* Default Maps */}
								<h4 className="card-title">Bản đồ mặc định</h4>
								{/* Example of google maps. */}
								<p className="card-title-desc">Ví dụ về bản đồ Google.</p>
								<div className="ad-google-map">
								 <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319"  style={{border: 0}}></iframe>
							   </div>
							   
							</div>
						</div>
					</div> 
                    {/* <!-- end col --> */}
				</div>
				<div className="row">
					<div className="col-lg-6">
						<div className="card">
						   <div className="card-body">

								{/* Default Maps */}
								<h4 className="card-title">Bản đồ mặc định</h4>
								{/* Example of google maps. */}
								<p className="card-title-desc">Ví dụ về bản đồ Google.</p>

							   <div className="ad-google-map">
								<iframe  id="gmap_canvas" src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
							   </div>
							</div>
						</div>
					</div>
                     {/* <!-- end col --> */}

					<div className="col-lg-6">
						<div className="card">
							<div className="card-body">
								{/* Default Maps */}
								<h4 className="card-title">Bản đồ mặc định</h4>
								{/* Example of google maps. */}
								<p className="card-title-desc">Ví dụ về bản đồ Google.</p>
								<div className="ad-google-map">
								 <iframe src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
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
  
  export default GoogleMap;