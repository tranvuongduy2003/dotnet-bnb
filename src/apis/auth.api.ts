import { ILoginPayload } from "@/interfaces/IAuth";
import httpRequest from "@/services/httpRequest";

export const login = (data: ILoginPayload) => {
  return httpRequest.post("/auth/login", data);
};

export const signUp = (data: any) => {
  return httpRequest.post("/auth/signup", data);
};

export const refresh = (token: string) => {
  return httpRequest.post("/auth/refresh-token", { refreshToken: token });
};
