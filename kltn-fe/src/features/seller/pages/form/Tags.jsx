const Tags = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                {/* Tags */}
                                <h4 className="page-title">Thẻ</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        {/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                                    </li>
                                    {/* Tags */}
                                    <li className="breadcrumb-link active">Thẻ</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- From Start --> */}
                <div className="from-wrapper">

                    <div className="row">
                        {/* <!-- Allow Case Sensitive --> */}
                        <div className="colxl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    {/* Allow Case Sensitive */}
                                    <h4>Cho phép phân biệt chữ hoa chữ thường</h4>
                                    {/* Default <code>case-sensitive</code> is <code>false</code>. Set it to <code>true</code> to allow case sensitive. */}
                                    <p className="card-desc">Mặc định <code>phân biệt chữ hoa chữ thường</code> là <code>false</code>. Đặt thành <code>true</code> để cho phép phân biệt chữ hoa chữ thường.</p>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="case-sensitive form-control tagging" data-tags-input-name="case-sensitive">
                                            <div className="tag">
                                                India
                                                <input type="hidden" name="case-sensitive[]" value="India"/>
                                            </div>
                                            <input className="type-zone" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Disable "close" Character --> */}
                        <div className="colxl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    {/* Disable "close" Character */}
                                    <h4>Tắt ký tự "đóng"</h4>
                                    {/* Default close char is <code>"×"</code>. Pass empty string <code>close-char:""</code> To remove close char. */}
                                    <p className="card-desc">Ký tự đóng mặc định là <code>"×"</code>. Truyền chuỗi rỗng <code>close-char:""</code> để xóa ký tự đóng.</p>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="close-char form-control tagging" data-tags-input-name="close-char">
                                            <div className="tag">
                                                General
                                                <input type="hidden" name="close-char[]" value="General"/>
                                            </div>
                                            <input className="type-zone" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Remove tag on delete Button --> */}
                        <div className="colxl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    {/* Remove tag on delete Button */}
                                    <h4>Xóa thẻ trên nút xóa</h4>
                                    {/* Default close char is <code>"×"</code>. Pass empty string <code>close-char:""</code> To remove close char. */}
                                    <p className="card-desc">Ký tự đóng mặc định là <code>"×"</code>. Truyền chuỗi rỗng <code>close-char:""</code> để xóa ký tự đóng</p>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="deleted form-control tagging" data-tags-input-name="deleted">
                                            <div className="tag">
                                                Bags
                                                <input type="hidden" name="deleted[]" value="Bags"/>
                                            </div>
                                            <input className="type-zone" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Remove tag on delete Button --> */}
                        <div className="colxl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    {/* Remove tag on delete Button */}
                                    <h4>Xóa thẻ trên nút xóa</h4>
                                    {/* Default you can edit the tag you just deleted from the tag box. set it <code>deleted:false</code> to avoid that. */}
                                    <p className="card-desc">Mặc định, bạn có thể chỉnh sửa thẻ mà bạn vừa xóa khỏi hộp thẻ. Đặt <code>deleted:false</code> để tránh điều đó.</p>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="deleted form-control tagging" data-tags-input-name="deleted">
                                            <div className="tag">
                                                Bags
                                                <input type="hidden" name="deleted[]" value="Bags"/>
                                            </div>
                                            <input className="type-zone" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Allow Duplicate Tag --> */}
                        <div className="colxl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    {/* Allow Duplicate Tag */}
                                    <h4>Cho phép thẻ trùng lặp</h4>
                                    {/* Default duplicate tags are not allowed, set <code>duplicated:false</code> to allow duplicates. */}
                                    <p className="card-desc">Không cho phép các thẻ trùng lặp mặc định, hãy đặt <code>duplicated:false</code> để cho phép các thẻ trùng lặp.</p>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="duplicated form-control tagging" data-tags-input-name="duplicated">
                                            <div className="tag">
                                                Repeated
                                                <input type="hidden" name="duplicated[]" value="Repeated"/>
                                            </div>
                                            <input className="type-zone" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Disable "Enter" Button  --> */}
                        <div className="colxl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    {/* Disable "Enter" Button */}
                                    <h4>Vô hiệu hóa nút "Enter" </h4>
                                    {/* Default Enter key add a new tag, set it <code>no-enter:true</code> to avoid that. */}
                                    <p className="card-desc">Phím Enter mặc định thêm một thẻ mới, hãy đặt thẻ đó là <code>no-enter:true</code> để tránh điều đó.</p>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="no-enter form-control tagging" data-tags-input-name="no-enter">
                                            <div className="tag">
                                                Repeated
                                                <input type="hidden" name="no-enter[]" value="Repeated"/>
                                            </div>
                                            <input className="type-zone" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Enable "Comma" --> */}
                        <div className="colxl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    {/* Enable "Comma" */}
                                    <h4>Bật "Dấu phẩy"</h4>
                                    {/* Default Comma key add a new tag, set it <code>no-comma:true</code> to avoid that. */}
                                    <p className="card-desc">Phím dấu phẩy mặc định thêm một thẻ mới, hãy đặt thẻ đó là <code>no-comma:true</code> để tránh điều đó.</p>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="no-comma form-control tagging" data-tags-input-name="no-comma">
                                            <div className="tag">
                                                Repeated
                                                <input type="hidden" name="no-comma[]" value="Repeated"/>
                                            </div>
                                            <input className="type-zone" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Tag With Tagging Area --> */}
                        <div className="colxl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    {/* Tag With Tagging Area */}
                                    <h4>Thẻ với khu vực gắn thẻ</h4>
                                    {/* Default No Input Fiels Show, set it <code>type-zone-class</code> */}
                                    <p className="card-desc">Mặc định Không có trường nhập Hiển thị, đặt nó là <code>type-zone-class</code></p>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="type-zone-class form-control tagging" data-tags-input-name="type-zone-class">
                                            <div className="tag">
                                                Repeated
                                                <input type="hidden" name="type-zone-class[]" value="Repeated"/>
                                            </div>
                                            <input className="tagging-area" contenteditable="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Reset Tags --> */}
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    {/* Reset Tags */}
                                    <h4>Đặt lại thẻ</h4>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-0">
                                        <div className="row align-items-center">
                                            <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12 col-12">
                                                <div className="reset-box form-control tagging" data-tags-input-name="reset-box">
                                                    <div className="tag">
                                                        artist, video
                                                        <input type="hidden" name="reset-box[]" value="artist, video"/>
                                                    </div>
                                                    <div className="tag">
                                                        Blogs
                                                        <input type="hidden" name="reset-box[]" value="Blogs"/>
                                                    </div>
                                                    <input className="type-zone" contenteditable="true"/>
                                                </div>
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12">
                                                {/* Reset */}
                                                <button className="btn btn-primary squer-btn reset-tagging" type="button">Cài lại</button>
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
  
  export default Tags;