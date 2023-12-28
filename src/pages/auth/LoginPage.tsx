import { AuthContext } from "@/context/AuthProvider";
import { useAppStore } from "@/stores/useAppStore";
import { Button, Col, Form, Image, Input, Row, Typography } from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { logIn } = useContext(AuthContext) as any;

  const isLoading = useAppStore((state) => state.isLoading);

  const handleLogin = async (values: any) => {
    await logIn(values);
  };

  return (
    <Row className="h-screen p-0 m-0">
      <Col span={12} className="bg-white">
        <Row justify={"space-between"} align={"middle"} className="px-12 pt-14">
          <Col>
            <img
              src="/assets/logo.png"
              alt="logo"
              onClick={() => navigate("/")}
            />
          </Col>
          <Col>
            <span>Don't you have an account? </span>
            <span
              className="underline cursor-pointer text-primary"
              onClick={() => navigate("/auth/sign-up")}
            >
              Sign up
            </span>
          </Col>
        </Row>
        <Row justify={"center"} align={"middle"} className="mt-36">
          <Col span={24}>
            <Typography.Title level={2} className="text-center">
              Sign in
            </Typography.Title>
            <Form
              form={form}
              labelCol={{ span: 24 }}
              className="px-48"
              size="large"
              onFinish={(values) => handleLogin(values)}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="example.email@gmail.com" />
              </Form.Item>
              <Form.Item name="password" label="Password">
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
            </Form>
          </Col>
        </Row>
      </Col>
      <Col
        span={12}
        className="flex flex-col items-center justify-center bg-primary"
      >
        <Image src="/assets/login-sideimg.png" loading="lazy" preview={false} />
        <Typography className="text-center">
          <Typography.Title level={1} style={{ color: "white" }}>
            Beauty in Bloom
          </Typography.Title>
          <Typography.Title level={2} style={{ color: "white" }}>
            Welcome to our beauty world!
          </Typography.Title>
        </Typography>
      </Col>
    </Row>
  );
};

export default LoginPage;
