import { Typography } from "antd";
import React from "react";
import OrderInformation from "./components/OrderInformation";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutConfirmationPage: React.FunctionComponent = () => {
  const location = useLocation();
  const { state } = location;
  const { status, data } = state;

  return (
    <div className="px-[450px] py-12 flex flex-col items-center">
      <div>
        <img
          src={
            status === "success"
              ? "/assets/payment-success.png"
              : "/assets/payment-failed.png"
          }
          alt="payment success"
          className="object-cover w-80"
        />
      </div>
      <div className="flex flex-col items-center gap-3 mt-6 mb-12">
        <Typography.Title level={2} style={{ margin: 0 }}>
          {status === "success"
            ? "Thank you for your purchase! 🎉"
            : "Payment declined 😢"}
        </Typography.Title>
        <span className="text-sm text-neutral-500">
          {status === "success"
            ? "You will receive an confirmation letter through your email"
            : "Something went wrong with your payment method. Please try again."}
        </span>
      </div>
      <OrderInformation status={status} data={data} />
    </div>
  );
};

export default CheckoutConfirmationPage;
