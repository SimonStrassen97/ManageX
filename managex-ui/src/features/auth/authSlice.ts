import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  isAuthenticated: boolean
  user: string | null // Adjust type if needed
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true
      state.user = action.payload // Example: Set user email
    },
    logout: state => {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions
export const authReducer = authSlice.reducer
