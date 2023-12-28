import { useCategoriesStore } from "@/stores/useCategoryStore";
import { useProductStore } from "@/stores/useProductStore";
import { ResponsivePie } from "@nivo/pie";
import { Col, Row, Typography } from "antd";
import React from "react";

// interface ICategoriesChartProps {}

const CategoriesChart: React.FunctionComponent = () => {
  const categories = useCategoriesStore((state) => state.categories);
  const products = useProductStore((state) => state.products);

  const data = categories.map((item) => {
    const value = products
      .filter((product) => product.categoryId === item.id)
      .map((product) => JSON.parse(product.price as string) * product.sold)
      .reduce((prev, cur) => prev + cur, 0);

    return { id: item.name, label: item.name, value: value };
  });

  return (
    <div className="p-6 border border-solid rounded-lg border-neutral-200">
      <Typography.Title level={4} style={{ margin: 0 }}>
        Categories
      </Typography.Title>

      <div>
        <div className="h-60">
          <ResponsivePie
            data={data}
            margin={{ right: 40, left: 40, bottom: 40, top: 40 }}
            innerRadius={0.65}
            colors={["#E05858FF", "#1091F4FF"]}
            fit={true}
            activeOuterRadiusOffset={8}
            enableArcLinkLabels={false}
            enableArcLabels={false}
          />
        </div>
        <div className="flex flex-col items-center gap-6">
          <Row className="w-full" justify={"space-between"}>
            <Col className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#E05858FF]"></div>
              <span className="text-base">Perfume</span>
            </Col>
            <Col className="flex items-center gap-2">
              <span className="text-base font-semibold">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(data[0]?.value || 0)}
              </span>
              <span className="px-2 py-1 text-sm rounded-full text-[#E05858FF] bg-[#ffe0e0] font-medium">
                {`${
                  data && data[0] && data[1]
                    ? (
                        (data[0].value / (data[0].value + data[1].value)) *
                        100
                      ).toFixed()
                    : 0
                }%`}
              </span>
            </Col>
          </Row>
          <Row className="w-full" justify={"space-between"}>
            <Col className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#1091F4FF]"></div>
              <span className="text-base">Cosmetis</span>
            </Col>
            <Col className="flex items-center gap-2">
              <span className="text-base font-semibold">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(data[1]?.value || 0)}
              </span>
              <span className="px-2 py-1 text-sm font-medium rounded-full text-[#1091F4FF] bg-blue-100">
                {`${
                  data && data[0] && data[1]
                    ? (
                        (data[1].value / (data[0].value + data[1].value)) *
                        100
                      ).toFixed()
                    : 0
                }%`}
              </span>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CategoriesChart;
