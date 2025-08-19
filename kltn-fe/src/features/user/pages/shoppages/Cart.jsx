import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScrollTopButton from '../../layout/ScrollTopButton';
import QuickViewModal from '../../components/home/QuickViewModal';
import WOW from 'wowjs';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../../apiService/authFetch';

function Cart() {
	const [listCart, setListCart] = useState({ items: [], totalPrice: 0 });
  const [hasBgClass, setHasBgClass] = useState(true);
  const [quantityMap, setQuantityMap] = useState({});
  const [selectedItemsCart, setSelectedItemsCart] = useState([]);  
  const navigate = useNavigate();
  const [availableStockMap, setAvailableStockMap] = useState({});
  const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState("");
const [toastType, setToastType] = useState("error");

const triggerToast = (msg, type = "error") => {
  setToastMessage(msg);
  setToastType(type);
  setShowToast(true);
  setTimeout(() => setShowToast(false), 2500);
};

  // Xu li gioi han san pham: 
  const fetchStockVariant = async (productId, sizeName, colorName, asin) => {
    try {
      const sizeId = listCart.items.find(item => item.productId === productId)?.sizes.find(s => s.sizeName === sizeName)?.sizeId;
      const colorId = JSON.parse(listCart.items.find(item => item.asin === asin)?.colorAsin || '[]').find(c => c.name_color === colorName)?.color_id;
  
      if (!sizeId || !colorId || !productId) return;
  
      const res = await axios.get(`http://localhost:8765/api/product-variants/available-stock`, { params: { productId, sizeId, colorId } });
  
      setAvailableStockMap(prev => ({ ...prev, [asin]: res.data }));
    } catch (err) {
      console.error("❌ Lỗi lấy tồn kho biến thể:", err);
    }
  };

  useEffect(() => {
    if (hasBgClass) {
      document.body.classList.add('bg');
    } else {
      document.body.classList.remove('bg');
    }
    return () => document.body.classList.remove('bg');
  }, [hasBgClass]);

  useEffect(() => {
    new WOW.WOW().init();
  }, []);
  const totalPrice = useMemo(() => {
    return listCart.items.reduce((sum, item) => {
      const quantity = quantityMap[item.productId] ?? item.quantity ?? 1;
      const unitPrice = item.discountedUnitPrice ?? item.price / item.quantity;
      return sum + unitPrice * quantity;
    }, 0);
  }, [listCart.items, quantityMap]);
  const toggleSelectItemCart = (asin) => {
    setSelectedItemsCart((prev) =>
      prev.includes(asin) ? prev.filter(a => a !== asin) : [...prev, asin]
    );
  };
  
  const toggleSelectAll = () => {
    const allAsins = listCart.items.map(item => item.asin);
    const allSelected = allAsins.every(asin => selectedItemsCart.includes(asin));
    setSelectedItemsCart(allSelected ? [] : allAsins);
  };
  
  const getCartProduct = async () => {
    const cartId = localStorage.getItem("cartId") || '';
    const token = localStorage.getItem("accessToken") || '';
    try {
      const cartResponse = await axios.get('http://localhost:8765/api/cart/getCart', { params: { cartId, token } });
      const cartItems = cartResponse.data.items || [];
      if (!cartItems.length) {
        setListCart({ items: [], totalPrice: 0 });
        return;
      }
  
      const asins = cartItems.map(item => item.asin).join(',');
      const productResponse = await axios.get(`http://localhost:8765/api/products/listByAsin`, { params: { asins } });
  
      const mergedItems = cartItems.map(item => {
        const product = productResponse.data.find(p => p.asin === item.asin);
        if (!product) return item;
  
        const unitPrice = product.productPrice;
        const discount = product.percentDiscount || 0;
        const discountedUnitPrice = unitPrice - (unitPrice * discount / 100);
  
        const hasSize = product?.sizes?.length > 0;
        const hasColor = product?.colorAsin && JSON.parse(product.colorAsin).length > 0;
  
        return { ...item, ...product, unitPrice, discountedUnitPrice, hasSize, hasColor };
      });
  
      setListCart({ ...cartResponse.data, items: mergedItems });
      const map = {};
      mergedItems.forEach(item => {
        map[item.productId] = item.quantity;
        if (item.hasSize && item.hasColor) {
          fetchStockVariant(item.productId, item.size, item.nameColor, item.asin);
        }
      });
      setQuantityMap(map);
    } catch (error) {
      console.error("❌ Lỗi lấy giỏ hàng:", error);
      setListCart({ items: [], totalPrice: 0 });
    }
  };
  useEffect(() => {
    getCartProduct();
    const handleCartUpdate = () => getCartProduct();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);
  // dat lai san pham
  useEffect(() => {
    const reorderData = JSON.parse(localStorage.getItem("reorderItems") || "[]");
    if (reorderData.length > 0) {
      const token = localStorage.getItem("accessToken") || '';
      const cartId = localStorage.getItem("cartId") || '';
  
      const addReorderItem = async (item) => {
        try {
          await axios.post("http://localhost:8765/api/cart/add", {
            token,
            cartId,
            asin: item.asin,
            quantity: item.quantity,
            price: 0,
            size: item.size,
            nameColor: item.nameColor
          });
        } catch (err) {
          console.error("❌ Lỗi khi thêm sản phẩm reorder:", err);
        }
      };
  
      Promise.all(reorderData.map(addReorderItem)).then(() => {
        localStorage.removeItem("reorderItems");
        setTimeout(() => window.dispatchEvent(new Event("cartUpdated")), 500);
      });
    }
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    const item = listCart.items.find(i => i.productId === productId);
    if (!item || newQuantity < 1) return;
  
    const cartId = localStorage.getItem("cartId") || '';
    const token = localStorage.getItem("accessToken") || '';
    const unitPrice = item.price / item.quantity;
  
    try {
      await axios.put('http://localhost:8765/api/cart/updateItem', {
        token,
        cartId,
        asin: item.asin,
        quantity: newQuantity,
        price: unitPrice,
        size: item.size,
        nameColor: item.nameColor
      });
  
      // ✅ Sửa chỗ này:
      await fetchStockVariant(item.productId, item.size, item.nameColor, item.asin);
  
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("❌ Cập nhật số lượng lỗi:", err);
    }
  };
  const handleIncrement = (productId) => {
    const item = listCart.items.find(i => i.productId === productId);
    const asin = item?.asin;
    const current = quantityMap[productId] || 1;
    const maxStock = availableStockMap[asin] ?? 1000;
  
    if (current >= maxStock) {
      triggerToast("⚠️ Đã đạt giới hạn tồn kho!");
      return;
    }
  
    const newQty = current + 1;
    setQuantityMap(prev => ({ ...prev, [productId]: newQty }));
    updateQuantity(productId, newQty);
  };
  const handleDecrement = (productId) => {
    const current = quantityMap[productId] || 1;
    if (current <= 1) {
      triggerToast("⚠️ Số lượng tối thiểu là 1!");
      return;
    }
    const newQty = current - 1;
    setQuantityMap(prev => ({ ...prev, [productId]: newQty }));
    updateQuantity(productId, newQty);
  };
  const handleRemove = async (asin) => {
    const cartId = localStorage.getItem("cartId") || '';
    const token = localStorage.getItem("accessToken") || '';
    try {
      await axios.post('http://localhost:8765/api/cart/removeItem', { token, cartId, asin });
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("❌ Xoá lỗi:", err);
    }
  };
  const handleChange = (productId, value) => {
    const item = listCart.items.find(i => i.productId === productId);
    const asin = item?.asin;
    let num = parseInt(value);
    if (isNaN(num)) num = 1;
    if (num < 1) {
      triggerToast("⚠️ Số lượng tối thiểu là 1!");
      num = 1;
    }
    const maxStock = availableStockMap[asin] ?? 1000;
    if (num > maxStock) {
      triggerToast("⚠️ Vượt quá số lượng tồn kho!");
      num = maxStock;
    }
    setQuantityMap(prev => ({ ...prev, [productId]: num }));
    updateQuantity(productId, num);
  };
  
  const updateCartItemVariant = async (asin, quantity, price, size, nameColor, productId) => {
    const token = localStorage.getItem("accessToken") || '';
    const cartId = localStorage.getItem("cartId") || '';
    try {
      await axios.put("http://localhost:8765/api/cart/updateItem", {
        token,
        cartId,
        asin,
        quantity,
        price,
        size: size?.sizeName || size,
        nameColor
      });
      await fetchStockVariant(productId, size, nameColor, asin);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("❌ updateCartItemVariant failed:", err);
    }
  };
  return (
    <>
      <div className="page-wraper">

        {/* Header (đã được xử lý trong App.js) */}

<div className="page-content bg-light">
  {/*Banner Start*/}
  <div
    className="dz-bnr-inr bg-secondary overlay-black-light"
    style={{ backgroundImage: "url(../../assets/user/images/background/bg1.jpg)" }}
  >
    <div className="container">
      <div className="dz-bnr-inr-entry">
        <h1>
        Giỏ hàng
          {/* Shop Cart */}
        </h1>
        <nav aria-label="breadcrumb" className="breadcrumb-row">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html"> Trang chủ</a>
            </li>
            <li className="breadcrumb-item">Giỏ hàng</li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  {/*Banner End*/}
  {/* contact area */}
  <section className="content-inner shop-account">
    {/* Product */}
    <div className="container">
      <div className="row">
      <div className="col-lg-8">
                <div className="table-responsive">
                  <table className="table check-tbl">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th></th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
  {listCart.items.map(item => {
    const quantity = quantityMap[item.productId] ?? item.quantity ?? 1;
    const unitPrice = item.price / item.quantity;

    return (
      <tr key={item.productId}>
        <td className="product-item-img">
        <img
  src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_80,h_80/imgProduct/IMG/${item.productThumbnail}`}
  alt={item.productTitle}
  width={80}
  height={80}
/>

        </td>
        <td className="product-item-name">{item.productTitle}</td>
        <td className="product-item-price">
  ${ (item.discountedUnitPrice ?? (item.price / item.quantity)).toFixed(2) }
</td>
<td className="product-item-variant">
  {item.sizes?.length > 0 && item.sizes[0]?.sizeName && (
    <div className="mb-2">
      <strong>Size:</strong>
      <div className="btn-group product-size m-0">
      {item.sizes.map((size, sizeIndex) => {
  const inputId = `size-radio-${item.asin}-${sizeIndex}`;
  const isChecked = item.size === size.sizeName;

  return (
    <React.Fragment key={sizeIndex}>
      <input
        type="radio"
        className="btn-check"
        name={`size-group-${item.asin}`}
        id={inputId}
        checked={isChecked}
        readOnly
      />
      <label
        className="btn btn-outline-secondary btn-sm"
        htmlFor={inputId}
        style={isChecked ? { backgroundColor: '#000', color: '#fff' } : {}}
        onClick={async () => {
          await updateCartItemVariant(
            item.asin,
            quantity,
            item.unitPrice,
            size.sizeName,
            item.nameColor,
            item.productId
          );
          getCartProduct();
        }}
      >
        {size.sizeName}
      </label>
    </React.Fragment>
  );
})}
      </div>
    </div>
  )}

  {/* Color selection */}
  {item.colorAsin && JSON.parse(item.colorAsin).length > 0 && (
    <div>
      <strong>Màu sắc:</strong>
      <div className="d-flex gap-2 mt-1">
        {JSON.parse(item.colorAsin).map((color, index) => {
          const isSelected = item.nameColor === color.name_color;
          return (
            <div
              key={index}
              onClick={async () => {
                await updateCartItemVariant(
                  item.asin,
                  quantity,
                  item.unitPrice,
                  item.size,
                  color.name_color,
                  item.productId
                );
                getCartProduct();
              }}             
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: color.code_color,
                borderRadius: '50%',
                border: isSelected ? '2px solid black' : '1px solid #ccc',
                cursor: 'pointer',
              }}
              title={color.name_color}
            />
          );
        })}
      </div>
    </div>
  )}
</td>

        <td className="product-item-quantity">
          <div className="quantity btn-quantity style-1 d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-secondary px-2"
              onClick={() => handleDecrement(item.productId)}
            >
              <i className="fa fa-minus" />
            </button>
            <input
              type="text"
              value={quantity}
              onChange={(e) => handleChange(item.productId, e.target.value)}
              className="form-control text-center"
              style={{ width: '60px' }}
            />
            <button
              className="btn btn-outline-secondary px-2"
              onClick={() => handleIncrement(item.productId)}
            >
              <i className="fa fa-plus" />
            </button>
          </div>
        </td>
        <td className="product-item-totle">
  ${ (quantity * (item.discountedUnitPrice ?? (item.price / item.quantity))).toFixed(2) }
</td>
<td>
    <input
      type="checkbox"
      checked={selectedItemsCart.includes(item.asin)}
      onChange={() => toggleSelectItemCart(item.asin)}
    />
  </td>
        <td className="product-item-close">
          <button
            onClick={() => handleRemove(item.asin)}
            className="btn btn-sm btn-dark rounded-circle"
          >
            ✕
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

                  </table>
                </div>
                <th>
  <input
    type="checkbox"
    checked={
      listCart.items.length > 0 &&
      listCart.items.every(item => selectedItemsCart.includes(item.asin))
    }
    onChange={toggleSelectAll}
  />
   <span>
   Chọn tất cả
    {/* Select All */}
   </span>
</th>
              </div>
        <div className="col-lg-4">
          <h4 className="title mb15">
         Tổng số giỏ hàng
            {/* Cart Total */}
          </h4>
          <div className="cart-detail">
            <a
              href="javascript:void(0);"
              className="btn btn-outline-secondary w-100 m-b20"
            >
              Ưu đãi hoàn tiền 5% của ngân hàng
              {/* Bank Offer 5% Cashback */}
            </a>
            <div className="icon-bx-wraper style-4 m-b15">
              <div className="icon-bx">
                <i className="flaticon flaticon-ship" />
              </div>
              <div className="icon-content">
                <span className=" font-14">Miễn phí</span>
                <h6 className="dz-title">
                Thưởng thức sản phẩm
                  {/* Enjoy The Product */}
                </h6>
              </div>
            </div>
            <div className="icon-bx-wraper style-4 m-b30">
              <div className="icon-bx">
                <img src="../../assets/user/images/shop/shop-cart/icon-box/pic2.png" alt="/" />
              </div>
              <div className="icon-content">
                <h6 className="dz-title">
                Thưởng thức sản phẩm</h6>
                <p>                  
Lorem Ipsum chỉ đơn giản là văn bản giả dùng trong in ấn và
sắp chữ
                </p>
              </div>
            </div>
            <div className="save-text">
              <i className="icon feather icon-check-circle" />
              <span className="m-l10">Bạn sẽ tiết kiệm được ₹504 cho đơn hàng này</span>
            </div>
            <table>
              <tbody>
                <tr className="total">
                  <td>
                    <h6 className="mb-0">Tổng</h6>
                  </td>
                  <td className="price">${totalPrice.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <button
  onClick={() => {
    if (selectedItemsCart.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
      return;
    }

    const invalidItems = listCart.items.filter(item =>
      selectedItemsCart.includes(item.asin) &&
      (
        (item.hasSize && !item.size) || 
        (item.hasColor && !item.nameColor)
      )
    );

    if (invalidItems.length > 0) {
      alert("Vui lòng chọn đúng size và màu sắc cho các sản phẩm yêu cầu.");
      return;
    }

    navigate('/user/shoppages/checkout', {
      state: { selectedItemsCart }
    });
  }}
  className="btn btn-secondary w-100"
>
  CHECK OUT
</button>

            <a href="#" onClick={() => window.location.href = '/user/shoppages/shopWithCategory'} className="btn btn-secondary w-100">
              PLACE ORDER
            </a>
          </div>
        </div>
      </div>
    </div>
    {/* Product END */}
  </section>
  {/* contact area End*/}
</div>

        {/* Footer (đã được xử lý trong App.js) */}
         <ScrollTopButton/>
        <QuickViewModal />
        {showToast && (
  <div style={{
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 9999,
    padding: "12px 20px",
    backgroundColor: toastType === "success" ? "#4caf50" : "#f44336",
    color: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "opacity 0.5s ease-in-out"
  }}>{toastMessage}</div>
) }

      </div>
    </>
  );
}

export default Cart;