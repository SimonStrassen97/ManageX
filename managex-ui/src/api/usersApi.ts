import axiosInstance from "./axiosConfig"
import {
  SerializedUserList,
  SerializedUserDetailed,
} from "./server-response-types"
import { NewUser } from "../features/users/user-types"

export const fetchUsers = async () => {
  return await axiosInstance.get<SerializedUserList>("/api/users/")
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
