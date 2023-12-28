import { IReview } from "@/interfaces/IReview";
import { Avatar, Col, Rate, Row } from "antd";
import React from "react";

interface IReviewItemProps {
  data: IReview;
}

const ReviewItem: React.FunctionComponent<IReviewItemProps> = ({ data }) => {
  return (
    <div className="mb-10 last:mb-0">
      <Row align={"middle"} gutter={12}>
        <Col>
          <Avatar src={data.avatar || "/assets/avatar.png"} size={"large"} />
        </Col>
        <Col flex={1} className="flex flex-col justify-between">
          <div>
            <span className="text-sm font-semibold">
              {data.fullname || "Lorem"}
            </span>
          </div>
          <Rate value={data.rating} allowHalf disabled />
        </Col>
      </Row>
      <Row>
        <p className="text-sm">{data.content}</p>
      </Row>
    </div>
  );
};

export default ReviewItem;
