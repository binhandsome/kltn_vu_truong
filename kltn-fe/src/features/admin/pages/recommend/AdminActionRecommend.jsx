import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';

/**
 * AdminActionRecommend - Tích hợp Backend
 * ------------------------------------------------------------
 * - Tích hợp đầy đủ với Spring Boot backend (port 8091)
 * - Dữ liệu response: actionRecommendId, fileSave, topK, step, createdAt, updatedAt
 * - Xử lý luồng step 1->2->3 theo backend logic
 * - Sử dụng axios với accessToken trong header
 */

const STEP_MAP = {
  1: { label: 'Đã Xuất Sản Phẩm', className: 'badge-amber' },
  2: { label: 'Build Thành Công', className: 'badge-green' },
  3: { label: 'Đã Lưu Vào Bảng Recommend', className: 'badge-blue' },
};

const API_BASE_URL = 'http://localhost:8765/api/admin/historyActionRecommend';

// Tạo axios instance với token
const createAxiosInstance = () => {
  const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    }
  });
};

function formatDate(dt) {
  if (!dt) return '—';
  try {
    return new Date(dt).toLocaleString('vi-VN');
  } catch {
    return dt;
  }
}

// Lấy tên file từ path
function extractFileName(filePath) {
  if (!filePath) return '—';
  // Xử lý cả dạng / và \
  return filePath.replace(/\\/g, '/').split('/').pop();
}

const gradientBtnStyle = {
  background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
  color: '#fff',
  fontWeight: '600',
  padding: '12px 24px',
  borderRadius: '16px',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.3s ease',
};

export default function AdminActionRecommend() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const [buildLoading, setBuildLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [selectedTopK, setSelectedTopK] = useState(10);
  const [message, setMessage] = useState({ type: '', text: '' });

  const columns = useMemo(
    () => ['Tên File', 'Bước', 'Top K', 'Ngày Tạo', 'Ngày Sửa', 'Thao tác'],
    []
  );

  // Hiển thị message tạm thời
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Lấy danh sách history từ API
  const fetchHistoryList = async () => {
    try {
      setLoading(true);
      const api = createAxiosInstance();
      const response = await api.get('/findAllHistoryRecommend');
      setRows(response.data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
      showMessage('error', 'Lỗi khi tải danh sách lịch sử');
    } finally {
      setLoading(false);
    }
  };

  // Load data khi component mount
  useEffect(() => {
    fetchHistoryList();
  }, []);

  const openModal = (row) => {
    setCurrent(row);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrent(null);
    setSelectedTopK(10);
  };

  // Xuất sản phẩm - gọi API exportMetaProduct
  const handleExportProducts = async () => {
    try {
      setLoading(true);
      const api = createAxiosInstance();
      const response = await api.get('/exportMetaProduct');
      
      if (response.data === 'Thành Công') {
        showMessage('success', 'Xuất sản phẩm thành công!');
        // Reload danh sách để hiển thị record mới
        await fetchHistoryList();
      } else {
        showMessage('error', 'Xuất sản phẩm thất bại!');
      }
    } catch (error) {
      console.error('Export error:', error);
      showMessage('error', 'Lỗi khi xuất sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  // Build offline - gọi API runBuildOffline
  const handleBuildOffline = async () => {
    if (!current) return;
    
    try {
      setBuildLoading(true);
      const api = createAxiosInstance();
      
      const requestBody = {
        meta_path: current.fileSave,
        topk: selectedTopK
      };
      
      const response = await api.post('/runBuildOffline', requestBody);
      
      if (response.data === 'Thành Công') {
        showMessage('success', `Build thành công với TopK = ${selectedTopK}!`);
        // Cập nhật local state
        setRows(prev => prev.map(r => 
          r.actionRecommendId === current.actionRecommendId 
            ? { ...r, step: 2, topK: selectedTopK, updatedAt: new Date().toISOString() }
            : r
        ));
        setCurrent(prev => ({ ...prev, step: 2, topK: selectedTopK }));
      } else {
        showMessage('error', 'Build thất bại!');
      }
    } catch (error) {
      console.error('Build error:', error);
      showMessage('error', 'Lỗi khi build offline');
    } finally {
      setBuildLoading(false);
    }
  };

  // Import recommendations - gọi API importRecommend
  const handleImportRecommendations = async () => {
    if (!current) return;
    
    try {
      setImportLoading(true);
      const api = createAxiosInstance();
      
      const response = await api.get('/importRecommend', {
        params: { fileSave: current.fileSave }
      });
      
      if (response.data === 'Thành Công') {
        showMessage('success', 'Lưu vào bảng Recommend thành công!');
        // Cập nhật local state
        setRows(prev => prev.map(r => 
          r.actionRecommendId === current.actionRecommendId 
            ? { ...r, step: 3, updatedAt: new Date().toISOString() }
            : r
        ));
        setCurrent(prev => ({ ...prev, step: 3 }));
      } else {
        showMessage('error', 'Lưu vào bảng Recommend thất bại!');
      }
    } catch (error) {
      console.error('Import error:', error);
      showMessage('error', 'Lỗi khi lưu vào bảng Recommend');
    } finally {
      setImportLoading(false);
    }
  };

  // Render nút thao tác theo step
  const renderActionButton = (row) => {
    if (row.step === 1) {
      return (
        <button
          className="btn btn-primary"
          onClick={() => openModal(row)}
          style={{ borderRadius: 10 }}
          title="Chọn TopK và Build"
        >
          🧱 Build Offline
        </button>
      );
    } else if (row.step === 2) {
      return (
        <button
          className="btn btn-success"
          onClick={() => openModal(row)}
          style={{ borderRadius: 10 }}
          title="Lưu vào bảng Recommend"
        >
          💾 Lấy danh sách recommend
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-info"
          onClick={() => openModal(row)}
          style={{ borderRadius: 10 }}
          title="Xem chi tiết"
        >
          👁️ Xem chi tiết
        </button>
      );
    }
  };

  return (
    <div className="main-content">
      {/* Message Alert */}
      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`} 
             style={{ margin: '0 0 20px 0', borderRadius: 10 }}>
          {message.text}
        </div>
      )}

      {/* Header + Breadcrumb */}
      <div className="row">
        <div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="page-title-wrapper">
            <div className="page-title-box">
              <h4 className="page-title">Hành động Recommend</h4>
            </div>

            <button
              onClick={handleExportProducts}
              disabled={loading}
              style={{
                ...gradientBtnStyle,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {loading ? '⏳ Đang xuất...' : '⬇️ Xuất Sản Phẩm'}
            </button>

            <div className="breadcrumb-list">
              <ul>
                <li className="breadcrumb-link">
                  <a href="#"><i className="fas fa-home mr-2"></i>Trang tổng quan</a>
                </li>
                <li className="breadcrumb-link active">Hành động Recommend</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="row ad-btm-space">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="table-responsive" style={{ background: '#fff', borderRadius: 16 }}>
            <table className="table table-striped table-hover" style={{ marginBottom: 0 }}>
              <thead>
                <tr>
                  {columns.map((c) => (
                    <th key={c} style={{ whiteSpace: 'nowrap' }}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center">⏳ Đang tải...</td>
                  </tr>
                ) : rows.length ? (
                  rows.map((row) => (
                    <tr key={row.actionRecommendId}>
                      <td style={{ fontWeight: 600 }}>
                        {extractFileName(row.fileSave)}
                      </td>
                      <td>
                        <span className={`int-badge ${STEP_MAP[row.step]?.className || ''}`}>
                          {STEP_MAP[row.step]?.label || 'Không xác định'}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        {row.topK || '—'}
                      </td>
                      <td>{formatDate(row.createdAt)}</td>
                      <td>{formatDate(row.updatedAt)}</td>
                      <td>
                        {renderActionButton(row)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">Không có dữ liệu.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="ad-footer-btm">
        <p>Copyright 2022 © SplashDash All Rights Reserved.</p>
      </div>

      {/* Modal */}
      {modalOpen && current && (
        <div
          className="modal-backdrop"
          onClick={closeModal}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          }}
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(720px, 92vw)', background: '#fff', borderRadius: 16,
              boxShadow: '0 10px 30px rgba(0,0,0,.25)', overflow: 'hidden'
            }}
          >
            <div style={{ 
              padding: 16, 
              borderBottom: '1px solid #f1f5f9', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <h5 style={{ margin: 0 }}>Chi tiết file - ID: {current.actionRecommendId}</h5>
              <button className="btn btn-sm btn-light" onClick={closeModal} title="Đóng">✖</button>
            </div>

            <div style={{ padding: 16 }}>
              <div className="row" style={{ rowGap: 10 }}>
                <div className="col-4 text-muted">ID</div>
                <div className="col-8 fw-600">{current.actionRecommendId}</div>

                <div className="col-4 text-muted">Tên File</div>
                <div className="col-8 fw-600">
                  {extractFileName(current.fileSave)}
                </div>

                <div className="col-4 text-muted">Đường dẫn File</div>
                <div className="col-8 fw-600" style={{ fontSize: 12, wordBreak: 'break-all' }}>
                  {current.fileSave || '—'}
                </div>

                <div className="col-4 text-muted">Bước</div>
                <div className="col-8 fw-600">
                  <span className={`int-badge ${STEP_MAP[current.step]?.className || ''}`}>
                    {STEP_MAP[current.step]?.label || 'Không xác định'}
                  </span>
                </div>

                <div className="col-4 text-muted">Top K</div>
                <div className="col-8 fw-600">{current.topK || '—'}</div>

                <div className="col-4 text-muted">Ngày Tạo</div>
                <div className="col-8 fw-600">{formatDate(current.createdAt)}</div>

                <div className="col-4 text-muted">Ngày Cập Nhật</div>
                <div className="col-8 fw-600">{formatDate(current.updatedAt)}</div>
              </div>

              {/* Actions theo step */}
              <div style={{ marginTop: 20, borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
                {current.step === 1 && (
                  <div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
                        Chọn Top K:
                      </label>
                      <select 
                        value={selectedTopK}
                        onChange={(e) => setSelectedTopK(Number(e.target.value))}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 8,
                          border: '1px solid #d1d5db',
                          background: '#fff',
                          minWidth: 120
                        }}
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                      </select>
                    </div>
                    <button 
                      className="btn btn-primary"
                      onClick={handleBuildOffline}
                      disabled={buildLoading}
                      style={{ minWidth: 120 }}
                    >
                      {buildLoading ? '⏳ Đang build...' : '🧱 Bắt đầu Build'}
                    </button>
                  </div>
                )}

                {current.step === 2 && (
                  <div>
                    <p style={{ marginBottom: 16, color: '#6b7280' }}>
                      Build đã hoàn thành với TopK = {current.topK}. Bạn có thể lưu vào bảng Recommend.
                    </p>
                    <button 
                      className="btn btn-success"
                      onClick={handleImportRecommendations}
                      disabled={importLoading}
                      style={{ minWidth: 150 }}
                    >
                      {importLoading ? '⏳ Đang lưu...' : '💾 Lưu vào Recommend'}
                    </button>
                  </div>
                )}

                {current.step === 3 && (
                  <div>
                    <p style={{ marginBottom: 0, color: '#047857', fontWeight: 600 }}>
                      ✅ Đã hoàn thành toàn bộ quy trình. File đã được lưu vào bảng Recommend với TopK = {current.topK}.
                 
                       
                    </p>
                  </div>
                )}
              </div>

              {/* Debug info */}
              <div style={{ 
                marginTop: 16, 
                padding: 12, 
                background: '#f9fafb', 
                borderRadius: 8,
                fontSize: 12,
                color: '#6b7280'
              }}>
                <strong>Debug Info:</strong><br/>
                File: {current.fileSave}<br/>
                Step: {current.step} | TopK: {current.topK || 'null'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS */}
      <style>{`
        .int-badge{display:inline-block;padding:6px 10px;border-radius:999px;font-weight:600;font-size:12px;}
        .badge-amber{background:#fff7ed;color:#c2410c;border:1px solid #fdba74}
        .badge-green{background:#ecfdf5;color:#047857;border:1px solid #6ee7b7}
        .badge-blue{background:#eff6ff;color:#1d4ed8;border:1px solid #93c5fd}
        .fw-600{font-weight:600}
        
        .alert {
          border: none;
          padding: 12px 16px;
          font-weight: 500;
        }
        .alert-success {
          background-color: #d1fae5;
          color: #065f46;
        }
        .alert-danger {
          background-color: #fee2e2;
          color: #991b1b;
        }
        
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}