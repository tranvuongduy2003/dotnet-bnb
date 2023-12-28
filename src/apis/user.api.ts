import httpRequest from "@/services/httpRequest";

export const getAllUsers = () => {
  return httpRequest.get("/users");
};

export const updateUserProfile = (data: any) => {
  return httpRequest.put("/users/profile", data);
};

export const changeUserPassword = (data: any) => {
  return httpRequest.patch("/users/change-password", data);
};

export const changeUserStatus = (userId: string | number, isActive: 0 | 1) => {
  return httpRequest.patch(`users/change-status/${userId}/${isActive}`);
};
