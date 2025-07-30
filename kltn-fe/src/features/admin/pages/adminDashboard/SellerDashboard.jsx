import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('shops');
  const [pendingShops, setPendingShops] = useState([]);
  const [shopEdits, setShopEdits] = useState([]);
  const [authRequests, setAuthRequests] = useState([]);

  useEffect(() => {
    if (activeTab === 'shops') fetchPendingShops();
    if (activeTab === 'edits') fetchShopEdits();
    if (activeTab === 'auth') fetchAuthRequests();
  }, [activeTab]);

  const fetchPendingShops = async () => {
    const res = await axios.get('http://localhost:8091/api/admin/sellers/pending-shops');
    setPendingShops(res.data);
  };

  const fetchShopEdits = async () => {
    const res = await axios.get('http://localhost:8091/api/admin/sellers/pending-edits');
    setShopEdits(res.data);
  };

  const fetchAuthRequests = async () => {
    const res = await axios.get('http://localhost:8091/api/admin/sellers/authentications');
    setAuthRequests(res.data);
  };

  const approveShop = async (id) => {
    await axios.put(`http://localhost:8091/api/admin/sellers/approve-shop/${id}`);
    fetchPendingShops();
  };

  const banShop = async (id) => {
    await axios.put(`http://localhost:8091/api/admin/sellers/ban-shop/${id}`);
    fetchPendingShops();
  };

  const approveEdit = async (id) => {
    await axios.put(`http://localhost:8091/api/admin/sellers/approve-edit/${id}`);
    fetchShopEdits();
  };

  const rejectEdit = async (id) => {
    await axios.put(`http://localhost:8091/api/admin/sellers/reject-edit/${id}`);
    fetchShopEdits();
  };

  const approveAuth = async (id) => {
    await axios.put(`http://localhost:8091/api/admin/sellers/approve-authentication/${id}`);
    fetchAuthRequests();
  };

  const rejectAuth = async (id) => {
    await axios.put(`http://localhost:8091/api/admin/sellers/reject-authentication/${id}`);
    fetchAuthRequests();
  };

  const renderTable = () => {
    switch (activeTab) {
      case 'shops':
        return (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên shop</th>
                <th>Email</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {pendingShops.map((shop, i) => (
                <tr key={shop.shopId}>
                  <td>{i + 1}</td>
                  <td>{shop.nameShop}</td>
                  <td>{shop.shopEmail}</td>
                  <td>{shop.shopStatus}</td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={() => approveShop(shop.shopId)}>Duyệt</button>
                    <button className="btn btn-danger btn-sm" onClick={() => banShop(shop.shopId)}>Khóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'edits':
        return (
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
        );

      case 'auth':
        return (
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
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <style>{`
        .nav-tabs .nav-link.active {
          background-color: #3498db;
          color: white;
        }
        .table img {
          border-radius: 6px;
          object-fit: cover;
        }
      `}</style>
      <h3 className="mb-3">Quản lý Seller</h3>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'shops' ? 'active' : ''}`} onClick={() => setActiveTab('shops')}>Shop chờ duyệt</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'edits' ? 'active' : ''}`} onClick={() => setActiveTab('edits')}>Yêu cầu chỉnh sửa</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'auth' ? 'active' : ''}`} onClick={() => setActiveTab('auth')}>Xác thực CCCD</button>
        </li>
      </ul>
      {renderTable()}
    </div>
  );
};

export default SellerDashboard;
