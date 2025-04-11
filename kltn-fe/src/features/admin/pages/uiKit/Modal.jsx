const Modal = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                <h4 className="page-title">Modal</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Dashboard</a>
                                    </li>
                                    <li className="breadcrumb-link active">Modal</li>
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
						<h5>Static Example</h5>
					  </div>
					  <div className="card-body">
						<div className="modal" tabindex="-1" role="dialog" style="display: block;position: unset;">
						  <div className="modal-dialog" role="document">
							<div className="modal-content">
							  <div className="modal-header">
								<h5 className="modal-title">Modal title</h5>
								<button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
								  <span aria-hidden="true">&times;</span>
								</button>
							  </div>
							  <div className="modal-body">
								<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
							  </div>
							  <div className="modal-footer">
								<button type="button" className="btn btn-secondary squer-btn" data-bs-dismiss="modal">Close</button>
								<button type="button" className="btn btn-primary squer-btn">Save changes</button>
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
						<h5>Basic Modal</h5>
					  </div>
					  <div className="card-body">
						{/* <!-- Button trigger modal --> */}
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target="#exampleModalLong">
						  Simple
						</button>
						{/* <!-- Button trigger modal --> */}
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target="#longc">
						  Scrolling long content
						</button>
						{/* <!-- Button trigger modal --> */}
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target="#model3">
						  Vertically centered
						</button>
						{/* <!-- Button trigger modal --> */}
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target="#model4">
						  Tooltips and popovers
						</button>
						{/* <!-- Button trigger modal --> */}
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target="#model-grid">
						  Using the grid
						</button>
						
					  </div>
					</div>
				  </div>
				  <div className="col-sm-12">
					<div className="card">
					  <div className="card-header">
						<h5>Varying modal content</h5>
					  </div>
					  <div className="card-body">
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target="#exampleModal20" data-whatever="@mdo">Open modal for @mdo</button>
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target="#exampleModal21" data-whatever="@fat">Open modal for @fat</button>
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target="#exampleModal22" data-whatever="@getbootstrap">Open modal for @getbootstrap</button>
					  </div>
					</div>
				  </div>
				  <div className="col-sm-12">
					<div className="card">
					  <div className="card-header">
						<h5>Sizes modal</h5>
					  </div>
					  <div className="card-body">
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target=".bd-example-modal-lg">Large modal</button>
						<button type="button" className="btn btn-primary squer-btn" data-bs-toggle="modal" data-bs-target=".bd-example-modal-sm">Small modal</button>
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