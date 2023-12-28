import { UpOutlined } from "@ant-design/icons";
import React from "react";

interface ISummaryCardProps {
  title: string;
  value: string | number;
  percentage: number;
}

const SummaryCard: React.FunctionComponent<ISummaryCardProps> = ({
  title,
  value,
  percentage,
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg">
      <div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div>
        <span className="text-3xl text-[#1091F4FF]">{value}</span>
      </div>
      <div className="flex gap-x-2">
        <span className="text-[#14923EFF]">
          <UpOutlined />
        </span>
        <span className="text-[#14923EFF]">{`${percentage}%`}</span>
        <span className="text-neutral-500">period of change</span>
      </div>
    </div>
  );
};

export default SummaryCard;
