import { ICart } from "@/interfaces/ICart";
import { useAppStore } from "@/stores/useAppStore";
import { ContainerOutlined, HomeOutlined } from "@ant-design/icons";
import { Button, Input, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IPaymentBillProps {
  onPay: any;
  orders: ICart[];
}

const PaymentBill: React.FunctionComponent<IPaymentBillProps> = ({
  onPay,
  orders,
}) => {
  const navigate = useNavigate();

  const isLoading = useAppStore((state) => state.isLoading);

  const subTotal = orders
    .map((item) => JSON.parse(item.price as string) * item.quantity)
    .reduce((prev, cur) => prev + cur, 0);

  return (
    <div className="flex flex-col gap-8 rounded bg-neutral-100 p-7">
      {/* PAYMENT METHOD */}
      <div>
        <Typography.Title
          level={4}
          style={{ margin: 0 }}
          className="flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-[#EF9834FF] mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
            />
          </svg>
          <span>Payment method</span>
        </Typography.Title>
        <div className="mt-2">
          <div className="flex items-center gap-2 p-4 font-semibold border border-solid rounded-lg text-primary-500 border-primary-500 bg-primary-100">
            <HomeOutlined className="text-xl" />
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>
      {/* VOUCHER */}
      <div>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Voucher
        </Typography.Title>
        <div className="flex items-center gap-2 mt-2">
          <Input placeholder="Input code" size="large" />
          <Button
            size="large"
            type="primary"
            className="bg-primary-150 text-primary-700"
          >
            Apply
          </Button>
        </div>
      </div>
      {/* SUMMARY */}
      <div>
        <Typography.Title
          level={4}
          style={{ margin: 0 }}
          className="flex items-center"
        >
          <ContainerOutlined className="text-[#E05858FF] mr-2" />
          <span>Summary</span>
        </Typography.Title>
        <div className="flex flex-col gap-2 pb-3 mt-5 border-0 border-b border-solid border-neutral-300">
          <div className="flex items-center justify-between">
            <span className="text-sm">Subtotal</span>
            <span className="text-base font-bold text-neutral-900">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(subTotal)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Delivery Fee</span>
            <span className="text-base font-bold text-neutral-900">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(30000)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 mb-5">
          <span className="text-sm font-semibold">Total</span>
          <span className="text-lg font-bold text-primary">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(subTotal + 30000)}
          </span>
        </div>
        <div>
          <Button
            loading={isLoading}
            type="primary"
            className="w-full bg-primary"
            size="large"
            onClick={() => onPay()}
          >
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentBill;
