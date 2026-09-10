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

export const getUserByIdAdmin = async (id: string) => {
  const response = await api.get(`/users/admin/${id}`);

  return response.data;
};

export const getAllUsersAdmin = async (page: number, limit: number) => {
  const response = await api.get("users/admin", {
    params: {
      page,
      limit,
    },
  });

  return response.data;
};

export const updateUserStatusAdmin = async (id: string) => {
  const response = await api.put(`/users/admin/${id}`);

  return response.data;
};
