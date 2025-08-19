import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SellerCommentsDashboard = () => {
  const [products, setProducts] = useState([]);     // luôn giữ là mảng
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    // map EN -> VI cho trạng thái sản phẩm
const toVNProductStatus = (s) => {
  const v = (s || "").toLowerCase();
  if (v === "active") return "Đang bán";
  if (v === "inactive") return "Ngừng bán";
  return "—";
};

  const fetchProducts = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Vui lòng đăng nhập.");
      navigate("/seller/authentication/login");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8765/api/seller/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;
      // 🔧 Chuẩn hoá: nếu trả về Page => lấy content; nếu là list => giữ nguyên
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.content)
        ? data.content
        : [];

      setProducts(list);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        navigate("/seller/authentication/login");
      }
      setProducts([]); // đảm bảo luôn là mảng để không vỡ map
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewComments = (asin) => {
    navigate(`/seller/comments/product/${encodeURIComponent(asin)}`);
  };

  return (
    <div className="main-content">
      <div className="page-title-wrapper">
        <h4 className="page-title">🗨️ Quản lý bình luận sản phẩm</h4>
      </div>

      <div className="card table-card">
        <div className="card-header">
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
                  <th>ASIN</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center">Đang tải...</td>
                  </tr>
                ) : (products ?? []).length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">Không có sản phẩm</td>
                  </tr>
                ) : (
                  (products ?? []).map((p, idx) => (
                    <tr key={p.asin ?? idx}>
                      <td>
                        <div className="checkbox">
                          <input id={`check${idx}`} type="checkbox" />
                          <label htmlFor={`check${idx}`}></label>
                        </div>
                      </td>
                      <td>
                        <img
                          src={
                            p.thumbnail
                              ? `https://res.cloudinary.com/dj3tvavmp/image/upload/w_60,h_60/imgProduct/IMG/${p.thumbnail}`
                              : "/placeholder.jpg"
                          }
                          alt={p.nameProduct ?? "product"}
                          style={{ width: 60, height: 60, objectFit: "cover" }}
                          loading="lazy"
                        />
                      </td>
                      <td>{p.nameProduct}</td>
                      <td>{p.asin}</td>
                      <td>
                      {(() => {
  const st = (p.productStatus ?? "").toLowerCase();
  return (
    <span className={`badge ${st === "active" ? "badge-success" : "badge-secondary"}`}>
      {toVNProductStatus(st)}
    </span>
  );
})()}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleViewComments(p.asin)}
                        >
                          Xem bình luận
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="ad-footer-btm">
        <p>© 2025 Quản lý bình luận</p>
      </div>
    </div>
  );
};

export default SellerCommentsDashboard;
