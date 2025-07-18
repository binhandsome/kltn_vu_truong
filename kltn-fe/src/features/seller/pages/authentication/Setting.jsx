const Setting = () => (
 <>
  <div className="page-wrapper">
    <div className="main-content">
      {/* Page Title Start */}
      <div className="row">
        <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="page-title-wrapper">
            <div className="page-title-box">
              {/* Setting */}
              <h4 className="page-title">Cài đặt</h4>
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
                <li className="breadcrumb-link active">Cài đặt</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Products view Start */}
      <div className="row">
        <div className="col-xl-12">
          <form className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <div className="mb-3">
                    {/* Company Name */}
                    <label className="form-label">Tên công ty</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Name"
                      data-bs-original-title=""
                      title=""
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="mb-3">
                    {/* Contact Person */}
                    <label className="form-label">Người liên hệ</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Name"
                      data-bs-original-title=""
                      title=""
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="mb-3">
                    {/* Address */}
                    <label className="form-label">Địa chỉ</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter address"
                      data-bs-original-title=""
                      title=""
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="mb-3 form-select-btn">
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
                <div className="col-sm-6 col-md-4">
                  <div className="mb-3">
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
                <div className="col-sm-6 col-md-4">
                  <div className="mb-3 form-select-btn">
                    {/* State/Province */}
                    <label className="form-label">Tiểu bang/Tỉnh</label>
                    <select className="form-control btn-square form-btn">
                      <option value={0}>--Select--</option>
                      <option value={1}>California</option>
                      <option value={2}>Alaska</option>
                      <option value={3}>Alabama</option>
                    </select>
                    <span className="sel_arrow">
                      <i className="fa fa-angle-down " />
                    </span>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="mb-3">
                    {/* Postal Code */}
                    <label className="form-label">Mã bưu chính</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="ZIP Code"
                      data-bs-original-title=""
                      title=""
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Enter Email"
                      data-bs-original-title=""
                      title=""
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="mb-3">
                    {/* Phone Number */}
                    <label className="form-label">Số điện thoại</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Number"
                      data-bs-original-title=""
                      title=""
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="mb-3">
                    {/* Mobile Number */}
                    <label className="form-label">Số điện thoại di động</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Number"
                      data-bs-original-title=""
                      title=""
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="mb-3">
                    {/* Fax */}
                    <label className="form-label">Fax</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="818 22 0011"
                      data-bs-original-title=""
                      title=""
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="mb-3">
                    {/* Website Url */}
                    <label className="form-label">Url trang web</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Url"
                      data-bs-original-title=""
                      title=""
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
                save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="ad-footer-btm">
        <p>Copyright 2022 © SplashDash All Rights Reserved.</p>
      </div>
    </div>
  </div>
  {/* Preview Setting Box */}
  <div className="slide-setting-box">
    <div className="slide-setting-holder">
      <div className="setting-box-head">
        {/* Dashboard Demo  */}
        <h4>Bản trình diễn bảng điều khiển</h4>
        <a href="javascript:void(0);" className="close-btn">
          Close
        </a>
      </div>
      <div className="setting-box-body">
        <div className="sd-light-vs">
          <a href="index.html">
            {/* Light Version */}
            Phiên bản nhẹ
            <img src="../../assets/admin/images/light.png" alt="" />
          </a>
        </div>
        <div className="sd-light-vs">
          <a href="https://kamleshyadav.com/html/splashdash/html/b5/splashdash-admin-template-dark/index.html">
          {/* Dark Version  */}
          Phiên bản tối
            <img src="../../assets/admin/images/dark.png" alt="" />
          </a>
        </div>
      </div>
      <div className="sd-color-op">
        {/* Color option */}
        <h5>Tùy chọn màu sắc</h5>
        <div id="style-switcher">
          <div>
            <ul className="colors">
              <li>
                <p className="colorchange" id="color"></p>
              </li>
              <li>
                <p className="colorchange" id="color2"></p>
              </li>
              <li>
                <p className="colorchange" id="color3"></p>
              </li>
              <li>
                <p className="colorchange" id="color4"></p>
              </li>
              <li>
                <p className="colorchange" id="color5"></p>
              </li>
              <li>
                <p className="colorchange" id="style"></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  );
  
  export default Setting;