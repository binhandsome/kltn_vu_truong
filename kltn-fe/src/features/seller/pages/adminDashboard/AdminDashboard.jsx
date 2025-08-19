import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { parseISO } from 'date-fns';
import { api } from '../../utils/api';
// 💡 null-safe lowercase
const safeLower = (s) => (s ?? "").toString().toLowerCase();

// EN -> VI (shop)
const toVNStatus = (s) => {
  const v = safeLower(s);
  if (v === "active") return "Đang hoạt động";
  if (v === "inactive") return "Ngừng hoạt động";
  if (v === "pending") return "Chờ duyệt";
  if (v === "suspended") return "Tạm ngưng";
  return "—";
};

// EN -> VI (order)
const toVNOrderStatus = (s) => {
  const v = safeLower(s);
  if (v === "pending") return "Chờ xử lý";
  if (v === "processing") return "Đang xử lý";
  if (v === "shipped") return "Đã gửi hàng";
  if (v === "completed") return "Hoàn tất";
  if (v === "cancelled" || v === "canceled") return "Đã hủy";
  return "Không rõ";
};

// EN -> VI (payment)
const toVNPaymentStatus = (s) => {
  const v = safeLower(s);
  if (v === "paid") return "Đã thanh toán";
  if (v === "unpaid") return "Chưa thanh toán";
  if (v === "refunded") return "Đã hoàn tiền";
  if (v === "failed") return "Thanh toán thất bại";
  if (v === "pending") return "Chờ thanh toán";
  return s || "—";
};

// EN -> VI (delivery)
const toVNDeliveryStatus = (s) => {
  const v = safeLower(s);
  if (v === "pending") return "Chờ lấy hàng";
  if (v === "picking") return "Đang lấy hàng";
  if (v === "in_transit") return "Đang vận chuyển";
  if (v === "delivered") return "Đã giao";
  if (v === "returned") return "Đã hoàn hàng";
  if (v === "failed") return "Giao thất bại";
  return s || "—";
};

// Badge class (order)
const orderBadge = (s) =>
  ({
    pending: "badge-warning",
    processing: "badge-info",
    shipped: "badge-primary",
    completed: "badge-success",
    cancelled: "badge-danger",
    canceled: "badge-danger",
  }[safeLower(s)] || "badge-secondary");

// Badge class (shop/product)
const statusBadgeClass = (s) => {
  const v = safeLower(s);
  if (v === "active") return "badge-success";
  if (v === "inactive") return "badge-secondary";
  if (v === "pending") return "badge-warning";
  if (v === "suspended") return "badge-danger";
  return "badge-light";
};

// (tùy chọn) Badge class cho payment
const paymentBadge = (s) =>
  ({
    paid: "badge-success",
    refunded: "badge-info",
    failed: "badge-danger",
    unpaid: "badge-warning",
    pending: "badge-warning",
  }[safeLower(s)] || "badge-secondary");

function AdminDashboard() {
  const [hasShop, setHasShop] = useState(null);
  const [message, setMessage] = useState('');
  const [shopStatus, setShopStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalShop, setShowModalShop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [discounts, setDiscounts] = useState([]);
  const [nameShop, setNameShop] = useState('');
  const [thumbnailShop, setThumbnailShop] = useState('');
  const [descriptionShop, setDescriptionShop] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [shopPhone, setShopPhone] = useState('');
  const [shopEmail, setShopEmail] = useState('');
  const handleOpenModalShop = () => setShowModalShop(true);
  const handleCloseModalShop = () => setShowModalShop(false);
  const [shopInfo, setShopInfo] = useState(null);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const API_URL = 'http://localhost:8765/api/seller';
  const navigate = useNavigate();
  
  const [nameDiscount, setNameDiscount] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [percentValue, setPercentValue] = useState('');
  const [dayStart, setDayStart] = useState('');
  const [dayEnd, setDayEnd] = useState('');
  const [status, setStatus] = useState('');
  const [shopDiscountId, setShopDiscountId] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [dashboardSeller, setDashboardSeller] = useState([]);
  const handleOpenModalEdit = () => setShowEditModal(true);
  const handleCloseModalEdit = () => setShowEditModal(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const handleOpenModalConfirm = () => setShowConfirmModal(true);
  const handleCloseModalConfirm = () => setShowConfirmModal(false);
  const [showConfirmModalDiscount, setShowConfirmModalDiscount] = useState(false);
  const handleOpenModalConfirmDiscount = () => setShowConfirmModalDiscount(true);
  const handleCloseModalConfirmDiscount = () => setShowConfirmModalDiscount(false);
  const [showEditDiscountModal, setShowEditDiscountModal] = useState(false);
  const [showConfirmDeleteModalDiscount, setShowConfirmDeleteModalDiscount] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [totalPage, settotalPage]  = useState(1);// quản lý trạng thái modal
  const [selectedDiscount, setSelectedDiscount] = useState({
    discountShopId: '',
    nameDiscount: '',
    minPrice: '',
    percentValue: '',
    dayStart: '',
    dayEnd: '',
    status: ''
  });
const [showDetailModal, setShowDetailModal] = useState(false);
const [selectedOrder, setSelectedOrder] = useState(null);
	const maxPagesToShow = 10;

const handleViewDetail = (order) => {
  setSelectedOrder(order);
  setShowDetailModal(true);
};

const handleCloseDetailModal = () => {
  setShowDetailModal(false);
  setSelectedOrder(null);
};
	const handlePageChange = (pageNumber) => {
		if (pageNumber >= 0 && pageNumber < totalPage) {
			setPageNumber(pageNumber);
		}
	};
  const statusColors = {
    pending: "badge-warning",       // vàng
    processing: "badge-info",       // xanh dương nhạt
    shipped: "badge-primary",       // xanh dương
    completed: "badge-success",     // xanh lá
    cancelled: "badge-danger",      // đỏ
  };
const getPageRange = () => {
  if (!totalPage || totalPage <= 0) return []; // Không có trang nào

  const safeMaxPages = maxPagesToShow || 5; // mặc định nếu maxPagesToShow chưa được set
  const startPage = Math.floor(pageNumber / safeMaxPages) * safeMaxPages;
  const endPage = Math.min(startPage + safeMaxPages, totalPage);

  // ✅ Đảm bảo không bị âm
  if (endPage <= startPage) return [0]; 
  return Array.from({ length: endPage - startPage }, (_, i) => startPage + i);
};

  const handleOpenModalDiscount = (discount) => {
    setSelectedDiscount(discount);
    setShowEditDiscountModal(true);
  };

  const handleCloseDeleteModalDiscount = () => {
    setShowConfirmDeleteModalDiscount(false);
    setSelectedDiscount(null);
  };
  const handleOpenDeleteModalDiscount = (discount) => {
    setSelectedDiscount(discount);
    setShowConfirmDeleteModalDiscount(true);
  };

  const handleCloseModalDiscount = () => {
    setShowEditDiscountModal(false);
    setSelectedDiscount(null);
  };
  function toDatetimeLocal(date) {
    const offset = date.getTimezoneOffset(); // phút lệch UTC
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  }



  const handleEditDiscount = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setMessage('❌ Vui lòng đăng nhập để cập nhật shop.');
      return;
    }
    const formData = new FormData();
    formData.append('accessToken', accessToken);
    formData.append('shopDiscountId', selectedDiscount.discountShopId);
    formData.append('nameDiscount', selectedDiscount.nameDiscount);
    formData.append('minPrice', selectedDiscount.minPrice);
    formData.append('percentValue', selectedDiscount.percentValue);
    formData.append('dayStart', selectedDiscount.dayStart);
    formData.append('dayEnd', selectedDiscount.dayEnd);
    // 👉 Ghi ở đây
    console.log("🎯 FormData to send:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      const response = await api.put(`/update-discount-shop`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error updating shop:', error);
      setMessage(
        error.response?.data?.message || '❌Shop Đã Gửi Yêu Cầu Edit Trước Đó.'
      );
    }
    setShowConfirmModalDiscount(false);

  };

  const handleDeleteDiscount = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setMessage('❌ Vui lòng đăng nhập để xóa shop.');
      return;
    }
    try {
      await api.delete(`/delete-discount-shop`, {
        params: {
          shopDiscountId: selectedDiscount.discountShopId,
        },
      });
      setMessage('✅ Đã xóa mã giảm giá thành công. ');
      setShowConfirmDeleteModalDiscount(false);
      fetchShopDiscounts();
    } catch (error) {
      console.error('Error deleting shop:', error);
setMessage(error.response?.data?.message || '❌ Lỗi khi xóa mã giảm giá. ');    }
  };
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setMessage('❌ Vui lòng đăng nhập để cập nhật shop.');
      return;
    }

    const formData = new FormData();
    formData.append('nameShop', nameShop);
    if (thumbnailShop instanceof File) {
      formData.append('thumbnailShop', thumbnailShop);
    }

    formData.append('descriptionShop', descriptionShop);
    formData.append('shopAddress', shopAddress);
    formData.append('shopPhone', shopPhone);
    formData.append('shopEmail', shopEmail);

    try {
      const response = await api.post(`/create-shop-edit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        }
      });
      setMessage('✅ Cập nhật shop thành công.');
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating shop:', error);
      setMessage(
        error.response?.data?.message || '❌Shop Đã Gửi Yêu Cầu Edit Trước Đó.'
      );
    }
    setShowConfirmModal(false);

  };

  const handleDeleteShop = async () => {
    if (!window.confirm('Bạn có chắc muốn xóa shop?')) return;

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setMessage('❌ Vui lòng đăng nhập để xóa shop.');
      return;
    }

    try {
      await api.delete(`/delete-shop`, {
        headers: {
                    Authorization: `Bearer ${accessToken}`,
        }
      });
      setShopInfo(null);
      setMessage('✅ Đã xóa shop thành công.');
    } catch (error) {
      console.error('Error deleting shop:', error);
      setMessage(error.response?.data || '❌ Lỗi khi xóa shop.');
    }
  };
  useEffect(() => {
    if (shopInfo) {
      setNameShop(shopInfo.nameShop || '');
      setThumbnailShop(shopInfo.thumbnailShop || '');
      setDescriptionShop(shopInfo.descriptionShop || '');
      setShopAddress(shopInfo.shopAddress || '');
      setShopPhone(shopInfo.shopPhone || '');
      setShopEmail(shopInfo.shopEmail || '');
    }
  }, [shopInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setMessage('❌ Vui lòng đăng nhập để tạo mã giảm giá.');
      return;
    }
    // Validate inputs
    if (!nameDiscount.trim()) {
      setMessage('❌ Tên mã giảm giá không được để trống.');
      return;
    }
    if (!minPrice || minPrice <= 0) {
      setMessage('❌ Giá tối thiểu phải lớn hơn 0.');
      return;
    }
    if (!percentValue || percentValue <= 0 || percentValue > 100) {
      setMessage('❌ Phần trăm giảm giá phải từ 1 đến 100.');
      return;
    }
    if (!dayStart || !dayEnd) {
      setMessage('❌ Vui lòng chọn ngày bắt đầu và kết thúc.');
      return;
    }
    if (!status) {
      setMessage('❌ Vui lòng chọn trạng thái.');
      return;
    }
    const discountData = {
      nameDiscount,
      minPrice: parseFloat(minPrice),
      percentValue: parseInt(percentValue),
      dayStart: dayStart,
      dayEnd: dayEnd,
      status
    };

    try {
      const response = await api.post(`/create-discount`, discountData, {
    headers: {
                Authorization: `Bearer ${accessToken}`,

    }
      });
      setMessage('✅ Tạo mã giảm giá thành công!');
      console.log('Discount created:', response.data);
      // Reset form
      setNameDiscount('');
      setMinPrice('');
      setPercentValue('');
      setDayStart('');
      setDayEnd('');
      setStatus('');
      handleCloseModal();
      fetchShopDiscounts();
    } catch (error) {
      console.error('Error creating discount:', error);
      setMessage(error.response?.data || '❌ Lỗi khi tạo mã giảm giá, vui lòng thử lại.');
    }
  };
  const fetchShopDiscounts = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setMessage('❌ Vui lòng đăng nhập để xem mã giảm giá.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.get(`/get-shop-discounts`, {
        headers: {
                                Authorization: `Bearer ${accessToken}`,

        }
      });
      setDiscounts(response.data);
      setMessage(response.data.length > 0 ? '✅ Đã tải danh sách mã giảm giá.' : '⚠️ Chưa có mã giảm giá nào.');
    } catch (error) {
      console.error('Error fetching shop discounts:', error);
      setMessage(error.response?.data?.message || '❌ Lỗi khi tải danh sách mã giảm giá.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchShopDiscounts();
  }, []);
  const handleAddDiscount = () => {
    navigate('/seller/shop/createShop');
  };
  const getPaymentInfo = (method) => {
    switch (method?.toLowerCase()) {
      case "paypal":
        return { icon: "fab fa-cc-paypal", text: "PayPal", color: "text-primary" };
      case "cod":
        return { icon: "fas fa-money-bill-wave", text: "COD", color: "text-success" };
      case "bank":
      case "ngân hàng":
        return { icon: "fas fa-university", text: "Ngân hàng", color: "text-info" };
      default:
        return { icon: "fas fa-credit-card", text: "Khác", color: "text-secondary" };
    }
  };

  useEffect(() => {
    const checkShopStatus = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setMessage('❌ Vui lòng đăng nhập để kiểm tra trạng thái shop.');
        return;
      }

      try {
        const response = await api.get(`/has-shop`, {
          headers: {
                                  Authorization: `Bearer ${accessToken}`,

          }
        });
        setShopStatus(response.data);
        if (response.data.hasShop) {
          switch (response.data.shopStatus) {
            case 'active':
              setMessage('✅ Shop của bạn đang hoạt động.');
              break;
            case 'pending':
              setMessage('⏳ Shop của bạn đang chờ duyệt.');
              break;
            case 'suspended':
              setMessage('⚠️ Shop của bạn đã bị tạm ngưng.');
              break;
            default:
              setMessage('❓ Trạng thái shop không xác định.');
          }
        } else {
          setMessage('⚠️ Bạn chưa có shop.');
        }
      } catch (error) {
        console.error('Error checking shop status:', error);
        setMessage(error.response?.data?.message || '❌ Lỗi khi kiểm tra trạng thái shop.');
      }
    };

    checkShopStatus();
  }, []);
  useEffect(() => {
    console.log("useEffect chạy"); // ✅ Kiểm tra xem hook có chạy không

    const getDashboardSeller = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setMessage('❌ Vui lòng đăng nhập để xem thông tin shop.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get(`/getDashboard`, {
          params: {
            page: pageNumber,
            size: pageSize,
          },
          headers: {
                      Authorization: `Bearer ${accessToken}`,
          }
         
        });
        setDashboardSeller(response.data);
        setMessage('✅ Đã tải thông tin dashboard thành công.');
        settotalPage(response.data.totalPages); // backend trả về

      } catch (error) {
        console.error('Error fetching shop info:', error);
        setMessage(error.response?.data?.message || '❌ Lỗi khi tải thông tin shop.');
          
      } finally {
        setIsLoading(false);
      }
    };

    getDashboardSeller();
}, [pageNumber, pageSize]); // 👈 Thêm pageNumber vào đây

  useEffect(() => {
    const fetchShopInfo = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setMessage('❌ Vui lòng đăng nhập để xem thông tin shop.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get(`/get-shop-info`, {
          headers: {
                                  Authorization: `Bearer ${accessToken}`,

          }
        });
        setShopInfo(response.data);
        setMessage('✅ Đã tải thông tin shop thành công.');
      } catch (error) {
        console.error('Error fetching shop info:', error);
       setMessage(error.response?.data?.message || '❌ Lỗi khi tải thông tin shop.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopInfo();
  }, []);
useEffect(() => {
  console.log('fasjbfaskhbfas', totalPage);
})
  return (
    <>

      <div className="page-wrapper">

        <div className="main-content">
          {shopStatus?.shopStatus === null ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh' // chiều cao toàn màn hình để căn giữa dọc
              }}
            >
              <button
                onClick={handleAddDiscount}

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
                ➕ Thêm Shop
              </button>
            </div>
          ) : shopStatus?.shopStatus === 'pending' ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh' // chiều cao toàn màn hình để căn giữa dọc
              }}
            >
              <button
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
                ➕ Bạn Đã Đăng Ký Shop Rồi, Vui Lòng Đợi Duyệt
              </button>
            </div>
          ) : shopStatus?.shopStatus === 'suspended' ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh' // chiều cao toàn màn hình để căn giữa dọc
              }}
            >
              <button
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
                ➕ Shop Của Bạn Đã Bị Cấm Vĩnh Viễn, Vui Lòng Liên Hệ ADMIN
              </button>
            </div>
          ) : (
            <>


              <div className="row">
                <div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="page-title-wrapper">
                    <div className="page-title-box">
                      {/* Dashboard */}
                      <h4 className="page-title bold">Bảng điều khiển</h4>
                    </div>
                    <div className="breadcrumb-list">
                      <ul>
                        <li className="breadcrumb-link">
                          <a href="index.html">
                            <i className="fas fa-home mr-2" />
                            Bảng điều khiển
                          </a>
                        </li>
                        {/* Admin */}
                        <li className="breadcrumb-link active">SELLER</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* Dashboard Start */}
              <div className="flex flex-wrap gap-4">


              </div>
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-6">
                  {/* Start Card*/}
                  <div className="card ad-info-card">
                    <div className="card-body dd-flex align-items-center">
                      <div className="icon-info">
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 512.126 512.126"
                          xmlSpace="preserve"
                        >
                          <g transform="translate(0 -1)">
                            <g>
                              <g>
                                <path
                                  d="M13.88,171.793h117.986c1.201,2.614,2.547,5.16,4.031,7.625l-0.009,4.175l-22.567,11.587
                                                  c-11.796,5.875-19.293,17.877-19.4,31.054v8.875c0.104,7.537,6.288,13.568,13.825,13.484h125.95
                                                  c7.537,0.085,13.721-5.946,13.825-13.483v-8.875c-0.108-13.178-7.605-25.18-19.4-31.058l-22.583-11.579v-4.171
                                                  c1.49-2.466,2.84-5.015,4.042-7.633h117.983c7.537,0.085,13.721-5.946,13.825-13.483v-8.875
                                                  c-0.107-13.177-7.604-25.179-19.4-31.054v-0.004l-22.583-11.579v-4.196c3.072-5.008,5.558-10.353,7.408-15.929
                                                  c5.027-3.432,8.109-9.062,8.292-15.146V60.689c-0.089-4.571-1.961-8.927-5.217-12.138l-0.025-8.554
                                                  c0.722-9.479-2.508-18.835-8.925-25.85c-9.739-9.271-22.94-13.999-36.35-13.021c-13.434-0.976-26.655,3.772-36.4,13.071
                                                  c-6.195,6.829-9.377,15.867-8.825,25.071v9.259c-3.309,3.191-5.213,7.566-5.292,12.162v10.837
                                                  c0.183,6.084,3.265,11.713,8.292,15.146c1.848,5.573,4.331,10.915,7.4,15.921l-0.009,4.2l-13.682,7.024
                                                  c-0.04-8.48-3.251-16.638-9.002-22.87c-9.739-9.27-22.939-13.999-36.35-13.021c-13.434-0.976-26.655,3.772-36.4,13.071
                                                  c-5.69,6.256-8.857,14.4-8.889,22.856l-13.761-7.056v-4.196c3.072-5.008,5.558-10.353,7.408-15.929
                                                  c5.027-3.432,8.109-9.062,8.292-15.146V60.689c-0.09-4.57-1.962-8.924-5.217-12.133l-0.025-8.558
                                                  c0.723-9.479-2.508-18.836-8.925-25.85c-9.739-9.271-22.94-13.999-36.35-13.021C63.421,0.151,50.2,4.898,40.455,14.197
                                                  c-6.195,6.831-9.377,15.87-8.825,25.075v9.259c-3.307,3.19-5.211,7.564-5.292,12.158v10.837
                                                  c0.183,6.084,3.265,11.713,8.292,15.146c1.849,5.573,4.332,10.915,7.4,15.921l-0.009,4.2l-22.567,11.588
                                                  c-11.796,5.875-19.293,17.877-19.4,31.054v8.875C0.159,165.846,6.343,171.878,13.88,171.793z M241.063,120.151
                                                  c3.963-2.5,6.193-7.008,5.775-11.675v-8.363c-0.001-1.683-0.499-3.329-1.434-4.729c-3.314-4.994-5.84-10.468-7.491-16.229
                                                  c-0.555-2.011-1.827-3.749-3.575-4.887c-1.249-0.682-2.339-1.621-3.2-2.754v0.004l-0.075-10.438
                                                  c0.643-0.803,1.388-1.519,2.217-2.129c1.993-1.622,3.15-4.055,3.15-6.625l-0.025-13.754c-0.366-4.656,1.181-9.259,4.284-12.75
                                                  c6.584-5.711,15.224-8.469,23.9-7.629c8.668-0.841,17.302,1.912,23.883,7.617c3.252,3.69,4.829,8.563,4.358,13.458v13.058
                                                  c0,2.57,1.157,5.003,3.15,6.625c1.692,1.371,2.05,1.833,2.058,1.737l0.017,10.696c0,0.009-0.383,1.05-3.217,2.883
                                                  c-1.748,1.138-3.02,2.876-3.575,4.887c-1.651,5.762-4.178,11.235-7.492,16.229c-0.934,1.4-1.433,3.046-1.434,4.729v8.363
                                                  c-0.392,4.852,2.04,9.498,6.25,11.942l25.6,13.141c6.094,2.966,10.008,9.1,10.133,15.876v5.292h-104.35
                                                  c0.843-2.028,1.273-4.204,1.267-6.4v-10.837c0.004-2.221-0.456-4.418-1.35-6.45L241.063,120.151z M139.413,135.743
                                                  c1.554-1.34,2.563-3.203,2.838-5.236l0.04-0.177c0.121-0.394,0.212-0.796,0.273-1.204l-0.025-13.75
                                                  c-0.366-4.657,1.18-9.263,4.283-12.755c6.584-5.711,15.224-8.469,23.9-7.629c8.668-0.841,17.302,1.912,23.883,7.617
                                                  c3.251,3.692,4.829,8.565,4.358,13.462v13.054c0,2.57,1.157,5.003,3.15,6.625c1.692,1.371,2.058,1.829,2.058,1.737l0.017,10.696
                                                  c0,0.009-0.383,1.05-3.217,2.883c-1.731,1.126-2.995,2.842-3.558,4.829c-0.34,1.328-0.774,2.63-1.3,3.896
                                                  c-0.052,0.116-0.062,0.241-0.108,0.358c-0.024,0.061-0.078,0.101-0.101,0.163c-1.501,4.139-3.49,8.083-5.925,11.75
                                                  c-0.983,1.426-1.509,3.118-1.508,4.85v8.363c-0.392,4.852,2.039,9.498,6.25,11.942l25.6,13.138
                                                  c6.093,2.968,10.008,9.102,10.133,15.878v5.292H110.988v-5.292c0.124-6.776,4.039-12.91,10.133-15.875l26.075-13.408
                                                  c3.963-2.5,6.193-7.008,5.775-11.675v-8.363c0.001-1.732-0.525-3.424-1.508-4.85c-2.489-3.786-4.525-7.85-6.067-12.11
                                                  l-0.012-0.029l-0.055-0.132c-0.526-1.266-0.96-2.568-1.3-3.896c-0.566-1.986-1.83-3.7-3.558-4.829
                                                  c-1.249-0.682-2.339-1.621-3.2-2.754v0.004l-0.083-10.433C137.837,137.08,138.584,136.36,139.413,135.743z M17.122,149.435
                                                  c0.124-6.776,4.039-12.91,10.133-15.875l26.075-13.408c3.963-2.5,6.193-7.008,5.775-11.675v-8.363
                                                  c-0.001-1.683-0.499-3.329-1.434-4.729c-3.314-4.994-5.84-10.468-7.492-16.229c-0.555-2.011-1.827-3.749-3.575-4.887
                                                  c-1.249-0.682-2.339-1.621-3.2-2.754v0.004l-0.083-10.433c0.648-0.805,1.396-1.525,2.225-2.142
                                                  c1.992-1.619,3.149-4.049,3.15-6.616l-0.025-13.75c-0.366-4.657,1.181-9.262,4.284-12.754c6.584-5.711,15.224-8.469,23.9-7.629
                                                  c8.668-0.841,17.302,1.912,23.883,7.617c3.251,3.692,4.829,8.565,4.358,13.462v13.054c0.001,2.567,1.158,4.997,3.15,6.617
                                                  c1.692,1.379,2.067,1.842,2.058,1.746l0.017,10.696c0,0.009-0.383,1.05-3.217,2.883c-1.748,1.138-3.02,2.876-3.575,4.887
                                                  c-1.651,5.762-4.178,11.235-7.492,16.23c-0.934,1.4-1.433,3.046-1.434,4.729v8.363c-0.392,4.852,2.04,9.498,6.25,11.942
                                                  l20.763,10.656c-0.92,2.014-1.402,4.2-1.413,6.415v10.837c0.036,2.206,0.514,4.382,1.406,6.4H17.122V149.435z"
                                />
                                <path
                                  d="M26.422,400.235c1.51-0.001,3.018-0.125,4.508-0.371c55.972-9.13,252.363-56.295,443.986-279.584l11.697,6.639
                                                  c5.476,3.078,12.2,2.903,17.508-0.456c5.309-3.359,8.346-9.361,7.908-15.627l-4.692-63.371
                                                  c-0.399-5.686-3.615-10.795-8.57-13.612c-4.955-2.817-10.99-2.969-16.08-0.405l-56.7,28.654
                                                  c-5.651,2.802-9.287,8.503-9.444,14.809c-0.157,6.306,3.189,12.181,8.694,15.262l8.583,4.873
                                                  C253.671,295.491,73.423,339.651,21.938,348.477c-12.583,2.109-21.821,12.971-21.883,25.729c0.003,2.12,0.269,4.232,0.792,6.288
                                                  C3.817,392.172,14.371,400.319,26.422,400.235z M24.855,365.293c53.354-9.143,241.519-55.127,427.17-262.877
                                                  c1.32-0.706,2.425-1.756,3.197-3.04c2.323-4.099,0.887-9.305-3.209-11.633l-18.367-10.392l56.675-28.663l4.692,63.375
                                                  l-17.75-10.071c-0.277-0.109-0.561-0.202-0.848-0.279c-3.098-1.393-6.734-0.749-9.164,1.625c-0.245,0.173-0.48,0.359-0.704,0.558
                                                  C277.23,327.422,83.155,374.052,28.164,383.022c-4.808,0.917-9.51-2.028-10.783-6.754c-0.17-0.674-0.257-1.367-0.259-2.063
                                                  C17.192,369.75,20.454,365.99,24.855,365.293z"
                                />
                                <path
                                  d="M76.855,419.26h-51.2c-14.132,0.015-25.585,11.468-25.6,25.6v59.733c-0.001,2.263,0.898,4.434,2.499,6.035
                                                  c1.6,1.6,3.771,2.499,6.035,2.499h85.333c2.263,0.001,4.434-0.898,6.035-2.499c1.6-1.6,2.499-3.771,2.499-6.035V444.86
                                                  C102.44,430.728,90.987,419.275,76.855,419.26z M85.388,496.06H17.122v-51.2c0.005-4.711,3.822-8.529,8.533-8.533h51.2
                                                  c4.711,0.005,8.529,3.822,8.533,8.533V496.06z"
                                />
                                <path
                                  d="M213.388,385.126h-51.2c-14.132,0.015-25.585,11.468-25.6,25.6v93.867c-0.001,2.263,0.898,4.434,2.499,6.035
                                                  c1.6,1.6,3.771,2.499,6.035,2.499h85.333c2.263,0.001,4.434-0.898,6.035-2.499c1.6-1.6,2.499-3.771,2.499-6.035v-93.867
                                                  C238.973,396.594,227.52,385.142,213.388,385.126z M221.922,496.06h-68.267v-85.333c0.005-4.711,3.822-8.529,8.533-8.533h51.2
                                                  c4.711,0.005,8.529,3.822,8.533,8.533V496.06z"
                                />
                                <path
                                  d="M349.922,308.326h-51.2c-14.132,0.015-25.585,11.468-25.6,25.6v170.667c-0.001,2.263,0.898,4.434,2.499,6.035
                                                  c1.6,1.6,3.771,2.499,6.035,2.499h85.333c2.263,0.001,4.434-0.898,6.035-2.499c1.6-1.6,2.499-3.771,2.499-6.035V333.926
                                                  C375.506,319.794,364.054,308.342,349.922,308.326z M358.455,496.06h-68.267V333.926c0.005-4.711,3.822-8.529,8.533-8.533h51.2
                                                  c4.711,0.005,8.529,3.823,8.533,8.533V496.06z"
                                />
                                <path
                                  d="M486.455,205.926h-51.2c-14.132,0.015-25.585,11.468-25.6,25.6v273.067c-0.001,2.263,0.898,4.434,2.499,6.035
                                                  c1.6,1.6,3.771,2.499,6.035,2.499h85.333c2.263,0.001,4.434-0.898,6.035-2.499c1.6-1.6,2.499-3.771,2.499-6.035V231.526
                                                  C512.04,217.394,500.587,205.942,486.455,205.926z M494.988,496.06h-68.267V231.526c0.005-4.711,3.822-8.529,8.533-8.533h51.2
                                                  c4.711,0.005,8.529,3.822,8.533,8.533V496.06z"
                                />
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div className="icon-info-text">
                        {/* Happy Customers */}
                        <h5 className="ad-title">Số Lượng Người Theo Dõi</h5>
                        <h4 className="ad-card-title">{dashboardSeller.followers}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Start Card*/}
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="card ad-info-card">
                    <div className="card-body dd-flex align-items-center">
                      <div className="icon-info">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                          <g id="shopping-smartphone-home-house-hand">
                            <path d="M60.02,25.05a2.971,2.971,0,0,0,1.84-1.54l.21-.41a3.022,3.022,0,0,0-1.14-3.91L33.54,2.76a2.988,2.988,0,0,0-3.08,0L3.07,19.19A3.022,3.022,0,0,0,1.93,23.1l.21.41a2.971,2.971,0,0,0,1.84,1.54,3.045,3.045,0,0,0,.84.12A3.033,3.033,0,0,0,6,24.9V56H5a3,3,0,0,0,0,6H59a3,3,0,0,0,0-6H58V24.91A2.928,2.928,0,0,0,60.02,25.05ZM59,58a1,1,0,0,1,0,2H5a1,1,0,0,1,0-2ZM46,37H56v9H41V29a1,1,0,0,1,2,0v5A3.009,3.009,0,0,0,46,37Zm0-2a1,1,0,0,1-1-1V29a2.98,2.98,0,0,0-4-2.82V23a3.009,3.009,0,0,0-3-3H26a3.009,3.009,0,0,0-3,3v7a3.009,3.009,0,0,0-3,3,2.974,2.974,0,0,0,.78,2,2.954,2.954,0,0,0,0,4,2.954,2.954,0,0,0,0,4A2.974,2.974,0,0,0,20,45a3.009,3.009,0,0,0,3,3v1a3.009,3.009,0,0,0,3,3H38a3.009,3.009,0,0,0,3-3V48H56v8H8V23.76L31.48,9.62a1.02,1.02,0,0,1,1.04,0L56,23.76V35ZM23,36h2a1,1,0,0,1,0,2H23a1,1,0,0,1,0-2Zm-1-3a1,1,0,0,1,1-1h2a1,1,0,0,1,0,2H23A1,1,0,0,1,22,33Zm1,7h2a1,1,0,0,1,0,2H23a1,1,0,0,1,0-2Zm0,4h2a1,1,0,0,1,0,2H23a1,1,0,0,1,0-2Zm2,4a3.009,3.009,0,0,0,3-3h8a1,1,0,0,0,1-1V34a1,1,0,0,0-1-1H35a3.99,3.99,0,0,0-7.58-1.75A2.956,2.956,0,0,0,25,30V23a1,1,0,0,1,1-1H38a1,1,0,0,1,1,1V49a1,1,0,0,1-1,1H26a1,1,0,0,1-1-1Zm2.22-9a2.954,2.954,0,0,0,0-4H35v8H27.22a2.954,2.954,0,0,0,0-4ZM29,33a2,2,0,0,1,4,0ZM33.55,7.91a2.979,2.979,0,0,0-3.1,0L5.34,23.03a1.018,1.018,0,0,1-.8.1.972.972,0,0,1-.61-.51l-.21-.41A1.021,1.021,0,0,1,4.1,20.9L31.49,4.47a1,1,0,0,1,1.02,0L59.9,20.9a1.021,1.021,0,0,1,.38,1.31l-.21.41a.972.972,0,0,1-.61.51,1.018,1.018,0,0,1-.8-.1Z" />
                          </g>
                        </svg>
                      </div>
                      <div className="icon-info-text">
                        {/* Daily Orders */}
                        <h5 className="ad-title">Đơn hàng hôm nay</h5>
                        <h4 className="ad-card-title">{dashboardSeller.ordersToday}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Start Card*/}
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="card ad-info-card">
                    <div className="card-body dd-flex align-items-center">
                      <div className="icon-info">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                          <g
                            id="hand_·_ecommerce_·_shopping_·_online_·_sale"
                            data-name="hand · ecommerce · shopping · online · sale"
                          >
                            <path d="M61,52H59V23a3.009,3.009,0,0,0-3-3H49V9a1,1,0,0,0-1-1H45a5.992,5.992,0,0,0-8.5-5.45A5.992,5.992,0,0,0,28,8H24a1,1,0,0,0-1,1V20H8a3.009,3.009,0,0,0-3,3V52H3a1,1,0,0,0-1,1v4a5,5,0,0,0,5,5H57a5,5,0,0,0,5-5V53A1,1,0,0,0,61,52ZM45,25V10h2V27a3.009,3.009,0,0,1-3,3H42.89A6.97,6.97,0,0,0,45,25ZM39,4a4,4,0,0,1,4,4H40a6.016,6.016,0,0,0-1.49-3.95A3.87,3.87,0,0,1,39,4Zm-2.5.9A3.976,3.976,0,0,1,38,8H35A3.976,3.976,0,0,1,36.5,4.9ZM34,4a3.87,3.87,0,0,1,.49.05A6.016,6.016,0,0,0,33,8H30A4,4,0,0,1,34,4Zm-9,6h3v2a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2V10h8v2a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2V10h3V25a5,5,0,0,1-5,5H30a5,5,0,0,1-5-5ZM23.08,26A7,7,0,0,0,30,32H44a5,5,0,0,0,5-5V26h4V48H11V46h5a1,1,0,0,0,1-1v-.14l.93.62a2.952,2.952,0,0,0,1.68.52H34.46a2.925,2.925,0,0,0,1.5-.4l13.4-7.73a3.006,3.006,0,0,0,1.1-4.1,3.011,3.011,0,0,0-4.1-1.1l-6.43,3.71A2.993,2.993,0,0,0,37,34H29.3l-.2-.13A10.972,10.972,0,0,0,17,33.8V33a1,1,0,0,0-1-1H11V26ZM11,44V34h4V44Zm20-4h6a2.982,2.982,0,0,0,1.98-.77l8.39-4.83a1.006,1.006,0,0,1,1.49.86.992.992,0,0,1-.5.87L34.95,43.87a.922.922,0,0,1-.49.13H19.61a1.023,1.023,0,0,1-.56-.17L17,42.46V36a.967.967,0,0,0,.55-.17l.46-.3a8.975,8.975,0,0,1,9.98,0l.46.3A.967.967,0,0,0,29,36h8a1,1,0,0,1,.71,1.7.01.01,0,0,0-.01.01A.991.991,0,0,1,37,38H31a1,1,0,0,0,0,2ZM7,23a1,1,0,0,1,1-1H23v2H10a1,1,0,0,0-1,1V49a1,1,0,0,0,1,1H54a1,1,0,0,0,1-1V25a1,1,0,0,0-1-1H49V22h7a1,1,0,0,1,1,1V52H7ZM36,54v1a1,1,0,0,1-1,1H29a1,1,0,0,1-1-1V54Zm24,3a3.009,3.009,0,0,1-3,3H7a3.009,3.009,0,0,1-3-3V54H26v1a3.009,3.009,0,0,0,3,3h6a3.009,3.009,0,0,0,3-3V54H60Z" />
                            <path d="M29.293,26.707a1,1,0,0,0,1.414,0l8-8a1,1,0,0,0-1.414-1.414l-8,8A1,1,0,0,0,29.293,26.707Z" />
                            <circle cx={30} cy={20} r={2} />
                            <circle cx={38} cy={24} r={2} />
                          </g>
                        </svg>
                      </div>
                      <div className="icon-info-text">
                        {/* Total Sales */}
                        <h5 className="ad-title">Đơn hàng tháng này</h5>
                        <h4 className="ad-card-title">{dashboardSeller.ordersThisMonth}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Start Card*/}
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="card ad-info-card">
                    <div className="card-body dd-flex align-items-center">
                      <div className="icon-info">
                        <svg
                          enableBackground="new 0 0 64 64"
                          viewBox="0 0 64 64"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path d="m28 60c4.962 0 9-4.038 9-9s-4.038-9-9-9-9 4.038-9 9 4.038 9 9 9zm0-16c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7z" />
                            <path d="m26 53h-2c0 1.654 1.346 3 3 3v1h2v-1c1.654 0 3-1.346 3-3s-1.346-3-3-3v-2c.551 0 1 .449 1 1h2c0-1.654-1.346-3-3-3v-1h-2v1c-1.654 0-3 1.346-3 3s1.346 3 3 3v2c-.551 0-1-.449-1-1zm0-4c0-.551.449-1 1-1v2c-.551 0-1-.449-1-1zm3 3c.551 0 1 .449 1 1s-.449 1-1 1z" />
                            <path d="m62 29h-9v-4.08c3.387-.488 6-3.401 6-6.92v-4c0-.552-.448-1-1-1-2.548 0-4.775 1.373-6 3.413-1.225-2.04-3.452-3.413-6-3.413-.552 0-1 .448-1 1v4c0 3.519 2.613 6.432 6 6.92v4.08h-18v-5h3c3.86 0 7-3.14 7-7 0-.552-.448-1-1-1h-4c-1.958 0-3.728.81-5 2.11v-5.169c4.493-.5 8-4.317 8-8.941v-2c0-.552-.448-1-1-1-3.483 0-6.505 1.993-8 4.896-1.495-2.903-4.517-4.896-8-4.896-.552 0-1 .448-1 1v2c0 4.624 3.507 8.441 8 8.941v5.169c-1.272-1.3-3.042-2.11-5-2.11h-4c-.552 0-1 .448-1 1 0 3.86 3.14 7 7 7h3v5h-18v-4.08c3.387-.488 6-3.401 6-6.92v-4c0-.552-.448-1-1-1-2.548 0-4.775 1.373-6 3.413-1.225-2.04-3.452-3.413-6-3.413-.552 0-1 .448-1 1v4c0 3.519 2.613 6.432 6 6.92v4.08h-1c-.552 0-1 .448-1 1v5h-3c-.552 0-1 .448-1 1v3h-3c-.552 0-1 .448-1 1v22c0 .552.448 1 1 1h52c.552 0 1-.448 1-1v-3h3c.552 0 1-.448 1-1v-5h3c.552 0 1-.448 1-1v-22c0-.552-.448-1-1-1zm-5-13.899v2.899c0 2.415-1.721 4.435-4 4.899v-2.899c0-2.415 1.721-4.435 4-4.899zm-10 2.899v-2.899c2.279.464 4 2.485 4 4.899v2.899c-2.279-.464-4-2.484-4-4.899zm-9 0h2.899c-.464 2.279-2.485 4-4.899 4h-2.899c.464-2.279 2.484-4 4.899-4zm-10 4c-2.415 0-4.435-1.721-4.899-4h2.899c2.415 0 4.435 1.721 4.899 4zm11-18.929v.929c0 3.521-2.612 6.442-6 6.929v-.929c0-3.521 2.612-6.442 6-6.929zm-14 .929v-.929c3.388.487 6 3.408 6 6.929v.929c-3.388-.487-6-3.408-6-6.929zm-8 11.101v2.899c0 2.415-1.721 4.435-4 4.899v-2.899c0-2.415 1.721-4.435 4-4.899zm-10 2.899v-2.899c2.279.464 4 2.485 4 4.899v2.899c-2.279-.464-4-2.484-4-4.899zm46 43h-50v-20h50zm4-4h-2v-17c0-.552-.448-1-1-1h-47v-2h50zm4-6h-2v-15c0-.552-.448-1-1-1h-47v-4h50z" />
                            <path d="m6 59h12v-2h-11v-12h11v-2h-12c-.552 0-1 .448-1 1v14c0 .552.448 1 1 1z" />
                            <path d="m51 58v-14c0-.552-.448-1-1-1h-12v2h11v12h-11v2h12c.552 0 1-.448 1-1z" />
                            <path d="m46 54c.552 0 1-.448 1-1v-4c0-.552-.448-1-1-1h-6c-.552 0-1 .448-1 1v4c0 .552.448 1 1 1zm-5-4h4v2h-4z" />
                            <path d="m10 48c-.552 0-1 .448-1 1v4c0 .552.448 1 1 1h6c.552 0 1-.448 1-1v-4c0-.552-.448-1-1-1zm5 4h-4v-2h4z" />
                          </g>
                        </svg>
                      </div>
                      <div className="icon-info-text">
                        {/* Total Revenue */}
                        <h5 className="ad-title">Tổng doanh thu</h5>
                        <h4 className="ad-card-title">{dashboardSeller.totalRevenue}$</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revanue Status Start */}
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="card chart-card">
                    <div className="card-header">
                      <h4 className="has-btn">
                        {/* Total Revanue */}
                        Tổng lợi nhuận{" "}
                        <span>
                    
                        </span>
                      </h4>
                    </div>
                    <div className="card-body">
                      <div className="col-12"> {/* Full width */}
                        <div className="chart-holder" style={{ width: '100%' }}>
                          <div id="chartD" style={{ width: '100%', height: '400px' }} />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card chart-card">
                    <div className="card-header">
                      <h4>Thông Tin Shop</h4>
                    </div>
                    <div className="card-body pb-4">
                      <div className="chart-holder">
                        <div className="table-responsive">
                          <table className="table table-styled mb-0">
                            <thead>
                              <tr>
                                <th>
                                  {/* <div className="checkbox">
                            <input id="checkbox1" type="checkbox" />
                            <label htmlFor="checkbox1" />
                          </div> */}
                                </th>
                                {/* <th>Tên Mã</th> */}
                                <th>Thông Tin Shop</th>
                                <th>Số Điện Thoại</th>
                                <th>Email</th>
                                <th>Trạng Thái</th>
                                <th>Ngày Tạo Shop</th>
                                <th>Xem chi tiết</th>
                                {/* Action */}
                                <th>Hoạt động</th>
                              </tr>
                            </thead>
                            <tbody>

                              <tr>
                                <td>
                                  {/* <div className="checkbox">
                            <input id="checkbox9" type="checkbox" />
                            <label htmlFor="checkbox9" />
                          </div> */}
                                </td>
                                {/* <td>#DD1048</td> */}
                                <td>
                                  <span className="img-thumb ">
                                    <img src={shopInfo?.thumbnailShop} alt=" " />
                                    <span className="ml-2 ">{shopInfo?.nameShop}</span>
                                  </span>
                                </td>
                                <td>{shopInfo?.shopPhone}</td>
                                <td>{shopInfo?.shopEmail}</td>
                                <td>
  <label
    className={`mb-0 badge ${statusBadgeClass(shopInfo?.shopStatus)}`}
  >
    {toVNStatus(shopInfo?.shopStatus)}
  </label>
</td>
                                <td>
                                  <span className="img-thumb">
                                    <span className="ml-2">{shopInfo?.createdAt}</span>
                                  </span>
                                </td>
                                <td>
                                  <button
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                    onClick={handleOpenModalShop}

                                  >
                                    Xem chi tiết
                                  </button>
                                </td>
                                <td className="relative">
                                  <a
                                    className="action-btn "
                                    href="javascript:void(0); "
                                  >
                                    <svg
                                      className="default-size "
                                      viewBox="0 0 341.333 341.333 "
                                    >
                                      <g>
                                        <g>
                                          <g>
                                            <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                            <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                            <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </a>
                                  <div className="action-option ">
                                    <ul>
                                      <li>
                                        <a onClick={() => setShowEditModal(true)}
                                        >
                                          <i className="far fa-edit mr-2 " />
                                          Sửa
                                        </a>
                                      </li>
                                      {/* <li>
                                <a onClick={handleDeleteShop}>
                                  <i className="far fa-trash-alt mr-2 " />
                                  Delete
                                </a>
                              </li> */}
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {showEditModal && (
                <div
                  className="modal-backdrop "
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1050,
                  }}
                >
                  <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Chỉnh sửa Shop</h5>
                        <button
                          type="button"
                          className="close"
                          onClick={handleCloseModalEdit}
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body" style={{
                        maxHeight: '70vh',       // giới hạn chiều cao
                        overflowY: 'auto',       // thêm cuộn khi vượt quá
                        paddingRight: '10px',

                      }}>
                        <form >


                          <div className="ad-auth-form">
                            {/* Tên Shop */}
                            <div className="ad-auth-feilds mb-30">
                              <input
                                type="text"
                                placeholder="Tên Shop"
                                className="ad-input"
                                value={nameShop}
                                onChange={(e) => setNameShop(e.target.value)}
                                required
                              />
                              <div className="ad-auth-icon">
                                {/* icon cửa hàng */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px" fill="#9abeed">
                                  <path d="M21 7H3V5h18v2zm0 2H3v10h18V9zM5 17v-6h2v6H5zm4 0v-6h2v6H9zm4 0v-6h2v6h-2zm4 0v-6h2v6h-2z" />
                                </svg>
                              </div>
                            </div>

                            {/* Số điện thoại Shop */}
                            <div className="ad-auth-feilds mb-30">
                              <input
                                type="text"
                                placeholder="Số Điện Thoại Shop"
                                className="ad-input"
                                value={shopPhone}
                                onChange={(e) => setShopPhone(e.target.value)}
                                required
                              />
                              <div className="ad-auth-icon">
                                {/* icon điện thoại */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px" fill="#9abeed">
                                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                              </div>
                            </div>

                            {/* Email Shop */}
                            <div className="ad-auth-feilds mb-30">
                              <input
                                type="email"
                                placeholder="Email Shop"
                                className="ad-input"
                                value={shopEmail}
                                onChange={(e) => setShopEmail(e.target.value)}
                                required
                              />
                              <div className="ad-auth-icon">
                                {/* icon email */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px" fill="#9abeed">
                                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                              </div>
                            </div>

                            {/* Ảnh đại diện Shop */}
                            <div className="ad-auth-feilds mb-30">
                              <label>Ảnh đại diện Shop</label>
                              <input
                                type="file"
                                accept="image/*"
                                className="ad-input"
                                onChange={(e) => setThumbnailShop(e.target.files[0])}
                                required
                              />
                            </div>

                            {/* Địa chỉ Shop */}
                            <div className="ad-auth-feilds mb-30">
                              <input
                                type="text"
                                placeholder="Địa Chỉ Shop"
                                className="ad-input"
                                value={shopAddress}
                                onChange={(e) => setShopAddress(e.target.value)}
                                required
                              />
                              <div className="ad-auth-icon">
                                {/* icon location */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px" fill="#9abeed">
                                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z" />
                                </svg>
                              </div>
                            </div>

                            {/* Mô tả Shop */}
                            <div className="ad-auth-feilds mb-30">
                              <textarea
                                placeholder="Giới thiệu ngắn gọn về shop..."
                                className="ad-input"
                                rows={4}
                                value={descriptionShop}
                                onChange={(e) => setDescriptionShop(e.target.value)}
                                required
                                style={{
                                  width: '100%',
                                  resize: 'vertical',        // cho phép kéo chiều cao nếu cần
                                  fontSize: '14px',
                                  padding: '10px 12px',
                                  border: '1px solid #ccc',
                                  borderRadius: '6px',
                                  fontFamily: 'inherit',
                                  boxSizing: 'border-box'
                                }}
                              ></textarea>
                            </div>
                          </div>

                          <div className="ad-auth-btn">

                          </div>
                          {message}
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary squer-btn"
                          onClick={handleCloseModalEdit}
                        >
                          Đóng
                        </button>
                        <button
                          type="button"
                          className="btn squer-btn"
                          style={{
                            color: '#fff',
                            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', // xanh cyan → xanh dương
                            fontWeight: '600',
                            padding: '10px 24px',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                          onClick={handleOpenModalConfirm}
                        >
                          ➕ Sửa Shop và Đợi Duyệt
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              )}
              {showConfirmDeleteModalDiscount && (
                <div
                  className="modal-backdrop "
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1050,
                  }}
                >
                  <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Xóa Mã Giảm Giá</h5>
                        <button
                          type="button"
                          className="close"
                          onClick={handleCloseDeleteModalDiscount}
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body" style={{
                        maxHeight: '70vh',       // giới hạn chiều cao
                        overflowY: 'auto',       // thêm cuộn khi vượt quá
                        paddingRight: '10px',

                      }}>
                        <div className="modal-body">
                          Bạn có chắc chắn muốn xóa Mã Giảm Giá này không ?
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary squer-btn"
                          onClick={handleCloseDeleteModalDiscount}
                        >
                          Đóng
                        </button>
                        <button
                          type="button"
                          className="btn squer-btn"
                          style={{
                            color: '#fff',
                            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', // xanh cyan → xanh dương
                            fontWeight: '600',
                            padding: '10px 24px',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                          onClick={handleDeleteDiscount}
                        >
                          ➕ Xác Nhận
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              )}
              {showConfirmModal && (
                <div
                  className="modal-backdrop "
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1050,
                  }}
                >
                  <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Chỉnh Sửa Shop</h5>
                        <button
                          type="button"
                          className="close"
                          onClick={handleCloseModalShop}
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body" style={{
                        maxHeight: '70vh',       // giới hạn chiều cao
                        overflowY: 'auto',       // thêm cuộn khi vượt quá
                        paddingRight: '10px',

                      }}>
                        <div className="modal-body">
                          Bạn có chắc chắn muốn gửi yêu cầu chỉnh sửa không?
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary squer-btn"
                          onClick={handleCloseModalConfirm}
                        >
                          Đóng
                        </button>
                        <button
                          type="button"
                          className="btn squer-btn"
                          style={{
                            color: '#fff',
                            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', // xanh cyan → xanh dương
                            fontWeight: '600',
                            padding: '10px 24px',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                          onClick={handleEditSubmit}
                        >
                          ➕ Xác Nhận
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              )}
              {showModalShop && (
                <div
                  className="modal-backdrop "
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1050,
                  }}
                >
                  <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Thông Tin Chi Tiết</h5>
                        <button
                          type="button"
                          className="close"
                          onClick={handleCloseModalShop}
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body" style={{
                        maxHeight: '70vh',       // giới hạn chiều cao
                        overflowY: 'auto',       // thêm cuộn khi vượt quá
                        paddingRight: '10px',

                      }}>
                        <table className="table table-styled mb-0">
                          <thead>
                            <tr>
                              <th>
                                {/* <div className="checkbox">
                            <input id="checkbox1" type="checkbox" />
                            <label htmlFor="checkbox1" />
                          </div> */}
                              </th>
                              {/* <th>Tên Mã</th> */}
                              <th>Địa Chỉ</th>
                              <th>Mô Tả</th>
                              <th>Đánh Giá</th>
                              <th>Người Theo Dõi</th>

                            </tr>
                          </thead>
                          <tbody>

                            <tr>
                              <td>
                                {/* <div className="checkbox">
                            <input id="checkbox9" type="checkbox" />
                            <label htmlFor="checkbox9" />
                          </div> */}
                              </td>
                              {/* <td>#DD1048</td> */}

                              <td>{shopInfo?.shopAddress}</td>
                              <td style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                {shopInfo?.description}
                              </td>
                              <td>{shopInfo?.avaluate}</td>
                              <td>{shopInfo?.followers}</td>


                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary squer-btn"
                          onClick={handleCloseModalShop}
                        >
                          Đóng
                        </button>
                        <button
                          type="button"
                          className="btn squer-btn"
                          style={{
                            color: '#fff',
                            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', // xanh cyan → xanh dương
                            fontWeight: '600',
                            padding: '10px 24px',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                          onClick={handleSubmit}
                        >
                          ➕ Thêm Mã Giảm Giá
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              )}
              {showConfirmModalDiscount && (
                <div
                  className="modal-backdrop "
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2000, // ✅ cao hơn modal khác
                  }}
                >
                  <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Chỉnh Sửa Shop</h5>
                        <button
                          type="button"
                          className="close"
                          onClick={handleCloseModalConfirmDiscount}
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body" style={{
                        maxHeight: '70vh',       // giới hạn chiều cao
                        overflowY: 'auto',       // thêm cuộn khi vượt quá
                        paddingRight: '10px',

                      }}>
                        <div className="modal-body">
                          Bạn có chắc chắn muốn gửi yêu cầu chỉnh sửa không?
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary squer-btn"
                          onClick={handleCloseModalConfirmDiscount}
                        >
                          Đóng
                        </button>
                        <button
                          type="button"
                          className="btn squer-btn"
                          style={{
                            color: '#fff',
                            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', // xanh cyan → xanh dương
                            fontWeight: '600',
                            padding: '10px 24px',
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                          onClick={handleEditDiscount}
                        >
                          ➕ Xác Nhận
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              )}
         {showDetailModal && selectedOrder && (
  <div
    className="modal-backdrop"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1050,
    }}
  >
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content" style={{ borderRadius: "12px" }}>
        <div className="modal-header">
          <h5 className="modal-title">
            🛒 Chi tiết Order #{selectedOrder.orderId}
          </h5>
          <button
            type="button"
            className="close"
            onClick={handleCloseDetailModal}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: "75vh", overflowY: "auto" }}>
          {/* Grid layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            
            {/* 1️⃣ Order Info */}
            <div className="card p-3 shadow-sm">
              <h6 className="mb-3">📦 Thông tin đơn hàng</h6>
              <p><b>Ngày tạo:</b> {selectedOrder.createdAt}</p>
              <p><b>Tổng tiền:</b> ${selectedOrder.totalPrice}</p>
              <p><b>Trạng thái:</b> 
              <span className={`badge ${orderBadge(selectedOrder.status)}`}>
  {toVNOrderStatus(selectedOrder.status)}
</span>
              </p>
              <p><b>Số sản phẩm:</b> {selectedOrder.itemCount}</p>
            </div>
 {/* 🛍 Danh sách sản phẩm */}
<div className="card p-3 shadow-sm mt-3">
  <h6 className="mb-3">🛍 Danh sách sản phẩm</h6>
  {selectedOrder?.items && selectedOrder.items.length > 0 ? (
    selectedOrder.items.map((item, idx) => (
      <div key={idx} className="border rounded p-3 mb-2">
        <p><b>ASIN:</b> {item.asin}</p>
        <p><b>Tên sản phẩm:</b> {item.titleProduct}</p>
        <p><b>Màu:</b> {item.color || <span className="text-muted">-</span>}</p>
        <p><b>Size:</b> {item.size || <span className="text-muted">-</span>}</p>
        <p><b>Số lượng:</b> {item.quantity}</p>
        <p>
          <b>Đơn giá:</b> 
          <span className="text-success fw-bold">
            ${Number(item.unitPrice).toLocaleString()}
          </span>
        </p>
      </div>
    ))
  ) : (
    <p className="text-muted text-center my-2">Không có sản phẩm trong đơn hàng.</p>
  )}
</div>


            {/* 2️⃣ Recipient Info */}
            <div className="card p-3 shadow-sm">
              <h6 className="mb-3">👤 Người nhận</h6>
              <p><b>Tên:</b> {selectedOrder.recipientName}</p>
              <p><b>Email:</b> {selectedOrder.recipientEmail}</p>
              <p><b>SĐT:</b> {selectedOrder.recipientPhone}</p>
              <p><b>Địa chỉ:</b> {selectedOrder.deliveryAddress}</p>
              <p><b>Chi tiết:</b> {selectedOrder.addressDetails}</p>
            </div>

            {/* 3️⃣ Delivery Info */}
            <div className="card p-3 shadow-sm">
              <h6 className="mb-3">🚚 Giao hàng</h6>
              <p><b>Trạng thái:</b> {toVNDeliveryStatus(selectedOrder.deliveryStatus) || "Chưa có"}</p>
              <p><b>Mã tracking:</b> {selectedOrder.trackingNumber || "Chưa có"}</p>
              <p><b>Phí ship:</b> ${selectedOrder.shippingFee || 0}</p>
              <p><b>Ngày dự kiến:</b> {selectedOrder.estimatedDeliveryDate || "Chưa có"}</p>
            </div>

            {/* 4️⃣ Shipping Method */}
            <div className="card p-3 shadow-sm">
              <h6 className="mb-3">🚀 Phương thức vận chuyển</h6>
              <p><b>Tên:</b> {selectedOrder.shippingMethodName || "Chưa chọn"}</p>
              <p><b>Mô tả:</b> {selectedOrder.shippingDescription || "N/A"}</p>
              <p><b>Thời gian dự kiến:</b> {selectedOrder.shippingEstimatedDays || 0} ngày</p>
            </div>

            {/* 5️⃣ Payment Info */}
            <div className="card p-3 shadow-sm" >
              <h6 className="mb-3">💳 Thanh toán</h6>
              <p><b>Phương thức:</b> {selectedOrder.paymentMethod}</p>
              <p><b>Trạng thái:</b>
  <span className={`badge ${paymentBadge(selectedOrder?.statusPayment)}`}>
    {toVNPaymentStatus(selectedOrder?.statusPayment)}
  </span>
</p>
            </div>

          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCloseDetailModal}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
)}


              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card chart-card">

                    <div className="card-header">
                      <h4>Mã Giảm Giá Của Shop</h4>

                    </div>
                    {/* Nút Thêm Mã Giảm Giá */}
                    <div style={{ textAlign: 'center' }}>
                      <button
                        style={{

                          background: 'linear-gradient(90deg, #ec4899, #ef4444)',
                          color: '#fff',
                          fontWeight: '600',
                          padding: '12px 24px',
                          borderRadius: '16px',
                          width: '20%',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
                          transition: 'transform 0.3s ease',
                        }}
                        onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                        onClick={handleOpenModal}
                      >
                        🎁 Thêm Mã Giảm Giá
                      </button>
                    </div>
                    {/* Modal */}
                    {showModal && (
                      <div
                        className="modal-backdrop"
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          width: '100vw',
                          height: '100vh',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          zIndex: 1050,
                        }}
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Thêm Mã Giảm Giá</h5>
                              <button
                                type="button"
                                className="close"
                                onClick={handleCloseModal}
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body" style={{
                              maxHeight: '70vh',       // giới hạn chiều cao
                              overflowY: 'auto',       // thêm cuộn khi vượt quá
                              paddingRight: '10px'
                            }}>
                              <form onSubmit={handleSubmit}>

                                <div className="ad-auth-form">
                                  {/* Tên Shop */}
                                  {/* Tên giảm giá */}
                                  <div className="ad-auth-feilds mb-30">
                                    <input
                                      type="text"
                                      placeholder="Tên Giảm Giá"
                                      className="ad-input"
                                      value={nameDiscount}
                                      onChange={(e) => setNameDiscount(e.target.value)}
                                      required
                                    />
                                    <div className="ad-auth-icon">
                                      {/* 🎁 icon quà tặng */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9abeed" viewBox="0 0 24 24">
                                        <path d="M20 7h-2.18c.11-.31.18-.65.18-1a3 3 0 0 0-6-1.73A3 3 0 0 0 4 6c0 .35.07.69.18 1H4a2 2 0 0 0-2 2v2h20V9a2 2 0 0 0-2-2zm-6-2a1 1 0 1 1 1 1h-2a1 1 0 0 1 1-1zm-6 0a1 1 0 0 1 1 1H7a1 1 0 0 1 1-1zM2 13v7a2 2 0 0 0 2 2h5v-9H2zm7 0v9h6v-9H9zm8 0v9h5a2 2 0 0 0 2-2v-7h-7z" />
                                      </svg>
                                    </div>
                                  </div>

                                  {/* Mức giá áp dụng từ */}
                                  <div className="ad-auth-feilds mb-30">
                                    <input
                                      type="number"
                                      placeholder="Mức giá áp dụng từ ..."
                                      className="ad-input"
                                      value={minPrice}
                                      onChange={(e) => setMinPrice(e.target.value)}
                                      required
                                    />
                                    <div className="ad-auth-icon">
                                      {/* 💰 icon tiền */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9abeed" viewBox="0 0 24 24">
                                        <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM13 17h-2v-1h2a2 2 0 0 0 0-4h-2v-2h2v1h2v-1a2 2 0 0 0-2-2h-2a2 2 0 0 0 0 4h2v2h-2v-1H9v1a2 2 0 0 0 2 2h2v1z" />
                                      </svg>
                                    </div>
                                  </div>

                                  {/* Phần trăm giảm giá */}
                                  <div className="ad-auth-feilds mb-30">
                                    <input
                                      type="number"
                                      placeholder="Phần trăm giảm giá"
                                      className="ad-input"
                                      value={percentValue}
                                      onChange={(e) => setPercentValue(e.target.value)}
                                      required
                                    />
                                    <div className="ad-auth-icon">
                                      {/* % icon */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9abeed" viewBox="0 0 24 24">
                                        <path d="M17.94 6.06a7.007 7.007 0 0 0-11.88 0 7.007 7.007 0 0 0 0 11.88 7.007 7.007 0 0 0 11.88 0 7.007 7.007 0 0 0 0-11.88zM7 10a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm8 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-6.293 3.293 6-6 1.414 1.414-6 6-1.414-1.414z" />
                                      </svg>
                                    </div>
                                  </div>
                                  <div
                                    className="modal fade"
                                    id="confirmModal"
                                    tabIndex="-1"
                                    aria-labelledby="confirmModalLabel"
                                    aria-hidden="true"
                                  >

                                  </div>

                                  {/* Ngày bắt đầu */}
                                  {/* Ngày bắt đầu */}
                                  <div className="ad-auth-feilds mb-30">
                                    <input
                                      type="datetime-local"
                                      placeholder="Ngày Bắt Đầu Giảm"
                                      className="ad-input"
                                      value={dayStart}
                                      onChange={(e) => setDayStart(e.target.value)}
                                      required
                                    />
                                    <div className="ad-auth-icon">
                                      {/* 🕓 Icon đồng hồ + lịch */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9abeed" viewBox="0 0 24 24">
                                        <path d="M12 8v5h4v-2h-2V8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                                      </svg>
                                    </div>
                                  </div>

                                  {/* Ngày kết thúc */}
                                  {/* Ngày kết thúc */}
                                  <div className="ad-auth-feilds mb-30">
                                    <input
                                      type="datetime-local"
                                      placeholder="Ngày Kết Thúc"
                                      className="ad-input"
                                      value={dayEnd}
                                      onChange={(e) => setDayEnd(e.target.value)}
                                      required
                                    />
                                    <div className="ad-auth-icon">
                                      {/* 🕓 Icon đồng hồ + lịch */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9abeed" viewBox="0 0 24 24">
                                        <path d="M12 8v5h4v-2h-2V8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                                      </svg>
                                    </div>
                                  </div>


                                  {/* Trạng thái */}
                                  <div className="ad-auth-feilds mb-30" style={{ position: 'relative' }}>
                                    <select
                                      className="ad-input"
                                      style={{
                                        appearance: 'none',
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'none',
                                        paddingRight: '36px',
                                        borderRadius: '8px',
                                        border: '1px solid #ccc',
                                        fontSize: '14px',
                                        color: '#333',
                                        backgroundColor: '#fff',
                                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
                                        width: '100%',
                                        cursor: 'pointer',
                                      }}
                                      value={status}
                                      onChange={(e) => setStatus(e.target.value)}
                                    >
                                      <option value="">Trạng Thái</option>
                                      <option value="0">Hoạt Động</option>
                                      <option value="1">Không Hoạt Động</option>
                                    </select>
                                    <div style={{
                                      position: 'absolute',
                                      top: '50%',
                                      right: '12px',
                                      transform: 'translateY(-50%)',
                                      pointerEvents: 'none',
                                    }}>
                                      {/* ▼ icon mũi tên dropdown */}
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="#9abeed"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M7 10l5 5 5-5z" />
                                      </svg>
                                    </div>
                                  </div>



                                </div>

                                <div className="ad-auth-btn">

                                </div>

                              </form>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary squer-btn"
                                onClick={handleCloseModal}
                              >
                                Đóng
                              </button>
                              <button
                                type="button"
                                className="btn squer-btn"
                                style={{
                                  color: '#fff',
                                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', // xanh cyan → xanh dương
                                  fontWeight: '600',
                                  padding: '10px 24px',
                                  borderRadius: '12px',
                                  border: 'none',
                                  cursor: 'pointer',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                  transition: 'all 0.3s ease',
                                }}
                                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                                onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                                onClick={handleSubmit}
                              >
                                ➕ Thêm Mã Giảm Giá
                              </button>

                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {showEditDiscountModal && selectedDiscount && (
                      <div
                        className="modal-backdrop"
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          width: '100vw',
                          height: '100vh',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          zIndex: 1050,
                        }}
                      >
                        <div className="modal-dialog" role="document" >
                          <div className="modal-content" >
                            <div className="modal-header">
                              <h5 className="modal-title">Sửa Mã Giảm Giá</h5>
                              <button
                                type="button"
                                className="close"
                                onClick={handleCloseModalDiscount}
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div
                              className="modal-body"
                              style={{
                                maxHeight: '70vh',
                                overflowY: 'auto',
                                paddingRight: '10px',
                              }}
                            >
                              <form>

                                <div className="ad-auth-form">
                                  {/* Tên Shop */}
                                  {/* Tên giảm giá */}
                                  <div className="ad-auth-feilds mb-30">
                                    <input
                                      type="hidden"
                                      placeholder="Tên Giảm Giá"
                                      className="ad-input"
                                      value={selectedDiscount.shopDiscountId}
                                      readOnly
                                    />
                                    <input
                                      type="text"
                                      placeholder="Tên Giảm Giá"
                                      className="ad-input"
                                      value={selectedDiscount.nameDiscount}
                                      onChange={(e) =>
                                        setSelectedDiscount((prev) => ({
                                          ...prev,
                                          nameDiscount: e.target.value,
                                        }))
                                      }
                                      required
                                    />
                                    <div className="ad-auth-icon">
                                      {/* 🎁 icon quà tặng */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9abeed" viewBox="0 0 24 24">
                                        <path d="M20 7h-2.18c.11-.31.18-.65.18-1a3 3 0 0 0-6-1.73A3 3 0 0 0 4 6c0 .35.07.69.18 1H4a2 2 0 0 0-2 2v2h20V9a2 2 0 0 0-2-2zm-6-2a1 1 0 1 1 1 1h-2a1 1 0 0 1 1-1zm-6 0a1 1 0 0 1 1 1H7a1 1 0 0 1 1-1zM2 13v7a2 2 0 0 0 2 2h5v-9H2zm7 0v9h6v-9H9zm8 0v9h5a2 2 0 0 0 2-2v-7h-7z" />
                                      </svg>
                                    </div>
                                  </div>

                                  {/* Mức giá áp dụng từ */}
                                  <div className="ad-auth-feilds mb-30">
                                    <input
                                      type="number"
                                      placeholder="Mức giá áp dụng từ ..."
                                      className="ad-input"
                                      value={selectedDiscount.minPrice}
                                      onChange={(e) =>
                                        setSelectedDiscount((prev) => ({
                                          ...prev,
                                          minPrice: e.target.value,
                                        }))
                                      }
                                      required
                                    />
                                    <div className="ad-auth-icon">
                                      {/* 💰 icon tiền */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9abeed" viewBox="0 0 24 24">
                                        <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM13 17h-2v-1h2a2 2 0 0 0 0-4h-2v-2h2v1h2v-1a2 2 0 0 0-2-2h-2a2 2 0 0 0 0 4h2v2h-2v-1H9v1a2 2 0 0 0 2 2h2v1z" />
                                      </svg>
                                    </div>
                                  </div>

                                  {/* Phần trăm giảm giá */}
                                  <div className="ad-auth-feilds mb-30">
                                    <input
                                      type="number"
                                      placeholder="Phần trăm giảm giá"
                                      className="ad-input"
                                      value={selectedDiscount.percentValue}
                                      onChange={(e) =>
                                        setSelectedDiscount((prev) => ({
                                          ...prev,
                                          percentValue: e.target.value,
                                        }))
                                      }
                                      required
                                    />
                                    <div className="ad-auth-icon">
                                      {/* % icon */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9abeed" viewBox="0 0 24 24">
                                        <path d="M17.94 6.06a7.007 7.007 0 0 0-11.88 0 7.007 7.007 0 0 0 0 11.88 7.007 7.007 0 0 0 11.88 0 7.007 7.007 0 0 0 0-11.88zM7 10a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm8 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-6.293 3.293 6-6 1.414 1.414-6 6-1.414-1.414z" />
                                      </svg>
                                    </div>
                                  </div>
                                  <div
                                    className="modal fade"
                                    id="confirmModal"
                                    tabIndex="-1"
                                    aria-labelledby="confirmModalLabel"
                                    aria-hidden="true"
                                  >

                                  </div>

                                  {/* Ngày bắt đầu */}
                                  {/* Ngày bắt đầu */}
                                  <div className="ad-auth-feilds mb-30">
                                    <input
                                      type="datetime-local"
                                      placeholder="Ngày Bắt Đầu Giảm"
                                      className="ad-input"
                                      value={selectedDiscount.dayStart}
                                      onChange={(e) =>
                                        setSelectedDiscount((prev) => ({
                                          ...prev,
                                          dayStart: e.target.value,
                                        }))
                                      }
                                      required
                                    />
                                    <div className="ad-auth-icon">
                                      {/* 🕓 Icon đồng hồ + lịch */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9abeed" viewBox="0 0 24 24">
                                        <path d="M12 8v5h4v-2h-2V8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                                      </svg>
                                    </div>
                                  </div>

                                  {/* Ngày kết thúc */}
                                  {/* Ngày kết thúc */}
                                  <div className="ad-auth-feilds mb-30">
                                    <input
                                      type="datetime-local"
                                      placeholder="Ngày Kết Thúc"
                                      className="ad-input"
                                      value={selectedDiscount.dayEnd}
                                      onChange={(e) =>
                                        setSelectedDiscount((prev) => ({
                                          ...prev,
                                          dayEnd: e.target.value,
                                        }))
                                      }
                                      required
                                    />
                                    <div className="ad-auth-icon">
                                      {/* 🕓 Icon đồng hồ + lịch */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9abeed" viewBox="0 0 24 24">
                                        <path d="M12 8v5h4v-2h-2V8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                                      </svg>
                                    </div>
                                  </div>


                                  {/* Trạng thái */}
                                  <div className="ad-auth-feilds mb-30" style={{ position: 'relative' }}>
                                    <select
                                      className="ad-input"
                                      style={{
                                        appearance: 'none',
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'none',
                                        paddingRight: '36px',
                                        borderRadius: '8px',
                                        border: '1px solid #ccc',
                                        fontSize: '14px',
                                        color: '#333',
                                        backgroundColor: '#fff',
                                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
                                        width: '100%',
                                        cursor: 'pointer',
                                      }}
                                      value={selectedDiscount.status}
                                      onChange={(e) =>
                                        setSelectedDiscount((prev) => ({
                                          ...prev,
                                          status: e.target.value,
                                        }))
                                      }
                                      required
                                    >
                                      <option value="">Trạng Thái</option>
                                      <option value="0">Hoạt Động</option>
                                      <option value="1">Không Hoạt Động</option>
                                    </select>
                                    <div style={{
                                      position: 'absolute',
                                      top: '50%',
                                      right: '12px',
                                      transform: 'translateY(-50%)',
                                      pointerEvents: 'none',
                                    }}>
                                      {/* ▼ icon mũi tên dropdown */}
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="#9abeed"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M7 10l5 5 5-5z" />
                                      </svg>
                                    </div>
                                  </div>



                                </div>

                                <div className="ad-auth-btn">

                                </div>

                              </form>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary squer-btn"
                                onClick={handleCloseModalDiscount}
                              >
                                Đóng
                              </button>
                              <button
                                type="button"
                                className="btn squer-btn"
                                style={{
                                  color: '#fff',
                                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                                  fontWeight: '600',
                                  padding: '10px 24px',
                                  borderRadius: '12px',
                                  border: 'none',
                                  cursor: 'pointer',
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                  transition: 'all 0.3s ease',
                                }}
                                onClick={handleOpenModalConfirmDiscount}
                              >
                                ✅ Cập nhật
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="card-body pb-4">
                      <div className="chart-holder">
                        <div className="table-responsive">
                          <table className="table table-styled mb-0">
                            <thead>
                              <tr>

                                <th>Tên Mã</th>
                                <th>Áp Dụng</th>
                                <th>% Giảm Giá</th>
                                <th>Trạng Thái</th>
                                <th>Ngày Bắt Đầu</th>
                                <th>Ngày Kết Thúc</th>
                                {/* Action */}
                                <th>Hoạt động</th>
                              </tr>
                            </thead>
                            <tbody>

                              {discounts && discounts.length > 0 ? (
                                discounts.map((discount) => (
                                  <>
                                    <tr key={discount.id}>
                                      <td>{discount.nameDiscount}</td>
                                      <td>
                                        <span className="img-thumb ">
                                          <span className="ml-2 ">Từ {discount.minPrice}$</span>
                                        </span>
                                      </td>
                                      <td>{discount.percentValue}%</td>
                                      <td>
                                        <label
                                          className={`mb-0 badge ${discount.status === 0 ? 'badge-success' : 'badge-warning'}`}
                                          title=""
                                          data-original-title="Pending"
                                        >
                                          {discount.status === 0 ? 'Đang Hoạt Động' : 'Tạm Dừng'}
                                        </label>
                                      </td>


                                      <td>
                                        <span className="img-thumb">
                                          <span className="ml-2">{discount.dayStart}</span>
                                        </span>
                                      </td>
                                      <td>
                                        <span className="img-thumb">
                                          <span className="ml-2">{discount.dayEnd}</span>
                                        </span>
                                      </td>
                                      <td className="relative">
                                        <a
                                          className="action-btn "
                                          href="javascript:void(0); "
                                        >
                                          <svg
                                            className="default-size "
                                            viewBox="0 0 341.333 341.333 "
                                          >
                                            <g>
                                              <g>
                                                <g>
                                                  <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                                  <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                                  <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                                </g>
                                              </g>
                                            </g>
                                          </svg>
                                        </a>
                                        <div className="action-option ">
                                          <ul>
                                            <li>
                                              <a onClick={() => handleOpenModalDiscount(discount)}>
                                                <i className="far fa-edit mr-2 " />
                                                Sửa 
                                              </a>
                                            </li>
                                            <li>
                                              <a onClick={() => handleOpenDeleteModalDiscount(discount)}>
                                                <i className="far fa-trash-alt mr-2 " />
                                                Xoá
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </td>
                                      {/* Các cột khác */}
                                    </tr>

                                  </>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="8" style={{ textAlign: 'center' }}>
                                    <p>Chưa có mã giảm giá nào.</p>
                                    <p>{message}</p>
                                    {/* <a href="/create-discount">Thêm mã giảm giá</a> */}
                                  </td>
                                </tr>
                              )}

                            </tbody>
                          </table>
                          
                        </div>
                        
                      </div>
                      
                    </div>


                  </div>
                </div>
              </div>
              <div className="row">
                
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="card chart-card">
                    <div className="card-header">
                      <h4>Newest Orders</h4>
                    </div>
                    <div className="card-body pb-4">

                      <div className="chart-holder">
                        <div className="table-responsive">
                          <table className="table table-styled mb-0">
                            <thead>
                              <tr>
                                {/* <th>
                                  <div className="checkbox">
                                    <input id="checkbox1" type="checkbox" />
                                    <label htmlFor="checkbox1" />
                                  </div>
                                </th> */}
                                {/*  Order ID */}
                                <th>ID đơn hàng</th>
                                {/* Billing Name */}
                                <th>Tên thanh toán</th>
                                {/* Date */}
                                <th>Ngày</th>
                                {/* Total */}
                                <th>Tổng cộng</th>
                                {/* Payment Status */}
                                <th>Trạng Thái Giao Hàng</th>
                                {/* Payment Method */}
                                <th>Phương thức thanh toán</th>
                                {/* View Details */}
                                <th>Xem chi tiết</th>
                                {/* Action */}
                                {/* <th>Hoạt động</th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {dashboardSeller?.recentOrders?.map((order, index) => (
                                <tr>
                                  {/* <td>
                                    <div className="checkbox">
                                      <input id="checkbox2" type="checkbox" />
                                      <label htmlFor="checkbox2" />
                                    </div>

                                  </td> */}
                                  <td>#{order.orderId}</td>
                                  <td>
                                    <span className="img-thumb ">
                                      <img src="../../assets/admin/images/table/1.jpg" alt=" " />
                                      <span className="ml-2 ">{order.recipientName}</span>
                                    </span>
                                  </td>
                                  <td>{order.createdAt}</td>
                                  <td>${order.totalPrice}</td>
                                  <td>
                                  <label className={`mb-0 badge ${orderBadge(order.status)}`}>
  {toVNOrderStatus(order.status)}
</label>
                                  </td>
                                  <td>
                                    <span className="img-thumb">
                                      <i className={`${getPaymentInfo(order.paymentMethod).icon} ${getPaymentInfo(order.paymentMethod).color}`} />
                                      <span className="ml-2">{getPaymentInfo(order.paymentMethod).text}</span>
                                    </span>
                                  </td>

                          <td>
  <button
    className="mb-0 badge badge-primary"
    onClick={() => handleViewDetail(order)} // Gọi hàm khi click
  >
   Xem chi tiết
  </button>
</td>

                                  {/* <td className="relative">
                                    <a
                                      className="action-btn "
                                      href="javascript:void(0); "
                                    >
                                      <svg
                                        className="default-size "
                                        viewBox="0 0 341.333 341.333 "
                                      >
                                        <g>
                                          <g>
                                            <g>
                                              <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                              <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                              <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                            </g>
                                          </g>
                                        </g>
                                      </svg>
                                    </a>
                                    <div className="action-option ">
                                      <ul>
                                        <li>
                                          <a href="javascript:void(0); ">
                                            <i className="far fa-edit mr-2 " />
                                            Edit
                                          </a>
                                        </li>
                                        <li>
                                          <a href="javascript:void(0); ">
                                            <i className="far fa-trash-alt mr-2 " />
                                            Delete
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </td> */}
                                </tr>
                              ))}

                              {/* <tr>
                                <td>
                                  <div className="checkbox">
                                    <input id="checkbox3" type="checkbox" />
                                    <label htmlFor="checkbox3" />
                                  </div>
                                </td>
                                <td>#MK4433</td>
                                <td>
                                  <span className="img-thumb ">
                                    <img src="../../assets/admin/images/table/4.jpg" alt=" " />
                                    <span className="ml-2 ">Mark Doe</span>
                                  </span>
                                </td>
                                <td>14/07/2022</td>
                                <td>$700</td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-success"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    Success
                                  </label>
                                </td>
                                <td>
                                  <span className="img-thumb">
                                    <i className="fab fa-cc-visa" />
                                    <span className="ml-2">Visa</span>
                                  </span>
                                </td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    View Detail
                                  </label>
                                </td>
                                <td className="relative">
                                  <a
                                    className="action-btn "
                                    href="javascript:void(0); "
                                  >
                                    <svg
                                      className="default-size "
                                      viewBox="0 0 341.333 341.333 "
                                    >
                                      <g>
                                        <g>
                                          <g>
                                            <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                            <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                            <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </a>
                                  <div className="action-option">
                                    <ul>
                                      <li>
                                        <a href="javascript:void(0);">
                                          <i className="far fa-edit mr-2 " />
                                          Edit
                                        </a>
                                      </li>
                                      <li>
                                        <a href="javascript:void(0);">
                                          <i className="far fa-trash-alt mr-2 " />
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="checkbox">
                                    <input id="checkbox4" type="checkbox" />
                                    <label htmlFor="checkbox4" />
                                  </div>
                                </td>
                                <td>#MD4578</td>
                                <td>
                                  <span className="img-thumb">
                                    <img src="../../assets/admin/images/table/7.jpg" alt=" " />
                                    <span className="ml-2 ">Mark Smith</span>
                                  </span>
                                </td>
                                <td>28/08/2022</td>
                                <td>$800</td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-danger"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    Cancel
                                  </label>
                                </td>
                                <td>
                                  <span className="img-thumb">
                                    <i className="fas fa-credit-card" />
                                    <span className="ml-2">Credit Card</span>
                                  </span>
                                </td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    View Detail
                                  </label>
                                </td>
                                <td className="relative">
                                  <a
                                    className="action-btn "
                                    href="javascript:void(0); "
                                  >
                                    <svg
                                      className="default-size "
                                      viewBox="0 0 341.333 341.333 "
                                    >
                                      <g>
                                        <g>
                                          <g>
                                            <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                            <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                            <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </a>
                                  <div className="action-option ">
                                    <ul>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-edit mr-2 " />
                                          Edit
                                        </a>
                                      </li>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-trash-alt mr-2 " />
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="checkbox">
                                    <input id="checkbox5" type="checkbox" />
                                    <label htmlFor="checkbox5" />
                                  </div>
                                </td>
                                <td>#DD1048</td>
                                <td>
                                  <span className="img-thumb ">
                                    <img src="../../assets/admin/images/table/1.jpg" alt=" " />
                                    <span className="ml-2 ">Mike Wood</span>
                                  </span>
                                </td>
                                <td>13/04/2022</td>
                                <td>$880</td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    Pending
                                  </label>
                                </td>
                                <td>
                                  <span className="img-thumb">
                                    <i className="fab fa-cc-mastercard" />
                                    <span className="ml-2">Mastercard</span>
                                  </span>
                                </td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    View Detail
                                  </label>
                                </td>
                                <td className="relative">
                                  <a
                                    className="action-btn "
                                    href="javascript:void(0); "
                                  >
                                    <svg
                                      className="default-size "
                                      viewBox="0 0 341.333 341.333 "
                                    >
                                      <g>
                                        <g>
                                          <g>
                                            <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                            <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                            <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </a>
                                  <div className="action-option ">
                                    <ul>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-edit mr-2 " />
                                          Edit
                                        </a>
                                      </li>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-trash-alt mr-2 " />
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="checkbox">
                                    <input id="checkbox6" type="checkbox" />
                                    <label htmlFor="checkbox6" />
                                  </div>
                                </td>
                                <td>#JH2033</td>
                                <td>
                                  <span className="img-thumb ">
                                    <img src="../../assets/admin/images/table/3.jpg" alt=" " />
                                    <span className="ml-2 ">Emily Arnold</span>
                                  </span>
                                </td>
                                <td>22/06/2022</td>
                                <td>$600</td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-success"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    Success
                                  </label>
                                </td>
                                <td>
                                  <span className="img-thumb">
                                    <i className="fab fa-cc-paypal" />
                                    <span className="ml-2">Paypal</span>
                                  </span>
                                </td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    View Detail
                                  </label>
                                </td>
                                <td className="relative">
                                  <a
                                    className="action-btn "
                                    href="javascript:void(0); "
                                  >
                                    <svg
                                      className="default-size "
                                      viewBox="0 0 341.333 341.333 "
                                    >
                                      <g>
                                        <g>
                                          <g>
                                            <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                            <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                            <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </a>
                                  <div className="action-option ">
                                    <ul>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-edit mr-2 " />
                                          Edit
                                        </a>
                                      </li>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-trash-alt mr-2 " />
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="checkbox">
                                    <input id="checkbox7" type="checkbox" />
                                    <label htmlFor="checkbox7" />
                                  </div>
                                </td>
                                <td>#MK4433</td>
                                <td>
                                  <span className="img-thumb ">
                                    <img src="../../assets/admin/images/table/1.jpg" alt=" " />
                                    <span className="ml-2 ">John Doe</span>
                                  </span>
                                </td>
                                <td>14/07/2022</td>
                                <td>$700</td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-danger"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    Cancel
                                  </label>
                                </td>
                                <td>
                                  <span className="img-thumb">
                                    <i className="fab fa-cc-visa" />
                                    <span className="ml-2">Visa</span>
                                  </span>
                                </td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    View Detail
                                  </label>
                                </td>
                                <td className="relative">
                                  <a
                                    className="action-btn "
                                    href="javascript:void(0); "
                                  >
                                    <svg
                                      className="default-size "
                                      viewBox="0 0 341.333 341.333 "
                                    >
                                      <g>
                                        <g>
                                          <g>
                                            <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                            <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                            <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </a>
                                  <div className="action-option ">
                                    <ul>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-edit mr-2 " />
                                          Edit
                                        </a>
                                      </li>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-trash-alt mr-2 " />
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="checkbox">
                                    <input id="checkbox8" type="checkbox" />
                                    <label htmlFor="checkbox8" />
                                  </div>
                                </td>
                                <td>#MD4578</td>
                                <td>
                                  <span className="img-thumb ">
                                    <img src="../../assets/admin/images/table/7.jpg" alt=" " />
                                    <span className="ml-2 ">Mark Smith</span>
                                  </span>
                                </td>
                                <td>28/08/2022</td>
                                <td>$800</td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-success"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    Success
                                  </label>
                                </td>
                                <td>
                                  <span className="img-thumb">
                                    <i className="fas fa-credit-card" />
                                    <span className="ml-2">Credit Card</span>
                                  </span>
                                </td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    View Detail
                                  </label>
                                </td>
                                <td className="relative">
                                  <a
                                    className="action-btn "
                                    href="javascript:void(0); "
                                  >
                                    <svg
                                      className="default-size "
                                      viewBox="0 0 341.333 341.333 "
                                    >
                                      <g>
                                        <g>
                                          <g>
                                            <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                            <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                            <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </a>
                                  <div className="action-option ">
                                    <ul>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-edit mr-2 " />
                                          Edit
                                        </a>
                                      </li>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-trash-alt mr-2 " />
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="checkbox">
                                    <input id="checkbox9" type="checkbox" />
                                    <label htmlFor="checkbox9" />
                                  </div>
                                </td>
                                <td>#DD1048</td>
                                <td>
                                  <span className="img-thumb ">
                                    <img src="../../assets/admin/images/table/4.jpg" alt=" " />
                                    <span className="ml-2 ">Mike Wood</span>
                                  </span>
                                </td>
                                <td>13/04/2022</td>
                                <td>$880</td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    Pending
                                  </label>
                                </td>
                                <td>
                                  <span className="img-thumb">
                                    <i className="fab fa-cc-mastercard" />
                                    <span className="ml-2">Mastercard</span>
                                  </span>
                                </td>
                                <td>
                                  <label
                                    className="mb-0 badge badge-primary"
                                    title=""
                                    data-original-title="Pending"
                                  >
                                    View Detail
                                  </label>
                                </td>
                                <td className="relative">
                                  <a
                                    className="action-btn "
                                    href="javascript:void(0); "
                                  >
                                    <svg
                                      className="default-size "
                                      viewBox="0 0 341.333 341.333 "
                                    >
                                      <g>
                                        <g>
                                          <g>
                                            <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z " />
                                            <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z " />
                                            <path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z " />
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </a>
                                  <div className="action-option ">
                                    <ul>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-edit mr-2 " />
                                          Edit
                                        </a>
                                      </li>
                                      <li>
                                        <a href="javascript:void(0); ">
                                          <i className="far fa-trash-alt mr-2 " />
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr> */}
                            </tbody>
                          </table>

                        </div>
                      </div>
                             <div className="col-md-6">
							<nav aria-label="Product Pagination">
								<ul className="pagination style-1">
									{/* Nút Previous */}
					<li className="page-item">
  <a
    className={`page-link ${pageNumber === 0 ? 'disabled' : ''}`}
    onClick={() => handlePageChange(pageNumber - 1)}
  >
    <i className="fas fa-chevron-left mr-1"></i> 
  </a>
</li>
									{/* Các số trang trong phạm vi */}
									{getPageRange().map((page) => (
										<li className="page-item" key={page}>
											<a
												className={`page-link ${page === pageNumber ? 'active' : ''}`}
												onClick={() => handlePageChange(page)}
											>
												{page + 1}
											</a>
										</li>
									))}
									{/* Nút Next */}
									<li className="page-item">
  <a
    className={`page-link next ${pageNumber >= totalPage - 1 ? 'disabled' : ''}`}
    onClick={() => handlePageChange(pageNumber + 1)}
  >
     <i className="fas fa-chevron-right ml-1"></i>
  </a>
</li>
								</ul>
							</nav>
						</div>
                    </div>
               
                  </div>
                  
                </div>
              
              </div>
            </>
          )}
       

          <div className="ad-footer-btm">
            <p>Copyright 2022 © SplashDash All Rights Reserved.</p>
          </div>
        </div>
      </div>
      {/* Preview Setting Box */}
      <div className="slide-setting-box">
        <div className="slide-setting-holder">
          <div className="setting-box-head">
            <h4>Dashboard Demo</h4>
            <a href="javascript:void(0);" className="close-btn">
              Close
            </a>
          </div>
          <div className="setting-box-body">
            <div className="sd-light-vs">
              <a href="index.html">
                Light Version
                <img src="../../assets/admin/images/light.png" alt="" />
              </a>
            </div>
            <div className="sd-light-vs">
              <a href="https://kamleshyadav.com/html/splashdash/html/b5/splashdash-admin-template-dark/index.html">
                dark Version
                <img src="../../assets/admin/images/dark.png" alt="" />
              </a>
            </div>
          </div>
          <div className="sd-color-op">
            <h5>color option</h5>
            <div id="style-switcher">
              <div>
                <ul className="colors">
                  <li>
                    <p className="colorchange" id="color"></p>
                  </li>
                  <li>
                    <p className="colorchange" id="color2"></p>
                  </li>
                  <li>
                    <p className="colorchange" id="color3"></p>
                  </li>
                  <li>
                    <p className="colorchange" id="color4"></p>
                  </li>
                  <li>
                    <p className="colorchange" id="color5"></p>
                  </li>
                  <li>
                    <p className="colorchange" id="style"></p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}




export default AdminDashboard;