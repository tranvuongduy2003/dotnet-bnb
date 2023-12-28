import { ShoppingCartOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";
import OrdersTable from "./OrdersTable";
import { ICart } from "@/interfaces/ICart";

interface IOrderSummaryProps {
  data: ICart[];
}

const OrderSummary: React.FunctionComponent<IOrderSummaryProps> = ({
  data,
}) => {
  return (
    <div className="border border-solid rounded p-7 border-neutral-200">
      <Typography.Title
        level={4}
        style={{ margin: 0, marginBottom: 20 }}
        className="flex items-center gap-2"
      >
        <ShoppingCartOutlined />
        <span>Order summary</span>
      </Typography.Title>
      <OrdersTable data={data} />
    </div>
  );
};

export default OrderSummary;
