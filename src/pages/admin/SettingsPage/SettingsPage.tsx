import { Role } from "@/constants/role";
import { useAuthStore } from "@/stores/useAuthStore";
import { Col, Row, Typography } from "antd";
import React from "react";
import ChangePassword from "./components/ChangePassword";
import Deactivate from "./components/Deactivate";
import ProfileEdit from "./components/ProfileEdit";

const SettingsPage: React.FunctionComponent = (props) => {
  const profile = useAuthStore((state) => state.profile);
  //   const handleAddNewProduct = async (values: any) => {
  //     const { images, ...rest } = values;
  //     const storage = getStorage(app);
  //     const imageURLs: any = [];
  //     await images.fileList.map(async (image: any) => {
  //       const storageRef = ref(storage, `products/${image.name}`);
  //       await uploadBytes(storageRef, image.originFileObj);
  //       const imageURL = await getDownloadURL(storageRef);
  //       imageURLs.push(imageURL);
  //     });

  //     console.log({ ...rest, images: imageURLs });
  //   };

  return (
    <div className={`${profile?.role === Role.ADMIN ? "px-36" : "px-80"} py-6`}>
      <Row>
        <Typography.Title level={2} style={{ margin: 0 }}>
          Settings
        </Typography.Title>
      </Row>
      <Row justify={"center"}>
        <ProfileEdit />
      </Row>
      {profile?.role === Role.ADMIN && (
        <>
          <Row className="my-10">
            <Col span={8}>
              <Typography.Title level={3} style={{ margin: 0 }}>
                Change Password
              </Typography.Title>
            </Col>
            <Col span={16}>
              <ChangePassword />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Typography.Title level={3} style={{ margin: 0 }}>
                Deactivate
              </Typography.Title>
            </Col>
            <Col span={16}>
              <Deactivate />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default SettingsPage;
