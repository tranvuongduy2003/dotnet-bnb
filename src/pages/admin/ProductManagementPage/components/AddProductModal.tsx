import { createNewProduct } from "@/apis/product.api";
import { app } from "@/firebase";
import { useBrandStore } from "@/stores/useBrandStore";
import { useCategoriesStore } from "@/stores/useCategoryStore";
import validator from "@/utils/validateImage";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  InputRef,
  Modal,
  Row,
  Select,
  Space,
  Upload,
  message,
  notification,
} from "antd";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IAddProductModalProps {
  show: boolean;
  setShow: any;
}

const AddProductModal: React.FunctionComponent<IAddProductModalProps> = ({
  show,
  setShow,
}) => {
  const brands = useBrandStore((state) => state.brands);
  const [items, setItems] = useState<string[]>(brands.map((item) => item.name));
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name || `New item`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const categories = useCategoriesStore((state) => state.categories);

  const categoryOptions = categories.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const brandOptions = brands.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChangeFile: UploadProps["onChange"] = async ({ fileList }) => {
    setFileList(fileList);
  };

  const beforeUploadFile = (file: RcFile) => {
    const msgs = validator(file);
    msgs.map((msg) => message.error(msg));
    return msgs.length == 0 || Upload.LIST_IGNORE;
  };

  const handleAddNewProduct = async (values: any) => {
    const { images, categoryId, ...rest } = values;
    const storage = getStorage(app);

    const payload = {
      ...rest,
      categoryId: categoryId,
      sold: 0,
    };

    if (images && images.fileList && images.fileList.length > 0) {
      const imageURLs = await Promise.all(
        images.fileList.map(async (image: any) => {
          const storageRef = ref(
            storage,
            `${categoryId === 1 ? "perfume" : "cosmetic"}/${image.name}`
          );
          await uploadBytes(storageRef, image.originFileObj);
          const imageURL = await getDownloadURL(storageRef);
          return imageURL;
        })
      );
      payload.images = imageURLs;
    }

    console.log(payload);

    setIsLoading(true);
    try {
      await createNewProduct(payload);
      setIsLoading(false);
      notification.success({
        message: "Create new product successfully!",
        duration: 0.5,
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
      title="Add new product"
      centered
      open={show}
      footer={[
        <Button onClick={() => setShow(false)}>Cancel</Button>,
        <Button
          type="primary"
          loading={isLoading}
          onClick={() => {
            setIsLoading(true);
            form.submit();
          }}
        >
          Create
        </Button>,
      ]}
      onCancel={() => setShow(false)}
      width={800}
    >
      <Form
        form={form}
        labelCol={{ span: 24 }}
        onFinish={(values) => handleAddNewProduct(values)}
      >
        <Form.Item name="name" label="Name">
          <Input placeholder="Product name" />
        </Form.Item>
        <Row>
          <Col span={24}>
            <Form.Item name="desc" label="Description">
              <Input.TextArea
                rows={3}
                autoSize={false}
                placeholder="Description"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={8}>
            <Form.Item name="importPrice" label="Import price">
              <InputNumber
                min={0}
                placeholder="Import price"
                className="w-full"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="price" label="Price">
              <InputNumber min={0} placeholder="Price" className="w-full" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="inventory" label="Inventory">
              <InputNumber min={0} placeholder="Inventory" className="w-full" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col span={12}>
            <Form.Item name="brandId" label="Brand">
              <Select
                placeholder="Brand"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                      <Input
                        placeholder="Please enter item"
                        ref={inputRef}
                        value={name}
                        onChange={onNameChange}
                      />
                      <Button
                        type="primary"
                        onClick={addItem}
                        className="bg-primary"
                      >
                        Add
                      </Button>
                    </Space>
                  </>
                )}
                options={brandOptions}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="categoryId" label="Category">
              <Select options={categoryOptions} placeholder="Category" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="images" label="Product images">
          <Upload
            listType="picture-card"
            fileList={fileList}
            multiple={true}
            beforeUpload={beforeUploadFile}
            onChange={onChangeFile}
          >
            {fileList.length >= 3 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
