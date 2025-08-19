import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js';
import { parseISO, format } from 'date-fns';

// EN -> VI (order/master status)
const toVNOrderStatus = (s = "") => {
  const v = s.toLowerCase();
  if (v === "pending") return "Chờ xử lý";
  if (v === "processing") return "Đang xử lý";
  if (v === "shipped") return "Đang vận chuyển";
  if (v === "completed") return "Hoàn tất";
  if (v === "cancelled" || v === "canceled") return "Đã hủy";
  if (v === "cancelledseller") return "Shop hủy";
  if (v === "cancelledbyadmin") return "Admin hủy";
  return "Không rõ";
};

// Delivery status
const toVNDeliveryStatus = (s = "") => {
  const v = s.toLowerCase();
  if (v === "pending") return "Chờ lấy hàng";
  if (v === "packed") return "Đã đóng gói";
  if (v === "shipped") return "Đang vận chuyển";
  if (v === "delivered") return "Đã giao";
  if (v === "failed") return "Giao thất bại";
  if (v === "cancelledbyadmin") return "Admin hủy";
  return s || "—";
};

// Payment status
const toVNPaymentStatus = (s = "") => {
  const v = (s || "").toLowerCase();
  if (v === "paid") return "Đã thanh toán";
  if (v === "unpaid") return "Chưa thanh toán";
  if (v === "refunded") return "Đã hoàn tiền";
  if (v === "failed") return "Thanh toán thất bại";
  if (v === "pending") return "Chờ thanh toán";
  return s || "—";
};

// Badge cho order/master status
const orderBadge = (s = "") => {
  const v = s.toLowerCase();
  return (
    {
      pending: "badge-warning",
      processing: "badge-info",
      shipped: "badge-primary",
      completed: "badge-success",
      cancelled: "badge-danger",
      canceled: "badge-danger",
      cancelledseller: "badge-danger",
      cancelledbyadmin: "badge-danger",
    }[v] || "badge-secondary"
  );
};

// Badge cho payment status
const paymentBadge = (s = "") => {
  const v = (s || "").toLowerCase();
  if (v === "paid") return "badge-success";
  if (v === "refunded") return "badge-info";
  if (v === "failed") return "badge-danger";
  if (v === "pending" || v === "unpaid") return "badge-warning";
  return "badge-secondary";
};

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
  fontFamily: "'Orbitron', sans-serif",
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
    pending: "badge-warning",
    processing: "badge-info",
    shipped: "badge-primary",
    completed: "badge-success",
    cancelled: "badge-danger",
    cancelledSeller: "badge-danger",
  };
  const [selectedMasterOrder, setSelectedMasterOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [revenue, setRevenue] = useState(0);
  const [chart, setChart] = useState(null);
  const chartRef = useRef(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const statusOptions = ['completed', 'pending', 'cancelled', 'processing', 'shipped', 'cancelledSeller'];
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState({});
  const maxPagesToShow = 10;
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [skipEffect, setSkipEffect] = useState(false);
  const API_URL = 'http://localhost:8765/api/admin/orders';

const deliveryOptions = {
  pending: { default: 'pending', options: ['packed'] },
  processing: { default: 'packed', options: ['shipped'] },
  shipped: { default: 'shipped', options: ['delivered', 'cancelledbyAdmin'] },
  completed: { default: 'delivered', options: [] },
  cancelled: { default: 'failed', options: [] },
  cancelledbyAdmin: { default: 'failed', options: [] },
};
  const [cancelOrderId, setCancelOrderId] = useState(null);

  const getPaymentInfo = (method) => {
    switch (method?.toLowerCase()) {
      case 'paypal':
        return { icon: 'fab fa-cc-paypal', text: 'PayPal', color: 'text-primary' };
      case 'cod':
        return { icon: 'fas fa-money-bill-wave', text: 'COD', color: 'text-success' };
      case 'bank':
      case 'ngân hàng':
        return { icon: 'fas fa-university', text: 'Ngân hàng', color: 'text-info' };
      default:
        return { icon: 'fas fa-credit-card', text: 'Khác', color: 'text-secondary' };
    }
  };

  const toggleStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const fetchDashboard = async () => {
    setIsLoading(true);
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setMessage('❌ Vui lòng đăng nhập để xem thông tin shop.');
      setIsLoading(false);
      return;
    }

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
      const response = await axios.get("http://localhost:8765/api/admin/orders/dashboardAdmin", {
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
      setTotalPage(response.data.totalPages || 1);
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

  useEffect(() => {
    if (isDataFetched) updateChart();
  }, [isDataFetched, revenue]);

  useEffect(() => {
    fetchDashboard();
  }, [pageNumber, pageSize, selectedStatuses, startDate, endDate]);

  useEffect(() => {
    if (skipEffect) {
      setSkipEffect(false);
      return;
    }
    const handleOrderAction = async () => {
      if (deliveryStatus && selectedMasterOrder && selectedMasterOrder.orders) {
        const selectedOrder = selectedMasterOrder.orders.find(order => order.orderId === cancelOrderId);
        if (selectedOrder && deliveryStatus[cancelOrderId] !== selectedOrder.deliveryStatus) {
          const confirmChange = window.confirm(
            `Bạn có muốn thay đổi trạng thái giao hàng thành "${deliveryStatus[cancelOrderId]}" không?`
          );
          if (confirmChange) {
            await orderMethodAdmin(selectedOrder.orderId, 'updateStatusByAdmin', deliveryStatus[cancelOrderId]);
            handleCloseDetailModal();
          } else {
            setSkipEffect(true);
            setDeliveryStatus(prev => ({ ...prev, [selectedOrder.orderId]: selectedOrder.deliveryStatus || "" }));
          }
        }
      }
      // if (cancelOrderId) {
      //   const confirmCancel = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?");
      //   if (confirmCancel) {
      //     await orderMethodSeller(cancelOrderId, 'cancelBySeller');
      //     handleCloseDetailModal();
      //   }
      //   setCancelOrderId(null);
      // }
    };
    handleOrderAction();
  }, [deliveryStatus, cancelOrderId]);

  const orderMethodAdmin = async (orderId, method, status) => {
    const params = { orderId, method };
    if (status) params.status = status;
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(`${API_URL}/updateMethodOrderByAdmin`, null, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Cập nhật thành công!");
      if (selectedMasterOrder && status) {
        setSelectedMasterOrder((prev) => ({
          ...prev,
          orders: prev.orders.map(order =>
            order.orderId === orderId ? { ...order, deliveryStatus: status } : order
          ),
        }));
      }
      await fetchDashboard();
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật trạng thái:", error);
      alert("❌ Cập nhật thất bại!");
    }
  };

  const handleViewDetail = (masterOrder) => {
    setSelectedMasterOrder(masterOrder);
    const initialDeliveryStatus = {};
    masterOrder.orders?.forEach(order => {
      initialDeliveryStatus[order.orderId] = order.deliveryStatus || deliveryOptions[order.status]?.default || '';
    });
    setDeliveryStatus(initialDeliveryStatus);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedMasterOrder(null);
    setDeliveryStatus({});
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPage) {
      setPageNumber(pageNumber);
    }
  };

  const getPageRange = () => {
    if (!totalPage || totalPage <= 0) return [];
    const startPage = Math.floor(pageNumber / maxPagesToShow) * maxPagesToShow;
    const endPage = Math.min(startPage + maxPagesToShow, totalPage);
    return Array.from({ length: endPage - startPage }, (_, i) => startPage + i);
  };

  return (
    <div className="main-content">
      <div className="row">
        <div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="page-title-wrapper">
            <div className="page-title-box ad-title-box-use">
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
      border: selectedStatuses.includes(status) ? '2px solid #00ffcc' : '2px solid #ccc',
      background: selectedStatuses.includes(status) ? 'linear-gradient(90deg, #00ffcc, #0099ff)' : '#f3f4f6',
      color: selectedStatuses.includes(status) ? '#fff' : '#333',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    }}
  >
    {toVNOrderStatus(status)}
  </button>
))}

      </div>
      <div className="row">
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
                        <th>ID Master Order</th>
                        <th>Tên thanh toán</th>
                        <th>Ngày</th>
                        <th>Tổng cộng</th>
                        <th>Trạng thái</th>
                        <th>Số lượng đơn hàng con</th>
                        <th>Xem chi tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardSeller?.recentOrders?.map((masterOrder) => (
                        <tr key={masterOrder.masterOrderId}>
                          <td>#{masterOrder.masterOrderId}</td>
                          <td>
                            <span className="img-thumb">
                              <img src="../../assets/admin/images/table/1.jpg" alt=" " />
                              <span className="ml-2">{masterOrder.recipientName}</span>
                            </span>
                          </td>
                          <td>{format(parseISO(masterOrder.createdAt), 'yyyy-MM-dd HH:mm:ss')}</td>
                          <td>${masterOrder.totalPrice.toFixed(2)}</td>
                          <td>
                          <label className={`mb-0 badge ${orderBadge(masterOrder.status)}`}>
  {toVNOrderStatus(masterOrder.status)}
</label>
                          </td>
                          <td>{masterOrder.orders?.length || 0}</td>
                          <td>
                            <button
                              className="mb-0 badge badge-primary"
                              onClick={() => handleViewDetail(masterOrder)}
                            >
                              Xem chi tiết
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-6">
                <nav aria-label="Product Pagination">
                  <ul className="pagination style-1">
                    <li className="page-item">
                      <a
                        className={`page-link ${pageNumber === 0 ? 'disabled' : ''}`}
                        onClick={() => handlePageChange(pageNumber - 1)}
                      >
                        <i className="fas fa-chevron-left mr-1"></i>
                      </a>
                    </li>
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
      {showDetailModal && selectedMasterOrder && (
        <div
          className="modal-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1050,
          }}
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content" style={{ borderRadius: '12px' }}>
              <div className="modal-header">
                <h5 className="modal-title">
                  🛒 Chi tiết Master Order #{selectedMasterOrder.masterOrderId}
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
              <div className="modal-body" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                <div className="card p-3 shadow-sm mb-3">
                  <h6 className="mb-3">📦 Thông tin Master Order</h6>
                  <p><b>Ngày tạo:</b> {format(parseISO(selectedMasterOrder.createdAt), 'yyyy-MM-dd HH:mm:ss')}</p>
                  <p><b>Tổng tiền:</b> ${selectedMasterOrder.totalPrice.toFixed(2)}</p>
                  <p><b>Trạng thái:</b>
                  <span className={`badge ${orderBadge(selectedMasterOrder.status)}`}>
  {toVNOrderStatus(selectedMasterOrder.status)}
</span>
                  </p>
                  <p><b>Số sản phẩm:</b> {selectedMasterOrder.itemCount}</p>
                  <p><b>Tên người nhận:</b> {selectedMasterOrder.recipientName}</p>
                  <p><b>Email:</b> {selectedMasterOrder.recipientEmail}</p>
                  <p><b>SĐT:</b> {selectedMasterOrder.recipientPhone}</p>
                  <p><b>Địa chỉ:</b> {selectedMasterOrder.deliveryAddress}</p>
                  <p><b>Chi tiết địa chỉ:</b> {selectedMasterOrder.addressDetails}</p>
                </div>
                <h6 className="mb-3">📋 Danh sách đơn hàng con</h6>
                {selectedMasterOrder.orders?.map((order, index) => (
                  <div key={order.orderId} className="card p-3 shadow-sm mb-3">
                    <h6 className="mb-3">Đơn hàng #{order.orderId}</h6>
                    <div style={{
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px',
  backgroundColor: '#f8f9fa',
  borderRadius: '10px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
  fontFamily: "'Roboto', sans-serif"
}}>
  <span style={{
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    backgroundColor: '#e0f7fa',
    padding: '4px 8px',
    borderRadius: '4px'
  }}>{order.idShop}</span>
  <span style={{
    fontSize: '18px',
    fontWeight: '500',
    color: '#1a1a1a',
    flex: '1'
  }}>{order.nameShop}</span>
  <img 
    src={order.thumbnailShop} 
    alt={order.nameShop}
    style={{
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid #ddd'
    }}
  />
</div>
<br />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <h6 className="mb-3">📦 Thông tin đơn hàng</h6>
                        <p><b>Ngày tạo:</b> {format(parseISO(order.createdAt), 'yyyy-MM-dd HH:mm:ss')}</p>
                        <p><b>Tổng tiền:</b> ${order.totalPrice.toFixed(2)}</p>
                        <p><b>Trạng thái:</b>
                        <span className={`badge ${orderBadge(order.status)}`}>
  {toVNOrderStatus(order.status)}
</span>
                        </p>
                        <p><b>Số sản phẩm:</b> {order.itemCount}</p>
                 <div className="mt-3">
                 <label><b>Trạng thái giao hàng:</b></label>
<select
  className="form-select mt-1 thanhvu"
  value={deliveryStatus[order.orderId] || ''}
  disabled={!deliveryOptions[order.status]?.options?.length}
  onChange={(e) => {
    setDeliveryStatus({ ...deliveryStatus, [order.orderId]: e.target.value });
    setCancelOrderId(order.orderId);
  }}
>
  <option value={deliveryOptions[order.status]?.default || ''}>
    {toVNDeliveryStatus(deliveryOptions[order.status]?.default || '')}
  </option>
  {deliveryOptions[order.status]?.options
    ?.filter((st) => st !== deliveryOptions[order.status]?.default)
    .map((st) => (
      <option key={st} value={st}>
        {toVNDeliveryStatus(st)}
      </option>
    ))}
</select>

</div>
                      </div>
                      <div>
                        <h6 className="mb-3">🛍 Danh sách sản phẩm</h6>
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, idx) => (
                            <div key={idx} className="border rounded p-3 mb-2">
                              <p><b>ASIN:</b> {item.asin}</p>
                              <p><b>Tên sản phẩm:</b> {item.titleProduct}</p>
                              <p><b>Màu:</b> {item.color || <span className="text-muted">-</span>}</p>
                              <p><b>Size:</b> {item.size || <span className="text-muted">-</span>}</p>
                              <p><b>Số lượng:</b> {item.quantity}</p>
                              <p><b>Đơn giá:</b> <span className="text-success fw-bold">${Number(item.unitPrice).toLocaleString()}</span></p>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted text-center my-2">Không có sản phẩm trong đơn hàng.</p>
                        )}
                      </div>
                      <div>
                        <h6 className="mb-3">👤 Người nhận</h6>
                        <p><b>Tên:</b> {order.recipientName}</p>
                        <p><b>Email:</b> {order.recipientEmail}</p>
                        <p><b>SĐT:</b> {order.recipientPhone}</p>
                        <p><b>Địa chỉ:</b> {order.deliveryAddress}</p>
                        <p><b>Chi tiết:</b> {order.addressDetails}</p>
                      </div>
                      <div>
                        <h6 className="mb-3">🚚 Giao hàng</h6>
                        <p><b>Trạng thái:</b> {toVNDeliveryStatus(order.deliveryStatus) || 'Chưa có'}</p>
                        <p><b>Mã tracking:</b> {order.trackingNumber || 'Chưa có'}</p>
                        <p><b>Phí ship:</b> ${order.shippingFee || 0}</p>
                        <p><b>Ngày dự kiến:</b> {order.estimatedDeliveryDate ? format(parseISO(order.estimatedDeliveryDate), 'yyyy-MM-dd HH:mm:ss') : 'Chưa có'}</p>
                      </div>
                      <div>
                        <h6 className="mb-3">🚀 Phương thức vận chuyển</h6>
                        <p><b>Tên:</b> {order.shippingMethodName || 'Chưa chọn'}</p>
                        <p><b>Mô tả:</b> {order.shippingDescription || 'N/A'}</p>
                        <p><b>Thời gian dự kiến:</b> {order.shippingEstimatedDays || 0} ngày</p>
                      </div>
                      <div>
                        <h6 className="mb-3">💳 Thanh toán</h6>
                        <p><b>Phương thức:</b> {order.paymentMethod || 'Chưa có'}</p>
                        <p><b>Trạng thái:</b>
  <span className={`badge ${paymentBadge(order.statusPayment)}`}>
    {toVNPaymentStatus(order.statusPayment)}
  </span>
</p>
                      </div>
                    </div>
                    {/* {['pending', 'processing'].includes(order.status?.trim().toLowerCase()) && (
                      <button
                        type="button"
                        className="btn btn-secondary mt-3"
                        onClick={() => {
                          setCancelOrderId(order.orderId);
                        }}
                      >
                        Hủy Đơn Hàng
                      </button>
                    )} */}
                  </div>
                )) || <p>Không có đơn hàng con.</p>}
              </div>
              <div className="modal-footer">
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
  );
}

export default Order;