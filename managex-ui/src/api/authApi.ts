import axiosInstance from "./axiosConfig"
import { SerializedToken } from "../types/server-response-types"
import { LoginData } from "../types/auth-types"

export const fetchToken = async (loginData: LoginData) => {
  return await axiosInstance.post<SerializedToken>("/api/token/", loginData)
}

export const refreshToken = async ({
  refreshToken,
}: {
  refreshToken: string
}) => {
  return await axiosInstance.post<SerializedToken>("/api/token/refresh/", {
    refresh: refreshToken,
  })
}
