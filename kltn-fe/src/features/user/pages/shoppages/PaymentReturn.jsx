// // src/pages/PaymentReturn.jsx
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import queryString from "query-string";

// const PaymentReturn = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const [message, setMessage] = useState("Đang xác minh giao dịch...");

//   useEffect(() => {
//     const parsed = queryString.parse(location.search);
//     const responseCode = parsed.vnp_ResponseCode;
//     const orderId = parsed.vnp_TxnRef;

//     if (responseCode === "00") {
//       setPaymentStatus("success");
//       setMessage("✅ Thanh toán thành công!");
//     } else {
//       setPaymentStatus("fail");
//       setMessage("❌ Thanh toán thất bại hoặc bị huỷ.");
//     }

//     // Bạn có thể gửi lên server để xác minh thêm nếu cần
//     // axios.post("/api/payment/verify", parsed)...

//   }, [location.search]);

//   return (
//     <div className="container py-5 text-center">
//       <h2 className={paymentStatus === "success" ? "text-success" : "text-danger"}>
//         {message}
//       </h2>
//       <button className="btn btn-primary mt-3" onClick={() => navigate("/user/myaccount/orders")}>
//         Xem đơn hàng
//       </button>
//     </div>
//   );
// };

// export default PaymentReturn;
