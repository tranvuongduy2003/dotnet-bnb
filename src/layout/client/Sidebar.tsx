import {
  AppstoreOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "/admin/dashboard",
      onClick: () => navigate("/admin/dashboard"),
      icon: <AppstoreOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/client-management",
      onClick: () => navigate("/admin/client-management"),
      icon: <TeamOutlined />,
      label: "Clients",
    },
    {
      key: "/admin/product-management",
      onClick: () => navigate("/admin/product-management"),
      icon: <ShoppingCartOutlined />,
      label: "Products",
    },
    // {
    //   key: "/admin/messaging",
    //   onClick: () => navigate("/admin/messaging"),
    //   icon: <BellOutlined />,
    //   label: "Messages",
    // },
    {
      key: "/admin/settings",
      onClick: () => navigate("/admin/settings"),
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

  const location = useLocation();

  return (
    <div className="w-full h-full px-10 bg-white border-0 border-r-2 border-solid border-neutral-100 py-11">
      <div className="flex mb-7 gap-x-3">
        <div
          className="cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <img src="/assets/logo.png" alt="logo" />
        </div>
        <div className="flex flex-col justify-start gap-4">
          <span className="text-lg font-medium">BnB</span>
          <span className="text-xs text-neutral-600">Beauty in Bloom</span>
        </div>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        selectedKeys={[location.pathname]}
        items={items}
        className="!border-none"
      />
    </div>
  );
};

export default Sidebar;
