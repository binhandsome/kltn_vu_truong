// src/pages/payment/PaymentReturn.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

const PaymentReturn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [message, setMessage] = useState("Đang xác minh giao dịch...");
  const [loading, setLoading] = useState(false);

  const parsed = queryString.parse(location.search);
  const rawMasterOrderId = parsed.masterOrderId || localStorage.getItem("pendingOrderId");
  const masterOrderId = rawMasterOrderId ? Number(rawMasterOrderId) : null;

  // NEW: Đồng bộ lại giỏ hàng từ BE để phản ánh trạng thái "đã xoá item đã mua"
  const refreshWholeCart = async () => {
    try {
      const token = localStorage.getItem("accessToken") || "";
      const cartId = localStorage.getItem("cartId") || "";
      const res = await axios.get("http://localhost:8084/api/cart/getItemCart", {
        params: { token, cartId },
      });

      const data = res.data || {};
      // tuỳ app bạn đang đọc badge/cart từ đâu, ở đây lưu tạm vào localStorage + bắn event
      localStorage.setItem("cartTotalQuantity", String(data.totalQuantity ?? 0));
      localStorage.setItem("cartTotalPrice", String(data.totalPrice ?? 0));
      window.dispatchEvent(new CustomEvent("cart:updated", { detail: data }));
    } catch (e) {
      console.warn("Không thể đồng bộ giỏ hàng sau thanh toán:", e);
    }
  };

  useEffect(() => {
    const maybeId = parsed.masterOrderId;
    if (maybeId) {
      localStorage.setItem("pendingOrderId", maybeId);
    }

    const responseCode = parsed.vnp_ResponseCode;
    const success = parsed.success;

    const isVnpSuccess = responseCode === "00";
    const isPaypalSuccess = success === "true";

    if (isVnpSuccess || isPaypalSuccess) {
      setPaymentStatus("success");
      setMessage("✅ Thanh toán thành công!");
      // NEW: đồng bộ giỏ ngay khi thành công
      refreshWholeCart();
    } else {
      setPaymentStatus("fail");
      setMessage("❌ Thanh toán thất bại hoặc bị huỷ.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleView = async () => {
    if (!masterOrderId) {
      navigate("/user/myaccount/orders");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:8086/api/orders/getOrderByIdUser", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const listOrders = response.data || [];
      const foundOrder = listOrders.find((order) => order.masterOrderId === masterOrderId);

      // Dọn pendingOrderId khi đã tìm thấy order để tránh tồn rác
      if (foundOrder) {
        localStorage.removeItem("pendingOrderId");
        navigate("/user/myaccount/ordersdetails", { state: { order: foundOrder } });
      } else {
        alert("❌ Không tìm thấy đơn hàng.");
        navigate("/user/myaccount/orders");
      }
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách đơn hàng:", error?.response?.data || error?.message);
      navigate("/user/myaccount/orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 text-center">
      <h2 className={paymentStatus === "success" ? "text-success" : "text-danger"}>
        {message}
      </h2>

      <button
        className={`btn mt-3 ${masterOrderId ? "btn-primary" : "btn-secondary"}`}
        onClick={handleView}
        disabled={loading}
      >
        {loading
          ? "Đang tải..."
          : masterOrderId
          ? "Xem chi tiết đơn hàng"
          : "Quay lại xem danh sách đơn hàng"}
      </button>
    </div>
  );
};

export default PaymentReturn;
