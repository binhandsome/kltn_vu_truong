// src/features/user/routes/index.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import HomePage from '../layout/HomePage';
import ShopWithCategory from '../pages/shop/ShopWithCategory';
import ProductDetail from '../pages/productstructure/ProductDetail';
import Address from '../pages/myaccount/Address';
import BillingAddress from '../pages/myaccount/BillingAddress';
import CancellationRequests from '../pages/myaccount/CancellationRequests';
import Dashboard from '../pages/myaccount/Dashboard';
import Download from '../pages/myaccount/Download';
import Orders from '../pages/myaccount/Orders';
import OrdersConfimation from '../pages/myaccount/OrdersConfimation';
import OrdersDetails from '../pages/myaccount/OrdersDetails';
import PaymentMethods from '../pages/myaccount/PaymentMethods';
import Profile from '../pages/myaccount/Profile';
import ReturnRequest from '../pages/myaccount/ReturnRequest';
import ReturnRequestConfirmed from '../pages/myaccount/ReturnRequestConfirmed';
import ReturnRequestDetail from '../pages/myaccount/ReturnRequestDetail';
import Review from '../pages/myaccount/Review';
import ShippingAddress from '../pages/myaccount/ShippingAddress';
import ShippingMethods from '../pages/myaccount/ShippingMethods';
import Cart from '../pages/shoppages/Cart';
import Checkout from '../pages/shoppages/Checkout';
import Compare from '../pages/shoppages/Compare';
import OrderTracking from '../pages/shoppages/OrderTracking';
import WishList from '../pages/shoppages/WishList';
import PostStandard from '../pages/blog/blogdetails/PostStandard';
import PortfolioTiles from '../pages/portfolio/PortfolioTiles';
import PortfolioDetails from '../pages/portfolio/PortfolioDetails';
import Login from '../pages/auth/Login';
import ChangePassword from '../pages/auth/ChangePassword';
import Registration from '../pages/auth/Registration';
import ForgetPassword from '../pages/auth/ForgetPassword';
import AboutUs from '../pages/about/AboutUs';
import ShopFiltersTopBar from '../pages/shop/ShopFiltersTopBar';
import ShopList from '../pages/shop/ShopList';
import ShopSideBar from '../pages/shop/ShopSideBar';
import ShopStyle1 from '../pages/shop/ShopStyle1';
import ShopStyle2 from '../pages/shop/ShopStyle2';
import ShopStandard from '../pages/shop/ShopStandard';

import RequireAuth from '../components/RequireAuth';
import NoAuthOnly from '../components/NoAuthOnly';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        
        {/* ⛔ Cấm vào nếu đã đăng nhập */}
        <Route
          path="auth/login"
          element={
            <NoAuthOnly>
              <Login />
            </NoAuthOnly>
          }
        />
        <Route
          path="auth/forgetPassword"
          element={
            <NoAuthOnly>
              <ForgetPassword />
            </NoAuthOnly>
          }
        />

        {/* ✅ Chỉ vào được nếu đã đăng nhập */}
        <Route
          path="myaccount/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
  path="myaccount/changePassword"
  element={
    <RequireAuth>
      <ChangePassword />
    </RequireAuth>
  }
/>

        {/* Các route còn lại giữ nguyên */}
        <Route path="auth/registration" element={<Registration />} />
        <Route path="productstructure/productDetail" element={<ProductDetail />} />
        <Route path="shop/shopWithCategory" element={<ShopWithCategory />} />
        <Route path="myaccount/address" element={<Address />} />
        <Route path="myaccount/billingAddress" element={<BillingAddress />} />
        <Route path="myaccount/cancellationRequests" element={<CancellationRequests />} />
        <Route path="myaccount/download" element={<Download />} />
        <Route path="myaccount/orders" element={<Orders />} />
        <Route path="myaccount/ordersConfimation" element={<OrdersConfimation />} />
        <Route path="myaccount/ordersDetails" element={<OrdersDetails />} />
        <Route path="myaccount/paymentMethods" element={<PaymentMethods />} />
        <Route path="myaccount/profile" element={<Profile />} />
        <Route path="myaccount/returnRequest" element={<ReturnRequest />} />
        <Route path="myaccount/returnRequestConfirmed" element={<ReturnRequestConfirmed />} />
        <Route path="myaccount/returnRequestDetail" element={<ReturnRequestDetail />} />
        <Route path="myaccount/review" element={<Review />} />
        <Route path="myaccount/shippingAddress" element={<ShippingAddress />} />
        <Route path="myaccount/shippingMethods" element={<ShippingMethods />} />
        <Route path="shoppages/cart" element={<Cart />} />
        <Route path="shoppages/checkout" element={<Checkout />} />
        <Route path="shoppages/compare" element={<Compare />} />
        <Route path="shoppages/orderTracking" element={<OrderTracking />} />
        <Route path="shoppages/wishList" element={<WishList />} />
        <Route path="blog/blogdetails/postStandard" element={<PostStandard />} />
        <Route path="portfolio/portfolioDetails" element={<PortfolioDetails />} />
        <Route path="portfolio/portfolioTiles" element={<PortfolioTiles />} />
        <Route path="about/aboutUs" element={<AboutUs />} />
        <Route path="shop/shopFiltersTopBar" element={<ShopFiltersTopBar />} />
        <Route path="shop/shopList" element={<ShopList />} />
        <Route path="shop/shopSidebar" element={<ShopSideBar />} />
        <Route path="shop/shopStyle1" element={<ShopStyle1 />} />
        <Route path="shop/shopStyle2" element={<ShopStyle2 />} />
        <Route path="shop/shopStandard" element={<ShopStandard />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
