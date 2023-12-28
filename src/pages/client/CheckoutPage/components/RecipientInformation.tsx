import { Col, Form, Input, Row, Typography } from "antd";
import React from "react";

interface IRecipientInformationProps {
  form: any;
}

const RecipientInformation: React.FunctionComponent<
  IRecipientInformationProps
> = ({ form }) => {
  return (
    <div className="border border-solid rounded p-7 border-neutral-200">
      <Typography.Title
        level={4}
        style={{ margin: 0, marginBottom: 20 }}
        className="flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>Recipient information</span>
      </Typography.Title>
      <Form form={form} labelCol={{ span: 24 }} size="large">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="receiptName"
              label="Full name"
              rules={[{ required: true, message: "Full name is missing" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="receiptPhone"
              label="Phone number"
              rules={[{ required: true, message: "Phone number is missing" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="receiptAddress"
          label="Address"
          rules={[{ required: true, message: "Address is missing" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default RecipientInformation;
