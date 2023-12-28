import React from "react";
import { Route, Routes } from "react-router-dom";

import NotFoundPage from "@/pages/NotFoundPage";
import ClientManagementPage from "@/pages/admin/ClientManagementPage/ClientManagementPage";
import DashboardPage from "@/pages/admin/DashboardPage/DashboardPage";
import ProductManagementPage from "@/pages/admin/ProductManagementPage/ProductManagementPage";
import SettingsPage from "@/pages/admin/SettingsPage/SettingsPage";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import CartPage from "@/pages/client/CartPage/CartPage";
import CheckoutConfirmationPage from "@/pages/client/CheckoutPage/CheckoutConfirmationPage/CheckoutConfirmationPage";
import CheckoutPage from "@/pages/client/CheckoutPage/CheckoutPage";
import OrderHistoryPage from "@/pages/client/OrderHistoryPage/OrderHistoryPage";
import ProductDetailPage from "@/pages/client/ProductsPage/ProductDetailPage/ProductDetailPage";
import ProductsPage from "@/pages/client/ProductsPage/ProductsPage";
import ProfilePage from "@/pages/client/ProfilePage/ProfilePage";
import OrderManagementPage from "@/pages/delivery/OrderManagementPage/OrderManagementPage";

import AuthProtectedRoute from "@/layout/AuthProtectedRoute";
import AdminLayout from "@/layout/admin/AdminLayout";
import UserLayout from "@/layout/client/UserLayout";
import DeliveryLayout from "@/layout/delivery/DeliveryLayout";
import SplashLayout from "./layout/SplashLayout";

const App: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route>
        {/* Auth Route */}
        <Route element={<AuthProtectedRoute />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/sign-up" element={<SignupPage />} />
        </Route>

        <Route element={<SplashLayout />}>
          {/* Products */}
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>

        {/* User Routes */}
        <Route element={<UserLayout />}>
          {/* Profile */}
          <Route path="/profile" element={<ProfilePage />} />
          {/* Order */}
          <Route path="/orders" element={<OrderHistoryPage />} />
          {/* Checkout */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/checkout/confirmation"
            element={<CheckoutConfirmationPage />}
          />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Delivery Routes */}
        <Route element={<DeliveryLayout />}>
          {/* Products */}
          <Route
            path="/delivery/order-management"
            element={<OrderManagementPage />}
          />
          <Route path="/delivery/settings" element={<SettingsPage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route
            path="/admin/product-management"
            element={<ProductManagementPage />}
          />
          <Route
            path="/admin/client-management"
            element={<ClientManagementPage />}
          />
          <Route path="/admin/settings" element={<SettingsPage />} />
        </Route>
        {/* Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
