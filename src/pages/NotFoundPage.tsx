import { HomeOutlined } from "@ant-design/icons";
import { Button, Col, Image, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Row className="h-screen">
      <Col span={12} className="flex items-center justify-center h-full">
        <Image preview={false} src={"/assets/404.png"} />
      </Col>
      <Col
        span={12}
        className="flex flex-col items-start justify-center h-full"
      >
        <div className="text-2xl font-bold text-primary">Uh oh..</div>
        <Typography.Title level={1}>Something went wrong</Typography.Title>
        <div className="mb-6 text-base text-neutral-600">
          Look like this page doesn't exist or was removed.
        </div>
        <Button
          type="primary"
          size="large"
          className="bg-primary"
          onClick={() => navigate("/auth/login")}
        >
          <HomeOutlined />
          <span>Back to home</span>
        </Button>
      </Col>
    </Row>
  );
};

export default NotFoundPage;
