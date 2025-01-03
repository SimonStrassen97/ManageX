import axiosInstance from "./axiosConfig"
import { SerializedToken } from "./server-response-types"
import { AuthToken, LoginData } from "../features/auth/auth-types"
import { TokenTransformer } from "../utils/transforms"

export const fetchToken = async ({
  username,
  password,
}: LoginData): Promise<AuthToken> => {
  const response = await axiosInstance.post("/api/token/", {
    username,
    password,
  })
  const serializedToken: SerializedToken = response.data
  return TokenTransformer.deserializeToken(serializedToken)
}

export const refreshToken = async ({
  refreshToken,
}: {
  refreshToken: string
}) => {
  const response = await axiosInstance.post("/api/token/refresh/", {
    refresh: refreshToken,
  })
  const serializedToken: SerializedToken = response.data
  return TokenTransformer.deserializeToken(serializedToken)
}
