import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    email: '', username: '', password: '', firstName: '', lastName: '', phoneNumber: '', userAddress: '', gender: '', dateOfBirth: ''
  });

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:8090/api/admin/users');
    setUsers(res.data);
  };

  const searchUsers = async () => {
    if (!searchKeyword.trim()) return fetchUsers();
    const res = await axios.get(`http://localhost:8090/api/admin/users/search?keyword=${searchKeyword}`);
    setUsers(res.data);
  };

  const toggleBan = async (id) => {
    await axios.put(`http://localhost:8090/api/admin/users/toggleBan/${id}`);
    fetchUsers();
  };

  const activateUser = async (id) => {
    await axios.put(`http://localhost:8090/api/admin/users/activate/${id}`);
    fetchUsers();
  };

  const resetPassword = async (id) => {
    await axios.post(`http://localhost:8090/api/admin/users/resetPassword/${id}`);
    alert('Đã reset mật khẩu người dùng');
  };

  const changeRole = async (id, role) => {
    await axios.put(`http://localhost:8090/api/admin/users/changeRole/${id}?role=${role}`);
    fetchUsers();
  };

  const createUser = async () => {
    await axios.post('http://localhost:8090/api/admin/users/create', form);
    setShowModal(false);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="main-content">
        <div className="page-title-wrapper">
          <div className="page-title-box ad-title-box-use">
            <h4 className="page-title">Quản lí người dùng</h4>
          </div>
          <div className="ad-breadcrumb">
            <div className="ad-user-btn">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchUsers()}
              />
            </div>
            <div className="add-group">
              <button className="ad-btn" onClick={() => setShowModal(true)}>
                Thêm người dùng
              </button>
            </div>
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
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={user.id}>
                      <td>{i + 1}</td>
                      <td>{user.email}</td>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.active ? 'Hoạt động' : 'Chưa kích hoạt'} - {user.banned ? 'Đã khóa' : 'Bình thường'}</td>
                      <td>{user.role}</td>
                      <td>
                        <button onClick={() => toggleBan(user.id)}>Khóa/Mở</button>
                        <button onClick={() => activateUser(user.id)}>Kích hoạt</button>
                        <button onClick={() => resetPassword(user.id)}>Reset mật khẩu</button>
                        <select onChange={(e) => changeRole(user.id, e.target.value)} defaultValue={user.role}>
                          <option value="USER">USER</option>
                          <option value="SELLER">SELLER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h4>Tạo người dùng mới</h4>
              <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
              <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <input placeholder="First name" onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              <input placeholder="Last name" onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
              <input placeholder="Phone" onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} />
              <input placeholder="Address" onChange={(e) => setForm({ ...form, userAddress: e.target.value })} />
              <input placeholder="Gender (MALE/FEMALE/OTHER)" onChange={(e) => setForm({ ...form, gender: e.target.value })} />
              <input placeholder="Date of Birth (yyyy-MM-dd)" onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} />
              <button onClick={createUser}>Tạo</button>
              <button onClick={() => setShowModal(false)}>Đóng</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
