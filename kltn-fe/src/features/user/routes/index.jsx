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
import PortfolioDetails1 from '../pages/portfolio/PortfolioDetails1';
import Login from '../pages/auth/Login';
import Registration from '../pages/auth/Registration';
import ForgetPassword from '../pages/auth/ForgetPassword';
import AboutUs from '../pages/about/AboutUs';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/registration" element={<Registration />} />
        <Route path="auth/forgetPassword" element={<ForgetPassword />} />
        <Route path="productstructure/productDetail" element={<ProductDetail />} />
        <Route path="shop/shopWithCategory" element={<ShopWithCategory />} />
        <Route path="myaccount/address" element={<Address />} />
        <Route path="myaccount/billingAddress" element={<BillingAddress />} />
        <Route path="myaccount/cancellationRequests" element={<CancellationRequests />} />
        <Route path="myaccount/dashboard" element={<Dashboard />} />
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
        <Route path="portfolio/portfolioDetails/portfolioDetails1" element={<PortfolioDetails1 />} />
        <Route path="portfolio/portfolioTiles" element={<PortfolioTiles />} />
        <Route path="about/aboutUs" element={<AboutUs />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
