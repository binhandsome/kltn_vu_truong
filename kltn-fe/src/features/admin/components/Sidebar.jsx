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
          <span className="menu-text">Dashboard</span>
        </a>
        <ul className="sub-menu">
          <li>
            <a href="index.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Admin</span>
            </a>
          </li>
          <li>
            <a href="user.html">
              <span className="icon-dash"></span>
              <span className="menu-text">User</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="all-product.html">
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
          <span className="menu-text">Products</span>
        </a>
      </li>
      <li>
        <a href="orders.html">
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
          <span className="menu-text">Orders</span>
        </a>
      </li>
      <li>
        <a href="customers.html">
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
          <span className="menu-text">Customers</span>
        </a>
      </li>
   
      <li>
        <a href="fontawesome.html">
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
          <span className="menu-text">UI Kit</span>
        </a>
        <ul className="sub-menu">
          <li>
            <a href="progress-bars.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Progress Bars</span>
            </a>
          </li>
          <li>
            <a href="alert.html">
              <span className="icon-dash"></span>
              <span className="menu-text">alert</span>
            </a>
          </li>
          <li>
            <a href="editor.html">
              <span className="icon-dash"></span>
              <span className="menu-text">editor</span>
            </a>
          </li>
          <li>
            <a href="modal.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Modal</span>
            </a>
          </li>
          <li>
            <a href="tab.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Tabs</span>
            </a>
          </li>
          <li>
            <a href="carousal.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Carousal</span>
            </a>
          </li>
          <li>
            <a href="counter.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Counter</span>
            </a>
          </li>
          <li>
            <a href="accordation.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Accordation</span>
            </a>
          </li>
          <li>
            <a href="pagination.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Pagination</span>
            </a>
          </li>
          <li>
            <a href="typography.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Typograpgy</span>
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
          <span className="menu-text">Form</span>
        </a>
        <ul className="sub-menu">
          <li>
            <a href="form.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Basic Form</span>
            </a>
          </li>
          <li>
            <a href="tags.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Tags</span>
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
          <span className="menu-text">Table</span>
        </a>
        <ul className="sub-menu">
          <li>
            <a href="basic-table.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Basic Table</span>
            </a>
          </li>
          <li>
            <a href="advance-table.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Advance Table</span>
            </a>
          </li>
          <li>
            <a href="data-table.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Data Table</span>
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
          <span className="menu-text">Map</span>
        </a>
        <ul className="sub-menu">
          <li>
            <a href="g-map.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Google Map</span>
            </a>
          </li>
          <li>
            <a href="v-map.html">
              <span className="icon-dash"></span>
              <span className="menu-text">vector Map</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="chart.html">
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
          <span className="menu-text">Chart</span>
        </a>
      </li>
      <li>
        <a href="buttons.html">
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
          <span className="menu-text">buttons</span>
        </a>
      </li>
      <li>
        <a href="invoice.html">
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
          <span className="menu-text">Invoice</span>
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
            <a href="inbox.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Inbox</span>
            </a>
          </li>
          <li>
            <a href="email-template.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Email Template</span>
            </a>
          </li>
          <li>
            <a href="chat.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Chat</span>
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
          <span className="menu-text">Authentication</span>
        </a>
        <ul className="sub-menu">
          <li>
            <a href="login.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Login</span>
            </a>
          </li>
          <li>
            <a href="register.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Register</span>
            </a>
          </li>
          <li>
            <a href="profile.html">
              <span className="icon-dash"></span>
              <span className="menu-text">My Profile</span>
            </a>
          </li>
          <li>
            <a href="forgot-pws.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Recover Password</span>
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
          <span className="menu-text">General</span>
        </a>
        <ul className="sub-menu show-submenu">
          <li>
            <a href="blank.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Starter</span>
            </a>
          </li>
          <li>
            <a href="cards.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Cards</span>
            </a>
          </li>
          <li>
            <a href="product-single.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Product Single</span>
            </a>
          </li>
          <li>
            <a href="wishlist.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Wishlist</span>
            </a>
          </li>
          <li>
            <a href="cart.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Cart</span>
            </a>
          </li>
          <li>
            <a href="checkout.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Checkout</span>
            </a>
          </li>
          <li>
            <a href="faq.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Faq</span>
            </a>
          </li>
          <li>
            <a href="error.html">
              <span className="icon-dash"></span>
              <span className="menu-text">Error 404</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="support.html">
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
          <span className="menu-text">Support</span>
        </a>
      </li>
      <li>
        <a href="documentation.html">
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
          <span className="menu-text">Documentation</span>
        </a>
      </li>
    </ul>
  </div>
</aside>

      );
  
  };

export default Sidebar;