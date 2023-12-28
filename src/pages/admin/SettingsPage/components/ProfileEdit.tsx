import { updateUserProfile } from "@/apis/user.api";
import { app } from "@/firebase";
import { useAuthStore } from "@/stores/useAuthStore";
import validator from "@/utils/validateImage";
import { EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Typography,
  Upload,
  message,
  notification,
} from "antd";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";

dayjs.extend(weekday);
dayjs.extend(localeData);

const ProfileEdit: React.FunctionComponent = () => {
  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => state.setProfile);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (profile) {
      form.setFieldValue("email", profile.email);
      form.setFieldValue("fullname", profile.fullname);
      form.setFieldValue("dob", profile.dob || new Date());
      form.setFieldValue("phone", profile.phone);
    }
  }, [profile]);

  const fullnameWatch = Form.useWatch("fullname", form);
  const emailWatch = Form.useWatch("email", form);
  const phoneWatch = Form.useWatch("phone", form);

  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    const dob = date?.toDate();
    setOpenDatePicker(!openDatePicker);
    form.setFieldValue("dob", dob);
  };

  const onChangeFile: UploadProps["onChange"] = async ({ fileList }) => {
    setFileList(fileList);
  };

  const beforeUploadFile = (file: RcFile) => {
    const msgs = validator(file);
    msgs.map((msg) => message.error(msg));
    return msgs.length == 0 || Upload.LIST_IGNORE;
  };

  const handleUpdateProfile = async (value: any) => {
    setIsLoading(true);
    const { dob, fullname, phone } = value;
    let payload = {};
    if (dob) {
      payload = { ...payload, dob };
    }
    if (fullname) {
      payload = { ...payload, fullname };
    }
    if (phone) {
      payload = { ...payload, phone };
    }
    if (fileList && fileList.length > 0) {
      const storage = getStorage(app);
      const storageRef = ref(storage, `avatars/${fileList[0].name}`);
      await uploadBytes(storageRef, fileList[0].originFileObj as Blob);
      const imageURL = await getDownloadURL(storageRef);
      payload = { ...payload, avatar: imageURL };
    }

    try {
      const { data } = await updateUserProfile(payload);
      setProfile(data);
      setIsLoading(false);
      notification.success({
        message: "Update profile successfully!",
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
    <Form
      form={form}
      labelCol={{ span: 24 }}
      className="w-full"
      onFinish={handleUpdateProfile}
    >
      <Form.Item className="relative w-[138px] mx-auto">
        <Avatar
          src={
            fileList?.length > 0
              ? URL.createObjectURL(fileList[0].originFileObj as any)
              : profile?.avatar
              ? profile?.avatar
              : "/assets/avatar.png"
          }
          size={138}
        ></Avatar>
        <Upload
          fileList={fileList}
          multiple={false}
          beforeUpload={beforeUploadFile}
          onChange={onChangeFile}
          showUploadList={false}
          maxCount={1}
          className="absolute bottom-0 right-0"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-neutral-700">
            <EditOutlined className="text-base text-white" />
          </div>
        </Upload>
      </Form.Item>
      <Form.Item
        name="fullname"
        label={<span className="text-sm font-medium">Full name</span>}
        initialValue={profile?.fullname}
      >
        <Typography.Text
          editable={{
            icon: (
              <span className="text-sm underline text-neutral-700">Edit</span>
            ),
            onChange: (value) => form.setFieldValue("fullname", value),
          }}
          className="flex justify-between"
        >
          {fullnameWatch || (
            <span className="text-neutral-400">Not provided</span>
          )}
        </Typography.Text>
      </Form.Item>
      <Form.Item
        name="email"
        label={<span className="text-sm font-medium">Email</span>}
        initialValue={profile?.email}
      >
        <Typography.Text className="flex justify-between">
          {emailWatch || <span className="text-neutral-400">Not provided</span>}
        </Typography.Text>
      </Form.Item>
      <Form.Item
        name="dob"
        label={<span className="text-sm font-medium">Date of birth</span>}
      >
        <DatePicker
          defaultValue={dayjs(profile?.dob || new Date())}
          open={openDatePicker}
          disabled={!openDatePicker}
          onChange={onDateChange}
          showToday={false}
          bordered={false}
        />
        <span
          className="float-right text-sm underline cursor-pointer text-neutral-700"
          onClick={() => setOpenDatePicker(!openDatePicker)}
        >
          Edit
        </span>
      </Form.Item>
      <Form.Item
        name="phone"
        label={<span className="text-sm font-medium">Phone number</span>}
        initialValue={profile?.phone}
      >
        <Typography.Text
          editable={{
            icon: (
              <span className="text-sm underline text-neutral-700">Edit</span>
            ),
            onChange: (value) => form.setFieldValue("phone", value),
          }}
          className="flex justify-between"
        >
          {phoneWatch || <span className="text-neutral-400">Not provided</span>}
        </Typography.Text>
      </Form.Item>
      <Form.Item>
        <Button
          loading={isLoading}
          htmlType="submit"
          type="primary"
          className="float-right bg-primary"
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileEdit;
