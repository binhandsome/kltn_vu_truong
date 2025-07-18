import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScrollTopButton from '../../layout/ScrollTopButton';
import QuickViewModal from '../../components/home/QuickViewModal';
import WOW from 'wowjs';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
	const [listCart, setListCart] = useState({ items: [], totalPrice: 0 });
  const [hasBgClass, setHasBgClass] = useState(true);
  const [quantityMap, setQuantityMap] = useState({});
  const [selectedItemsCart, setSelectedItemsCart] = useState([]);  
  const navigate = useNavigate();

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
      const cartResponse = await axios.get('http://localhost:8084/api/cart/getCart', {
        params: { cartId, token },
      });
  
      const cartItems = cartResponse.data.items || [];
      if (!cartItems.length) {
        setListCart({ items: [], totalPrice: 0 });
        return;
      }
  
      const asins = cartItems.map(item => item.asin).join(',');
      const productResponse = await axios.get(`http://localhost:8083/api/products/listByAsin`, {
        params: { asins },
      });
  
      const mergedItems = cartItems.map(item => {
        const product = productResponse.data.find(p => p.asin === item.asin);
        if (!product) return item;
      
        const unitPrice = product.productPrice;
        const discount = product.percentDiscount || 0;
        const discountedUnitPrice = unitPrice - (unitPrice * discount / 100);
      
        const hasSize = product?.sizes?.length > 0;
        const hasColor = product?.colorAsin && JSON.parse(product.colorAsin).length > 0;
      
        return {
          ...item,
          ...product,
          unitPrice,
          discountedUnitPrice,
          size: item.size,
          nameColor: item.nameColor,
          hasSize,
          hasColor, // ✅ THÊM VÀO ĐÂY
        };
      });
      
  
      setListCart({
        ...cartResponse.data,
        items: mergedItems,
      });
      console.log("Merged items with size/color flags:", mergedItems);
  
      const map = {};
      mergedItems.forEach(item => {
        map[item.productId] = item.quantity;
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

  const updateQuantity = async (productId, newQuantity) => {
    const item = listCart.items.find(i => i.productId === productId);
    if (!item || newQuantity < 1) return;

    const cartId = localStorage.getItem("cartId") || '';
    const token = localStorage.getItem("accessToken") || '';
    const unitPrice = item.price / item.quantity;

    try {
      await axios.put('http://localhost:8084/api/cart/updateItem', {
        token,
        cartId,
        asin: item.asin,
        quantity: newQuantity,
        price: unitPrice,
        size: item.size,
        nameColor: item.nameColor
      });
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("❌ Cập nhật số lượng lỗi:", err);
    }
  };

  const handleIncrement = (productId) => {
    const newQty = (quantityMap[productId] || 1) + 1;
    setQuantityMap(prev => ({ ...prev, [productId]: newQty }));
    updateQuantity(productId, newQty);
  };

  const handleDecrement = (productId) => {
    const newQty = Math.max(1, (quantityMap[productId] || 1) - 1);
    setQuantityMap(prev => ({ ...prev, [productId]: newQty }));
    updateQuantity(productId, newQty);
  };

  const handleRemove = async (asin) => {
    const cartId = localStorage.getItem("cartId") || '';
    const token = localStorage.getItem("accessToken") || '';
    try {
      await axios.post('http://localhost:8084/api/cart/removeItem', { token, cartId, asin });
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("❌ Xoá lỗi:", err);
    }
  };
  const handleChange = (productId, value) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 1) {
      setQuantityMap(prev => ({ ...prev, [productId]: num }));
      updateQuantity(productId, num);
    }
  };
  const updateCartItemVariant = async (asin, quantity, price, size, nameColor) => {
    const token = localStorage.getItem("accessToken") || '';
    const cartId = localStorage.getItem("cartId") || '';
  
    return axios.put("http://localhost:8084/api/cart/updateItem", {
      token,
      cartId,
      asin,
      quantity,
      price,
      size,
      nameColor
    }).then(() => {
      window.dispatchEvent(new Event("cartUpdated"));
    });
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
        <h1>Shop Cart</h1>
        <nav aria-label="breadcrumb" className="breadcrumb-row">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html"> Home</a>
            </li>
            <li className="breadcrumb-item">Shop Cart</li>
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
                        <th>Product</th>
                        <th></th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
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
        onClick={() =>
          updateCartItemVariant(
            item.asin,
            quantityMap[item.productId] ?? item.quantity ?? 1,
            item.unitPrice,
            size.sizeName,
            item.nameColor
          ).then(() => getCartProduct())
        }
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
      <strong>Color:</strong>
      <div className="d-flex gap-2 mt-1">
        {JSON.parse(item.colorAsin).map((color, index) => {
          const isSelected = item.nameColor === color.name_color;
          return (
            <div
              key={index}
              onClick={() =>
                updateCartItemVariant(item.asin, quantity, item.unitPrice, item.size, color.name_color)
                  .then(() => getCartProduct())
              }
              
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
   <span>Select All</span>
</th>
              </div>
        <div className="col-lg-4">
          <h4 className="title mb15">Cart Total</h4>
          <div className="cart-detail">
            <a
              href="javascript:void(0);"
              className="btn btn-outline-secondary w-100 m-b20"
            >
              Bank Offer 5% Cashback
            </a>
            <div className="icon-bx-wraper style-4 m-b15">
              <div className="icon-bx">
                <i className="flaticon flaticon-ship" />
              </div>
              <div className="icon-content">
                <span className=" font-14">FREE</span>
                <h6 className="dz-title">Enjoy The Product</h6>
              </div>
            </div>
            <div className="icon-bx-wraper style-4 m-b30">
              <div className="icon-bx">
                <img src="../../assets/user/images/shop/shop-cart/icon-box/pic2.png" alt="/" />
              </div>
              <div className="icon-content">
                <h6 className="dz-title">Enjoy The Product</h6>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting
                </p>
              </div>
            </div>
            <div className="save-text">
              <i className="icon feather icon-check-circle" />
              <span className="m-l10">You will save ₹504 on this order</span>
            </div>
            <table>
              <tbody>
                <tr className="total">
                  <td>
                    <h6 className="mb-0">Total</h6>
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
      </div>
    </>
  );
}

export default Cart;