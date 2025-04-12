// src/features/users/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  fetchUsersThunk,
  fetchCurrentUserThunk,
  registerUserThunk,
} from "./userThunks"
import { User, CurrentUserState, UsersState } from "../../types/user-types"
import { AppError } from "../../utils/error-handling"

// Define the initial state for users
const initialUsersState: UsersState = {
  users: [],
  loading: false,
  error: null,
}

// Create the users slice
const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsersThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchUsersThunk.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false
          state.users = action.payload
          state.error = null
        },
      )
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as AppError
      })
  },
})

// helper function to get the stored user from localStorage
const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem("user")
  if (!storedUser) return null

  try {
    return JSON.parse(storedUser) as User
  } catch (error) {
    console.error("Failed to parse stored user:", error)
    localStorage.removeItem("user") // Clear invalid user data
    return null
  }
}

// Define the initial state for the current user
const initialCurrentUserState: CurrentUserState = {
  user: getStoredUser(),
  loading: false,
  error: null,
}
// Create the current user slice
const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: initialCurrentUserState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCurrentUserThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchCurrentUserThunk.fulfilled,
        (state, action: PayloadAction<User>) => {
          const user = action.payload
          state.loading = false
          state.user = user
          state.error = null
          localStorage.setItem("user", JSON.stringify(user))
        },
      )
      .addCase(fetchCurrentUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as AppError
      })
      .addCase(registerUserThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        registerUserThunk.fulfilled,
        (state, action: PayloadAction<User>) => {
          const user = action.payload
          state.loading = false
          state.user = user
          state.error = null
          localStorage.setItem("user", JSON.stringify(user))
        },
      )
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as AppError
      })
  },
})

// Export reducers and actions
export const usersReducer = usersSlice.reducer
export const currentUserReducer = currentUserSlice.reducer
export const usersActions = usersSlice.actions
export const currentUserActions = currentUserSlice.actions
