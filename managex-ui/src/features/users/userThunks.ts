import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchUsers, fetchCurrentUser, registerUser } from "../../api/usersApi"
import { CurrentUser, User, NewUser } from "./user-types"

// Define the async thunk with custom rejection value type
export const fetchUsersThunk = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchUserList", async (_, { rejectWithValue }) => {
  try {
    const users = await fetchUsers()
    return users
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue("An unknown error occurred.")
    }
  }
})

export const fetchCurrentUserThunk = createAsyncThunk<
  CurrentUser,
  void,
  { rejectValue: string }
>("users/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const user = await fetchCurrentUser()
    return user
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue("An unknown error occurred.")
    }
  }
})

export const registerUserThunk = createAsyncThunk<
  CurrentUser,
  NewUser,
  { rejectValue: string }
>("users/registerUser", async (newUserData: NewUser, { rejectWithValue }) => {
  try {
    const user = await registerUser(newUserData)
    return user
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue("An unknown error occurred.")
    }
  }
})
