import React from "react";

interface IUserStatucTagProps {
  isActive: boolean;
}

const UserStatucTag: React.FunctionComponent<IUserStatucTagProps> = ({
  isActive,
}) => {
  return isActive ? (
    <div className="inline-block px-3 py-1 text-green-500 bg-green-100 rounded-full">
      Active
    </div>
  ) : (
    <div className="inline-block px-3 py-1 text-red-500 bg-red-100 rounded-full">
      Inactive
    </div>
  );
};

export default UserStatucTag;
