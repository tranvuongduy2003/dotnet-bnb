import { useAuthStore } from "@/stores/useAuthStore";
import { logOut } from "@/utils/auth";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Menu, MenuProps, Popover, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeliveryHeader: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const profile = useAuthStore((state) => state.profile);

  const items: MenuProps["items"] = [
    {
      key: "/admin/settings",
      icon: <SettingOutlined />,
      onClick: () => {
        navigate("/delivery/settings");
        setOpen(!open);
      },
      label: "Settings",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      onClick: () => {
        logOut();
        setOpen(!open);
      },
      label: "Logout",
    },
  ];

  return (
    <div className="flex items-center justify-between w-full">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/delivery/order-management")}
      >
        <img src="/assets/logo.png" alt="logo" className="w-9 h-9" />
        <Typography.Title level={3} style={{ margin: 0 }}>
          Beauty in Bloom
        </Typography.Title>
      </div>
      <Popover
        content={
          <Menu
            mode="vertical"
            items={items}
            className="!border-none"
            selectedKeys={[""]}
          />
        }
        trigger="click"
        placement="bottomLeft"
        open={open}
        onOpenChange={() => setOpen(!open)}
      >
        <Avatar
          src={profile?.avatar ? profile.avatar : "https://picsum.photos/200"}
          size={36}
          className="cursor-pointer"
        />
      </Popover>
    </div>
  );
};

export default DeliveryHeader;
