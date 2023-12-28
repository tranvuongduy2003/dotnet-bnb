import { Role } from "@/constants/role";
import { useAuthStore } from "@/stores/useAuthStore";
import { Layout } from "antd";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";

const UserLayout: React.FunctionComponent = () => {
  const profile = useAuthStore((state) => state.profile);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  return loggedIn && profile?.role === Role.CUSTOMER ? (
    <Layout>
      <Layout.Header className="flex items-center px-6 bg-white border-0 border-b-2 border-solid border-neutral-100">
        <Header />
      </Layout.Header>
      <Layout.Content className="bg-white">
        <Outlet />
      </Layout.Content>
    </Layout>
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default UserLayout;
