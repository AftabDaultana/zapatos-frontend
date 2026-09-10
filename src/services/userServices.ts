import api from "../api/axios";

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface UpdateUserData {
  profilePicture?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
}

export const getCurrentUser = async () => {
  const response = await api.get("/users/me");

  return response.data;
};

export const changePasswordUser = async (data: ChangePasswordData) => {
  const response = await api.put("/users/change-password", data);

  return response.data;
};

export const updateUser = async (data: UpdateUserData) => {
  const response = await api.put("/users", data);

  return response.data;
};
