import api from "../api/axios";

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const getCurrentUser = async () => {
  const response = await api.get("/users/me");

  return response.data;
};

export const changePasswordService = async (data: ChangePasswordData) => {
  const response = await api.put("/users/change-password", data);

  return response.data;
};
