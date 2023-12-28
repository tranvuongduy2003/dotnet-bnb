import { Col, Form, Row, Typography, notification } from "antd";
import React from "react";
import PaymentBill from "./components/PaymentBill";
import OrderSummary from "./components/OrderSummary";
import RecipientInformation from "./components/RecipientInformation";
import { useLocation, useNavigate } from "react-router-dom";
import { ICart } from "@/interfaces/ICart";
import { addOrder } from "@/apis/order.api";
import { useAppStore } from "@/stores/useAppStore";
import { useCartStore } from "@/stores/useCartStore";
import { useAuthStore } from "@/stores/useAuthStore";

const CheckoutPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const orders: ICart[] = state.orders;

  const [form] = Form.useForm();

  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const profile = useAuthStore((state) => state.profile);

  const handlePay = async () => {
    setIsLoading(true);
    try {
      const error = await form.validateFields();
      const value = form.getFieldsValue();
      const products = orders.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
      const payload = { ...value, userId: profile?.id, products };
      const { data } = await addOrder(payload);
      orders.forEach((item) => {
        removeFromCart(item.id);
      });
      setIsLoading(false);
      navigate("/checkout/confirmation", {
        state: { status: "success", data: { orders, ...data } },
      });
    } catch (error: any) {
      setIsLoading(false);
      if (!error.message) {
        const { errorFields } = error;
        errorFields.forEach((item: any) => {
          notification.error({
            message: item.errors[0],
          });
        });
      } else {
        notification.error({
          message: error.message,
        });
      }
      // navigate("/checkout/confirmation", {
      //   state: { status: "failed" },
      // });
    }
  };

  return (
    <div className="px-32 py-9">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Checkout
      </Typography.Title>
      <Row gutter={28} className="mt-6">
        <Col span={16} className="flex flex-col gap-7">
          <OrderSummary data={orders} />
          <RecipientInformation form={form} />
        </Col>
        <Col span={8}>
          <PaymentBill onPay={handlePay} orders={orders} />
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutPage;
