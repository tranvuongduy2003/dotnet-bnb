import { Status } from "@/constants/status";
import httpRequest from "@/services/httpRequest";

export const getAllOrders = () => {
  return httpRequest.get("/orders");
};

export const addOrder = (data: any) => {
  return httpRequest.post("/orders", data);
};

export const cancelOrder = (orderId: string | number) => {
  return httpRequest.put(`/orders/${orderId}`, {
    status: Status.CANCELLED,
  });
};

export const changeOrderStatus = (orderId: string | number, status: Status) => {
  return httpRequest.put(`/orders/${orderId}`, {
    status: status,
  });
};
