const Typography = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                <h4 className="page-title">Typography</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Dashboard</a>
                                    </li>
                                    <li className="breadcrumb-link active">Typography</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Products view Start --> */}
				<div className="row">
					<div className="col-xl-6">
						<div className="card">
							<div className="card-body">
								<div className="media">
									<div className="ms-3 me-4">
										<h1 className="display-4 mb-0">A</h1>
									</div>
									<div className="media-body align-self-center">
										<p className="text-muted mb-2">Font Family</p>
										<h5 className="mb-0">"Poppins", sans-serif</h5>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- end card --> */}

						<div className="card">
							<div className="card-body">
								<h4 className="card-title">Headings</h4>
								<p className="card-title-desc mb-3">All HTML headings, <code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>, are available.</p>

								<h1 className="mb-3">h1. Bootstrap heading</h1>
								<h2 className="mb-3">h2. Bootstrap heading</h2>
								<h3 className="mb-3">h3. Bootstrap heading</h3>
								<h4 className="mb-3">h4. Bootstrap heading</h4>
								<h5 className="mb-3">h5. Bootstrap heading</h5>
								<h6>h6. Bootstrap heading</h6>
							</div>
						</div>
						{/* <!-- end card --> */}
				
						
					</div> 
					<div className="col-xl-6">
					
						<div className="card">
							<div className="card-body">

								<h4 className="card-title">Display headings</h4>
								<p className="card-title-desc">Traditional heading elements are designed to work best in the meat of your page content. </p>

								<h1 className="display-1">Display 1</h1>
								<h1 className="display-2">Display 2</h1>
								<h1 className="display-3">Display 3</h1>
								<h1 className="display-4">Display 4</h1>
								<h1 className="display-5">Display 5</h1>
								<h1 className="display-6 mb-0">Display 6</h1>

							</div>
						</div>
					</div> 
                    {/* <!-- end col --> */}
				</div>
				<div className="row">
					<div className="col-xl-6">
						<div className="card">
							<div className="card-body">

								<h4 className="card-title">Inline text elements</h4>
								<p className="card-title-desc">Styling for common inline HTML5 elements.</p>

								<p className="lead">
									Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
								</p>
								<p>You can use the mark tag to <mark>highlight</mark> text.</p>
								<p><del>This line of text is meant to be treated as deleted text.</del></p>
								<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
								<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
								<p><u>This line of text will render as underlined</u></p>
								<p><small>This line of text is meant to be treated as fine print.</small></p>
								<p><strong>This line rendered as bold text.</strong></p>
								<p className="mb-0"><em>This line rendered as italicized text.</em></p>
							</div>
						</div>

						
					</div>
                     {/* <!-- end col --> */}

					<div className="col-xl-6">

						<div className="card">
							<div className="card-body">

								<h4 className="card-title">Unstyled List</h4>
								<p className="card-title-desc">Remove the default <code className="highlighter-rouge">list-style</code> and left margin on list
									items (immediate children only). <strong>This only applies to immediate
										children list items</strong>, meaning you will need to add the class
									for any nested lists as well.</p>

								<ul className="list-unstyled mb-0">
									<li>Integer molestie lorem at massa</li>
									<li>Nulla volutpat aliquam velit
										<ul>
											<li>Phasellus iaculis neque</li>
											<li>Purus sodales ultricies</li>
											<li>Vestibulum laoreet porttitor sem</li>
										</ul>
									</li>
									<li>Faucibus porta lacus fringilla vel</li>
								</ul>
							</div>
						</div>

						<div className="card">
							<div className="card-body">

								<h4 className="card-title">Inline List</h4>
								<p className="card-title-desc">Remove a list’s bullets and apply some
									light <code className="highlighter-rouge">margin</code> with a combination
									of two classes, <code className="highlighter-rouge">.list-inline</code> and
									<code className="highlighter-rouge">.list-inline-item</code>.</p>

								<ul className="list-inline mb-0">
									<li className="list-inline-item">Lorem ipsum</li>
									<li className="list-inline-item">Phasellus iaculis</li>
									<li className="list-inline-item">Nulla volutpat</li>
								</ul>

							</div>
						</div>

					</div> 
                    {/* <!-- end col --> */}
				</div>
				<div className="row">
					<div className="col-lg-12">
						<div className="card">
							<div className="card-body">

								<h4 className="card-title">Blockquotes</h4>
								<p className="card-title-desc">For quoting blocks of content from
									another source within your document. Wrap <code className="highlighter-rouge">&lt;blockquote
										className="blockquote"&gt;</code> around any <abbr title="HyperText Markup Language">HTML</abbr> as the quote.</p>

								<div className="row">
									<div className="col-xl-6">
										<div>
											<blockquote className="blockquote font-size-16 mb-0">
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
												<footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
											</blockquote>
										</div>
									</div>
									<div className="col-xl-6">
										<div className="mt-4 mt-lg-0">
											<blockquote className="blockquote  blockquote-reverse font-size-16 mb-0">
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
												<footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
											</blockquote>
										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">

						<div className="card">
							<div className="card-body">

								<h4 className="card-title">Description list alignment</h4>
								<p className="card-title-desc">Align terms and descriptions
									horizontally by using our grid system’s predefined classes (or semantic
									mixins). For longer terms, you can optionally add a <code className="highlighter-rouge">.text-truncate</code> class to
									truncate the text with an ellipsis.</p>

								<dl className="row">
								  <dt className="col-sm-3">Description lists</dt>
								  <dd className="col-sm-9">A description list is perfect for defining terms.</dd>

								  <dt className="col-sm-3">Euismod</dt>
								  <dd className="col-sm-9">
									<p>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</p>
									<p>Donec id elit non mi porta gravida at eget metus.</p>
								  </dd>

								  <dt className="col-sm-3">Malesuada porta</dt>
								  <dd className="col-sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>

								  <dt className="col-sm-3 text-truncate">Truncated term is truncated</dt>
								  <dd className="col-sm-9">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>

								  <dt className="col-sm-3">Nesting</dt>
								  <dd className="col-sm-9">
									<dl className="row">
									  <dt className="col-sm-4">Nested definition list</dt>
									  <dd className="col-sm-8">Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc.</dd>
									</dl>
								  </dd>
								</dl>

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
  
  export default Typography;