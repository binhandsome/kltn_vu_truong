import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; // Ensure react-router-dom is installed
import { useParams } from 'react-router-dom';



const AllProduct = () => {
	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(false);
	const [selectedStatuses, setSelectedStatuses] = useState([]); // MULTI STATUS
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);
	const [storeId, setStoreId] = useState(55);
	const [pageSize, setPageSize] = useState(20);
	const [currentPage, setCurrentPage] = useState(0);
	const [salesRankCount, setSalesRankCount] = useState([]);
	const [productTypeCount, setProductTypeCount] = useState([]);
  const [tags, setTags] = useState(['Women', 'Men', 'Boy', 'Unisex', 'Girl']);
	const [keyword, setKeyword] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [selectedDiscounts, setSelectedDiscounts] = useState([]);
	const maxPagesToShow = 10;
	const accessToken = localStorage.getItem('accessToken');
	const statusOptions = ['active', 'inactive', 'discontinued', 'deleted'];
	const statusLabels = {
		active: 'Đang hoạt động',
		inactive: 'Ngưng hoạt động',
		discontinued: 'Ngừng kinh doanh',
		deleted: 'Đã xóa'
	};

	const discountOptions = [
		{ label: 'Dưới 20%', value: -20 },
		{ label: '10% hoặc hơn', value: 10 },
		{ label: '20% hoặc hơn', value: 20 },
		{ label: '30% hoặc hơn', value: 30 },
		{ label: '40% hoặc hơn', value: 40 },
		{ label: '50% hoặc hơn', value: 50 },
		{ label: '75% hoặc hơn', value: 75 },
		{ label: '90% hoặc hơn', value: 90 },
		{ label: '100%', value: 100 },
	];
	const handleStatusToggle = (status) => {
		setSelectedStatuses((prev) =>
			prev.includes(status)
				? prev.filter((s) => s !== status) // Bỏ chọn nếu đã có
				: [...prev, status] // Thêm nếu chưa có
		);
	};

	const handleToggleDiscount = (value) => {
		setSelectedDiscounts((prev) =>
			prev.includes(value)
				? prev.filter((v) => v !== value) // Nếu đang có => bỏ chọn
				: [...prev, value]               // Nếu chưa có => thêm
		);
		setCurrentPage(0);
	};
	const handlePageChange = (pageNumber) => {
		if (pageNumber >= 0 && pageNumber < totalPages) {
			setCurrentPage(pageNumber);
			scrollToFilterWrapper();
		}
	};
	const navigateChangeProduct = (asin) => {
		navigate(`/seller/product/ActionProduct/${asin}`);
	}
	const getPageRange = () => {
		const startPage = Math.floor(currentPage / maxPagesToShow) * maxPagesToShow;
		const endPage = Math.min(startPage + maxPagesToShow, totalPages);
		return [...Array(endPage - startPage).keys()].map((i) => startPage + i);
	};
	const scrollToFilterWrapper = () => {
		const filterWrapper = document.querySelector(".product-grid");
		if (filterWrapper) {
			filterWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};
	const handleTagToggle = (tag) => {
		setSelectedTags((prev) => {
			const newTags = prev.includes(tag)
				? prev.filter((t) => t !== tag) // Xóa tag nếu đã có
				: [...prev, tag]; // Thêm tag nếu chưa có
			return newTags;
		});
		setCurrentPage(0); // Reset về trang đầu khi thay đổi tag
	};
	const debounce = (func, delay) => {
		let timeoutId;
		return (...args) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => func(...args), delay);
		};
	}
	const debouncedSetKeyword = useCallback(
		debounce((value) => {
			setKeyword(value);
			setCurrentPage(0);
		}, 500),
		[]
	);
	const handleInputChangeSearch = (e) => {
		const value = e.target.value;
		setInputValue(value);         // cập nhật tức thì cho input
		debouncedSetKeyword(value);   // cập nhật từ khóa sau 500ms
	};
	const navigate = useNavigate();
	const getAllCategories = async () => {
		try {
			const response = await axios.get('http://localhost:8083/api/products/getAllCategories');
			setSalesRankCount(response.data.salesRankCount);
			setProductTypeCount(response.data.productTypeCount);
		} catch (error) {
			console.error('Không lấy được danh mục:', error);
			
		}
	};

	useEffect(() => {
		getAllCategories();
	}, []);
	const handleClickAddShop = () => {
		navigate('/seller/product/addProduct');
	};
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(400);

	const handleMinChange = (e) => {
		const value = Math.min(Number(e.target.value), maxPrice - 10);
		setMinPrice(value);
	};

	const handleMaxChange = (e) => {
		const value = Math.max(Number(e.target.value), minPrice + 10);
		setMaxPrice(value);
	};

	const fetchProductsData = useCallback(
		async (
			page = 0,
			size = 10,
			searchTerm = '',
			minPrice = null,
			maxPrice = null,
			tags = [],
			selectedDiscounts = [],
			statuses = []
		) => {
			setLoading(true);
			try {
				//   const storeId = localStorage.getItem('storeId');
				//   if (!storeId) {
				//     console.error('❌ Không tìm thấy storeId');
				//     return;
				//   }

				const params = {
					storeId: storeId,
					page,
					size,
				};

				if (searchTerm.trim() !== '') {
					params.keyword = searchTerm;
				} if (minPrice !== '' && minPrice !== null && !isNaN(minPrice)) params.minPrice = Number(minPrice);
				if (maxPrice !== '' && maxPrice !== null && !isNaN(maxPrice)) params.maxPrice = Number(maxPrice);
				if (tags.length > 0) {
					params.tags = tags.join(',');
				}
				if (selectedDiscounts.length > 0) {
					params.selectedDiscounts = selectedDiscounts.join(',');
				}
				if (statuses.length > 0) params.status = statuses.join(','); // chuỗi phân cách dấu phẩy

				const response = await axios.get('http://localhost:8085/api/search/searchAdvanceSeller', {
					params,
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				console.log('🔍 Input:', { searchTerm, minPrice, maxPrice, tags, selectedDiscounts });
				setProducts(response.data.content);
				setTotalPages(response.data.totalPages);

			} catch (error) {
				console.error('❌ Lỗi khi gọi API:', error);
				  
				setProducts([]);
				setTotalPages(0);
			} finally {
				setLoading(false);
			}
		},
		[]
	);


	useEffect(() => {
		fetchProductsData(currentPage, pageSize, keyword, minPrice, maxPrice, selectedTags, selectedDiscounts, selectedStatuses);
	}, [currentPage, pageSize, keyword, minPrice, maxPrice, selectedTags, selectedDiscounts, selectedStatuses]);

	useEffect(() => {
		console.log(products, 'product cua tao la');
	})

	return (
		<>
			<div className="main-content">
				<div className="row">

					<div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">

						<div className="page-title-wrapper">
							<div className="page-title-box">
								{/* All Product */}
								<h4 className="page-title">Tất cả sản phẩm</h4>
							</div>
							<button
								onClick={handleClickAddShop}

								style={{
									background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
									color: '#fff',
									fontWeight: '600',
									padding: '12px 24px',
									borderRadius: '16px',
									border: 'none',
									cursor: 'pointer',
									boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
									transition: 'transform 0.3s ease',
								}}
								onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
								onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
							>
								➕ Thêm Sản Phẩm
							</button>
							<div className="breadcrumb-list">
								<ul>
									<li className="breadcrumb-link">
										{/* Dashboard */}
										<a href="index.html"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
									</li>
									{/* All Product */}
									<li className="breadcrumb-link active">Tất cả sản phẩm</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				{/* <!-- Table Start --> */}
				<div className="row ad-btm-space">
					<div className="col-xl-3 col-lg-4 col-md-4 col-sm-12">
						<div className="int-blog-sidebar">
							<div className="int-sidebar-box">
								<h4>Tìm kiếm</h4>
								<div className="int-search-btn">
									<div className="input-group">
										<input type="search" placeholder="Tìm kiếm..." value={inputValue}
											onChange={handleInputChangeSearch} />
										<div className="input-group-append">
											<button type="button">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.239 30.239" width="18" height="18"><g><g>
													<path d="M20.194,3.46c-4.613-4.613-12.121-4.613-16.734,0c-4.612,4.614-4.612,12.121,0,16.735   c4.108,4.107,10.506,4.547,15.116,1.34c0.097,0.459,0.319,0.897,0.676,1.254l6.718,6.718c0.979,0.977,2.561,0.977,3.535,0   c0.978-0.978,0.978-2.56,0-3.535l-6.718-6.72c-0.355-0.354-0.794-0.577-1.253-0.674C24.743,13.967,24.303,7.57,20.194,3.46z    M18.073,18.074c-3.444,3.444-9.049,3.444-12.492,0c-3.442-3.444-3.442-9.048,0-12.492c3.443-3.443,9.048-3.443,12.492,0   C21.517,9.026,21.517,14.63,18.073,18.074z" data-original="#000000" className="active-path" data-old_color="#000000" fill="#ffffff"></path></g></g>
												</svg>
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="widget widget_tag_cloud" >
								<h6 className="widget-title">Trạng Thái</h6>
								<div className="tagcloud">
									{statusOptions.map((status) => (
										<span
											key={status}
											onClick={() => handleStatusToggle(status)}
											style={{
												cursor: 'pointer',
												padding: '5px 14px',
												margin: '5px',
												border: '1px solid #000',
												borderRadius: '12px',
												display: 'inline-block',
												backgroundColor: selectedStatuses.includes(status) ? '#000' : '#fff',
												color: selectedStatuses.includes(status) ? '#fff' : '#000',
												transition: 'all 0.2s ease',
												fontSize: '13px',
											}}
										>
											{statusLabels[status] || status} {/* Hiển thị tiếng Việt */}
										</span>
									))}

								</div>

							</div>
					<div className="widget widget_tag_cloud">
  <h6 className="widget-title">Tags</h6>
  <div className="tagcloud">
    {Array.isArray(tags) && tags.length > 0 ? (
      tags.map((tag) => (
        <span
          key={tag}
          onClick={() => handleTagToggle(tag)}
          onMouseEnter={(e) => {
            if (!selectedTags.includes(tag)) {
              e.currentTarget.style.backgroundColor = '#000';
              e.currentTarget.style.color = '#fff';
            }
          }}
          onMouseLeave={(e) => {
            if (!selectedTags.includes(tag)) {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.color = '#000';
            }
          }}
          style={{
            cursor: 'pointer',
            padding: '5px 14px',
            margin: '5px',
            border: '1px solid #000',
            borderRadius: '12px',
            display: 'inline-block',
            backgroundColor: selectedTags.includes(tag) ? '#000' : '#fff',
            color: selectedTags.includes(tag) ? '#fff' : '#000',
            transition: 'all 0.2s ease',
            fontSize: '13px',
          }}
        >
          {tag}
        </span>
      ))
    ) : (
      <p>Đang tải tags...</p>
    )}
  </div>
</div>


							<div className="int-sidebar-box">
								{/* Filter Price */}

								<div
									style={{
										background: '#fdf7f1',
										padding: '15px',
										width: '350px',
										fontFamily: 'sans-serif',
									}}
								>
									<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
										<span
											style={{
												width: '10px',
												height: '10px',
												background: '#000',
												border: '2px solid #e05959',
												borderRadius: '50%',
												marginRight: '8px',
											}}
										/>
										<span style={{ fontWeight: 'bold' }}>Giá</span>
									</div>

									<div>
										<input
											type="range"
											min="0"
											max="400"
											step="10"
											value={minPrice}
											onChange={handleMinChange}
											style={{
												width: '100%',
												marginTop: '10px',
												appearance: 'none',
												height: '6px',
												background: '#000',
												borderRadius: '5px',
												outline: 'none',
												cursor: 'pointer',
											}}
										/>
										<input
											type="range"
											min="0"
											max="400"
											step="10"
											value={maxPrice}
											onChange={handleMaxChange}
											style={{
												width: '100%',
												marginTop: '10px',
												appearance: 'none',
												height: '6px',
												background: '#000',
												borderRadius: '5px',
												outline: 'none',
												cursor: 'pointer',
											}}
										/>
									</div>

									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											marginTop: '10px',
											fontSize: '14px',
										}}
									>
										<span>Min Price: ${minPrice}</span>
										<span>Max Price: ${maxPrice}</span>
									</div>
								</div>
							</div>
							<div className="int-sidebar-box">
								{/* Discount */}
								<h4>Giảm giá</h4>
								<div className="int-blog-category-mini">
									<ul>
										{discountOptions.map((option, idx) => (
											<li key={idx}>
												<div className="int-checkbox">
													<input
														type="checkbox"
														id={`discount_${idx}`}
														checked={selectedDiscounts.includes(option.value)}
														onChange={() => handleToggleDiscount(option.value)}
													/>
													<label htmlFor={`discount_${idx}`}>{option.label}</label>
												</div>
											</li>
										))}
									</ul>

									{/* Debug để xem biến cập nhật */}
									{/* <p>Đã chọn: {JSON.stringify(selectedDiscounts)}</p> */}
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9 col-lg-8 col-md-8 col-sm-12">
						<div className="main-product-grid">
							<ul style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(4, 1fr)', // 4 sản phẩm/hàng
								gap: '20px',                           // khoảng cách giữa các item
								listStyle: 'none',
								padding: 0,
								margin: 0
							}}
							>
								{products.length > 0 ? (
									products.map((product, index) => (
										<li>
											<div className="product-grid">
												<div className="product-item">
													<img
														src={
															product.productThumbnail.startsWith('http')
																? product.productThumbnail
																: product.productThumbnail.endsWith('.jpg')
																	? `https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${product.productThumbnail}`
																	: `/uploads/${product.productThumbnail}`
														} />													<div className="product-overlay"><h4>-{product.percentDiscount}%</h4></div>
													<div
														className="product-ovr-links"
														style={{
															backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền màu đen mờ 50%
															padding: '15px',
															borderRadius: '8px',
															textAlign: 'center',
															transition: 'background-color 0.3s ease'
														}}
													>											<ul
														onClick={() => navigateChangeProduct(product.asin)} // ✅ Bao bằng arrow function
														style={{
															cursor: 'pointer',
															color: '#fff',
															backgroundColor: '#3b82f6', // Màu xanh
															padding: '10px 20px',
															borderRadius: '8px',
															textAlign: 'center',
															fontWeight: 'bold',
															boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
															userSelect: 'none',
															display: 'inline-block',
															transition: 'all 0.2s ease-in-out'
														}}
														onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
														onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
													>
															SỬA SẢN PHẨM
														</ul>


													</div>
												</div>
												<div className="product-text-rs">
													<a href="javascript:;">
														<i className="fa fa-star" aria-hidden="true"></i>
														<i className="fa fa-star" aria-hidden="true"></i>
														<i className="fa fa-star" aria-hidden="true"></i>
														<i className="fa fa-star" aria-hidden="fals"></i>
														<i className="fa fa-star" aria-hidden="fals"></i>
													</a>
													<h3
														style={{
															fontSize: '16px',
															fontWeight: '600',
															margin: '8px 0 4px 0',
															lineHeight: '1.4em',
															height: '2.8em',                 // Giới hạn chiều cao = 2 dòng
															overflow: 'hidden',
															textOverflow: 'ellipsis',
															display: '-webkit-box',
															WebkitLineClamp: 2,              // Tối đa 2 dòng
															WebkitBoxOrient: 'vertical',
														}}
													>
														<a
															title={product.productTitle}
															style={{
																color: '#333',
																textDecoration: 'none',
																display: 'inline-block',
																maxWidth: '90%',
																whiteSpace: 'normal',
																wordWrap: 'break-word'
															}}
														>
															{product.productTitle}
														</a>
													</h3>

													<p><span>${product.productPrice}</span>${(
														product.productPrice -
														product.productPrice * product.percentDiscount / 100
													).toFixed(2)} </p>
												</div>
											</div>
										</li>
									))
								) : (
									<p className="px-3">Không có sản phẩm nào để hiển thị.</p>

								)}






							</ul>

						</div>
						<div className="col-md-6">
							<nav aria-label="Product Pagination">
								<ul className="pagination style-1">
									{/* Nút Previous */}
									<li className="page-item">
										<a
											className={`page-link ${currentPage === 0 ? 'disabled' : ''}`}

											onClick={() => handlePageChange(currentPage - 1)}
										>
											Trước
										</a>
									</li>
									{/* Các số trang trong phạm vi */}
									{getPageRange().map((page) => (
										<li className="page-item" key={page}>
											<a
												className={`page-link ${page === currentPage ? 'active' : ''}`}
												onClick={() => handlePageChange(page)}
											>
												{page + 1}
											</a>
										</li>
									))}
									{/* Nút Next */}
									<li className="page-item">
										<a
											className={`page-link next ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}
											onClick={() => handlePageChange(currentPage + 1)}
										>
											Sau
										</a>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
				<div className="ad-footer-btm">
					<p>Copyright 2022 © SplashDash All Rights Reserved.</p>
				</div>
			</div>
		</>
	)

}



export default AllProduct;