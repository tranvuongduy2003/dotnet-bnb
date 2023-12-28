import { cancelOrder, getAllOrders } from "@/apis/order.api";
import StatusTag from "@/components/StatusTag";
import { Status } from "@/constants/status";
import { useAppStore } from "@/stores/useAppStore";
import { useOrdersStore } from "@/stores/useOrderStore";
import {
  Button,
  Col,
  Collapse,
  Pagination,
  PaginationProps,
  Row,
  Typography,
  notification,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductOrderItem from "./components/ProductOrderItem";

const perPage = 4;

const OrderHistoryPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const orders = useOrdersStore((state) => state.orders);
  const setOrders = useOrdersStore((state) => state.setOrders);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchOrderData = useRef<any>();

  useEffect(() => {
    fetchOrderData.current = async () => {
      setIsLoading(true);
      try {
        const { data: orderData } = await getAllOrders();
        console.log(orderData);
        setOrders(orderData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchOrderData.current();
  }, []);

  const handleCancelOrder = async (orderId: string | number) => {
    try {
      await cancelOrder(orderId);
      notification.success({
        message: "Cancel order successfully!",
        duration: 0.25,
        onClose: () => navigate(0),
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const onChangePage: PaginationProps["onChange"] = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="py-12 px-80">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Order history
      </Typography.Title>
      <Collapse
        bordered={false}
        expandIcon={() => (
          <div className="!text-sm flex items-center underline cursor-pointer !text-neutral-500">
            Details
          </div>
        )}
        expandIconPosition="end"
        className="bg-white mt-7"
      >
        {orders
          .slice((currentPage - 1) * perPage, currentPage * perPage)
          .map((order) => (
            <>
              <Collapse.Panel
                key={order.id}
                header={
                  <Row className="py-4" align={"middle"} gutter={10}>
                    <Col>
                      <span className="text-sm font-medium">{`Order #${order.id}`}</span>
                    </Col>
                    <Col>
                      <StatusTag value={order.status} />
                    </Col>
                  </Row>
                }
                className="!border-none"
              >
                <div className="flex flex-col gap-6">
                  {order.orderItems.map((item) => (
                    <ProductOrderItem key={item.id} data={item} />
                  ))}
                </div>
              </Collapse.Panel>
              <div className="flex items-center justify-end gap-5 pb-5 mb-10 border-0 border-b border-solid border-neutral-300">
                {order.status === Status.PENDING && (
                  <Button
                    danger
                    type="primary"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel order
                  </Button>
                )}
                <span className="text-lg font-semibold">
                  {`Total: ${new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    JSON.parse(
                      order.orderItems
                        .map((item) => JSON.parse(item.sumPrice))
                        .reduce((prev, cur) => prev + cur, 0)
                    )
                  )}`}
                </span>
              </div>
            </>
          ))}
      </Collapse>
      <div className="flex justify-center">
        <Pagination
          defaultCurrent={1}
          pageSize={perPage}
          total={orders.length}
          onChange={onChangePage}
        />
      </div>
    </div>
  );
};

export default OrderHistoryPage;
