import { useGeneralStore } from "@/stores/useGeneralStore";
import { ResponsiveLine } from "@nivo/line";
import React from "react";

const OrdersChart: React.FunctionComponent = () => {
  const statistics = useGeneralStore((state) => state.statistics);

  const data: any = statistics?.totalOrder?.map((item) => ({
    x: item.date,
    y: item.totalOrders,
  }));

  const lineModal = [
    {
      id: "Orders",
      data: data,
    },
  ];

  return (
    <ResponsiveLine
      data={lineModal}
      margin={{ top: 50, bottom: 20, left: 80, right: 50 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      pointSize={10}
      colors={["#006d7c"]}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "top",
          direction: "row",
          translateY: -50,
          itemWidth: 80,
          itemHeight: 20,
          symbolSize: 12,
          symbolShape: "circle",
        },
      ]}
    />
  );
};

export default OrdersChart;
