import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddProductVariant = () => {
  const { asin } = useParams();
  const navigate = useNavigate();

  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [productId, setProductId] = useState(null);

  const [formData, setFormData] = useState({
    sizeId: "",
    colorId: "",
    price: "",
    quantityInStock: ""
  });

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const res = await axios.get(`http://localhost:8083/api/products/${asin}/sizes`);
        setSizes(res.data);
      } catch (err) {
        console.error("❌ Lỗi khi lấy size:", err);
      }
    };

    const fetchColors = async () => {
      try {
        const res = await axios.get("http://localhost:8083/api/products/colors");
        setColors(res.data);
      } catch (err) {
        console.error("❌ Lỗi khi lấy màu:", err);
      }
    };

    const decodeJwt = (token) => {
      try {
        const payloadBase64 = token.split('.')[1];
        const payloadJson = atob(payloadBase64);
        return JSON.parse(payloadJson);
      } catch (error) {
        console.error("❌ Lỗi khi decode token:", error);
        return null;
      }
    };
    const fetchProductId = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
        const authId = decoded?.auth_id;
    
        if (!authId) {
          console.error("❌ Không tìm thấy authId trong token!");
          return;
        }
  
        const res = await axios.get(
          `http://localhost:8083/api/products/internal/productByAsin/${asin}?authId=${authId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
    
        setProductId(res.data.productId);
      } catch (err) {
        console.error("❌ Không lấy được productId từ asin:", err);
      }
    };
    

    fetchSizes();
    fetchColors();
    fetchProductId();
  }, [asin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!productId) {
      alert("❌ Chưa có productId. Vui lòng thử lại sau.");
      return;
    }
  
    try {
      const token = localStorage.getItem("accessToken"); // 🟢 Lấy token
  
      const payload = {
        productId,
        sizeId: parseInt(formData.sizeId),
        colorId: parseInt(formData.colorId),
        price: parseFloat(formData.price),
        quantityInStock: parseInt(formData.quantityInStock),
        quantitySold: 0,
        status: "IN_STOCK"
      };
  
      await axios.post(
        "http://localhost:8089/api/seller/variants",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}` // 🟢 Gửi token vào đây
          }
        }
      );
  
      alert("✅ Thêm biến thể thành công!");
      navigate(`/seller/inventory/product/${productId}/variants`);
    } catch (err) {
      console.error("❌ Lỗi khi thêm biến thể:", err);
      alert("❌ Không thể thêm biến thể.");
    }
  };
  

  return (
    <div className="main-content">
      <h4>➕ Thêm Biến Thể Mới Cho Sản Phẩm ASIN: <strong>{asin}</strong></h4>

      <form onSubmit={handleSubmit} className="mt-4" style={{ maxWidth: "500px" }}>
        <div className="form-group">
          <label>Size</label>
          <select
            className="form-control"
            name="sizeId"
            value={formData.sizeId}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn size --</option>
            {sizes.map(s => (
              <option key={s.sizeId} value={s.sizeId}>{s.sizeName}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Màu</label>
          <select
            className="form-control"
            name="colorId"
            value={formData.colorId}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn màu --</option>
            {colors.map(c => (
              <option key={c.colorId} value={c.colorId}>{c.nameColor}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Giá (VND)</label>
          <input
  type="number"
  className="form-control"
  name="price"
  min="0"
  step="0.01" // 🔥 Cho phép nhập 12.34, 99.99, v.v.
  value={formData.price}
  onChange={handleChange}
  required
/>
        </div>

        <div className="form-group">
          <label>Số lượng tồn kho</label>
          <input
            type="number"
            className="form-control"
            name="quantityInStock"
            min="0"
            value={formData.quantityInStock}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">💾 Lưu biến thể</button>
        <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={() => navigate(-1)}>↩ Quay lại</button>
      </form>
    </div>
  );
};

export default AddProductVariant;
