import { getAllOrders } from "@/apis/order.api";
import { useAppStore } from "@/stores/useAppStore";
import { useOrdersStore } from "@/stores/useOrderStore";
import { Col, Row, Spin, Typography } from "antd";
import React, { useEffect, useRef } from "react";
import OrderTable from "./components/OrderTable";

const OrderManagementPage: React.FunctionComponent = () => {
  const fetchProductData = useRef<any>(null);

  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const setOrders = useOrdersStore((state) => state.setOrders);

  useEffect(() => {
    fetchProductData.current = async () => {
      setIsLoading(true);
      try {
        const { data } = await getAllOrders();

        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchProductData.current();
  }, []);

  return (
    <div className="my-10 px-28">
      {/* TITlE */}
      <Row justify={"space-between"} align={"middle"} className="mb-6">
        <Col>
          <Typography.Title level={2} style={{ margin: 0 }}>
            Order management
          </Typography.Title>
        </Col>
      </Row>

      {/* TABLE */}
      {!isLoading ? (
        <OrderTable />
      ) : (
        <div className="flex justify-center w-full">
          <Spin spinning={isLoading} size="large" />
        </div>
      )}
    </div>
  );
};

export default OrderManagementPage;
