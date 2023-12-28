import { refresh } from "@/apis/auth.api";
import { useAppStore } from "@/stores/useAppStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import axios from "axios";

export const logOut = () => {
  const setIsLoading = useAppStore.getState().setIsLoading;
  const reset = useAuthStore.getState().reset;
  const resetCart = useCartStore.getState().reset;

  setIsLoading(true);
  reset();
  resetCart();

  setIsLoading(false);
};

export const getAccessToken = () => {
  const token = useAuthStore.getState().token.accessToken;
  return token;
};

export const getRefreshToken = () => {
  const token = useAuthStore.getState().token.refreshToken;
  return token;
};

export const handleRefreshToken = async () => {
  const refreshToken = getRefreshToken();
  const { data } = await refresh(refreshToken);
  const setToken = useAuthStore.getState().setToken;
  setToken({ refreshToken, accessToken: data });
  return data;
};
