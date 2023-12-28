import { Status } from "@/constants/status";
import React from "react";

interface IStatusTagProps {
  value: string;
}

const StatusTag: React.FunctionComponent<IStatusTagProps> = ({ value }) => {
  switch (value) {
    case Status.PENDING:
      return (
        <div className="inline-block px-3 py-1 text-yellow-500 bg-yellow-100 rounded-full">
          {value}
        </div>
      );

    case Status.CANCELLED:
      return (
        <div className="inline-block px-3 py-1 text-red-500 bg-red-100 rounded-full">
          {value}
        </div>
      );

    case Status.DELIVERED:
      return (
        <div className="inline-block px-3 py-1 text-blue-500 bg-blue-100 rounded-full">
          {value}
        </div>
      );

    default:
      break;
  }
  return <></>;
  //   return value === "perfume" ? (
  //     <div className="inline-block px-3 py-1 rounded-full text-primary-500 bg-primary-100">
  //       {value}
  //     </div>
  //   ) : (
  //     <div className="inline-block px-3 py-1 rounded-full text-violet-500 bg-violet-100">
  //       {value}
  //     </div>
  //   );
};

export default StatusTag;
