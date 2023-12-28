import { Role } from "@/constants/role";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { logOut } from "@/utils/auth";
import {
  BarsOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Menu,
  MenuProps,
  Popover,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const profile = useAuthStore((state) => state.profile);
  const cart = useCartStore((state) => state.cart);
  const loggedIn = useAuthStore((state) => state.loggedIn);

  const items: MenuProps["items"] = [
    {
      key: "/settings",
      icon: <SettingOutlined />,
      onClick: () => {
        if (profile?.role === Role.ADMIN) {
          navigate("/admin/settings");
        } else if (profile?.role === Role.DELIVERER) {
          navigate("/delivery/settings");
        } else {
          navigate("/settings");
        }
        setOpen(!open);
      },
      label: "Settings",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      onClick: () => {
        setOpen(!open);
        logOut();
      },
      label: "Logout",
    },
  ];

  if (profile?.role === Role.CUSTOMER) {
    items.unshift({
      key: "/orders",
      icon: <BarsOutlined />,
      onClick: () => {
        navigate("/orders");
        setOpen(!open);
      },
      label: "Orders",
    });
  }

  return (
    <div className="flex justify-between w-full">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/assets/logo.png" alt="logo" className="w-9 h-9" />
        <Typography.Title level={3} style={{ margin: 0 }}>
          Beauty in Bloom
        </Typography.Title>
      </div>
      {/* <div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[""]}
          selectedKeys={[location.pathname]}
          items={items}
        />
      </div> */}
      <div className="flex items-center gap-5">
        <Badge count={cart.length} size="default">
          <div
            className="text-xl cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCartOutlined />
          </div>
        </Badge>
        {loggedIn ? (
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
                src={profile?.avatar ? profile.avatar : "/assets/avatar.png"}
                size={36}
                className="cursor-pointer"
              />
            </Popover>
          </div>
        ) : (
          <>
            <Button
              type="primary"
              className="shadow-none bg-neutral-200 text-neutral-700"
              onClick={() => navigate("/auth/sign-up")}
            >
              Sign up
            </Button>
            <Button
              type="primary"
              className="shadow-none bg-primary"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
