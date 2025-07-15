// src/pages/common/HomePage.js
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'; 
import QuickViewModal from '../../components/home/QuickViewModal'; 
import ScrollTopButton from '../../layout/ScrollTopButton';
import { Link } from 'react-router-dom'; 
import WOW from 'wowjs'; // Import WOW.js
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { data, get } from 'jquery';
function Checkout() {
	const [hasBgClass, setHasBgClass] = useState(true); 
  const location = useLocation();
  const {selectedItemsCart} = location.state || {};
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
   const [selectedShipping, setSelectedShipping] = useState(0); // mặc định là Free shipping

  const handleShippingChangeShip = (e) => {
    setSelectedShipping(Number(e.target.value)); // đảm bảo là số
  };
  useEffect(() => {
    console.log(selectBank + 'selectbank');
  })
const saveOrder = async () => {
  try {
    const tokenAccess = localStorage.getItem("accessToken");
    if (!tokenAccess) {
      throw new Error("Access token is missing. Please log in.");
    }

    if (!listCartById?.items || !Array.isArray(listCartById.items)) {
      throw new Error("Cart items are invalid or empty.");
    }

    if (!addressMain) {
      throw new Error("Please select a delivery address.");
    }

    if (!totalPrice || isNaN(totalPrice)) {
      throw new Error("Total price is invalid.");
    }

    if (!selectBank) {
      throw new Error("Please select a payment method.");
    }

    const orderItemRequests = listCartById.items.map(item => {
      if (!item.productId || !item.quantity || !item.itemTotalPrice) {
        throw new Error("Invalid cart item data.");
      }
      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.itemTotalPrice,
        color: item.nameColor || "", // Xử lý nếu color là undefined
        size: item.size || "" // Xử lý nếu size là undefined
      };
    });

    const payload = {
      accessToken:tokenAccess,
      addressId: addressMain,
      orderNotes: orderNote || "", // Xử lý nếu orderNote là undefined
      totalPrice,
      orderItemRequests,
      selectBank
    };
console.log("Sending payload:", payload);
    const response = await axios.post("http://localhost:8086/api/orders/placeOrder", payload);
    console.log(response.data.message);
    // Hiển thị thông báo thành công cho người dùng
    alert(response.data.message);

  } catch (error) {
    console.error("Error saving order:", error.response?.data || error.message);
    // Hiển thị thông báo lỗi cho người dùng
    alert("Đã có lỗi khi đặt hàng: " + (error.response?.data?.error || error.message));
  }
};
useEffect(() => { 
  if (listCartById?.totalPrice) {
    setTotalPrice(listCartById.totalPrice);
  }
}, [listCartById]);
useEffect(() => {
  console.log(selectOption + 'country cua toi la');
})
    useEffect(() => {
        console.log('cc gi vay thang ngu' + addressMain);
      })
useEffect(() => {
  const tokenGetAddress = localStorage.getItem("accessToken");
  const getAddressWithUser = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/user/addressAllByUser", {
        params: {
          accessToken: tokenGetAddress,
        }
      });
  
 const addresses = response.data;
      setAddressList(addresses);
      console.log(response.data + 'data address');
      const main = addresses.find(address => address.isPrimaryAddress === 1);
      setAddressMain(main.addressId);
    }catch(error) {
      console.log(error);
    }
  };
  getAddressWithUser();
}, []);
const handleShippingChange = (e) => {
  const shippingFee = parseFloat(e.target.value);
  const basePrice = listCartById?.totalPrice || 0;
  setTotalPrice(basePrice + shippingFee);
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
    accessToken: accessToken,
    address: {
        recipientName: firstName + " " + lastName,
        recipientPhone: phone,
        recipientEmail: email,
        addressDetails: selectedProvince + ", " + selectedDistrict + ", " + ward,
        deliveryAddress: street + " / " + optionalStreet,
        isPrimaryAddress: selectOption,
    }
};
    const response = await axios.post("http://localhost:8081/api/user/addAdressWithUser", payload);
    console.log(response.data);
    console.log(payload + 'payload');
  }catch (error) {
    console.log(error)
  }
  
 }

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
useEffect(() => {
  console.log(listCartById + 'list cart me ');
})
const getCartProductById = async () => {
  const cartId = localStorage.getItem('cartId') || '';
  const token = localStorage.getItem('accessToken') || '';
  const cartSelect = token || cartId || '';
    console.log(cartSelect + 'token cua toi');

  const totalPrice = 0;


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
          itemTotalPrice: parseFloat(itemTotalPrice)
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
      getCartProductById();
  }, []);
  useEffect(() => {
  console.log("✅ listCartById updated:", listCartById);
}, [listCartById]);

  useEffect(() => {
    console.log(selectedItemsCart);
  })
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
      <div className="col-md-6 m-b30">
              <div className="address-card">

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
                  <a
                    href="account-billing-address.html"
                    className="d-block me-3"
                  >
                    <i className="fa-solid fa-pen me-2" />
                    Edit
                  </a>
                  <a href="javascript:void(0);" className="d-block me-3">
                    <i className="fa-solid fa-trash-can me-2" />
                    Remove
                  </a>
                </div>
              </div>
              
            </div>
                ))
              }
              {
                addressList.filter(address => address.isPrimaryAddress === 0)
                .map((address, index) => (
      <div className="col-md-6 m-b30">
              <div className="address-card">

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
                  <a
                    href="account-billing-address.html"
                    className="d-block me-3"
                  >
                    <i className="fa-solid fa-pen me-2" />
                    Edit
                  </a>
                  <a href="javascript:void(0);" className="d-block me-3">
                    <i className="fa-solid fa-trash-can me-2" />
                    Remove
                  </a>
                </div>
              </div>
              
            </div>
                ))
              }
 
       
            
                 {/* <div className="col-md-6 m-b30">
              <div className="address-card">
                <div className="account-address-box">
                  <h6 className="mb-3">Billing address</h6>
                  <ul>
                    <li>John Doe</li>
                    <li>Londan</li>
                    <li>Mo. 012-345-6789</li>
                    <li>johndoe@example.com</li>
                  </ul>
                </div>
                <div className="account-address-bottom">
                  <a
                    href="account-billing-address.html"
                    className="d-block me-3"
                  >
                    <i className="fa-solid fa-pen me-2" />
                    Edit
                  </a>
                  <a href="javascript:void(0);" className="d-block me-3">
                    <i className="fa-solid fa-trash-can me-2" />
                    Remove
                  </a>
                </div>
              </div>
            </div>
                 <div className="col-md-6 m-b30">
              <div className="address-card">
                <div className="account-address-box">
                  <h6 className="mb-3">Billing address</h6>
                  <ul>
                    <li>John Doe</li>
                    <li>Londan</li>
                    <li>Mo. 012-345-6789</li>
                    <li>johndoe@example.com</li>
                  </ul>
                </div>
                <div className="account-address-bottom">
                  <a
                    href="account-billing-address.html"
                    className="d-block me-3"
                  >
                    <i className="fa-solid fa-pen me-2" />
                    Edit
                  </a>
                  <a href="javascript:void(0);" className="d-block me-3">
                    <i className="fa-solid fa-trash-can me-2" />
                    Remove
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 m-b30">
              <div className="address-card">
                <div className="account-address-box">
                  <h6 className="mb-3">Shipping address</h6>
                  <ul>
                    <li>John Doe</li>
                    <li>Londan</li>
                    <li>Mo. 012-345-6789</li>
                    <li>johndoe@example.com</li>
                  </ul>
                </div>
                <div className="account-address-bottom">
                  <a
                    href="account-shipping-address.html"
                    className="d-block me-3"
                  >
                    <i className="fa-solid fa-pen me-2" />
                    Edit
                  </a>
                  <a href="javascript:void(0);" className="d-block me-3">
                    <i className="fa-solid fa-trash-can me-2" />
                    Remove
                  </a>
                </div>
              </div>
            </div> */}
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
            {/* <div className="col-md-12">
              <div className="form-group m-b25">
                <label className="label-title">Company name (optional)</label>
                <input name="dzName" required="" className="form-control" />
              </div>
            </div> */}
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
              {/* <div className="form-group m-b25">
                <label className="label-title">ZIP Code *</label>
                <input name="dzName" required="" className="form-control" />
              </div> */}
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
            {/* <div className="col-md-12">
              <div className="form-group m-b25">
                <label className="label-title">Company name (optional)</label>
                <input name="dzName" required="" className="form-control" />
              </div>
            </div> */}
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
        style={{
          padding: '5px 10px',
          backgroundColor: '#065084ff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        // onClick={() => handleEditCart(item)}
      >
        <i className="fa fa-pencil-alt" aria-hidden="true"></i>
      </button>
    </div>
  ))
) : (
  <li>🛒 Giỏ hàng trống</li>
)}
          


            
            {/* <div className="cart-item style-1 mb-0">
              <div className="dz-media">
                <img src="../../assets/user/images/shop/shop-cart/pic2.jpg" alt="/" />
              </div>
              <div className="dz-content">
                <h6 className="title mb-0">Cozy Knit Cardigan Sweater</h6>
                <span className="price">$36.00</span>
              </div>
            </div> */}
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
    <div className="custom-control custom-checkbox">
      <input
        className="form-check-input radio"
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefault1"
        value={0}
        defaultChecked 
        onChange={handleShippingChange}
        
      />
      <label className="form-check-label" htmlFor="flexRadioDefault1">
        Free shipping
      </label>
    </div>
    <div className="custom-control custom-checkbox">
      <input
        className="form-check-input radio"
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefault2"
        value={25.75}
        onChange={handleShippingChange}
      />
      <label className="form-check-label" htmlFor="flexRadioDefault2">
        Flat Rate:
      </label>
    </div>
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
            <button href="shop-checkout.html" className="btn btn-secondary w-100" onClick={saveOrder}>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Footer (đã được xử lý trong App.js) */}
         <ScrollTopButton/>
        <QuickViewModal />
      </div>
    </>
  );
}

export default Checkout;