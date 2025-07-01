import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ScrollTopButton from '../../layout/ScrollTopButton';
import QuickViewModal from '../../components/home/QuickViewModal';
import WOW from 'wowjs';
import { changePassword } from '../../apiService/authService';

function ChangePassword() {
  const [hasBgClass, setHasBgClass] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('❌ Mật khẩu mới không trùng khớp.');
      return;
    }

    try {
      await changePassword(oldPassword, newPassword);
      setMessage('✅ Đổi mật khẩu thành công!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage(`❌ Lỗi: ${error.message}`);
    }
  };

  useEffect(() => {
    if (hasBgClass) document.body.classList.add('bg');
    return () => document.body.classList.remove('bg');
  }, [hasBgClass]);

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  const renderPasswordField = (label, value, setValue, show, setShow) => (
    <div className="m-b20">
      <label className="label-title">{label}</label>
      <div className="secure-input position-relative">
        <input
          type={show ? 'text' : 'password'}
          className="form-control dz-password pe-5"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={label}
          required
        />
        <div
          className="show-pass position-absolute top-50 end-0 translate-middle-y me-3"
          onClick={() => setShow(!show)}
          style={{ cursor: 'pointer' }}
        >
          <i className={`fa-regular ${show ? 'fa-eye-slash' : 'fa-eye'}`} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Đổi mật khẩu</title>
      </Helmet>
      <div className="page-wraper">
        <div className="page-content bg-light">
          <section className="px-3">
            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-lg-6 start-side-content">
                <div className="dz-bnr-inr-entry">
                  <h1>Change Password</h1>
                  <nav className="breadcrumb-row">
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="/">Home</a>
                      </li>
                      <li className="breadcrumb-item">Change Password</li>
                    </ul>
                  </nav>
                </div>
                <div className="registration-media">
                  <img src="../../assets/user/images/registration/pic3.png" alt="change-password" />
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 end-side-content justify-content-center">
                <div className="login-area">
                  <h2 className="text-secondary text-center">Change Password</h2>
                  <form onSubmit={handleSubmit}>
                    {renderPasswordField('Mật khẩu cũ', oldPassword, setOldPassword, showOld, setShowOld)}
                    {renderPasswordField('Mật khẩu mới', newPassword, setNewPassword, showNew, setShowNew)}
                    {renderPasswordField('Nhập lại mật khẩu mới', confirmPassword, setConfirmPassword, showConfirm, setShowConfirm)}
                    <div className="text-center">
                      <button type="submit" className="btn btn-secondary">Đổi mật khẩu</button>
                    </div>
                  </form>
                  <br />
                  <div className="text-center">
                    {message && <p>{message}</p>}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <ScrollTopButton />
        <QuickViewModal />
      </div>
    </>
  );
}

export default ChangePassword;
