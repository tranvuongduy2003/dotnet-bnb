import {
  AimOutlined,
  CalendarOutlined,
  CloseOutlined,
  ContainerOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import Field from "./Field";
import OrderItem from "./OrderItem";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

interface IOrderInformationProps {
  data: any;
  status: string;
}

const OrderInformation: React.FunctionComponent<IOrderInformationProps> = ({
  data,
  status,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full p-6 rounded shadow-md">
      <div className="flex flex-col gap-6 pb-6 border-0 border-b border-solid border-neutral-300">
        <Field
          icon={<CalendarOutlined />}
          title="Date"
          value={new Date().toLocaleDateString("vi-VN")}
        />
        <Field
          icon={<UserOutlined />}
          title="Customer"
          value={data.receiptName}
        />
        <Field
          icon={<PhoneOutlined />}
          title="Phone number"
          value={data.receiptPhone}
        />
        <Field
          icon={<AimOutlined />}
          title="Address"
          value={data.receiptAddress}
        />
        <Field
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          }
          title="Payment Method"
          value="Cash in Delivery"
        />
      </div>
      <div className="flex flex-col gap-6 py-6 border-0 border-b border-solid border-neutral-300">
        <Field
          icon={<ContainerOutlined />}
          title="Order Number"
          value={JSON.stringify(data.id)}
        />
        <Field
          icon={<UserOutlined />}
          title="Total"
          value={
            status === "success" ? (
              <span>
                {`${new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  data.orders
                    .map(
                      (item: any) =>
                        JSON.parse(item.price as string) * item.quantity
                    )
                    .reduce((prev: number, cur: number) => prev + cur, 0) +
                    30000
                )}`}
              </span>
            ) : (
              <>
                <span className="px-2 py-1 mr-2 font-normal text-red-500 bg-red-100 rounded-full">
                  <CloseOutlined /> Failed
                </span>
                <span>
                  {`${new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    data.orders
                      .map(
                        (item: any) =>
                          JSON.parse(item.price as string) * item.quantity
                      )
                      .reduce((prev: number, cur: number) => prev + cur, 0) +
                      30000
                  )}`}
                </span>
              </>
            )
          }
        />
      </div>
      <div className="flex flex-col gap-6 py-6">
        <span className="text-sm text-neutral-900">Order Line</span>
        <div className="flex flex-col gap-5">
          {data.orders.map((order: any, index: number) => (
            <OrderItem
              image={order.images[0]}
              name={order.name}
              desc={order.desc}
              quantity={order.quantity}
              price={JSON.parse(order.price)}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        {status === "success" ? (
          <Button
            onClick={() => navigate("/")}
            type="primary"
            className="bg-primary"
            size="large"
          >
            Continue shopping
          </Button>
        ) : (
          <>
            <Button className="border-primary text-primary" size="large">
              Need help
            </Button>
            <Button type="primary" className="bg-primary" size="large">
              Try again
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderInformation;
