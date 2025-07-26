import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs';
import { getProfile, updateProfile } from '../../apiService/authService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parse, format,isValid} from 'date-fns';

function Profile() {
  const [hasBgClass, setHasBgClass] = useState(true); 
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userAddress: '',
    gender: '',
    dateOfBirth: '',
    profilePicture: ''
  });
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const parseDate = (dateString) => {
    if (!dateString) return null;
    const parsed = parse(dateString, 'dd-MM-yyyy', new Date());
    return isValid(parsed) ? parsed : null;
  };
  
  const formatDate = (dateObj) => {
    return isValid(dateObj) ? format(dateObj, 'dd-MM-yyyy') : '';
  };
  const formatDateFromAPI = (isoDate) => {
    try {
      const date = new Date(isoDate);
      return isValid(date) ? format(date, 'dd-MM-yyyy') : '';
    } catch {
      return '';
    }
  };
  
const showToastMessage = (msg) => {
  setToastMessage(msg);
  setShowToast(true);
  setTimeout(() => setShowToast(false), 2000);
};

  useEffect(() => {
    if (hasBgClass) {
      document.body.classList.add('bg');
    } else {
      document.body.classList.remove('bg');
    }
    return () => document.body.classList.remove('bg');
  }, [hasBgClass]);

  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init();
  }, []);

  useEffect(() => {
    getProfile()
      .then(data => {
        console.log('📦 Profile từ API:', data); 
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          userAddress: data.userAddress || '',
          gender: data.gender || '',
          dateOfBirth: data.dateOfBirth ? formatDateFromAPI(data.dateOfBirth) : '',
          profilePicture: data.profilePicture || ''
        });
        if (data.profilePicture) {
          setImagePreview(data.profilePicture);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy profile:', error);
      
        setToastMessage('❌ Không thể tải thông tin người dùng. Vui lòng đăng nhập lại.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
      
        // Optional: Xoá token + redirect sau đó
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleValidation = () => {
    if (!formData.firstName.trim()) {
      showToastMessage("❌ Vui lòng nhập Họ.");
      return false;
    }
    if (!formData.lastName.trim()) {
      showToastMessage("❌ Vui lòng nhập Tên.");
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      showToastMessage("❌ Vui lòng nhập Số điện thoại.");
      return false;
    }
    const phoneRegex = /^[0-9]{9,12}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      showToastMessage("❌ Số điện thoại không hợp lệ.");
      return false;
    }
    if (!formData.userAddress.trim()) {
      showToastMessage("❌ Vui lòng nhập Địa chỉ.");
      return false;
    }
    if (!formData.gender) {
      showToastMessage("❌ Vui lòng chọn Giới tính.");
      return false;
    }
    if (!formData.dateOfBirth) {
      showToastMessage("❌ Vui lòng chọn Ngày sinh.");
      return false;
    }
    const selectedDate = new Date(formData.dateOfBirth);
    const today = new Date();
    if (selectedDate > today) {
      showToastMessage("❌ Ngày sinh không được lớn hơn hôm nay.");
      return false;
    }
  
    return true;
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const formatToISO = (ddmmyyyy) => {
    const [day, month, year] = ddmmyyyy.split('-');
    return `${year}-${month}-${day}`;
  };
  
  const handleSubmit = async () => {
    try {
      const formattedData = {
        ...formData,
        dateOfBirth: formatToISO(formData.dateOfBirth),
      };
      if (!handleValidation()) return;
      await updateProfile(formattedData);
      showToastMessage('✅ Cập nhật thành công');
    } catch (err) {
      showToastMessage(err.message || '❌ Cập nhật thất bại');
    }
  };

  return (
    <>
      <div className="page-wraper">
        <div className="page-content bg-light">
          <div className="dz-bnr-inr bg-secondary overlay-black-light" style={{ backgroundImage: "url(../../assets/user/images/background/bg1.jpg)" }}>
            <div className="container">
              <div className="dz-bnr-inr-entry">
                <h1>
                Hồ sơ
                  {/* Profile */}
                </h1>
                <nav aria-label="breadcrumb" className="breadcrumb-row">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html"> Trang chủ</a></li>
                    <li className="breadcrumb-item">hồ sơ người dùng</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="content-inner-1">
            <div className="container">
              <div className="row">
                <aside className="col-xl-3">
                  <div className="toggle-info">
                    <h5 className="title mb-0">Account Navbar</h5>
                    <a className="toggle-btn" href="#accountSidebar">Account Menu</a>
                  </div>
                  <div className="sticky-top account-sidebar-wrapper">
                    <div className="account-sidebar" id="accountSidebar">
                      <div className="profile-head">
                        <div className="user-thumb">
                          <img className="rounded-circle" src={imagePreview || "../../assets/user/images/profile4.jpg"} alt="Avatar" />
                        </div>
                        <h5 className="title mb-0">{formData.firstName} {formData.lastName}</h5>
                        <span className="text text-primary">{formData.email}</span>
                      </div>
                      <div className="account-nav">
                <div className="nav-title bg-light">
                BẢNG ĐIỀU KHIỂN
                  {/* DASHBOARD */}
                </div>
                <ul>
                  <li>
                    <a href="account-dashboard.html">
                    Trang tổng quan
                      {/* Dashboard */}
                    </a>
                  </li>
                  <li>
                    <a href="account-orders.html">
                    Đơn đặt hàng
                      {/* Orders */}
                    </a>
                  </li>
                  <li>
                    <a href="account-downloads.html">
                    Tải xuống
                      {/* Downloads */}
                    </a>
                  </li>
                  <li>
                    <a href="account-return-request.html">
                    Yêu cầu trả lại
                      {/* Return request */}
                    </a>
                  </li>
                </ul>
                <div className="nav-title bg-light">
                CÀI ĐẶT TÀI KHOẢN
                {/* ACCOUNT SETTINGS */}
                </div>
                <ul className="account-info-list">
                  <li>
                    <a href="account-profile.html">
                    Hồ sơ
                      {/* Profile */}
                    </a>
                  </li>
                  <li>
                    <a href="account-address.html">
                    Địa chỉ
                      {/* Address */}
                    </a>
                  </li>
                  <li>
                    <a href="account-shipping-methods.html">
                    Phương thức vận chuyển
                      {/* Shipping methods */}
                    </a>
                  </li>
                  <li>
                    <a href="account-payment-methods.html">
                    Phương thức thanh toán
                      {/* Payment Methods */}
                    </a>
                  </li>
                  <li>
                    <a href="account-review.html">
                      Đánh giá
                      {/* Review */}
                    </a>
                  </li>
                </ul>
              </div>
                    </div>
                  </div>
                </aside>
                <section className="col-xl-9 account-wrapper">
                  <div className="account-card">
                    <div className="profile-edit">
                      <div className="avatar-upload d-flex align-items-center">
                        <div className="position-relative">
                          <div className="avatar-preview thumb">
                            <div id="imagePreview" style={{ backgroundImage: `url(${imagePreview || "images/profile3.jpg"})` }} />
                          </div>
                          <div className="change-btn thumb-edit d-flex align-items-center flex-wrap">
                            <input type="file" className="form-control d-none" id="imageUpload" accept=".png, .jpg, .jpeg" onChange={handleImageChange} />
                            <label htmlFor="imageUpload" className="btn btn-light ms-0">
                              <i className="fa-solid fa-camera" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="clearfix">
                        <h2 className="title mb-0">{formData.firstName} {formData.lastName}</h2>
                        <span className="text text-primary">{formData.email}</span>
                      </div>
                    </div>
                    <form className="row">
                      <div className="col-lg-6">
                        <div className="form-group m-b25">
                          <label className="label-title">Họ</label>
                          <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group m-b25">
                          <label className="label-title">Tên</label>
                          <input name="lastName" value={formData.lastName} onChange={handleInputChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group m-b25">
                          <label className="label-title">Địa chỉ Email</label>
                          <input type="email" name="email" value={formData.email} className="form-control" readOnly disabled />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group m-b25">
                          <label className="label-title">SĐT</label>
                          <input name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group m-b25">
                          <label className="label-title">Địa chỉ</label>
                          <input name="userAddress" value={formData.userAddress} onChange={handleInputChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group m-b25">
                          <label className="label-title">Giới tính</label>
                          <select name="gender" value={formData.gender} onChange={handleInputChange} className="form-control">
                            <option value="">Select Gender</option>
                            <option value="MALE">Nam</option>
                            <option value="FEMALE">Nữ</option>
                            <option value="OTHER">Khác</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group m-b25">
                          <label className="label-title">Ngày sinh</label><br />
                          <DatePicker
  selected={parseDate(formData.dateOfBirth)}
  onChange={(date) => {
    const formatted = formatDate(date);
    setFormData(prev => ({ ...prev, dateOfBirth: formatted }));
  }}
  dateFormat="dd-MM-yyyy"
  className="form-control"
  placeholderText="dd-MM-yyyy"
/>
                        </div>
                      </div>
                    </form>
                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                      <div className="form-group">
                        <div className="custom-control custom-checkbox text-black">
                          <input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
                          <label className="form-check-label" htmlFor="basic_checkbox_1">
                            Đăng ký nhận bản tin của tôi
                            {/* Subscribe me to Newsletter */}
                          </label>
                        </div>
                      </div>
                      <button className="btn btn-primary mt-3 mt-sm-0" type="button" onClick={handleSubmit}>
                       Sửa Hồ sơ
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <ScrollTopButton />
        <QuickViewModal />
        {showToast && (
  <div style={{
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    padding: '12px 20px',
    backgroundColor: '#4caf50',
    color: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    whiteSpace: 'pre-wrap'
  }}>
    {toastMessage}
  </div>
)}
      </div>
    </>
  );
}

export default Profile;
