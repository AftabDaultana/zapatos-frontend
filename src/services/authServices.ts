import api from "../api/axios";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ForgotPasswordData {
  email: string;
}

export interface VerifyOTPData {
  otp: string;
}

export interface ResetPasswordData {
  newPassword: string;
  confirmNewPassword: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const logoutUserApi = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

export const forgotPasswordUser = async (data: ForgotPasswordData) => {
  const response = await api.post("/auth/forgot-password", data);

  return response.data;
};

export const verifyOtpUser = async (data: VerifyOTPData) => {
  const response = await api.post("/auth/verify-otp", data);

  return response.data;
};

export const resetPasswordUser = async (data: ResetPasswordData) => {
  const response = await api.post("/auth/reset-password", data);

  return response.data;
};
