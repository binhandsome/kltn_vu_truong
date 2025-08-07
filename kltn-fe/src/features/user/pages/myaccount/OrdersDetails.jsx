// src/pages/common/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import QuickViewModal from '../../components/home/QuickViewModal';
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom';
import { getOrderDetails } from '../../apiService/orderService';
import { getUserProfileById } from '../../apiService/userService';
import { useParams } from 'react-router-dom';
import WOW from 'wowjs'; // Import WOW.js
import { useLocation } from "react-router-dom";
import { param } from 'jquery';
import { useNavigate } from "react-router-dom";
import { Box, Modal, Button, TextField, Typography, IconButton } from '@mui/material';
const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: '#fff',
	borderRadius: 3,
	boxShadow: 24,
	p: 4,
};

const starColors = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6'];
function OrdersDetails() {
	const { orderId } = useParams();
	const [hasBgClass, setHasBgClass] = useState(true);
	const [userProfile, setUserProfile] = useState(null);
	const [returnReason, setReturnReason] = useState('');
	const [refundRequest, setRefundRequest] = useState(false);
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
	const location = useLocation();
	const [saveAddress, setSaveAddress] = useState('');
	const [toastMessage, setToastMessage] = useState('');
	const [openEvaluate, setOpenEvaluate] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [selectedItem, setSelectedItem] = useState([]);

	const [comment, setComment] = useState("");
	const [rating, setRating] = useState(0);
	const [images, setImages] = useState([]);
	const [previewImages, setPreviewImages] = useState([]);
	const ratingDescriptions = [
		'Rất tệ',
		'Tệ',
		'Bình thường',
		'Tốt',
		'Tuyệt vời'
	];

	const handleOpenEvaluate1 = () => setOpenEvaluate(true);
	const handleCloseEvaluate = () => setOpenEvaluate(false);
	const showToastMessage = (msg) => {
		setToastMessage(msg);
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 1500);
	};
	const [selectedOrder, setSelectedOrder] = useState(null); // Lưu order được chọn
	const [recipientName, setRecipientName] = useState('');
	const [id, setId] = useState();
	const { order } = location.state || {}; // 👈 Lấy data từ Link state
	const [open, setOpen] = React.useState(false);
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
	const timelineData = [
		{ status: "pending", label: "Order Placed", date: "10/04/2024 2:36pm" },
		{ status: "packed", label: "Product Packaging", date: "09/04/2024 4:34pm" },
		{ status: "shipped", label: "Product Shipped", date: "08/04/2024 5:23pm", courier: "UPS, R. Gosling", estimated: "09/04/2024" },
		{ status: "delivered", label: "Delivered", date: "09/04/2024 6:00pm" },
		{ status: "failed", label: "Delivery Failed", date: "09/04/2024 7:00pm" },
	];
	const getBadgeClass = (status) => {
		switch (status) {
			case "delivered":
				return "success";     // xanh lá=
			case "shipped":
				return "primary";     // xanh dương
			case "packed":
				return "info";        // xanh nhạt
			case "pending":
				return "secondary";   // xám
			case "failed":
				return "danger";      // đỏ
			default:
				return "";
		}
	};
	const cancelButton = async (orderId) => {
		const confirmCancel = window.confirm("Bạn có chắc muốn hủy đơn hàng này?");
		if (!confirmCancel) return;

		const accessToken = localStorage.getItem('accessToken');

		try {
			const response = await axios.put(
				"http://localhost:8086/api/orders/updateMethodOrder",
				{}, // body rỗng
				{
					params: {
						orderId: orderId, // ✅ Đổi từ "id" thành "orderId"
						method: 'cancel',
					},
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			showToastMessage("✅ Đã hủy đơn hàng thành công!");

			setTimeout(() => {
				navigate("/user/myaccount/orders");
			}, 1000);
		} catch (error) {
			showToastMessage("❌ Hủy đơn hàng thất bại!");
			console.error('Lỗi:', error.response?.data || error.message);
		}
	};
	const updateAddress = async (orderId) => {
		console.log("🛠 orderId:", orderId); // Debug

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
				payload, // ✅ Body JSON
				{
					params: {
						orderId: orderId, // ✅ Chỉ param đơn giản
						method: 'updateaddress',
					},
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);
			console.log("✅ Cập nhật địa chỉ thành công:", response.data);
		} catch (error) {
			console.error("❌ Lỗi khi cập nhật địa chỉ:", error.response?.data || error.message);
		}
	};

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
	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		setImages(files);

		// Create preview URLs for selected images
		const previews = files.map(file => URL.createObjectURL(file));
		setPreviewImages(previews);
	};

	const handleStarClick = (star) => {
		setRating(star);
	};

	const addEvaluate = async () => {
		try {
			const formData = new FormData();
			const data = {
				orderItemId: selectedItem.orderItemId,
				productAsin: selectedItem.asin,
				comment,
				rating,
			};
			formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));

			// Append each file to formData
			images.forEach((file) => {
				formData.append("files", file);
			});

			const response = await axios.post("http://localhost:8083/api/products/uploadImgToProductEvaluate", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log("✅ Success:", response.data);
			setToastMessage("Đã đánh giá thành công");
			setShowToast(true);
			setComment('');
			setRating(0);
			setImages([]);
			setPreviewImages([]);
			setTimeout(() => {
				navigate('/user/myaccount/orders');
			}, 2000);
		} catch (error) {
			console.error("Error submitting evaluation:", error);
			alert("Failed to submit evaluation. Please try again.");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!comment || rating === 0) {
			alert("Please provide a comment and rating");
			return;
		}
		addEvaluate();
	};

	const handleOpenEvaluate = (orderItem) => {
		setSelectedItem(orderItem);
		setOpenEvaluate(true);
	}


	useEffect(() => {
		console.log("📦 [Order Details] Data nhận từ Link:", order);
	}, [order]);
	useEffect(() => {
		if (hasBgClass) {
			document.body.classList.add('bg');
		} else {
			document.body.classList.remove('bg');
		}
		return () => {
			document.body.classList.remove('bg');
		};
	}, [hasBgClass]);

	useEffect(() => {
		const wow = new WOW.WOW();
		wow.init();
	}, []);


	// const cancelOrder = async () => {
	// 	if (!order?.orderId) return;
	// 	try {
	// 		const token = localStorage.getItem("accessToken");
	// 		const confirmCancel = window.confirm("Bạn có chắc muốn huỷ đơn này?");
	// 		if (!confirmCancel) return;

	// 		const res = await axios.put(`http://localhost:8086/api/orders/${order.orderId}/cancel`, {}, {
	// 			headers: { Authorization: `Bearer ${token}` }
	// 		});

	// 		alert("Đơn hàng đã được huỷ!");
	// 		window.location.reload();
	// 	} catch (err) {
	// 		console.error("❌ Cancel error:", err);
	// 		alert(err?.response?.data?.error || "Không thể huỷ đơn hàng!");
	// 	}
	// };

	const requestReturn = async () => {
		if (!order?.orderId) return;
		const reason = prompt("Nhập lý do trả hàng:");
		if (!reason || reason.trim() === "") {
			alert("Bạn cần nhập lý do để tiếp tục.");
			return;
		}

		try {
			const token = localStorage.getItem("accessToken");
			const res = await axios.post(`http://localhost:8086/api/orders/${order.orderId}/return`, {
				reason
			}, {
				headers: { Authorization: `Bearer ${token}` }
			});

			alert("Yêu cầu trả hàng đã được gửi!");
		} catch (err) {
			console.error("❌ Return request error:", err);
			alert(err?.response?.data?.error || "Không thể gửi yêu cầu trả hàng!");
		}
	};
	// Dat lai
	const handleReorder = async (orderItems) => {
		const cartItems = orderItems.map(item => ({
			productId: item.productId,
			colorName: item.color,
			sizeName: item.size,
			quantity: item.quantity,
		}));

		localStorage.setItem("reorderItems", JSON.stringify(cartItems));
		navigate("/user/shoppages/cart?fromReorder=true");
	};


	const formatDate = (timestamp) => {
		if (!timestamp) return '';
		const date = new Date(timestamp);
		return date.toLocaleString('en-GB');
	};

	return (
		<>
			<div className="page-wraper">
				<div className="page-content bg-light">
					<div
						className="dz-bnr-inr bg-secondary overlay-black-light"
						style={{ backgroundImage: "url(../../assets/user/images/background/bg1.jpg)" }}
					>
						<div className="container">
							<div className="dz-bnr-inr-entry">
								<h1>Order Details</h1>
								<nav aria-label="breadcrumb" className="breadcrumb-row">
									<ul className="breadcrumb">
										<li className="breadcrumb-item">
											<a href="/"> Home</a>
										</li>
										<li className="breadcrumb-item">Order Details</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>

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
									onClick={() => updateAddress(id)}
									className="btn btn-secondary me-xl-3 me-2 m-b15 btnhover20"
								>
									Sửa Địa Chỉ
								</a>

							</Typography>

						</Box>
					</Modal>
					<Modal open={openEvaluate} onClose={handleCloseEvaluate}>
						<Box sx={modalStyle}>
							<Typography variant="h6" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
								Đánh Giá Sản Phẩm:
								<p>{selectedItem.productTitle}</p>
							</Typography>

							{/* Rating */}
							<Box sx={{ mb: 3, textAlign: 'center' }}>
								<Typography variant="subtitle2" gutterBottom>
									Số sao:
								</Typography>

								{/* Dãy sao */}
								<Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
									{[1, 2, 3, 4, 5].map((star, i) => (
										<IconButton
											key={star}
											onClick={() => setRating(star)}
											sx={{
												width: 40,
												height: 40,
												borderRadius: '50%',
												bgcolor: rating === star ? starColors[i] : '#e5e7eb',
												color: rating === star ? '#fff' : '#9ca3af',
												fontSize: 22,
												transition: '0.2s',
												'&:hover': {
													bgcolor: rating === star ? starColors[i] : '#d1d5db',
												},
											}}
										>
											★
										</IconButton>
									))}
								</Box>

								{/* Mô tả tương ứng số sao */}
								{rating > 0 && (
									<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
										{ratingDescriptions[rating - 1]}
									</Typography>
								)}
							</Box>

							{/* Comment */}
							<Box sx={{ mb: 3 }}>
								<Typography variant="subtitle2" gutterBottom>
									Nhận xét:
								</Typography>
								<TextField
									multiline
									fullWidth
									rows={4}
									value={comment}
									onChange={(e) => setComment(e.target.value)}
									placeholder="Hãy chia sẻ trải nghiệm của bạn..."
								/>
							</Box>

							{/* Upload */}
							<Box sx={{ mb: 3 }}>
								<Typography variant="subtitle2" gutterBottom>
									Tải ảnh sản phẩm:
								</Typography>
								<input
									type="file"
									multiple
									accept="image/*"
									onChange={handleImageChange}
									style={{
										border: '1px solid #d1d5db',
										borderRadius: 6,
										padding: '8px 12px',
										fontSize: 14,
										width: '100%',
									}}
								/>
							</Box>

							{/* Preview */}
							{previewImages.length > 0 && (
								<Box sx={{ mb: 3 }}>
									<Typography variant="subtitle2" gutterBottom>
										Xem trước:
									</Typography>
									<Box sx={{ display: 'flex', gap: 1, overflowX: 'auto' }}>
										{previewImages.map((src, i) => (
											<img
												key={i}
												src={src}
												alt={`preview-${i}`}
												style={{
													width: 80,
													height: 80,
													objectFit: 'cover',
													borderRadius: 8,
													border: '1px solid #e5e7eb',
												}}
											/>
										))}
									</Box>
								</Box>
							)}

							{/* Submit button */}
							<Button
								fullWidth
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								sx={{ fontWeight: 'bold', py: 1.5 }}
							>
								Gửi đánh giá
							</Button>
						</Box>
					</Modal>
					{/*Banner End*/}
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
														src={userProfile?.profilePicture || "https://www.w3schools.com/howto/img_avatar.png"}
														alt="User Avatar"
													/>
												</div>
												<h5 className="title mb-0">{order?.receiverName || 'Ronald M. Spino'}</h5>
												<span className="text text-primary">{order?.receiverEmail || 'info@example.com'}</span>
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
								<section className="col-xl-9 account-wrapper">
									{order?.listOfOrders?.map((orderStore, index) => (
										<div className="account-card order-details" key={`order-${index}`}>
											<div className="order-head">
												<div className="head-thumb">
													<img src={orderStore.thumbnailAndTitleShop?.thumbnail} alt="" />
												</div>
												<div className="clearfix m-l20">
													<div className="badge">{orderStore.status}</div>
													<h4 className="mb-0">{orderStore.thumbnailAndTitleShop?.title}</h4>
												</div>
											</div>
											<div className="row mb-sm-4 mb-2">
												<div className="col-sm-6">
													<div className="shiping-tracker-detail">
														<span>Trước giảm giá</span>
														<h6 className="title">{orderStore.subTotal}$</h6>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="shiping-tracker-detail">
														<span>Sau giảm giá</span>
														<h6 className="title">{orderStore.discountedSubtotal}$</h6>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="shiping-tracker-detail">
														<span>Trạng Thái</span>
														<h6 className="title">{orderStore.status}</h6>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="shiping-tracker-detail">
														<span>Phương Thức Vận Chuyển</span>
														<h6 className="title">{orderStore.nameShippingMethod}</h6>
													</div>
												</div>
											</div>
											<div className="content-btn m-b15">
												{/* <a  className="btn btn-secondary me-xl-3 me-2 m-b15 btnhover20" onClick={() => handleOpen(order)}>Sửa Địa Chỉ</a> */}
												{/* <a href="product-default.html" className="btn btn-outline-secondary m-b15 me-xl-3 me-2 btnhover20">Trả Đơn Hàng</a> */}
												{orderStore.status === "failed" ? (
													<button
														onClick={() => handleReorder(orderStore.orderItemResponses)}
														className="btn btn-secondary m-b15 btnhover20"
													>
														Đặt Lại
													</button>
												) : (
													<a
														onClick={() => cancelButton(orderStore.orderId)}
														className="btn btn-outline-danger m-b15 btnhover20"
													>
														Hủy Đơn
													</a>
												)}

											</div>
											<div className="clearfix">
												<div className="dz-tabs style-3">
													<div className="nav nav-tabs" id={`nav-tab-${index}`} role="tablist">
														<button
															className="nav-link active"
															id={`nav-order-history-tab-${index}`}
															data-bs-toggle="tab"
															data-bs-target={`#nav-order-history-${index}`}
															role="tab"
															aria-controls={`nav-order-history-${index}`}
															aria-selected="true"
														>
															Lịch Sử Vận Chuyển
														</button>
														<button
															className="nav-link"
															id={`nav-Item-tab-${index}`}
															data-bs-toggle="tab"
															data-bs-target={`#nav-Item-${index}`}
															role="tab"
															aria-controls={`nav-Item-${index}`}
															aria-selected="false"
														>
															Thông Tin Sản Phẩm
														</button>
													</div>
												</div>
												<div className="tab-content" id={`nav-tabContent-${index}`}>
													<div
														className="tab-pane fade show active"
														id={`nav-order-history-${index}`}
														role="tabpanel"
														aria-labelledby={`nav-order-history-tab-${index}`}
														tabIndex="0"
													>
														<div className="widget-timeline style-1">
															<ul className="timeline">
																{timelineData.map((item, index) => {
																	const isActive = item.status === orderStore.status;
																	return (
																		<li key={index} className={isActive ? "active-status" : ""}>
																			<div className={`timeline-badge ${getBadgeClass(item.status)}`}>
																				{isActive && <span className="arrow-indicator">➤</span>}
																			</div>
																			<div className="timeline-box">
																				<a className="timeline-panel" href="javascript:void(0);">
																					<h6 className="mb-0">
																						{item.label}{" "}
																						{isActive && (
																							<span style={{ color: "#007bff", fontSize: "13px" }}>
																								(Hiện tại)
																							</span>
																						)}
																					</h6>
																					<span>{item.date}</span>
																				</a>
																				{item.courier && (
																					<p>
																						<strong>Courier Service: </strong>
																						{item.courier}
																					</p>
																				)}
																				{item.estimated && (
																					<p>
																						<strong>Estimated Delivery Date: </strong>
																						{item.estimated}
																					</p>
																				)}
																				{item.tracking && (
																					<p>
																						<strong>Tracking Number: </strong>
																						{item.tracking}
																					</p>
																				)}
																			</div>
																		</li>
																	);
																})}
															</ul>

														</div>
													</div>
													<div
														className="tab-pane fade"
														id={`nav-Item-${index}`}
														role="tabpanel"
														aria-labelledby={`nav-Item-tab-${index}`}
														tabIndex="0"
													>
														<h5>Chi Tiết Sản Phẩm</h5>
														{orderStore?.orderItemResponses?.map((orderItem, itemIndex) => (

															<div className="tracking-item" key={`order-item-${index}-${itemIndex}`} style={{
																display: 'flex',
																alignItems: 'flex-start',
																gap: '16px',
																marginBottom: '24px'
															}}>
																{/* Ảnh sản phẩm */}
																<div className="tracking-product">
																	<img
																		src={
																			orderItem?.productThumbnail?.startsWith('http')
																				? orderItem?.productThumbnail
																				: orderItem?.productThumbnail?.endsWith('.jpg')
																					? `https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${orderItem?.productThumbnail}`
																					: `/uploads/${orderItem?.productThumbnail}`
																		}
																		alt=""
																		style={{
																			width: '100px',
																			height: '70px',
																			objectFit: 'cover',
																			borderRadius: '12px',
																		}}
																	/>
																</div>

																{/* Nội dung + nút đánh giá */}
																<div style={{
																	flex: 1,
																	display: 'flex',
																	justifyContent: 'space-between',
																	alignItems: 'center',
																	flexWrap: 'wrap'
																}}>
																	<div>
																		<h6 className="title">{orderItem?.productTitle}</h6>
																		<small className="d-block"><strong>Price</strong>: ${orderItem?.unitPrice}</small>
																		<small className="d-block"><strong>Size</strong>: {orderItem?.size}</small>
																		<small className="d-block"><strong>Color</strong>: {orderItem?.color}</small>
																		<small className="d-block"><strong>Quantity</strong>: {orderItem?.quantity}</small>
																	</div>

																	<div style={{ marginTop: '10px' }}>
																		{orderStore.status === "delivered" && (
																			orderItem.isEvaluate === 0 ? (
																				<button
																					onClick={() => handleOpenEvaluate(orderItem)}
																					style={{
																						padding: '10px 24px',
																						fontSize: '16px',
																						fontWeight: 'bold',
																						color: '#fff',
																						background: 'linear-gradient(to right, #ec4899, #ef4444, #facc15)',
																						border: 'none',
																						borderRadius: '9999px',
																						boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
																						cursor: 'pointer',
																						transition: 'all 0.3s ease'
																					}}
																					onMouseOver={(e) => {
																						e.target.style.transform = 'scale(1.05)';
																						e.target.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.3)';
																					}}
																					onMouseOut={(e) => {
																						e.target.style.transform = 'scale(1)';
																						e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
																					}}
																				>
																					Đánh giá
																				</button>
																			) : (
																				<span>Bạn đã đánh giá</span>
																			)
																		)}
																	</div>
																</div>
															</div>


														))}
														<div className="tracking-item-content">
															<span>Total Price</span>
															<h6>+ ${orderStore.subTotal}</h6>
														</div>
														<div className="tracking-item-content border-bottom border-light mb-2">
															<span className="text-success">Total Discounts</span>
															<h6>- ${(orderStore.subTotal - orderStore.discountedSubtotal).toFixed(2)}</h6>
														</div>
														<div className="tracking-item-content">
															<span>Order Total</span>
															<h6>${orderStore.discountedSubtotal}</h6>
														</div>


													</div>
												</div>
											</div>
										</div>
									))}

								</section>
							</div>
						</div>
					</div>
				</div>


				{/* Footer (đã được xử lý trong App.js) */}
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

export default OrdersDetails;