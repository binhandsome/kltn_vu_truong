import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return setMessage('❗ Vui lòng nhập đầy đủ thông tin');
    }

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.put(
        'http://localhost:8765/api/auth/changePasswordAdmin',
        {
          currentPassword,
          newPassword,
          confirmPassword
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      setMessage(response.data || '✅ Đổi mật khẩu thành công');
    } catch (err) {
      const msg = err?.response?.data || '❌ Đổi mật khẩu thất bại';
      setMessage(msg);
    }
  };

  return (
    <div className="ad-auth-wrapper">
      <div className="ad-auth-box">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="ad-auth-content">
              <h2 className="mb-4">
                <span className="primary">Đổi mật khẩu</span>
              </h2>

              <div className="ad-auth-form">
                <input
                  type="password"
                  className="ad-input mb-20"
                  placeholder="Mật khẩu hiện tại"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                  type="password"
                  className="ad-input mb-20"
                  placeholder="Mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  className="ad-input mb-20"
                  placeholder="Xác nhận mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="ad-auth-btn">
                <button className="ad-btn ad-login-member" onClick={handleChangePassword}>
                  Cập nhật mật khẩu
                </button>
              </div>

              {message && (
                <p
                  style={{
                    color: message.startsWith('✅') ? 'green' : 'red',
                    marginTop: 10
                  }}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
