import { Role } from "@/constants/role";
import { useAuthStore } from "@/stores/useAuthStore";
import { Layout } from "antd";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import DeliveryHeader from "./DeliveryHeader";

const DeliveryLayout: React.FunctionComponent = () => {
  const profile = useAuthStore((state) => state.profile);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  const fbRoot = document.getElementById("fb-root");
  const fbCustomerChat = document.getElementById("fb-customer-chat");
  fbRoot?.remove();
  fbCustomerChat?.remove();

  return loggedIn && profile?.role === Role.DELIVERER ? (
    <Layout>
      <Layout>
        <Layout.Header className="flex items-center justify-end gap-5 px-5 bg-white border-0 border-b-2 border-solid border-neutral-100">
          <DeliveryHeader />
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

export default DeliveryLayout;
