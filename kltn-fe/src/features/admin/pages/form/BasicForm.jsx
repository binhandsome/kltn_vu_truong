const BasicForm = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                {/* Basic Form */}
                                <h4 className="page-title">Mẫu cơ bản</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        {/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                                    </li>
                                    {/* Basic Form */}
                                    <li className="breadcrumb-link active">Mẫu cơ bản</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- From Start --> */}
                <div className="from-wrapper">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    {/* Vertical */}
                                    <h4>Thẳng đứng</h4>
                                    {/* Here are examples of form add <code>.form</code> tag with inputs. */}
                                    <p className="card-desc">Sau đây là các ví dụ về cách thêm thẻ <code> .form </code> với các đầu vào.</p>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-group">
                                                {/* User Name */}
                                                <label className="col-form-label">Tên người dùng</label>
                                                <input className="form-control" type="text" placeholder="Jenny"/>
                                            </div>
                                            <div className="form-group">
                                                {/* Password */}
                                                <label className="col-form-label">Mật khẩu</label>
                                                <input className="form-control" type="password" placeholder="123456"/>
                                            </div>
                                            <div className="form-group">
                                                <div className="checkbox">
                                                    <input id="checkbox1" type="checkbox"/>
                                                    {/* Remember Me */}
                                                    <label for="checkbox1">Nhớ</label>
                                                </div>
                                            </div>
                                            <div className="form-group mb-0">
                                                {/* Reset */}
                                                <button className="btn btn-primary" type="button">Cài lại</button>
                                                {/* submit */}
                                                <input className="btn btn-light" type="submit"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    {/* Horizontal */}
                                    <h4>Nằm ngang</h4>
                                    <p className="card-desc">Sau đây là các ví dụ về cách thêm thẻ <code>.form</code> vào biểu mẫu.</p>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-group row">
                                                {/* Username */}
                                                <label className="col-md-2 col-form-label">Tên người dùng</label>
                                                <div className="col-md-10">
                                                    <input className="form-control" type="text" placeholder="Jenny"/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                {/* Email */}
                                                <label className="col-md-2 col-form-label">E-mail</label>
                                                <div className="col-md-10">
                                                    <input className="form-control" type="email" placeholder="example@domain.com" id="email-input"/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                {/* Password */}
                                                <label className="col-md-2 col-form-label">Mật khẩu</label>
                                                <div className="col-md-10">
                                                    <input className="form-control" type="password" placeholder="123456"/>
                                                </div>
                                            </div>
                                            <div className="form-group row mb-0">
                                                <div className="col-sm-10 offset-sm-2">
                                                    <div className="checkbox">
                                                        <input id="checkbox2" type="checkbox"/>
                                                        {/* Remember Me */}
                                                        <label for="checkbox2">Nhớ</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row mb-0">
                                                <div className="col-sm-10 offset-sm-2">
                                                    <button className="btn btn-primary" type="button">Cài lại</button>
                                                    <input className="btn btn-light" type="submit"/>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-header">
                                    {/* Separate */}
                                    <h4>Chia</h4>
                                    {/* Here are examples of form add <code>.separate-form</code> tag with inputs. */}
                                    <p className="card-desc">Sau đây là các ví dụ về cách thêm thẻ <code>.separate-form</code> với các đầu vào.</p>
                                </div>
                                <div className="card-body">
                                    <form className="separate-form">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            {/* Personal Info */}
                                            <h5 className="from-title mb-1">Thông tin cá nhân</h5>
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        {/* Your Name */}
                                                        <label for="member-name" className="col-form-label">Tên của bạn</label>
                                                        <input className="form-control" type="text" placeholder="Enter Your Name" id="member-name"/>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        {/* Your Email */}
                                                        <label for="member-email" className="col-form-label">Email của bạn</label>
                                                        <input className="form-control" type="email" placeholder="Enter Your Email" id="member-email"/>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        {/* Company Name (Optional) */}
                                                        <label for="company-name" className="col-form-label">Tên công ty (Tùy chọn)</label>
                                                        <input className="form-control" type="text" placeholder="Company Name" id="company-name"/>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        <label for="web-url" className="col-form-label">URL</label>
                                                        <input className="form-control" type="text" placeholder="Enter URL" id="web-url"/>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        {/* DOB */}
                                                        <label for="dob" className="col-form-label">Ngày sinh</label>
                                                        <input className="form-control" type="text" placeholder="Enter DOB" id="dob"/>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        {/* Contact Number */}
                                                        <label for="another-number" className="col-form-label">Số liên lạc</label>
                                                        <input className="form-control" type="text" placeholder="Contact Number" id="another-number"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="mt-4 mb-4"/>
                                            {/* Billing Info */}
                                            <h5 className="from-title mb-1">Thông tin thanh toán</h5>
                                            <div className="row">
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group s-opt">
                                                        {/* Country Or Region */}
                                                        <label for="region" className="col-form-label">Quốc gia hoặc Khu vực</label>
                                                        <select className="select2 form-control select-opt" id="region">
                                                            <optgroup label="Múi giờ Alaska/Hawaii ">
                                                              <option value="AK">Alaska</option>
                                                              <option value="HI">Hawaii</option>
                                                            </optgroup>
                                                            <optgroup label="Pacific Time Zone">
                                                              <option value="CA">California</option>
                                                              <option value="NV">Nevada</option>
                                                              <option value="OR">Oregon</option>
                                                              <option value="WA">Washington</option>
                                                            </optgroup>
                                                            <optgroup label="Múi giờ Thái Bình Dương">
                                                              <option value="AZ">Arizona</option>
                                                              <option value="CO">Colorado</option>
                                                              <option value="ID">Idaho</option>
                                                              <option value="MT">Montana</option>
                                                              <option value="NE">Nebraska</option>
                                                              <option value="NM">New Mexico</option>
                                                              <option value="ND">North Dakota</option>
                                                              <option value="UT">Utah</option>
                                                              <option value="WY">Wyoming</option>
                                                            </optgroup>
                                                            <optgroup label="Múi giờ miền Trung">
                                                              <option value="AL">Alabama</option>
                                                              <option value="AR">Arkansas</option>
                                                              <option value="IL">Illinois</option>
                                                              <option value="IA">Iowa</option>
                                                              <option value="KS">Kansas</option>
                                                              <option value="KY">Kentucky</option>
                                                              <option value="LA">Louisiana</option>
                                                              <option value="MN">Minnesota</option>
                                                              <option value="MS">Mississippi</option>
                                                              <option value="MO">Missouri</option>
                                                              <option value="OK">Oklahoma</option>
                                                              <option value="SD">South Dakota</option>
                                                              <option value="TX">Texas</option>
                                                              <option value="TN">Tennessee</option>
                                                              <option value="WI">Wisconsin</option>
                                                            </optgroup>
                                                            <optgroup label="Múi giờ miền Đông">
                                                              <option value="CT">Connecticut</option>
                                                              <option value="DE">Delaware</option>
                                                              <option value="FL">Florida</option>
                                                              <option value="GA">Georgia</option>
                                                              <option value="IN">Indiana</option>
                                                              <option value="ME">Maine</option>
                                                              <option value="MD">Maryland</option>
                                                              <option value="MA">Massachusetts</option>
                                                              <option value="MI">Michigan</option>
                                                              <option value="NH">New Hampshire</option>
                                                              <option value="NJ">New Jersey</option>
                                                              <option value="NY">New York</option>
                                                              <option value="NC">North Carolina</option>
                                                              <option value="OH">Ohio</option>
                                                              <option value="PA">Pennsylvania</option>
                                                              <option value="RI">Rhode Island</option>
                                                              <option value="SC">South Carolina</option>
                                                              <option value="VT">Vermont</option>
                                                              <option value="VA">Virginia</option>
                                                              <option value="WV">West Virginia</option>
                                                            </optgroup>
                                                        </select>
                                                        <span className="sel_arrow">
                                                            <i className="fa fa-angle-down "></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group s-opt">
                                                        {/* Town/City */}
                                                        <label for="city" className="col-form-label">Thị trấn/Thành phố</label>
                                                        <select className="select2 form-control select-opt" id="city">
                                                              <option value="AK">Alaska</option>
                                                              <option value="HI">Hawaii</option>
                                                              <option value="CA">California</option>
                                                              <option value="NV">Nevada</option>
                                                              <option value="OR">Oregon</option>
                                                              <option value="WA">Washington</option>
                                                        </select>
                                                        <span className="sel_arrow">
                                                            <i className="fa fa-angle-down "></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        {/* Province */}
                                                        <label for="province" className="col-form-label">Tỉnh</label>
                                                        <input className="form-control" type="text" placeholder="province" id="province"/>
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        {/* Postal */}
                                                        <label for="postal" className="col-form-label">Bưu chính</label>
                                                        <input className="form-control" type="text" placeholder="Postal" id="postal"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="mt-4 mb-4"/>
                                            {/* Additional Details */}
                                            <h5 className="from-title mb-1">Chi tiết bổ sung</h5>
                                            <div className="row">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div className="form-group">
                                                        {/* Drop Your Message */}
                                                        <label for="additional-msg" className="col-form-label">Gửi tin nhắn của bạn</label>
                                                        <textarea className="form-control" placeholder="Additional Notes" id="additional-msg"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="checkbox">
                                                    <input id="checkbox3" type="checkbox"/>
                                                    <label for="checkbox3">Nhớ</label>
                                                </div>
                                            </div>
                                            <div className="form-group mb-0">
                                                <button className="btn btn-primary" type="button">Cài lại</button>
                                                <input className="btn btn-danger" type="submit"/>
                                            </div>
                                        </div>
                                    </form>
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
  
  export default BasicForm;