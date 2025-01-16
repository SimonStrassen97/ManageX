// src/features/users/userThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchUsers, fetchCurrentUser, registerUser } from "../../api/usersApi"
import { User, NewUser } from "../../types/user-types"
import { UserTransformer } from "../../utils/transforms"
import { handleError, AppError } from "../../utils/error-handling"

// Define the async thunk for fetching users
export const fetchUsersThunk = createAsyncThunk<
  User[],
  void,
  { rejectValue: AppError }
>("users/fetchUserList", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchUsers()
    const users = UserTransformer.fromServer(response.data)
    return users
  } catch (error: any) {
    return handleError(error, rejectWithValue)
  }
})

// Define the async thunk for fetching the current user
export const fetchCurrentUserThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: AppError }
>("users/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchCurrentUser()
    const user = UserTransformer.fromServer(response.data)
    return user
  } catch (error: any) {
    return handleError(error, rejectWithValue)
  }
})

// Define the async thunk for registering a new user
export const registerUserThunk = createAsyncThunk<
  User,
  NewUser,
  { rejectValue: AppError }
>("users/registerUser", async (newUserData: NewUser, { rejectWithValue }) => {
  try {
    const response = await registerUser(newUserData)
    const user = UserTransformer.fromServer(response.data)
    return user
  } catch (error: any) {
    return handleError(error, rejectWithValue)
  }
})
