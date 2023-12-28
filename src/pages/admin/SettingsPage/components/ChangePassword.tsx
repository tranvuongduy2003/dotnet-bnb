import { changeUserPassword } from "@/apis/user.api";
import { useAppStore } from "@/stores/useAppStore";
import { Button, Form, Input, notification } from "antd";
import React from "react";

const ChangePassword: React.FunctionComponent = () => {
  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const [form] = Form.useForm();

  const handleChangePassword = async (value: any) => {
    const { oldPassword, newPassword } = value;
    console.log(value);
    setIsLoading(true);
    try {
      await changeUserPassword({ oldPassword, newPassword });
      setIsLoading(false);
      notification.success({
        message: "Change password successfully!",
      });
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      notification.error({
        message: error.message,
      });
    }
  };

  return (
    <div className="py-6 border border-solid rounded border-neutral-300 px-7">
      <Form form={form} labelCol={{ span: 24 }} onFinish={handleChangePassword}>
        <Form.Item
          name="oldPassword"
          label="Current password"
          rules={[{ required: true, message: "Please enter current password" }]}
        >
          <Input.Password placeholder="Enter current password" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New password"
          rules={[
            { required: true, message: "Please enter new password" },
            {
              min: 8,
              message: "Password must be longer than or equal to 8 characters",
            },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        <Form.Item
          name="confirmedNewPassword"
          label="Confirm new password"
          rules={[
            { required: true, message: "Please retype new password" },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm new password" />
        </Form.Item>
        <Form.Item className="p-0 m-0">
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="float-right m-0 bg-primary"
          >
            Change password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
