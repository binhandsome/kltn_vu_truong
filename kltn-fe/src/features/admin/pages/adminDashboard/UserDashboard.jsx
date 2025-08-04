import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: '', username: '', password: '', firstName: '', lastName: ''
  });

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

    await axios.put(`http://localhost:8091/api/admin/users/${id}/toggle-ban`, {
         headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    fetchUsers();
  };

  const resetPassword = async (id) => {
            const accessToken = localStorage.getItem("accessToken");

    await axios.post(`http://localhost:8091/api/admin/users/${id}/reset-password`, {
         headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    alert('Đã reset mật khẩu người dùng');
  };

  const upgradeToSeller = async (userId) => {
            const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await axios.put(`http://localhost:8091/api/admin/users/upgradeToSeller/${userId}`, {
         headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      alert(res.data);
      fetchUsers();
    } catch (err) {
      console.error('Lỗi khi nâng cấp tài khoản:', err);
      alert('Không thể nâng cấp tài khoản lên Seller');
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
                    <th>Cấp quyền</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={user.userId}>
                      <td>{i + 1}</td>
                      <td>{user.email}</td>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.active ? 'Hoạt động' : 'Chưa kích hoạt'} - {user.banned ? 'Đã khóa' : 'Bình thường'}</td>
                      <td>{user.role}</td>
                      <td><button className="btn btn-warning btn-sm" onClick={() => toggleBan(user.userId)}>Khóa/Mở</button></td>
                      <td><button className="btn btn-info btn-sm" onClick={() => resetPassword(user.userId)}>Reset mật khẩu</button></td>
                      <td>{user.role === 'USER' ? <button className="btn btn-success btn-sm" onClick={() => upgradeToSeller(user.userId)}>Cấp quyền Seller</button> : <span style={{ color: '#aaa' }}>---</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

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