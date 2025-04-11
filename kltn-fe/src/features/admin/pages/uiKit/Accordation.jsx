const Accordation = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                <h4 className="page-title">Accordion </h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Dashboard</a>
                                    </li>
                                    <li className="breadcrumb-link active">Accordion </li>
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
                                <h4 className="card-title">Default Accordion</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="ez-minus-plus">
										<div className="panel-group" id="accordion1" role="tablist" aria-multiselectable="true">
											<div className="panel panel-default">
												<div className="panel-heading" role="tab" id="headingOne">
													<h4 className="panel-title">
														<a data-bs-toggle="collapse" data-bs-parent="#accordion" href="accordation.html#collapseOne" aria-expanded="true" aria-controls="collapseOne">
														  <span className="editableElement" data-kindoff="text">Lorem Ipsum is simply dummy text of the.</span>
														</a>
													</h4>
												</div>
												<div id="collapseOne" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
													<div className="panel-body"><p className="editableElement" data-kindoff="text">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS.</p></div>
												</div>
											</div>
											<div className="panel panel-default">
												<div className="panel-heading" role="tab" id="headingTwo">
													<h4 className="panel-title">
														<a className="collapsed" data-bs-toggle="collapse" data-bs-parent="#accordion" href="accordation.html#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
														  <span className="editableElement" data-kindoff="text">Lorem Ipsum is simply dummy text of the printing.</span>
														</a>
													</h4>
												</div>
												<div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
													<div className="panel-body"><p className="editableElement" data-kindoff="text">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.</p></div>
												</div>
											</div>
											<div className="panel panel-default">
												<div className="panel-heading" role="tab" id="headingThree">
													 <h4 className="panel-title">
														<a className="collapsed" data-bs-toggle="collapse" data-bs-parent="#accordion" href="accordation.html#collapseThree" aria-expanded="false" aria-controls="collapseThree">
														  <span className="editableElement" data-kindoff="text">Lorem Ipsum is simply dummy text of the printing.</span>
														</a>
													  </h4>
												</div>
												<div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
													<div className="panel-body"><p className="editableElement" data-kindoff="text">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.</p></div>
												</div>
											</div>
											<div className="panel panel-default">
												<div className="panel-heading" role="tab" id="headingFour">
													<h4 className="panel-title">
														<a className="collapsed" data-bs-toggle="collapse" data-bs-parent="#accordion" href="accordation.html#collapseFour" aria-expanded="false" aria-controls="collapseFour">
														  <span className="editableElement" data-kindoff="text">Lorem Ipsum is simply dummy text of the printing.</span>
														</a>
													</h4>
												</div>
												<div id="collapseFour" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
													<div className="panel-body"><p className="editableElement" data-kindoff="text">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.</p></div>
												</div>
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
                                <h4 className="card-title">Colored Accordion</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="ez-Accordion">
										<div className="wrapper center-block">
											<div className="panel-group snj-panel" id="accordion" role="tablist" aria-multiselectable="true">
											  <div className="panel panel-default">
												<div className="panel-heading active" role="tab" id="headingOnea">
												  <h4 className="panel-title">
													<a role="button" data-bs-toggle="collapse" data-bs-parent="#accordion" href="accordation.html#collapseOnea" aria-expanded="true" aria-controls="collapseOnea">
													  <span>Frontend Course Builder</span>
													</a>
												  </h4>
												</div>
												<div id="collapseOnea" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOnea">
												  <div className="panel-body">
													 <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered. </p>
												  </div>
												</div>
											  </div>
											  <div className="panel panel-default">
												<div className="panel-heading" role="tab" id="headingTwob">
												  <h4 className="panel-title">
													<a className="collapsed" role="button" data-bs-toggle="collapse" data-bs-parent="#accordion" href="accordation.html#collapseTwob" aria-expanded="false" aria-controls="collapseTwob">
													  <span>Advanced Quiz Settings</span>
													</a>
												  </h4>
												</div>
												<div id="collapseTwob" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
												  <div className="panel-body">
													 <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered. </p>
												  </div>
												</div>
											  </div>
											  <div className="panel panel-default">
												<div className="panel-heading" role="tab" id="headingThreec">
												  <h4 className="panel-title">
													<a className="collapsed" role="button" data-bs-toggle="collapse" data-bs-parent="#accordion" href="accordation.html#collapseThreec" aria-expanded="false" aria-controls="collapseThreec">
													  <span>Multiple Instructor</span>
													</a>
												  </h4>
												</div>
												<div id="collapseThreec" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
												  <div className="panel-body">
													<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered.</p>
												  </div>
												</div>
											  </div>
											   <div className="panel panel-default">
												<div className="panel-heading active" role="tab" id="headingFourd">
												  <h4 className="panel-title">
													<a role="button" data-bs-toggle="collapse" data-bs-parent="#accordion" href="accordation.html#collapseFourd" aria-expanded="true" aria-controls="collapseFourd">
													  <span>Course Prerequisites</span>
													</a>
												  </h4>
												</div>
												<div id="collapseFourd" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingFourd">
												  <div className="panel-body">
													<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered.</p>
												  </div>
												</div>
											  </div>
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
                                <h4 className="card-title">Theme Color Accordion</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="ad-Accordion3">
										<div id="accordion2">
										  <div className="card">
											<div className="card-header" id="headingOne3" >
											  <h5 className="mb-0">
												<button className="btn btn-link" data-bs-toggle="collapse" data-bs-target="#collapseOne3" aria-expanded="true" aria-controls="collapseOne3" type="button">
												  Sed ut perspiciatis unde omnis iste
												</button>
											  </h5>
											</div>
											<div id="collapseOne3" className="collapse" aria-labelledby="headingOne3" data-bs-parent="#accordion">
											  <div className="card-body">
												Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
											  </div>
											</div>
										  </div>
										  <div className="card">
											<div className="card-header" id="headingTwo3" >
											  <h5 className="mb-0">
												<button className="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo3" aria-expanded="false" aria-controls="collapseTwo3">
												  Nemo enim ipsam voluptatem quia voluptas
												</button>
											  </h5>
											</div>
											<div id="collapseTwo3" className="collapse" aria-labelledby="headingTwo3" data-bs-parent="#accordion">
											  <div className="card-body">
												Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
											  </div>
											</div>
										  </div>
										  <div className="card">
											<div className="card-header" id="headingThree3" >
											  <h5 className="mb-0">
												<button className="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree3" aria-expanded="false" aria-controls="collapseThree3">
												  At vero eos et accusamus et iusto odio
												</button>
											  </h5>
											</div>
											<div id="collapseThree3" className="collapse" aria-labelledby="headingThree3" data-bs-parent="#accordion">
											  <div className="card-body">
												Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
											  </div>
											</div>
										  </div>
										  <div className="card mb-0">
											<div className="card-header" id="headingThree4" >
											  <h5 className="mb-0">
												<button className="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree4" aria-expanded="false" aria-controls="collapseThree4">
												  Nam libero tempore, cum soluta nobis
												</button>
											  </h5>
											</div>
											<div id="collapseThree4" className="collapse" aria-labelledby="headingThree4" data-bs-parent="#accordion">
											  <div className="card-body">
												Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
											  </div>
											</div>
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
                                <h4 className="card-title">Accordion With Icons</h4>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="ad-Accordion4">
										<div className="accordion" id="accordionExample">
										  <div className="item">
											 <div className="item-header" id="headingOnej">
												<h2 className="mb-0">
												   <button className="btn btn-link" type="button" data-bs-toggle="collapse"
													  data-bs-target="#collapseOnej" aria-expanded="true" aria-controls="collapseOnej">
												   At vero eos et accusamus et iusto odio
												   <i className="fa fa-angle-down"></i>
												   </button>
												</h2>
											 </div>
											 <div id="collapseOnej" className="collapse" aria-labelledby="headingOnej"
												data-bs-parent="#accordionExample">
												<div className="t-p">
												It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
												</div>
											 </div>
										  </div>
										  <div className="item">
											 <div className="item-header" id="headingTwok">
												<h2 className="mb-0">
												   <button className="btn btn-link collapsed" type="button" data-bs-toggle="collapse"
													  data-bs-target="#collapseTwok" aria-expanded="false" aria-controls="collapseTwok">
												   Et harum quidem rerum facilis est et
												   <i className="fa fa-angle-down"></i>
												   </button>
												</h2>
											 </div>
											 <div id="collapseTwok" className="collapse" aria-labelledby="headingTwok"
												data-bs-parent="#accordionExample">
												<div className="t-p">
												It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
												</div>
											 </div>
										  </div>
										  <div className="item">
											 <div className="item-header" id="headingThreel">
												<h2 className="mb-0">
												   <button className="btn btn-link collapsed" type="button" data-bs-toggle="collapse"
													  data-bs-target="#collapseThreel" aria-expanded="false"
													  aria-controls="collapseThreel">
												   Temporibus autem quibusdam et aut officiis
												   <i className="fa fa-angle-down"></i>
												   </button>
												</h2>
											 </div>
											 <div id="collapseThreel" className="collapse" aria-labelledby="headingThreel"
												data-bs-parent="#accordionExample">
												<div className="t-p">
												It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
												</div>
											 </div>
										  </div>
										  <div className="item mb-0">
											 <div className="item-header" id="headingFourm">
												<h2 className="mb-0">
												   <button className="btn btn-link collapsed" type="button" data-bs-toggle="collapse"
													  data-bs-target="#collapseFourm" aria-expanded="false"
													  aria-controls="collapseFourm">
												   Ut aut reiciendis voluptatibus maiores alias
												   <i className="fa fa-angle-down"></i>
												   </button>
												</h2>
											 </div>
											 <div id="collapseFourm" className="collapse" aria-labelledby="headingFourm"
												data-bs-parent="#accordionExample">
												<div className="t-p">
												   It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
												</div>
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
  
  export default Accordation;