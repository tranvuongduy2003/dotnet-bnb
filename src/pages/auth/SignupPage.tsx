import { signUp } from "@/apis/auth.api";
import { Role } from "@/constants/role";
import { useAppStore } from "@/stores/useAppStore";
import { Button, Col, Form, Input, Row, Typography, notification } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);

  const handleSignUp = async (values: any) => {
    setIsLoading(true);
    try {
      await signUp({ ...values, role: Role.CUSTOMER });
      setIsLoading(false);
      notification.success({
        message: "Create new account successfully!",
        duration: 0.25,
        onClose: () => navigate("/auth/login"),
      });
    } catch (error: any) {
      setIsLoading(false);
      notification.error({
        message: error.response.data.message,
      });
    }
  };

  return (
    <Row className="h-screen p-0 m-0">
      <img
        src="/assets/signup-bg.png"
        className="absolute top-0 left-0 object-cover w-full h-full"
      />
      <Col span={12} className="flex flex-col items-center justify-center">
        <div className="flex justify-center w-full gap-x-12">
          <div className="h-28 w-28 bg-[#F5555AFF] rounded-full flex justify-center items-center">
            <img src="/assets/signup-icon-1.png" alt="signup-icon-1" />
          </div>
          <div className="h-28 w-28 bg-[#F2B063FF] rounded-full flex justify-center items-center">
            <img src="/assets/signup-icon-2.png" alt="signup-icon-2" />
          </div>
          <div className="h-28 w-28 bg-[#4CE77FFF] rounded-full flex justify-center items-center">
            <img src="/assets/signup-icon-3.png" alt="signup-icon-3" />
          </div>
        </div>
        <Typography className="text-center">
          <Typography.Title level={1} style={{ color: "white" }}>
            Beauty in Bloom
          </Typography.Title>
          <Typography.Title level={3} style={{ color: "white" }}>
            A thing of beauty is a joy forever
          </Typography.Title>
        </Typography>
      </Col>
      <Col span={12} className="flex items-center justify-center">
        <Form
          form={form}
          labelCol={{ span: 24 }}
          size="large"
          className="w-full mx-24 bg-white rounded-xl p-14"
          onFinish={(values) => handleSignUp(values)}
        >
          <Typography.Title level={3} className="m-0 text-center">
            Create an account
          </Typography.Title>
          <Form.Item
            name="fullname"
            label="Full name"
            required={true}
            rules={[
              {
                required: true,
                message: "You must enter your fullname",
              },
            ]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            required={true}
            rules={[
              {
                required: true,
                message: "You must enter your email",
              },
              {
                type: "email",
                message: "You must enter a valid email!",
              },
            ]}
          >
            <Input placeholder="example.email@gmail.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            required={true}
            rules={[
              {
                required: true,
                message: "You must enter your password",
              },
              {
                min: 8,
                message: "You must enter at least 8+ characters!",
              },
            ]}
          >
            <Input.Password placeholder="Enter at least 8+ characters" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading}
              htmlType="submit"
              className="w-full mt-8 text-white border-none bg-primary"
            >
              Sign in
            </Button>
          </Form.Item>
          <div className="w-full text-center">
            <span>
              Been have before?{" "}
              <span
                className="cursor-pointer text-primary"
                onClick={() => navigate("/auth/login")}
              >
                Log in
              </span>
            </span>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default SignupPage;
