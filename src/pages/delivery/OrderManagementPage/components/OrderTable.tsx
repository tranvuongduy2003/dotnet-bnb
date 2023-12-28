import StatusTag from "@/components/StatusTag";
import { Status } from "@/constants/status";
import { IOrder } from "@/interfaces/IOrder";
import { useOrdersStore } from "@/stores/useOrderStore";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Space, Table } from "antd";
import {
  ColumnType,
  ColumnsType,
  FilterConfirmProps,
} from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import EditOrderModal from "./EditOrderModal";

type DataIndex = keyof IOrder;

const OrderTable: React.FunctionComponent = () => {
  const [show, setShow] = useState<boolean>(false);
  const [edittedOrder, setEdittedOrder] = useState<IOrder>();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const orders = useOrdersStore((state) => state.orders);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IOrder> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<IOrder> = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
      render: (value, record, index) => (
        <span className="font-medium">{value}</span>
      ),
    },
    {
      title: "Recipient name",
      dataIndex: "receiptName",
      key: "receiptName",
      width: "20%",
      ...getColumnSearchProps("receiptName"),
    },
    {
      title: "Phone",
      dataIndex: "receiptPhone",
      key: "receiptPhone",
      width: "15%",
      render: (value, record, index) => <span>{value}</span>,
    },
    {
      title: "Address",
      dataIndex: "receiptAddress",
      key: "receiptAddress",
      width: "20%",
      render: (value, record, index) => <span>{value}</span>,
      ...getColumnSearchProps("receiptAddress"),
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: "15%",
      sorter: (a: IOrder, b: IOrder) =>
        a.OrderItemModels.map((item) => JSON.parse(item.sumPrice)).reduce(
          (prev, cur) => prev + cur,
          0
        ) -
        b.OrderItemModels.map((item) => JSON.parse(item.sumPrice)).reduce(
          (prev, cur) => prev + cur,
          0
        ),
      sortDirections: ["descend", "ascend"],
      render: (value, record, index) => (
        <span>{`${new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(
          record.OrderItemModels.map((item) =>
            JSON.parse(item.sumPrice)
          ).reduce((prev, cur) => prev + cur, 0)
        )}`}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      filters: [
        {
          text: Status.CANCELLED,
          value: Status.CANCELLED,
        },
        {
          text: Status.DELIVERED,
          value: Status.DELIVERED,
        },
        {
          text: Status.PENDING,
          value: Status.PENDING,
        },
      ],
      onFilter: (value: any, record: IOrder) => record.status === value,
      render: (value, record, index) => (
        <span>
          <StatusTag value={value} />
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "edit",
      key: "edit",
      width: "10%",
      render: (value, record, index) =>
        record.status !== Status.CANCELLED && (
          <span
            className="cursor-pointer text-primary"
            onClick={() => {
              setEdittedOrder(record);
              setShow(true);
            }}
          >
            Edit
          </span>
        ),
    },
  ];

  return (
    <>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={orders}
        pagination={{
          pageSize: 6,
          position: ["bottomCenter"],
        }}
        scroll={{ x: true }}
        className="mb-10"
      />
      {show && edittedOrder && (
        <EditOrderModal show={show} setShow={setShow} data={edittedOrder} />
      )}
    </>
  );
};

export default OrderTable;
