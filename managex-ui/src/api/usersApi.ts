import axiosInstance from "./axiosConfig"
import { UserResponse } from "../types/server-response-types"
import { NewUser } from "../types/user-types"

export const fetchUsers = async () => {
  return await axiosInstance.get<UserResponse[]>("/api/users/")
}

export const fetchCurrentUser = async () => {
  return await axiosInstance.get<UserResponse>("/api/users/me/")
}

export const registerUser = async (newUser: NewUser) => {
  return await axiosInstance.post<UserResponse>("/api/users/register/", newUser)
}
