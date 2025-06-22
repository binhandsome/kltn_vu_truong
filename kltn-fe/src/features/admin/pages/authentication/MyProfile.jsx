const MyProfile = () => (
<div className="page-wrapper">
  <div className="main-content">
    {/* Page Title Start */}
    <div className="row">
      <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="page-title-wrapper">
          <div className="page-title-box">
            {/* User Profile */}
            <h4 className="page-title">Hồ sơ người dùng</h4>
          </div>
          <div className="breadcrumb-list">
            <ul>
              <li className="breadcrumb-link">
                <a href="index.html">
                  <i className="fas fa-home mr-2" />
                  {/* Dashboard */}
                  Bảng điều khiển
                </a>
              </li>
              {/* User Profile */}
              <li className="breadcrumb-link active">Hồ sơ người dùng</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    {/* Products view Start */}
    <div className="row">
      <div className="col-xl-4">
        <div className="card">
          <grammarly-extension
            data-grammarly-shadow-root="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none"
            }}
            className="cGcvT"
          />
          <div className="card-header">
            {/* My Profile */}
            <h4 className="card-title mb-0">Hồ sơ của tôi</h4>
            <div className="card-options">
              <a
                className="card-options-collapse"
                href="javascript:;"
                data-bs-toggle="card-collapse"
                data-bs-original-title=""
                title=""
              >
                <i className="fe fe-chevron-up" />
              </a>
              <a
                className="card-options-remove"
                href="javascript:;"
                data-bs-toggle="card-remove"
                data-bs-original-title=""
                title=""
              >
                <i className="fe fe-x" />
              </a>
            </div>
          </div>
          <div className="card-body">
            <form>
              <div className="profile-title">
                <div className="media ad-profile2-img">
                  <img alt="" src="../../assets/admin/images/user.jpg" />
                  <div className="media-body">
                    <h5 className="mb-1">MARK JECNO</h5>
                    <p>DESIGNER</p>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Bio</label>
                <textarea
                  className="form-control"
                  rows={5}
                  spellCheck="false"
                  defaultValue={
                    "On the other hand, we denounce with righteous indignation"
                  }
                />
              </div>
              <div className="mb-3">
                {/* Email-Address */}
                <label className="form-label">Địa chỉ Email</label>
                <input
                  className="form-control"
                  placeholder="your-email@domain.com"
                  data-bs-original-title=""
                  title=""
                />
              </div>
              <div className="mb-3">
                {/* Password */}
                <label className="form-label">Mật khẩu</label>
                <input
                  className="form-control"
                  type="password"
                  defaultValue="password"
                  data-bs-original-title=""
                  title=""
                />
              </div>
              <div className="mb-3">
                {/* Website */}
                <label className="form-label">Website</label>
                <input
                  className="form-control"
                  placeholder="http://Uplor .com"
                  data-bs-original-title=""
                  title=""
                />
              </div>
              <div className="form-footer">
                <button
                  className="btn btn-primary squer-btn"
                  data-bs-original-title=""
                  title=""
                >
                  {/* Save */}
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-xl-8">
        <form className="card">
          <div className="card-header">
            {/* Edit Profile */}
            <h4 className="card-title mb-0">Chỉnh sửa hồ sơ</h4>
            <div className="card-options">
              <a
                className="card-options-collapse"
                href="javascript:;"
                data-bs-toggle="card-collapse"
                data-bs-original-title=""
                title=""
              >
                <i className="fe fe-chevron-up" />
              </a>
              <a
                className="card-options-remove"
                href="javascript:;"
                data-bs-toggle="card-remove"
                data-bs-original-title=""
                title=""
              >
                <i className="fe fe-x" />
              </a>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-5">
                <div className="mb-3">
                  {/* Company */}
                  <label className="form-label">Công ty</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Company"
                    data-bs-original-title=""
                    title=""
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="mb-3">
                  {/* Username */}
                  <label className="form-label">Tên người dùng</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Username"
                    data-bs-original-title=""
                    title=""
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="mb-3">
                  {/* Email address */}
                  <label className="form-label">Địa chỉ Email</label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    data-bs-original-title=""
                    title=""
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-6">
                <div className="mb-3">
                  {/* First Name */}
                  <label className="form-label">Họ</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Company"
                    data-bs-original-title=""
                    title=""
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-6">
                <div className="mb-3">
                  {/* Last Name */}
                  <label className="form-label">Tên</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Last Name"
                    data-bs-original-title=""
                    title=""
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  {/* Address */}
                  <label className="form-label">Địa chỉ</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Home Address"
                    data-bs-original-title=""
                    title=""
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="mb-3">
                  {/* City */}
                  <label className="form-label">Thành phố</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="City"
                    data-bs-original-title=""
                    title=""
                  />
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="mb-3">
                  {/* Postal Code */}
                  <label className="form-label">Mã bưu chính</label>
                  <input
                    className="form-control"
                    type="number"
                    placeholder="ZIP Code"
                    data-bs-original-title=""
                    title=""
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div className="mb-3 form-select-btn">
                  {/* Country */}
                  <label className="form-label">Quốc gia</label>
                  <select className="form-control btn-square form-btn">
                    <option value={0}>--Select--</option>
                    <option value={1}>Germany</option>
                    <option value={2}>Canada</option>
                    <option value={3}>Usa</option>
                    <option value={4}>Aus</option>
                  </select>
                  <span className="sel_arrow">
                    <i className="fa fa-angle-down " />
                  </span>
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div>
                  {/* About Me */}
                  <label className="form-label">Giới thiệu về tôi</label>
                  <textarea
                    className="form-control"
                    rows={5}
                    placeholder="Enter Your Description"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary squer-btn"
              type="submit"
              data-bs-original-title=""
              title=""
            >
              {/* Update Profile */}
              Cập nhật hồ sơ
            </button>
          </div>
        </form>
      </div>
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="card table-card">
          <div className="card-header pb-0">
            {/* Add projects And Upload */}
            <h4>Thêm dự án và tải lên</h4>
          </div>
          <div className="card-body">
            <div className="chart-holder">
              <div className="table-responsive">
                <table className="table table-styled mb-0">
                  <thead>
                    <tr>
                      {/* Project Name */}
                      <th>Tên dự án</th>
                      {/* Date */}
                      <th>Ngày</th>
                      {/* Status */}
                      <th>Trạng thái</th>
                      {/* Status */}
                      <th>Giá</th>
                      {/* Action */}
                      <th>Hoạt động</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ai Traific</td>
                      <td>28 May 2022</td>
                      <td>Completed</td>
                      <td>$22,124</td>
                      <td className="relative">
                        <a className="action-btn " href="javascript:void(0); ">
                          <svg
                            className="default-size "
                            viewBox="0 0 341.333 341.333 "
                          >
                            <g>
                              <g>
                                <g>
                                  <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                  <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                  <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                </g>
                              </g>
                            </g>
                          </svg>
                        </a>
                        <div className="action-option ">
                          <ul>
                            <li>
                              <a href="javascript:void(0); ">
                                <i className="far fa-edit mr-2 " />
                                Sửa
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0); ">
                                <i className="far fa-trash-alt mr-2 " />
                                Xoá
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Ai Traific</td>
                      <td>28 May 2022</td>
                      <td>Completed</td>
                      <td>$22,124</td>
                      <td className="relative">
                        <a className="action-btn " href="javascript:void(0); ">
                          <svg
                            className="default-size "
                            viewBox="0 0 341.333 341.333 "
                          >
                            <g>
                              <g>
                                <g>
                                  <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                  <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                  <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                </g>
                              </g>
                            </g>
                          </svg>
                        </a>
                        <div className="action-option ">
                          <ul>
                            <li>
                              <a href="javascript:void(0); ">
                                <i className="far fa-edit mr-2 " />
                                Sửa 
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0); ">
                                <i className="far fa-trash-alt mr-2 " />
                                Xoá
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Ai Traific</td>
                      <td>28 May 2022</td>
                      <td>Completed</td>
                      <td>$22,124</td>
                      <td className="relative">
                        <a className="action-btn " href="javascript:void(0); ">
                          <svg
                            className="default-size "
                            viewBox="0 0 341.333 341.333 "
                          >
                            <g>
                              <g>
                                <g>
                                  <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                  <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                  <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                </g>
                              </g>
                            </g>
                          </svg>
                        </a>
                        <div className="action-option ">
                          <ul>
                            <li>
                              <a href="javascript:void(0); ">
                                <i className="far fa-edit mr-2 " />
                                Edit
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0); ">
                                <i className="far fa-trash-alt mr-2 " />
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Ai Traific</td>
                      <td>28 May 2022</td>
                      <td>Completed</td>
                      <td>$22,124</td>
                      <td className="relative">
                        <a className="action-btn " href="javascript:void(0); ">
                          <svg
                            className="default-size "
                            viewBox="0 0 341.333 341.333 "
                          >
                            <g>
                              <g>
                                <g>
                                  <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                  <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                  <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                </g>
                              </g>
                            </g>
                          </svg>
                        </a>
                        <div className="action-option ">
                          <ul>
                            <li>
                              <a href="javascript:void(0); ">
                                <i className="far fa-edit mr-2 " />
                                Edit
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0); ">
                                <i className="far fa-trash-alt mr-2 " />
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-right mt-2">
              <nav className="d-inline-block">
                <ul className="pagination mb-0">
                  <li className="page-item disabled">
                    <a
                      className="page-link"
                      href="javascript:void(0);"
                      tabIndex={-1}
                    >
                      <i className="fas fa-chevron-left" />
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="javascript:void(0);">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="javascript:void(0);">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="javascript:void(0);">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="javascript:void(0);">
                      <i className="fas fa-chevron-right" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="ad-footer-btm">
      <p>Copyright 2022 © SplashDash All Rights Reserved.</p>
    </div>
  </div>
</div>

  );
  
  export default MyProfile;