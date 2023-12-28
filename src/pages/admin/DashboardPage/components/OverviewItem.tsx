import { Col, Row } from "antd";
import React from "react";

interface IOverviewItemProps {
  color: string;
  title: string;
  value: number | string;
}

const OverviewItem: React.FunctionComponent<IOverviewItemProps> = ({
  color,
  title,
  value,
}) => {
  return (
    <Row
      align={"middle"}
      className="relative px-8 py-6 overflow-hidden border border-solid rounded-xl border-neutral-200"
    >
      <Col
        className={`w-2 h-full absolute top-0 bottom-0 left-0 z-10`}
        style={{ backgroundColor: color }}
      ></Col>
      <Col flex={1} className="flex flex-col gap-2">
        <span className="text-base text-neutral-700">{title}</span>
        <span className="text-xl font-semibold text-neutral-900">{value}</span>
      </Col>
    </Row>
  );
};

export default OverviewItem;
