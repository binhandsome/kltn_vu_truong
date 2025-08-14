import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip as PieTooltip,
  BarChart, Bar, XAxis, YAxis, Tooltip as BarTooltip, ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a020f0', '#e6194B'];
const API_SELLER = process.env.REACT_APP_API_SELLER || 'http://localhost:8089';

const AdminProductDashboard = () => {
  // Stats
  const [total, setTotal] = useState(0);
  const [statusStats, setStatusStats] = useState([]);
  const [typeStats, setTypeStats] = useState([]);
  const [storeStats, setStoreStats] = useState([]);
  const [createdStats, setCreatedStats] = useState([]);

  // Store pagination + naming + sorting
  const [storePage, setStorePage] = useState(0);
  const [storePageSize, setStorePageSize] = useState(10);
  const [storeNameMap, setStoreNameMap] = useState({}); // { [storeId]: 'Tên cửa hàng' }
  const [storeSortBy, setStoreSortBy] = useState('count'); // 'count' | 'name'
  const [storeSortDir, setStoreSortDir] = useState('desc'); // 'asc' | 'desc'

  useEffect(() => {
    fetchTotalProducts();
    fetchProductByStatus();
    fetchProductByType();
    fetchProductByStore();
    fetchProductByCreatedMonth();
  }, []);

  const fetchTotalProducts = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get('http://localhost:8091/api/admin/products/stats/total', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setTotal(res.data);
  };

  const fetchProductByStatus = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get('http://localhost:8091/api/admin/products/stats/by-status', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setStatusStats(res.data || []);
  };

  const fetchProductByType = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get('http://localhost:8091/api/admin/products/stats/by-type', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setTypeStats(res.data || []);
  };

  const fetchProductByStore = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get('http://localhost:8091/api/admin/products/stats/by-store', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setStoreStats(res.data || []);
    setStorePage(0);
  };

  const fetchProductByCreatedMonth = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get('http://localhost:8091/api/admin/products/stats/by-created-month', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setCreatedStats(res.data || []);
  };

  const getPercentage = (count) => {
    if (total === 0) return '0%';
    return ((count / total) * 100).toFixed(1) + '%';
  };

  // ===== VIETNAMESE LABEL HELPERS =====
  const viStatus = (val) => {
    const s = String(val || '').toUpperCase();
    switch (s) {
      case 'ACTIVE': return 'Hoạt động';
      case 'INACTIVE': return 'Không hoạt động';
      case 'PENDING': return 'Chờ duyệt';
      case 'DRAFT': return 'Nháp';
      case 'DELETED': return 'Đã xóa';
      case 'BANNED': return 'Bị khóa';
      case 'HIDDEN': return 'Ẩn';
      case 'IN_STOCK': return 'Còn hàng';
      case 'OUT_OF_STOCK': return 'Hết hàng';
      default: return val ?? '';
    }
  };

  const viMonthKey = (val) => {
    // Chuyển 'YYYY-MM' hoặc 'YYYY-MM-DD' -> 'MM/YYYY'
    const s = String(val || '');
    const m = s.match(/^(\d{4})-(\d{2})(?:-\d{2})?$/);
    if (m) return `${m[2]}/${m[1]}`;
    return val ?? '';
  };

  // ==== Helpers for store block ====
  const getStoreId = (key) => {
    if (key == null) return null;
    const m = String(key).match(/\d+/);
    return m ? Number(m[0]) : null;
  };

  // Fetch store names (only missing ids)
  const fetchStoreNames = async (ids) => {
    const missing = ids.filter((id) => id && !storeNameMap[id]);
    if (missing.length === 0) return;
    try {
      const pairs = await Promise.all(
        missing.map(async (id) => {
          try {
            const { data } = await axios.get(`${API_SELLER}/api/seller/public/${id}`);
            const name = data?.name || `Cửa hàng #${id}`;
            return [id, name];
          } catch {
            return [id, `Cửa hàng #${id}`];
          }
        })
      );
      setStoreNameMap((prev) => ({ ...prev, ...Object.fromEntries(pairs) }));
    } catch {
      // ignore
    }
  };

  // Ensure we fetch names for the CURRENT PAGE after sorting
  useEffect(() => {
    // build full list with fallback names for sorting
    const full = storeStats.map((it, i) => {
      const id = getStoreId(it.key);
      const name = storeNameMap[id] || `Cửa hàng #${id ?? '-'}`;
      return { ...it, storeId: id, name, _i: i };
    });

    const cmp = (a, b) => {
      let r;
      if (storeSortBy === 'count') r = a.count - b.count;
      else r = String(a.name).localeCompare(String(b.name), 'vi', { sensitivity: 'base' });
      if (r === 0) r = (a._i ?? 0) - (b._i ?? 0);
      return storeSortDir === 'asc' ? r : -r;
    };

    const sorted = [...full].sort(cmp);
    const start = storePage * storePageSize;
    const end = start + storePageSize;
    const page = sorted.slice(start, end);
    const ids = page.map((it) => it.storeId).filter(Boolean);
    if (ids.length) fetchStoreNames(ids);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storePage, storePageSize, storeStats, storeNameMap, storeSortBy, storeSortDir]);

  // ==== Styles ====
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

  // ======== Data đã Việt hóa ========
  const statusStatsSorted = useMemo(
    () => [...statusStats].sort((a, b) => b.count - a.count),
    [statusStats]
  );
  const statusStatsVI = useMemo(
    () => statusStatsSorted.map(it => ({ ...it, label: viStatus(it.key) })),
    [statusStatsSorted]
  );

  const typeStatsSorted = useMemo(
    () => [...typeStats].sort((a, b) => b.count - a.count),
    [typeStats]
  );

  const createdStatsSorted = useMemo(
    () => [...createdStats].sort((a, b) => b.count - a.count),
    [createdStats]
  );
  const createdStatsVI = useMemo(
    () => createdStatsSorted.map(it => ({ ...it, label: viMonthKey(it.key) })),
    [createdStatsSorted]
  );

  // ======== Tooltip Việt hóa ========
  const CustomBarTooltip = ({ active, label, payload }) => {
    if (active && payload && payload.length) {
      const value = payload[0]?.value ?? 0;
      return (
        <div style={{
          background: '#fff', border: '1px solid #e5e7eb', padding: 10, borderRadius: 8
        }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
          <div>Số lượng: <b>{value}</b></div>
          <div>Tỷ lệ: <b>{getPercentage(value)}</b></div>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const p = payload[0];
      const name = p?.name ?? '';
      const value = p?.value ?? 0;
      return (
        <div style={{
          background: '#fff', border: '1px solid #e5e7eb', padding: 10, borderRadius: 8
        }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{name}</div>
          <div>Số lượng: <b>{value}</b></div>
          <div>Tỷ lệ: <b>{getPercentage(value)}</b></div>
        </div>
      );
    }
    return null;
  };

  // ========= Generic card (bar) với nhãn Việt =========
  const renderBarChartCard = (title, data, useLabelKey = false) => (
    <div style={cardStyle}>
      <h3 style={titleStyle}>{title}</h3>
      <div style={{ width: '100%', height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={45}>
            <XAxis dataKey={useLabelKey ? 'label' : 'key'} />
            <YAxis />
            <BarTooltip content={<CustomBarTooltip />} />
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
              <td style={tdStyle}>{useLabelKey ? item.label : item.key}</td>
              <td style={tdStyle}>{item.count}</td>
              <td style={tdStyle}>{getPercentage(item.count)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // ========= Store block =========
  const renderStoreChartCard = () => {
    const totalPages = Math.ceil(storeStats.length / storePageSize) || 1;
    const clamp = (n, min, max) => Math.max(min, Math.min(n, max));
    const page = clamp(storePage, 0, totalPages - 1);

    const full = storeStats.map((it, i) => {
      const id = getStoreId(it.key);
      const name = storeNameMap[id] || `Cửa hàng #${id ?? '-'}`;
      return { key: name, count: it.count, storeId: id, _i: i };
    });

    const cmp = (a, b) => {
      let r;
      if (storeSortBy === 'count') r = a.count - b.count;
      else r = String(a.key).localeCompare(String(b.key), 'vi', { sensitivity: 'base' });
      if (r === 0) r = (a._i ?? 0) - (b._i ?? 0);
      return storeSortDir === 'asc' ? r : -r;
    };

    const sorted = [...full].sort(cmp);
    const start = page * storePageSize;
    const end = start + storePageSize;
    const pageData = sorted.slice(start, end);

    return (
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <h3 style={titleStyle}>🏬 Theo cửa hàng</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label className="small text-muted">Số dòng</label>
              <select
                value={storePageSize}
                onChange={(e) => { setStorePageSize(Number(e.target.value)); setStorePage(0); }}
                className="form-select"
                style={{ width: 90, height: 36 }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label className="small text-muted">Sắp xếp</label>
              <select
                value={storeSortBy}
                onChange={(e) => { setStoreSortBy(e.target.value); setStorePage(0); }}
                className="form-select"
                style={{ width: 140, height: 36 }}
              >
                <option value="count">Theo số lượng</option>
                <option value="name">Theo tên cửa hàng</option>
              </select>
              <select
                value={storeSortDir}
                onChange={(e) => { setStoreSortDir(e.target.value); }}
                className="form-select"
                style={{ width: 120, height: 36 }}
              >
                <option value="desc">Giảm dần</option>
                <option value="asc">Tăng dần</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: '250px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pageData} barSize={45}>
              <XAxis dataKey="key" interval={0} tick={{ fontSize: 12 }} />
              <YAxis />
              <BarTooltip content={<CustomBarTooltip />} />
              <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Cửa hàng</th>
              <th style={thStyle}>Số lượng</th>
              <th style={thStyle}>Tỷ lệ</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, idx) => (
              <tr key={idx}>
                <td style={tdStyle}>
                  <Link to={`/admin/product/allproduct?storeId=${row.storeId}`} className="text-primary">
                    {row.key}
                  </Link>
                </td>
                <td style={tdStyle}>{row.count}</td>
                <td style={tdStyle}>{getPercentage(row.count)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <div className="text-muted small">
            Trang {page + 1} / {totalPages} • Tổng {storeStats.length} cửa hàng
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={page <= 0}
              onClick={() => setStorePage((p) => Math.max(0, p - 1))}
            >
              ‹ Trước
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={page >= totalPages - 1}
              onClick={() => setStorePage((p) => Math.min(totalPages - 1, p + 1))}
            >
              Sau ›
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px' }}>
        📊 Thống kê sản phẩm
      </h2>

      <div style={cardStyle}>
        <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Tổng số sản phẩm</h3>
        <p style={{ fontSize: '40px', color: '#2563eb', fontWeight: 'bold' }}>{total}</p>
      </div>

      {/* Hàng 1: Trạng thái + Loại */}
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {/* Pie theo trạng thái */}
        <div style={cardStyle}>
          <h3 style={titleStyle}>📦 Theo trạng thái</h3>
          <div style={{ width: '100%', height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusStatsVI}
                  dataKey="count"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {statusStatsVI.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <PieTooltip content={<CustomPieTooltip />} />
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
              {statusStatsVI.map((item, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{item.label}</td>
                  <td style={tdStyle}>{item.count}</td>
                  <td style={tdStyle}>{getPercentage(item.count)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {renderBarChartCard('🧸 Theo loại sản phẩm', typeStatsSorted, false)}
      </div>

      {/* Hàng 2: Cửa hàng + Tháng tạo */}
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {renderStoreChartCard()}
        {renderBarChartCard('📅 Theo tháng tạo', createdStatsVI, true)}
      </div>
    </div>
  );
};

export default AdminProductDashboard;
