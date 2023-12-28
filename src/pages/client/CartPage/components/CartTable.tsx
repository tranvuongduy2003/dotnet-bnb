import { ICart } from "@/interfaces/ICart";
import { useCartStore } from "@/stores/useCartStore";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Typography } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartTable: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);

  const columns: ColumnsType<ICart> = [
    {
      title: "Name",
      render: (value, record, index) => {
        return (
          <Row gutter={20} align={"middle"}>
            <Col>
              <img
                src={record.images[0]}
                alt="item image"
                className="w-24 h-16 rounded-md"
              />
            </Col>
            <Col className="flex flex-col justify-center flex-1">
              <span className="text-sm font-medium leading-6 text-neutral-900">
                {record.name}
              </span>
            </Col>
          </Row>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (value) => (
        <span>{`${new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value)}`}</span>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (value, record, index) => (
        <Button.Group>
          <Button onClick={() => updateItemQuantity(record.id, value - 1)}>
            <MinusOutlined />
          </Button>
          <Input
            value={cart[index].quantity}
            className="w-12 text-center rounded-none"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = JSON.parse(event.target.value);
              if (value > 0) {
                updateItemQuantity(record.id, value);
              }
            }}
          />
          <Button onClick={() => updateItemQuantity(record.id, value + 1)}>
            <PlusOutlined />
          </Button>
        </Button.Group>
      ),
    },
    {
      title: "Total",
      render: (value, record, index) => (
        <span>{`${new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(
          cart[index].quantity * JSON.parse(record.price as string)
        )}`}</span>
      ),
    },
    {
      render: (value, record, index) => (
        <Button type="text" danger onClick={() => removeFromCart(record.id)}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <Table
        rowKey={"id"}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        pagination={false}
        dataSource={cart}
      />
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center gap-5">
          <Typography.Title level={3} style={{ margin: 0 }}>
            Total price:
          </Typography.Title>
          <Typography.Title level={3} style={{ margin: 0, fontWeight: 400 }}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(
              cart.reduce(
                (prev, cur) =>
                  prev + cur.quantity * JSON.parse(cur.price as string),
                0
              )
            )}
          </Typography.Title>
        </div>
        <Button
          disabled={selectedRowKeys.length <= 0}
          type="primary"
          size="large"
          className="bg-primary"
          onClick={() =>
            navigate("/checkout", {
              state: {
                orders: cart.filter((item) =>
                  selectedRowKeys.includes(item.id)
                ),
              },
            })
          }
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartTable;
