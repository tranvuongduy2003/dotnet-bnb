import { useCategoriesStore } from "@/stores/useCategoryStore";
import { useGeneralStore } from "@/stores/useGeneralStore";
import { ResponsiveBar } from "@nivo/bar";
import React from "react";

const RevenueChart: React.FunctionComponent = () => {
  const revenues = useGeneralStore((state) => state.revenues);
  const categories = useCategoriesStore((state) => state.categories);

  const dataMap = new Map();

  revenues.forEach((revenue) => {
    const categoryName =
      categories.find((item) => item.id === revenue.categoryId)?.name || "";

    const value = dataMap.get(revenue.date);
    dataMap.set(revenue.date, { [categoryName]: revenue.revenue, ...value });
  });

  const data = [];
  for (const [key, value] of dataMap) {
    data.push({
      date: key,
      ...value,
    });
  }

  return (
    <ResponsiveBar
      data={data}
      keys={["Perfume", "Cosmetis"]}
      indexBy="date"
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      margin={{ left: 120, bottom: 50, top: 70, right: 50 }}
      colors={["hsl(187, 100%, 42%)", "hsl(222, 11%, 77%)"]}
      enableLabel={false}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Revenue",
        legendPosition: "middle",
        legendOffset: -100,
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "top",
          direction: "row",
          itemWidth: 100,
          itemHeight: 20,
          translateY: -50,
          symbolShape: "circle",
          symbolSize: 20,
        },
      ]}
    />
  );
};

export default RevenueChart;
