import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10; // mỗi trang 10 sp

const InventoryProduct = () => {
  const [items, setItems] = useState([]);               // dữ liệu TRANG HIỆN TẠI
  const [page, setPage] = useState(1);                  // 1-based cho UI
  const [totalPages, setTotalPages] = useState(1);      // lấy từ BE
  const [totalElements, setTotalElements] = useState(0);// lấy từ BE
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // map EN -> VI cho trạng thái sản phẩm
const toVNProductStatus = (s) => {
  const v = (s || "").toLowerCase();
  if (v === "active") return "Đang bán";
  if (v === "inactive") return "Ngừng bán";
  return "—";
};

  // Gọi BE có phân trang
  const fetchProducts = async (uiPage = 1) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return navigate("/login");

    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8089/api/seller/products", {
        params: {
          page: uiPage - 1, // Spring Data dùng 0-based
          size: PAGE_SIZE,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // Hỗ trợ cả 2 kiểu: {content,totalPages,totalElements} HOẶC [] (fallback)
      const data = res.data || {};
      const pageContent = Array.isArray(data.content)
        ? data.content
        : Array.isArray(data)
        ? data
        : [];

      setItems(pageContent);
      setTotalPages(
        Number.isFinite(data.totalPages)
          ? data.totalPages
          : Math.max(1, Math.ceil(pageContent.length / PAGE_SIZE))
      );
      setTotalElements(
        Number.isFinite(data.totalElements) ? data.totalElements : pageContent.length
      );
      setPage(uiPage);
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách sản phẩm:", error);
      setItems([]);
      setTotalPages(1);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  // tải lần đầu và khi đổi trang
  useEffect(() => {
    fetchProducts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // hiển thị tối đa 5 nút trang quanh trang hiện tại
  const pageNumbers = useMemo(() => {
    const MAX = 5;
    let from = Math.max(1, page - Math.floor(MAX / 2));
    let to = Math.min(totalPages, from + MAX - 1);
    from = Math.max(1, to - MAX + 1);
    return Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i);
  }, [page, totalPages]);

  const handleToggleStatus = async (productId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await axios.put(
        `http://localhost:8089/api/seller/products/${productId}/status`,
        null,
        {
          params: { status: newStatus },
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        }
      );
      // cập nhật cục bộ trang hiện tại
      setItems((prev) =>
        prev.map((x) => (x.productId === productId ? { ...x, productStatus: newStatus } : x))
      );
    } catch (err) {
      console.error("❌ Không thể cập nhật trạng thái sản phẩm:", err);
      alert("Không thể cập nhật trạng thái sản phẩm.");
    }
  };

  const handleViewVariants = (productId) => {
    navigate(`/seller/inventory/product/${productId}/variants`);
  };

  const startIndex = items.length ? (page - 1) * PAGE_SIZE + 1 : 0;
  const endIndex = Math.min(page * PAGE_SIZE, totalElements);

  return (
    <div className="main-content">
      {/* Header */}
      <div className="row">
        <div className="colxl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="page-title-wrapper">
            <div className="page-title-box ad-title-box-use">
              <h4 className="page-title">📦 Quản lý kho hàng</h4>
            </div>
            <div className="ad-breadcrumb">
              <ul>
                <li>
                  <div className="ad-user-btn">
                    <input className="form-control" type="text" placeholder="Tìm kiếm sản phẩm..." />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="row">
        <div className="col-xl-12">
          <div className="card table-card">
            <div className="card-header pb-0">
              <h4>Danh sách sản phẩm</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-styled mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Ảnh</th>
                      <th>Tên sản phẩm</th>
                      <th>Giá</th>
                      <th>Thương hiệu</th>
                      <th>Loại</th>
                      <th>Giảm (%)</th>
                      <th>Trạng thái</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="9" className="text-center">Đang tải...</td>
                      </tr>
                    ) : items.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center">Không có sản phẩm</td>
                      </tr>
                    ) : (
                      items.map((p, idx) => (
                        <tr key={p.asin ?? p.productId ?? idx}>
                          <td>
                            <div className="checkbox">
                              <input id={`checkbox${(page - 1) * PAGE_SIZE + idx}`} type="checkbox" />
                              <label htmlFor={`checkbox${(page - 1) * PAGE_SIZE + idx}`}></label>
                            </div>
                          </td>
                          <td>
                            <img
                              src={
                                p.thumbnail
                                  ? `https://res.cloudinary.com/dj3tvavmp/image/upload/w_120,h_120/imgProduct/IMG/${p.thumbnail}`
                                  : "/placeholder.jpg"
                              }
                              alt={p.nameProduct}
                              width={60}
                              height={60}
                              style={{ objectFit: "cover" }}
                              loading="lazy"
                            />
                          </td>
                          <td>{p.nameProduct}</td>
                          <td>${p.price}</td>
                          <td>{p.nameBrand}</td>
                          <td>{p.selectedType}</td>
                          <td>{p.discountPercent}%</td>
                          <td>
                          {(() => {
  const st = (p.productStatus ?? "").toLowerCase();
  return (
    <label className={`mb-0 badge ${st === "active" ? "badge-success" : "badge-secondary"}`}>
      {toVNProductStatus(st)}
    </label>
  );
})()}
                          </td>
                          <td className="relative">
                            <a className="action-btn" href="#!" onClick={() => handleViewVariants(p.productId)}>
                              <i className="far fa-eye mr-2"></i>Xem tồn kho
                            </a>{" "}
                            |{" "}
                            <a className="action-btn" href="#!" onClick={() => handleToggleStatus(p.productId, p.productStatus)}>
                              <i className="fas fa-sync-alt mr-2"></i>Đổi trạng thái
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination (BE) */}
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div className="text-muted">
                  Hiển thị {startIndex}-{endIndex} / {totalElements}
                </div>
                <nav className="d-inline-block">
                  <ul className="pagination mb-0">
                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                      <a className="page-link" href="#!" onClick={() => setPage((p) => Math.max(1, p - 1))}>
                        <i className="fas fa-chevron-left"></i>
                      </a>
                    </li>
                    {pageNumbers.map((n) => (
                      <li key={n} className={`page-item ${n === page ? "active" : ""}`}>
                        <a className="page-link" href="#!" onClick={() => setPage(n)}>{n}</a>
                      </li>
                    ))}
                    <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                      <a className="page-link" href="#!" onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                        <i className="fas fa-chevron-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ad-footer-btm">
        <p>© 2025 Quản lý kho hàng</p>
      </div>
    </div>
  );
};

export default InventoryProduct;
