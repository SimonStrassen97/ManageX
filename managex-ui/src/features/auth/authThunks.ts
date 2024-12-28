import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchUser, fetchToken } from "../../api/authApi"
import { LoginData, AuthState } from "./auth-types"

// Define the async thunk for login action
export const loginThunk = createAsyncThunk<
  AuthState,
  LoginData,
  { rejectValue: string }
>("auth/login", async (loginData: LoginData, { rejectWithValue }) => {
  try {
    // Fetch the token using the credentials
    const token = await fetchToken(loginData)
    if (!token) {
      return rejectWithValue("Failed to obtain token.")
    }

    // Fetch the user details using the obtained token
    const user = await fetchUser(token)
    if (!user) {
      return rejectWithValue("Failed to fetch user data.")
    }

    const authState: AuthState = {
      token,
      user,
      loading: false,
      error: null,
    }
    return authState
  } catch (error: unknown) {
    if (error instanceof Error) {
      // If error is an instance of Error, it will have a message
      return rejectWithValue(error.message || "An error occurred during login.")
    } else {
      // Handle any other unknown error case
      return rejectWithValue("An unknown error occurred.")
    }
  }
})
