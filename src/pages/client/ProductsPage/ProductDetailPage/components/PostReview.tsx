import { addReview } from "@/apis/product.api";
import { useAuthStore } from "@/stores/useAuthStore";
import { useReviewStore } from "@/stores/useReviewStore";
import {
  Avatar,
  Button,
  Col,
  Input,
  Rate,
  RateProps,
  Row,
  notification,
} from "antd";
import React, { useState } from "react";

interface IPostReviewProps {
  productId: string | number;
}

const PostReview: React.FunctionComponent<IPostReviewProps> = ({
  productId,
}) => {
  const profile = useAuthStore((state) => state.profile);
  const setReviews = useReviewStore((state) => state.setReviews);
  const setRatingPoints = useReviewStore((state) => state.setRatingPoints);

  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeRate: RateProps["onChange"] = (value) => {
    setRating(value);
  };

  const handlePostReview = async () => {
    setIsLoading(true);
    try {
      const { data } = await addReview({
        userId: profile?.id,
        rating,
        content,
        productId,
      });
      const { reviews, ratingPoint } = data;
      setRatingPoints(ratingPoint);
      setReviews(reviews);
      setIsLoading(false);
      notification.success({
        message: "Post review successfully!",
        duration: 0.5,
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
    <div>
      <Row align={"middle"} gutter={12}>
        <Col>
          <Avatar src={profile?.avatar} size={"large"} />
        </Col>
        <Col flex={1} className="flex flex-col justify-between">
          <div>
            <span className="text-sm font-semibold">{profile?.fullname}</span>
          </div>
          <Rate onChange={onChangeRate} value={rating} />
        </Col>
      </Row>
      <Row className="my-4">
        <Input.TextArea
          autoSize={{ minRows: 3, maxRows: 8 }}
          onChange={(e) => setContent(e.target.value)}
        />
      </Row>
      <Row justify={"end"}>
        <Button
          loading={isLoading}
          onClick={handlePostReview}
          type="primary"
          className="bg-primary"
        >
          Submit
        </Button>
      </Row>
    </div>
  );
};

export default PostReview;
