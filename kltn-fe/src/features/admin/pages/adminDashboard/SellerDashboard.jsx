import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// EN -> VI cho trạng thái shop
const toVNShopStatus = (s = "") => {
  const v = s.toLowerCase();
  if (v === "active") return "Hoạt động";
  if (v === "inactive") return "Không hoạt động";
  if (v === "pending") return "Chờ duyệt";
  if (v === "suspended") return "Tạm ngưng";
  if (v === "banned") return "Bị khóa";
  if (v === "rejected") return "Bị từ chối";
  return "Không rõ";
};

// Badge màu cho trạng thái shop
const shopBadge = (s = "") => {
  const v = s.toLowerCase();
  return (
    {
      active: "badge-success",
      pending: "badge-warning",
      inactive: "badge-secondary",
      suspended: "badge-danger",
      banned: "badge-danger",
      rejected: "badge-danger",
    }[v] || "badge-secondary"
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',         // 👈 Thêm maxHeight
  overflowY: 'auto',         // 👈 Kích hoạt scroll theo chiều dọc
};

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('shops');
  const [pendingShops, setPendingShops] = useState([]);
  const [shopEdits, setShopEdits] = useState([]);
  const [authRequests, setAuthRequests] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
const [showCccd, setShowCccd] = useState();
const [open, setOpen] = React.useState(false);
const [listCccd, setListCccd] = useState([]);
const handleOpen = (shop) => {
  setSelectedShop(shop); // ✅ Lưu shop được chọn
  setOpen(true);         // ✅ Mở modal
};
const handleClose = () => {
  setSelectedShop(null); // ✅ Reset shop khi đóng
  setOpen(false);        
};
  useEffect(() => {
    if (activeTab === 'shops') fetchPendingShops();
    if (activeTab === 'edits') fetchShopEdits();
    if (activeTab === 'auth') fetchAuthRequests();
  }, [activeTab]);


// Hàm gọi API khi admin bấm "Xem ảnh CCCD"
const handleViewCccd = async (shopId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
   const response = await axios.get(
      `http://localhost:8765/api/admin/sellers/log-view-cccd`,{
        params: {
          shopId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`Đã gửi yêu cầu log xem CCCD cho shopId=${shopId}`);
    setListCccd(response.data);
    setShowCccd(true); // mở modal sau khi gọi API
  } catch (error) {
    console.error("❌ Lỗi khi gọi API log CCCD:", error);
  }
};

  const fetchPendingShops = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get('http://localhost:8765/api/admin/sellers/pending-shops', {
         headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setPendingShops(res.data);
  };

  const fetchShopEdits = async () => {
        const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get('http://localhost:8765/api/admin/sellers/pending-edits', {
         headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    setShopEdits(res.data);
  };

  const fetchAuthRequests = async () => {
        const accessToken = localStorage.getItem("accessToken", {
         headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const res = await axios.get('http://localhost:8765/api/admin/sellers/authentications', {
         headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    setAuthRequests(res.data);
  };

  const approveShop = async (id) => {
        const accessToken = localStorage.getItem("accessToken");

    await axios.put(`http://localhost:8765/api/admin/sellers/approve-shop/${id}`,null, {
         headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    fetchPendingShops();
  };

  const banShop = async (id) => {
        const accessToken = localStorage.getItem("accessToken");
    await axios.put(`http://localhost:8765/api/admin/sellers/ban-shop/${id}`,null, {
         headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    fetchPendingShops();
  };

  const approveEdit = async (id) => {
        const accessToken = localStorage.getItem("accessToken");

    await axios.put(`http://localhost:8765/api/admin/sellers/approve-edit/${id}`,null, {
         headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    fetchShopEdits();
  };

  const rejectEdit = async (id) => {
        const accessToken = localStorage.getItem("accessToken");

    await axios.put(`http://localhost:8765/api/admin/sellers/reject-edit/${id}`,null, {
         headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    fetchShopEdits();
  };

  const approveAuth = async (id) => {
        const accessToken = localStorage.getItem("accessToken");

    await axios.put(`http://localhost:8765/api/admin/sellers/approve-authentication/${id}`,null, {
         headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    fetchAuthRequests();
  };

  const rejectAuth = async (id) => {
        const accessToken = localStorage.getItem("accessToken");

    await axios.put(`http://localhost:8765/api/admin/sellers/reject-authentication/${id}`,null, {
         headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    fetchAuthRequests();
  };

  return (
    <div className="container mt-4" style={{ paddingTop: '80px' }}>
      <style>{`
        .nav-tabs .nav-link.active {
          background-color: #3498db;
          color: white;
        }
        .table img {
          border-radius: 6px;
          object-fit: cover;
        }
        .container {
          width: 100%;
          max-width: 100%;
          padding-right: 15px;
          padding-left: 15px;
          margin-right: auto;
          margin-left: auto;
        }
        @media (min-width: 1200px) {
          .container {
            max-width: 1140px;
          }
        }
      `}</style>
      <h3 className="mb-3">Quản lý Seller</h3>
       <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
  <button
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
        onClick={handleClose}
      >
        ✖
      </button>
                </Typography>
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            
{selectedShop && (
  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
    <div className="bg-white rounded-3xl shadow-2xl w-[500px] p-8 relative animate-[fadeIn_0.3s_ease-in-out]">
      {/* Nút đóng */}
    

      {/* Avatar và tên shop */}
      <div className="flex flex-col items-center">
        <img
          src={selectedShop.thumbnailShop}
          alt={selectedShop.nameShop}
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow-md mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedShop.nameShop}</h2>
        <p className="text-gray-600 text-sm italic mb-4">
          {selectedShop.descriptionShop || 'Không có mô tả'}
        </p>
      </div>

      {/* Thông tin chi tiết */}
      <div className="grid grid-cols-1 gap-3 text-sm text-gray-700 mb-4">
        <div className="flex justify-between">
          <span className="font-semibold">📍 Địa chỉ giao hàng:</span>
          <span>{selectedShop.addressDelivery}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">🏠 Địa chỉ nhà:</span>
          <span>{selectedShop.addressHouse}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">📧 Email:</span>
          <span className="text-blue-600">{selectedShop.shopEmail}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">📱 SĐT:</span>
          <span>{selectedShop.shopPhone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">👥 Followers:</span>
          <span>{selectedShop.followers}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">⭐ Đánh giá:</span>
          <span>{selectedShop.avaluate}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">📅 Ngày tạo:</span>
          <span>{new Date(selectedShop.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">🔄 Cập nhật:</span>
          <span>{new Date(selectedShop.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Nút hiển thị CCCD */}
<button
  onClick={() => handleViewCccd(selectedShop.shopId)}
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "14px 0",
    marginTop: "20px",
    fontWeight: "600",
    fontSize: "16px",
    color: "#fff",
    background: "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)",
    border: "none",
    borderRadius: "14px",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.6), 0 0 20px rgba(139, 92, 246, 0.4)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow =
      "0 6px 25px rgba(6, 182, 212, 0.7), 0 0 25px rgba(139, 92, 246, 0.6)";
    e.currentTarget.style.background =
      "linear-gradient(135deg, #0ea5e9, #6366f1, #a855f7)";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow =
      "0 4px 15px rgba(59, 130, 246, 0.6), 0 0 20px rgba(139, 92, 246, 0.4)";
    e.currentTarget.style.background =
      "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)";
  }}
>
  🪪 Xem ảnh CCCD
</button>


      {/* Danh sách giảm giá */}
<div className="mt-6">
  <h3 className="font-semibold text-gray-800 mb-2">🎟️ Danh sách mã giảm giá:</h3>
  {Array.isArray(selectedShop.discounts) && selectedShop.discounts.length > 0 ? (
    <ul className="space-y-2">
      {selectedShop.discounts.map((d) => (
        <li key={d.discountShopId} className="bg-gray-100 p-2 rounded-md text-sm">
          <span className="font-semibold">{d.nameDiscount}</span> - Giảm {d.percentValue}%
          (ĐH tối thiểu: ${d.minPrice})<br />
          <span className="text-gray-600 text-xs">
            {new Date(d.dayStart).toLocaleDateString()} → {new Date(d.dayEnd).toLocaleDateString()}
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-sm italic text-gray-500">Không có mã giảm giá.</p>
  )}
</div>


    </div>
  </div>
)}

{/* Modal hiển thị ảnh CCCD */}



          </Typography>
        </Box>
      </Modal>
    </div>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'shops' ? 'active' : ''}`} onClick={() => setActiveTab('shops')}>Cửa Hàng</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'edits' ? 'active' : ''}`} onClick={() => setActiveTab('edits')}>Yêu cầu chỉnh sửa</button>
        </li>
     
      </ul>
      {activeTab === 'shops' ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>Tên shop</th>
              <th>Email</th>
              <th>Số Điện Thoại</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {pendingShops.map((shop, i) => (
              <tr key={shop.shopId}>
<td>
  <img 
    src={shop.thumbnailShop} 
    alt={shop.name} 
    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
  />
</td>
                <td>{shop.nameShop}</td>
                <td>{shop.shopEmail}</td>
                 <td>{shop.shopPhone}</td>
                 <td>
  <span className={`badge ${shopBadge(shop.shopStatus)}`}>
    {toVNShopStatus(shop.shopStatus)}
  </span>
</td>
                <td>
                  <button className="btn btn-success btn-sm me-2" onClick={() => approveShop(shop.shopId)}>Duyệt</button>
                  <button className="btn btn-danger btn-sm" onClick={() => banShop(shop.shopId)}>Khóa</button>
                   <button className="btn btn-success btn-sm me-2" onClick={() => handleOpen(shop)}>Chi Tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : activeTab === 'edits' ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên cũ</th>
              <th>Tên mới</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {shopEdits.map((edit, i) => (
              <tr key={edit.shopEditId}>
                <td>{i + 1}</td>
                <td>{edit.oldName || '-'}</td>
                <td>{edit.nameShop || '-'}</td>
                <td>{edit.descriptionShop || '-'}</td>
                <td>
                  <button className="btn btn-success btn-sm me-2" onClick={() => approveEdit(edit.shopEditId)}>Duyệt</button>
                  <button className="btn btn-danger btn-sm" onClick={() => rejectEdit(edit.shopEditId)}>Từ chối</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : activeTab === 'auth' ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Ảnh trước</th>
              <th>Ảnh sau</th>
              <th>Selfie</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {authRequests.map((auth, i) => (
              <tr key={auth.id}>
                <td>{i + 1}</td>
                <td>{auth.email}</td>
                <td><img src={auth.frontImage} alt="front" width="80" /></td>
                <td><img src={auth.backImage} alt="back" width="80" /></td>
                <td><img src={auth.selfieImage} alt="selfie" width="80" /></td>
                <td>
                  <button className="btn btn-success btn-sm me-2" onClick={() => approveAuth(auth.id)}>Duyệt</button>
                  <button className="btn btn-danger btn-sm" onClick={() => rejectAuth(auth.id)}>Từ chối</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default SellerDashboard;