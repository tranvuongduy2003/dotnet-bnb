import { Role } from "@/constants/role";
import { useAuthStore } from "@/stores/useAuthStore";
import { Layout } from "antd";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../client/Sidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout: React.FunctionComponent = () => {
  const profile = useAuthStore((state) => state.profile);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  const fbRoot = document.getElementById("fb-root");
  const fbCustomerChat = document.getElementById("fb-customer-chat");
  fbRoot?.remove();
  fbCustomerChat?.remove();

  return loggedIn && profile?.role === Role.ADMIN ? (
    <Layout>
      <Layout.Sider className="!fixed top-0 !w-64 !max-w-full h-screen">
        <Sidebar />
      </Layout.Sider>
      <Layout className="pl-[256px]">
        <Layout.Header className="flex items-center justify-end gap-5 px-5 bg-white border-0 border-b-2 border-solid border-neutral-100">
          <AdminHeader />
        </Layout.Header>
        <Layout.Content className="bg-white">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default AdminLayout;
