import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip as PieTooltip,
  BarChart, Bar, XAxis, YAxis, Tooltip as BarTooltip, ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a020f0', '#e6194B'];

const AdminProductDashboard = () => {
  const [total, setTotal] = useState(0);
  const [statusStats, setStatusStats] = useState([]);
  const [typeStats, setTypeStats] = useState([]);
  const [storeStats, setStoreStats] = useState([]);
  const [createdStats, setCreatedStats] = useState([]);

  useEffect(() => {
    fetchTotalProducts();
    fetchProductByStatus();
    fetchProductByType();
    fetchProductByStore();
    fetchProductByCreatedMonth();
  }, []);

  const fetchTotalProducts = async () => {
    const res = await axios.get('http://localhost:8091/api/admin/products/stats/total');
    setTotal(res.data);
  };

  const fetchProductByStatus = async () => {
    const res = await axios.get('http://localhost:8091/api/admin/products/stats/by-status');
    setStatusStats(res.data);
  };

  const fetchProductByType = async () => {
    const res = await axios.get('http://localhost:8091/api/admin/products/stats/by-type');
    setTypeStats(res.data);
  };

  const fetchProductByStore = async () => {
    const res = await axios.get('http://localhost:8091/api/admin/products/stats/by-store');
    setStoreStats(res.data);
  };

  const fetchProductByCreatedMonth = async () => {
    const res = await axios.get('http://localhost:8091/api/admin/products/stats/by-created-month');
    setCreatedStats(res.data);
  };

  const getPercentage = (count) => {
    if (total === 0) return '0%';
    return ((count / total) * 100).toFixed(1) + '%';
  };

  const containerStyle = {
    padding: '30px 40px 80px 260px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    color: '#1e293b',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    marginBottom: '30px',
    flex: 1,
    minWidth: '400px',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    fontSize: '14px',
  };

  const thStyle = {
    textAlign: 'left',
    padding: '10px',
    borderBottom: '1px solid #e2e8f0',
    color: '#475569',
  };

  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #e2e8f0',
  };

  const renderBarChartCard = (title, data, dataKey) => (
    <div style={cardStyle}>
      <h3 style={titleStyle}>{title}</h3>
      <div style={{ width: '100%', height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={45}>
            <XAxis dataKey="key" />
            <YAxis />
            <BarTooltip />
            <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Tên</th>
            <th style={thStyle}>Số lượng</th>
            <th style={thStyle}>Tỷ lệ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td style={tdStyle}>{item.key}</td>
              <td style={tdStyle}>{item.count}</td>
              <td style={tdStyle}>{getPercentage(item.count)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px' }}>
        📊 Thống kê sản phẩm
      </h2>

      <div style={cardStyle}>
        <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Tổng số sản phẩm</h3>
        <p style={{ fontSize: '40px', color: '#2563eb', fontWeight: 'bold' }}>{total}</p>
      </div>

      {/* Row 1: status + type */}
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {/* Pie chart */}
        <div style={cardStyle}>
          <h3 style={titleStyle}>📦 Theo Trạng Thái</h3>
          <div style={{ width: '100%', height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusStats}
                  dataKey="count"
                  nameKey="key"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {statusStats.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <PieTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Trạng thái</th>
                <th style={thStyle}>Số lượng</th>
                <th style={thStyle}>Tỷ lệ</th>
              </tr>
            </thead>
            <tbody>
              {statusStats.map((item, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{item.key}</td>
                  <td style={tdStyle}>{item.count}</td>
                  <td style={tdStyle}>{getPercentage(item.count)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {renderBarChartCard('🧸 Theo Loại Sản Phẩm', typeStats, 'product_type')}
      </div>

      {/* Row 2: store + month */}
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {renderBarChartCard('🏬 Theo Cửa Hàng', storeStats, 'store_id')}
        {renderBarChartCard('📅 Theo Tháng Tạo', createdStats, 'created_at')}
      </div>
    </div>
  );
};

export default AdminProductDashboard;
