import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ITEMS_PER_PAGE = 10;

const ProductVariantPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchVariants = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        `http://localhost:8089/api/seller/variants/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const sorted = res.data.sort((a, b) => a.variantId - b.variantId);
      setVariants(sorted);
    } catch (err) {
      console.error("❌ Lỗi khi lấy biến thể:", err);
      alert("Không thể lấy dữ liệu biến thể. Vui lòng đăng nhập lại.");
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/seller/authentication/login"); // hoặc route tới trang seller login
      }
    }
  };

  const fetchColors = async () => {
    try {
      const res = await axios.get("http://localhost:8083/api/products/colors");
      setColors(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy danh sách màu:", err);
    }
  };

  useEffect(() => {
    fetchVariants();
    fetchColors();
  }, [productId]);

  const handleSave = async (variant) => {
    const { variantId, newPrice, newQuantity } = variant;
    const token = localStorage.getItem("accessToken");
  
    try {
      if (!isNaN(newPrice) && newPrice > 0) {
        await axios.put(
          `http://localhost:8089/api/seller/variants/${variantId}`,
          null,
          {
            params: { price: newPrice, quantity: newQuantity || 0 },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (!isNaN(newQuantity) && newQuantity > 0) {
        await axios.put(
          `http://localhost:8089/api/seller/variants/${variantId}`,
          null,
          {
            params: { quantity: newQuantity },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        alert("⚠️ Giá hoặc số lượng không hợp lệ!");
        return;
      }
  
      alert("✅ Lưu thành công!");
      fetchVariants();
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật biến thể:", err);
      alert("❌ Lưu thất bại!");
    }
  };

  const handleDeleteVariant = async (variantId) => {
    if (!window.confirm("Bạn có chắc muốn xoá biến thể này không?")) return;
  
    try {
      await axios.delete(`http://localhost:8089/api/seller/variants/${variantId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      alert("✅ Đã xoá biến thể");
      fetchVariants();
    } catch (err) {
      console.error("❌ Lỗi xoá biến thể:", err);
      alert("❌ Không thể xoá biến thể");
    }
  };
  

  const getColorLabel = (colorId) => {
    const color = colors.find((c) => c.colorId === colorId);
    if (!color) return colorId;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            backgroundColor: color.codeColor,
            border: "1px solid #ccc"
          }}
        ></div>
        <span>{color.nameColor}</span>
      </div>
    );
  };

  const totalPages = Math.ceil(variants.length / ITEMS_PER_PAGE);
  const displayedVariants = variants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="main-content">
      <div className="mb-3 text-right">
      <button
  className="btn btn-success"
  onClick={() => {
    const asin = variants.length > 0 ? variants[0].asin : null;
    if (asin) {
      navigate(`/seller/inventory/product/${asin}/variants/add`);
    } else {
      alert("Không tìm thấy asin để thêm biến thể!");
    }
  }}
>
  ➕ Thêm biến thể
</button>
      </div>

      <h4>🔍 Chi tiết tồn kho cho sản phẩm ID: {productId}</h4>

      {variants.length === 0 ? (
        <p>Không có biến thể nào.</p>
      ) : (
        <>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Size</th>
                <th>Màu</th>
                <th>Giá</th>
                <th>Kho</th>
                <th>Đã bán</th>
                <th>Nhập thêm</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
            {displayedVariants.map((v, index) => (
  <tr key={v.variantId}>
    <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                  <td>{v.sizeId}</td>
                  <td>{getColorLabel(v.colorId)}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={v.newPrice ?? v.price}
                      onChange={(e) => {
                        const newVariants = [...variants];
                        const idx = newVariants.findIndex(item => item.variantId === v.variantId);
                        newVariants[idx].newPrice = parseFloat(e.target.value);
                        setVariants(newVariants);
                      }}
                      className="form-control"
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>{v.quantityInStock}</td>
                  <td>{v.quantitySold}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={v.newQuantity ?? ""}
                      onChange={(e) => {
                        const newVariants = [...variants];
                        const idx = newVariants.findIndex(item => item.variantId === v.variantId);
                        newVariants[idx].newQuantity = parseInt(e.target.value);
                        setVariants(newVariants);
                      }}
                      className="form-control"
                      style={{ width: "80px" }}
                    />
                  </td>
                  <td>
                    <span className={`badge ${v.status === "IN_STOCK" ? "badge-success" : "badge-danger"}`}>
                      {v.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary mb-1"
                      onClick={() => handleSave(v)}
                    >
                      💾 Lưu
                    </button>
                    <br />
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteVariant(v.variantId)}
                    >
                      🗑️ Xoá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right mt-3">
            <nav className="d-inline-block">
              <ul className="pagination mb-0">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductVariantPage;
