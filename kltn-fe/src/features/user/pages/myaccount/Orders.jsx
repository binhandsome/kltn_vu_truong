import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import QuickViewModal from '../../components/home/QuickViewModal';
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom';
import WOW from 'wowjs';
import { Button, Modal, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Orders() {
	const [hasBgClass, setHasBgClass] = useState(true);
	const [orders, setOrders] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [myOrders, setMyOrders] = useState([]);
	const pageSize = 10;
	const [loading, setLoading] = useState(false); // Trạng thái loading
	const [error, setError] = useState(null); // Trạng thái lỗi
	const navigate = useNavigate();
	const [provinces, setProvinces] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [wards, setWards] = useState([]);
	const [country, setCountry] = useState('');
	const [district, setDistrict] = useState('');
	const [ward, setWard] = useState('');
	const [selectedProvince, setSelectedProvince] = useState(null);
	const [selectedDistrict, setSelectedDistrict] = useState(null);
	const [street, setStreet] = useState('');
	const [optionalStreet, setOptionalStreet] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [saveAddress, setSaveAddress] = useState('');
	const [selectedOrder, setSelectedOrder] = useState(null); // Lưu order được chọn
	const [recipientName, setRecipientName] = useState('');
	const [id, setId] = useState();
	const [toastMessage, setToastMessage] = useState('');
const [showToast, setShowToast] = useState(false);

const showToastNow = (msg) => {
  setToastMessage(msg);
  setShowToast(true);
  setTimeout(() => setShowToast(false), 1500); // tự ẩn sau 1.5s
};
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '70%',
		maxWidth: '100%',
		maxHeight: '80vh',     // 👈 Giới hạn chiều cao tối đa modal
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 4,
		overflowY: 'auto',     // 👈 Thêm scroll dọc nếu nội dung vượt quá maxHeight
		borderRadius: '8px'
	};
	const [open, setOpen] = React.useState(false);
	const handleOpen = (order) => {
		if (!order) return;

		const addressDetails = order?.deliveryAddress?.addressDetails || "";
		let province = "", district = "", wardName = "";

		if (addressDetails) {
			const parts = addressDetails.split(",").map(item => item.trim());
			province = parts[0] || "";
			district = parts[1] || "";
			wardName = parts[2] || "";
		}
		const deliveryAddress = order?.deliveryAddress?.deliveryAddress || "";
		let streetOrder = "", optionStreetOrder = "";
		if (deliveryAddress) {
			const parts = deliveryAddress.split("/").map(item => item.trim());
			streetOrder = parts[0] || "";
			optionStreetOrder = parts[1] || "";
		}
		// ✅ Set state đồng bộ
		setSelectedProvince(province);
		setSelectedDistrict(district);
		setWard(wardName);
		setStreet(streetOrder);
		setOptionalStreet(optionStreetOrder);
		setSaveAddress(addressDetails);
		setSelectedOrder(order);
		setPhone(order?.deliveryAddress?.recipientPhone)
		setEmail(order?.deliveryAddress?.recipientEmail)
		setRecipientName(order?.deliveryAddress?.recipientName)
		setId(order?.masterOrderId)
		setOpen(true);
	};



	useEffect(() => {
		console.log("📌 selectedOrder:", selectedOrder);
		console.log("📌 Province:", selectedProvince);
		console.log("📌 District:", selectedDistrict);
		console.log("📌 Ward:", ward);
		console.log("📌 streetOrder:", street);
		console.log("📌 optionStreetOrder:", optionalStreet);
	}, [selectedOrder, selectedProvince, selectedDistrict, ward]);
	const handleClose = () => {
		setOpen(false);
		setSelectedOrder(null);  // Reset lại khi đóng
	};
	useEffect(() => {
		if (hasBgClass) document.body.classList.add('bg');
		return () => document.body.classList.remove('bg');
	}, [hasBgClass]);

	useEffect(() => {
		new WOW.WOW().init();
	}, []);
	const getMyOrder = async () => {
		console.log("📦 [getMyOrder] Bắt đầu gọi API...");
		const accessToken = localStorage.getItem("accessToken");
		console.log("🔑 [Token]", accessToken);
		try {
			setLoading(true);
			const response = await axios.get(
				"http://localhost:8086/api/orders/getOrderByIdUser",
				{
					headers: {
						Authorization: `Bearer ${accessToken}`, // 👈 Thêm Bearer
					},
				}
			);

			console.log("✅ [API Response]", response);
			console.log("📂 [Response Data]", response.data);

			setMyOrders(response.data);
		} catch (err) {
			console.error("❌ [API Error]", err);
			if (err.response) {
				console.error("⚠️ [Error Response]", err.response);
			}
			setError(err);
		} finally {
			setLoading(false);
			console.log("⏳ [getMyOrder] Kết thúc gọi API.");
		}
	};

	useEffect(() => {
		console.log("🚀 [useEffect] Component mount -> gọi getMyOrder()");
		getMyOrder();

		return () => {
			console.log("🧹 [useEffect Cleanup] Component unmount");
		};
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
	const updateAddress = async (orderId) => {
		console.log("🛠 orderId:", orderId);
	  
		const accessToken = localStorage.getItem("accessToken");
	  
		const payload = {
		  recipientName,
		  recipientPhone: phone,
		  recipientEmail: email,
		  addressDetails: `${selectedProvince}, ${selectedDistrict}, ${ward}`,
		  deliveryAddress: `${street} / ${optionalStreet}`,
		};
	  
		try {
		  const response = await axios.put(
			"http://localhost:8086/api/orders/updateMethodOrder",
			payload, // ✅ Body là DeliveryAddressDTO
			{
			  params: {
				orderId: orderId,
				method: 'updateaddress',
			  },
			  headers: {
				Authorization: `Bearer ${accessToken}`, // ✅ để server xác định user & gọi user-service
				"Content-Type": "application/json",
			  },
			}
		  );
	  
		  console.log("✅ Server response:", response.data);
		  showToastNow("✅ Đã cập nhật địa chỉ thành công");
		  setOpen(false);
		  await getMyOrder(); 
		} catch (error) {
		  console.error("❌ Lỗi khi cập nhật địa chỉ:", error.response?.data || error.message);
		  showToastNow("❌ Cập nhật địa chỉ thất bại!");
		}
	  };
	  

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
	useEffect(() => {
		const fetchProvinces = async () => {
			try {
				const res = await axios.get("https://provinces.open-api.vn/api/?depth=3");
				setProvinces(res.data);
			} catch (error) {
				console.error("Lỗi khi gọi API tỉnh/thành:", error);
			}
		};

		fetchProvinces();
	}, []);
	useEffect(() => {
		if (selectedProvince) {
			const found = provinces.find((p) => p.name === selectedProvince);
			setDistricts(found?.districts || []);

			// ✅ Chỉ reset district nếu người dùng chọn lại province thủ công (không reset khi mở modal)
			if (!selectedOrder) {
				setSelectedDistrict("");
				setWards([]);
			}

			console.log("Đã chọn tỉnh:", selectedProvince);
		}
	}, [selectedProvince, provinces]);

	// Update wards when a district is selected
	useEffect(() => {
		if (selectedDistrict) {
			const found = districts.find((d) => d.name === selectedDistrict);
			setWards(found?.wards || []);
			console.log("Đã chọn quận:", selectedDistrict);
		}
	}, [selectedDistrict, districts]);
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
					<div>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box sx={style}>
								<Typography id="modal-modal-title" variant="h6" component="h2">
									Địa Chỉ
								</Typography>
								<Typography id="modal-modal-description" sx={{ mt: 2 }}>
										<div className="col-md-12">
										<div className="form-group m-b25">
											<label className="label-title">Họ Và Tên</label>
											<input name="dzName" required="" className="form-control" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
										</div>

									</div>
									<div className="col-md-12">
										<div className="m-b25">
											<label className="label-title">Tỉnh/ Thành Phố</label>
											<select className="default-select form-select w-100" value={selectedProvince || ""} onChange={(e) => {
												setSelectedProvince(e.target.value);
											}}>
												<option selected="" value="">Lựa chọn</option>
												{provinces.map((province) => (
													<option key={province.code} value={province.name}>{province.name}</option>
												))}
											</select>
										</div>
									</div>
									{districts.length > 0 && (
										<div className="col-md-12">
											<div className="m-b25">
												<label className="label-title">Huyện/ Quận *</label>
												<select className="default-select form-select w-100" value={selectedDistrict || ""} onChange={(e) => setSelectedDistrict(e.target.value)}>
													<option selected="">Lựa chọn</option>
													{districts.map((district) => (
														<option key={district.code} value={district.name}>{district.name}</option>
													))}
												</select>
											</div>
										</div>
									)}
									{wards.length > 0 && (
										<div className="col-md-12">
											<div className="m-b25">
												<label className="label-title">Xã/ Phường *</label>
												<select className="default-select form-select w-100" value={ward} onChange={(e) => {
													setWard(e.target.value);
													console.log(ward)
												}
												} >
													<option selected="">Lựa chọn</option>
													{wards.map((ward) => (
														<option key={ward.code} value={ward.name}> {ward.name}</option>
													))}
												</select>
											</div>
										</div>
									)}
									<div className="col-md-12">
										<div className="form-group m-b25">
											<label className="label-title">Địa chỉ cụ thể *</label>
											<input
												name="dzName"
												required=""
												className="form-control m-b15"
												placeholder="Số nhà và tên đường"
												value={street}
												onChange={(e) => setStreet(e.target.value)}
											/>
											<input
												name="dzName"
												required=""
												className="form-control"
												placeholder="Căn hộ, phòng suite, đơn vị, v.v. (tùy chọn)"
												value={optionalStreet}
												onChange={(e) => setOptionalStreet(e.target.value)}
											/>
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group m-b25">
											<label className="label-title">SĐT *</label>
											<input name="dzName" required="" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group m-b25">
											<label className="label-title">Địa chỉ Email *</label>
											<input name="dzName" required="" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
										</div>

									</div>
									<a
  onClick={() => {
    const isEditable = selectedOrder?.listOfOrders?.every(
      (o) => o.status === "pending" || o.status === "packed"
    );
    if (!isEditable) {
      alert("❌ Chỉ được đổi địa chỉ khi tất cả đơn trong shop đều đang Pending hoặc Packed!");
      return;
    }

    // ✅ Xác nhận trước khi sửa
    const confirmEdit = window.confirm("Bạn có chắc muốn sửa địa chỉ không?");
    if (!confirmEdit) return;

    // ✅ Gọi hàm cập nhật và hiển thị toast
    updateAddress(selectedOrder?.masterOrderId)
      .then(() => {
        setToastMessage("✅ Đã cập nhật địa chỉ thành công");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        handleClose(); // đóng modal nếu cần
      })
      .catch((err) => {
        console.error("❌ Lỗi khi cập nhật địa chỉ:", err);
        setToastMessage("❌ Cập nhật địa chỉ thất bại");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      });
  }}
  className={`btn btn-secondary me-xl-3 me-2 m-b15 btnhover20 ${
    selectedOrder?.listOfOrders?.every((o) => o.status === "pending" || o.status === "packed") 
      ? "" 
      : "disabled"
  }`}
>
  Sửa Địa Chỉ
</a>
								</Typography>

							</Box>
						</Modal>
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
			<table className="table table-hover mb-4">
				<thead>
					<tr>
						<th>STT</th>
						<th>Ngày đặt hàng</th>
						<th>Trạng thái đơn hàng</th>
						<th>Tổng tiền</th>
						<th>Địa chỉ đặt hàng</th>
						<th>Hành động</th>
					</tr>
				</thead>
				<tbody>
					{myOrders?.map((order, index) => (
						<tr key={order.masterOrderId}>
							<td>{index + 1}</td> {/* ✅ STT đúng */}
							<td>{formatDate(order.createdAt)}</td>
							<td>
								<span className={`badge bg-${order.orderStatus === 'delivered' ? 'success' : order.orderStatus === 'cancelled' ? 'danger' : 'info'} m-0`}>
									{order.orderStatus}
								</span>
							</td>
							<td>${order.totalAmount?.toFixed(2)}</td>
							<td>
								<button className="btn btn-sm btn-outline-success" onClick={() => handleOpen(order)}>
									Xem địa chỉ
								</button>
							</td>
							<td>
								<div className="d-flex flex-column gap-1">
									<Link to="/user/myaccount/ordersdetails" state={{ order }} className="btn btn-sm btn-outline-primary">
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
					))}
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
				{showToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          padding: '12px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          transition: 'opacity 0.5s ease-in-out'
        }}>
          {toastMessage}
        </div>
      )}
			</div>
		</>
	);
}

export default Orders;
