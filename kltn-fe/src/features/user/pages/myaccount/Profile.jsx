import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs';
import { getProfile, updateProfile } from '../../apiService/authService';

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
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          userAddress: data.userAddress || '',
          gender: data.gender || '',
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.slice(0, 10) : '',
          profilePicture: data.profilePicture || ''
        });
        if (data.profilePicture) {
          setImagePreview(data.profilePicture);
        }
      })
      .catch(error => {
        console.error('Lỗi khi lấy profile:', error);
        alert('Không thể tải thông tin người dùng. Vui lòng đăng nhập lại.');
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleSubmit = async () => {
    try {
      await updateProfile(formData);
      alert('Cập nhật thành công');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Cập nhật thất bại');
    }
  };

  return (
    <>
      <div className="page-wraper">
        <div className="page-content bg-light">
          <div className="dz-bnr-inr bg-secondary overlay-black-light" style={{ backgroundImage: "url(../../assets/user/images/background/bg1.jpg)" }}>
            <div className="container">
              <div className="dz-bnr-inr-entry">
                <h1>Profile</h1>
                <nav aria-label="breadcrumb" className="breadcrumb-row">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html"> Home</a></li>
                    <li className="breadcrumb-item">Account Profile</li>
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
                        <div className="nav-title bg-light">DASHBOARD</div>
                        <ul>
                          <li><a href="account-dashboard.html">Dashboard</a></li>
                          <li><a href="account-orders.html">Orders</a></li>
                          <li><a href="account-downloads.html">Downloads</a></li>
                          <li><a href="account-return-request.html">Return request</a></li>
                        </ul>
                        <div className="nav-title bg-light">ACCOUNT SETTINGS</div>
                        <ul className="account-info-list">
                          <li><a href="account-profile.html">Profile</a></li>
                          <li><a href="account-address.html">Address</a></li>
                          <li><a href="account-shipping-methods.html">Shipping methods</a></li>
                          <li><a href="account-payment-methods.html">Payment Methods</a></li>
                          <li><a href="account-review.html">Review</a></li>
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
                          <label className="label-title">First Name</label>
                          <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group m-b25">
                          <label className="label-title">Last Name</label>
                          <input name="lastName" value={formData.lastName} onChange={handleInputChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group m-b25">
                          <label className="label-title">Email address</label>
                          <input type="email" name="email" value={formData.email} className="form-control" readOnly disabled />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group m-b25">
                          <label className="label-title">Phone</label>
                          <input name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group m-b25">
                          <label className="label-title">Address</label>
                          <input name="userAddress" value={formData.userAddress} onChange={handleInputChange} className="form-control" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group m-b25">
                          <label className="label-title">Gender</label>
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
                          <label className="label-title">Date of Birth</label>
                          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className="form-control" />
                        </div>
                      </div>
                    </form>
                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                      <div className="form-group">
                        <div className="custom-control custom-checkbox text-black">
                          <input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
                          <label className="form-check-label" htmlFor="basic_checkbox_1">
                            Subscribe me to Newsletter
                          </label>
                        </div>
                      </div>
                      <button className="btn btn-primary mt-3 mt-sm-0" type="button" onClick={handleSubmit}>
                        Update profile
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
      </div>
    </>
  );
}

export default Profile;
