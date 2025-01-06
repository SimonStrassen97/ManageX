import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchToken, refreshToken } from "../../api/authApi"
import { LoginData, AuthToken } from "./auth-types"

// Define the async thunk for login action
export const authThunk = createAsyncThunk<
  AuthToken,
  LoginData,
  { rejectValue: string }
>("auth/login", async (loginData: LoginData, { rejectWithValue }) => {
  try {
    // Fetch the token using the credentials
    const authToken = await fetchToken(loginData)
    if (!authToken || !authToken.access || !authToken.refresh) {
      return rejectWithValue("Failed to obtain token.")
    }

    return authToken
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(
        error.response.data.detail || "Invalid credentials.",
      )
    } else if (error.message) {
      // Network or client-side error
      console.error("Network or client-side error:", error.message);
      throw new Error("A network error occurred. Please try again.");
    } else {
      // Unknown error
      console.error("Unknown error:", error);
      throw new Error("An unknown error occurred.");
    }
  }
})

// Define the async thunk for refreshing the token
export const refreshThunk = createAsyncThunk<
  AuthToken,
  string,
  { rejectValue: string }
>("auth/refresh", async (refreshTokenValue: string, { rejectWithValue }) => {
  try {
    const newToken = await refreshToken({ refreshToken: refreshTokenValue })
    if (!newToken || !newToken.access || !newToken.refresh) {
      return rejectWithValue("Failed to refresh token.")
    }

    return newToken
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(
        error.response.data.detail || "Failed to refresh token.",
      )
    } else if (error.message) {
      console.error("Network or client-side error:", error.message);
      throw new Error("A network error occurred. Please try again.");
    } else {
      console.error("Unknown error:", error);
      throw new Error("An unknown error occurred.");
    }
}
})
