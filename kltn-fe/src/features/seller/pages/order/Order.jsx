import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { parseISO } from 'date-fns';
import { Chart } from 'chart.js';

const cardStyle = {
  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(88, 28, 135, 0.9))',
  border: '1px solid rgba(0, 255, 255, 0.3)',
  borderRadius: '20px',
  boxShadow: '0 0 30px rgba(0, 255, 255, 0.2), 0 0 50px rgba(138, 43, 226, 0.2)',
  backdropFilter: 'blur(15px)',
  padding: '2rem',
  maxWidth: '42rem',
  width: '100%',
  color: '#e0f7fa',
  fontFamily: "'Orbitron', sans-serif", // Font công nghệ
};
const neonTextStyle = {
  textShadow: `
    0 0 8px #0ff,
    0 0 16px #0ff,
    0 0 32px #0ff,
    0 0 64px #00f7ff,
    0 0 128px #00f7ff
  `,
  letterSpacing: '2px',
  fontWeight: '700',
  color: '#00f7ff',
};
const inputStyle = {
  border: '1px solid rgba(0, 255, 255, 0.4)',
  padding: '0.6rem 0.8rem',
  borderRadius: '0.5rem',
  backgroundColor: 'rgba(17, 25, 40, 0.85)',
  color: '#e0f2f1',
  outline: 'none',
  transition: 'all 0.3s ease-in-out',
  fontSize: '1rem',
  boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.15)',
};
const buttonStyle = (bgColor) => ({
  background: `linear-gradient(90deg, ${bgColor}, ${bgColor === '#3b82f6' ? '#1e3a8a' : '#065f46'})`,
  color: '#ffffff',
  fontWeight: '700',
  padding: '0.7rem 1.4rem',
  borderRadius: '0.6rem',
  border: '1px solid rgba(255,255,255,0.15)',
  boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
  transition: 'all 0.25s ease-in-out',
  transform: 'scale(1)',
  cursor: 'pointer',
  ':hover': {
    background: `linear-gradient(90deg, ${bgColor === '#3b82f6' ? '#2563eb' : '#059669'
      }, ${bgColor === '#3b82f6' ? '#1e40af' : '#047857'})`,
    transform: 'scale(1.07)',
    boxShadow: '0 0 25px rgba(0, 255, 255, 0.6)',
  },
});
const chartContainerStyle = {
  position: 'relative',
  height: '320px',
  width: '100%',
  background: 'rgba(15, 23, 42, 0.7)',
  border: '1px solid rgba(0, 255, 255, 0.3)',
  borderRadius: '15px',
  boxShadow: '0 0 25px rgba(0, 255, 255, 0.15)',
  padding: '1rem',
};
function Order() {
  const [dashboardSeller, setDashboardSeller] = useState([]);
  const statusColors = {
    pending: "badge-warning", // vàng
    processing: "badge-info", // xanh dương nhạt
    shipped: "badge-primary", // xanh dương
    completed: "badge-success", // xanh lá
    cancelled: "badge-danger", // đỏ
    cancelledSeller: "badge-danger"
  };
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [totalPage, settotalPage] = useState(1);// quản lý trạng thái modal
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [revenue, setRevenue] = useState(0);
  const [chart, setChart] = useState(null);
  const chartRef = useRef(null); // Sử dụng useRef để quản lý chart
  const [isDataFetched, setIsDataFetched] = useState(false); // Trạng thái để kiểm soát hiển thị
  const statusOptions = ['completed', 'pending', 'cancelled', 'processing', 'shipped', "cancelledSeller"];
  const [selectedStatuses, setSelectedStatuses] = useState([]); // Mặc định chọn completed
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const maxPagesToShow = 10;
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [skipEffect, setSkipEffect] = useState(false);
  const API_URL = 'http://localhost:8089/api/seller';
  // ✅ Đặt mapping deliveryOptions TRƯỚC
  const deliveryOptions = {
    pending: { default: "pending", options: ["packed"] },
    processing: { default: "packed", options: ["shipped"] },
    shipped: { default: "shipped", options: [] },
    completed: { default: "delivered", options: [] },
    cancelled: { default: "failed", options: [] },
    cancelledSeller: { default: "failed", options: [] },
  };
  const [cancelOrderId, setCancelOrderId] = useState(null);
  // ✅ Chỉ set deliveryConfig khi đã chọn order
  const orderStatus = selectedOrder?.status || "";
  const deliveryConfig = deliveryOptions[orderStatus] || { default: "", options: [] };
  const getPaymentInfo = (method) => {
    switch (method?.toLowerCase()) {
      case "paypal":
        return { icon: "fab fa-cc-paypal", text: "PayPal", color: "text-primary" };
      case "cod":
        return { icon: "fas fa-money-bill-wave", text: "COD", color: "text-success" };
      case "bank":
      case "ngân hàng":
        return { icon: "fas fa-university", text: "Ngân hàng", color: "text-info" };
      default:
        return { icon: "fas fa-credit-card", text: "Khác", color: "text-secondary" };
    }
  };
  // Toggle chọn/bỏ chọn trạng thái
  const toggleStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };
  // Fetch Dashboard
  const fetchDashboard = async () => {
    setIsLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setMessage('❌ Vui lòng đăng nhập để xem thông tin shop.');
      setIsLoading(false);
      return;
    }
    // Validate ngày nếu cả 2 có giá trị
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        setMessage('❌ Vui lòng chọn ngày hợp lệ (startDate phải nhỏ hơn endDate)!');
        setIsLoading(false);
        setIsDataFetched(false);
        return;
      }
    }
    try {
      const params = {
        page: pageNumber,
        size: pageSize,
        ...(startDate && endDate ? { startDate, endDate } : {}),
        ...(selectedStatuses.length > 0 ? { status: selectedStatuses } : {}),
      };
      console.log('Fetching dashboard with params:', params);
      const response = await axios.get(`${API_URL}/getDashboard`, {
        params,
        paramsSerializer: (params) =>
          new URLSearchParams(
            Object.entries(params).flatMap(([key, value]) =>
              Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
            )
          ).toString(),
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setRevenue(response.data.totalRevenue || 0);
      setDashboardSeller(response.data);
      setMessage('✅ Đã tải thông tin dashboard thành công.');
      setIsDataFetched(true);
    } catch (error) {
      console.error('Error fetching dashboard:', error.response ? error.response.data : error.message);
      setMessage('❌ Lỗi khi tải thông tin dashboard: ' + (error.response?.data || error.message));
      setRevenue(0);
      setDashboardSeller(null);
      setIsDataFetched(true);
    } finally {
      setIsLoading(false);
    }
  };
  // Cập nhật biểu đồ
  const updateChart = () => {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) {
      console.error('Canvas element not found!');
      return;
    }
    const ctx = canvas.getContext('2d');
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Doanh thu'],
        datasets: [
          {
            label: 'Doanh thu ($)',
            data: [revenue],
            backgroundColor: 'rgba(0, 255, 204, 0.8)',
            borderColor: 'rgba(0, 255, 255, 1)',
            borderWidth: 2,
            barThickness: 60,
            shadowColor: 'rgba(0, 255, 255, 0.8)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1200, easing: 'easeOutQuart' },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { callback: (value) => '$' + value.toFixed(2), color: '#00fff2', font: { size: 14, family: 'Orbitron' } },
            grid: { color: 'rgba(0, 255, 255, 0.15)', lineWidth: 1 },
          },
          x: {
            grid: { display: false },
            ticks: { color: '#a855f7', font: { size: 14, family: 'Orbitron' } },
          },
        },
        plugins: {
          legend: { labels: { color: '#00f7ff', font: { family: 'Orbitron', size: 14 } } },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: '#00fff2',
            bodyColor: '#f0fdfa',
            borderColor: '#00fff2',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: false,
          },
        },
      },
    });
  };
  // Auto update chart khi fetch xong
  useEffect(() => {
    if (isDataFetched) updateChart();
  }, [isDataFetched, revenue]);
  // Auto fetch khi load trang hoặc đổi page/size/status/date
  useEffect(() => {
    fetchDashboard();
  }, [pageNumber, pageSize, selectedStatuses, startDate, endDate]);
  useEffect(() => {
    if (skipEffect) {
      setSkipEffect(false);
      return;
    }
    const handleOrderAction = async () => {
      // ✅ Xử lý update status
      if (
        deliveryStatus &&
        selectedOrder &&
        deliveryStatus !== selectedOrder.deliveryStatus
      ) {
        const confirmChange = window.confirm(
          `Bạn có muốn thay đổi trạng thái giao hàng thành "${deliveryStatus}" không?`
        );
        if (confirmChange) {
          await orderMethodSeller(selectedOrder.orderId, 'updateStatusBySeller', deliveryStatus);
              handleCloseDetailModal();

        } else {
          setSkipEffect(true);
          setDeliveryStatus(selectedOrder.deliveryStatus || "");
          
        }
      }
      // ✅ Xử lý cancel order
      if (cancelOrderId) {
        const confirmCancel = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?");
        if (confirmCancel) {
          await orderMethodSeller(cancelOrderId, 'cancelBySeller');
              handleCloseDetailModal();

        }
        setCancelOrderId(null); // reset
      }
    };
    handleOrderAction();
    fetchDashboard();
  }, [deliveryStatus, cancelOrderId]); // ✅ Không lồng effect
  // Hàm gọi API backend
  const orderMethodSeller = async (orderId, method, deliveryStatus) => {
    const params = { orderId, method };
    if (deliveryStatus)
      params.status = deliveryStatus; // Thêm nếu có
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(`${API_URL}/updateMethodOrderBySeller`, null, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      })
      alert("✅ Cập nhật thành công!");
      // ✅ Cập nhật selectedOrder để hiển thị ngay trong modal
      if (selectedOrder && deliveryStatus) {
        setSelectedOrder((prev) => ({
          ...prev,
          deliveryStatus: deliveryStatus,
        }));
      }
      // ✅ Fetch lại dashboard để cập nhật list (nếu cần)
      await fetchDashboard();
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật trạng thái:", error);
      alert("❌ Cập nhật thất bại!");
    }
  };
  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setDeliveryStatus(order.deliveryStatus || ""); // ✅ Set trạng thái hiện tại khi mở modal
    setShowDetailModal(true);
  };
  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedOrder(null);
  };
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPage) {
      setPageNumber(pageNumber);
    }
  };
  const getPageRange = () => {
    if (!totalPage || totalPage <= 0) return []; // Không có trang nào
    const safeMaxPages = maxPagesToShow || 5; // mặc định nếu maxPagesToShow chưa được set
    const startPage = Math.floor(pageNumber / safeMaxPages) * safeMaxPages;
    const endPage = Math.min(startPage + safeMaxPages, totalPage);
    // ✅ Đảm bảo không bị âm
    if (endPage <= startPage) return [0];
    return Array.from({ length: endPage - startPage }, (_, i) => startPage + i);
  };
  return (
    <>
      <div className="main-content">
        {/* <!-- Page Title Start --> */}
        <div className="row">
          <div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="page-title-wrapper">
              <div className="page-title-box ad-title-box-use">
                {/* Orders */}
                <h4 className="page-title">Quản lí đơn hàng</h4>
              </div>
              <div className="ad-breadcrumb">
                <ul>
                  <li>
                    <div className="ad-user-btn">
                      <input className="form-control" type="text" placeholder="Search Here..." id="text-input" />
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966">
                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
                                    s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
                                    c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
                                    s-17-7.626-17-17S14.61,6,23.984,6z"></path>
                      </svg>
                    </div>
                  </li>
                  <li>
                    <div className="add-group" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {/* Add New Order */}
                      <a className="ad-btn">Thêm đơn hàng mới</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            maxWidth: '900px',
            margin: '30px auto',
            padding: '30px',
            background: 'linear-gradient(135deg, #f9fafb, #eef2f3)',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
            color: '#1f2937',
          }}
        >
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '25px',
              textAlign: 'center',
              color: '#1e40af',
              letterSpacing: '1px',
            }}
          >
            Thống kê Doanh thu
          </h2>
          <div
            style={{
              marginBottom: '25px',
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                border: '2px solid #d1d5db',
                padding: '10px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                background: '#fff',
                cursor: 'pointer',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                border: '2px solid #d1d5db',
                padding: '10px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                background: '#fff',
                cursor: 'pointer',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#3b82f6')}
              onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
            />
            {/* <button
                onClick={fetchDashboard}
                style={{
                  background: 'linear-gradient(90deg, #3b82f6, #2563eb)',
                  color: 'white',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) =>
                  (e.target.style.background = 'linear-gradient(90deg, #2563eb, #1d4ed8)')
                }
                onMouseOut={(e) =>
                  (e.target.style.background = 'linear-gradient(90deg, #3b82f6, #2563eb)')
                }
              >
                Hiển thị thống kê doanh thu
              </button> */}
            {/* <button
      onClick={() => fetchRevenue()}
      style={{
        background: 'linear-gradient(90deg, #10b981, #059669)',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '10px',
        fontSize: '1rem',
        fontWeight: '500',
        cursor: 'pointer',
        border: 'none',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
      }}
      onMouseOver={(e) =>
        (e.target.style.background = 'linear-gradient(90deg, #059669, #047857)')
      }
      onMouseOut={(e) =>
        (e.target.style.background = 'linear-gradient(90deg, #10b981, #059669)')
      }
    >
      Cập nhật dữ liệu
    </button> */}
          </div>
          {isDataFetched && (
            <>
              <div
                style={{
                  marginBottom: '25px',
                  textAlign: 'center',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '12px',
                  padding: '15px',
                }}
              >
                <p
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: '#065f46',
                    margin: 0,
                  }}
                >
                  Tổng doanh thu: <span style={{ color: '#059669' }}>${revenue.toFixed(2)}</span>
                </p>
              </div>
              <div
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  background: '#ffffff',
                  borderRadius: '15px',
                  boxShadow: '0 6px 15px rgba(0,0,0,0.05)',
                }}
              >
                <canvas id="revenueChart" width="400" height="200"></canvas>
              </div>
            </>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => toggleStatus(status)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: selectedStatuses.includes(status)
                  ? '2px solid #00ffcc'
                  : '2px solid #ccc',
                background: selectedStatuses.includes(status)
                  ? 'linear-gradient(90deg, #00ffcc, #0099ff)'
                  : '#f3f4f6',
                color: selectedStatuses.includes(status) ? '#fff' : '#333',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease',
              }}
            >
              {status}
            </button>
          ))}
        </div>
        {/* <!-- Table Start --> */}
        <div className="row">
          {/* <!-- Styled Table Card--> */}
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card chart-card">
              <div className="card-header">
                <h4>Quản Lý Đơn Hàng</h4>
              </div>
              <div className="card-body pb-4">
                <div className="chart-holder">
                  <div className="table-responsive">
                    <table className="table table-styled mb-0">
                      <thead>
                        <tr>
                          {/* <th>
                                  <div className="checkbox">
                                    <input id="checkbox1" type="checkbox" />
                                    <label htmlFor="checkbox1" />
                                  </div>
                                </th> */}
                          {/* Order ID */}
                          <th>ID đơn hàng</th>
                          {/* Billing Name */}
                          <th>Tên thanh toán</th>
                          {/* Date */}
                          <th>Ngày</th>
                          {/* Total */}
                          <th>Tổng cộng</th>
                          {/* Payment Status */}
                          <th>Trạng thái giao hàng</th>
                          {/* Payment Method */}
                          <th>Phương thức thanh toán</th>
                          {/* View Details */}
                          <th>Xem chi tiết</th>
                          {/* Action */}
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardSeller?.recentOrders?.map((order, index) => (
                          <tr>
                            {/* <td>
                                    <div className="checkbox">
                                      <input id="checkbox2" type="checkbox" />
                                      <label htmlFor="checkbox2" />
                                    </div>
                                  </td> */}
                            <td>#{order.orderId}</td>
                            <td>
                              <span className="img-thumb ">
                                <img src="../../assets/admin/images/table/1.jpg" alt=" " />
                                <span className="ml-2 ">{order.recipientName}</span>
                              </span>
                            </td>
                            <td>{order.createdAt}</td>
                            <td>${order.totalPrice}</td>
                            <td>
                              <label
                                className={`mb-0 badge ${statusColors[order.status] || "badge-secondary"}`}
                              >
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </label>
                            </td>
                            <td>
                              <span className="img-thumb">
                                <i className={`${getPaymentInfo(order.paymentMethod).icon} ${getPaymentInfo(order.paymentMethod).color}`} />
                                <span className="ml-2">{getPaymentInfo(order.paymentMethod).text}</span>
                              </span>
                            </td>
                            <td>
                              <button
                                className="mb-0 badge badge-primary"
                                onClick={() => handleViewDetail(order)} // Gọi hàm khi click
                              >
                                View Detail
                              </button>
                            </td>
                          </tr>
                        ))}
                        {/* <tr>
                                <td>
                                  <div className="checkbox">
                                    <input id="checkbox3" type="checkbox" />
                                    <label htmlFor="checkbox3" />
                                  </div>
                                </td>
                                <td>#MK4433</td>
                                <td>
                                  <span className="img-thumb ">
                                    <img src="../../assets/admin/images/table/4.jpg" alt=" " />
                                    <span className="ml-2 ">Mark Doe</span>
                                  </span>
                                </td>
                                <td>14/07/2022</td>
                                <td>$700</td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-success"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    Success
                                  </label>
                                </td>
                                <td>
                                  <span className="img-thumb">
                                    <i className="fab fa-cc-visa" />
                                    <span className="ml-2">Visa</span>
                                  </span>
                                </td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    View Detail
                                  </label>
                                </td>
                                <td className="relative">
                                  <a
                                    className="action-btn "
                                    href="javascript:void(0); "
                                  >
                                    <svg
                                      className="default-size "
                                      viewBox="0 0 341.333 341.333 "
                                    >
                                      <g>
                                        <g>
                                          <g>
                                            <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                            <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                            <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </a>
                                  <div className="action-option">
                                    <ul>
                                      <li>
                                        <a href="javascript:void(0);">
                                          <i className="far fa-edit mr-2 " />
                                          Edit
                                        </a>
                                      </li>
                                      <li>
                                        <a href="javascript:void(0);">
                                          <i className="far fa-trash-alt mr-2 " />
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="checkbox">
                                    <input id="checkbox4" type="checkbox" />
                                    <label htmlFor="checkbox4" />
                                  </div>
                                </td>
                                <td>#MD4578</td>
                                <td>
                                  <span className="img-thumb">
                                    <img src="../../assets/admin/images/table/7.jpg" alt=" " />
                                    <span className="ml-2 ">Mark Smith</span>
                                  </span>
                                </td>
                                <td>28/08/2022</td>
                                <td>$800</td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-danger"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    Cancel
                                  </label>
                                </td>
                                <td>
                                  <span className="img-thumb">
                                    <i className="fas fa-credit-card" />
                                    <span className="ml-2">Credit Card</span>
                                  </span>
                                </td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    View Detail
                                  </label>
                                </td>
                                <td className="relative">
                                  <a
                                    className="action-btn "
                                    href="javascript:void(0); "
                                  >
                                    <svg
                                      className="default-size "
                                      viewBox="0 0 341.333 341.333 "
                                    >
                                      <g>
                                        <g>
                                          <g>
                                            <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                            <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                            <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </a>
                                  <div className="action-option ">
                                    <ul>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-edit mr-2 " />
                                          Edit
                                        </a>
                                      </li>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-trash-alt mr-2 " />
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="checkbox">
                                    <input id="checkbox5" type="checkbox" />
                                    <label htmlFor="checkbox5" />
                                  </div>
                                </td>
                                <td>#DD1048</td>
                                <td>
                                  <span className="img-thumb ">
                                    <img src="../../assets/admin/images/table/1.jpg" alt=" " />
                                    <span className="ml-2 ">Mike Wood</span>
                                  </span>
                                </td>
                                <td>13/04/2022</td>
                                <td>$880</td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    Pending
                                  </label>
                                </td>
                                <td>
                                  <span className="img-thumb">
                                    <i className="fab fa-cc-mastercard" />
                                    <span className="ml-2">Mastercard</span>
                                  </span>
                                </td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    View Detail
                                  </label>
                                </td>
                                <td className="relative">
                                  <a
                                    className="action-btn "
                                    href="javascript:void(0); "
                                  >
                                    <svg
                                      className="default-size "
                                      viewBox="0 0 341.333 341.333 "
                                    >
                                      <g>
                                        <g>
                                          <g>
                                            <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                            <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                            <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </a>
                                  <div className="action-option ">
                                    <ul>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-edit mr-2 " />
                                          Edit
                                        </a>
                                      </li>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-trash-alt mr-2 " />
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="checkbox">
                                    <input id="checkbox6" type="checkbox" />
                                    <label htmlFor="checkbox6" />
                                  </div>
                                </td>
                                <td>#JH2033</td>
                                <td>
                                  <span className="img-thumb ">
                                    <img src="../../assets/admin/images/table/3.jpg" alt=" " />
                                    <span className="ml-2 ">Emily Arnold</span>
                                  </span>
                                </td>
                                <td>22/06/2022</td>
                                <td>$600</td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-success"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    Success
                                  </label>
                                </td>
                                <td>
                                  <span className="img-thumb">
                                    <i className="fab fa-cc-paypal" />
                                    <span className="ml-2">Paypal</span>
                                  </span>
                                </td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    View Detail
                                  </label>
                                </td>
                                <td className="relative">
                                  <a
                                    className="action-btn "
                                    href="javascript:void(0); "
                                  >
                                    <svg
                                      className="default-size "
                                      viewBox="0 0 341.333 341.333 "
                                    >
                                      <g>
                                        <g>
                                          <g>
                                            <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                            <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                            <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </a>
                                  <div className="action-option ">
                                    <ul>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-edit mr-2 " />
                                          Edit
                                        </a>
                                      </li>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-trash-alt mr-2 " />
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="checkbox">
                                    <input id="checkbox7" type="checkbox" />
                                    <label htmlFor="checkbox7" />
                                  </div>
                                </td>
                                <td>#MK4433</td>
                                <td>
                                  <span className="img-thumb ">
                                    <img src="../../assets/admin/images/table/1.jpg" alt=" " />
                                    <span className="ml-2 ">John Doe</span>
                                  </span>
                                </td>
                                <td>14/07/2022</td>
                                <td>$700</td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-danger"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    Cancel
                                  </label>
                                </td>
                                <td>
                                  <span className="img-thumb">
                                    <i className="fab fa-cc-visa" />
                                    <span className="ml-2">Visa</span>
                                  </span>
                                </td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    View Detail
                                  </label>
                                </td>
                                <td className="relative">
                                  <a
                                    className="action-btn "
                                    href="javascript:void(0); "
                                  >
                                    <svg
                                      className="default-size "
                                      viewBox="0 0 341.333 341.333 "
                                    >
                                      <g>
                                        <g>
                                          <g>
                                            <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                            <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                            <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </a>
                                  <div className="action-option ">
                                    <ul>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-edit mr-2 " />
                                          Edit
                                        </a>
                                      </li>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-trash-alt mr-2 " />
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="checkbox">
                                    <input id="checkbox8" type="checkbox" />
                                    <label htmlFor="checkbox8" />
                                  </div>
                                </td>
                                <td>#MD4578</td>
                                <td>
                                  <span className="img-thumb ">
                                    <img src="../../assets/admin/images/table/7.jpg" alt=" " />
                                    <span className="ml-2 ">Mark Smith</span>
                                  </span>
                                </td>
                                <td>28/08/2022</td>
                                <td>$800</td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-success"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    Success
                                  </label>
                                </td>
                                <td>
                                  <span className="img-thumb">
                                    <i className="fas fa-credit-card" />
                                    <span className="ml-2">Credit Card</span>
                                  </span>
                                </td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    View Detail
                                  </label>
                                </td>
                                <td className="relative">
                                  <a
                                    className="action-btn "
                                    href="javascript:void(0); "
                                  >
                                    <svg
                                      className="default-size "
                                      viewBox="0 0 341.333 341.333 "
                                    >
                                      <g>
                                        <g>
                                          <g>
                                            <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                            <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                            <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </a>
                                  <div className="action-option ">
                                    <ul>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-edit mr-2 " />
                                          Edit
                                        </a>
                                      </li>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-trash-alt mr-2 " />
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="checkbox">
                                    <input id="checkbox9" type="checkbox" />
                                    <label htmlFor="checkbox9" />
                                  </div>
                                </td>
                                <td>#DD1048</td>
                                <td>
                                  <span className="img-thumb ">
                                    <img src="../../assets/admin/images/table/4.jpg" alt=" " />
                                    <span className="ml-2 ">Mike Wood</span>
                                  </span>
                                </td>
                                <td>13/04/2022</td>
                                <td>$880</td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    Pending
                                  </label>
                                </td>
                                <td>
                                  <span className="img-thumb">
                                    <i className="fab fa-cc-mastercard" />
                                    <span className="ml-2">Mastercard</span>
                                  </span>
                                </td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    View Detail
                                  </label>
                                </td>
                                <td className="relative">
                                  <a
                                    className="action-btn "
                                    href="javascript:void(0); "
                                  >
                                    <svg
                                      className="default-size "
                                      viewBox="0 0 341.333 341.333 "
                                    >
                                      <g>
                                        <g>
                                          <g>
                                            <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                            <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                            <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </a>
                                  <div className="action-option ">
                                    <ul>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-edit mr-2 " />
                                          Edit
                                        </a>
                                      </li>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-trash-alt mr-2 " />
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-6">
                  <nav aria-label="Product Pagination">
                    <ul className="pagination style-1">
                      {/* Nút Previous */}
                      <li className="page-item">
                        <a
                          className={`page-link ${pageNumber === 0 ? 'disabled' : ''}`}
                          onClick={() => handlePageChange(pageNumber - 1)}
                        >
                          <i className="fas fa-chevron-left mr-1"></i>
                        </a>
                      </li>
                      {/* Các số trang trong phạm vi */}
                      {getPageRange().map((page) => (
                        <li className="page-item" key={page}>
                          <a
                            className={`page-link ${page === pageNumber ? 'active' : ''}`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page + 1}
                          </a>
                        </li>
                      ))}
                      {/* Nút Next */}
                      <li className="page-item">
                        <a
                          className={`page-link next ${pageNumber >= totalPage - 1 ? 'disabled' : ''}`}
                          onClick={() => handlePageChange(pageNumber + 1)}
                        >
                          <i className="fas fa-chevron-right ml-1"></i>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showDetailModal && selectedOrder && (
          <div
            className="modal-backdrop"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1050,
            }}
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content" style={{ borderRadius: "12px" }}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    🛒 Chi tiết Order #{selectedOrder.orderId}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={handleCloseDetailModal}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body" style={{ maxHeight: "75vh", overflowY: "auto" }}>
                  {/* Grid layout */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div className="card p-3 shadow-sm">
                      <h6 className="mb-3">📦 Thông tin đơn hàng</h6>
                      <p><b>Ngày tạo:</b> {selectedOrder.createdAt}</p>
                      <p><b>Tổng tiền:</b> ${selectedOrder.totalPrice}</p>
                      <p><b>Order Status:</b>
                        <span className={`badge ${statusColors[selectedOrder.status]}`}>
                          {selectedOrder.status}
                        </span>
                      </p>
                      <p><b>Số sản phẩm:</b> {selectedOrder.itemCount}</p>
                      {/* Select trạng thái delivery */}
                      <div className="mt-3">
                        <label><b>Delivery Status:</b></label>
                        <select
                          className="form-select mt-1"
                          value={deliveryStatus} // ✅ Bind với state deliveryStatus
                          disabled={deliveryConfig.options.length === 0}
                          onChange={(e) => setDeliveryStatus(e.target.value)} // Trigger useEffect
                        >
                          <option value={deliveryConfig.default}>
                            {deliveryConfig.default}
                          </option>
                          {deliveryConfig.options.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* 🛍 Danh sách sản phẩm */}
                    <div className="card p-3 shadow-sm mt-3">
                      <h6 className="mb-3">🛍 Danh sách sản phẩm</h6>
                      {selectedOrder?.items && selectedOrder.items.length > 0 ? (
                        selectedOrder.items.map((item, idx) => (
                          <div key={idx} className="border rounded p-3 mb-2">
                            <p><b>ASIN:</b> {item.asin}</p>
                            <p><b>Tên sản phẩm:</b> {item.titleProduct}</p>
                            <p><b>Màu:</b> {item.color || <span className="text-muted">-</span>}</p>
                            <p><b>Size:</b> {item.size || <span className="text-muted">-</span>}</p>
                            <p><b>Số lượng:</b> {item.quantity}</p>
                            <p>
                              <b>Đơn giá:</b>
                              <span className="text-success fw-bold">
                                ${Number(item.unitPrice).toLocaleString()}
                              </span>
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted text-center my-2">Không có sản phẩm trong đơn hàng.</p>
                      )}
                    </div>
                    {/* 2️⃣ Recipient Info */}
                    <div className="card p-3 shadow-sm">
                      <h6 className="mb-3">👤 Người nhận</h6>
                      <p><b>Tên:</b> {selectedOrder.recipientName}</p>
                      <p><b>Email:</b> {selectedOrder.recipientEmail}</p>
                      <p><b>SĐT:</b> {selectedOrder.recipientPhone}</p>
                      <p><b>Địa chỉ:</b> {selectedOrder.deliveryAddress}</p>
                      <p><b>Chi tiết:</b> {selectedOrder.addressDetails}</p>
                    </div>
                    {/* 3️⃣ Delivery Info */}
                    <div className="card p-3 shadow-sm">
                      <h6 className="mb-3">🚚 Giao hàng</h6>
                      <p><b>Trạng thái:</b> {selectedOrder.deliveryStatus || "Chưa có"}</p>
                      <p><b>Mã tracking:</b> {selectedOrder.trackingNumber || "Chưa có"}</p>
                      <p><b>Phí ship:</b> ${selectedOrder.shippingFee || 0}</p>
                      <p><b>Ngày dự kiến:</b> {selectedOrder.estimatedDeliveryDate || "Chưa có"}</p>
                    </div>
                    {/* 4️⃣ Shipping Method */}
                    <div className="card p-3 shadow-sm">
                      <h6 className="mb-3">🚀 Phương thức vận chuyển</h6>
                      <p><b>Tên:</b> {selectedOrder.shippingMethodName || "Chưa chọn"}</p>
                      <p><b>Mô tả:</b> {selectedOrder.shippingDescription || "N/A"}</p>
                      <p><b>Thời gian dự kiến:</b> {selectedOrder.shippingEstimatedDays || 0} ngày</p>
                    </div>
                    {/* 5️⃣ Payment Info */}
                    <div className="card p-3 shadow-sm" >
                      <h6 className="mb-3">💳 Thanh toán</h6>
                      <p><b>Phương thức:</b> {selectedOrder.paymentMethod}</p>
                      <p><b>Trạng thái:</b>
                        <span className="badge badge-success">{selectedOrder.statusPayment}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
{['pending', 'processing'].includes(
  selectedOrder?.status?.trim().toLowerCase()
) && (
  <button
    type="button"
    className="btn btn-secondary"
    onClick={() => {
      setCancelOrderId(selectedOrder.orderId); 
      handleCloseDetailModal();
    }}
  >
    Hủy Đơn Hàng
  </button>
)}

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseDetailModal}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="ad-footer-btm">
          <p>Copyright 2022 © SplashDash All Rights Reserved.</p>
        </div>
      </div>
    </>
  )
}
export default Order;