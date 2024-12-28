import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { loginThunk } from "./authThunks"
import { AuthState } from "./auth-types"

// Helper functions for localStorage management
const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      state.token = null
      state.user = null
      removeFromLocalStorage("token")
      removeFromLocalStorage("user")
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { token, user } = action.payload
        state.token = token
        state.user = user
        saveToLocalStorage("token", token)
        saveToLocalStorage("user", user)
        state.loading = false
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error logging in"
      })
  },
})

export const { logout } = authSlice.actions
export const authReducer = authSlice.reducer
