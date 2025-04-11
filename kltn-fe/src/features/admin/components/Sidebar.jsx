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
  
  return(<aside className="sidebar-wrapper">
    <div className="logo-wrapper">
      <a href="/admin" className="admin-logo">
        <img src="../../assets/admin/images/logo.png" alt="" className="sp_logo"/>
        <img src="../../assets/admin/images/mini_logo.png" alt="" className="sp_mini_logo"/>
      </a>
    </div>
          <div className="side-menu-wrap">
              <ul className="main-menu">
              <li className={isDashboardOpen ? 'open' : ''}>
      <a href="#" className="active" onClick={toggleDashboardMenu}>
        <span className="icon-menu feather-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-home"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </span>

        <span className="menu-text">
          Dashboard{' '}
          <span className={`arrow ${isDashboardOpen ? 'rotate' : ''}`}>&gt;</span>
        </span>
      </a>

      {/* Sub-menu */}
      <ul className="sub-menu" style={{ display: isDashboardOpen ? 'block' : 'none' }}>
        <li>
          <a href="/admin">
            <span className="icon-dash"></span>
            <span className="menu-text">Admin</span>
          </a>
        </li>
        <li>
          <a href="/admin/dashboard/userDashboard">
            <span className="icon-dash"></span>
            <span className="menu-text">User</span>
          </a>
        </li>
      </ul>
    </li>

                  
                  <li>
                      <a href="/admin/product/allProduct">
                          <span className="icon-menu feather-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-package"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                          </span>
                          <span className="menu-text">
                              Products
                          </span>
                      </a>
                  </li>
                  <li>
                      <a href="/admin/order/order">
                          <span className="icon-menu feather-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-truck"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                          </span>
                          <span className="menu-text">
                              Orders
                          </span>
                      </a>
                  </li>
                  <li>
                      <a href="/admin/customer/customer">
                          <span className="icon-menu feather-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                          </span>
                          <span className="menu-text">
                              Customers
                          </span>
                      </a>
                  </li>
                  <li>
                      <a href="/admin/calendar/calendar">
                          <span className="icon-menu feather-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          </span>
                          <span className="menu-text">
                              Calendar
                          </span>
                      </a>
                  </li>
                  
                  <li>
                      <a href="/admin/fontawasome/fontAwasome">
                          <span className="icon-menu feather-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-grid nav-icon"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                          </span>
                          <span className="menu-text">
                              Font Awesome
                          </span>
                      </a>
                  </li>
                  <li className={isUIkitOpen ? 'open' : ''}>
  <a href="#" className="active" onClick={toggleUIkitMenu}>
    <span className="icon-menu feather-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-wind"
      >
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
      </svg>
    </span>
    <span className="menu-text">
      UI Kit{' '}
      <span className={`arrow ${isUIkitOpen ? 'rotate' : ''}`}>&gt;</span>
    </span>
  </a>

  <ul className="sub-menu" style={{ display: isUIkitOpen ? 'block' : 'none' }}>
    <li><a href="/admin/uikit/progressBars"><span className="icon-dash"></span><span className="menu-text">Progress Bars</span></a></li>
    <li><a href="/admin/uikit/alert"><span className="icon-dash"></span><span className="menu-text">alert</span></a></li>
    <li><a href="/admin/uikit/editor"><span className="icon-dash"></span><span className="menu-text">editor</span></a></li>
    <li><a href="/admin/uikit/modal"><span className="icon-dash"></span><span className="menu-text">Modal</span></a></li>
    <li><a href="/admin/uikit/tabs"><span className="icon-dash"></span><span className="menu-text">Tabs</span></a></li>
    <li><a href="/admin/uikit/carousal"><span className="icon-dash"></span><span className="menu-text">Carousal</span></a></li>
    <li><a href="/admin/uikit/counter"><span className="icon-dash"></span><span className="menu-text">Counter</span></a></li>
    <li><a href="/admin/uikit/accordation"><span className="icon-dash"></span><span className="menu-text">Accordation</span></a></li>
    <li><a href="/admin/uikit/pagination"><span className="icon-dash"></span><span className="menu-text">Pagination</span></a></li>
    <li><a href="/admin/uikit/typography"><span className="icon-dash"></span><span className="menu-text">Typograpgy</span></a></li>
  </ul>
</li>

<li className={isFormOpen ? 'open' : ''}>
  <a href="#" className="active" onClick={toggleFormMenu}>
    <span className="icon-menu feather-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-send"
      >
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    </span>
    <span className="menu-text">
      Form{' '}
      <span className={`arrow ${isFormOpen ? 'rotate' : ''}`}>&gt;</span>
    </span>
  </a>

  <ul className="sub-menu" style={{ display: isFormOpen ? 'block' : 'none' }}>
    <li>
      <a href="/admin/form/basicForm">
        <span className="icon-dash"></span>
        <span className="menu-text">Basic Form</span>
      </a>
    </li>
    <li>
      <a href="/admin/form/tags">
        <span className="icon-dash"></span>
        <span className="menu-text">Tags</span>
      </a>
    </li>
  </ul>
</li>

<li className={isTableOpen ? 'open' : ''}>
  <a href="#" className="active" onClick={toggleTableMenu}>
    <span className="icon-menu feather-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-tablet"
      >
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18"></line>
      </svg>
    </span>

    <span className="menu-text">
      Table{' '}
      <span className={`arrow ${isTableOpen ? 'rotate' : ''}`}>&gt;</span>
    </span>
  </a>

  <ul className="sub-menu" style={{ display: isTableOpen ? 'block' : 'none' }}>
    <li>
      <a href="/admin/table/basicTable">
        <span className="icon-dash"></span>
        <span className="menu-text">Basic Table</span>
      </a>
    </li>
    <li>
      <a href="/admin/table/advanceTable">
        <span className="icon-dash"></span>
        <span className="menu-text">Advance Table</span>
      </a>
    </li>
    <li>
      <a href="/admin/table/dataTable">
        <span className="icon-dash"></span>
        <span className="menu-text">Data Table</span>
      </a>
    </li>
  </ul>
</li>

                  <li className={isDashboardOpen ? 'open' : ''}>
                      <a href="#" className="active" onClick={toggleDashboardMenu}>
                          <span className="icon-menu feather-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-map"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
                          </span>
                          <span className="menu-text">
                              Map
                          </span>
                      </a>
                      <ul className="sub-menu">
                          <li>
                              <a href="/admin/map/googleMap">
                                  <span className="icon-dash">
                                  </span>
                                  <span className="menu-text">
                                      Google Map
                                  </span>
                              </a>
                          </li>
                          <li>
                              <a href="/admin/map/vectorMap">
                                  <span className="icon-dash">
                                  </span>
                                  <span className="menu-text">
                                      vector Map
                                  </span>
                              </a>
                          </li>
                      </ul>
                  </li>
                  <li>
                      <a href="/admin/chart/chart">
                          <span className="icon-menu feather-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                          </span>
                          <span className="menu-text">
                              Chart
                          </span>
                      </a>
                  </li>
         <li>
                      <a href="/admin/buttons/buttons">
                          <span className="icon-menu feather-icon">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-cloud"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
                          </span>
                          <span className="menu-text">
                              buttons
                          </span>
                      </a>
                  </li>
                  
                  <li>
                      <a href="/admin/invoice/invoice">
                          <span className="icon-menu feather-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-printer"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                          </span>
                          <span className="menu-text">
                              Invoice
                          </span>
                      </a>
                  </li>
                  <li className={isEmailOpen ? 'open' : ''}>
  <a href="#" className="active" onClick={toggleEmailMenu}>
    <span className="icon-menu feather-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-mail"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    </span>

    <span className="menu-text">
      Email{' '}
      <span className={`arrow ${isEmailOpen ? 'rotate' : ''}`}>&gt;</span>
    </span>
  </a>

  <ul className="sub-menu" style={{ display: isEmailOpen ? 'block' : 'none' }}>
    <li>
      <a href="/admin/email/inbox">
        <span className="icon-dash"></span>
        <span className="menu-text">Inbox</span>
      </a>
    </li>
    <li>
      <a href="/admin/email/chat">
        <span className="icon-dash"></span>
        <span className="menu-text">Chat</span>
      </a>
    </li>
  </ul>
</li>

                  
<li className={isAuthOpen ? 'open' : ''}>
  <a href="#" className="active" onClick={toggleAuthMenu}>
    <span className="icon-menu feather-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-alert-octagon"
      >
        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </span>

    <span className="menu-text">
      Authentication{' '}
      <span className={`arrow ${isAuthOpen ? 'rotate' : ''}`}>&gt;</span>
    </span>
  </a>

  <ul className="sub-menu" style={{ display: isAuthOpen ? 'block' : 'none' }}>
    <li>
      <a href="/admin/authentication/login">
        <span className="icon-dash"></span>
        <span className="menu-text">Login</span>
      </a>
    </li>
    <li>
      <a href="/admin/authentication/register">
        <span className="icon-dash"></span>
        <span className="menu-text">Register</span>
      </a>
    </li>
    <li>
      <a href="/admin/authentication/myProfile">
        <span className="icon-dash"></span>
        <span className="menu-text">My Profile</span>
      </a>
    </li>
    <li>
      <a href="/admin/authentication/recoverPassword">
        <span className="icon-dash"></span>
        <span className="menu-text">Recover Password</span>
      </a>
    </li>
  </ul>
</li>

<li className={isGeneralOpen ? 'open active-li' : 'active-li'}>
  <a href="#" className="active" onClick={toggleGeneralMenu}>
    <span className="icon-menu feather-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-layers"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    </span>

    <span className="menu-text">
      General{' '}
      <span className={`arrow ${isGeneralOpen ? 'rotate' : ''}`}>&gt;</span>
    </span>
  </a>
  <ul className="sub-menu"  style={{ display: isGeneralOpen ? 'block' : 'none' }}>
    <li><a href="/admin/general/starter"><span className="icon-dash"></span><span className="menu-text">Starter</span></a></li>
    <li><a href="/admin/general/cards"><span className="icon-dash"></span><span className="menu-text">Cards</span></a></li>
    <li><a href="/admin/general/productSingle"><span className="icon-dash"></span><span className="menu-text">Product Single</span></a></li>
    <li><a href="/admin/general/wishlist"><span className="icon-dash"></span><span className="menu-text">Wishlist</span></a></li>
    <li><a href="/admin/general/cart"><span className="icon-dash"></span><span className="menu-text">Cart</span></a></li>
    <li><a href="/admin/general/checkout"><span className="icon-dash"></span><span className="menu-text">Checkout</span></a></li>
    <li><a href="/admin/general/faq"><span className="icon-dash"></span><span className="menu-text">Faq</span></a></li>
    <li><a href="/admin/general/error404"><span className="icon-dash"></span><span className="menu-text">Error 404</span></a></li>
  </ul>
</li>

                  
                  <li>
                      <a href="/admin/support/support">
                          <span className="icon-menu feather-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-voicemail"><circle cx="5.5" cy="11.5" r="4.5"></circle><circle cx="18.5" cy="11.5" r="4.5"></circle><line x1="5.5" y1="16" x2="18.5" y2="16"></line></svg>
                          </span>
                          <span className="menu-text">
                              Support
                          </span>
                      </a>
                  </li>
                  <li>
                      <a href="/admin/documentation/documentation">
                          <span className="icon-menu feather-icon">
                              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-paperclip"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                          </span>
                          <span className="menu-text">
                              Documentation
                          </span>
                      </a>
                  </li>
              </ul>
          </div>
      </aside>);
  
  };

export default Sidebar;