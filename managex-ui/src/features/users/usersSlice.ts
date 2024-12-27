import { UserList } from "./users-types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchUsersThunk } from "./usersThunks"

const initialState: UserList = {
  users: [],
  loading: false,
  error: null,
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsersThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.users
        state.error = null
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Error fetching Users"
      })
  },
})

export const usersReducer = usersSlice.reducer
export const usersActions = usersSlice.actions
