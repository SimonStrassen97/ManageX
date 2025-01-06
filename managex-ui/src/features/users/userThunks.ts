import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchUsers, fetchCurrentUser, registerUser } from "../../api/usersApi"
import { CurrentUser, User, NewUser } from "./user-types"
import { UserTransformer } from "../../utils/transforms"
import { handleThunkError } from "../../utils/error-handling"

// Define the async thunk for fetching users
export const fetchUsersThunk = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchUserList", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchUsers()
    const users = UserTransformer.deserializeUsers(response.data)
    return users
  } catch (error: any) {
    return handleThunkError(error, rejectWithValue)
  }
})

// Define the async thunk for fetching the current user
export const fetchCurrentUserThunk = createAsyncThunk<
  CurrentUser,
  void,
  { rejectValue: string }
>("users/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchCurrentUser()
    const user = UserTransformer.deserializeUser(response.data)
    return user
  } catch (error: any) {
    return handleThunkError(error, rejectWithValue)
  }
})

// Define the async thunk for registering a new user
export const registerUserThunk = createAsyncThunk<
  CurrentUser,
  NewUser,
  { rejectValue: string }
>("users/registerUser", async (newUserData: NewUser, { rejectWithValue }) => {
  try {
    const response = await registerUser(newUserData)
    const user = UserTransformer.deserializeUser(response.data)
    return user
  } catch (error: any) {
    return handleThunkError(error, rejectWithValue)
  }
})
