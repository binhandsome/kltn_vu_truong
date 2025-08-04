import React, { useState } from 'react';

const Sidebar = () => {
  const [isDashboardOpen, setDashboardOpen] = useState(false); 
  const [isUIkitOpen, setUIkitOpen] = useState(false); 
  const [isFormOpen, setFormOpen] = useState(false);
  const [isTableOpen, setTableOpen] = useState(false);
  const [isEmailOpen, setEmailOpen] = useState(false);
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isGeneralOpen, setGeneralOpen] = useState(false);
  
  const toggleDashboardMenu = () => setDashboardOpen(!isDashboardOpen);
  const toggleUIkitMenu = () => setUIkitOpen(!isUIkitOpen);
  const toggleFormMenu = () => setFormOpen(!isFormOpen);
  const toggleTableMenu = () => setTableOpen(!isTableOpen);
  const toggleEmailMenu = () => setEmailOpen(!isEmailOpen);
  const toggleAuthMenu = () => setAuthOpen(!isAuthOpen);
  const toggleGeneralMenu = () => setGeneralOpen(!isGeneralOpen);
  
  return(
 <aside className="sidebar-wrapper">
  <div className="logo-wrapper">
    <a href="index.html" className="admin-logo">
      <img src="../../assets/admin/images/logo.png" alt="" className="sp_logo" />
      <img src="../../assets/admin/images/mini_logo.png" alt="" className="sp_mini_logo" />
    </a>
  </div>
  <div className="side-menu-wrap">
    <ul className="main-menu">
      <li>
        <a href="javascript:void(0);" className="active">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </span>
          {/* Dashboard */}
          <span className="menu-text">Bảng điều khiển</span>
        </a>
        <ul className="sub-menu">
          <li>
            {/* Admin */}
            <a href="/admin">
              <span className="icon-dash"></span>
              <span className="menu-text">Quản trị viên</span>
            </a>
          </li>
          <li>
            {/* User */}
            <a href="/admin/dashboard/userDashboard">
              <span className="icon-dash"></span>
              <span className="menu-text">Người dùng</span>
            </a>
          </li>
          <li>
            {/* User */}
            <a href="/admin/dashboard/sellerDashboard">
              <span className="icon-dash"></span>
              <span className="menu-text">Cửa hàng</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="/admin/product/adminProductDashboard">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-package"
            >
              <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1={12} y1="22.08" x2={12} y2={12} />
            </svg>
          </span>
          {/* Products */}
          <span className="menu-text">Thống kê sản phẩm</span>
        </a>
      </li>
      <li>
        <a href="/admin/order/order">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-truck"
            >
              <rect x={1} y={3} width={15} height={13} />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </span>
          {/* Orders */}
          <span className="menu-text">Quản lí đơn hàng</span>
        </a>
      </li>
      <li>
        <a href="/admin/customer/adminFeedbackTable">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-users"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx={9} cy={7} r={4} />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          {/* Customers */}
          <span className="menu-text">Quản lí Feedback</span>
        </a>
      </li>
   
      <li>
        <a href="/admin/fontawasome/fontAwasome">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-grid nav-icon"
            >
              <rect x={3} y={3} width={7} height={7} />
              <rect x={14} y={3} width={7} height={7} />
              <rect x={14} y={14} width={7} height={7} />
              <rect x={3} y={14} width={7} height={7} />
            </svg>
          </span>
          <span className="menu-text">Font Awesome</span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-wind"
            >
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
            </svg>
          </span>
          {/* UI Kit */}
          <span className="menu-text">Bộ UI người dùng</span>
        </a>
        <ul className="sub-menu">
          <li>
            {/* Progress Bars */}
            <a href="/admin/uikit/progressBars">
              <span className="icon-dash"></span>
              <span className="menu-text">Thanh tiến trình</span>
            </a>
          </li>
          <li>
            {/* Alert */}
            <a href="/admin/uikit/alert">
              <span className="icon-dash"></span>
              <span className="menu-text">Báo động</span>
            </a>
          </li>
          <li>
            {/* Editor */}
            <a href="/admin/uikit/editor">
              <span className="icon-dash"></span>
              <span className="menu-text">Biên tập viên</span>
            </a>
          </li>
          <li>
            {/* Modal */}
            <a href="/admin/uikit/modal">
              <span className="icon-dash"></span>
              <span className="menu-text">Phương thức</span>
            </a>
          </li>
          <li>
            {/* Tabs */}
            <a href="/admin/uikit/tabs">
              <span className="icon-dash"></span>
              <span className="menu-text">Quản lí thẻ</span>
            </a>
          </li>
          <li>
            {/* Carousal */}
            <a href="/admin/uikit/carousal">
              <span className="icon-dash"></span>
              <span className="menu-text">Băng chuyền</span>
            </a>
          </li>
          <li>
            {/* Counter */}
            <a href="/admin/uikit/counter">
              <span className="icon-dash"></span>
              <span className="menu-text">Quầy tính tiền</span>
            </a>
          </li>
          <li>
            {/* Accordation */}
            <a href="/admin/uikit/accordation">
              <span className="icon-dash"></span>
              <span className="menu-text">Sự phù hợp</span>
            </a>
          </li>
          <li>
            {/* Pagination */}
            <a href="/admin/uikit/pagination">
              <span className="icon-dash"></span>
              <span className="menu-text">Phân trang</span>
            </a>
          </li>
          <li>
            {/* Typograpgy */}
            <a href="/admin/uikit/typography">
              <span className="icon-dash"></span>
              <span className="menu-text">Kiểu chữ</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="javascript:void(0);">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-send"
            >
              <line x1={22} y1={2} x2={11} y2={13} />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </span>
          {/* Form */}
          <span className="menu-text">Hình thức</span>
        </a>
        <ul className="sub-menu">
          <li>
            {/* Basic Form */}
            <a href="/admin/form/basicForm">
              <span className="icon-dash"></span>
              <span className="menu-text">Mẫu cơ bản</span>
            </a>
          </li>
          <li>
            {/* Tags */}
            <a href="/admin/form/tags">
              <span className="icon-dash"></span>
              <span className="menu-text">Mẫu thẻ</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="javascript:void(0);">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-tablet"
            >
              <rect x={4} y={2} width={16} height={20} rx={2} ry={2} />
              <line x1={12} y1={18} x2="12.01" y2={18} />
            </svg>
          </span>
          {/* Table */}
          <span className="menu-text">Bảng</span>
        </a>
        <ul className="sub-menu">
          <li>
            {/* Basic Table */}
            <a href="/admin/table/basicTable">
              <span className="icon-dash"></span>
              <span className="menu-text">Bảng cơ bản</span>
            </a>
          </li>
          <li>
            {/* Advance Table */}
            <a href="/admin/table/advanceTable">
              <span className="icon-dash"></span>
              <span className="menu-text">Bảng nâng cao</span>
            </a>
          </li>
          <li>
            {/* Data Table */}
            <a href="/admin/table/dataTable">
              <span className="icon-dash"></span>
              <span className="menu-text">Bảng dữ liệu</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="javascript:void(0);">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-map"
            >
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1={8} y1={2} x2={8} y2={18} />
              <line x1={16} y1={6} x2={16} y2={22} />
            </svg>
          </span>
          {/* Map */}
          <span className="menu-text">Bản đồ</span>
        </a>
        <ul className="sub-menu">
          <li>
            {/* Google Map */}
            <a href="/admin/map/googleMap">
              <span className="icon-dash"></span>
              <span className="menu-text">Bản đồ Google</span>
            </a>
          </li>
          <li>
            {/* Vector Map */}
            <a href="/admin/map/vectorMap">
              <span className="icon-dash"></span>
              <span className="menu-text">Bản đồ vector</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="/admin/chart/chart">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-pie-chart"
            >
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
              <path d="M22 12A10 10 0 0 0 12 2v10z" />
            </svg>
          </span>
          {/* Chart */}
          <span className="menu-text">Biểu đồ</span>
        </a>
      </li>
      <li>
        <a href="/admin/buttons/buttons">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-cloud"
            >
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
            </svg>
          </span>
          {/* Buttons */}
          <span className="menu-text">Nút</span>
        </a>
      </li>
      <li>
        <a href="/admin/invoice/invoice">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-printer"
            >
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x={6} y={14} width={12} height={8} />
            </svg>
          </span>
          {/* Invoice */}
          <span className="menu-text">Hóa đơn</span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-mail"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </span>
          <span className="menu-text">Email</span>
        </a>
        <ul className="sub-menu">
          <li>
            {/* Inbox */}
            <a href="/admin/email/inbox">
              <span className="icon-dash"></span>
              <span className="menu-text">Hộp thư đến</span>
            </a>
          </li>
          <li>
            {/* Chat */}
            <a href="/admin/email/chat">
              <span className="icon-dash"></span>
              <span className="menu-text">Trò chuyện</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="javascript:void(0);">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-alert-octagon"
            >
              <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
              <line x1={12} y1={8} x2={12} y2={12} />
              <line x1={12} y1={16} x2="12.01" y2={16} />
            </svg>
          </span>
          {/* Authentication */}
          <span className="menu-text">Xác thực</span>
        </a>
        <ul className="sub-menu">
          <li>
            {/* Login */}
            <a href="/admin/authentication/login">
              <span className="icon-dash"></span>
              <span className="menu-text">Đăng nhập</span>
            </a>
          </li>
          <li>
            {/* Register */}
            <a href="/admin/authentication/register">
              <span className="icon-dash"></span>
              <span className="menu-text">Đăng ký</span>
            </a>
          </li>
          <li>
            {/* My Profile */}
            <a href="/admin/authentication/myProfile">
              <span className="icon-dash"></span>
              <span className="menu-text">Hồ sơ của tôi</span>
            </a>
          </li>
          <li>
            {/* Recover Password */}
            <a href="/admin/authentication/recoverPassword">
              <span className="icon-dash"></span>
              <span className="menu-text">Khôi phục mật khẩu</span>
            </a>
          </li>
        </ul>
      </li>
      <li className="active-li">
        <a href="javascript:void(0);">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-layers"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </span>
          {/* General */}
          <span className="menu-text">Tổng quan</span>
        </a>
        <ul className="sub-menu show-submenu">
          <li>
            {/* Starter */}
            <a href="/admin/general/starter">
              <span className="icon-dash"></span>
              <span className="menu-text">Người mới bắt đầu</span>
            </a>
          </li>
          <li>
            {/* Cards */}
            <a href="/admin/general/cards">
              <span className="icon-dash"></span>
              <span className="menu-text">Thẻ</span>
            </a>
          </li>
          <li>
            {/* Product Single */}
            <a href="/admin/general/productSingle">
              <span className="icon-dash"></span>
              <span className="menu-text">Sản phẩm đơn</span>
            </a>
          </li>
          <li>
            {/* Wishlist */}
            <a href="/admin/general/wishlist">
              <span className="icon-dash"></span>
              <span className="menu-text">Ds yêu thích</span>
            </a>
          </li>
          <li>
            {/* Cart */}
            <a href="/admin/general/cart">
              <span className="icon-dash"></span>
              <span className="menu-text">Giỏ hàng</span>
            </a>
          </li>
          <li>
            {/* Checkout */}
            <a href="/admin/general/checkout">
              <span className="icon-dash"></span>
              <span className="menu-text">Thanh toán</span>
            </a>
          </li>
          <li>
            {/* Faq */}
            <a href="/admin/general/faq">
              <span className="icon-dash"></span>
              <span className="menu-text">Câu hỏi thường gặp</span>
            </a>
          </li>
          <li>
            {/* Error 404 */}
            <a href="/admin/general/error404">
              <span className="icon-dash"></span>
              <span className="menu-text">Lỗi 404</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="/admin/support/support">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-voicemail"
            >
              <circle cx="5.5" cy="11.5" r="4.5" />
              <circle cx="18.5" cy="11.5" r="4.5" />
              <line x1="5.5" y1={16} x2="18.5" y2={16} />
            </svg>
          </span>
          {/* Support */}
          <span className="menu-text">Hỗ trợ</span>
        </a>
      </li>
      <li>
        <a href="/admin/documentation/documentation">
          <span className="icon-menu feather-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-paperclip"
            >
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </span>
          {/* Documentation */}
          <span className="menu-text">Tài liệu</span>
        </a>
      </li>
    </ul>
  </div>
</aside>

      );
  
  };

export default Sidebar;