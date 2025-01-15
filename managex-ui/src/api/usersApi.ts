import axiosInstance from "./axiosConfig"
import { SerializedUser, SerializedUserDetailed } from "../types/server-response-types"
import { NewUser } from "../types/user-types"

export const fetchUsers = async () => {
  return await axiosInstance.get<SerializedUser[]>("/api/users/")
}

export const fetchCurrentUser = async () => {
  return await axiosInstance.get<SerializedUserDetailed>("/api/users/me/")
}

export const registerUser = async (newUser: NewUser) => {
  return await axiosInstance.post<SerializedUserDetailed>(
    "/api/users/register/",
    newUser,
  )
}
