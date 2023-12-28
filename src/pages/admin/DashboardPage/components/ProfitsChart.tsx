import { useGeneralStore } from "@/stores/useGeneralStore";
import { ResponsiveLine } from "@nivo/line";
import React from "react";

const ProfitsChart: React.FunctionComponent = () => {
  const statistics = useGeneralStore((state) => state.statistics);

  const profitData: any = statistics?.totalProfit.map((item) => ({
    x: item.date,
    y: item.profit,
  }));

  const revenueData: any = statistics?.totalProfit.map((item) => ({
    x: item.date,
    y: item.revenue,
  }));

  const lineModal = [
    { id: "Profit", data: profitData },
    { id: "Revenue", data: revenueData },
  ];

  return (
    <ResponsiveLine
      data={lineModal}
      margin={{ top: 50, right: 50, bottom: 20, left: 80 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      pointSize={10}
      colors={["#e05858", "#8354e2"]}
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

export default ProfitsChart;
