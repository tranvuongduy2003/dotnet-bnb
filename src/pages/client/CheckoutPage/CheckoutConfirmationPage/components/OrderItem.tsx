import { Col, Row } from "antd";
import React from "react";

interface OrderItemProps {
  image: string;
  name: string;
  desc: string;
  quantity: number;
  price: number;
}

const OrderItem: React.FunctionComponent<OrderItemProps> = ({
  image,
  name,
  desc,
  quantity,
  price,
}) => {
  return (
    <Row align={"middle"} gutter={16}>
      <Col>
        <img src={image} alt="item image" className="w-40 h-24 rounded-sm" />
      </Col>
      <Col className="flex flex-col items-start flex-1">
        <span className="text-base font-semibold text-neutral-700">{name}</span>
        <span className="mb-2 text-xs text-neutral-500">{desc}</span>
        <span className="px-2 py-1 text-xs rounded-full text-neutral-700 bg-neutral-200">
          {`x${quantity} Items`}
        </span>
      </Col>
      <Col>
        <span className="text-sm font-semibold text-neutral-900">{`${new Intl.NumberFormat(
          "vi-VN",
          {
            style: "currency",
            currency: "VND",
          }
        ).format(price)}`}</span>
      </Col>
    </Row>
  );
};

export default OrderItem;
