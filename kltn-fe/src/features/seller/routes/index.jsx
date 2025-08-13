// src/features/admin/routes/index.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import AdminDashboard from '../pages/adminDashboard/AdminDashboard';
import UserDashboard from '../pages/adminDashboard/UserDashboard';
import Login from '../pages/authentication/Login';
import MyProfile from '../pages/authentication/MyProfile';
import RecoverPassword from '../pages/authentication/RecoverPassword';
import Register from '../pages/authentication/Register';
import Buttons from '../pages/buttons/Buttons';
import Calendar from '../pages/calendar/Calendar';
import Customer from '../pages/customer/Customer';
import Documentation from '../pages/documentation/Documentation';
import Chat from '../pages/email/Chat';
import Inbox from '../pages/email/Inbox';
import FontAwesome from '../pages/fontAwesome/FontAwesome';
import BasicForm from '../pages/form/BasicForm';
import Tags from '../pages/form/Tags';
import Cards from '../pages/general/Cards';
import Cart from '../pages/general/Cart';
import Checkout from '../pages/general/Checkout';
import Error404 from '../pages/general/Error404';
import Faq from '../pages/general/Faq';
import ProductSingle from '../pages/general/ProductSingle';
import Starter from '../pages/general/Starter';
import WishList from '../pages/general/Wishlist';
import Invoice from '../pages/invoice/Invoice';
import GoogleMap from '../pages/map/GoogleMap';
import VectorMap from '../pages/map/VectorMap';
import Order from '../pages/order/Order';
import AllProduct from '../pages/product/AllProduct';
import Support from '../pages/support/Support';
import AdvanceTable from '../pages/table/AdvanceTable';
import BasicTable from '../pages/table/BasicTable';
import DataTable from '../pages/table/DataTable';
import Accordation from '../pages/uiKit/Accordation';
import Alert from '../pages/uiKit/Alert';
import Carousal from '../pages/uiKit/Carousal';
import Counter from '../pages/uiKit/Counter';
import Editor from '../pages/uiKit/Editor';
import Modal from '../pages/uiKit/Modal';
import Pagination from '../pages/uiKit/Pagination';
import ProgressBars from '../pages/uiKit/ProgressBars';
import Tabs from '../pages/uiKit/Tabs';
import Typography from '../pages/uiKit/Typography';
import Chart from '../pages/chart/Chart';
import CreateShop from '../pages/shop/CreateShop'
import AddProduct from '../pages/product/AddProduct'
import ActionProduct from '../pages/product/ActionProduct'
import InventoryProduct from '../pages/inventory/InventoryProduct';
import ProductVariantPage from '../pages/inventory/ProductVariantPage';
import AddProductVariant from '../pages/inventory/AddProductVariant';
import SellerCommentsDashboard from '../pages/review/SellerCommentsDashboard';
import ProductReviewManagement from '../pages/review/ProductReviewManagement';
import SellerLocked from '../pages/notification/SellerLocked';
import SellerPending from '../pages/notification/SellerPending';
const SellerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard/userDashboard" element={<UserDashboard />} />
        <Route path="authentication/login" element={<Login />} />
        <Route path="authentication/register" element={<Register />} />
        <Route path="authentication/myProfile" element={<MyProfile />} />
        <Route path="authentication/setting" element={<MyProfile />} />
        <Route path="authentication/recoverPassword" element={<RecoverPassword />} />
        <Route path="buttons/buttons" element={<Buttons />} />
        <Route path="calendar/calendar" element={<Calendar />} />
        <Route path="evaluate/evaluateSeller" element={<Customer />} />
        <Route path="documentation/documentation" element={<Documentation />} />
        <Route path="email/chat" element={<Chat />} />
        <Route path="email/inbox" element={<Inbox />} />
        <Route path="fontawasome/fontAwasome" element={<FontAwesome />} />
        <Route path="form/basicForm" element={<BasicForm />} />
        <Route path="form/tags" element={<Tags />} />
        <Route path="general/cards" element={<Cards />} />
        <Route path="general/cart" element={<Cart />} />
        <Route path="general/checkout" element={<Checkout />} />
        <Route path="general/error404" element={<Error404 />} />
        <Route path="general/faq" element={<Faq />} />
        <Route path="general/productSingle" element={<ProductSingle />} />
        <Route path="general/starter" element={<Starter />} />
        <Route path="general/wishlist" element={<WishList />} />
        <Route path="invoice/invoice" element={<Invoice />} />
        <Route path="map/googleMap" element={<GoogleMap />} />
        <Route path="map/vectorMap" element={<VectorMap />} />
        <Route path="order/order" element={<Order />} />
        <Route path="product/allProduct" element={<AllProduct />} />
        <Route path="inventory/inventoryProduct" element={<InventoryProduct />} />
        <Route path="inventory/product/:productId/variants" element={<ProductVariantPage />} />
        <Route path="/inventory/product/:asin/variants/add" element={<AddProductVariant />} />
        <Route path="support/support" element={<Support />} />
        <Route path="table/advanceTable" element={<AdvanceTable />} />
        <Route path="table/basicTable" element={<BasicTable />} />
        <Route path="table/dataTable" element={<DataTable />} />
        <Route path="uikit/accordation" element={<Accordation />} />
        <Route path="uikit/alert" element={<Alert />} />
        <Route path="uikit/carousal" element={<Carousal />} />
        <Route path="uikit/counter" element={<Counter />} />
        <Route path="uikit/editor" element={<Editor />} />
        <Route path="uikit/modal" element={<Modal />} />
        <Route path="uikit/pagination" element={<Pagination />} />
        <Route path="uikit/progressBars" element={<ProgressBars />} />
        <Route path="uikit/tabs" element={<Tabs />} />
        <Route path="uikit/typography" element={<Typography />} />
        <Route path="chart/chart" element={<Chart />} />
        <Route path="shop/createShop" element={<CreateShop />} />
        <Route path="product/AddProduct" element={<AddProduct />} />
        <Route path="/product/ActionProduct/:asin" element={<ActionProduct />} />
        <Route path="comments" element={<SellerCommentsDashboard />} />
        <Route path="comments/product/:asin" element={<ProductReviewManagement/>} />
        <Route path="notification/locked" element={<SellerLocked />} />
        <Route path="notification/pending" element={<SellerPending />} />
      </Route>
    </Routes>
  );
};

export default SellerRoutes;
