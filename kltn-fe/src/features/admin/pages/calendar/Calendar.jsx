const Calendar = () => (
    <div className="main-content">
    {/* <!-- Page Title Start --> */}
    <div className="row">
        <div className="col xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="page-title-wrapper">
                <div className="page-title-box">
                    <h4 className="page-title">Calendar</h4>
                </div>
                <div className="breadcrumb-list">
                    <ul>
                        <li className="breadcrumb-link">
                            <a href="index.html"><i className="fas fa-home mr-2"></i>Dashboard</a>
                        </li>
                        <li className="breadcrumb-link active">Calendar</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Products view Start --> */}
    <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card table-card">
                <div className="card-body">
                    <div className="calendar-wrapper"></div>
                </div>
            </div>
        </div>
    </div>
    <div className="ad-footer-btm">
        <p>Copyright 2022 © SplashDash All Rights Reserved.</p>
    </div>
</div>
  );
  
  export default Calendar;