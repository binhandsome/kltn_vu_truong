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
													<img className="rounded-circle" src="../../assets/user/images/profile4.jpg" alt="User" />
												</div>
												<h5 className="title mb-0">Ronald M. Spino</h5>
												<span className="text text-primary">info@example.com</span>
											</div>
											<div className="account-nav">
												<div className="nav-title bg-light">DASHBOARD</div>
												<ul>
													<li><a href="/myaccount/dashboard">Dashboard</a></li>
													<li><a href="/myaccount/orders">Orders</a></li>
													<li><a href="/myaccount/download">Downloads</a></li>
													<li><a href="/myaccount/returnRequest">Return request</a></li>
												</ul>
												<div className="nav-title bg-light">ACCOUNT SETTINGS</div>
												<ul className="account-info-list">
													<li><a href="/myaccount/profile">Profile</a></li>
													<li><a href="/myaccount/address">Address</a></li>
													<li><a href="/myaccount/shippingMethods">Shipping methods</a></li>
													<li><a href="/myaccount/paymentMethods">Payment Methods</a></li>
													<li><a href="/myaccount/review">Review</a></li>
												</ul>
											</div>
										</div>
									</div>
								</aside>

								<div className="col-xl-9 account-wrapper">
									<div className="account-card">
										<div className="table-responsive table-style-1">
											<table className="table table-hover mb-3">
												<thead>
  <tr>
    <th>Order #</th>
    <th>Date</th>
    <th>Status</th>
    <th>Total</th>
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Address</th>
    <th>Items</th>
    <th>Action</th>
  </tr>
</thead>

<tbody>
  {orders.length > 0 ? (
    orders.map((order) => (
      <tr key={order.orderId}>
        <td><span className="fw-medium">#{order.orderId}</span></td>
        <td>{formatDate(order.createdAt)}</td>
        <td>
          <span className={`badge bg-${order.orderStatus === 'delivered' ? 'success' : order.orderStatus === 'canceled' ? 'danger' : 'info'} m-0`}>
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
          <Link to={`/myaccount/orders/${order.orderId}`} className="btn-link text-underline p-0">View</Link>
        </td>
      </tr>
    ))
  ) : (
    <tr><td colSpan="10" className="text-center">Không có đơn hàng nào</td></tr>
  )}
</tbody>
											</table>
										</div>

										{/* Pagination */}
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
