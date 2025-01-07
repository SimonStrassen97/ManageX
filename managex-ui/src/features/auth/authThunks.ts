// src/features/auth/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchToken, refreshToken } from "../../api/authApi";
import { LoginData, AuthToken } from "./auth-types";
import { TokenTransformer } from "../../utils/transforms";
import { handleError, AppError } from "../../utils/error-handling";

// Define the async thunk for login action
export const authThunk = createAsyncThunk<
  AuthToken,
  LoginData,
  { rejectValue: AppError }
>("auth/login", async (loginData: LoginData, { rejectWithValue }) => {
  try {
    const response = await fetchToken(loginData);
    const authToken = TokenTransformer.deserializeToken(response.data);
    return authToken;
  } catch (error: any) {
    return handleError(error, rejectWithValue);
  }
});

// Define the async thunk for refreshing the token
export const refreshThunk = createAsyncThunk<
  AuthToken,
  string,
  { rejectValue: AppError }
>("auth/refresh", async (refreshTokenValue: string, { rejectWithValue }) => {
  try {
    const response = await refreshToken({ refreshToken: refreshTokenValue });
    const newToken = TokenTransformer.deserializeToken(response.data);
    return newToken;
  } catch (error: any) {
    return handleError(error, rejectWithValue);
  }
});