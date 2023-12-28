import { IProduct } from "@/interfaces/IProduct";
import { Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";

export interface RecommendedProductCardProps {
  data: IProduct;
}

export function RecommendedProductCard({ data }: RecommendedProductCardProps) {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="grid grid-cols-2 overflow-hidden border border-solid rounded-md cursor-pointer border-neutral-200"
        onClick={() => navigate(`product/${data.id}`)}
      >
        <div className="relative overflow-hidden min-h-64">
          <img
            src={data.images[0]}
            alt="product image"
            className="absolute top-0 bottom-0 left-0 right-0 object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col p-8">
          <div>
            <Typography.Title
              ellipsis={{ rows: 1 }}
              level={4}
              style={{ margin: 0 }}
            >
              {data.name}
            </Typography.Title>
            <Typography.Paragraph
              ellipsis={{ rows: 3 }}
              className="mt-2 mb-4 text-xs leading-5 text-neutral-500"
            >
              {data.desc}
            </Typography.Paragraph>
          </div>
          <div className="flex items-center justify-between">
            <Typography.Title level={3} style={{ margin: 0, fontWeight: 700 }}>
              {`${new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(JSON.parse(data.price as string))}`}
              <span className="text-base font-normal text-neutral-700">{` (${data.inventory})`}</span>
            </Typography.Title>
          </div>
        </div>
      </div>
    </div>
  );
}
