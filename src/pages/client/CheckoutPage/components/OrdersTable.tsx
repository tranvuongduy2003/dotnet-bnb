import { ICart } from "@/interfaces/ICart";
import { Col, Row } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IOrdersTableProps {
  data: ICart[];
}

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
  },
  {
    title: "Total",
    render: (value, record, index) => (
      <span>{`${new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(record.quantity * JSON.parse(record.price as string))}`}</span>
    ),
  },
];

const OrdersTable: React.FunctionComponent<IOrdersTableProps> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Table
        rowKey={"id"}
        columns={columns}
        pagination={false}
        dataSource={data}
      />
    </div>
  );
};

export default OrdersTable;
