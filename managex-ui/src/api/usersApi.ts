import axiosInstance from "./axiosConfig"

export const fetchUsers = async () => {
  const response = await axiosInstance.get("/api/users/")
  return response.data
}
