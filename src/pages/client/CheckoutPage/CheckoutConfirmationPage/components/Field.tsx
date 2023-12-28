import React, { ReactNode } from "react";

interface IFieldProps {
  icon: ReactNode;
  title: string;
  value: ReactNode;
}

const Field: React.FunctionComponent<IFieldProps> = ({
  icon,
  title,
  value,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-lg text-primary">{icon}</span>
        <span className="ml-3 text-base text-neutral-500">{title}</span>
      </div>
      <div className="text-base font-semibold text-neutral-900">{value}</div>
    </div>
  );
};

export default Field;
