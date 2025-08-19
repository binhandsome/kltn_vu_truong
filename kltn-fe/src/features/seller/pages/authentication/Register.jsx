import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; 
import { register } from 'swiper/element';

const RegisterSeller = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [frontCCCD, setFrontCCCD] = useState(null);
  const [backCCCD, setBackCCCD] = useState(null);
  const [imageYou, setImageYou] = useState(null);
  const [sdt, setSdt] = useState('');
  const [addressHouse, setAddressHouse] = useState('');
  const [addressDelivery, setAddressDelivery] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(''); 
  const [message, setMessage] = useState('');
  const [messageSeller, setMessageSeller] = useState('');
  const [otp, setOtp] = useState('');
  const [messageUsername, setMessegerUsername] = useState();
  const API_URL = 'http://localhost:8765/api/auth';
  const [isOtpInputVisible, setIsOtpInputVisible] = useState(false);
  const [isSendingDisabled, setIsSendingDisabled] = useState(false);
    const handleSendVerification = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage("❌ Email không hợp lệ. Vui lòng nhập đúng định dạng email.");
            return;
        }
        const exists = await checkEmailExists(email);
        if (exists) {
        setMessage("❌ Email này đã tồn tại trong hệ thống.");
        return;
        }else{
         setMessage("✅ Gửi email xác thực thành công.");
        } 
        setIsSendingDisabled(true);
        setIsOtpInputVisible(true);
        setCountdown(60);
    
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsSendingDisabled(false);
                    return 60;
                }
                return prev - 1;
            });
        }, 1000);
        try {
            await axios.post(`${API_URL}/sendEmailRegister`, { email });
            setMessage("✅ Gửi email xác thực thành công.");
        } catch (error) {
            console.error("Gửi email thất bại:", error);
            setMessage("❌ Gửi email thất bại, vui lòng thử lại.");
        }
    };
    const checkEmailExists = async (email) => {
      try {
        const res = await fetch(`${API_URL}/checkEmailExists`, {
          method : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body   : JSON.stringify({ email }),
        });
    
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || 'Không thể kiểm tra email');
        }
        const data = await res.json();
        return data.exists;
      } catch (error) {
        throw new Error(error.message || 'Lỗi mạng khi kiểm tra email');
      }
    };
   const checkUsernameExist = async () => {
  if (!username) {
    setMessegerUsername(""); // reset khi rỗng
    return;
  }

  try {
    const response = await axios.get(`${API_URL}/checkUsernameExists`, {
      params: { username },
    });

    if (response.data === true) {
      setMessegerUsername("❌ Tên đăng nhập đã tồn tại");
    } else if (response.data === false) {
      setMessegerUsername("✅ Tên đăng nhập hợp lệ");
    } else {
      setMessegerUsername("⚠️ Phản hồi không xác định từ server");
    }
  } catch (error) {
    console.error("❌ Lỗi khi kiểm tra username:", error);
    setMessegerUsername("🚫 Không thể kiểm tra tên đăng nhập");
  }
};

useEffect(() => {
  const delayDebounce = setTimeout(() => {
    checkUsernameExist();
  }, 500); 
  return () => clearTimeout(delayDebounce);
}, [username]);

const registerSeller = async (event) => {
  event.preventDefault(); // Ngăn hành vi mặc định của form
  const isPasswordValid = validatePassword(password);
  const isConfirmPasswordValid = validateConfirmPassword(password, confirmPassword);

  if (!isPasswordValid || !isConfirmPasswordValid) return;

  try {
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('otp', otp);
    formData.append('sdt', sdt);
    formData.append('addressHouse', addressHouse);
    formData.append('addressDelivery', addressDelivery);

    if (frontCCCD) formData.append('frontCCCD', frontCCCD);
    if (backCCCD) formData.append('backCCCD', backCCCD);
    if (imageYou) formData.append('imageYou', imageYou);

    // 🔍 Log toàn bộ form data
    for (let pair of formData.entries()) {
      console.log(`[FormData] ${pair[0]}:`, pair[1]);
    }

    const response = await axios.post('http://localhost:8765/api/seller/registerSeller', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setMessageSeller(response.data.message);
    console.log('✅ Đăng ký thành công:', response.data);
  } catch (error) {
    console.error('❌ Lỗi khi đăng ký:', error);
  }
};

  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validatePassword = (value) => {
    if (!passwordRegex.test(value)) {
      setPasswordError(
        'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt (@$!%*?&)'
      );
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu nhập lại không khớp');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };
  useEffect(() => {
    console.log('Validate Password:', validatePassword(password));
    console.log('Validate Confirm Password:', validateConfirmPassword(password, confirmPassword));
    console.log('fsafmasifnas' + passwordError);
    console.log('fasfnasfiasbfas' + confirmPasswordError);
    validatePassword(password);
    validateConfirmPassword(password, confirmPassword);
  }, [password, confirmPassword]); 

  return (
<>
  <div className="ad-auth-wrapper"  style={{
    paddingTop: '800px',
    height: '100vh',
    overflowY: 'auto',
    paddingLeft: '20px',
    paddingRight: '20px',
  }}>
    <div className="ad-auth-box">
      <div className="row align-items-center">
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="ad-auth-img">
            <img src="../../assets/admin/images/auth-img1.png" alt="" />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="ad-auth-content">
            <form>
              <a href="index.html" className="ad-auth-logo">
                <img src="../../assets/admin/images/logo2.png" alt="" />
              </a>
              <h2>
                <span className="primary">Xin chào,</span>Chào mừng đăng ký Người bán!
              </h2>
              <p>Vui lòng nhập thông tin chi tiết của bạn bên dưới để tiếp tục</p>
              <div className="ad-auth-form">
                <div className="ad-auth-feilds mb-30">
                  <input
                    type="text"
                    placeholder="Họ"
                    className="ad-input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required 
                  />
                  <div className="ad-auth-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="16px"
                      height="16px"
                    >
                      <path
                        fillRule="evenodd"
                        fill="rgb(154, 190, 237)"
                        d="M13.696,9.759 C12.876,8.942 11.901,8.337 10.837,7.971 C11.989,7.180 12.742,5.850 12.725,4.349 C12.698,1.961 10.713,0.031 8.318,0.062 C5.946,0.093 4.026,2.026 4.026,4.398 C4.026,5.879 4.774,7.189 5.914,7.971 C4.850,8.337 3.875,8.942 3.055,9.759 C1.786,11.025 1.026,12.663 0.878,14.426 C0.849,14.768 1.117,15.063 1.462,15.063 L1.466,15.063 C1.772,15.063 2.024,14.827 2.050,14.523 C2.325,11.285 5.057,8.734 8.375,8.734 C11.694,8.734 14.425,11.285 14.701,14.523 C14.727,14.827 14.979,15.063 15.285,15.063 L15.289,15.063 C15.634,15.063 15.902,14.768 15.873,14.426 C15.725,12.663 14.965,11.025 13.696,9.759 ZM8.375,7.562 C6.625,7.562 5.201,6.143 5.201,4.398 C5.201,2.653 6.625,1.234 8.375,1.234 C10.126,1.234 11.550,2.653 11.550,4.398 C11.550,6.143 10.126,7.562 8.375,7.562 Z"
                      />
                    </svg>
                  </div>
                </div>
                      <div className="ad-auth-feilds mb-30">
                  <input
                    type="text"
                    placeholder="Tên"
                    className="name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required 
                  />
                  <div className="ad-auth-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="16px"
                      height="16px"
                    >
                      <path
                        fillRule="evenodd"
                        fill="rgb(154, 190, 237)"
                        d="M13.696,9.759 C12.876,8.942 11.901,8.337 10.837,7.971 C11.989,7.180 12.742,5.850 12.725,4.349 C12.698,1.961 10.713,0.031 8.318,0.062 C5.946,0.093 4.026,2.026 4.026,4.398 C4.026,5.879 4.774,7.189 5.914,7.971 C4.850,8.337 3.875,8.942 3.055,9.759 C1.786,11.025 1.026,12.663 0.878,14.426 C0.849,14.768 1.117,15.063 1.462,15.063 L1.466,15.063 C1.772,15.063 2.024,14.827 2.050,14.523 C2.325,11.285 5.057,8.734 8.375,8.734 C11.694,8.734 14.425,11.285 14.701,14.523 C14.727,14.827 14.979,15.063 15.285,15.063 L15.289,15.063 C15.634,15.063 15.902,14.768 15.873,14.426 C15.725,12.663 14.965,11.025 13.696,9.759 ZM8.375,7.562 C6.625,7.562 5.201,6.143 5.201,4.398 C5.201,2.653 6.625,1.234 8.375,1.234 C10.126,1.234 11.550,2.653 11.550,4.398 C11.550,6.143 10.126,7.562 8.375,7.562 Z"
                      />
                    </svg>
                  </div>
                </div>
                {/* <div className="ad-auth-feilds mb-30">
                  <input
                    type="text"
                    placeholder="Tên Shop"
                    className="ad-input"
                  />
                  <div className="ad-auth-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="16px"
                      height="16px"
                    >
                      <path
                        fillRule="evenodd"
                        fill="rgb(154, 190, 237)"
                        d="M13.696,9.759 C12.876,8.942 11.901,8.337 10.837,7.971 C11.989,7.180 12.742,5.850 12.725,4.349 C12.698,1.961 10.713,0.031 8.318,0.062 C5.946,0.093 4.026,2.026 4.026,4.398 C4.026,5.879 4.774,7.189 5.914,7.971 C4.850,8.337 3.875,8.942 3.055,9.759 C1.786,11.025 1.026,12.663 0.878,14.426 C0.849,14.768 1.117,15.063 1.462,15.063 L1.466,15.063 C1.772,15.063 2.024,14.827 2.050,14.523 C2.325,11.285 5.057,8.734 8.375,8.734 C11.694,8.734 14.425,11.285 14.701,14.523 C14.727,14.827 14.979,15.063 15.285,15.063 L15.289,15.063 C15.634,15.063 15.902,14.768 15.873,14.426 C15.725,12.663 14.965,11.025 13.696,9.759 ZM8.375,7.562 C6.625,7.562 5.201,6.143 5.201,4.398 C5.201,2.653 6.625,1.234 8.375,1.234 C10.126,1.234 11.550,2.653 11.550,4.398 C11.550,6.143 10.126,7.562 8.375,7.562 Z"
                      />
                    </svg>
                  </div>
                </div> */}
   <div className="ad-auth-feilds mb-30">
  <label>Địa chỉ Email</label>
  <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
    <input
      type="email"
      placeholder="Nhập địa chỉ Email"
      className="ad-input"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      disabled={isSendingDisabled}
      style={{ flex: 1 }}
      required 
    />
    <div className="ad-auth-icon" style={{ position: 'absolute', left: '10px', pointerEvents: 'none' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 483.3 483.3"
        style={{ width: '20px', height: '20px' }}
      >
        <path
          d="M424.3,57.75H59.1c-32.6,0-59.1,26.5-59.1,59.1v249.6c0,32.6,26.5,59.1,59.1,59.1h365.1c32.6,0,59.1-26.5,59.1-59.1v-249.5C483.4,84.35,456.9,57.75,424.3,57.75z M456.4,366.45c0,17.7-14.4,32.1-32.1,32.1H59.1c-17.7,0-32.1-14.4-32.1-32.1v-249.5c0-17.7,14.4-32.1,32.1-32.1h365.1c17.7,0,32.1,14.4,32.1,32.1v249.5H456.4z"
          fill="#9abeed"
        />
        <path
          d="M304.8,238.55l118.2-106c5.5-5,6-13.5,1-19.1c-5-5.5-13.5-6-19.1-1l-163,146.3l-31.8-28.4c-0.1-0.1-0.2-0.2-0.2-0.3    c-0.7-0.7-1.4-1.3-2.2-1.9L78.3,112.35c-5.6-5-14.1-4.5-19.1,1.1c-5,5.6-4.5,14.1,1.1,19.1l119.6,106.9L60.8,350.95    c-5.4,5.1-5.7,13.6-0.6,19.1c2.7,2.8,6.3,4.3,9.9,4.3c3.3,0,6.6-1.2,9.2-3.6l120.9-113.1l32.8,29.3c2.6,2.3,5.8,3.4,9,3.4    c3.2,0,6.5-1.2,9-3.5l33.7-30.2l120.2,114.2c2.6,2.5,6,3.7,9.3,3.7c3.6,0,7.1-1.4,9.8-4.2c5.1-5.4,4.9-14-0.5-19.1L304.8,238.55z"
          fill="#9abeed"
        />
      </svg>
    </div>

    <button
      type="button"
      className="btn btn-success"
      style={{ marginLeft: '10px', whiteSpace: 'nowrap' }}
      onClick={handleSendVerification}
      disabled={isSendingDisabled}
    >
      {isSendingDisabled ? `Gửi lại (${countdown}s)` : 'Gửi Mã'}
    </button>
  </div>
</div>
{isOtpInputVisible && (
  <div className="ad-auth-feilds mb-30">
    <label>Nhập mã OTP</label>
    <input
      type="text"
      className="ad-input"
      placeholder="Nhập mã OTP từ email"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      required
    />
  </div>
)}
    {message}


                <div className="ad-auth-feilds mb-30">
                  <input
                    type="text"
                    placeholder="Tên Đăng Nhập"
                    className="ad-input"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required 
                  />
                  {messageUsername}
                  <div className="ad-auth-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="16px"
                      height="16px"
                    >
                      <path
                        fillRule="evenodd"
                        fill="rgb(154, 190, 237)"
                        d="M13.696,9.759 C12.876,8.942 11.901,8.337 10.837,7.971 C11.989,7.180 12.742,5.850 12.725,4.349 C12.698,1.961 10.713,0.031 8.318,0.062 C5.946,0.093 4.026,2.026 4.026,4.398 C4.026,5.879 4.774,7.189 5.914,7.971 C4.850,8.337 3.875,8.942 3.055,9.759 C1.786,11.025 1.026,12.663 0.878,14.426 C0.849,14.768 1.117,15.063 1.462,15.063 L1.466,15.063 C1.772,15.063 2.024,14.827 2.050,14.523 C2.325,11.285 5.057,8.734 8.375,8.734 C11.694,8.734 14.425,11.285 14.701,14.523 C14.727,14.827 14.979,15.063 15.285,15.063 L15.289,15.063 C15.634,15.063 15.902,14.768 15.873,14.426 C15.725,12.663 14.965,11.025 13.696,9.759 ZM8.375,7.562 C6.625,7.562 5.201,6.143 5.201,4.398 C5.201,2.653 6.625,1.234 8.375,1.234 C10.126,1.234 11.550,2.653 11.550,4.398 C11.550,6.143 10.126,7.562 8.375,7.562 Z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ad-auth-feilds mb-30">
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="ad-input"
                     value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                  {passwordError}
                  <div className="ad-auth-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 482.8 482.8"
                    >
                      <path
                        d="M395.95,210.4h-7.1v-62.9c0-81.3-66.1-147.5-147.5-147.5c-81.3,0-147.5,66.1-147.5,147.5c0,7.5,6,13.5,13.5,13.5    s13.5-6,13.5-13.5c0-66.4,54-120.5,120.5-120.5c66.4,0,120.5,54,120.5,120.5v62.9h-275c-14.4,0-26.1,11.7-26.1,26.1v168.1    c0,43.1,35.1,78.2,78.2,78.2h204.9c43.1,0,78.2-35.1,78.2-78.2V236.5C422.05,222.1,410.35,210.4,395.95,210.4z M395.05,404.6    c0,28.2-22.9,51.2-51.2,51.2h-204.8c-28.2,0-51.2-22.9-51.2-51.2V237.4h307.2L395.05,404.6L395.05,404.6z"
                        data-original="#000000"
                        className="active-path"
                        data-old_color="#000000"
                        fill="#9abeed"
                      />
                      <path
                        d="M241.45,399.1c27.9,0,50.5-22.7,50.5-50.5c0-27.9-22.7-50.5-50.5-50.5c-27.9,0-50.5,22.7-50.5,50.5    S213.55,399.1,241.45,399.1z M241.45,325c13,0,23.5,10.6,23.5,23.5s-10.5,23.6-23.5,23.6s-23.5-10.6-23.5-23.5    S228.45,325,241.45,325z"
                        data-original="#000000"
                        className="active-path"
                        data-old_color="#000000"
                        fill="#9abeed"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ad-auth-feilds mb-30">
                  <input
                    type="password"
                    placeholder="Nhập lại Mật khẩu"
                    className="ad-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                  />
                  {confirmPasswordError}
                  <div className="ad-auth-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 482.8 482.8"
                    >
                      <path
                        d="M395.95,210.4h-7.1v-62.9c0-81.3-66.1-147.5-147.5-147.5c-81.3,0-147.5,66.1-147.5,147.5c0,7.5,6,13.5,13.5,13.5    s13.5-6,13.5-13.5c0-66.4,54-120.5,120.5-120.5c66.4,0,120.5,54,120.5,120.5v62.9h-275c-14.4,0-26.1,11.7-26.1,26.1v168.1    c0,43.1,35.1,78.2,78.2,78.2h204.9c43.1,0,78.2-35.1,78.2-78.2V236.5C422.05,222.1,410.35,210.4,395.95,210.4z M395.05,404.6    c0,28.2-22.9,51.2-51.2,51.2h-204.8c-28.2,0-51.2-22.9-51.2-51.2V237.4h307.2L395.05,404.6L395.05,404.6z"
                        data-original="#000000"
                        className="active-path"
                        data-old_color="#000000"
                        fill="#9abeed"
                      />
                      <path
                        d="M241.45,399.1c27.9,0,50.5-22.7,50.5-50.5c0-27.9-22.7-50.5-50.5-50.5c-27.9,0-50.5,22.7-50.5,50.5    S213.55,399.1,241.45,399.1z M241.45,325c13,0,23.5,10.6,23.5,23.5s-10.5,23.6-23.5,23.6s-23.5-10.6-23.5-23.5    S228.45,325,241.45,325z"
                        data-original="#000000"
                        className="active-path"
                        data-old_color="#000000"
                        fill="#9abeed"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ad-auth-feilds mb-30">
                  <label>Hình ảnh căn cước mặt trước</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="ad-input"
                    onChange={(e) => setFrontCCCD(e.target.files[0])}
                    required 
                  />
                </div>
                <div className="ad-auth-feilds mb-30">
                  <label>Hình ảnh căn cước mặt sau</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="ad-input"
                    onChange={(e) => setBackCCCD(e.target.files[0])}
                    required 
                  />
                </div>
                <div className="ad-auth-feilds mb-30">
                  <label>Hình ảnh chụp thật trên căn cước</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="ad-input"
                    onChange={(e) => setImageYou(e.target.files[0])}
                    required 
                  />
                </div>
                <div className="ad-auth-feilds mb-30">
                  <input
                    type="tel"
                    placeholder="Số điện thoại (SDT)"
                    className="ad-input"
                    value={sdt}
                    onChange={(e) => setSdt(e.target.value)}
                    required 
                  />
                  <div className="ad-auth-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="rgb(154, 190, 237)"
                      width="16px"
                      height="16px"
                    >
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                </div>
                <div className="ad-auth-feilds mb-30">
                  <input
                    type="text"
                    placeholder="Nơi ở hiện tại"
                    className="ad-input"
                    value={addressHouse}
                    onChange={(e) => setAddressHouse(e.target.value)}
                    required 
                  />
                  <div className="ad-auth-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="rgb(154, 190, 237)"
                      width="16px"
                      height="16px"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                </div>
                <div className="ad-auth-feilds mb-30">
                  <input
                    type="text"
                    placeholder="Địa chỉ của Giao Hàng Nhanh gần nhất"
                    className="ad-input"
                    value={addressDelivery} 
                    onChange={(e) => setAddressDelivery(e.target.value)}
                    required 
                  />
                  <div className="ad-auth-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="rgb(154, 190, 237)"
                      width="16px"
                      height="16px"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="ad-auth-btn">
                <button onClick={(e) => registerSeller(e)} className="ad-btn ad-login-member">
                  Đăng ký
                </button>
              </div>
              {messageSeller}
              <p className="ad-register-text">
                Bạn đã có tài khoản ? <a href="login.html">Đăng nhập</a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="ad-notifications ad-error">
        <p>
          <span>Hừ!</span>Đã xảy ra lỗi
        </p>
      </div>
    </div>
  </div>
    </>
  );
}

export default RegisterSeller;