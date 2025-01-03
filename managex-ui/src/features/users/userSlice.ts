import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchUsersThunk, fetchCurrentUserThunk } from "./userThunks"
import { User, CurrentUser, CurrentUserState, UsersState } from "./user-types"

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
        state.error = action.error.message || "Error fetching users"
      })
  },
})

// Define the initial state for the current user
const initialCurrentUserState: CurrentUserState = {
  user: null,
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
        (state, action: PayloadAction<CurrentUser>) => {
          const user = action.payload
          state.loading = false
          state.user = user
          state.error = null
          localStorage.setItem("user", user.username)
        },
      )
      .addCase(fetchCurrentUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error fetching current user"
      })
  },
})

// Export reducers and actions
export const usersReducer = usersSlice.reducer
export const currentUserReducer = currentUserSlice.reducer
export const usersActions = usersSlice.actions
export const currentUserActions = currentUserSlice.actions
