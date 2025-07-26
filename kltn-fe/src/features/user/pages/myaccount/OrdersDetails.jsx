// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import { getOrderDetails } from '../../apiService/orderService';
import { getUserProfileById } from '../../apiService/userService';
import { useParams } from 'react-router-dom';
import WOW from 'wowjs'; // Import WOW.js

function OrdersDetails() {
	const { orderId } = useParams();
  const [hasBgClass, setHasBgClass] = useState(true); 
  const [order, setOrder] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [returnReason, setReturnReason] = useState('');
  const [refundRequest, setRefundRequest] = useState(false);

  useEffect(() => {
    if (hasBgClass) {
      document.body.classList.add('bg');
    } else {
      document.body.classList.remove('bg');
    }
    return () => {
      document.body.classList.remove('bg');
    };
  }, [hasBgClass]);

  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init();
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderDetails(orderId);
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error.message);
      }
    };
    fetchOrder();
  }, [orderId]);
  useEffect(() => {
    if (order?.userId) {
      const fetchUserProfile = async () => {
        try {
          const data = await getUserProfileById(order.userId);
          setUserProfile(data);
        } catch (error) {
          console.error("Lỗi khi lấy user profile:", error);
        }
      };
      fetchUserProfile();
    }
  }, [order?.userId]);
  const cancelOrder = async () => {
    if (!order?.orderId) return;
    try {
      const token = localStorage.getItem("accessToken");
      const confirmCancel = window.confirm("Bạn có chắc muốn huỷ đơn này?");
      if (!confirmCancel) return;
  
      const res = await axios.put(`http://localhost:8086/api/orders/${order.orderId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      alert("Đơn hàng đã được huỷ!");
      window.location.reload();
    } catch (err) {
      console.error("❌ Cancel error:", err);
      alert(err?.response?.data?.error || "Không thể huỷ đơn hàng!");
    }
  };

  const requestReturn = async () => {
    if (!order?.orderId) return;
    const reason = prompt("Nhập lý do trả hàng:");
    if (!reason || reason.trim() === "") {
      alert("Bạn cần nhập lý do để tiếp tục.");
      return;
    }
  
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(`http://localhost:8086/api/orders/${order.orderId}/return`, {
        reason
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      alert("Yêu cầu trả hàng đã được gửi!");
    } catch (err) {
      console.error("❌ Return request error:", err);
      alert(err?.response?.data?.error || "Không thể gửi yêu cầu trả hàng!");
    }
  };
  

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString('en-GB');
  };

  return (
    <>
      <div className="page-wraper">
        <div className="page-content bg-light">
          <div
            className="dz-bnr-inr bg-secondary overlay-black-light"
            style={{ backgroundImage: "url(../../assets/user/images/background/bg1.jpg)" }}
          >
            <div className="container">
              <div className="dz-bnr-inr-entry">
                <h1>Order Details</h1>
                <nav aria-label="breadcrumb" className="breadcrumb-row">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/"> Home</a>
                    </li>
                    <li className="breadcrumb-item">Order Details</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
  {/*Banner End*/}
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
                        <img
  className="rounded-circle"
  src={userProfile?.profilePicture || "https://www.w3schools.com/howto/img_avatar.png"}
  alt="User Avatar"
/>
                        </div>
                        <h5 className="title mb-0">{order?.receiverName || 'Ronald M. Spino'}</h5>
                        <span className="text text-primary">{order?.receiverEmail || 'info@example.com'}</span>
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
          <div className="account-card order-details">
          <div className="order-head">
                      <div className="head-thumb">
                      <img
  className="rounded-circle"
  src={userProfile?.profilePicture || "https://www.w3schools.com/howto/img_avatar.png"}
  alt="User Avatar"
/>
                      </div>
                      <div className="clearfix m-l20">
                      <div className="badge">{order?.orderStatus || 'In Progress'}</div>
                        <h4 className="mb-0">Đơn hàng #{order?.orderId || '17493'}</h4>
                      </div>
                    </div>
                    <div className="row mb-sm-4 mb-2">
                    <div className="col-sm-6">
                        <div className="shiping-tracker-detail">
                          <span>Tên</span>
                          <h6 className="title mb-0">{order?.recipientName || 'Ronald M. Spino'}</h6>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="shiping-tracker-detail">
                          <span>Email</span>
                          <h6 className="title mb-0">{order?.recipientEmail ||'info@example.com'}</h6>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="shiping-tracker-detail">
                          <span>Tên sản phẩm</span>
                          <h6 className="title">{order?.items?.[0]?.productName || 'sản phẩm'}</h6>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="shiping-tracker-detail">
                          <span>
                          Chuyển phát nhanh
                            {/* Courier */}
                          </span>
                          <h6 className="title">{order?.courierName || 'DHL Express'}</h6>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="shiping-tracker-detail">
                          <span>Ngày bắt đầu</span>
                          <h6 className="title">{formatDate(order?.createdAt)}</h6>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="shiping-tracker-detail">
                          <span>Địa chỉ</span>
                          <h6 className="title">{order?.deliveryAddress || 'Address 451 Wall Street UK, London'}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="content-btn m-b15">
            <button
              className="btn btn-outline-danger m-b15 me-2 btnhover20"
              onClick={cancelOrder}
              disabled={order?.orderStatus !== 'pending'}
            >
              Hủy đơn hàng
              {/* Cancel Order */}
            </button>
            <button
              className="btn btn-outline-warning m-b15 btnhover20"
              onClick={() => document.getElementById('return-form').classList.toggle('d-none')}
              disabled={order?.orderStatus !== 'success'}
            >
            Trả lại đơn hàng
            {/* Return Order */}
            </button>
          </div>
          <div id="return-form" className="d-none p-3 border rounded bg-white mb-4">
            <h5 className="mb-3">Yêu cầu trả hàng</h5>
            <textarea
              className="form-control mb-2"
              placeholder="Lý do trả hàng"
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
            />
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="refundRequest"
                checked={refundRequest}
                onChange={() => setRefundRequest(!refundRequest)}
              />
              <label className="form-check-label" htmlFor="refundRequest">
                Yêu cầu hoàn lại tiền
              </label>
            </div>
            <button className="btn btn-primary" onClick={requestReturn}>
              Gửi yêu cầu trả hàng
            </button>
          </div>
            <div className="clearfix">
              <div className="dz-tabs style-3">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active"
                    id="nav-order-history-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-order-history"
                    role="tab"
                    aria-controls="nav-order-history"
                    aria-selected="true"
                  >
                    Lịch sử đơn hàng
                  </button>
                  <button
                    className="nav-link"
                    id="nav-Item-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-Item"
                    role="tab"
                    aria-controls="nav-Item"
                    aria-selected="false"
                  >
                    Chi tiết đơn hàng
                  </button>
                  <button
                    className="nav-link"
                    id="nav-courier-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-courier"
                    role="tab"
                    aria-controls="nav-courier"
                    aria-selected="false"
                  >
                    Chuyển phát nhanh
                  </button>
                  <button
                    className="nav-link"
                    id="nav-receiver-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-receiver"
                    role="tab"
                    aria-controls="nav-receiver"
                    aria-selected="false"
                  >
                    Người nhận
                    {/* Receiver */}
                  </button>
                </div>
              </div>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-order-history"
                  role="tabpanel"
                  aria-labelledby="nav-order-history-tab"
                  tabIndex={0}
                >
                  <div className="widget-timeline style-1">
                    <ul className="timeline">
                      <li>
                        <div className="timeline-badge success" />
                        <div className="timeline-box">
                          <a
                            className="timeline-panel"
                            href="javascript:void(0);"
                          >
                            <h6 className="mb-0">
                            Sản phẩm đã được vận chuyển
                              {/* Product Shiped */}
                            </h6>
                            <span>08/04/2024 5:23pm</span>
                          </a>
                          <p>
                            <strong>Dịch vụ chuyển phát nhanh : </strong>UPS, R. Gosling
                          </p>
                          <p>
                            <strong>Ngày giao hàng dự kiến : </strong>
                            09/04/2024
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-badge primary" />
                        <div className="timeline-box">
                          <a
                            className="timeline-panel"
                            href="javascript:void(0);"
                          >
                            <h6 className="mb-0">
                            Sản phẩm đã được vận chuyển
                              {/* Product Shiped */}
                            </h6>
                            <span>08/04/2024 5:23pm</span>
                          </a>
                          <p>
                            <strong> Số theo dõi: </strong>3409-4216-8759
                          </p>
                          <p>
                            <strong>Kho : </strong>Top Shirt 12b
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-badge" />
                        <div className="timeline-box">
                          <a
                            className="timeline-panel"
                            href="javascript:void(0);"
                          >
                            <h6 className="mb-0">
                            Bao bì sản phẩm
                              {/* Product Packaging */}
                            </h6>
                            <span>09/04/2024 4:34pm</span>
                          </a>
                        </div>
                      </li>
                      <li>
                        <div className="timeline-badge" />
                        <div className="timeline-box">
                          <a
                            className="timeline-panel"
                            href="javascript:void(0);"
                          >
                            <h6 className="mb-0">
                            Đặt hàng
                              {/* Order Palced */}
                            </h6>
                            <span>10/04/2024 2:36pm</span>
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-Item"
                  role="tabpanel"
                  aria-labelledby="nav-Item-tab"
                  tabIndex={0}
                >
                  <h5 className="mb-4">Item Details</h5>
{order?.items?.map((item, index) => (
  <div
    key={index}
    className="d-flex align-items-start mb-4 p-3 border rounded shadow-sm bg-white"
    style={{ gap: '16px' }}
  >
    <div>
    <img
        src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${item.productThumbnail}`}
        alt={item.productTitle}
        className="rounded"
        style={{
          width: '90px',
          height: '90px',
          objectFit: 'cover',
          borderRadius: '12px'
        }}
      />
    </div>
    <div className="flex-grow-1">
      <h6 className="fw-bold mb-2">{item.productTitle}</h6>
      <p className="mb-1">
        <strong>Brand:</strong> {item.brandName || 'Không rõ hãng'}<br />
        <strong>Color:</strong> {item.color}<br />
        <strong>Size:</strong> {item.size} &nbsp; | &nbsp; <strong>Qty:</strong> {item.quantity}
      </p>
      <p className="mb-0">
        <strong>Price:</strong> ${item.unitPrice/item.quantity} <em>(giảm giá {item.percentDiscount}%)</em><br />
        <strong>Original:</strong> <s>${item.productPrice}</s>
      </p>
    </div>
  </div>
))}

<div className="tracking-item-content">
  <span>Tổng tiền</span>
  <h6>
    + $
    {order?.items?.reduce((acc, item) =>
      acc + item.productPrice * item.quantity, 0
    ).toFixed(2)}
  </h6>
</div>

<div className="tracking-item-content border-bottom border-light mb-2">
  <span className="text-success">Tổng tiền giảm giá</span>
  <h6>
    - $
    {order?.items?.reduce((acc, item) =>
      acc + (item.productPrice * (item.percentDiscount / 100)) * item.quantity, 0
    ).toFixed(2)}
  </h6>
</div>

<div className="tracking-item-content">
  <span>Tổng đơn hàng</span>
  <h6>
    $
    {order?.items?.reduce((acc, item) =>
      acc + (item.productPrice * (1 - item.percentDiscount / 100)) * item.quantity, 0
    ).toFixed(2)}
  </h6>
</div>

                </div>
                <div
                  className="tab-pane fade"
                  id="nav-courier"
                  role="tabpanel"
                  aria-labelledby="nav-courier-tab"
                  tabIndex={0}
                >
                  <p>
                    Commyolk Suspendisse et justo. Praesent mattis augue Aliquam
                    ornare hendrerit augue Cras tellus In pulvinar lectus a est
                    Curabitur eget orci Cras laoreet. Lorem ipsum dolor sit
                    amet, consectetuer adipiscing elit. Suspendisse et justo.
                    Praesent mattis commyolk augue aliquam ornare.
                  </p>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-receiver"
                  role="tabpanel"
                  aria-labelledby="nav-receiver-tab"
                  tabIndex={0}
                >
                  <h5 className="text-success mb-4">
                  Cảm ơn bạn. Đơn hàng của bạn đã được nhận.
                   {/*  Thank you Your order has been received */}
                  </h5>
                  <ul className="tracking-receiver">
  <li>ID đơn hàng : <strong>#{order?.orderId}</strong></li>
  <li>Ngày : <strong>{formatDate(order?.createdAt)}</strong></li>
  <li>Tổng : <strong>${order?.total}</strong></li>
  <li>Phương thức thanh toán : <strong>{order?.paymentMethod}</strong></li>
</ul>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</div>


        {/* Footer (đã được xử lý trong App.js) */}
         <ScrollTopButton/>
        <QuickViewModal />
      </div>
    </>
  );
}

export default OrdersDetails;