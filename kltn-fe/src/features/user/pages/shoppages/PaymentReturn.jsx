// src/pages/PaymentReturn.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
 const PaymentReturn = () => {
  const location = useLocation();   const navigate = useNavigate();
 const [paymentStatus, setPaymentStatus] = useState(null);
 const [message, setMessage] = useState("Đang xác minh giao dịch...");
  const parsed = queryString.parse(location.search);
  const orderId = parsed.orderId;

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    const responseCode = parsed.vnp_ResponseCode;
    const success = parsed.success; // ✅ đúng key từ URL

    const isVnpSuccess = responseCode === "00";
    const isPaypalSuccess = success === "true"; // ✅ check key "success"

    if (isVnpSuccess || isPaypalSuccess) {
      setPaymentStatus("success");
      setMessage("✅ Thanh toán thành công!");
    } else {
      setPaymentStatus("fail");
      setMessage("❌ Thanh toán thất bại hoặc bị huỷ.");
    }
  }, [location.search]);

  return (
    <div className="container py-5 text-center">
      <h2 className={paymentStatus === "success" ? "text-success" : "text-danger"}>
        {message}
      </h2>
      {orderId ? (
        <button className="btn btn-primary mt-3" onClick={() => navigate(`/user/myaccount/orders/${orderId}`)}>
          Xem chi tiết đơn hàng
        </button>
      ) : (
        <button className="btn btn-secondary mt-3" onClick={() => navigate("/user/myaccount/orders")}>
          Quay lại xem danh sách đơn hàng
        </button>
      )}
    </div>
  );
};


export default PaymentReturn;
