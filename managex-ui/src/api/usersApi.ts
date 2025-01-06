import axiosInstance from "./axiosConfig"
import { SerializedUserList } from "./server-response-types"
import { SerializedUserDetailed } from "./server-response-types"
import { User, NewUser } from "../features/users/user-types"
import { UserTransformer } from "../utils/transforms"

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get("/api/users/")
  const serializedUsers: SerializedUserList = response.data
  return UserTransformer.deserializeUsers(serializedUsers)
}

export const fetchCurrentUser = async (): Promise<SerializedUserDetailed> => {
    const response = await axiosInstance.get("/api/users/me/")
    const serializedUserDetailed: SerializedUserDetailed = response.data
    return UserTransformer.deserializeUser(serializedUserDetailed)

}

export const registerUser = async (
  newUser: NewUser,
): Promise<SerializedUserDetailed> => {
  const response = await axiosInstance.post("/api/users/register/", newUser)
  const serializedUser: SerializedUserDetailed = response.data
  return UserTransformer.deserializeUser(serializedUser)
}
