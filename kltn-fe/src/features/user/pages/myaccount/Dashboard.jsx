import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ScrollTopButton from '../../layout/ScrollTopButton';
import QuickViewModal from '../../components/home/QuickViewModal';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(minMax);
dayjs.extend(isoWeek);

Chart.register(ChartDataLabels);

function Dashboard() {
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    processingOrders: 0
  });

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [salesStats, setSalesStats] = useState([]);
  const [statType, setStatType] = useState("month");

  const groupByType = (apiData, type) => {
    const today = dayjs();

    if (type === "day") {
      const end = today;
      const start = end.subtract(6, "day");
      const days = Array.from({ length: 7 }, (_, i) => {
        const d = start.add(i, "day");
        return { key: d.format("YYYY-MM-DD"), label: d.format("DD/MM"), total: 0 };
      });

      apiData.forEach(item => {
        const dateKey = dayjs(item.label).format("YYYY-MM-DD");
        const found = days.find(d => d.key === dateKey);
        if (found) found.total = item.total;
      });

      return days.map(d => ({ label: d.label, total: d.total }));
    }
    if (type === "week") {
      const startOfMonth = today.startOf('month');
      const endOfMonth = today.endOf('month');
    
      const weeks = [];
      let current = startOfMonth.startOf('week');
    
      while (current.isBefore(endOfMonth)) {
        const isoYear = current.isoWeekYear();
        const isoWeek = String(current.isoWeek()).padStart(2, '0');
        const key = `${isoYear}-${isoWeek}`;
    
        const label = `Tuần ${weeks.length + 1}`;
        weeks.push({ key, label, total: 0 });
    
        current = current.add(1, 'week');
      }
    
      apiData.forEach(item => {
        const found = weeks.find(w => w.key === item.label);
        if (found) found.total = item.total;
      });
    
      return weeks.map(w => ({ label: w.label, total: w.total }));
    }
    
    if (type === "month") {
      const months = Array.from({ length: 12 }, (_, i) => ({
        label: `Tháng ${i + 1}`,
        key: `${today.year()}-${String(i + 1).padStart(2, "0")}`,
        total: 0
      }));

      apiData.forEach(item => {
        const monthKey = item.label;
        const found = months.find(m => m.key === monthKey);
        if (found) found.total = item.total;
      });

      return months.map(m => ({ label: m.label, total: m.total }));
    }

    if (type === "year") {
      const currentYear = today.year();
      const years = Array.from({ length: 10 }, (_, i) => {
        const y = currentYear - 9 + i;
        return { key: y.toString(), label: y.toString(), total: 0 };
      });

      apiData.forEach(item => {
        const found = years.find(y => y.key === item.label);
        if (found) found.total = item.total;
      });

      return years;
    }

    return [];
  };

  useEffect(() => {
    const fetchSalesStats = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      try {
        const res = await fetch(`http://localhost:8765/api/orders/statistics/sales/me?type=${statType}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        const grouped = groupByType(data, statType);
        setSalesStats(grouped);
      } catch (err) {
        console.error("❌ Lỗi khi lấy doanh thu:", err);
      }
    };
    fetchSalesStats();
  }, [statType]);

  useEffect(() => {
    const fetchOrderCounts = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      try {
        const res = await fetch(`http://localhost:8765/api/orders/user?page=0&size=1000`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        const allOrders = data.content || [];

        setOrderStats({
          totalOrders: allOrders.length,
          processingOrders: allOrders.filter(o => o.orderStatus === "processing").length
        });

      } catch (err) {
        console.error("❌ Lỗi khi lấy thống kê đơn hàng:", err);
      }
    };
    fetchOrderCounts();
  }, []);

  useEffect(() => {
    if (!chartRef.current || !Array.isArray(salesStats)) return;

    const ctx = chartRef.current.getContext("2d");
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const values = salesStats.map(s => s.total || 0);
    const realMax = Math.max(...values);
    const fallbackMax = 10;
    const maxValue = realMax > 0 ? realMax : fallbackMax;
    const stepSize = Math.ceil(maxValue / 10);
    const suggestedMax = stepSize * 10;

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: salesStats.map(s => s.label),
        datasets: [{
          label: 'Doanh thu ($)',
          data: salesStats.map(s => s.total),
          borderWidth: 2,
          fill: false,
          borderColor: '#ffbb38',
          tension: 0.3,
          spanGaps: true,
          pointBackgroundColor: '#ffbb38',
          pointBorderColor: '#ffbb38'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax,
            ticks: {
              stepSize,
              callback: function (value) {
                return '$' + value;
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#000'
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `Doanh thu: $${context.parsed.y}`;
              }
            }
          },
          datalabels: {
            display: true,
            align: 'top',
            color: '#000',
            formatter: function(value) {
              return value > 0 ? `$${value}` : '';
            }
          }
        }
      }
    });
  }, [salesStats]);
  
  return (
    <>
      <div className="page-wraper">

        {/* Header (đã được xử lý trong App.js) */}

       <div className="page-content bg-light">
  {/*Banner Start*/}
  <div
    className="dz-bnr-inr bg-secondary overlay-black-light"
    style={{ backgroundImage: "url(../../assets/user/images/background/bg1.jpg)" }}
  >
    <div className="container">
      <div className="dz-bnr-inr-entry">
        <h1>
        Trang tổng quan
          {/* Dashboard */}
        </h1>
        <nav aria-label="breadcrumb" className="breadcrumb-row">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html"> Trang chủ</a>
            </li>
            <li className="breadcrumb-item">Trang tổng quan</li>
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
            <a
              className="toggle-btn"
              href="account-dashboard.html#accountSidebar"
            >
              Account Menu
            </a>
          </div>
          <div className="sticky-top account-sidebar-wrapper">
            <div className="account-sidebar" id="accountSidebar">
              <div className="profile-head">
                <div className="user-thumb">
                  <img
                    className="rounded-circle"
                    src="../../assets/user/images/profile4.jpg"
                    alt="Susan Gardner"
                  />
                </div>
                <h5 className="title mb-0">Ronald M. Spino</h5>
                <span className="text text-primary">info@example.com</span>
              </div>
              <div className="account-nav">
                <div className="nav-title bg-light">
                BẢNG ĐIỀU KHIỂN
                  {/* DASHBOARD */}
                </div>
                <ul>
                  <li>
                  <a href="#" onClick={() => window.location.href = '/user/myaccount/dashboard'}>
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
          <div className="account-card">
            <div className="m-b30">
              {/* <p>
                Xin chào <strong className="text-black">John Doe</strong> (không phải{" "}
                <strong className="text-black">John Doe</strong>?{" "}
                <a href="login.html" className="text-underline">
                  Đăng xuất
                </a>
                )
              </p> */}
              <p>
              Từ bảng điều khiển tài khoản của bạn, bạn có thể xem{" "}
                {/* From your account dashboard you can view your{" "} */}
                <a href="account-orders.html" className="text-underline">
                  đơn đặt hàng gần đây
                  {/* recent orders */}
                </a>
                , quản lý{" "} bạn về {" "}
                {/* , manage your{" "} */}
                <a href="account-address.html" className="text-underline">
                   địa chỉ giao hàng và thanh toán
                  {/* shipping and billing addresses */}
                </a>
                , và{" "}
                {/* , and{" "} */}
                <a href="account-profile.html" className="text-underline">
                  chỉnh sửa mật khẩu và thông tin tài khoản của bạn
                  {/* edit your password and account details */}
                </a>
                .
              </p>
            </div>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="total-contain">
                  <div className="total-icon">
                    <svg
                      width={36}
                      height={37}
                      viewBox="0 0 36 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M32.4473 8.03086C32.482 8.37876 32.5 8.73144 32.5 9.08829C32.5 14.919 27.7564 19.6625 21.9258 19.6625C16.0951 19.6625 11.3516 14.919 11.3516 9.08829C11.3516 8.73144 11.3695 8.37876 11.4042 8.03086H8.98055L8.05537 0.628906H0.777344V2.74375H6.18839L8.56759 21.7774H34.1868L35.8039 8.03086H32.4473Z"
                        fill="#FFBB38"
                      />
                      <path
                        d="M9.09669 26.0074H6.06485C4.31566 26.0074 2.89258 27.4305 2.89258 29.1797C2.89258 30.9289 4.31566 32.352 6.06485 32.352H6.24672C6.12935 32.6829 6.06485 33.0386 6.06485 33.4094C6.06485 35.1586 7.48793 36.5816 9.23711 36.5816C11.4247 36.5816 12.9571 34.4091 12.2274 32.352H22.1081C21.377 34.413 22.9157 36.5816 25.0985 36.5816C26.8476 36.5816 28.2707 35.1586 28.2707 33.4094C28.2707 33.0386 28.2061 32.6829 28.0888 32.352H30.3856V30.2371H6.06485C5.48178 30.2371 5.00742 29.7628 5.00742 29.1797C5.00742 28.5966 5.48178 28.1223 6.06485 28.1223H33.4407L33.9384 23.8926H8.83233L9.09669 26.0074Z"
                        fill="#FFBB38"
                      />
                      <path
                        d="M21.9262 17.5477C26.5907 17.5477 30.3856 13.7528 30.3856 9.08829C30.3856 4.42378 26.5907 0.628906 21.9262 0.628906C17.2616 0.628906 13.4668 4.42378 13.4668 9.08829C13.4668 13.7528 17.2617 17.5477 21.9262 17.5477ZM20.8688 5.91602H22.9836V8.6503L24.7886 10.4554L23.2932 11.9508L20.8687 9.5262V5.91602H20.8688Z"
                        fill="#FFBB38"
                      />
                    </svg>
                  </div>
                  <div className="total-detail">
                    <span className="text">
                    Tổng số đơn hàng
                      {/* Total Order */}
                    </span>
                    <h2 className="title">{orderStats.totalOrders}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="total-contain">
                  <div className="total-icon">
                    <svg
                      width={33}
                      height={27}
                      viewBox="0 0 33 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30.2253 12.8816H29.4827L28.6701 9.36514C28.376 8.10431 27.2552 7.22168 25.9662 7.22168H21.8474V3.84528C21.8474 2.03804 20.3764 0.581055 18.5831 0.581055H3.17237C1.46313 0.581055 0.0761719 1.96801 0.0761719 3.67717V20.0967C0.0761719 21.8058 1.46313 23.1928 3.17237 23.1928H4.29313C4.89555 25.1962 6.74485 26.6533 8.93037 26.6533C11.1159 26.6533 12.9792 25.1962 13.5816 23.1928C13.8455 23.1928 20.3459 23.1928 20.1942 23.1928C20.7966 25.1962 22.6459 26.6533 24.8315 26.6533C27.031 26.6533 28.8803 25.1962 29.4827 23.1928H30.2253C31.7663 23.1928 32.9992 21.9599 32.9992 20.4189V15.6555C32.9992 14.1145 31.7663 12.8816 30.2253 12.8816ZM8.93037 23.8513C7.78968 23.8513 6.88491 22.8969 6.88491 21.7918C6.88491 20.657 7.79558 19.7324 8.93037 19.7324C10.0652 19.7324 10.9898 20.657 10.9898 21.7918C10.9898 22.9151 10.0692 23.8513 8.93037 23.8513ZM13.9739 8.06224L9.79897 11.3125C9.20227 11.7767 8.30347 11.6903 7.82363 11.0604L6.21247 8.94486C5.7361 8.32843 5.86222 7.4458 6.47866 6.98346C7.08107 6.50717 7.96369 6.63321 8.44006 7.24965L9.19656 8.23035L12.2507 5.84867C12.8531 5.3864 13.7357 5.48448 14.2121 6.10092C14.6884 6.71727 14.5763 7.58595 13.9739 8.06224ZM24.8315 23.8513C23.6906 23.8513 22.7861 22.8969 22.7861 21.7918C22.7861 20.657 23.7107 19.7324 24.8315 19.7324C25.9662 19.7324 26.8909 20.657 26.8909 21.7918C26.8909 22.9166 25.9683 23.8513 24.8315 23.8513ZM22.618 10.0236H25.2798C25.6021 10.0236 25.8962 10.2337 26.0083 10.542L26.8629 13.0497C27.031 13.5541 26.6667 14.0724 26.1344 14.0724H22.618C22.1976 14.0724 21.8474 13.7222 21.8474 13.3019V10.7942C21.8474 10.3739 22.1976 10.0236 22.618 10.0236Z"
                        fill="#FFBB38"
                      />
                    </svg>
                  </div>
                  <div className="total-detail">
                    <span className="text">
                    Tổng số đơn hàng chờ xử lý
                      {/* Total Pending Order */}
                    </span>
                    <h2 className="title">{orderStats.processingOrders}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                      <div className="form-group">
                        <label>Thống kê theo:</label>
                        <select className="form-control"
                                value={statType}
                                onChange={e => setStatType(e.target.value)}>
                          <option value="day">Ngày</option>
                          <option value="week">Tuần</option>
                          <option value="month">Tháng</option>
                          <option value="year">Năm</option>
                        </select>
                      </div>
                    </div>

                    {/* Biểu đồ doanh thu */}
                    <div className="col-xl-12">
                      <div className="sales-chart-wraper">
                        <canvas ref={chartRef} height="100"></canvas>
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

export default Dashboard;