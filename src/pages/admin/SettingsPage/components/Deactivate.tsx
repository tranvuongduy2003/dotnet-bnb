import { changeUserStatus } from "@/apis/user.api";
import { useAuthStore } from "@/stores/useAuthStore";
import { logOut } from "@/utils/auth";
import { Button, notification } from "antd";
import React, { useState } from "react";

const Deactivate: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => state.setProfile);

  const handleDeactiveUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await changeUserStatus(profile?.id as any, 1);
      setProfile(data);
      setIsLoading(false);
      logOut();
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      notification.error({
        message: error.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-between py-6 border border-solid rounded border-neutral-300 px-7">
      <span>You can reactivate whenever you want.</span>
      <Button
        onClick={handleDeactiveUser}
        loading={isLoading}
        className="border-none bg-red-50"
        danger
      >
        Deactivate account
      </Button>
    </div>
  );
};

export default Deactivate;
