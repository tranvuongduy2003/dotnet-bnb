import { Button, Typography } from "antd";
import React from "react";
import CartTable from "./components/CartTable";

const CartPage: React.FunctionComponent = () => {
  return (
    <div className="py-12 px-80">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Shopping cart
      </Typography.Title>
      <div className="mt-8">
        <CartTable />
      </div>
    </div>
  );
};

export default CartPage;
