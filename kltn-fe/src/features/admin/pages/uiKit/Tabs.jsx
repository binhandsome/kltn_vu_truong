const Tabs = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
								{/* Tabs */}
                                <h4 className="page-title">Thẻ </h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
										{/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                                    </li>
                                    <li className="breadcrumb-link active">Thẻ </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Products view Start --> */}
				<div className="row">
					<div className="col-xl-6">
						<div className="card">
                            <div className="card-header pb-0">
								{/* Default Tabs */}
                                <h4 className="card-title">Thẻ mặc định</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <ul className="nav nav-tabs" id="myTab2" role="tablist">
									  <li className="nav-item">
										<a className="nav-link active" id="home-tab2" data-bs-toggle="tab" href="tab.html#home" role="tab" aria-controls="home" aria-selected="true">Trang chủ</a>
									  </li>
									  <li className="nav-item">
										<a className="nav-link" id="profile-tab19" data-bs-toggle="tab" href="tab.html#profile" role="tab" aria-controls="profile" aria-selected="false">Hồ sơ</a>
									  </li>
									  <li className="nav-item">
										<a className="nav-link" id="contact-tab" data-bs-toggle="tab" href="tab.html#contact" role="tab" aria-controls="contact" aria-selected="false">Liên hệ</a>
									  </li>
									</ul>
									<div className="tab-content ad-content2" id="myTabContent">
									  <div className="tab-pane fade show active" id="home" role="tabpanel">
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
									  </div>
									  <div className="tab-pane fade" id="profile" role="tabpanel">
										<p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
									  </div>
									  <div className="tab-pane fade" id="contact" role="tabpanel">
										<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
									  </div>
									</div>
                                </div>
                            </div>
                        </div>
					</div>
					<div className="col-xl-6">
						<div className="card">
                            <div className="card-header pb-0">
								{/* Justify Tabs */}
                                <h4 className="card-title">Căn đều các thẻ</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                   <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
									  <li className="nav-item">
										<a className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" href="tab.html#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Trang chủ</a>
									  </li>
									  <li className="nav-item">
										<a className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" href="tab.html#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Hồ sơ</a>
									  </li>
									  <li className="nav-item">
										<a className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" href="tab.html#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Liên hệ</a>
									  </li>
									</ul>
									<div className="tab-content" id="pills-tabContent">
									  <div className="tab-pane fade show active" id="pills-home" role="tabpanel"><p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p></div>
									  <div className="tab-pane fade" id="pills-profile" role="tabpanel"><p> If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p></div>
									  <div className="tab-pane fade" id="pills-contact" role="tabpanel" ><p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p></div>
									</div>
                                </div>
                            </div>
                        </div>
					</div>
					<div className="col-xl-6">
						<div className="card">
                            <div className="card-header pb-0">
								{/* Vertical Nav Tabs */}
                                <h4 className="card-title">Thẻ điều hướng dọc</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                   <div className="row">
									  <div className="col-3">
										<div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
										  <a className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" href="tab.html#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Trang chủ</a>
										  <a className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" href="tab.html#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Hồ sơ</a>
										  <a className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" href="tab.html#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Tin nhắn</a>
										  <a className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" href="tab.html#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Cài đặt</a>
										</div>
									  </div>
									  <div className="col-9">
										<div className="tab-content ad-vertical-three" id="v-pills-tabContent">
										  <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.  All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as.</p></div>
										  <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" ><p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.</p></div>
										  <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" ><p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p></div>
										  <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" ><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop</p></div>
										</div>
									  </div>
									</div>
                                </div>
                            </div>
                        </div>
					</div>
					<div className="col-xl-6">
						<div className="card">
                            <div className="card-header pb-0">
                                <h4 className="card-title">Thẻ tùy chỉnh</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                   <div className="mfh-machine-profile">
										<ul className="nav nav-tabs" id="myTab1" role="tablist">
											<li className="nav-item">
												<a className="nav-link active" id="home-tab1" data-bs-toggle="tab" href="tab.html#home0" role="tab" aria-controls="home" aria-selected="true">Trang chủ</a>
											</li>
											<li className="nav-item">
												<a className="nav-link" id="profile-tab20" data-bs-toggle="tab" href="tab.html#profile0" role="tab" aria-controls="profile" aria-selected="false">Hồ sơ</a>
											</li>
											<li className="nav-item">
												<a className="nav-link" id="profile-tab21" data-bs-toggle="tab" href="tab.html#messages" role="tab" aria-controls="profile" aria-selected="false">Tin nhắn</a>
											</li>
											<li className="nav-item">
												<a className="nav-link" id="profile-tab22" data-bs-toggle="tab" href="tab.html#settings" role="tab" aria-controls="profile" aria-selected="false">Cài đặt</a>
											</li>
										</ul>
										<div className="tab-content ad-content2" id="myTabContent2">
											<div className="tab-pane fade show active" id="home0" role="tabpanel" >
												<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
											</div>
											<div className="tab-pane fade" id="profile0" role="tabpanel">
												<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
											</div>
											<div className="tab-pane fade" id="messages" role="tabpanel" >
												<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
											</div>
											<div className="tab-pane fade" id="settings" role="tabpanel">
												<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
											</div>
										</div>
									</div>
                                </div>
                            </div>
                        </div>
					</div>
					<div className="col-xl-6">
						<div className="card">
                            <div className="card-header pb-0">
								{/* Collapse */}
                                <h4 className="card-title">Sụp đổ</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                   <p>
									  <a className="btn btn-primary squer-btn" data-bs-toggle="collapse" href="tab.html#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
										{/* Link with href */}
										Liên kết với href
									  </a>
									  <button className="btn btn-primary squer-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
										{/* Button with data-bs-target */}
										Nút có data-bs-target
									  </button>
									</p>
									<div className="collapse" id="collapseExample">
									  <div className="card card-body">
										Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
									  </div>
									</div>
                                </div>
                            </div>
                        </div>
					</div>
					<div className="col-xl-6">
						<div className="card">
                            <div className="card-header pb-0">
								{/* Multiple Targets */}
                                <h4 className="card-title">Nhiều mục tiêu</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
									<p>
										{/* Toggle first element */}
									  <a className="btn btn-primary squer-btn" data-bs-toggle="collapse" href="tab.html#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Chuyển đổi phần tử đầu tiên</a>
									  <button className="btn btn-primary squer-btn" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Chuyển đổi phần tử thứ 2</button>
									  {/* Toggle both elements */}
									  <button className="btn btn-primary squer-btn" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Chuyển đổi cả hai phần tử</button>
									</p>
									<div className="row">
									  <div className="col">
										<div className="collapse multi-collapse" id="multiCollapseExample1">
										  <div className="card card-body">
											Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
										  </div>
										</div>
									  </div>
									  <div className="col">
										<div className="collapse multi-collapse" id="multiCollapseExample2">
										  <div className="card card-body">
											Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
										  </div>
										</div>
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
  
  export default Tabs;