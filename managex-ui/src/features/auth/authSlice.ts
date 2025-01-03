import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authThunk, refreshThunk } from "./authThunks"
import { AuthState } from "./auth-types"

const initialState: AuthState = {
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("access_token"),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: state => {
      state.isAuthenticated = false
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("user")
    },
  },
  extraReducers: builder => {
    builder
      .addCase(authThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(authThunk.fulfilled, (state, action) => {
        const token = action.payload
        state.isAuthenticated = true
        localStorage.setItem("access_token", token.access)
        localStorage.setItem("refresh_token", token.refresh)
        state.loading = false
      })
      .addCase(authThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })
      .addCase(refreshThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        const token = action.payload
        state.isAuthenticated = true
        localStorage.setItem("access_token", token.access)
        localStorage.setItem("refresh_token", token.refresh)
        state.loading = false
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.isAuthenticated = false
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("user")
      })
  },
})

export const { logout } = authSlice.actions
export const authReducer = authSlice.reducer
