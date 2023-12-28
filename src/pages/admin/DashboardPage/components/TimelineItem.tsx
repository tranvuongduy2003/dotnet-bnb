import StatusTag from "@/components/StatusTag";
import { Col, Row } from "antd";
import * as React from "react";

interface ITimelineItemProps {
  title: string;
  orders: any;
}

const TimelineItem: React.FunctionComponent<ITimelineItemProps> = ({
  title,
  orders,
}) => {
  return (
    <div>
      <div className="mb-2 text-sm text-neutral-500">{title}</div>
      {orders && orders.length > 0 && (
        <div className="border border-solid rounded-lg border-neutral-200">
          {orders?.map((order: any) => (
            <Row
              className="p-6 border-0 border-b border-solid border-neutral-200"
              key={order.id}
            >
              <Col span={2}>
                <span className="text-sm font-semibold text-primary">{`#${order.id}`}</span>
              </Col>
              <Col span={4}>
                <StatusTag value={order.status} />
              </Col>
              {/* <Col span={3}>
              <span className="text-sm font-semibold text-neutral-900">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.totalPrice || 0)}
              </span>
            </Col> */}
              <Col span={3}>
                <span className="text-sm text-neutral-500">Delivered to</span>
              </Col>
              <Col span={4}>
                <span className="text-sm text-neutral-900">
                  {order.receiptName}
                </span>
              </Col>
              <Col span={2}>
                <span className="text-sm text-neutral-500">at</span>
              </Col>
              <Col span={6}>
                <span className="text-sm text-neutral-900">
                  {order.receiptAddress}
                </span>
              </Col>
            </Row>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimelineItem;
