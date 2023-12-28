import { changeOrderStatus } from "@/apis/order.api";
import { Status } from "@/constants/status";
import { IOrder } from "@/interfaces/IOrder";
import { Button, Form, Modal, Select, notification } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IEditOrderModalProps {
  show: boolean;
  setShow: any;
  data: IOrder;
}

const EditOrderModal: React.FunctionComponent<IEditOrderModalProps> = ({
  show,
  setShow,
  data,
}) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [form] = Form.useForm();

  const statusOptions = [
    { value: Status.CANCELLED, label: Status.CANCELLED },
    { value: Status.DELIVERED, label: Status.DELIVERED },
    { value: Status.PENDING, label: Status.PENDING },
  ];

  const handleChangeStatus = async (value: any) => {
    setIsLoading(true);
    try {
      await changeOrderStatus(data.id, value.status);
      notification.success({
        message: "Delete product successfully!",
        duration: 0.25,
        onClose: () => navigate(0),
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
    <Modal
      title="Change order status"
      centered
      open={show}
      footer={[
        <Button onClick={() => setShow(false)}>Cancel</Button>,
        <Button
          type="primary"
          loading={isLoading}
          onClick={() => form.submit()}
        >
          Save
        </Button>,
      ]}
      onCancel={() => setShow(false)}
      width={400}
    >
      <Form form={form} labelCol={{ span: 24 }} onFinish={handleChangeStatus}>
        <Form.Item name="status" initialValue={data.status}>
          <Select options={statusOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditOrderModal;
