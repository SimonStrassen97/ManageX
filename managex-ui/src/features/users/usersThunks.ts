import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchUsers } from "../../api/usersApi"
import { UserList } from "./users-types"

// Define the async thunk with custom rejection value type
export const fetchUsersThunk = createAsyncThunk<
  UserList,
  void,
  { rejectValue: string }
>("users/fetchUserList", async (_, { rejectWithValue }) => {
  try {
    const users = await fetchUsers()
    return users
  } catch (error) {
    // Use rejectWithValue to return a custom error message
    return rejectWithValue("Failed to fetch users")
  }
})
