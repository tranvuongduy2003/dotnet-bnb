import { OrderItemModel } from "@/interfaces/IOrder";
import { useProductStore } from "@/stores/useProductStore";
import { Button, Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProductOrderItemProps {
  data: OrderItemModel;
}

const ProductOrderItem: React.FunctionComponent<IProductOrderItemProps> = ({
  data,
}) => {
  const navigate = useNavigate();

  return (
    <Row gutter={20} align={"middle"}>
      <Col>
        <img
          src={data.productImage}
          alt="product image"
          className="object-cover h-32 rounded-md w-36"
        />
      </Col>
      <Col flex={1} className="flex flex-col justify-center">
        <span className="text-sm font-semibold text-neutral-900">
          {data.productName}
        </span>
        <span className="mb-2 text-xs leading-5 text-neutral-500">
          {`Quantity: ${data.quantity}`}
        </span>
        <span className="text-sm font-medium text-neutral-900">{`${new Intl.NumberFormat(
          "vi-VN",
          {
            style: "currency",
            currency: "VND",
          }
        ).format(JSON.parse(data.sumPrice))}`}</span>
      </Col>
      <Col className="flex flex-col items-stretch gap-3">
        <Button
          onClick={() => navigate(`/product/${data.id}`)}
          type="primary"
          className="shadow-none bg-primary-500"
        >
          Buy again
        </Button>
        <Button
          onClick={() => navigate(`/product/${data.id}`)}
          type="primary"
          className="shadow-none bg-neutral-200 text-neutral-600"
        >
          View product
        </Button>
      </Col>
    </Row>
  );
};

export default ProductOrderItem;
