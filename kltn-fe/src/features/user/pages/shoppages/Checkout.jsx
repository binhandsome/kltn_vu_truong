// src/pages/common/HomePage.js
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link, useNavigate } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { data, get } from 'jquery';
import { deleteAddress } from '../../apiService/userService';
function Checkout() {
	const [hasBgClass, setHasBgClass] = useState(true); 
  const location = useLocation();
  const { selectedItemsCart, cartId: passedCartId } = location.state || {};
  const [listCartById, setListCartById] = useState([]);
  const [totalPrice, setTotalPrice] = useState(listCartById?.totalPrice || 0);
  const isLogin = localStorage.getItem("accessToken") !== null;
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');
  const [country, setCountry] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [optionalStreet, setOptionalStreet] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [addressList, setAddressList] = useState([]);
  const [selectOption, setSelectOption] = useState();
  const [addressMain, setAddressMain] = useState();
  const [orderNote, setOrderNote] = useState('');
  const [selectBank, setSelectBank] = useState('');
  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);
  const [editSize, setEditSize] = useState('');
  const [editColor, setEditColor] = useState('');
  const [editQuantity, setEditQuantity] = useState(1);
  const [availableStock, setAvailableStock] = useState(null);
  const [prevQuantity, setPrevQuantity] = useState(1);
  const [stockStatus, setStockStatus] = useState('in_stock');
  // Lấy số lượng tồn kho
  const fetchAvailableStock = async (productId, sizeId, colorId) => {
    if (!productId || !sizeId || !colorId) {
      console.warn("⚠️ Thiếu thông tin productId, sizeId hoặc colorId:", { productId, sizeId, colorId });
      setAvailableStock(0);
      setStockStatus('out_of_stock');
      return;
    }
    try {
      const response = await axios.get("http://localhost:8083/api/product-variants/available-stock", {
        params: { productId, sizeId, colorId }
      });
      console.log("✅ API response:", response.data);
      let qty, status;
      if (typeof response.data === 'number') {
        qty = response.data; // Nếu API trả về số thô (2)
        status = qty > 0 ? 'in_stock' : 'out_of_stock';
      } else {
        qty = response.data.quantityInStock || response.data.quantity || 0;
        status = response.data.status || (qty > 0 ? 'in_stock' : 'out_of_stock');
      }
      setAvailableStock(qty);
      setStockStatus(status);
      if (editQuantity > qty) setEditQuantity(qty);
    } catch (err) {
      console.error("❌ Không fetch được tồn kho:", err.response?.data || err.message);
      setAvailableStock(0);
      setStockStatus('out_of_stock');
      alert("Lỗi khi lấy số lượng tồn kho. Vui lòng thử lại.");
    }
  };
  useEffect(() => {
    if (editingItem && editSize && editColor) {
      const sizeObj = editingItem.sizes?.find(s => s.sizeName?.toString() === editSize.toString());
      const sizeId = sizeObj?.sizeId;
      const colorId = parseInt(editColor);
      console.log("🔍 Debug:", { editSize, sizeId, editColor, colorId, sizes: editingItem.sizes, colorAsin: editingItem.colorAsin });
      if (sizeId && !isNaN(colorId)) {
        fetchAvailableStock(editingItem.productId, sizeId, colorId);
      } else {
        console.warn("⚠️ sizeId hoặc colorId không hợp lệ:", { sizeId, colorId });
        setAvailableStock(0);
        setStockStatus('out_of_stock');
      }
    }
  }, [editingItem, editSize, editColor]);
  // Xử lý tăng số lượng
  const handleIncrease = () => {
    if (availableStock !== null && editQuantity >= availableStock) {
      alert(`Chỉ còn tối đa ${availableStock} sản phẩm.`);
      return;
    }
    setEditQuantity(prev => prev + 1);
  };

  // Xử lý giảm số lượng
  const handleDecrease = () => {
    if (editQuantity > 1) {
      setEditQuantity(prev => prev - 1);
    } else {
      alert("Số lượng không được nhỏ hơn 1.");
    }
  };

  // Xử lý thay đổi số lượng
  const handleInputChange = (e) => {
    const val = parseInt(e.target.value);
    if (isNaN(val) || val < 1) {
      alert("Số lượng không được nhỏ hơn 1.");
      setEditQuantity(1);
      return;
    }
    if (availableStock !== null && val > availableStock) {
      alert(`Chỉ còn tối đa ${availableStock} sản phẩm.`);
      setEditQuantity(availableStock);
      return;
    }
    setEditQuantity(val);
  };
   useEffect(() => {
    axios.get('http://localhost:8086/api/shippingMethods')
      .then(res => {
        setShippingMethods(res.data);
        setSelectedShippingMethod(res.data[0]); // mặc định chọn phương thức đầu tiên
      })
      .catch(err => console.error('Shipping method error:', err));
  }, []);
  const saveOrder = async () => {
    try {
      const tokenAccess = localStorage.getItem("accessToken");
      const cartId = localStorage.getItem("cartId") || '';
  
      if (!listCartById?.items || listCartById.items.length === 0) {
        alert("Không có sản phẩm nào trong đơn hàng.");
        return;
      }
  
      if (!totalPrice || isNaN(totalPrice)) {
        alert("Giá trị đơn hàng không hợp lệ.");
        return;
      }
  
      if (!selectBank) {
        alert("Vui lòng chọn phương thức thanh toán.");
        return;
      }
  
      for (const item of listCartById.items) {
        if (item.hasColor && !item.nameColor) {
          alert(`Sản phẩm "${item.productName}" yêu cầu chọn màu`);
          return;
        }
        if (item.hasSize && !item.size) {
          alert(`Sản phẩm "${item.productName}" yêu cầu chọn size`);
          return;
        }
      }
  
      // ✅ Convert colorName → colorId
      const convertColorNameToId = async (colorName) => {
        try {
          const res = await axios.get("http://localhost:8083/api/products/color-id", {
            params: { nameColor: colorName }
          });
          return res.data; // colorId
        } catch (err) {
          console.error(`❌ Không tìm thấy colorId cho "${colorName}"`, err);
          throw new Error(`Không tìm thấy mã màu: ${colorName}`);
        }
      };
  
      // ✅ Tạo orderItemRequests async
      const orderItemRequests = await Promise.all(listCartById.items.map(async (item) => {
        const req = {
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.itemTotalPrice,
          size: item.size,
          color: item.nameColor,
        };
      
        // ✅ Tìm ID tương ứng nếu chưa có
        const sizeObj = item.sizes?.find(s => s.sizeName === item.size);
        req.sizeId = sizeObj?.sizeId || null;
      
        const colorList = item.colorAsin ? JSON.parse(item.colorAsin) : [];
        const colorId = colorList.find(c => c.name_color === item.nameColor)?.color_id;
        req.colorId = colorId || null;
      
        return req;
      }));
  
      const ip = await fetch("https://api.ipify.org?format=json")
        .then(res => res.json())
        .then(data => data.ip);
  
      let payload = {
        orderNotes: orderNote || "",
        totalPrice,
        orderItemRequests,
        selectBank,
        ipAddress: ip,
        shippingMethodId: selectedShippingMethod?.id,
        shippingFee: selectedShippingMethod?.cost || 0
      };
  
      let endpoint = "";
  
      if (tokenAccess) {
        if (!addressMain) {
          alert("Vui lòng chọn địa chỉ giao hàng.");
          return;
        }
  
        payload = {
          ...payload,
          accessToken: tokenAccess,
          addressId: addressMain
        };
        endpoint = "http://localhost:8086/api/orders/placeOrder";
      } else {
        if (!firstName || !lastName || !phone || !email || !selectedProvince || !selectedDistrict || !ward || !street) {
          alert("Vui lòng nhập đầy đủ thông tin giao hàng.");
          return;
        }
  
        const guestAddress = `${street}, ${ward}, ${selectedDistrict}, ${selectedProvince}`;
  
        payload = {
          ...payload,
          cartId,
          guestName: `${firstName} ${lastName}`,
          guestPhone: phone,
          guestEmail: email,
          guestAddress
        };
        endpoint = "http://localhost:8086/api/orders/placeGuestOrder";
      }
  
      const response = await axios.post(endpoint, payload);
      const { message, paymentUrl } = response.data;
  
      if (selectBank === "BANK" && paymentUrl) {
        window.location.href = paymentUrl;
        return;
      }
  
      alert(message || "Đặt hàng thành công!");
  
      try {
        await axios.delete("http://localhost:8084/api/cart/clearCart", {
          token: tokenAccess || '',
          cartId
        });
      } catch (e) {
        console.warn("❌ Không gọi được clearCart từ backend:", e);
      }
  
      await getCartProductById();
      setListCartById({ items: [], totalPrice: 0 });
      navigate("/user/myaccount/orders");
    } catch (error) {
      console.error("❌ Lỗi khi đặt hàng:", error);
      alert(error.response?.data?.error || error.message);
    }
  };
  
// Xử lý mở modal chỉnh sửa
const openEditModal = (item) => {
  setEditingItem(item);
  setEditQuantity(item.quantity || 1);
  setEditSize(item.size || '');
  const colors = item.colorAsin ? JSON.parse(item.colorAsin) : [];
  const colorId = item.nameColor ? colors.find(c => c.name_color === item.nameColor)?.color_id : '';
  setEditColor(colorId || '');
  setAvailableStock(null);
};   
useEffect(() => { 
  if (listCartById?.totalPrice) {
    setTotalPrice(listCartById.totalPrice);
  }
}, [listCartById]);
// Remove Address 
const removeAddress = async (addressId) => {
  try {
    await deleteAddress(addressId); // Gọi hàm từ service
    setAddressList(prev => prev.filter(addr => addr.addressId !== addressId)); // Cập nhật lại UI
    alert("Xóa địa chỉ thành công!");
  } catch (err) {
    console.error("❌ Lỗi khi xóa địa chỉ:", err);
    alert(err.message || "Xóa địa chỉ thất bại!");
  }
};
// Remove Item To Cart sau Checkout
const removeItemFromCart = async (asin) => {
  const cartId = localStorage.getItem("cartId") || '';
  const token = localStorage.getItem("accessToken") || '';
  try {
    await axios.post('http://localhost:8084/api/cart/removeItem', {
      token,
      cartId,
      asin,
    });
  } catch (err) {
    console.error(`❌ Xoá sản phẩm ${asin} khỏi giỏ hàng thất bại`, err);
  }
};
const handleShippingChange = (e) => {
  const methodId = e.target.value;
  const method = shippingMethods.find(m => m.id.toString() === methodId);
  if (method) {
    setSelectedShippingMethod(method);
    const basePrice = listCartById?.totalPrice || 0;
    setTotalPrice(basePrice + parseFloat(method.cost));
  }
};
const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
useEffect(() => {
  const fetchProvinces = async () => {
    try {
      const res = await axios.get("https://provinces.open-api.vn/api/?depth=3");
      setProvinces(res.data);
    } catch (error) {
      console.error("Lỗi khi gọi API tỉnh/thành:", error);
    }
  };

  fetchProvinces();
}, []);
const sendInfoAddress = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const payload = {
      accessToken,
      address: {
        recipientName: `${firstName} ${lastName}`,
        recipientPhone: phone,
        recipientEmail: email,
        addressDetails: `${selectedProvince}, ${selectedDistrict}, ${ward}`,
        deliveryAddress: `${street} / ${optionalStreet}`,
        isPrimaryAddress: selectOption,
      },
    };

    const response = await axios.post("http://localhost:8081/api/user/addAdressWithUser", payload);
    console.log("✅ Đã thêm địa chỉ:", response.data);

    // Reset form
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setStreet('');
    setOptionalStreet('');
    setSelectedProvince('');
    setSelectedDistrict('');
    setWard('');
    setSelectOption('');

    // Tắt modal và gọi lại API lấy danh sách địa chỉ
    setShowModal(false);
    await getAddressWithUser(); // cập nhật lại danh sách và set lại địa chỉ mặc định

    alert("Địa chỉ đã được thêm thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi thêm địa chỉ:", error);
    alert("Không thể thêm địa chỉ");
  }
};
const getAddressWithUser = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get("http://localhost:8081/api/user/addressAllByUser", {
      params: { accessToken: token }
    });
    const addresses = response.data;
    setAddressList(addresses);
    const main = addresses.find(address => address.isPrimaryAddress === 1);
    if (main) setAddressMain(main.addressId);
  } catch (error) {
    console.error("❌ Lỗi khi lấy địa chỉ:", error);
  }
};

useEffect(() => {
  getAddressWithUser();
}, []);

// Update districts when a province is selected
useEffect(() => {
  if (selectedProvince) {
    const found = provinces.find((p) => p.name === selectedProvince);
    setDistricts(found?.districts || []);
    setSelectedDistrict(""); // Reset district when province changes
    setWards([]);
    console.log("Đã chọn tỉnh:", selectedProvince);
  }
}, [selectedProvince, provinces]);

// Update wards when a district is selected
useEffect(() => {
  if (selectedDistrict) {
    const found = districts.find((d) => d.name === selectedDistrict);
    setWards(found?.wards || []);
    console.log("Đã chọn quận:", selectedDistrict);
  }
}, [selectedDistrict, districts]);
const getCartProductById = async () => {
  const token = localStorage.getItem('accessToken') || '';
const cartId = passedCartId || localStorage.getItem('cartId') || '';
const cartSelect = token || cartId || '';

  const totalPrice = 0;
  if (!selectedItemsCart || selectedItemsCart.length === 0) {
    console.warn("Không có sản phẩm nào được chọn để thanh toán.");
    return;
  }
  try {
    const cartResponse = await axios.get('http://localhost:8084/api/cart/getCartByID', {
      params: { cartID: cartSelect, asin: selectedItemsCart },
paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    });

    const cartItems = cartResponse.data.items || [];

    const asins = cartItems.map(item => item.asin).join(',');
    const { data: products } = await axios.get('http://localhost:8083/api/products/listByAsin', {
      params: { asins }
    });
    const combined = cartItems
    .map(item => {
      const product = products.find(p => p.asin === item.asin);
      if (!product) return null;
  
      const unitPrice = product.productPrice;
      const discount = product.percentDiscount || 0;
      const discountedUnitPrice = unitPrice * (1 - discount / 100);
      const itemTotalPrice = (discountedUnitPrice * item.quantity).toFixed(2);
  
      return {
        ...item,
        ...product,
        unitPrice,
        discountedUnitPrice,
        itemTotalPrice: parseFloat(itemTotalPrice),
        hasSize: !!(product.sizes && product.sizes.length > 0),
        hasColor: !!(product.colors && product.colors.length > 0)
      };
    })
    .filter(Boolean);
  

    const totalPrice = combined
      .reduce((sum, item) => sum + item.itemTotalPrice, 0)
      .toFixed(2);

    setListCartById({
      ...cartResponse.data,
      items: combined,
      totalPrice: parseFloat(totalPrice)
    });
  } catch (error) {
    console.error('Không thể lấy giỏ hàng:', error.response?.data || error.message);
    setListCartById({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      message: 'Không thể lấy giỏ hàng'
    });
  }
};

useEffect(() => {
  if (selectedItemsCart && selectedItemsCart.length > 0) {
    getCartProductById();
  }
}, [selectedItemsCart]);

	useEffect(() => {
	  if (hasBgClass) {
		document.body.classList.add('bg');
	  } else {
		document.body.classList.remove('bg');
	  }

  
	  return () => {
		// Dọn dẹp: Xóa class khi component bị unmount
		document.body.classList.remove('bg');
	  };
	}, [hasBgClass]); // Chạy lại useEffect khi hasBgClass thay đổi
	useEffect(() => { // New useEffect for WOW.js
		const wow = new WOW.WOW();
		wow.init();
	
		return () => { // Optional cleanup function
			//wow.sync(); // sync and remove the DOM
		};
	  }, []);
    
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
        <h1>Shop Checkout</h1>
        <nav aria-label="breadcrumb" className="breadcrumb-row">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html"> Home</a>
            </li>
            <li className="breadcrumb-item">Shop Checkout</li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  {/*Banner End*/}
  {/* inner page banner End*/}
  <div className="content-inner-1">
    <div className="container">
      <div className="row shop-checkout">
        <div className="col-xl-8">
          <h4 className="title m-b15">Billing details</h4>
          <div
            className="accordion dz-accordion accordion-sm"
            id="accordionFaq"
          >
            {isLogin ? (
             <p></p>
            ) : (
                       <h2 className="accordion-header" id="headingOne">
                <a
                  href="shop-checkout.html#"
                  className="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Returning customer? Click here to login
                  <span className="toggle-close" />
                </a>
              </h2>
            )}
            <div className="accordion-item">
      
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionFaq"
              >
                <div className="accordion-body">
                  <p className="m-b0">
                    If your order has not yet shipped, you can contact us to
                    change your shipping address
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <a
                  href="shop-checkout.html#"
                  className="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Have a coupon? Click here to enter your code
                  <span className="toggle-close" />
                </a>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionFaq"
              >
                <div className="accordion-body">
                  <p className="m-b0">
                    If your order has not yet shipped, you can contact us to
                    change your shipping address
                  </p>
                </div>
              </div>
            </div>
          </div>
          <form className="row">
   
            {isLogin ? (
              <>         
{
  addressList.filter(address => address.isPrimaryAddress === 1)
    .map((address, index) => (
      <div className="col-md-6 m-b30" key={index}>
        <div
          className="address-card"
          style={{
            border: addressMain === address.addressId ? '2px solid #d63384' : '1px solid #ccc',
            backgroundColor: addressMain === address.addressId ? '#fff0f5' : '#fff',
            borderRadius: '8px',
            padding: '16px',
            cursor: 'pointer'
          }}
          onClick={() => setAddressMain(address.addressId)} // ✅ Cho phép chọn địa chỉ
        >
          <div className="account-address-box">
            <h6 className="mb-3">{address.recipientName}</h6>
            <ul>
              <li>{address.recipientPhone}</li>
              <li>{address.recipientEmail}</li>
              <li>{address.deliveryAddress}</li>
              <li>{address.addressDetails}</li>
            </ul>
          </div>

          <div className="account-address-bottom">
            <a href="#" className="d-block me-3">
              <i className="fa-solid fa-pen me-2" />
              Edit
            </a>
            <button
              className="d-block me-3 btn btn-link p-0"
              onClick={(e) => {
                e.stopPropagation(); // tránh xung đột click chọn
                removeAddress(address.addressId);
              }}
            >
              <i className="fa-solid fa-trash-can me-2" />
              Remove
            </button>
          </div>
        </div>
      </div>
    ))
}
{
  addressList.filter(address => address.isPrimaryAddress === 0)
    .map((address, index) => (
      <div className="col-md-6 m-b30" key={index}>
        <div
          className="address-card"
          style={{
            border: addressMain === address.addressId ? '2px solid #198754' : '1px solid #ccc',
            backgroundColor: addressMain === address.addressId ? '#e6fff2' : '#fff',
            borderRadius: '8px',
            padding: '16px',
            cursor: 'pointer'
          }}
          onClick={() => setAddressMain(address.addressId)} // ✅ cho phép chọn
        >
          <div className="account-address-box">
            <h6 className="mb-3">{address.recipientName}</h6>
            <ul>
              <li>{address.recipientPhone}</li>
              <li>{address.recipientEmail}</li>
              <li>{address.deliveryAddress}</li>
              <li>{address.addressDetails}</li>
            </ul>
          </div>

          <div className="account-address-bottom">
            <a href="#" className="d-block me-3">
              <i className="fa-solid fa-pen me-2" />
              Edit
            </a>
            <button
              className="d-block me-3 btn btn-link p-0"
              onClick={(e) => {
                e.stopPropagation(); // tránh trigger chọn khi bấm "remove"
                removeAddress(address.addressId);
              }}
            >
              <i className="fa-solid fa-trash-can me-2" />
              Remove
            </button>
          </div>
        </div>
      </div>
    ))
}
            <div className="col-12">
              <div className="account-card-add">
                <div className="account-address-add">
                  <svg
                    id="Line"
                    height={50}
                    viewBox="0 0 64 64"
                    width={50}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m59.28775 26.0578-7.30176-6.251v-11.72068a.99973.99973 0 0 0 -1-1h-7.46a.99974.99974 0 0 0 -1 1v3.60693l-7.2109-6.17675a5.07688 5.07688 0 0 0 -6.6416 0l-23.97314 20.54345a2.04251 2.04251 0 0 0 1.32226 3.56787h5.98047v18.92188a8.60569 8.60569 0 0 0 8.59082 8.60059h10.481a1.00019 1.00019 0 0 0 -.00006-2h-10.48094a6.60308 6.60308 0 0 1 -6.59082-6.60059v-19.92188a1.00005 1.00005 0 0 0 -1-1l-6.99951-.05078 23.97119-20.542a3.08781 3.08781 0 0 1 4.03955 0l8.86133 7.59082a1.00655 1.00655 0 0 0 1.65039-.75934v-4.7802h5.46v11.18066a1.00013 1.00013 0 0 0 .34961.75928l7.63184 6.60156h-6.98148a.99974.99974 0 0 0 -1 1v3.7002a1.00019 1.00019 0 0 0 2-.00006v-2.70014h5.98145a2.03152 2.03152 0 0 0 1.32031-3.56982z" />
                    <path d="m43.99564 33.718a13.00122 13.00122 0 0 0 .00012 26.00244c17.24786-.71391 17.24231-25.29106-.00012-26.00244zm.00012 24.00244c-14.59461-.60394-14.58984-21.40082.00006-22.00244a11.00122 11.00122 0 0 1 -.00006 22.00244z" />
                    <path d="m49.001 45.71942h-4v-4.00049a1.00019 1.00019 0 0 0 -2 0v4.00049h-4a1.00019 1.00019 0 0 0 .00006 2h3.99994v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2z" />
                  </svg>
                </div>
                <h4 className="mb-3">Add New Address</h4>
                <button className="btn btn-primary px-5"         onClick={() => setShowModal(true)}
>Add</button>
              </div>
            </div></>
            ):(
              
         <>         
                  <div className="col-md-6">
              <div className="form-group m-b25">
                <label className="label-title">First Name</label>
                <input name="dzName" required="" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group m-b25">
                <label className="label-title">Last Name</label>
                <input name="dzName" required="" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
          <div className="col-md-12">
              <div className="m-b25">
                <label className="label-title">Country / Region *</label>
                <select className="default-select form-select w-100" value={selectedProvince || ""} onChange={(e) => setSelectedProvince(e.target.value)}>

                  <option selected="" value="">Select Province</option>
                  {provinces.map((province) => (
                  <option key={province.code} value={province.name}>{province.name}</option>
                  ))}
            
                </select>
              </div>
            </div>
            {districts.length > 0 && (
  <div className="col-md-12">
              <div className="m-b25">
                <label className="label-title">Districs *</label>
                <select className="default-select form-select w-100" value={selectedDistrict || ""} onChange={(e) => setSelectedDistrict(e.target.value)}> 
                  <option selected="">Select Districs</option>
                  {districts.map((district) => (
                  <option key={district.code} value={district.name}>{district.name}</option>

                  ))}
          
                </select>
              </div>
            </div>
            )}
               
                {wards.length > 0 && (
    <div className="col-md-12">
              <div className="m-b25">
                <label className="label-title">Ward *</label>
                <select className="default-select form-select w-100" value={ward} onChange={(e) => setWard(e.target.value)}>
                  <option selected="">Select Ward</option>
                  {wards.map((ward) => (
                  <option key={ward.code} value={ward.name}> {ward.name}</option>

                  ))}
                
                </select>
              </div>
            </div>
            )} 
                   <div className="col-md-12">
              <div className="form-group m-b25">
                <label className="label-title">Street address *</label>
                <input
                  name="dzName"
                  required=""
                  className="form-control m-b15"
                  placeholder="House number and street name"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                <input
                  name="dzName"
                  required=""
                  className="form-control"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  value={optionalStreet}
                  onChange={(e) => setOptionalStreet(e.target.value)}
                />
              </div>
            </div>
                 <div className="col-md-12">
              <div className="form-group m-b25">
                <label className="label-title">Phone *</label>
                <input name="dzName" required="" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)}/>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group m-b25">
                <label className="label-title">Email address *</label>
                <input name="dzName" required="" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
                 <div className="col-md-12 m-b25">
              <div className="form-group m-b5">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="basic_checkbox_1"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="basic_checkbox_1"
                  >
                    Create an account?{" "}
                  </label>
                </div>
              </div>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="basic_checkbox_2"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="basic_checkbox_2"
                  >
                    Ship to a different address?
                  </label>
                </div>
              </div>
            </div>
        </>
            )}
            <div className="col-md-12">
            </div>
    <>
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
<div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Address</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">

                   <div className="col-md-6">
              <div className="form-group m-b25">
                <label className="label-title">First Name</label>
                <input name="dzName" required="" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group m-b25">
                <label className="label-title">Last Name</label>
                <input name="dzName" required="" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
          <div className="col-md-12">
              <div className="m-b25">
                <label className="label-title">Country / Region *</label>
                <select className="default-select form-select w-100" value={selectedProvince || ""} onChange={(e)  => {
                 setSelectedProvince(e.target.value);               
                }}>
                  <option selected="" value="">Select Province</option>
                  {provinces.map((province) => (
                  <option key={province.code} value={province.name}>{province.name}</option>
                  ))}  
                </select>
              </div>
            </div>
            {districts.length > 0 && (
  <div className="col-md-12">
              <div className="m-b25">
                <label className="label-title">Districs *</label>
                <select className="default-select form-select w-100" value={selectedDistrict || ""} onChange={(e) => setSelectedDistrict(e.target.value)}> 
                  <option selected="">Select Districs</option>
                  {districts.map((district) => (
                  <option key={district.code} value={district.name}>{district.name}</option>
                  ))}
                </select>
              </div>
            </div>
            )}  
                {wards.length > 0 && (
    <div className="col-md-12">
              <div className="m-b25">
                <label className="label-title">Ward *</label>
                <select className="default-select form-select w-100" value={ward} onChange={(e) => {
setWard(e.target.value);
console.log(ward)}
                } >
                  <option selected="">Select Ward</option>
                  {wards.map((ward) => (
                  <option key={ward.code} value={ward.name}> {ward.name}</option>
                  ))}     
                </select>
              </div>
            </div>
            )} 
                   <div className="col-md-12">
              <div className="form-group m-b25">
                <label className="label-title">Street address *</label>
                <input
                  name="dzName"
                  required=""
                  className="form-control m-b15"
                  placeholder="House number and street name"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                <input
                  name="dzName"
                  required=""
                  className="form-control"
                  placeholder="Apartment, suite, unit, etc. (optional)"
                  value={optionalStreet}
                  onChange={(e) => setOptionalStreet(e.target.value)}
                />
              </div>
            </div>
                 <div className="col-md-12">
              <div className="form-group m-b25">
                <label className="label-title">Phone *</label>
                <input name="dzName" required="" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)}/>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group m-b25">
                <label className="label-title">Email address *</label>
                <input name="dzName" required="" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="m-b25">
                <label className="label-title">Address Setup *</label>
                <select className=" form-select w-100" value={selectOption} onChange={(e) => setSelectOption(e.target.value)}  
                >
                  <option> Select Option Address </option>
                  <option value={1}> Mặc Định </option>
                  <option value={0}> Phụ </option>  
                </select>
              </div>
            </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={sendInfoAddress}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>   
            <div className="col-md-12 m-b25">
              <div className="form-group">
                <label className="label-title">Order notes (optional)</label>
                <textarea
                  id="comments"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  className="form-control"
                  name="comment"
                  cols={90}
                  rows={5}
                  required="required"
                  defaultValue={""}
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="col-xl-4 side-bar">
          <h4 className="title m-b15">Your Order</h4>
          <div className="order-detail sticky-top">
           {listCartById?.items?.length > 0 ? (          
  listCartById.items.map((item, index) => ( 
    <div key={item.asin || index} className="cart-item style-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="dz-media">
          <img src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_350,h_350/imgProduct/IMG/${item.productThumbnail}`} alt={item.productTitle || 'Product'} />
        </div>
        <div className="dz-content" style={{ display: 'block' }}>
          <h6 className="title mb-0">{item.productTitle || item.productName || 'Unnamed Product'}</h6>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.9rem', color: '#666' }}>
            <span style={{ fontWeight: 400 }}>Quantity: {item.quantity || 'N/A'}</span>
            <span style={{ fontWeight: 400 }}>Color: {item.nameColor || item.color || 'N/A'}</span>
            <span style={{ fontWeight: 400 }}>Size: {item.size || 'No Size'}</span>
          </div>
          <span className="price">${item.itemTotalPrice?.toFixed(2) || '0.00'}</span>
        </div>
      </div>
      <button
  className="edit-cart-btn"
  onClick={() => openEditModal(item)}
  style={{
    padding: '5px 10px',
    backgroundColor: '#065084ff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }}
>
  <i className="fa fa-pencil-alt" aria-hidden="true"></i>
</button>
    </div>
  ))
) : (
  <li>🛒 Giỏ hàng trống</li>
)}
            <table>
              <tbody>
                <tr className="subtotal">
                  <td>Subtotal</td>
                  <td className="price">${listCartById.totalPrice}</td>
                </tr>
                <tr className="title">
                  <td>
                    <h6 className="title font-weight-500">Shipping</h6>
                  </td>
                  <td />
                </tr>
        <tr className="shipping">
        <td>
  {shippingMethods.map((method, index) => (
    <div className="custom-control custom-checkbox" key={method.id}>
      <input
        className="form-check-input radio"
        type="radio"
        name="shippingMethod"
        id={`shipping-${method.id}`}
        value={method.id}
        checked={selectedShippingMethod?.id === method.id}
        onChange={handleShippingChange}
      />
      <label className="form-check-label" htmlFor={`shipping-${method.id}`}>
        {method.methodName} ({method.estimatedDays} ngày) - 
        {parseFloat(method.cost) === 0 ? "Miễn phí" : `$${method.cost}`}
      </label>
    </div>
  ))}
</td>

  <td className="price">25.75</td>
</tr>

                <tr className="total">
                  <td>Total</td>
                  <td className="price">${totalPrice}</td>
                </tr>
              </tbody>
            </table>
            <div
              className="accordion dz-accordion accordion-sm"
              id="accordionFaq1"
            >
              <div className="accordion-item">
                <div className="accordion-header" id="heading1">
                  <div
                    className="accordion-button collapsed custom-control custom-checkbox border-0"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse1"
                    role="navigation"
                    aria-expanded="true"
                    aria-controls="collapse1"
                  >
                    <input
                      className="form-check-input radio"
                      type="radio"
                      name="flexRadioDefault1"
                      id="flexRadioDefault3"
                      value="BANK"
                      onChange={(e) => setSelectBank(e.target.value)} />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault3">
                      Direct bank transfer
                    </label>
                  </div>
                </div>
                <div
                  id="collapse1"
                  className="accordion-collapse collapse show"
                  aria-labelledby="heading1"
                  data-bs-parent="#accordionFaq1"
                >
                  <div className="accordion-body">
                    <p className="m-b0">
                      Make your payment directly into our bank account. Please
                      use your Order ID as the payment reference. Your order
                      will not be shipped until the funds have cleared in our
                      account.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <div className="accordion-header" id="heading2">
                  <div
                    className="accordion-button collapsed custom-control custom-checkbox border-0"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse2"
                    role="navigation"
                    aria-expanded="true"
                    aria-controls="collapse2"
                  >
                    <input
                      className="form-check-input radio"
                      type="radio"
                      name="flexRadioDefault1"
                      id="flexRadioDefault5"
                      value="COD"
                      onChange={(e) => setSelectBank(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault5"
                    >
                      Cash on delivery
                    </label>
                  </div>
                </div>
                <div
                  id="collapse2"
                  className="accordion-collapse collapse"
                  aria-labelledby="collapse2"
                  data-bs-parent="#accordionFaq1"
                >
                  <div className="accordion-body">
                    <p className="m-b0">
                      Make your payment directly into our bank account. Please
                      use your Order ID as the payment reference. Your order
                      will not be shipped until the funds have cleared in our
                      account.
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <div className="accordion-header" id="heading3">
                  <div
                    className="accordion-button collapsed custom-control custom-checkbox border-0"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse3"
                    role="navigation"
                    aria-expanded="true"
                    aria-controls="collapse3"
                  >
                    <input
                      className="form-check-input radio"
                      type="radio"
                      name="flexRadioDefault1"
                      id="flexRadioDefault4"
                          value="PAYPAL"
                      onChange={(e) => setSelectBank(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault4"
                  
                    >
                      Paypal
                    </label>
                    <img src="../../assets/user/images/shop/payment.jpg" alt="/" />
                    <a href="javascript:void(0);">What is PayPal?</a>
                  </div>
                </div>
                <div
                  id="collapse3"
                  className="accordion-collapse collapse"
                  aria-labelledby="heading3"
                  data-bs-parent="#accordionFaq1"
                >
                  <div className="accordion-body">
                    <p className="m-b0">
                      Make your payment directly into our bank account. Please
                      use your Order ID as the payment reference. Your order
                      will not be shipped until the funds have cleared in our
                      account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our <a href="javascript:void(0);">privacy policy.</a>
            </p>
            <div className="form-group">
              <div className="custom-control custom-checkbox d-flex m-b15">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="basic_checkbox_3"
                />
                <label className="form-check-label" htmlFor="basic_checkbox_3">
                  I have read and agree to the website terms and conditions{" "}
                </label>
              </div>
            </div>
            <button href="/user/shop/shopStandard" className="btn btn-secondary w-100" onClick={saveOrder}>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Phan Modal Update */}
{editingItem && (
            <div className="modal show fade d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Chỉnh sửa sản phẩm</h5>
                    <button type="button" className="btn-close" onClick={() => setEditingItem(null)} />
                  </div>
                  <div className="modal-body">
                    <div className="d-flex gap-4">
                      <img
                        src={`https://res.cloudinary.com/dj3tvavmp/image/upload/w_150,h_150/imgProduct/IMG/${editingItem.productThumbnail}`}
                        alt={editingItem.productTitle}
                        style={{ borderRadius: 8 }}
                      />
                      <div>
                        <h6>{editingItem.productTitle}</h6>
                        {/* Size */}
                        {editingItem.sizes?.length > 0 && (
                          <>
                            <label>Chọn size:</label>
                            <div className="mb-3">
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                                {editingItem.sizes.map((size, idx) => (
                                  <label
                                    key={idx}
                                    className={`btn btn-sm ${editSize === size.sizeName ? 'btn-dark' : 'btn-outline-dark'}`}
                                    style={{
                                      minWidth: '42px',
                                      textAlign: 'center',
                                      padding: '6px 10px',
                                      borderRadius: '4px',
                                      fontSize: '14px',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    <input
                                      type="radio"
                                      className="d-none"
                                      name="sizeOptions"
                                      value={size.sizeName}
                                      checked={editSize === size.sizeName}
                                      onChange={() => setEditSize(size.sizeName)}
                                    />
                                    {size.sizeName}
                                  </label>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                        {/* Color */}
                        {editingItem.colorAsin && (
                          <>
                            <label>Chọn màu:</label>
                            <div className="d-flex gap-2 mb-3">
                              {JSON.parse(editingItem.colorAsin).map((color, i) => (
                                <div
                                  key={i}
                                  onClick={() => setEditColor(color.color_id)}
                                  title={color.name_color}
                                  style={{
                                    width: '25px',
                                    height: '25px',
                                    borderRadius: '50%',
                                    backgroundColor: color.code_color,
                                    border: editColor === color.color_id ? '2px solid black' : '1px solid #ccc',
                                    cursor: 'pointer'
                                  }}
                                />
                              ))}
                            </div>
                          </>
                        )}
                        {/* Quantity */}
                        <label>Số lượng:</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <button
                              onClick={handleDecrease}
                              style={{
                                minWidth: '36px',
                                height: '36px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                background: '#fff',
                                fontWeight: 'bold',
                                fontSize: '18px',
                                lineHeight: '1',
                                cursor: 'pointer'
                              }}
                              disabled={editQuantity <= 1}
                            >
                              −
                            </button>
                            <input
                              type="text"
                              value={editQuantity}
                              onChange={handleInputChange}
                              style={{
                                width: '42px',
                                height: '36px',
                                textAlign: 'center',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '16px'
                              }}
                            />
                            <button
                              onClick={handleIncrease}
                              style={{
                                minWidth: '36px',
                                height: '36px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                background: '#fff',
                                fontWeight: 'bold',
                                fontSize: '18px',
                                lineHeight: '1',
                                cursor: 'pointer'
                              }}
                              disabled={availableStock !== null && editQuantity >= availableStock}
                            >
                              +
                            </button>
                          </div>
                          <div style={{ marginTop: '4px', fontSize: '14px', color: availableStock !== null ? (stockStatus === 'in_stock' ? 'green' : 'red') : 'gray' }}>
  {availableStock !== null
    ? stockStatus === 'in_stock'
      ? `✅ Số lượng tồn kho: ${availableStock}`
      : '⏳ Hết hàng'
    : '⏳ Vui lòng chọn kích thước và màu sắc'}
</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setEditingItem(null)}>Huỷ</button>
                    <button
                      className="btn btn-primary"
                      onClick={async () => {
                        try {
                          const token = localStorage.getItem("accessToken") || '';
                          const cartId = localStorage.getItem("cartId") || '';
                          const price = editingItem.unitPrice;
                          await axios.put("http://localhost:8084/api/cart/updateItem", {
                            token,
                            cartId,
                            asin: editingItem.asin,
                            quantity: editQuantity,
                            price,
                            size: editSize,
                            nameColor: JSON.parse(editingItem.colorAsin).find(c => c.color_id === editColor)?.name_color
                          });
                          await getCartProductById();
                          setEditingItem(null);
                        } catch (err) {
                          console.error("❌ Lỗi cập nhật:", err);
                          alert("Không thể cập nhật sản phẩm.");
                        }
                      }}
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Footer (đã được xử lý trong App.js) */}
         <ScrollTopButton/>
        <QuickViewModal />
      </div>
    </>
  );
}

export default Checkout;