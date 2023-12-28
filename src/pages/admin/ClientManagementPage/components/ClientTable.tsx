import { changeUserStatus } from "@/apis/user.api";
import UserStatucTag from "@/components/ClientStatusTag";
import { IUser } from "@/interfaces/IUser";
import { useClientStore } from "@/stores/useClientStore";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, InputRef, Space, Table, notification } from "antd";
import {
  ColumnType,
  ColumnsType,
  FilterConfirmProps,
} from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";

type DataIndex = keyof IUser;

const ClientTable: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const clients = useClientStore((state) => state.clients);
  const filteredClients = useClientStore((state) => state.filteredClients);

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

  const handleChangeUserStatus = async (
    userId: string | number,
    status: 0 | 1
  ) => {
    setIsLoading(true);
    try {
      await changeUserStatus(userId, status);
      setIsLoading(false);
      notification.success({
        message: "Deactive account successfully!",
        duration: 0.25,
        onClose: () => navigate(0),
      });
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      notification.error({
        message: error.message,
      });
    }
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IUser> => ({
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

  const columns: ColumnsType<IUser> = [
    {
      title: "Name",
      dataIndex: "fullname",
      key: "fullname",
      width: "20%",
      ...getColumnSearchProps("fullname"),
      render: (value, record, index) => (
        <div className="flex items-center gap-7">
          <div>
            <img
              src={record.avatar || "/assets/avatar.png"}
              alt="avatar"
              className="object-cover rounded-full w-9 h-9"
            />
          </div>
          <div className="flex flex-col gap-[2px]">
            <span className="text-sm font-medium">{record.fullname}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "10%",
    },
    {
      title: "Total paid & orders",
      dataIndex: "total_paid",
      key: "total_paid",
      width: "15%",
      render: (value, record, index) => (
        <div className="flex flex-col gap-[2px]">
          <span className="text-sm">{`${new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(JSON.parse(record.totalPayment as string))}`}</span>
          <span className="text-xs text-neutral-600">{record.orderCount}</span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: "10%",
      render: (value, record, index) => <UserStatucTag isActive={value} />,
    },
    {
      title: "Activate",
      key: "isActive",
      dataIndex: "isActive",
      width: "10%",
      render: (value, record, index) =>
        value ? (
          <Button
            loading={isLoading}
            onClick={() => handleChangeUserStatus(record.id, 0)}
            danger
            className="hover:!border-red-500 hover:!text-white hover:!bg-red-500 w-full"
          >
            Deactivate
          </Button>
        ) : (
          <Button
            loading={isLoading}
            onClick={() => handleChangeUserStatus(record.id, 1)}
            className="w-full text-green-600 border-green-600 hover:!border-green-600 hover:!text-white hover:!bg-green-600"
          >
            Activate
          </Button>
        ),
    },
  ];

  return (
    <Table
      rowKey={"id"}
      columns={columns}
      dataSource={filteredClients ? filteredClients : clients}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 6,
        position: ["bottomCenter"],
      }}
      scroll={{ x: true }}
      className="mb-10"
    />
  );
};

export default ClientTable;
