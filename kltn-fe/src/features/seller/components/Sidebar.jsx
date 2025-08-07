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
    <a href="index.html" className="seller-logo">
      <img src="../../assets/seller/images/logo.png" alt="" className="sp_logo" />
      <img src="../../assets/seller/images/mini_logo.png" alt="" className="sp_mini_logo" />
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
            {/* seller */}
            <a href="/seller">
              <span className="icon-dash"></span>
              <span className="menu-text">Quản trị viên</span>
            </a>
          </li>
        
        </ul>
      </li>
      <li>
        <a href="/seller/product/allProduct">
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
          <span className="menu-text">Quản lí sản phẩm</span>
        </a>
      </li>
      <li>
        <a href="/seller/order/order">
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
  <a href="/seller/comments">
    <span className="icon-menu feather-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-message-square"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </span>
    <span className="menu-text">Quản lý bình luận</span>
  </a>
</li>
      <li>
  <a href="/seller/evaluate/evaluateSeller">
    <span className="icon-menu feather-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-message-square"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </span>
    <span className="menu-text">Quản lý đánh giá</span>
  </a>
</li>
      <li>
        <a href="/seller/inventory/inventoryProduct">
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
          <span className="menu-text">Quản lí kho hàng</span>
        </a>
      </li>
    
    </ul>
  </div>
</aside>

      );
  
  };

export default Sidebar;