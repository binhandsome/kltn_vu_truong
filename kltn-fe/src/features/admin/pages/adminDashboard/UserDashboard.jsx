import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@mui/material/Button';
import { Modal, Box, Typography, Grid, Avatar, Divider, Chip } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [showCccd, setShowCccd] = useState();
  const [listCccd, setListCccd] = useState([]);

  const [form, setForm] = useState({
    email: '', username: '', password: '', firstName: '', lastName: ''
  });
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState([]);

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser([]);
  };
  const handleViewCccd = async (userId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://localhost:8091/api/admin/sellers/getListCCCDByUser`, {
        params: {
          userId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
      );
      console.log(`Đã gửi yêu cầu log xem CCCD cho userId=${userId}`);
      setListCccd(response.data);
      setShowCccd(true); // mở modal sau khi gọi API
    } catch (error) {
      console.error("❌ Lỗi khi gọi API log CCCD:", error);
    }
  };
  const validateForm = async () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.firstName.trim()) newErrors.firstName = 'Họ không được để trống';
    if (!form.lastName.trim()) newErrors.lastName = 'Tên không được để trống';

    if (!form.email) newErrors.email = 'Email không được để trống';
    else if (!emailRegex.test(form.email)) newErrors.email = 'Email không đúng định dạng';
    else {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const res = await axios.get(`http://localhost:8091/api/admin/users/check-email?email=${form.email}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        if (res.data.exists) newErrors.email = 'Email đã tồn tại';
      } catch {
        newErrors.email = 'Không thể kiểm tra email';
      }
    }

    if (!form.username) newErrors.username = 'Username không được để trống';
    else if (form.username.length < 4) newErrors.username = 'Username phải có ít nhất 4 ký tự';
    else {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const res = await axios.get(`http://localhost:8091/api/admin/users/check-username?username=${form.username}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        if (res.data.exists) newErrors.username = 'Username đã tồn tại';
      } catch {
        newErrors.username = 'Không thể kiểm tra username';
      }
    }

    if (!form.password) newErrors.password = 'Password không được để trống';
    else if (form.password.length < 6) newErrors.password = 'Password phải có ít nhất 6 ký tự';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchUsers = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.get('http://localhost:8091/api/admin/users', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setUsers(res.data);
      console.log(res.data);
    } catch (err) {
      console.error('Lỗi khi tải danh sách người dùng:', err);
    }
  };
  const searchUsers = async (keyword) => {
    keyword = String(keyword); // 👉 đảm bảo là chuỗi

    if (!keyword.trim()) return fetchUsers();
    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.get(`http://localhost:8091/api/admin/users/search?keyword=${keyword}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setUsers(res.data);
    } catch (err) {
      console.error('Lỗi khi tìm kiếm:', err);
    }
  };

  const toggleBan = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    await axios.put(`http://localhost:8091/api/admin/users/${id}/toggle-ban`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    fetchUsers();
  };

  const resetPassword = async (id) => {
    const accessToken = localStorage.getItem("accessToken");

    await axios.post(`http://localhost:8091/api/admin/users/${id}/reset-password`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    alert('Đã reset mật khẩu người dùng');
  };
  const upgradeToSeller = async (userId) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.put(
        `http://localhost:8091/api/admin/users/upgradeToSeller/${userId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert(res.data);

      // Cập nhật list ngoài
      setUsers(prev =>
        prev.map(u =>
          u.userId === userId
            ? { ...u, role: u.role === "SELLER" ? "USER" : "SELLER" }
            : u
        )
      );

      // Nếu modal đang mở và selectedUser là user này => cập nhật modal
      setSelectedUser(prev =>
        prev && prev.userId === userId
          ? { ...prev, role: prev.role === "SELLER" ? "USER" : "SELLER" }
          : prev
      );
    } catch (err) {
      console.error("Lỗi khi nâng cấp tài khoản:", err);
      alert("Không thể nâng cấp tài khoản lên Seller");
    }
  };
  const activeUser = async (userId) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.put(
        `http://localhost:8091/api/admin/users/activeUserById/${userId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert(res.data);

      // Cập nhật list ngoài
      setUsers(prev =>
        prev.map(u =>
          u.userId === userId
            ? { ...u, active: !u.active } // đảo boolean
            : u
        )
      );

      // Cập nhật modal nếu đang mở user này
      setSelectedUser(prev =>
        prev && prev.userId === userId
          ? { ...prev, active: !prev.active } // đảo boolean
          : prev
      );

    } catch (err) {
      console.error("Lỗi khi kích hoạt tài khoản:", err);
      alert("Không thể thực hiện");
    }
  };

  const createUser = async () => {
    const isValid = await validateForm();
    if (!isValid) return;

    try {
      const accessToken = localStorage.getItem("accessToken");

      await axios.post('http://localhost:8091/api/admin/users/create', form, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setShowModal(false);
      setForm({ email: '', username: '', password: '', firstName: '', lastName: '' });
      setErrors({});
      fetchUsers();
      alert("Tạo người dùng thành công");
    } catch (err) {
      alert('Lỗi khi tạo người dùng');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="page-wrapper">
      <style>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999;
        }
        .custom-modal {
          background: #fff; padding: 2rem; border-radius: 10px;
          width: 100%; max-width: 500px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        }
        .custom-modal input,
        .custom-modal select,
        .datepicker-input {
          display: block; width: 100%; padding: 10px;
          margin-bottom: 14px; border: 1px solid #ddd;
          border-radius: 6px; font-size: 14px;
        }
        .modal-actions {
          display: flex; justify-content: flex-end;
          gap: 10px; margin-top: 20px;
        }
        .btn { padding: 10px 16px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; }
        .btn-primary { background-color: #3498db; color: white; }
        .btn-cancel { background-color: #ccc; color: #333; }
        .table-styled td, .table-styled th { vertical-align: middle; text-align: center; border: 1px solid #e0e0e0; padding: 10px; }
        .table-styled tbody tr:hover { background-color: #f5f5f5; }
        .header-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .right-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .search-input {
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          width: 250px;
        }
        .btn-add {
          background-color: #3498db;
          color: #fff;
          padding: 9px 16px;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
        }
        .btn-search {
          background-color: #2ecc71;
          color: #fff;
          padding: 9px 16px;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
        }
      `}</style>
      <div className="main-content">
        <div className="header-actions">
          <h2>Quản lí Người Dùng</h2>
          <div className="right-actions">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm..."
              value={searchKeyword}
              onChange={(e) => {
                const value = e.target.value;
                setSearchKeyword(value);
                searchUsers(value);
              }}
            />
            <button className="btn-search" onClick={searchUsers}>Tìm</button>
            <button className="btn-add" onClick={() => setShowModal(true)}>Thêm Người Dùng</button>
          </div>
        </div>

        <div className="card table-card">
          <div className="card-header pb-0">
            <h4>Danh sách người dùng</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-styled mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Tên</th>
                    <th>Trạng thái</th>
                    <th>Vai trò</th>
                    <th>Khóa/Mở</th>
                    <th>Reset Mật khẩu</th>
                    <th>Chi Tiết </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={user.userId}>
                      <td>{i + 1}</td>
                      <td>{user.email}</td>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>
                        {user.active ? 'Hoạt động' : 'Chưa kích hoạt'} -
                        {user.banned ? 'Đã khóa' : 'Bình thường'}
                      </td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => toggleBan(user.userId)}
                        >
                          Khóa/Mở
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => resetPassword(user.userId)}
                        >
                          Reset mật khẩu
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleOpen(user)}
                        >
                          Xem Chi Tiết
                        </button>
                        <span style={{ color: '#aaa' }}></span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              borderRadius: 3,
              boxShadow: 24,
              p: 4,
              width: 500,
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {selectedUser && (
              <>
                {/* Avatar + Tên */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                  <Avatar
                    src={selectedUser.profilePicture || "https://via.placeholder.com/150"}
                    alt="Profile"
                    sx={{ width: 100, height: 100, mb: 1, border: '3px solid #1976d2' }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {(selectedUser.firstName || "Chưa có thông tin") + " " + (selectedUser.lastName || "")}
                  </Typography>
                  <Chip
                    label={selectedUser.role || "USER"}
                    color="primary"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Thông tin từng dòng */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">Email:</Typography>
                    <Typography>{selectedUser.email || "Chưa có thông tin"}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">Username:</Typography>
                    <Typography>{selectedUser.username || "Chưa có thông tin"}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">Số điện thoại:</Typography>
                    <Typography>{selectedUser.phoneNumber || "Chưa có thông tin"}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">Giới tính:</Typography>
                    <Typography>
                      {selectedUser.gender
                        ? selectedUser.gender === "MALE"
                          ? "Nam"
                          : selectedUser.gender === "FEMALE"
                            ? "Nữ"
                            : "Khác"
                        : "Chưa có thông tin"}
                    </Typography>
                  </Box>


                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">Địa chỉ:</Typography>
                    <Typography>{selectedUser.userAddress || "Chưa có thông tin"}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">Ngày sinh:</Typography>
                    <Typography>
                      {selectedUser.dateOfBirth
                        ? new Date(selectedUser.dateOfBirth).toLocaleDateString("vi-VN")
                        : "Chưa có thông tin"}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">Trạng thái:</Typography>
                    <Typography>
                      {selectedUser.active ? "✅ Hoạt động" : "❌ Chưa kích hoạt"} - {selectedUser.banned ? "🔒 Đã khóa" : "🔓 Bình thường"}
                    </Typography>
                  </Box>
                  <button
                    onClick={() => handleViewCccd(selectedUser.userId)}
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
                  {showCccd && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl w-[600px] p-6 relative">
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
        onClick={() => setShowCccd(false)}
      >
        ✖
      </button>
      <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">🪪 Ảnh căn cước công dân</h3>
      <div className="grid grid-cols-3 gap-4">
        {listCccd.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`CCCD ${index + 1}`}
            className="w-full h-40 object-cover rounded-lg border"
          />
        ))}
      </div>
    </div>
  </div>
)}
                </Box>
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  {/* Nút Kích Hoạt */}
                  <Button
                    variant="contained"
                    color={selectedUser.active ? "error" : "success"}
                    onClick={(e) => activeUser(selectedUser.userId)}

                    sx={{
                      borderRadius: '20px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      px: 3
                    }}
                  >
                    {selectedUser.active ? "Tắt kích hoạt" : "Kích hoạt"}
                  </Button>

                  {/* Nút Quyền Seller / Quyền User */}
                  <Button
                    variant="contained"
                    color={selectedUser.role === "SELLER" ? "info" : "warning"}
                    onClick={(e) => upgradeToSeller(selectedUser.userId)}
                    sx={{
                      borderRadius: '20px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      px: 3
                    }}
                  >

                    {selectedUser.role === "SELLER" ? "Quyền User" : "Quyền Seller"}

                  </Button>
                </Box>
              </>
            )}
          </Box>


        </Modal>



        {showModal && (
          <div className="modal-overlay">
            <div className="custom-modal">
              <h3 style={{ marginBottom: '20px' }}>Tạo Người Dùng Mới</h3>
              <input placeholder="Họ" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              {errors.firstName && <div style={{ color: 'red', fontSize: '13px' }}>{errors.firstName}</div>}
              <input placeholder="Tên" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
              {errors.lastName && <div style={{ color: 'red', fontSize: '13px' }}>{errors.lastName}</div>}
              <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {errors.email && <div style={{ color: 'red', fontSize: '13px' }}>{errors.email}</div>}
              <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
              {errors.username && <div style={{ color: 'red', fontSize: '13px' }}>{errors.username}</div>}
              <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              {errors.password && <div style={{ color: 'red', fontSize: '13px' }}>{errors.password}</div>}
              <div className="modal-actions">
                <button className="btn btn-primary" onClick={createUser}>Tạo</button>
                <button className="btn btn-cancel" onClick={() => setShowModal(false)}>Đóng</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;