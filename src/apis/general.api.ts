import httpRequest from "@/services/httpRequest";

export const getStatistics = () => {
  return httpRequest.get("/general/statistics");
};

export const getRevenueByCategory = () => {
  return httpRequest.get("/general/revenue-by-category");
};

export const getOrdersInTimeline = () => {
  return httpRequest.get("/general/order-in-timeline");
};
