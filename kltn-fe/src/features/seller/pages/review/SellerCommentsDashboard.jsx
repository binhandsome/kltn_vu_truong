import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SellerCommentsDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Vui lòng đăng nhập.");
      return navigate("/seller/authentication/login");
    }

    try {
      const res = await axios.get("http://localhost:8089/api/seller/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy sản phẩm:", err);
     
    }
  };

  useEffect(() => {
    fetchProducts();
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
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Không có sản phẩm
                    </td>
                  </tr>
                ) : (
                  products.map((p, idx) => (
                    <tr key={p.asin}>
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
                          alt={p.nameProduct}
                          style={{ width: 60, height: 60, objectFit: "cover" }}
                        />
                      </td>
                      <td>{p.nameProduct}</td>
                      <td>{p.asin}</td>
                      <td>
                        <span
                          className={`badge ${
                            p.productStatus === "active"
                              ? "badge-success"
                              : "badge-danger"
                          }`}
                        >
                          {p.productStatus?.toUpperCase()}
                        </span>
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
