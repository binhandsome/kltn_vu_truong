import React, { useEffect, useState } from 'react';
import ScrollTopButton from '../../layout/ScrollTopButton';
import QuickViewModal from '../../components/home/QuickViewModal';
import { changePassword } from '../../apiService/authService';
import WOW from 'wowjs';

function ChangePassword() {
  const [hasBgClass, setHasBgClass] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const validatePassword = (pwd) => {
    const errors = [];
    if (pwd.length < 8) errors.push("Ít nhất 8 ký tự");
    if (!/[A-Z]/.test(pwd)) errors.push("Ít nhất 1 chữ hoa");
    if (!/[a-z]/.test(pwd)) errors.push("Ít nhất 1 chữ thường");
    if (!/[0-9]/.test(pwd)) errors.push("Ít nhất 1 số");
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(pwd)) errors.push("Ít nhất 1 ký tự đặc biệt");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("❌ Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const errors = validatePassword(newPassword);
    if (errors.length > 0) {
      setMessage("❌ Mật khẩu mới không hợp lệ:\n" + errors.join('\n'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("❌ Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const res = await changePassword(currentPassword, newPassword);
      setMessage(`✅ ${res}`);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  useEffect(() => {
    if (hasBgClass) document.body.classList.add('bg');
    return () => document.body.classList.remove('bg');
  }, [hasBgClass]);

  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init();
  }, []);

  return (
    <>
      <div className="page-wraper">
        <div className="page-content bg-light">
          <section className="px-3">
            <div className="row">
              <div className="col-xxl-6 col-xl-6 col-lg-6 start-side-content">
                <div className="dz-bnr-inr-entry">
                  <h1>Change Password</h1>
                  <nav className="breadcrumb-row" aria-label="breadcrumb text-align-start">
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item"><a href="/">Home</a></li>
                      <li className="breadcrumb-item">Change Password</li>
                    </ul>
                  </nav>
                </div>
                <div className="registration-media">
                  <img src="../../assets/user/images/registration/pic3.png" alt="/" />
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 end-side-content justify-content-center">
                <div className="login-area">
                  <h2 className="text-secondary text-center">Đổi mật khẩu</h2>
                  <p className="text-center m-b25">Vui lòng nhập mật khẩu hiện tại và mật khẩu mới</p>
                  <form onSubmit={handleSubmit}>
                    <div className="m-b25">
                      <label className="label-title">Mật khẩu hiện tại</label>
                      <input type="password" className="form-control" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                    </div>
                    <div className="m-b25">
                      <label className="label-title">Mật khẩu mới</label>
                      <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>
                    <div className="m-b25">
                      <label className="label-title">Xác nhận mật khẩu mới</label>
                      <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-secondary">Đổi mật khẩu</button>
                    </div>
                    {message && (
                      <div className="alert alert-info text-center mt-3" style={{ whiteSpace: 'pre-wrap' }}>
                        {message}
                      </div>
                    )}
                  </form>
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
