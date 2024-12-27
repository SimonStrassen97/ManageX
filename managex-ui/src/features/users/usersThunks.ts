import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchUsers } from "../../api/usersApi"

export const fetchUsersThunk = createAsyncThunk(
  "users/fetchUserList",
  async () => {
    return await fetchUsers()
  },
)
