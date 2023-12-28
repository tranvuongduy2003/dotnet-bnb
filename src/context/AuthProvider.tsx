import { login } from "@/apis/auth.api";
import { Role } from "@/constants/role";
import { useAppStore } from "@/stores/useAppStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { notification } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext({});

type NotificationType = "success" | "info" | "warning" | "error";

const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const setIsLoading = useAppStore((state) => state.setIsLoading);
  const setToken = useAuthStore((state) => state.setToken);
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const setProfile = useAuthStore((state) => state.setProfile);
  const profile = useAuthStore((state) => state.profile);

  const logIn = async (payload: any) => {
    setIsLoading(true);
    try {
      // LOGIN THEN GET AND SET TOKENS
      const { data } = await login(payload);
      const { user: profile, token } = data;

      // SAVE USER SESSION
      setToken(token);
      setProfile(profile);
      setLoggedIn(true);

      // NAVIGATE TO HOME PAGE
      setIsLoading(false);
      notification.success({
        message: "Login successfully!",
        duration: 0.25,
        onClose: () =>
          profile.role === Role.CUSTOMER
            ? navigate("/")
            : profile.role === Role.ADMIN
            ? navigate("/admin/dashboard")
            : profile.role === Role.DELIVERER
            ? navigate("/delivery/order-management")
            : null,
      });
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      notification.error({
        message: error.message,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};
export default AuthProvider;
