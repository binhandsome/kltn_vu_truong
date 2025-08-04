const AdminHeader = () => (
    <header className="header-wrapper main-header">
            <div className="header-inner-wrapper">
                <div className="header-right">
                    <div className="serch-wrapper">
                        <form>
                            <input type="text" placeholder="Search Here..."/>
                        </form>
                        <a className="search-close" href="javascript:void(0);"><span className="icofont-close-line"></span></a>
                    </div>
                    <div className="header-left">
                        <div className="header-links">
                          <a href="#" className="toggle-btn" onClick={(e) => {
  e.preventDefault();
  document.body.classList.toggle('mini-sidebar');
}}>
  <span></span>
</a>

                        </div>
                        <div className="header-links search-link">
                        <a className="search-toggle" href="javascript:void(0);">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            style={{ enableBackground: 'new 0 0 56.966 56.966' }}
          >
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
              s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
              c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
              s-17-7.626-17-17S14.61,6,23.984,6z"
            />
          </svg>
        </a>
                        </div>
                    </div>
                    <div className="header-controls">
            
                   

                        <div className="user-info-wrapper header-links">
                            <a href="javascript:void(0);" className="user-info">
                                <img src="../../assets/admin/images/user.jpg" alt="" className="user-img"/>
                                <div className="blink-animation">
                                    <span className="blink-circle"></span>
                                    <span className="main-circle"></span>
                                </div>
                            </a>
                            <div className="user-info-box">
                                <div className="drop-down-header">
                                    <h4>Chưa đăng nhập</h4>
                                </div>
                                <ul>
                                  
                                    <li>
                                        <a href="/admin/authentication/login">
                                        {/* Logout */}
                                            <i className="fas fa-sign-out-alt"></i> 
                                            Đăng Nhập
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
  );
  
  export default AdminHeader;