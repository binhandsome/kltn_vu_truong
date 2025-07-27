import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; // Ensure react-router-dom is installed

const AddProduct = () => {

  const [message, setMessage] = useState('');
  const API_URL = 'http://localhost:8089/api/seller';
  const API_URL_PRODUCT = 'http://localhost:8083/api/products';
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [categories, setCategories] = useState(['']);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [types, setTypes] = useState([]);
  const [genders, setGenders] = useState([]);
  const [category, setCategory] = useState(['']);
  const [nameProduct, setNameProduct] = useState('');
  const [price, setPrice] = useState();
  const [nameBrand, setNameBrand] = useState('');
  const [discountPercent, setDiscountPercent] = useState();
  const [description, setDescription] = useState('');
  const [productStatus, setProductStatus] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const asin = searchParams.get('asin');
  const [productByAsin, setProductByAsin] = useState([]);
  	
  const handleChange = (value, index) => {
    const updated = [...category];
    updated[index] = value;
    setCategory(updated);
  };

  const handleAddInput = () => {
    setCategory([...category, '']);
  };
  const handleSubmit = () => {
    const formatted = category.map(item =>
      item.split('>').map(str => str.trim())
    );
    console.log('✅ Categories JSON:', formatted);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get(`${API_URL_PRODUCT}/getAllColorStatus1`);
        const colors = response.data.map(color => color.nameColor);
        setAvailableColors(colors);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách màu:', error);
      }
    };

    fetchColors();
  }, []);

  useEffect(() => {
    const fetchMoreProductInfo = async () => {
      try {
        const res = await axios.get(`${API_URL_PRODUCT}/findMoreProductInfoById`);
        const data = res.data;

        setCategories(JSON.parse(data.category));
        setTypes(JSON.parse(data.type));
        setGenders(JSON.parse(data.gender));
      } catch (error) {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      }
    };

    fetchMoreProductInfo();
  }, []);

 
  const handleSubmitAddProduct = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
      // ✅ Chuẩn hoá category thành List<List<String>>
  const cleanedCategoryList = category.map((item) => {
    if (Array.isArray(item)) {
      return item;
    } else if (typeof item === 'string') {
      return item.split(',').map((str) => str.trim());
    }
    return [];
  });
    const data = {
      accessToken: accessToken,
      nameProduct,
      nameBrand,
      price,
      productStatus,
      selectedCategory,
      selectedType,
      selectedGender,
      discountPercent,
      selectedColors,
      categoryList: cleanedCategoryList,
      description,
    };
    console.log('📤 Dữ liệu gửi lên server:');
    console.log(JSON.stringify(data, null, 2));
    try {
      const res = await axios.post(`${API_URL_PRODUCT}/addProduct`, data);
      console.log('✅ Server phản hồi:', res.data.body.message);
      setMessage(res.data.body.message);

      // ✅ Reset form về rỗng
      setNameProduct('');
      setNameBrand('');
      setPrice('');
      setProductStatus('');
      setSelectedCategory('');
      setSelectedType('');
      setSelectedGender('');
      setDiscountPercent('');
      setSelectedColors([]);        // mảng
      setCategory(['']);              // mảng categoryList
      setDescription('');
    } catch (err) {
      console.error('❌ Lỗi khi gửi lên server:', err);
      setMessage(err.response?.data || '❌ Có lỗi xảy ra.');
    }
  };

  return (
    <>

      <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12" style={{ margin: 'auto', marginTop: '80px' }}>


        <div className="ad-auth-content">
          <form onSubmit={handleSubmitAddProduct} style={{ maxWidth: '100%', width: '100%' }}>

            <h2>
              <span className="primary">Xin chào,</span> Chào mừng bạn tới trang thêm sản phẩm!
            </h2>
            <p>Nhập thông tin sản phẩm</p>
            <div className="ad-auth-form">
              {/* Tên Shop */}
              <div className="ad-auth-feilds mb-30">
                <input
                  type="text"
                  placeholder="Tên Sản Phẩm"
                  className="ad-input"
                  value={nameProduct}
                  onChange={(e) => setNameProduct(e.target.value)}
                  required
                />
                <div className="ad-auth-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16px"
                    height="16px"
                    fill="#9abeed"
                  >
                    <path d="M20.59 13.41l-8-8A2 2 0 0011.17 5H4a1 1 0 00-1 1v7.17a2 2 0 00.59 1.42l8 8a2 2 0 002.83 0l6.17-6.17a2 2 0 000-2.83zM7.5 10A1.5 1.5 0 119 11.5 1.5 1.5 0 017.5 10z" />
                  </svg>
                </div>
              </div>

              <div className="ad-auth-feilds mb-30">
                <input
                  type="number"
                  placeholder="Giá"
                  className="ad-input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
                <div className="ad-auth-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16px"
                    height="16px"
                    fill="#9abeed"
                  >
                    <path d="M20 6H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.1-.89-2-2-2zm0 10H4V8h16v8zm-2-3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
                  </svg>
                </div>
              </div>

              <div className="ad-auth-feilds mb-30">
                <input
                  type="text"
                  placeholder="Tên Hãng"
                  className="ad-input"
                  value={nameBrand}
                  onChange={(e) => setNameBrand(e.target.value)}
                  required
                />
                <div className="ad-auth-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16px"
                    height="16px"
                    fill="#9abeed"
                  >
                    <path d="M3 13h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM3 17h2v-2H3v2zm4 0h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM3 21h18v-2H3v2zM11 5V3H7v2H3v2h18V5h-4V3h-4v2h-2z" />
                  </svg>
                </div>
              </div>
              <div className="ad-auth-feilds mb-30" style={{ position: 'relative' }}>
                <select
                  className="ad-input"
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    paddingRight: '36px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    color: '#333',
                    backgroundColor: '#fff',
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
                    width: '100%',
                    cursor: 'pointer',
                  }}
                  value={productStatus}
                  onChange={(e) => setProductStatus(e.target.value)}
                >
                  <option value="">Trạng Thái</option>
                  <option value="active">Hoạt Động</option>
                  <option value="discontinued">Ngưng Sản Xuất</option>
                  <option value="inactive">Ngưng Hoạt Động</option>
                </select>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  right: '12px',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }}>
                  {/* ▼ icon mũi tên dropdown */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#9abeed"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </div>
              </div>
              {/* Select: Danh Mục */}
              <div className="ad-auth-feilds mb-30" style={{ position: 'relative' }}>
                <select
                  className="ad-input"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={selectStyle}
                >
                  <option value="">Danh Mục</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.nameCategory}>
                      {cat.nameCategory}
                    </option>
                  ))}
                </select>
                {dropdownIcon}
              </div>

              {/* Select: Loại */}
              <div className="ad-auth-feilds mb-30" style={{ position: 'relative' }}>
                <select
                  className="ad-input"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={selectStyle}
                >
                  <option value="">Loại</option>
                  {types.map((type) => (
                    <option key={type.id} value={type.nameType}>
                      {type.nameType}
                    </option>
                  ))}
                </select>
                {dropdownIcon}
              </div>

              {/* Select: Giới Tính */}
              <div className="ad-auth-feilds mb-30" style={{ position: 'relative' }}>
                <select
                  className="ad-input"
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  style={selectStyle}
                >
                  <option value="">Giới Tính</option>
                  {genders.map((gender) => (
                    <option key={gender.id} value={gender.nameGender}>
                      {gender.nameGender}
                    </option>
                  ))}
                </select>
                {dropdownIcon}
              </div>
              <div className="ad-auth-feilds mb-30">
                <input
                  type="number"
                  placeholder="Phần Trăm Giảm Giá"
                  className="ad-input"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  required
                />
                <div className="ad-auth-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16px"
                    height="16px"
                    fill="#9abeed"
                  >
                    <path d="M17.94 6.06a1.5 1.5 0 10-2.12-2.12L6.06 13.81a1.5 1.5 0 102.12 2.12l9.76-9.87zM7 7a2 2 0 11-4 0 2 2 0 014 0zm14 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '16px' }}>
                  Chọn màu sắc:
                </label>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      fontSize: '14px',
                      borderRadius: '6px',
                      border: '1px solid #ccc',
                      flex: 1
                    }}
                  >
                    <option value="">-- Chọn màu --</option>
                    {availableColors.map((color, index) => (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      if (selectedColor && !selectedColors.includes(selectedColor)) {
                        setSelectedColors([...selectedColors, selectedColor]);
                        setSelectedColor('');
                      }
                    }}
                    style={{
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      padding: '8px 12px',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    ➕
                  </button>
                </div>

                {/* Hiển thị danh sách màu đã chọn */}
                <div style={{ marginTop: '16px' }}>
                  {selectedColors.length === 0 ? (
                    <p style={{ color: '#999' }}>Chưa chọn màu nào</p>
                  ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {selectedColors.map((color, index) => (
                        <span
                          key={index}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            backgroundColor: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            borderRadius: '20px',
                            padding: '6px 12px',
                            fontSize: '14px',
                            color: '#111'
                          }}
                        >
                          {color}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = selectedColors.filter((c) => c !== color);
                              setSelectedColors(updated);
                            }}
                            style={{
                              marginLeft: '8px',
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#ef4444',
                              fontWeight: 'bold',
                              cursor: 'pointer'
                            }}
                          >
                            ❌
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ padding: '12px', background: '#f9f9f9', borderRadius: '8px' }}>
                  <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block', fontSize: '16px' }}>
                    Danh mục sản phẩm:
                  </label>

                  {category.map((cat, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                      }}
                    >
                      <input
                        type="text"
                        value={cat}
                        onChange={(e) => handleChange(e.target.value, index)}
                        placeholder='Ví dụ: Clothing,Shoes & Jewelry,Girls,Shoes,Sneakers'
                        style={{
                          flex: 1,
                          padding: '10px 12px',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                          fontSize: '14px',
                        }}
                      />
                      {index === category.length - 1 && (
                        <button
                          type="button"
                          onClick={handleAddInput}
                          style={{
                            marginLeft: '8px',
                            background: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            fontSize: '18px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          ➕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="ad-auth-feilds mb-30">
                <textarea
                  placeholder="Chi tiết sản phẩm"
                  className="ad-input"
                  rows={6}
                  required
                  style={{
                    width: '100%',
                    resize: 'vertical',
                    fontSize: '14px',
                    padding: '10px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="ad-auth-btn">
              <button type="submit" className="ad-btn ad-login-member">
                Thêm Sản Phẩm
              </button>
            </div>
            {message && <p className="ad-register-text">{message}</p>}

          </form>
        </div>
      </div>

      <div className="ad-notifications ad-error">
        <p>
          <span>Hừ!</span>Đã xảy ra lỗi
        </p>
      </div>
    </>

  );
};
const selectStyle = {
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  paddingRight: '36px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '14px',
  color: '#333',
  backgroundColor: '#fff',
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
  width: '100%',
  cursor: 'pointer',
};

// Dropdown icon (mũi tên)
const dropdownIcon = (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      right: '12px',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9abeed" viewBox="0 0 24 24">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  </div>
);
export default AddProduct;