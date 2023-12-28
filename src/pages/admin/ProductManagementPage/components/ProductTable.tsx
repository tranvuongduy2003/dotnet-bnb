import CategoryTag from "@/components/CategoryTag";
import { IProduct } from "@/interfaces/IProduct";
import { useBrandStore } from "@/stores/useBrandStore";
import { useProductStore } from "@/stores/useProductStore";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Rate, Space, Table } from "antd";
import {
  ColumnType,
  ColumnsType,
  FilterConfirmProps,
} from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import EditProductModal from "./EditProductModal";

type DataIndex = keyof IProduct;

const ProductTable: React.FunctionComponent = () => {
  const [show, setShow] = useState<boolean>(false);
  const [edittedProduct, setEdittedProduct] = useState<IProduct>();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const products = useProductStore((state) => state.products);
  const brands = useBrandStore((state) => state.brands);

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

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<IProduct> => ({
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
    onFilter: (value, record) =>
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

  const columns: ColumnsType<IProduct> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      ...getColumnSearchProps("name"),
      render: (value, record, index) => (
        <span className="font-medium">{value}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      width: "20%",
    },
    {
      title: "Brand",
      dataIndex: "brandId",
      key: "brandId",
      width: "10%",
      render: (value, record, index) => {
        const brand = brands.find((item) => item.id === value);

        return <span>{brand?.name}</span>;
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "10%",
      render: (value, record, index) => (
        <div>
          <CategoryTag value={record.categoryId} />
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "10%",
      sorter: (a: any, b: any) => a - b,
      sortDirections: ["descend", "ascend"],
      render: (value, record, index) => (
        <span>{`${new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value)}`}</span>
      ),
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      width: "5%",
      sorter: (a: any, b: any) => a - b,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Inventory",
      dataIndex: "inventory",
      key: "inventory",
      width: "5%",
      sorter: (a: any, b: any) => a - b,
      sortDirections: ["descend", "ascend"],
      render: (value, record, index) => record.inventory,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: "15%",
      sorter: (a: any, b: any) => a - b,
      sortDirections: ["descend", "ascend"],
      render: (value, record, index) => (
        <Rate allowHalf disabled defaultValue={value} />
      ),
    },
    {
      title: "",
      dataIndex: "edit",
      key: "edit",
      width: "5%",
      render: (value, record, index) => (
        <span
          className="cursor-pointer text-primary"
          onClick={() => {
            setEdittedProduct(record);
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
        dataSource={products}
        pagination={{
          pageSize: 6,
          position: ["bottomCenter"],
        }}
        scroll={{ x: true }}
        className="mb-10"
      />
      {show && edittedProduct && (
        <EditProductModal show={show} setShow={setShow} data={edittedProduct} />
      )}
    </>
  );
};

export default ProductTable;
