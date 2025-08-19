// src/pages/common/HomePage.js
import React, { useEffect, useState, useMemo,useRef  } from 'react';
import QuickViewModal from '../../components/home/QuickViewModal';
import ScrollTopButton from '../../layout/ScrollTopButton';
import WOW from 'wowjs';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Ensure react-router-dom is installed
function ProductDetail() {
	const [hasBgClass, setHasBgClass] = useState(true);
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const asin = searchParams.get('asin');

	const [products, setProducts] = useState([]);
	const [quantity, setQuantity] = useState(1);
	const [relatedProducts, setRelatedProducts] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [newReview, setNewReview] = useState('');
	const [user, setUser] = useState(null);
	const [rating, setRating] = useState(0);
	const [replyTo, setReplyTo] = useState(null);
	const [newReply, setNewReply] = useState('');
	const [selectedSize, setSelectedSize] = useState(null);
	const [selectedColor, setSelectedColor] = useState(null);
	const [toastMessage, setToastMessage] = useState('');
	const [showToast, setShowToast] = useState(false);
	const [editingReviewId, setEditingReviewId] = useState(null);
	const [editText, setEditText] = useState("");
	const [token, setToken] = useState('');
	const [editRating, setEditRating] = useState(0);
	const originalPrice = products.productPrice || 0;
	const discount = products.percentDiscount || 0;
	const discountedPrice = originalPrice - (originalPrice * discount / 100);
	const [selectIdColor, setSelectIdColor] = useState();
useEffect(() => {
  // Delay để đảm bảo DOM đã render xong
  const timer = setTimeout(() => {
    // Destroy existing swipers
    const mainSwiper = document.querySelector('.product-gallery-swiper2');
    const thumbSwiper = document.querySelector('.thumb-swiper-lg');
    
    if (mainSwiper && mainSwiper.swiper) {
      mainSwiper.swiper.destroy(true, true);
    }
    
    if (thumbSwiper && thumbSwiper.swiper) {
      thumbSwiper.swiper.destroy(true, true);
    }
    
    // Destroy lightgallery nếu có
    const lgContainer = document.getElementById('lightgallery');
    if (lgContainer && lgContainer.lgData) {
      lgContainer.lgData.destroy(true);
    }
    
    // Re-initialize sau khi destroy
    setTimeout(() => {
      // Kiểm tra element tồn tại trước khi init
      const mainSwiperEl = document.querySelector('.product-gallery-swiper2');
      const thumbSwiperEl = document.querySelector('.thumb-swiper-lg');
      
      // Kiểm tra có slide nào không
      const mainSlides = document.querySelectorAll('.product-gallery-swiper2 .swiper-slide');
      const thumbSlides = document.querySelectorAll('.thumb-swiper-lg .swiper-slide');
      
      if (mainSwiperEl && mainSlides.length > 0 && window.Swiper) {
        try {
          // Thumb swiper trước (để main swiper có thể link)
          let thumbSwiperInstance = null;
          if (thumbSwiperEl && thumbSlides.length > 0) {
            thumbSwiperInstance = new window.Swiper(thumbSwiperEl, {
              spaceBetween: 10,
              slidesPerView: Math.min(4, thumbSlides.length), // Không vượt quá số slide thực tế
              direction: 'vertical',
              freeMode: true,
              watchSlidesProgress: true,
              breakpoints: {
                768: {
                  direction: 'horizontal',
                  slidesPerView: Math.min(4, thumbSlides.length),
                }
              }
            });
          }
          
          // Main swiper
          const mainSwiperInstance = new window.Swiper(mainSwiperEl, {
            spaceBetween: 10,
            loop: false,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            thumbs: thumbSwiperInstance ? {
              swiper: thumbSwiperInstance
            } : {}
          });
          
        } catch (error) {
          console.error('Swiper initialization error:', error);
        }
      }
      
      // Re-initialize lightgallery
      setTimeout(() => {
        const lgEl = document.getElementById('lightgallery');
        const lgItems = document.querySelectorAll('#lightgallery .lg-item');
        
        if (lgEl && lgItems.length > 0 && window.lightGallery) {
          try {
            window.lightGallery(lgEl, {
              selector: '.lg-item',
              thumbnail: true,
              zoom: true,
              download: false
            });
          } catch (error) {
            console.error('LightGallery initialization error:', error);
          }
        }
      }, 50);
      
    }, 100);
    
  }, 200); // Tăng delay lên 200ms

  return () => clearTimeout(timer);
}, [selectIdColor]);
	useEffect(() => {
		console.log('product image', products);
		console.log('colorId', selectIdColor);
	})
	const showToastMsg = (msg) => {
		setToastMessage(msg);
		setShowToast(true);
		setTimeout(() => setShowToast(false), 2000);
	};
	useEffect(() => {
		const getRecommendByAsin = async () => {
			try {
				const response = await axios.get("http://localhost:8765/api/search/getRecommendByAsin", {
					params: { asin }
				});
				setRelatedProducts(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		getRecommendByAsin();
	}, [asin]);

	// ✅ Load review
	useEffect(() => {
		if (asin) {
			axios.get(`http://localhost:8765/api/reviews/public/${asin}`)  // ✅ Gọi endpoint public không yêu cầu authId
				.then(res => setReviews(res.data))
				.catch(err => console.error("Lỗi khi fetch reviews:", err));
		}
	}, [asin]);

	// ✅ Gọi /me để lấy đúng userId và lưu localStorage (nếu cần)
	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken');
		if (!accessToken) return;

		setToken(accessToken); // ✅ Gán vào state

		axios.get('http://localhost:8765/api/auth/me', {
			headers: { Authorization: `Bearer ${accessToken}` }
		})
			.then(res => {
				const data = res.data;
				const userData = {
					userId: data.userId || data.id,
					username: data.username,
					avatar: data.profilePicture || ''
				};
				setUser(userData);

				localStorage.setItem('userId', userData.userId);
				localStorage.setItem('username', userData.username);
				localStorage.setItem('avatar', userData.avatar);
			})
			.catch(err => {
				console.error("Không lấy được user từ /me:", err);
				setUser(null);
			});
	}, []);

	const fetchReviews = async () => {
		try {
			const res = await axios.get(`http://localhost:8765/api/reviews/public/${asin}`); // ✅ sửa giống trên
			setReviews(res.data);
		} catch (err) {
			console.error("Lỗi khi fetch reviews:", err);
		}
	};
	// ✅ Kiểm tra tồn kho khi thay đổi số lượng
	const checkQuantityAgainstStock = async (newQuantity) => {
		const hasSize = products?.sizes?.length > 0;
		const hasColor = colorAsinArray?.length > 0;

		const sizeId = hasSize
			? products.sizes.find((s) => s.sizeName === selectedSize)?.sizeId
			: null;

		const colorId = hasColor
			? colorAsinArray.find((c) => c.name_color === selectedColor)?.color_id
			: null;

		// ❗ Nếu chưa chọn đủ size/color, không kiểm kho
		if ((hasSize && !sizeId) || (hasColor && !colorId)) {
			setQuantity(newQuantity); // vẫn cho thay đổi số lượng
			return;
		}

		try {
			const res = await axios.get(`http://localhost:8765/api/product-variants/available-stock`, {
				params: {
					productId: products.productId,
					...(sizeId && { sizeId }),
					...(colorId && { colorId }),
				},
			});

			const stock = res.data;

			if (newQuantity > stock) {
				setQuantity(stock);
				showToastMsg(`⚠️ Chỉ còn ${stock} sản phẩm có sẵn.`);
			} else {
				setQuantity(newQuantity);
			}
		} catch (err) {
			console.error("❌ Lỗi kiểm tra tồn kho:", err);
			showToastMsg("❌ Không kiểm tra được tồn kho.");
			setQuantity(newQuantity); // fallback nếu lỗi API
		}
	};

	// ✅ Thêm sản phẩm vào giỏ hàng
	const handleAddToCart = async () => {
		const hasSize = products?.sizes?.length > 0;
		const hasColor = colorAsinArray?.length > 0;

		if (hasSize && !selectedSize) {
			showToastMsg("⚠️ Vui lòng chọn size.");
			return;
		}

		if (hasColor && !selectedColor) {
			showToastMsg("⚠️ Vui lòng chọn màu.");
			return;
		}

		if (!Number.isInteger(quantity) || quantity < 1) {
			showToastMsg("⚠️ Số lượng không hợp lệ.");
			return;
		}

		try {
			const token = localStorage.getItem("accessToken") || "";
			const cartId = localStorage.getItem("cartId") || "";

			const sizeId = hasSize
				? products.sizes.find((s) => s.sizeName === selectedSize)?.sizeId
				: null;

			const colorId = hasColor
				? colorAsinArray.find((c) => c.name_color === selectedColor)?.color_id
				: null;

			// 👉 Lấy giỏ hàng hiện tại
			const cartRes = await axios.get("http://localhost:8765/api/cart/getCart", {
				params: { token, cartId },
			});

			const cartItems = cartRes.data?.items || [];

			// ✅ Tìm sản phẩm trùng asin/size/color
			const existingItem = cartItems.find((item) => {
				const matchAsin = item.asin === products.asin;
				const matchSize = hasSize ? item.size === selectedSize : true;
				const matchColor = hasColor ? item.nameColor === selectedColor : true;
				return matchAsin && matchSize && matchColor;
			});

			const currentQuantityInCart = existingItem?.quantity || 0;
			const totalDesired = currentQuantityInCart + quantity;

			// 🔍 Kiểm tra tồn kho
			const res = await axios.get(`http://localhost:8765/api/product-variants/available-stock`, {
				params: {
					productId: products.productId,
					...(sizeId && { sizeId }),
					...(colorId && { colorId }),
				},
			});

			const stock = res.data;

			if (totalDesired > stock) {
				showToastMsg(`⚠️ Trong giỏ đã có ${currentQuantityInCart}. Tổng vượt quá tồn kho (${stock}).`);
				return;
			}

			const unitPrice = products.productPrice;
			const discount = products.percentDiscount || 0;
			const discountedPrice = unitPrice - (unitPrice * discount / 100);

			const payload = {
				token,
				asin: products.asin,
				quantity,
				price: parseFloat(discountedPrice),
				cartId,
				size: hasSize ? selectedSize : null,
				nameColor: hasColor ? selectedColor : null,
				colorAsin: JSON.stringify(colorAsinArray || []),
			};

			const response = await axios.post("http://localhost:8765/api/cart/addCart", payload);

			if (response.data.cartId) {
				localStorage.setItem("cartId", response.data.cartId);
			}

			window.dispatchEvent(new Event("cartUpdated"));
			showToastMsg("✅ Đã thêm vào giỏ hàng!");
		} catch (error) {
			console.error("❌ Lỗi khi thêm vào giỏ:", error);
			showToastMsg("❌ Có lỗi xảy ra. Vui lòng thử lại.");
		}
	};

	// ✅ Gửi đánh giá
	const handleSubmitReview = async () => {
		if (!newReview.trim()) return;

		const token = localStorage.getItem('accessToken');
		if (!token || !user?.userId) {
			alert("Vui lòng đăng nhập để bình luận.");
			return;
		}

		if (!rating || rating < 1 || rating > 5) {
			alert("Vui lòng chọn số sao đánh giá.");
			return;
		}

		try {
			const res = await axios.post(`http://localhost:8765/api/reviews/create`, {
				productAsin: asin,
				comment: newReview,
				rating,
				userId: user.userId,
				parentId: replyTo // gửi kèm parentId nếu có
			}, {
				headers: { Authorization: `Bearer ${token}` }
			});

			await fetchReviews();
			setNewReview('');
			setReplyTo(null);
			setRating(0);
		} catch (err) {
			console.error("Lỗi khi gửi đánh giá:", err);
		}
	};
	const handleSubmitReply = async (parentId) => {
		const token = localStorage.getItem('accessToken');
		if (!newReply.trim() || !token || !user?.userId) return;

		try {
			const res = await axios.post(`http://localhost:8765/api/reviews/create`, {
				productAsin: asin,
				comment: newReply,
				userId: user.userId,
				parentId: parentId
			}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			await fetchReviews();
			setNewReply('');
			setReplyTo(null);
		} catch (err) {
			console.error("Lỗi khi gửi phản hồi:", err);
		}
	};
	const handleDeleteReview = async (reviewId) => {
		if (!window.confirm("Bạn chắc chắn muốn xoá bình luận này?")) return;

		if (!user?.userId || !token) {
			alert("Vui lòng đăng nhập để xoá bình luận.");
			return;
		}

		try {
			await axios.delete(`http://localhost:8765/api/reviews/${reviewId}/user`, {
				params: { authId: user.userId },
				headers: { Authorization: `Bearer ${token}` },
			});
			setReviews((prev) =>
				prev.filter((r) => r.reviewId !== reviewId && r.parentId !== reviewId)
			);
		} catch (err) {
			console.error("Lỗi khi xoá bình luận:", err);
			alert("Không thể xoá bình luận.");
		}
	};
	const handleUpdateReview = async (reviewId) => {
		if (!editText.trim()) {
			alert("Nội dung không được để trống.");
			return;
		}

		if (!user?.userId || !token) {
			alert("Vui lòng đăng nhập để cập nhật bình luận.");
			return;
		}

		try {
			await axios.put(
				`http://localhost:8765/api/reviews/${reviewId}`,
				{
					comment: editText,
					rating: editRating || 1, // đảm bảo gửi số hợp lệ từ 1-5
					productAsin: asin,
					userId: user.userId, // ✅ Cần thiết cho backend xác thực
				},
				{
					params: { authId: user.userId },
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			setReviews((prev) =>
				prev.map((r) =>
					r.reviewId === reviewId
						? { ...r, comment: editText, rating: editRating }
						: r
				)
			);
			setEditingReviewId(null);
		} catch (err) {
			console.error("Lỗi khi cập nhật bình luận:", err);
			alert("Không thể cập nhật. Kiểm tra quyền hoặc thử lại.");
		}
	};


	// ✅ Parse colorAsin
	const colorAsinArray = useMemo(() => {
		try {
			if (!products?.colorAsin) return [];
			return typeof products.colorAsin === 'string'
				? JSON.parse(products.colorAsin)
				: products.colorAsin;
		} catch (e) {
			console.error("Không thể parse colorAsin:", e);
			return [];
		}
	}, [products]);

	// ✅ Load chi tiết sản phẩm
	const fetchProductDetailWithAsin = async (asin) => {
		if (!asin) {
			console.error('ASIN is missing or null');
			return;
		}
		try {
			const response = await axios.get(`http://localhost:8765/api/products/productDetail/${asin}`);
			setProducts(response.data);
		} catch (error) {
			console.error('Lỗi khi gọi API:', error);
		}
	};

	// ✅ Xử lý số lượng
	const handleChange = (e) => {
		const value = parseInt(e.target.value);
		if (isNaN(value) || value < 1) {
			setQuantity(1);
			showToastMsg("⚠️ Số lượng phải từ 1 trở lên.");
		} else {
			checkQuantityAgainstStock(value);
		}
	};
	// ✅ Load sản phẩm khi asin thay đổi
	useEffect(() => {
		if (asin) {
			fetchProductDetailWithAsin(asin);
		}
	}, [asin]);

	// ✅ Class nền
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

	// ✅ WOW animation
	useEffect(() => {
		const wow = new WOW.WOW();
		wow.init();
	}, []);
	// Evaluate
	// ⬇️ thêm state
	const [evaluates, setEvaluates] = useState([]);

	// ⬇️ fetch evaluate public theo asin (status=1 đã xử lý ở BE)
	useEffect(() => {
		if (!asin) return;
		axios
			.get(`http://localhost:8765/api/products/getAllEvaluateByOrderItemAndStatus/${asin}`)
			.then((res) => setEvaluates(res.data || []))
			.catch((err) => console.error("Lỗi khi fetch evaluates:", err));
	}, [asin]);
	const ratingStats = useMemo(() => {
		const ratings = (evaluates || [])
			.map(e => Number(e.rating) || 0)
			.filter(n => n > 0);
		const count = ratings.length;
		const avg = count ? ratings.reduce((a, b) => a + b, 0) / count : 0;
		return { avg, count };
	}, [evaluates]);

	// ⬇️ chuẩn hoá dữ liệu để render (parse ảnh, fallback avatar/username)
	const normalizedEvaluates = useMemo(() => {
		const parseImgs = (v) => {
			try {
				if (!v) return [];
				return Array.isArray(v) ? v : JSON.parse(v);
			} catch { return []; }
		};
		return (evaluates || []).map((e) => ({
			id: e.evaluteId ?? e.id,
			username: e.username ?? "Ẩn danh",
			avatar: e.avatar ?? "/assets/user/images/default-avatar.png",
			rating: e.rating ?? 0,
			comment: e.comment ?? "",
			sellerReply: e.commentByEvaluate ?? null, // seller rep (nếu có)
			createdAt: e.createdAt ?? null,
			images: parseImgs(e.imgEvaluate),
		}));
	}, [evaluates]);
	return (
		<>

			{/* Header (đã được xử lý trong App.js) */}

			<div className="page-content bg-light">

				<div className="d-sm-flex justify-content-between container-fluid py-3">
					<nav aria-label="breadcrumb" className="breadcrumb-row">
						<ul className="breadcrumb mb-0">
							<li className="breadcrumb-item"><a href="/"> Trang chủ</a></li>
							<li className="breadcrumb-item">
								Hình thu nhỏ sản phẩm
								{/* Product Thumbnail */}
							</li>
						</ul>
					</nav>
				</div>

				<section className="content-inner py-0">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xl-6 col-md-6">
								<div className="dz-product-detail sticky-top">
									<div className="swiper-btn-center-lr">
										<div className="swiper product-gallery-swiper2">
											<div className="swiper-wrapper" id="lightgallery">
												{products.images && products.images.length === 1 && products.image?.colorId == null ? (
													// Trường hợp chỉ có 1 ảnh, không có colorId
													products.images.map((image, index) => (
														<div className="swiper-slide" key={index}>
															<div className="dz-media DZoomImage rounded">
																<a
																	className="mfp-link lg-item"
																	href={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_500,h_500/imgProduct/IMG/${image.imageData}`}
																	data-src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_500,h_500/imgProduct/IMG/${image.imageData}`}
																>
																	<i className="feather icon-maximize dz-maximize top-right"></i>
																</a>
																<img
																	style={{ width: '80%', height: '80%' }}
																	src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_500,h_500/imgProduct/IMG/${image.imageData}` || '/default-image.jpg'}
																	alt="img"
																	loading="lazy"
																/>
															</div>
														</div>
													))
												) : (
													// Có nhiều ảnh
													products?.images?.map((image, index) => {
														// Nếu chưa chọn màu => render tất cả
														if (selectIdColor == null) {
															return (
																<div className="swiper-slide" key={index}>
																	<div className="dz-media DZoomImage rounded">
																		<a className="mfp-link lg-item" href={image.imageData} data-src={image.imageData}>
																			<i className="feather icon-maximize dz-maximize top-right"></i>
																		</a>
																		<img
																			style={{ width: '80%', height: '80%' }}
																			src={image.imageData}
																			alt="img"
																			loading="lazy"
																		/>
																	</div>
																</div>
															);
														}
														// Nếu đã chọn màu => chỉ render đúng màu
														if (image.colorId == selectIdColor) {
															return (
																<div className="swiper-slide" key={index}>
																	<div className="dz-media DZoomImage rounded">
																		<a className="mfp-link lg-item" href={image.imageData} data-src={image.imageData}>
																			<i className="feather icon-maximize dz-maximize top-right"></i>
																		</a>
																		<img
																			style={{ width: '80%', height: '80%' }}
																			src={image.imageData}
																			alt="img"
																			loading="lazy"
																		/>
																	</div>
																</div>
															);
														}
														// Không khớp màu thì bỏ qua
														return null;
													})
												)}
											</div>

										</div>
										<div className="swiper product-gallery-swiper thumb-swiper-lg swiper-vertical">
											<div className="swiper-wrapper">
												{products.images && products.images.length == 1 && products.image?.colorId == null ? (
													products.images.map((image, index) => (
														<div className="swiper-slide" key={index}>
															<img
																src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_60,h_60/imgProduct/IMG/${image.imageData}`}
																alt="img"
															/>
														</div>
													))
												) : (
													products?.images?.map((image, index) => {
														if (selectIdColor == null) {
															return (
																<div className="swiper-slide" key={index}>
																	<img src={image.imageData} alt="img" />
																</div>
															);
														}
														if (image.colorId == selectIdColor) {
															return (
																<div className="swiper-slide" key={index}>
																	<img src={image.imageData} alt="img" />
																</div>
															);
														}
														return null;
													})
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-6 col-md-6">
								<div className="dz-product-detail style-2 p-t50">
									<div className="dz-content">
										<div className="dz-content-footer">
											<div className="dz-content-start">
												<span className="badge bg-purple mb-2">SALE {products.percentDiscount}% Off</span>
												<h4 className="title mb-1">{products.productTitle}</h4>
												<div className="review-num d-flex align-items-center">
													<ul className="dz-rating me-2">
														{Array.from({ length: 5 }).map((_, i) => {
															const active = i < Math.round(ratingStats.avg || 0); // làm tròn để tô sao
															return (
																<li key={i}>
																	<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path
																			d="M6.74805 0.234375L8.72301 4.51608L13.4054 5.07126L9.9436 8.27267L10.8625 12.8975L6.74805 10.5944L2.63355 12.8975L3.5525 8.27267L0.090651 5.07126L4.77309 4.51608L6.74805 0.234375Z"
																			fill={active ? "#FF8A00" : "#5E626F"}
																			opacity={active ? "1" : "0.2"}
																		/>
																	</svg>
																</li>
															);
														})}
													</ul>

													<span className="text-secondary me-2">
														{(ratingStats.count ? ratingStats.avg.toFixed(1) : "0.0")} sao
													</span>

													{/* Link sang tab Evaluate */}
													<a href="#evaluate-tab-pane">({ratingStats.count} người đánh giá)</a>
												</div>

											</div>
										</div>
										<p className="para-text">
											{products.productTitle}
										</p>

										<div className="meta-content m-b20">
											<span className="price-name">Giá</span>
											<span className="price">
												${discountedPrice.toFixed(2)}{" "}
												<del>${originalPrice.toFixed(2)}</del>
											</span>
										</div>
										<div className="product-num gap-md-2 gap-xl-0">
											<div className="btn-quantity light">
												<label className="form-label fw-bold">Số lượng</label>
												<div className="input-group light d-flex align-items-center">
													<button
														className="btn btn-dark rounded-circle p-0"
														style={{
															width: '40px',
															height: '40px',
															backgroundColor: '#000',
															color: '#fff',
															border: 'none',
															minWidth: 'unset',
															flex: '0 0 auto',
															marginRight: '8px' // tạo khoảng cách bên phải nút -
														}}
														onClick={() => {
															const newQty = Math.max(1, quantity - 1);
															checkQuantityAgainstStock(newQty);
														}}
													>
														-
													</button>

													<input
														type="text"
														value={quantity}
														onChange={handleChange}
														style={{ width: '60px', textAlign: 'center' }}
													/>

													<button
														className="btn btn-dark rounded-circle p-0"
														style={{
															width: '40px',
															height: '40px',
															backgroundColor: '#000',
															color: '#fff',
															border: 'none',
															minWidth: 'unset',
															flex: '0 0 auto',
															marginLeft: '8px' // tạo khoảng cách bên trái nút +
														}}
														onClick={() => {
															const newQty = quantity + 1;
															checkQuantityAgainstStock(newQty);
														}}
													>
														+
													</button>
												</div>

											</div>
											<div className="d-block">
												<label className="form-label">Kích thước</label>
												<div className="btn-group product-size m-0">
													{products.sizes?.length > 0 ? (
														products.sizes.map((size, index) => {
															const inputId = `btnradiol${index}`;
															return (
																<React.Fragment key={index}>
																	<input
																		type="radio"
																		className="btn-check"
																		name="btnradio2"
																		id={inputId}
																		checked={selectedSize === size.sizeName}
																		onChange={() => setSelectedSize(size.sizeName)}
																	/>
																	<label className="btn" htmlFor={inputId}>
																		{size.sizeName}
																	</label>
																</React.Fragment>
															);
														})
													) : (
														<p>Không có kích thước nào</p>
													)}
												</div>
											</div>
											<div className="meta-content">
												<label className="form-label">Màu sắc</label>
												<div className="d-flex align-items-center color-filter">
													{Array.isArray(colorAsinArray) && colorAsinArray.length > 0 ? (
														colorAsinArray.map((item, index) => (
															<div className="form-check" key={index}>
																<input
																	className="form-check-input"
																	type="radio"
																	name="radioColor"
																	id={`radioColor-${index}`}
																	value={item.name_color}
																	checked={selectedColor === item.name_color}
																	onChange={() => {
																		setSelectedColor(item.name_color);
																		setSelectIdColor(item.color_id);
																		
																	}}

																/>
																<span></span>
															</div>
														))
													) : (
														"khong co gi het"
													)}


												</div>
											</div>
										</div>
										<div className="btn-group cart-btn">
											<a onClick={handleAddToCart} className="btn btn-secondary text-uppercase">
												Thêm vào giỏ hàng
											</a>
											<a href="shop-wishlist.html" className="btn btn-outline-secondary btn-icon">
												<i className="icon feather icon-heart"></i>
												Thêm vào yêu thích
											</a>
										</div>
										<div className="dz-info">
											<div id="reviews" className="mt-4">
												<h5 className="mb-3">ƯU ĐÃI SẢN PHẨM</h5>
											</div>

										</div>
										<ul className="d-md-flex d-none align-items-center">
											<li className="icon-bx-wraper style-3 me-xl-4 me-2">
												<div className="icon-bx">
													<i className="flaticon flaticon-ship"></i>
												</div>
												<div className="info-content">
													<span>Miễn Phí</span>
													<h6 className="dz-title mb-0">Vận chuyển</h6>
												</div>
											</li>
											<li className="icon-bx-wraper style-3">
												<div className="icon-bx">
													<i className="flaticon-fast-delivery-1"></i></div>
												<div className="info-content">
													<span>
														Trả lại dễ dàng
														{/* Easy Returns */}
													</span>
													<h6 className="dz-title mb-0">30 ngày</h6>
												</div>
											</li>
										</ul>
									</div>
									<div className="banner-social-media">
										<ul>
											<li>
												<a href="https://www.instagram.com/dexignzone/">Instagram</a>
											</li>
											<li>
												<a href="https://www.facebook.com/dexignzone">Facebook</a>
											</li>
											<li>
												<a href="https://twitter.com/dexignzones">twitter</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="content-inner-3 pb-0">
					<div className="container">
						<div className="product-description">
							<div className="dz-tabs">
								<ul className="nav nav-tabs center" id="myTab1" role="tablist">
									<li className="nav-item" role="presentation">
										<button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Description</button>
									</li>
									<li className="nav-item" role="presentation">
										<button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Comments ({reviews.length})</button>
									</li>
									<li className="nav-item" role="presentation">
										<button
											className="nav-link"
											id="evaluate-tab"
											data-bs-toggle="tab"
											data-bs-target="#evaluate-tab-pane"
											type="button"
											role="tab"
											aria-controls="evaluate-tab-pane"
											aria-selected="false"
										>
											Evaluate ({normalizedEvaluates.length})
										</button>
									</li>
								</ul>
								<div className="tab-content" id="myTabContent">
									<div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
										<div className="row">
											<div className="col-lg-6 m-lg-b0 m-md-b30">
												<div className="section-head style-2 d-block">
													<h2 className="title">Fits women</h2>
													<p>Designed for superior child comfort, OneFit™ provides extra rear-facing legroom and multiple recline options in every mode of use. With the widest range of height adjustments, the easy-adjust headrest system adjusts with the harness to grow with your child. OneFit™ accommodates tiny passengers from the very start with a removable head and body support insert for newborns weighing 5-11 lbs.		</p>
												</div>
												<div className="product-specification">
													<h4 className="specification-title">Specifications</h4>
													<ul>
														<li>Assembled Dimensions (L x W x H): <span>71.1 x 45.7 x 7.6 cm; 700 Grams</span></li>
														<li>Assembled Product Weight: <span>25 lbs.</span></li>
													</ul>
												</div>
												<ul className="specification-list m-b40">
													<li className="list-info">Manufacturer <span>Indra Hosiery Mills</span></li>
													<li className="list-info">ASIN<span>B07WK128569</span></li>
													<li className="list-info">Country of Origin<span>India</span></li>
													<li className="list-info">Department<span>Women</span></li>
													<li className="list-info">Included Components<span>Women's Jacket</span></li>
													<li className="list-info">Item Dimensions LxWxH<span> 71.1 x 45.7 x 7.6 Centimeters</span></li>
													<li className="list-info">Manufacture<span> Indra Hosiery Mills</span></li>
												</ul>
												<div className="product-media row g-xl-4 g-2 m-b40">
													<div className="col-md-3 col-3 col-sm-3 product-media-inner">
														<a href="shop-list.html" className="dz-media">
															<img src="../../assets/user/images/products/dress1.png" alt="/" />
														</a>
													</div>
													<div className="col-md-3 col-3 col-sm-3 product-media-inner">
														<a href="shop-list.html" className="dz-media">
															<img src="../../assets/user/images/products/dress2.png" alt="/" />
														</a>
													</div>
													<div className="col-md-3 col-3 col-sm-3 product-media-inner">
														<a href="shop-list.html" className="dz-media">
															<img src="../../assets/user/images/products/dress3.png" alt="/" />
														</a>
													</div>
													<div className="col-md-3 col-3 col-sm-3 product-media-inner">
														<a href="shop-list.html" className="dz-media">
															<img src="../../assets/user/images/products/dress4.png" alt="/" />
														</a>
													</div>
												</div>
												<div className="product-info">
													<div className="product-info-inner">
														<h4 className="info-title">Fabric Content</h4>
														<ul className="d-lg-flex d-block align-items-center">
															<li><h6>Seatpad: <span>100% Cotton</span></h6></li>
															<li><h6>Insert: <span>100% Cotton</span></h6></li>
														</ul>
													</div>
													<div className="product-info-inner">
														<h4 className="info-title">Chemical Statement</h4>
														<p className="info-text">The OneFit ClearTex All-In-One Car Seat is produced without the use of intentionally added fire retardant chemical treatments, PFAS, BPA and phthalates.	</p>
													</div>
												</div>
											</div>
											<div className="col-lg-6">
												<div className="row">
													<div className="col-lg-6 col-md-6 m-sm-b20 m-b30">
														<a href="shop-standard.html" className="about-product-wrapper">
															<div className="producṭ-content bg-light">
																<h4 className="product-title">All-in-One Dress</h4>
																<p className="product-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
															</div>
														</a>
													</div>
													<div className="col-lg-6 col-md-6 m-sm-b20 m-b30">
														<a href="shop-standard.html" className="about-product-wrapper">
															<div className="producṭ-content bg-light">
																<h4 className="product-title">Looking wise good</h4>
																<p className="product-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
															</div>
														</a>
													</div>
													<div className="col-lg-6 col-md-6 m-sm-b20 m-b30">
														<a href="shop-standard.html" className="about-product-wrapper">
															<div className="producṭ-content bg-light">
																<h4 className="product-title">100% Made In India</h4>
																<p className="product-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
															</div>
														</a>
													</div>
													<div className="col-lg-6 col-md-6 m-sm-b20 m-b30">
														<a href="shop-standard.html" className="about-product-wrapper">
															<div className="producṭ-content bg-light">
																<h4 className="product-title">100% Cotton</h4>
																<p className="product-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
															</div>
														</a>
													</div>
												</div>
												<div className="dz-product-media dz-media rounded"><img src="../../assets/user/images/shop/product-details/product-style-1/product-details-1.png" alt="/" /></div>
											</div>
										</div>
									</div>
									<div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
										<div className="clear" id="comment-list">
											<div className="post-comments comments-area style-1 clearfix">
												<h4 className="comments-title mb-2">
													Bình luận ({reviews.filter((r) => !r.parentId).length})
												</h4>
												<p className="text-muted mb-4">
													Chia sẻ cảm nhận thực tế của người dùng về sản phẩm.
												</p>

												<div id="comment">
													<ol className="comment-list list-unstyled">
														{reviews.filter((r) => !r.parentId).length === 0 && (
															<div className="text-muted mb-3">
																Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!
															</div>
														)}

														{reviews.filter((r) => !r.parentId).map((parent) => (
															<li className="comment mb-4 border-bottom pb-3" key={parent.reviewId}>
																<div className="d-flex align-items-start">
																	<img
																		src={parent.avatar || "/assets/user/images/default-avatar.png"}
																		alt="avatar"
																		className="rounded-circle me-3"
																		style={{ width: "45px", height: "45px", objectFit: "cover" }}
																	/>
																	<div className="flex-grow-1">
																		<div className="d-flex justify-content-between align-items-center">
																			<strong>{parent.username}</strong>
																			<small className="text-muted">
																				🕒 {new Date(parent.createdAt).toLocaleString("vi-VN")}
																			</small>
																		</div>
																		<div className="text-warning mb-1">
																			{Array.from({ length: parent.rating || 0 }, (_, i) => (
																				<i key={i} className="fas fa-star" />
																			))}
																		</div>
																		<div className="d-flex justify-content-between">
																			<p className="mb-1">{parent.comment}</p>
																			{user?.userId === parent.userId && (
																				<div className="d-flex gap-1 ms-2">
																					<button
																						className="btn btn-sm btn-light border"
																						title="Chỉnh sửa"
																						onClick={() => {
																							setEditingReviewId(parent.reviewId);
																							setEditText(parent.comment);
																							setEditRating(parent.rating);
																						}}
																					>
																						✏️
																					</button>
																					<button
																						className="btn btn-sm btn-light border text-danger"
																						title="Xoá"
																						onClick={() => handleDeleteReview(parent.reviewId)}
																					>
																						🗑
																					</button>
																				</div>
																			)}
																		</div>

																		{editingReviewId === parent.reviewId && (
																			<div className="mt-2">
																				<textarea
																					className="form-control mb-2"
																					value={editText}
																					onChange={(e) => setEditText(e.target.value)}
																					rows={2}
																				/>

																				{/* ⭐ THÊM VÀO: sửa rating */}
																				<div className="d-flex align-items-center gap-2 mb-2">
																					<span className="text-secondary">Đánh giá:</span>
																					<div className="d-flex gap-1">
																						{[1, 2, 3, 4, 5].map((value) => (
																							<i
																								key={value}
																								className={`fas fa-star ${editRating >= value ? 'text-warning' : 'text-muted'}`}
																								onClick={() => setEditRating(value)}
																								style={{ cursor: 'pointer' }}
																							/>
																						))}
																					</div>
																				</div>

																				<div className="d-flex gap-2">
																					<button
																						className="btn btn-sm btn-primary"
																						onClick={() => handleUpdateReview(parent.reviewId)}
																					>
																						💾 Lưu
																					</button>
																					<button
																						className="btn btn-sm btn-secondary"
																						onClick={() => setEditingReviewId(null)}
																					>
																						✖ Hủy
																					</button>
																				</div>
																			</div>
																		)}

																	</div>
																</div>

																{/* Seller reply nếu có */}
																{parent.sellerReply && (
																	<div className="ms-5 mt-3">
																		<div className="d-flex align-items-start">
																			<img
																				src={parent.sellerReply.avatar || "/assets/user/images/default-avatar.png"}
																				alt="/"
																				className="rounded-circle me-3"
																				style={{ width: "35px", height: "35px", objectFit: "cover" }}
																			/>
																			<div>
																				<span className="badge bg-secondary mb-1">Cửa hàng</span>
																				<div className="small text-muted">Phản hồi chính thức:</div>
																				<p className="mb-0">{parent.sellerReply.comment}</p>
																			</div>
																		</div>
																	</div>
																)}
															</li>
														))}
													</ol>
												</div>

												{/* Form đánh giá */}
												<div className="default-form comment-respond style-1 mt-4" id="respond">
													<h4 className="comment-reply-title mb-2">Đánh giá sản phẩm</h4>
													<p className="text-muted mb-3">Chia sẻ trải nghiệm của bạn về sản phẩm.</p>

													<div className="comment-form-rating d-flex align-items-center mb-3">
														<label className="me-2 text-secondary mb-0">Đánh giá của bạn:</label>
														<div className="rating-widget">
															<div className="rating-stars">
																<ul id="stars" className="list-inline mb-0">
																	{[1, 2, 3, 4, 5].map((value) => (
																		<li
																			key={value}
																			className={`list-inline-item star ${rating >= value ? "selected" : ""}`}
																			onClick={() => setRating(value)}
																			style={{ cursor: "pointer" }}
																		>
																			<i className="fas fa-star fa-fw"></i>
																		</li>
																	))}
																</ul>
															</div>
														</div>
													</div>

													<div>
														{user ? (
															<form
																onSubmit={(e) => {
																	e.preventDefault();
																	handleSubmitReview();
																}}
																className="comment-form"
																noValidate
															>
																<input type="text" value={user.username} readOnly className="form-control mb-2" />
																<textarea
																	className="form-control mb-2"
																	placeholder="Nhập đánh giá của bạn"
																	value={newReview}
																	onChange={(e) => setNewReview(e.target.value)}
																	required
																	rows="3"
																/>
																<button type="submit" className="btn btn-secondary">
																	Gửi ngay
																</button>
															</form>
														) : (
															<p className="text-danger">
																Vui lòng <a href="/user/auth/login">Đăng nhập</a> để đăng bài đánh giá.
															</p>
														)}
													</div>
												</div>
											</div>
										</div>
									</div>
									<div
										className="tab-pane fade"
										id="evaluate-tab-pane"
										role="tabpanel"
										aria-labelledby="evaluate-tab"
										tabIndex="0"
									>
										<div className="clear" id="evaluate-list">
											<div className="post-comments comments-area style-1 clearfix">
												<h4 className="comments-title mb-2">
													Evaluate ({normalizedEvaluates.length})
												</h4>
												<p className="text-muted mb-4">
													Các đánh giá đã duyệt cho sản phẩm.
												</p>

												<div id="evaluate">
													<ol className="comment-list list-unstyled">
														{normalizedEvaluates.length === 0 && (
															<div className="text-muted mb-3">
																Chưa có đánh giá nào được duyệt.
															</div>
														)}

														{normalizedEvaluates.map((item) => (
															<li className="comment mb-4 border-bottom pb-3" key={item.id}>
																<div className="d-flex align-items-start">
																	<img
																		src={item.avatar}
																		alt="avatar"
																		className="rounded-circle me-3"
																		style={{ width: "45px", height: "45px", objectFit: "cover" }}
																	/>
																	<div className="flex-grow-1">
																		<div className="d-flex justify-content-between align-items-center">
																			<strong>{item.username}</strong>
																			{item.createdAt && (
																				<small className="text-muted">
																					🕒 {new Date(item.createdAt).toLocaleString("vi-VN")}
																				</small>
																			)}
																		</div>

																		{/* rating */}
																		<div className="text-warning mb-1">
																			{Array.from({ length: item.rating || 0 }, (_, i) => (
																				<i key={i} className="fas fa-star" />
																			))}
																		</div>

																		{/* nội dung */}
																		<p className="mb-2">{item.comment}</p>

																		{/* ảnh đính kèm */}
																		{Array.isArray(item.images) && item.images.length > 0 && (
																			<div className="d-flex flex-wrap gap-2 mt-2">
																				{item.images.map((url, idx) => (
																					<img
																						key={idx}
																						src={url}
																						alt="evidence"
																						style={{
																							width: 80,
																							height: 80,
																							objectFit: "cover",
																							borderRadius: 6,
																						}}
																						loading="lazy"
																					/>
																				))}
																			</div>
																		)}
																	</div>
																</div>

																{/* Seller reply nếu có → thụt vào như comment */}
																{item.sellerReply && (
																	<div className="ms-5 mt-3">
																		<div className="d-flex align-items-start">
																			<img
																				src="/assets/user/images/default-avatar.png"
																				alt="/"
																				className="rounded-circle me-3"
																				style={{ width: "35px", height: "35px", objectFit: "cover" }}
																			/>
																			<div>
																				<span className="badge bg-secondary mb-1">Cửa hàng</span>
																				<div className="small text-muted">Phản hồi:</div>
																				<p className="mb-0">{item.sellerReply}</p>
																			</div>
																		</div>
																	</div>
																)}
															</li>
														))}
													</ol>
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="content-inner-1  overflow-hidden">
					<div className="container">
						<div className="section-head style-2 d-md-flex align-items-center justify-content-between">
							<div className="left-content">
								<h2 className="title mb-0">
									Sản phẩm liên quan
									{/* Related products */}
								</h2>
							</div>
							<a href="shop-list.html" className="text-secondary font-14 d-flex align-items-center gap-1">See all products
								<i className="icon feather icon-chevron-right font-18"></i>
							</a>
						</div>
						<div className="swiper-btn-center-lr">
							{relatedProducts.length > 0 && (
								<div className="swiper swiper-four">
									<div className="swiper-wrapper">
										{relatedProducts.map((relateProduct, index) => (
											<div className="swiper-slide">
												<div className="shop-card style-1">
													<div className="dz-media">
														<img
															src={
																relateProduct.productThumbnail.startsWith('http')
																	? relateProduct.productThumbnail
																	: relateProduct.productThumbnail.endsWith('.jpg')
																		? `https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${relateProduct.productThumbnail}`
																		: `/uploads/${relateProduct.productThumbnail}`
															} />																<div className="shop-meta">
															<a href="javascript:void(0);" className="btn btn-secondary btn-md btn-rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
																<i className="fa-solid fa-eye d-md-none d-block"></i>
																<span className="d-md-block d-none">Xem nhanh</span>
															</a>
															<div className="btn btn-primary meta-icon dz-wishicon">
																<i className="icon feather icon-heart dz-heart"></i>
																<i className="icon feather icon-heart-on dz-heart-fill"></i>
															</div>
															<div className="btn btn-primary meta-icon dz-carticon">
																<i className="flaticon flaticon-basket"></i>
																<i className="flaticon flaticon-shopping-basket-on dz-heart-fill"></i>
															</div>
														</div>
													</div>
													<div className="dz-content">
														<h5 className="title">
															<a href={`/user/productstructure/ProductDetail?asin=${relateProduct.asin}`}>{relateProduct.productTitle}</a></h5>
														<h5 className="price">${(
															relateProduct.productPrice -
															relateProduct.productPrice * relateProduct.percentDiscount / 100
														).toFixed(2)}</h5>
													</div>
													<div className="product-tag">
														<span className="badge ">Giảm {relateProduct.percentDiscount}% </span>
													</div>
												</div>
											</div>
										))}


									</div>
								</div>)}


							<div className="pagination-align">
								<div className="tranding-button-prev btn-prev">
									<i className="flaticon flaticon-left-chevron"></i>
								</div>
								<div className="tranding-button-next btn-next">
									<i className="flaticon flaticon-chevron"></i>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>

			{/* Footer (đã được xử lý trong App.js) */}

			<ScrollTopButton />
			<QuickViewModal />
			{showToast && (
				<div style={{
					position: 'fixed',
					bottom: '30px',
					right: '30px',
					background: '#333',
					color: '#fff',
					padding: '10px 20px',
					borderRadius: '8px',
					zIndex: 9999
				}}>
					{toastMessage}
				</div>
			)}
		</>
	);
}

export default ProductDetail;