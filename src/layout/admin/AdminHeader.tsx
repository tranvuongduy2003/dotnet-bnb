import { useAuthStore } from "@/stores/useAuthStore";
import { logOut } from "@/utils/auth";
import {
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, MenuProps, Popover } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminHeader: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const profile = useAuthStore((state) => state.profile);

  const items: MenuProps["items"] = [
    {
      key: "/admin/settings",
      icon: <SettingOutlined />,
      onClick: () => {
        navigate("/admin/settings");
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
    <div>
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

export default AdminHeader;
