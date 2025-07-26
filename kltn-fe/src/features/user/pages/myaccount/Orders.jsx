import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import QuickViewModal from '../../components/home/QuickViewModal';
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom';
import WOW from 'wowjs';

function Orders() {
	const [hasBgClass, setHasBgClass] = useState(true);
	const [orders, setOrders] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const pageSize = 10;

	useEffect(() => {
		if (hasBgClass) document.body.classList.add('bg');
		return () => document.body.classList.remove('bg');
	}, [hasBgClass]);

	useEffect(() => {
		new WOW.WOW().init();
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (!token) return;

		fetch(`http://localhost:8086/api/orders/user?page=${currentPage}&size=${pageSize}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.then(data => {
				setOrders(data.content || []);
				setTotalPages(data.totalPages || 0);
			})
			.catch(err => console.error("Fetch orders error:", err));
	}, [currentPage]);

	const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

	const handlePageChange = (newPage) => {
		if (newPage >= 0 && newPage < totalPages) setCurrentPage(newPage);
	};

	const handleCancelOrder = (orderId) => {
		const token = localStorage.getItem("accessToken");
		if (!token) return;

		if (!window.confirm("Bạn có chắc muốn huỷ đơn hàng này?")) return;

		fetch(`http://localhost:8086/api/orders/${orderId}/cancel`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.then(() => {
				alert("Huỷ đơn hàng thành công");
				setOrders(prev =>
					prev.map(o => o.orderId === orderId ? { ...o, orderStatus: "cancelled", canCancel: false } : o)
				);
			})
			.catch(err => console.error("Cancel error:", err));
	};

	const handleReturnOrder = (orderId) => {
		const token = localStorage.getItem("accessToken");
		if (!token) return;

		const reason = prompt("Nhập lý do trả hàng:");
		if (!reason) return;

		fetch(`http://localhost:8086/api/orders/${orderId}/return`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ reason })
		})
			.then(res => res.json())
			.then(() => {
				alert("Yêu cầu trả hàng đã được gửi");
				setOrders(prev =>
					prev.map(o => o.orderId === orderId ? { ...o, canReturn: false } : o)
				);
			})
			.catch(err => console.error("Return error:", err));
	};

	return (
		<>
			<div className="page-wraper">
				<div className="page-content bg-light">
					<div className="dz-bnr-inr bg-light" style={{ backgroundImage: `url('../assets/user/images/background/bg1.jpg')` }}>
						<div className="container">
							<div className="dz-bnr-inr-entry">
								<h1>Orders</h1>
								<nav aria-label="breadcrumb" className="breadcrumb-row">
									<ul className="breadcrumb">
										<li className="breadcrumb-item"><a href="/">Home</a></li>
										<li className="breadcrumb-item">Orders</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>

					<div className="content-inner-1">
						<div className="container">
							<div className="row">
								<aside className="col-xl-3">
									<div className="toggle-info">
										<h5 className="title mb-0">Account Navbar</h5>
										<a className="toggle-btn" href="#accountSidebar">Account Menu</a>
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
                    <a href="account-dashboard.html">
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

								<div className="col-xl-9 account-wrapper">
									<div className="account-card">
										<div className="table-responsive">
											<table className="table table-hover mb-3">
												<thead>
													<tr>
														<th>STT</th>
														<th>Ngày đặt hàng</th>
														<th>Trạng thái đơn hàng</th>
														<th>Tổng tiền</th>
														<th>Tên người dùng</th>
														<th>SĐT</th>
														<th>Email</th>
														<th>Địa chỉ đặt hàng</th>
														<th>Số lượng sản phẩm</th>
														<th>Hành động</th>
													</tr>
												</thead>
												<tbody>
													{orders.length > 0 ? (
														orders.map((order) => (
															<tr key={order.orderId}>
																<td><span className="fw-medium">#{order.orderId}</span></td>
																<td>{formatDate(order.createdAt)}</td>
																<td>
																	<span className={`badge bg-${order.orderStatus === 'delivered' ? 'success' : order.orderStatus === 'cancelled' ? 'danger' : 'info'} m-0`}>
																		{order.orderStatus}
																	</span>
																</td>
																<td>${order.totalAmount?.toFixed(2)}</td>
																<td>{order.recipientName || '—'}</td>
																<td>{order.recipientEmail || '—'}</td>
																<td>{order.recipientPhone || '—'}</td>
																<td>{order.deliveryAddress || '—'}</td>
																<td>{order.items?.length || 0}</td>
																<td>
																	<div className="d-flex flex-column gap-1">
																		<Link to={`/user/myaccount/orders/${order.orderId}`} className="btn btn-sm btn-outline-primary">
																			View
																		</Link>
																		{order.canCancel && (
																			<button className="btn btn-sm btn-outline-danger" onClick={() => handleCancelOrder(order.orderId)}>
																				Huỷ đơn
																			</button>
																		)}
																		{order.canReturn && (
																			<button className="btn btn-sm btn-outline-warning" onClick={() => handleReturnOrder(order.orderId)}>
																				Trả hàng
																			</button>
																		)}
																	</div>
																</td>
															</tr>
														))
													) : (
														<tr><td colSpan="10" className="text-center">Không có đơn hàng nào</td></tr>
													)}
												</tbody>
											</table>
										</div>

										<div className="d-flex justify-content-center">
											<nav aria-label="Orders Pagination">
												<ul className="pagination style-1">
													<li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
														<a className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Prev</a>
													</li>
													{Array.from({ length: totalPages }, (_, i) => (
														<li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
															<a className="page-link" onClick={() => handlePageChange(i)}>{i + 1}</a>
														</li>
													))}
													<li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
														<a className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
													</li>
												</ul>
											</nav>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<ScrollTopButton />
				<QuickViewModal />
			</div>
		</>
	);
}

export default Orders;
