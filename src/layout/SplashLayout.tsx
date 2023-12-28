import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./client/Header";

const SplashLayout: React.FunctionComponent = () => {
  return (
    <Layout>
      <Layout.Header className="flex items-center px-6 bg-white border-0 border-b-2 border-solid border-neutral-100">
        <Header />
      </Layout.Header>
      <Layout.Content className="bg-white">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default SplashLayout;
