const Chart = () => (
    <div className="main-content">
                {/* <!-- Page Title Start --> */}
                <div className="row">
                    <div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                {/* Charts */}
                                <h4 className="page-title bold">Biểu đồ</h4>
                            </div>
                            <div className="breadcrumb-list">
                                <ul>
                                    <li className="breadcrumb-link">
                                        {/* Dashboard */}
                                        <a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                                    </li>
                                    {/* Chart */}
                                    <li className="breadcrumb-link active">Biểu đồ</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Chart Start --> */}
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        {/* <!-- Basic Area Chart --> */}
                        <div className="card chart-card">
                            <div className="card-header">
                                <h4>Biểu đồ vùng cơ bản</h4>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div id="chartA"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        {/* <!-- Area Spaline Chart --> */}
                        <div className="card chart-card">
                            <div className="card-header">
                                <h4>Biểu đồ đường trục khu vực</h4>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div id="chartB"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        {/* <!-- Basic Bar Chart--> */}
                        <div className="card chart-card">
                            <div className="card-header">
                                <h4>Biểu đồ thanh cơ bản</h4>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div id="chartC"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        {/* <!-- Vertical Bar Chart Card--> */}
                        <div className="card chart-card">
                            <div className="card-header">
                                <h4>Biểu đồ thanh dọc</h4>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div id="chartD"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        {/* <!-- Column Bar Chart Card--> */}
                        <div className="card chart-card">
                            <div className="card-header">
                                <h4>Biểu đồ thanh cột</h4>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div id="chartE"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        {/* <!-- Stacked Bar Chart Card--> */}
                        <div className="card chart-card">
                            <div className="card-header">
                                <h4>Biểu đồ thanh xếp chồng lên nhau</h4>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div id="chartF"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* <!-- Basic Line Chart--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card chart-card">
                            <div className="card-header">
                                <h4>Biểu đồ đường cơ bản</h4>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div id="chartG"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Line with Data Labels--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card chart-card">
                            <div className="card-header">
                                <h4>Biểu đồ đường có nhãn dữ liệu</h4>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div id="chartH"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* <!-- Start Line & Column Chart Card--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card chart-card">
                            <div className="card-header">
                                <h4>Biểu đồ đường &amp; cột</h4>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div id="chartI"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Start Radial Chart Card--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card chart-card">
                            <div className="card-header">
                                <h4>Biểu đồ xuyên tâm</h4>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div id="chartJ"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* <!-- Start Radar Chart Card--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card chart-card">
                            <div className="card-header">
                                <h4>Biểu đồ radar</h4>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div id="chartK"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Start Pie Chart Card--> */}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card chart-card">
                            <div className="card-header">
                                <h4>Biểu đồ hình tròn</h4>
                            </div>
                            <div className="card-body">
                                <div className="chart-holder">
                                    <div id="chartL"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				<div className="ad-footer-btm">
					<p>Copyright 2022 © SplashDash All Rights Reserved.</p>
				</div>
            </div>
  );
  
  export default Chart;