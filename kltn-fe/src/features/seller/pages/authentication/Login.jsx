import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

function Login() {
const [showModal, setShowModal] = useState(false);
const [otp, setOtp] = useState(new Array(6).fill(""));
const inputsRef = useRef([]);
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [message, setMessage] = useState();
useEffect(() => {
  console.log(otp);
})
const handleChange = (e, index) => {
  const value = e.target.value;
  if (!/^[0-9]?$/.test(value)) return; // Chỉ nhận số
  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);
  if (value && index < 5) {
    inputsRef.current[index + 1].focus();
  }
};
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };
  const checkLoginSeller = async() => {
    if(email === null || password === null) {
    return setMessage('❗ Vui lòng điền đầy đủ thông tin');
    }
     const payload = { email, password };
   try {
  const response = await axios.post("http://localhost:8089/api/seller/checkLoginSeller", payload);
  if (response.status === 200) {
    setMessage('' + response.data.message);
    setShowModal(true);
  }
} catch (error) {
  if (error.response) {
    const status = error.response.status;
    const msg = error.response.data?.message || 'Không xác định';

    if (status === 401) {
      setMessage(' ' + msg);
    } else if (status === 403) {
      setMessage(' ' + msg);
    } else if (status === 500) {
      setMessage(' ' + msg);
    } else {
      setMessage('❗ Đã xảy ra lỗi không xác định');
    }
  } else {
    setMessage('❗ Không thể kết nối đến máy chủ');
  }
}
};
const verifyLoginSeller = async () => {
  const otpCode = otp.join("");
  console.log("✅ OTP Code vừa nhập:", otpCode); // Log OTP người dùng nhập

  if (otpCode.length !== 6) {
    alert("Vui lòng nhập đầy đủ mã OTP");
    return;
  }

  const payload = {
    email,
    otp: otpCode, // ✅ Đúng key phải là "otp" để khớp với backend (RequestInfomation.otp)
  };

  console.log("📦 Payload gửi lên server:", payload);

  try {
    const response = await axios.post("http://localhost:8089/api/seller/verifyLoginSeller", payload);

    console.log("📥 Phản hồi từ server:", response.data);

    const { accessToken, refreshToken, username } = response.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("username", username);

    window.location.href = "/seller";
  } catch (error) {
    console.error("❌ Lỗi xác thực OTP:", error);
    console.log("🪵 Phản hồi lỗi từ server:", error?.response?.data);
    alert(error?.response?.data?.message || "Xác thực OTP thất bại");
  }
};

return (
<>
  <div className="ad-auth-wrapper">
  <div className="ad-auth-box">
    <div className="row align-items-center">
      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
        <div className="ad-auth-img">
          <img src="../../assets/admin/images/auth-img1.png" alt="" />
        </div>
      </div>
   
      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
        <div className="ad-auth-content">

            <a href="index.html" className="ad-auth-logo">
              <img src="../../assets/admin/images/logo2.png" alt="" />
            </a>
            <h2>
              <span className="primary">Xin chào,</span>Chào mừng!
            </h2>
            {/* Please Enter Your Details Below to Continue */}
            <p>Vui lòng nhập thông tin chi tiết của bạn bên dưới để tiếp tục</p>
            <div className="ad-auth-form">
              <div className="ad-auth-feilds mb-30">
                <input
                  type="text"
                  // Email Address
                  placeholder="Địa chỉ Email"
                  className="ad-input"
                      value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="ad-auth-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 483.3 483.3"
                  >
                    <path
                      d="M424.3,57.75H59.1c-32.6,0-59.1,26.5-59.1,59.1v249.6c0,32.6,26.5,59.1,59.1,59.1h365.1c32.6,0,59.1-26.5,59.1-59.1    v-249.5C483.4,84.35,456.9,57.75,424.3,57.75z M456.4,366.45c0,17.7-14.4,32.1-32.1,32.1H59.1c-17.7,0-32.1-14.4-32.1-32.1v-249.5    c0-17.7,14.4-32.1,32.1-32.1h365.1c17.7,0,32.1,14.4,32.1,32.1v249.5H456.4z"
                      data-original="#000000"
                      className="active-path"
                      data-old_color="#000000"
                      fill="#9abeed"
                    />
                    <path
                      d="M304.8,238.55l118.2-106c5.5-5,6-13.5,1-19.1c-5-5.5-13.5-6-19.1-1l-163,146.3l-31.8-28.4c-0.1-0.1-0.2-0.2-0.2-0.3    c-0.7-0.7-1.4-1.3-2.2-1.9L78.3,112.35c-5.6-5-14.1-4.5-19.1,1.1c-5,5.6-4.5,14.1,1.1,19.1l119.6,106.9L60.8,350.95    c-5.4,5.1-5.7,13.6-0.6,19.1c2.7,2.8,6.3,4.3,9.9,4.3c3.3,0,6.6-1.2,9.2-3.6l120.9-113.1l32.8,29.3c2.6,2.3,5.8,3.4,9,3.4    c3.2,0,6.5-1.2,9-3.5l33.7-30.2l120.2,114.2c2.6,2.5,6,3.7,9.3,3.7c3.6,0,7.1-1.4,9.8-4.2c5.1-5.4,4.9-14-0.5-19.1L304.8,238.55z"
                      data-original="#000000"
                      className="active-path"
                      data-old_color="#000000"
                      fill="#9abeed"
                    />
                  </svg>
                </div>
              </div>
              <div className="ad-auth-feilds">
                <input
                  type="password"
                  // Password
                  placeholder="Mật khẩu"
                  className="ad-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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
            </div>
            <div className="ad-other-feilds">
              <div className="ad-checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="remeber"
                    className="ad-checkbox"
                  />
                  {/* Remember Me */}
                  <span>Nhớ</span>
                </label>
              </div>
              <a className="forgot-pws-btn" href="forgot-pws.html">
                {/* Forgot Password? */}
                Quên mật khẩu?
              </a>
            </div>
            <div className="ad-auth-btn">
              <button onClick={checkLoginSeller} className="ad-btn ad-login-member">
                {/* Login */}
                Đăng nhập
              </button>
            </div>
            {message}
            <p className="ad-register-text">
              {/* Don't have an account?  */} 
              Bạn chưa có tài khoản? <a href="register.html">Bấm vào đây</a>
              {/* Click Here */}
            </p>

{showModal && (
  <div className="modal d-block show" style={{ background: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">NHẬP MÃ OTP GỬI VỀ MAIL CỦA BẠN</h5>
          <button className="close" onClick={() => setShowModal(false)}>
            &times;
          </button>
        </div>
         <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            width: "40px",
            height: "50px",
            fontSize: "24px",
            textAlign: "center",
            border: "2px solid #ccc",
            borderRadius: "6px",
            outline: "none",
            transition: "border-color 0.2s ease-in-out",
          }}
          onFocus={(e) => e.target.select()}
        />
       
      ))}
    
    </div>
<div style={{ textAlign: 'center', marginTop: '20px' }}>
  <button
    style={{
      padding: '10px 20px',
      backgroundColor: '#007bff',
      border: 'none',
      color: 'white',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
    }}
    onClick={() => {
      const otpCode = otp.join('');
      console.log('✅ Mã OTP nhập:', otpCode);
      verifyLoginSeller();
    }}
  >
    Xác nhận mã OTP
  </button>
</div>

      </div>
        
    </div>
  </div>
)}

        </div>
      </div>
    </div>
    
    <div className="ad-notifications ad-error">
      <p>
        {/* Something Went Wrong */}
        <span>Hừ!</span>Đã xảy ra lỗi
      </p>
    </div>
  </div>
</div></>
);

}


  
  
  export default Login;