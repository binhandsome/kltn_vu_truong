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
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
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
	const [quantity, setQuantity] = useState(1);
	const [selectedColor, setSelectedColor] = useState(null);
	const [selectedSize, setSelectedSize] = useState(null);
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
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [comment, setComment] = useState("");
	const [rating, setRating] = useState(0);
	const [images, setImages] = useState([]);
	const [priceDiscount, setPriceDiscount] = useState(0);
const { state } = useLocation();
	const [previewImages, setPreviewImages] = useState([]);
	const ratingDescriptions = [
		'Rất tệ',
		'Tệ',
		'Bình thường',
		'Tốt',
		'Tuyệt vời'
	];
	useEffect(() => {
		if (selectedProduct) {
			const discountPrice = (
				selectedProduct.productPrice * quantity -
				(selectedProduct.productPrice * selectedProduct.percentDiscount) / 100 * quantity
			).toFixed(2);
			setPriceDiscount(discountPrice);
		} else {
			setPriceDiscount(0);
		}
	}, [selectedProduct, quantity]);
	const handleOpenEvaluate1 = () => setOpenEvaluate(true);
	const handleCloseEvaluate = () => setOpenEvaluate(false);
	const showToastMessage = (msg) => {
		setToastMessage(msg);
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 1500);
	};
	const addCart = async () => {
		const cartId = localStorage.getItem("cartId") || "";
		const token = localStorage.getItem("accessToken") || "";

		try {
			const payload = {
				token,
				asin: selectedProduct.asin,
				quantity,
				price: parseFloat(priceDiscount),
				cartId,
				size: selectedSize,
				nameColor: selectedColor?.name_color,
				colorAsin: JSON.stringify(selectedProduct.colors || []),
			};

			const response = await axios.post("http://localhost:8084/api/cart/addCart", payload);
			if (response.data.cartId) {
				localStorage.setItem("cartId", response.data.cartId);
			}

			window.dispatchEvent(new Event("cartUpdated"));

			// 👉 Chuyển sang trang Cart
			window.location.href = "/user/shoppages/cart";
		} catch (error) {
			console.error("❌ Không thể thêm giỏ hàng:", error.response?.data || error.message);
		}
	};
	const handleChange = (e) => {
		const value = e.target.value;
		const parsed = parseInt(value);
		setQuantity(isNaN(parsed) || parsed < 1 ? 1 : parsed);
	};
	const [selectedOrder, setSelectedOrder] = useState(null); // Lưu order được chọn
	const [recipientName, setRecipientName] = useState('');
	const [id, setId] = useState();
	const [order, setOrder] = useState(location.state?.order || {}); // Init từ location.state, fallback {}
	const [open, setOpen] = React.useState(false);
	const [recommendations, setRecommendations] = useState([]);
	const [loading, setLoading] = useState(false);
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
	const extractAsins = (data) => {
		const asinSet = new Set(); // Set để unique
		if (data && data.listOfOrders && Array.isArray(data.listOfOrders)) {
			data.listOfOrders.forEach((order) => {
				if (order.orderItemResponses && Array.isArray(order.orderItemResponses)) {
					order.orderItemResponses.forEach((item) => {
						if (item.asin) {
							asinSet.add(item.asin); // Thêm vào Set để tránh trùng
						}
					});
				}
			});
		}
		return Array.from(asinSet); // Chuyển Set thành Array
	};
	const fetchRecommendations = async (asins) => {
		setLoading(true);
		try {
			const response = await axios.get('http://localhost:8085/api/search/getRecommendByAsins', {
				params: { asins }, // axios sẽ chuyển thành ?asins=B00AQZHC5K&asins=B00AQZO4J2
				paramsSerializer: (params) => {
					// Đảm bảo list được serialize đúng cách
					return Object.entries(params)
						.flatMap(([key, values]) =>
							Array.isArray(values)
								? values.map((v) => `${key}=${encodeURIComponent(v)}`)
								: `${key}=${encodeURIComponent(values)}`
						)
						.join('&');
				},
			});
			setRecommendations(response.data);
			console.log('datanhan lai la', response.data)
		} catch (error) {
			console.error('Error fetching recommendations:', error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		const asins = extractAsins(order);
		if (asins.length > 0) {
			fetchRecommendations(asins);
		}
	}, [order]);
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

			navigate(-1); // Navigate back về trang order, trigger refetch
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
useEffect(() => {
    getMyOrderDetail();
  }, []); // Dependency empty để chỉ gọi 1 lần khi mount
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
const getMyOrderDetail = async () => {
  console.log("📦 [getMyOrderDetail] Bắt đầu gọi API...");
  const accessToken = localStorage.getItem("accessToken");
  console.log("🔑 [Token]", accessToken);
  try {
    setLoading(true);
    const response = await axios.get(
      "http://localhost:8086/api/orders/getOrderByIdUserAndMasterOrderId",
      {
        params: {
          masterOrderId: order.masterOrderId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("✅ [API Response]", response);
    console.log("📂 [Response Data]", response.data);
    setOrder(response.data);
  } catch (err) {
    console.error("❌ [API Error]", err);
    if (err.response) {
      console.error("⚠️ [Error Response]", err.response);
    }
  } finally {
    setLoading(false);
    console.log("⏳ [getMyOrderDetail] Kết thúc gọi API.");
  }
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
  handleCloseEvaluate();

  getMyOrderDetail();
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
// Convert trạng thái sang tiếng Việt
// ===== Map trạng thái -> tiếng Việt (đơn cấp shop / child order) =====
const CHILD_STATUS_LABELS = {
	pending: 'Chờ xác nhận',
	packed: 'Đã đóng gói',
	shipped: 'Đang vận chuyển',
	delivered: 'Đã giao',
	failed: 'Giao thất bại',
	cancelled: 'Đã hủy',          // phòng khi sau này server trả "cancelled"
  };
  
  // (Tuỳ – dùng khi cần hiển thị masterOrderStatus)
  const MASTER_STATUS_LABELS = {
	pending: 'Chờ xác nhận',
	processing: 'Đang xử lý',
	shipped: 'Đang vận chuyển',
	completed: 'Hoàn tất',
	cancelled: 'Đã hủy',
	cancelledAdmin: 'Đã hủy (Admin)',
	cancelledSeller: 'Đã hủy (Người bán)',
  };
  
  const childStatusToVi = (s) => CHILD_STATUS_LABELS[s] || s;
  const masterStatusToVi = (s) => MASTER_STATUS_LABELS[s] || s;
  
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
												<div className="badge">{childStatusToVi(orderStore.status)}</div>
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
														<button
															className="nav-link"
															id={`nav-Suggestion-tab-${index}`}
															data-bs-toggle="tab"
															data-bs-target={`#nav-Suggestion-${index}`}
															role="tab"
															aria-controls={`nav-Suggestion-${index}`}
															aria-selected="false"
														>
															Gợi Ý Sau Mua
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
{loading ? (
  <p>Đang tải gợi ý...</p>
) : (
  (() => {
    // 1. Lọc orderItemResponses theo điều kiện evaluateNumber & isEvaluate
    const filteredItems = (orderStore?.orderItemResponses || []).filter(
      item =>
        (item.evaluateNumber === 4 || item.evaluateNumber === 5) &&
        item.isEvaluate === 1
    );

    // 2. Lấy danh sách asin từ item đã lọc
    const uniqueAsins = [...new Set(filteredItems.map(item => item.asin))];

    const allProducts = [];
    const seenProducts = new Set();

    // 3. Ghép gợi ý theo asin đã lọc
    uniqueAsins.forEach(asin => {
      if (recommendations[asin]) {
        recommendations[asin].forEach(product => {
          if (!seenProducts.has(product.asin)) {
            seenProducts.add(product.asin);
            allProducts.push(product);
          }
        });
      }
    });

    // 4. Lấy top 10
    const topProducts = allProducts.slice(0, 10);

    return topProducts.length > 0 ? (
      <div className="mb-4">
        <h6>Top 10 sản phẩm mua cùng</h6>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
          }}
        >
          {topProducts.map((product, idx) => (
            <SwiperSlide key={idx}>
              <div className="shop-card style-1">
                <div className="dz-media">
                  <img
                    src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_400,h_400/imgProduct/IMG/${product.productThumbnail}`}
                    alt="image"
                  />
                  <div className="shop-meta">
                    <div
                      className="btn btn-secondary btn-md btn-rounded"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedProduct(product);
                        setTimeout(() => {
                          const modal = new window.bootstrap.Modal(
                            document.getElementById('exampleModal')
                          );
                          modal.show();
                        }, 100);
                      }}
                    >
                      <i className="fa-solid fa-eye d-md-none d-block" />
                      <span className="d-md-block d-none">Quick View</span>
                    </div>
                    <div className="btn btn-primary meta-icon dz-wishicon">
                      <i className="icon feather icon-heart dz-heart" />
                      <i className="icon feather icon-heart-on dz-heart-fill" />
                    </div>
                    <div className="btn btn-primary meta-icon dz-carticon">
                      <i className="flaticon flaticon-basket" />
                      <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                    </div>
                  </div>
                </div>
                <div className="dz-content">
                  <h5 className="title">
                    <a href={`/user/productstructure/ProductDetail?asin=${product.asin}`}>
                      {product.productTitle}
                    </a>
                  </h5>
                  <h5 className="price">
                    $
                    {(
                      product.productPrice -
                      (product.productPrice * (product.percentDiscount / 100))
                    ).toFixed(2)}
                  </h5>
                </div>
                <div className="product-tag">
                  <span className="badge">Get {product.percentDiscount}% Off</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    ) : (
      <p>Không có gợi ý nào.</p>
    );
  })()
)}
								</div>
													{/* Thêm tab-pane mới cho Gợi Ý Sau Mua */}
													<div
														className="tab-pane fade"
														id={`nav-Suggestion-${index}`}
														role="tabpanel"
														aria-labelledby={`nav-Suggestion-tab-${index}`}
														tabIndex="0"
													>
														<h5>Gợi Ý Sau Mua</h5>
														{loading ? (
															<p>Đang tải gợi ý...</p>
														) : (
															(() => {
																const asins = orderStore?.orderItemResponses?.map(item => item.asin) || [];
																const uniqueAsins = [...new Set(asins)];
																return uniqueAsins.length > 0 ? (
																	uniqueAsins.map((asin) => (
																		recommendations[asin] ? (
																			<div key={asin} className="mb-4">
																				<h6>Gợi ý cho sản phẩm (ASIN: {asin})</h6>
																				<div className="row gx-xl-4 g-3">
																					<Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
          }}
        >
          {recommendations[asin].map((product, idx) => (
            <SwiperSlide key={idx}>
              <div className="shop-card style-1">
                <div className="dz-media">
                  <img
                    src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_400,h_400/imgProduct/IMG/${product.productThumbnail}`}
                    alt="image"
                  />
                  <div className="shop-meta">
                    <div
                      className="btn btn-secondary btn-md btn-rounded"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSelectedProduct(product);
                        setTimeout(() => {
                          const modal = new window.bootstrap.Modal(
                            document.getElementById('exampleModal')
                          );
                          modal.show();
                        }, 100);
                      }}
                    >
                      <i className="fa-solid fa-eye d-md-none d-block" />
                      <span className="d-md-block d-none">Quick View</span>
                    </div>
                    <div className="btn btn-primary meta-icon dz-wishicon">
                      <i className="icon feather icon-heart dz-heart" />
                      <i className="icon feather icon-heart-on dz-heart-fill" />
                    </div>
                    <div className="btn btn-primary meta-icon dz-carticon">
                      <i className="flaticon flaticon-basket" />
                      <i className="flaticon flaticon-shopping-basket-on dz-heart-fill" />
                    </div>
                  </div>
                </div>
                <div className="dz-content">
                  <h5 className="title">
                    <a href={`/user/productstructure/ProductDetail?asin=${product.asin}`}>
                      {product.productTitle}
                    </a>
                  </h5>
                  <h5 className="price">
                    $
                    {(
                      product.productPrice -
                      (product.productPrice * (product.percentDiscount / 100))
                    ).toFixed(2)}
                  </h5>
                </div>
                <div className="product-tag">
                  <span className="badge">Get {product.percentDiscount}% Off</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
																				</div>
																			</div>
																		) : null
																	))
																) : (
																	<p>Không có gợi ý nào.</p>
																);
															})()
														)}
													</div>
												</div>
											</div>
										</div>
									))}

								</section>
							</div>
							<div className="modal quick-view-modal fade"
								id="exampleModal"
								tabIndex={-1}
								aria-hidden="true"
							>
								<div className="modal-dialog modal-dialog-centered">
									<div className="modal-content">
										<button
											type="button"
											className="btn-close"
											data-bs-dismiss="modal"
											aria-label="Close"
										>
											<i className="icon feather icon-x" />
										</button>
										<div className="modal-body">
											<div className="row g-xl-4 g-3">
												<div className="col-xl-6 col-md-6">
													<div className="dz-product-detail mb-0">
														<div className="swiper-btn-center-lr">
															<div className="swiper quick-modal-swiper2">
																<div className="swiper-wrapper" id="lightgallery">

																	{selectedProduct !== null && (
																		<div className="swiper-slide">
																			<div className="dz-media DZoomImage">
																				<a
																					className="mfp-link lg-item"
																					href={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${selectedProduct.productThumbnail}`}
																					data-src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${selectedProduct.productThumbnail}`}
																				>
																					<i className="feather icon-maximize dz-maximize top-right" />
																				</a>
																				<img src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${selectedProduct.productThumbnail}`} alt="image" />
																			</div>
																		</div>
																	)}
																</div>
															</div>
															<div className="swiper quick-modal-swiper thumb-swiper-lg thumb-sm swiper-vertical">
																<div className="swiper-wrapper">
																	{selectedProduct !== null && (
																		<div className="swiper-slide">
																			<img
																				src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_60,h_60/imgProduct/IMG/${selectedProduct.productThumbnail}`}
																				alt="image"
																			/>
																		</div>
																	)}
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="col-xl-6 col-md-6">
													<div className="dz-product-detail style-2 ps-xl-3 ps-0 pt-2 mb-0">

														<div className="dz-content">


															<div className="dz-content-footer">
																<div className="dz-content-start">
																	{selectedProduct !== null && (

																		<span className="badge bg-secondary mb-2">
																			SALE {selectedProduct.percentDiscount}% Off
																		</span>
																	)}
																	<h4 className="title mb-1">
																		{selectedProduct !== null && (
																			<a href={`/user/productstructure/ProductDetail?asin=${selectedProduct.asin}`}>{selectedProduct.productTitle}</a>
																		)}
																	</h4>
																	<div className="review-num">
																		<ul className="dz-rating me-2">
																			<li className="star-fill">
																				<i className="flaticon-star-1" />
																			</li>
																			<li className="star-fill">
																				<i className="flaticon-star-1" />
																			</li>
																			<li className="star-fill">
																				<i className="flaticon-star-1" />
																			</li>
																			<li>
																				<i className="flaticon-star-1" />
																			</li>
																			<li>
																				<i className="flaticon-star-1" />
																			</li>
																		</ul>
																		<span className="text-secondary me-2">4.7 Rating</span>
																		<a href="javascript:void(0);">(5 customer reviews)</a>
																	</div>
																</div>
															</div>
															<p className="para-text">
																{selectedProduct !== null && (
																	selectedProduct.productTitle
																)}
															</p>
															<div className="meta-content m-b20 d-flex align-items-end">
																<div className="me-3">
																	<span className="form-label">Price</span>
																	{selectedProduct !== null && (

																		<span className="price">${priceDiscount} <del>${selectedProduct.productPrice}</del></span>

																	)}
																</div>
																<div className="btn-quantity light me-0">
																	<label className="form-label fw-bold">Quantity</label>
																	<div className="input-group">
																		<button
																			className="btn btn-dark rounded-circle p-0"
																			style={{
																				width: '40px',
																				height: '40px',
																				backgroundColor: '#000',
																				color: '#fff',
																				border: 'none',
																				minWidth: 'unset',      // ép bỏ min-width của Bootstrap
																				flex: '0 0 auto'         // ngăn input-group ép dãn
																			}}
																			onClick={() => setQuantity(q => Math.max(1, q - 1))}
																		>
																			-
																		</button>
																		<input
																			type="text"
																			min="1"
																			value={quantity}
																			onChange={handleChange}
																			className="form-control text-center"
																		/>
																		<button
																			className="btn btn-dark rounded-circle p-0"
																			style={{
																				width: '40px',
																				height: '40px',
																				backgroundColor: '#000',
																				color: '#fff',
																				border: 'none',
																				minWidth: 'unset',      // ép bỏ min-width của Bootstrap
																				flex: '0 0 auto'         // ngăn input-group ép dãn
																			}}
																			onClick={() => setQuantity(q => Math.max(1, q + 1))}
																		>+</button>
																	</div>
																</div>
															</div>

															<div className=" cart-btn">
																<button onClick={addCart}
																	className="btn btn-secondary text-uppercase"
																>
																	Add To Cart
																</button>
																<button
																	className="btn btn-md btn-outline-secondary btn-icon"
																// onClick={() => handleToggleWishlist(selectedProduct.asin)}
																>
																	<svg
																		width={19}
																		height={17}
																		viewBox="0 0 19 17"
																		fill="none"
																		xmlns="http://www.w3.org/2000/svg"
																	>
																		<path
																			d="M9.24805 16.9986C8.99179 16.9986 8.74474 16.9058 8.5522 16.7371C7.82504 16.1013 7.12398 15.5038 6.50545 14.9767L6.50229 14.974C4.68886 13.4286 3.12289 12.094 2.03333 10.7794C0.815353 9.30968 0.248047 7.9162 0.248047 6.39391C0.248047 4.91487 0.755203 3.55037 1.67599 2.55157C2.60777 1.54097 3.88631 0.984375 5.27649 0.984375C6.31552 0.984375 7.26707 1.31287 8.10464 1.96065C8.52734 2.28763 8.91049 2.68781 9.24805 3.15459C9.58574 2.68781 9.96875 2.28763 10.3916 1.96065C11.2292 1.31287 12.1807 0.984375 13.2197 0.984375C14.6098 0.984375 15.8885 1.54097 16.8202 2.55157C17.741 3.55037 18.248 4.91487 18.248 6.39391C18.248 7.9162 17.6809 9.30968 16.4629 10.7792C15.3733 12.094 13.8075 13.4285 11.9944 14.9737C11.3747 15.5016 10.6726 16.1001 9.94376 16.7374C9.75136 16.9058 9.50417 16.9986 9.24805 16.9986ZM5.27649 2.03879C4.18431 2.03879 3.18098 2.47467 2.45108 3.26624C1.71033 4.06975 1.30232 5.18047 1.30232 6.39391C1.30232 7.67422 1.77817 8.81927 2.84508 10.1066C3.87628 11.3509 5.41011 12.658 7.18605 14.1715L7.18935 14.1743C7.81021 14.7034 8.51402 15.3033 9.24654 15.9438C9.98344 15.302 10.6884 14.7012 11.3105 14.1713C13.0863 12.6578 14.6199 11.3509 15.6512 10.1066C16.7179 8.81927 17.1938 7.67422 17.1938 6.39391C17.1938 5.18047 16.7858 4.06975 16.045 3.26624C15.3152 2.47467 14.3118 2.03879 13.2197 2.03879C12.4197 2.03879 11.6851 2.29312 11.0365 2.79465C10.4585 3.24179 10.0558 3.80704 9.81975 4.20255C9.69835 4.40593 9.48466 4.52733 9.24805 4.52733C9.01143 4.52733 8.79774 4.40593 8.67635 4.20255C8.44041 3.80704 8.03777 3.24179 7.45961 2.79465C6.811 2.29312 6.07643 2.03879 5.27649 2.03879Z"
																			fill="black"
																		/>
																	</svg>
																	Add To Wishlist
																</button>
															</div>
															<div className="dz-info mb-0">
																{selectedProduct !== null && (

																	<ul><li><strong>SKU:</strong></li><li>{selectedProduct.asin}</li></ul>
																)}
																<ul>
																	<li>
																		<strong>Categories:</strong>
																	</li>
																	{selectedProduct !== null && (
																		<>
																			<li>
																				<a href={`/user/shop/shopWithCategory?salesRank=${selectedProduct.salesRank}`}>
																					{selectedProduct.salesRank}
																					{selectedProduct.productType && ','}
																				</a>
																			</li>

																			{selectedProduct.productType && (
																				<li>
																					<a href={`/user/shop/shopWithCategory?productType=${selectedProduct.productType}`}>{selectedProduct.productType}</a>
																				</li>
																			)}
																		</>
																	)}
																</ul>

																<div className="dz-social-icon">
																	<ul>
																		<li>
																			<a
																				target="_blank"
																				className="text-dark"
																				href="https://www.facebook.com/dexignzone"
																			>
																				<i className="fab fa-facebook-f" />
																			</a>
																		</li>
																		<li>
																			<a
																				target="_blank"
																				className="text-dark"
																				href="https://twitter.com/dexignzones"
																			>
																				<i className="fab fa-twitter" />
																			</a>
																		</li>
																		<li>
																			<a
																				target="_blank"
																				className="text-dark"
																				href="https://www.youtube.com/@dexignzone1723"
																			>
																				<i className="fa-brands fa-youtube" />
																			</a>
																		</li>
																		<li>
																			<a
																				target="_blank"
																				className="text-dark"
																				href="https://www.linkedin.com/showcase/3686700/admin/"
																			>
																				<i className="fa-brands fa-linkedin-in" />
																			</a>
																		</li>
																		<li>
																			<a
																				target="_blank"
																				className="text-dark"
																				href="https://www.instagram.com/dexignzone/"
																			>
																				<i className="fab fa-instagram" />
																			</a>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
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