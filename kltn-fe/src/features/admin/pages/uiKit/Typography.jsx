const Typography = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
								{/* Typography */}
                                <h4 className="page-title">Kiểu chữ</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
										{/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                                    </li>
                                    <li className="breadcrumb-link active">Kiểu chữ</li>
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
								{/* Headings */}
								<h4 className="card-title">Tiêu đề</h4>
								{/* All HTML headings, <code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>, are available. */}
								<p className="card-title-desc mb-3">Tất cả các tiêu đề HTML, từ <code>&lt;h1&gt;</code> đến <code>&lt;h6&gt;</code>, đều có sẵn.</p>

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
								{/* Display headings  */}
								<h4 className="card-title">Hiển thị tiêu đề</h4>
								{/* Traditional heading elements are designed to work best in the meat of your page content.  */}
								<p className="card-title-desc">Các thành phần tiêu đề truyền thống được thiết kế để hoạt động tốt nhất trong nội dung chính của trang.</p>

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
								{/* Inline text elements  */}
								<h4 className="card-title">Các phần tử văn bản nội tuyến</h4>
								{/* Styling for common inline HTML5 elements. */}
								<p className="card-title-desc">Định dạng cho các phần tử HTML5 nội tuyến phổ biến.</p>

								<p className="lead">
									Chúng ta sống với những mũi tên, hồ nước, hoặc augue, laoreet, gốc rễ của cổ họng, nỗi đau, tác giả.
								</p>
								<p>Bạn có thể sử dụng thẻ đánh dấu để <mark>làm nổi bật</mark> văn bản.</p>
								<p><del>Dòng văn bản này được coi là văn bản đã xóa.</del></p>
								<p><s>Dòng văn bản này được coi là không còn chính xác nữa.</s></p>
								<p><ins>Dòng văn bản này được coi là phần bổ sung cho tài liệu.</ins></p>
								<p><u>Dòng văn bản này sẽ hiển thị dưới dạng gạch chân</u></p>
								<p><small>Dòng văn bản này được coi là chữ in nhỏ.</small></p>
								<p><strong>Dòng này được hiển thị dưới dạng văn bản in đậm.</strong></p>
								<p className="mb-0"><em>Dòng này được hiển thị dưới dạng văn bản in nghiêng.</em></p>
							</div>
						</div>

						
					</div>
                     {/* <!-- end col --> */}

					<div className="col-xl-6">

						<div className="card">
							<div className="card-body">
								{/* Unstyled List */}
								<h4 className="card-title">Danh sách không theo kiểu</h4>
								<p className="card-title-desc">Xóa <code className="highlighter-rouge">kiểu danh sách</code> mặc định và lề trái trên các mục danh sách
									(chỉ dành cho các mục con trực tiếp). <strong>Điều này chỉ áp dụng cho các mục danh sách
									con trực tiếp</strong>, nghĩa là bạn cũng sẽ cần thêm lớp
									cho bất kỳ danh sách lồng nhau nào.</p>

								<ul className="list-unstyled mb-0">
									<li>Không có lorem phiền toái nào đối với massa</li>
									<li>Không ai muốn có một sự nghiệp
								<ul>
									<li>Cổ Phasellus iaculis</li>
									<li>Ultrician sodal tím</li>
									<li>Người mang vòng nguyệt quế của tiền sảnh</li>
								</ul>
									</li>
									<li>Miệng gấu được bao quanh bởi một hồ nước.</li>
								</ul>
							</div>
						</div>

						<div className="card">
							<div className="card-body">
								{/* Inline List */}
								<h4 className="card-title">Danh sách nội tuyến</h4>
								<p className="card-title-desc">Xóa các dấu đầu dòng của danh sách và áp dụng một số
									<code className="highlighter-rouge">lề</code> nhẹ với sự kết hợp
									của hai lớp, <code className="highlighter-rouge">.list-inline</code> và
									<code className="highlighter-rouge">.list-inline-item</code>.</p>

								<ul className="list-inline mb-0">
									<li className="list-inline-item">Làm rất tốt</li>
									<li className="list-inline-item">Thuyền mục tiêu</li>
									<li className="list-inline-item">Không có cuối tuần</li>
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

							<h4 className="card-title">Trích dẫn khối</h4>
								<p className="card-title-desc">Để trích dẫn các khối nội dung từ
								một nguồn khác trong tài liệu của bạn. Quấn <code className="highlighter-rouge">&lt;blockquote
								className="blockquote"&gt;</code> quanh bất kỳ <abbr title="Ngôn ngữ đánh dấu siêu văn bản">HTML</abbr> nào làm trích dẫn.</p>

							<div className="row">
							<div className="col-xl-6">
							<div>
									<blockquote className="blockquote font-size-16 mb-0">
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Các số nguyên được đặt ở một ante.</p>
												<footer className="blockquote-footer">Ai đó nổi tiếng trong <cite title="Source Title">Tiêu đề nguồn</cite></footer>
											</blockquote>
										</div>
									</div>
									<div className="col-xl-6">
										<div className="mt-4 mt-lg-0">
											<blockquote className="blockquote blockquote-reverse font-size-16 mb-0">
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Các số nguyên được đặt ở một ante.</p>
												<footer className="blockquote-footer">Ai đó nổi tiếng trong <cite title="Source Title">Tiêu đề nguồn</cite></footer>
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

							<h4 className="card-title">Căn chỉnh danh sách mô tả</h4>
							<p className="card-title-desc">Căn chỉnh các thuật ngữ và mô tả
							theo chiều ngang bằng cách sử dụng các lớp được xác định trước của hệ thống lưới của chúng tôi (hoặc các
							mixin ngữ nghĩa). Đối với các thuật ngữ dài hơn, bạn có thể tùy chọn thêm lớp <code className="highlighter-rouge">.text-truncate</code> để
							cắt bớt văn bản bằng dấu ba chấm.</p>

							<dl className="row">
								<dt className="col-sm-3">Danh sách mô tả</dt>
								<dd className="col-sm-9">Danh sách mô tả là lựa chọn hoàn hảo để xác định các thuật ngữ.</dd>

								<dt className="col-sm-3">Euismod</dt>
								<dd className="col-sm-9">
									<p>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</p>
									<p>Donec id elit non mi porta graida at eget metus.</p>
								</dd>

								<dt className="col-sm-3">Cổng Malesuada</dt>
								<dd className="col-sm-9">Etiam porta sem Malesuada magna mollis euismod.</dd>

								<dt className="col-sm-3 text-truncate">Thuật ngữ bị cắt ngắn bị cắt bớt</dt>
								<dd className="col-sm-9">Fusce dapibus, Tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>

								  <dt className="col-sm-3">Lồng nhau</dt>
								  <dd className="col-sm-9">
									<dl className="row">
									  <dt className="col-sm-4">Danh sách định nghĩa lồng nhau</dt>
									  <dd className="col-sm-8">Aenean đặt, Tortor nhưng đường lối của Feugiat, bây giờ đang tâng bốc nhà tuyên truyền.</dd>
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