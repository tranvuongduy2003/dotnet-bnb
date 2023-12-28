import { getAllCategories } from "@/apis/category.api";
import {
  getOrdersInTimeline,
  getRevenueByCategory,
  getStatistics,
} from "@/apis/general.api";
import { getAllProducts } from "@/apis/product.api";
import { useAppStore } from "@/stores/useAppStore";
import { useCategoriesStore } from "@/stores/useCategoryStore";
import { useGeneralStore } from "@/stores/useGeneralStore";
import { useProductStore } from "@/stores/useProductStore";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, List, Row, Skeleton, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import CategoriesChart from "./components/CategoriesChart";
import OrdersChart from "./components/OrdersChart";
import OverviewItem from "./components/OverviewItem";
import ProfitsChart from "./components/ProfitsChart";
import RevenueChart from "./components/RevenueChart";
import TimelineItem from "./components/TimelineItem";

const DashboardPage: React.FunctionComponent = () => {
  const isLoading = useAppStore((state) => state.isLoading);
  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const setCategories = useCategoriesStore((state) => state.setCategories);
  const setProducts = useProductStore((state) => state.setProducts);
  const setRevenues = useGeneralStore((state) => state.setRevenues);
  const setTimeline = useGeneralStore((state) => state.setTimeline);
  const timeline = useGeneralStore((state) => state.timeline);
  const setStatistics = useGeneralStore((state) => state.setStatistics);
  const statistics = useGeneralStore((state) => state.statistics);

  const [loadSize, setLoadSize] = useState<number>(1);

  const fetchDashboardData = useRef<any>();

  useEffect(() => {
    fetchDashboardData.current = async () => {
      setIsLoading(true);
      try {
        const { data: statisticsDate } = await getStatistics();
        const { data: revenueData } = await getRevenueByCategory();
        const { data: productsData } = await getAllProducts();
        const { data: categoryData } = await getAllCategories();
        const { data: timelineData } = await getOrdersInTimeline();

        setStatistics(statisticsDate);
        setRevenues(revenueData);
        setTimeline(timelineData);
        setCategories(categoryData);
        setProducts(productsData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchDashboardData.current();
  }, []);

  return (
    <div className="p-8">
      {/* TITlE */}
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          <Typography.Title level={2} style={{ margin: 0 }}>
            Dashboard
          </Typography.Title>
        </Col>
      </Row>

      <Row align={"middle"} gutter={18} className="px-6 mx-6 mt-8">
        <Col span={6}>
          <OverviewItem
            color="#4069E5FF"
            title="Products"
            value={statistics?.totalProducts || 0}
          />
        </Col>
        <Col span={6}>
          <OverviewItem
            color="#ed7c2c"
            title="Customer"
            value={statistics?.totalCustomer || 0}
          />
        </Col>
        <Col span={6}>
          <OverviewItem
            color="#E05858FF"
            title="Profits"
            value={new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(
              statistics?.totalProfit
                ?.map((item) => item.profit)
                ?.reduce((prev, cur) => prev + cur) || 0
            )}
          />
        </Col>
        <Col span={6}>
          <OverviewItem
            color="#8353E2FF"
            title="Revenue"
            value={new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(
              statistics?.totalProfit
                ?.map((item) => item.revenue)
                ?.reduce((prev, cur) => prev + cur) || 0
            )}
          />
        </Col>
      </Row>

      <div className="p-6 mx-6 mt-8 rounded-lg shadow-md">
        <Typography.Title level={3} style={{ margin: 0 }}>
          Overview
        </Typography.Title>
        {isLoading ? (
          <Skeleton />
        ) : (
          <Row className="mt-6" align={"middle"} justify={"space-between"}>
            <Col span={15} className="rounded-md h-[390px] bg-neutral-100">
              <RevenueChart />
            </Col>
            <Col span={8}>
              <CategoriesChart />
            </Col>
          </Row>
        )}
      </div>

      <div className="p-6 mx-6 mt-8 rounded-lg shadow-md">
        <Typography.Title level={3} style={{ margin: 0 }}>
          Sales
        </Typography.Title>
        {isLoading ? (
          <Skeleton />
        ) : (
          <Row
            className="mt-6"
            gutter={24}
            align={"middle"}
            justify={"space-between"}
          >
            <Col span={12} className="h-80">
              <OrdersChart />
            </Col>
            <Col span={12} className="h-80">
              <ProfitsChart />
            </Col>
          </Row>
        )}
      </div>

      <div className="p-6 mx-6 mt-8 rounded-lg shadow-md">
        <Typography.Title level={3} style={{ margin: 0 }}>
          Orders
        </Typography.Title>
        <div className="flex flex-col gap-6 mt-6">
          {isLoading ? (
            <Skeleton />
          ) : (
            <List
              loading={isLoading}
              itemLayout="vertical"
              loadMore={
                timeline?.slice(0, loadSize).length < timeline?.length ? (
                  <div className="flex justify-center">
                    <Button
                      onClick={() => setLoadSize((cur) => cur + 2)}
                      type="ghost"
                      className="text-sm text-center text-primary-500"
                    >
                      Loadmore <DownOutlined />
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Button
                      onClick={() => setLoadSize(1)}
                      type="ghost"
                      className="text-sm text-center text-primary-500"
                    >
                      Show less <UpOutlined />
                    </Button>
                  </div>
                )
              }
              dataSource={timeline?.slice(0, loadSize)}
              renderItem={(item: any, index) => {
                console.log("🚀 ~ file: DashboardPage.tsx:198 ~ item:", item);
                return (
                  <List.Item className="!border-none">
                    <TimelineItem
                      key={index}
                      title={item.date}
                      orders={item.orders}
                    />
                  </List.Item>
                );
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
