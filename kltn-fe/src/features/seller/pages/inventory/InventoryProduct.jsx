import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const InventoryProduct = () => {
  const [products, setProducts] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const decoded = jwtDecode(accessToken);
      const authId = decoded.auth_id; // ✅ lấy authId từ token
  
      const res = await axios.get("http://localhost:8089/api/seller/products", {
        params: { authId }, // gửi authId lên
      });
  
      setProducts(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (asin) => {
    try {
      await axios.delete(`http://localhost:8089/api/seller/products/${asin}`);
      fetchProducts();
    } catch (err) {
      console.error("❌ Không thể xoá sản phẩm", err);
    }
  };

  const handleToggleStatus = async (productId, currentStatus) => {
    const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    try {
      await axios.patch(
        `http://localhost:8089/api/seller/products/${productId}/status`,
        null,
        {
          params: { status: newStatus }
        }
      );
      fetchProducts();
    } catch (err) {
      console.error("❌ Không thể cập nhật trạng thái", err);
    }
  };

  const handleViewVariants = (productId) => {
	navigate(`/seller/inventory/product/${productId}/variants`);
  };

  return (
    <div className="main-content">
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

      {/* Table Start */}
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="card table-card">
            <div className="card-header pb-0">
              <h4>Danh sách sản phẩm</h4>
            </div>
            <div className="card-body">
              <div className="chart-holder">
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
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="text-center">Không có sản phẩm</td>
                        </tr>
                      ) : (
                        products.map((p, index) => (
                          <tr key={p.asin}>
                            <td>
                              <div className="checkbox">
                                <input id={`checkbox${index}`} type="checkbox" />
                                <label htmlFor={`checkbox${index}`}></label>
                              </div>
                            </td>
                            <td>
                              <img
                                src={p.thumbnail}
                                alt={p.nameProduct}
                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                              />
                            </td>
                            <td>{p.nameProduct}</td>
                            <td>${p.price}</td>
                            <td>{p.nameBrand}</td>
                            <td>{p.selectedType}</td>
                            <td>{p.discountPercent}%</td>
                            <td>
                              <label
                                className={`mb-0 badge ${
                                  p.productStatus === "ACTIVE" ? "badge-success" : "badge-danger"
                                }`}
                              >
                                {p.productStatus}
                              </label>
                            </td>
                            <td className="relative">
                              <a className="action-btn" href="javascript:void(0);">
                                <svg className="default-size" viewBox="0 0 341.333 341.333">
                                  <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667..." />
                                  <path d="M170.667,128C147.093,128,128,147.093..." />
                                  <path d="M170.667,256C147.093,256,128,275.093..." />
                                </svg>
                              </a>
                              <div className="action-option">
                                <ul>
                                  <li>
								  <a href="javascript:void(0);" onClick={() => handleViewVariants(p.productId)}>
  <i className="far fa-eye mr-2"></i>Xem tồn kho
</a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0);" onClick={() => handleToggleStatus(p.productId, p.productStatus)}>
                                      <i className="fas fa-sync-alt mr-2"></i>Đổi trạng thái
                                    </a>
                                  </li>
                                  <li>
                                    <a href="javascript:void(0);" onClick={() => handleDeleteProduct(p.asin)}>
                                      <i className="far fa-trash-alt mr-2"></i>Xoá
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination (mẫu cứng) */}
              <div className="text-right mt-3">
                <nav className="d-inline-block">
                  <ul className="pagination mb-0">
                    <li className="page-item disabled"><a className="page-link" href="#"><i className="fas fa-chevron-left"></i></a></li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#"><i className="fas fa-chevron-right"></i></a></li>
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
