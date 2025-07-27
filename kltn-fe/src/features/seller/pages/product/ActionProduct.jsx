import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; // Ensure react-router-dom is installed
import { useParams } from 'react-router-dom';

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
  const [sizes, setSizes] = useState(['']); // khởi tạo với 1 input trống
  const [colors, setColors] = useState([
    { color_id: '43', name_color: 'Lawn Green', code_color: '#7CFC00', status: '0' },
    { color_id: '19', name_color: 'Indigo', code_color: '#4B0082', status: '0' },
    { color_id: '5',  name_color: 'Blue', code_color: '#0000FF', status: '0' },
    { color_id: '27', name_color: 'Chartreuse', code_color: '#7FFF00', status: '0' }
  ]);
  
  const [allImageWithColor, setAllImageWithColor] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [productByAsin, setProductByAsin] = useState([]);
  const { asin } = useParams();
const handleDeleteSize = async (sizeId) => {
  if (!window.confirm("Bạn có chắc muốn xóa size này?")) return;

  try {
    await axios.delete(`http://localhost:8083/api/products/deleteSize`, {
      params: { sizeId }
    });

    setMessage('✅ Xóa size thành công');
    getProductByAsin(); // load lại size mới
  } catch (error) {
    console.error("❌ Lỗi xóa size:", error);
    alert("❌ Xóa size thất bại.");
  }
};
const handleEditImage = async (img) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/jpeg,image/png'; // Chỉ cho phép JPEG và PNG

    fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            alert('❌ Không có tệp được chọn');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('❌ Kích thước tệp vượt quá 5MB');
            return;
        }
        if (!file.type.match('image/(jpeg|png)')) {
            alert('❌ Vui lòng chọn tệp JPEG hoặc PNG');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.put(`${API_URL_PRODUCT}/update-image/${img.image_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data); // "Đang xử lý upload ảnh..."
        } catch (error) {
            console.error('❌ Lỗi khi cập nhật ảnh:', error.response?.data || error.message);
            alert('❌ Cập nhật ảnh thất bại: ' + (error.response?.data || error.message));
        }
    };

    fileInput.click();
};
const handleSubmitSizes = async () => {
  const asin = productByAsin?.asin; // hoặc lấy từ router param nếu có

  const validSizes = sizes.filter(size => size.trim() !== "");

  if (!asin || validSizes.length === 0) {
    alert("❌ Vui lòng nhập size hợp lệ.");
    return;
  }

  try {
    const response = await axios.post(
      `http://localhost:8083/api/products/addSize`,
      {
        asin: asin,
        sizes: validSizes
      },
      {
      }
    );

    setSizes([""]); // Reset lại sau khi gửi
    getProductByAsin(); // Gọi lại để load size mới (nếu bạn có hàm này)
    setMessage('✅ Thêm size thành công.');
  } catch (error) {
    console.error("❌ Lỗi thêm size:", error);
    alert("❌ Gửi size thất bại.");
  }
};
const handleDeleteImage = async (imageId) => {
  const confirmed = window.confirm("❗Bạn có chắc muốn xoá ảnh này?");
  if (!confirmed) return;

  try {
    const response = await axios.delete(`${API_URL_PRODUCT}/deleteImage/${imageId}`);
    alert(response.data); // hoặc dùng toast
    getProductByAsin();
  } catch (error) {
    console.error("❌ Lỗi khi xoá ảnh:", error);
    alert(error.response?.data || "❌ Lỗi không xác định.");
  }
};

const handleSetThumbnail = async (asin, imageId) => {
  try {
    await axios.put(`http://localhost:8083/api/products/set-thumbnail`, null, {
      params: { asin, imageId },
    });
getProductByAsin();
  } catch (error) {
    console.error("❌ Lỗi khi cập nhật thumbnail:", error);
    alert("❌ Cập nhật thumbnail thất bại.");
  }
};
const hasAlerted = useRef(false);

useEffect(() => {
  if (
    productByAsin &&
    productByAsin.productStatus === 'deleted' &&
    !hasAlerted.current
  ) {
    alert('❌ Sản phẩm này đã bị xoá. Không thể chỉnh sửa.');
    hasAlerted.current = true;
    navigate('/seller/product/allProduct');
  }
}, [productByAsin]);
  // Xử lý khi người dùng chọn ảnh
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnailFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file)); // Tạo URL preview
    } else {
      setPreviewUrl(null);
    }
  };
  const handleRemoveThumbnail = () => {
    setThumbnailFile(null);
    setPreviewUrl(null);
  };
  const handleDeleteProduct = async (asin) => {
  const confirmDelete = window.confirm("⚠️ Bạn có chắc chắn muốn xoá sản phẩm này?");
  if (!confirmDelete) return;

  try {
    const accessToken = localStorage.getItem('accessToken');
    await axios.put(`http://localhost:8083/api/products/deleteProduct/${asin}`, {}, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    alert("✅ Đã xoá sản phẩm thành công");
    // Có thể reload danh sách hoặc gọi lại useEffect để cập nhật
  } catch (err) {
    alert("❌ Lỗi khi xoá sản phẩm");
  }
};


useEffect(() => {
    console.log('thumbnail file'  , thumbnailFile);
}, [thumbnailFile]);
  const [colorImages, setColorImages] = useState({});

useEffect(() => {
  console.log('🖼️ image cua bo m la:', colorImages);
}, [colorImages]);

  // Thêm input ảnh cho một màu
  const handleAddImageInput = (colorId) => {
    setColorImages((prev) => ({
      ...prev,
      [colorId]: [...(prev[colorId] || []), null]
    }));
  };

  // Cập nhật file đã chọn
  const handleImageChange = (colorId, index, file) => {
    const updatedList = [...(colorImages[colorId] || [])];
    updatedList[index] = file;
    setColorImages((prev) => ({
      ...prev,
      [colorId]: updatedList
    }));
  };
    const handleRemoveImageInput = (colorId, index) => {
    const updatedList = [...(colorImages[colorId] || [])];
    updatedList.splice(index, 1); // Xoá phần tử tại vị trí index
    setColorImages((prev) => ({
      ...prev,
      [colorId]: updatedList
    }));
  };

const handleSizeChange = (value, index) => {
  const newSizes = [...sizes];
  newSizes[index] = value;
  setSizes(newSizes);
};

const handleAddSizeInput = () => {
  setSizes([...sizes, '']);
};
const handleSubmitUploadImages = async () => {
  if (!productByAsin?.asin) {
    alert("❌ Không tìm thấy ASIN sản phẩm.");
    return;
  }

  const formData = new FormData();
  formData.append("asin", productByAsin.asin);

  Object.entries(colorImages).forEach(([colorId, fileList]) => {
    fileList.forEach((file) => {
      if (file) {
        formData.append("files", file);
        formData.append("colorIds", colorId); // ⚠️ đảm bảo cùng index với files
      }
    });
  });

  try {
    await axios.post("http://localhost:8083/api/products/upload-images", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    alert("✅ Upload ảnh thành công!");
    // Optional: load lại product để hiển thị ảnh
  } catch (error) {
    console.error("❌ Upload lỗi:", error);
    alert("❌ Upload ảnh thất bại!");
  }
};

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
    categoryList: category,
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
const getProductByAsin = async () => {
  try {
    const response = await axios.get(`http://localhost:8083/api/products/productByAsin/${asin}`);
    const product = response.data;

    setProductByAsin(product);

    if (product.selectedColors) {
      setColors(product.selectedColors);
    } else {
      setColors([]);
    }
    if(product.listColorAndThumbnail) {
      setAllImageWithColor(product.listColorAndThumbnail);
    }else{
      setAllImageWithColor([]);
    }

  } catch (error) {
    console.log("❌ Error getting product:", error);
    setColors([]);
  }
};
useEffect(() => {
  if (productByAsin) {
    setNameProduct(productByAsin.nameProduct || '');
    setPrice(productByAsin.price || 0);
    setNameBrand(productByAsin.nameBrand || '');
    setProductStatus(productByAsin.productStatus || '');
    setSelectedCategory(productByAsin.selectedCategory || '');
    setSelectedType(productByAsin.selectedType || '');
    setSelectedGender(productByAsin.selectedGender || '');
    setDiscountPercent(productByAsin.discountPercent || 0);
    setSelectedColors(
      productByAsin.selectedColors?.map((c) => c.name_color) || []
    );
setCategory(productByAsin.categoryList || []);
    setDescription(productByAsin.description || '');
  }
}, [productByAsin]);
useEffect(() => {
  console.log('📸 Danh sách ảnh theo màu:', allImageWithColor);
}, [allImageWithColor]); // thêm dependency

 useEffect(() => {

  getProductByAsin(); // ← sửa lại tên hàm đúng ở đây
}, [asin]);
useEffect(() => {
  console.log('select product with asin', productByAsin);
}, [productByAsin]); // 👈 Đảm bảo chỉ log khi productByAsin thay đổi
const handleSubmitEditProduct = async (e) => {
  e.preventDefault();

  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    setMessage('❌ Vui lòng đăng nhập');
    return;
  }

  // ✅ Chuẩn hoá category thành List<List<String>>
  const cleanedCategoryList = category.map((item) => {
    if (Array.isArray(item)) {
      return item;
    } else if (typeof item === 'string') {
      return item.split(',').map((str) => str.trim());
    }
    return [];
  });

  try {
    const payload = {
      asin: productByAsin.asin,
      accessToken: accessToken,
      nameProduct,
      nameBrand,
      price,
      productStatus,
      selectedCategory,
      selectedType,
      selectedGender,
      discountPercent,
      selectedColors: selectedColors, // ["Red", "Blue", ...]
      categoryList: cleanedCategoryList, // ✅ đã được xử lý đúng định dạng
      description
    };

    const response = await axios.put(
      `http://localhost:8083/api/products/updateProduct`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setMessage(response.data.message || '✅ Cập nhật thành công');
  } catch (err) {
    console.error('❌ Lỗi cập nhật:', err);
    setMessage(err.response?.data?.message || '❌ Lỗi khi cập nhật sản phẩm');
  }
};


  return (
    <>
      <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12" style={{ margin: 'auto', marginTop: '80px' }}>
        <div className="ad-auth-content">
                <h2>
              <span className="primary">Thêm Size</span> 
            </h2>
            <p>Nhập thông tin size</p>
            <div style={{ padding: '12px', background: '#f9f9f9', borderRadius: '8px' }}>
       <div style={{ marginBottom: '20px' }}>
  <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
    Size đã có:
  </label>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
    {productByAsin?.size?.map((item, index) => (
      <div
        key={index}
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '14px',
        }}
      >
        <span style={{ marginRight: '6px' }}>{item.sizeName}</span>
        <button

          type="button"
                    onClick={() => handleDeleteSize(item.sizeId)}

          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '14px',
            cursor: 'pointer',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#dc3545';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
          }}
        >
          ✖
        </button>
      </div>
    ))}
  </div>
</div>
  <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block', fontSize: '16px' }}>
    Nhập các size sản phẩm:
  </label>
  {sizes.map((size, index) => (
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
        value={size}
        onChange={(e) => handleSizeChange(e.target.value, index)}
        placeholder='Ví dụ: S, M, L, XL'
        style={{
          flex: 1,
          padding: '10px 12px',
          border: '1px solid #ccc',
          borderRadius: '6px',
          fontSize: '14px',
        }}
      />
      {index === sizes.length - 1 && (
        <button
          type="button"
          onClick={handleAddSizeInput}
          style={{
            marginLeft: '8px',
            background: '#28a745',
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
 <button
   onClick={handleSubmitSizes} // <- gọi hàm vừa viết

  type="button"
  style={{
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }}
  onMouseEnter={(e) => {
    e.target.style.background = '#0056b3';
  }}
  onMouseLeave={(e) => {
    e.target.style.background = '#007bff';
  }}
  onMouseDown={(e) => {
    e.target.style.transform = 'scale(0.95)';
  }}
  onMouseUp={(e) => {
    e.target.style.transform = 'scale(1)';
  }}
>
  ➕ Thêm size
</button>
</div>
{message}

<div style={{ padding: '20px' }}>
  <h2>📸 Upload ảnh theo màu</h2>
     <span style={{ fontSize: '15px', color: '#555', maxWidth: '100px' }}>
    ✅ ĐANG LÀ THUMBNAIL 
    ⚪ CHỌN VÀO ĐỂ LÀM THUMBNAIL
  </span>
  {colors.map((color) => {
    const matchedColor = allImageWithColor.find(
      (imgGroup) => Number(imgGroup.idColor) === Number(color.color_id)
    );
    const images = matchedColor?.listImageByColor || [];
    const inputs = colorImages[color.color_id] || [];

    return (
      <div
        key={color.color_id}
        style={{
          border: '1px solid #ccc',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          background: '#f9f9f9'
        }}
      >
        <h4 style={{ marginBottom: '10px' }}>
          🎨 Màu: <span style={{ color: color.code_color }}>{color.name_color}</span>
        </h4>

   {/* ✅ Hiển thị ảnh đã upload */}

<div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
  
  {images.map((img, index) => (
    <div key={index} style={{ position: 'relative' }}>
 <img
  src={
    img.imageUrl.startsWith('http')
      ? img.imageUrl
      : img.imageUrl.endsWith('.jpg')
        ? `https://res.cloudinary.com/dj3tvavmp/image/upload/w_300,h_300/imgProduct/IMG/${img.imageUrl}`
        : `/uploads/${img.imageUrl}`
  }
  alt=""
  style={{
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '6px',
    border: Number(img.isMainImage) === 1 ? '3px solid #28a745' : '1px solid #ccc'
  }}
/>

{Number(img.isMainImage) === 1 && (
  <span
    style={{
      position: 'absolute',
      bottom: '5px',
      left: '5px',
      background: '#28a745',
      color: 'white',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold'
    }}
  >
  </span>
)}

<button
  title="Chọn làm thumbnail"
    onClick={() => handleSetThumbnail(asin, img.image_id)}
  style={{
    position: 'absolute',
    bottom: '5px',
    left: '5px',
    background: 'white',
    border: `2px solid ${img.isMainImage ? '#28a745' : '#ccc'}`,
    color: img.isMainImage ? 'green' : '#aaa',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 0 3px rgba(0,0,0,0.2)'
  }}
  onMouseEnter={(e) => {
    e.target.style.background = '#ffda44';
    e.target.style.boxShadow = '0 0 6px rgba(0,0,0,0.3)';
  }}
  onMouseLeave={(e) => {
    e.target.style.background = '#ffc107';
    e.target.style.boxShadow = 'none';
  }}
>
  {img.isMainImage === 1 ? '✅' : '⚪'}
</button>


<button
  onClick={() => handleEditImage(img)}
  style={{
    position: 'absolute',
    top: '5px',
    left: '5px',
    background: '#ffc107',
    border: 'none',
    borderRadius: '50%',
    padding: '2px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }}
  onMouseEnter={(e) => {
    e.target.style.background = '#ffda44';
    e.target.style.boxShadow = '0 0 6px rgba(0,0,0,0.3)';
  }}
  onMouseLeave={(e) => {
    e.target.style.background = '#ffc107';
    e.target.style.boxShadow = 'none';
  }}
>
  ✏️
</button>

      {/* ❌ Xóa ảnh */}
   <button
  onClick={() => handleDeleteImage(img.image_id)}
  style={{
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: '#dc3545',
    border: 'none',
    borderRadius: '100%',
    padding: '2px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = '#c82333';
    e.currentTarget.style.boxShadow = '0 0 6px rgba(0,0,0,0.3)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = '#dc3545';
    e.currentTarget.style.boxShadow = 'none';
  }}
>
  ❌
</button>


    </div>
  ))}
</div>


        {/* ✅ Upload ảnh mới */}
        {inputs.map((_, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(color.color_id, index, e.target.files[0])}
            />
            <button
              type="button"
              onClick={() => handleRemoveImageInput(color.color_id, index)}
              style={{
                marginLeft: '10px',
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✖
            </button>
          </div>
        ))}

        {/* ✅ Nút thêm ảnh */}
        <button
          type="button"
          onClick={() => handleAddImageInput(color.color_id)}
          style={{
            background: '#28a745',
            color: '#fff',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ➕ Thêm ảnh
        </button>
      </div>
    );
  })}

  {/* ✅ Nút Submit toàn bộ ảnh */}
  <button
    type="button"
    onClick={handleSubmitUploadImages}
    style={{
      background: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      padding: '8px 16px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }}
    onMouseEnter={(e) => (e.target.style.background = '#0056b3')}
    onMouseLeave={(e) => (e.target.style.background = '#007bff')}
    onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
    onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
  >
    💾 Lưu ảnh của màu
  </button>
</div>

<br />
       <form onSubmit={handleSubmitEditProduct} style={{ maxWidth: '100%', width: '100%' }}>

            <h2>
              <span className="primary">CHỈNH SỬA SẢN PHẨM</span> 
            </h2>
            <p>Thông Tin Sản Phẩm</p>
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
            <div style={{ display: 'flex', gap: '10px' }}>
  <button type="submit" className="ad-btn ad-login-member">
    Sửa Sản Phẩm
  </button>
  <button onClick={() => handleDeleteProduct(productByAsin.asin)} className="ad-btn ad-login-member">
    🗑️ Xoá sản phẩm
  </button>
</div>

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