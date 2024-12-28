import axiosInstance from "./axiosConfig"
import { SerializedUserList } from "./server-response-types"
import { UserList } from "../features/users/users-types"
import { UserTransformer } from "../utils/transforms"

export const fetchUsers = async (): Promise<UserList> => {
  const response = await axiosInstance.get("/api/users/")
  const serializedUsers: SerializedUserList = response.data
  return UserTransformer.deserializeUsers(serializedUsers)
}
