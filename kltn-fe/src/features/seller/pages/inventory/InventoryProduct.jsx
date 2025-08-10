import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10; // số item mỗi trang

const InventoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // 1-based cho dễ nhìn
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return navigate("/login");

    try {
      const res = await axios.get("http://localhost:8089/api/seller/products", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setProducts(res.data ?? []);
      setPage(1); // về trang 1 mỗi lần load mới
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ---- PHÂN TRANG FE ----
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const paged = products.slice(start, start + PAGE_SIZE);

  // nếu số lượng sp thay đổi khiến page > totalPages thì kéo về trang cuối
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  // hiển thị tối đa 5 nút trang xung quanh trang hiện tại
  const pageNumbers = useMemo(() => {
    const MAX = 5;
    let from = Math.max(1, page - Math.floor(MAX / 2));
    let to = Math.min(totalPages, from + MAX - 1);
    from = Math.max(1, to - MAX + 1);
    return Array.from({ length: to - from + 1 }, (_, i) => from + i);
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
      // Cập nhật cục bộ để đỡ fetch lại toàn bộ
      setProducts((prev) =>
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
                    {paged.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center">Không có sản phẩm</td>
                      </tr>
                    ) : (
                      paged.map((p, idx) => (
                        <tr key={p.asin ?? p.productId}>
                          <td>
                            <div className="checkbox">
                              <input id={`checkbox${start + idx}`} type="checkbox" />
                              <label htmlFor={`checkbox${start + idx}`}></label>
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
                            <label
                              className={`mb-0 badge ${p.productStatus === "active" ? "badge-success" : "badge-danger"}`}
                            >
                              {p.productStatus?.toUpperCase()}
                            </label>
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

              {/* Pagination thật (FE) */}
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div className="text-muted">
                  Hiển thị {paged.length ? start + 1 : 0}-{Math.min(start + PAGE_SIZE, products.length)} / {products.length}
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
