import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "../layout/RootLayout";

import Home from "../pages/Home";
import Collection from "../pages/Collection";
import Product from "../pages/Product";
import TradeIn from "../pages/TradeIn";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";

import CheckoutLayout from "../pages/checkout/CheckoutLayout";
import Step1Address from "../pages/checkout/Step1Address";
import Step2Delivery from "../pages/checkout/Step2Delivery";
import Step3Payment from "../pages/checkout/Step3Payment";
import Step4Confirm from "../pages/checkout/Step4Confirm";

// Account
import AccountLayout from "../pages/account/AccountLayout";
import Login from "../pages/account/Login";
import Register from "../pages/account/Register";
import ResetPassword from "../pages/account/ResetPassword";
import Orders from "../pages/account/Orders";
import Addresses from "../pages/account/Addresses";
import Profile from "../pages/account/Profile";
import Wallet from "../pages/account/Wallet";

// Admin
import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "../pages/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/Products";
import AdminCategories from "../pages/admin/Categories";
import AdminOrders from "../pages/admin/Orders";
import AdminUsers from "../pages/admin/Users";
import AdminTradeIns from "../pages/admin/TradeIns";
import AdminPromotions from "../pages/admin/Promotions";

import RequireAdmin from "../components/RequireAdmin";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop/:category?/:subcategory?" element={<Collection />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/trade-in" element={<TradeIn />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<CheckoutLayout />}>
          <Route index element={<Step1Address />} />
          <Route path="delivery" element={<Step2Delivery />} />
          <Route path="payment" element={<Step3Payment />} />
          <Route path="confirm" element={<Step4Confirm />} />
        </Route>

        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<Navigate to="/account/orders" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset" element={<ResetPassword />} />
          <Route path="orders" element={<Orders />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="profile" element={<Profile />} />
          <Route path="wallet" element={<Wallet />} />
        </Route>
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="trade-ins" element={<AdminTradeIns />} />
          <Route path="promotions" element={<AdminPromotions />} />
        </Route>
      </Route>
    </Routes>
  );
}
