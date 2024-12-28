import axiosInstance from "./axiosConfig"
import {
  SerializedUserDetailed,
  SerializedToken,
} from "./server-response-types"
import { Token } from "../features/auth/auth-types"
import { LoginData } from "../features/auth/auth-types"
import { CurrentUserTransformer, TokenTransformer } from "../utils/transforms"

export const fetchToken = async ({
  username,
  password,
}: LoginData): Promise<Token> => {
  const response = await axiosInstance.post("/api/token/", {
    username,
    password,
  })
  const serializedToken: SerializedToken = response.data
  return TokenTransformer.deserializeToken(serializedToken)
}

export const fetchUser = async (
  token: SerializedToken,
): Promise<SerializedUserDetailed> => {
  const response = await axiosInstance.post("/api/ussers/me/", {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  })
  const serializedUserDetailed: SerializedUserDetailed = response.data
  return CurrentUserTransformer.deserializeUser(serializedUserDetailed)
}
