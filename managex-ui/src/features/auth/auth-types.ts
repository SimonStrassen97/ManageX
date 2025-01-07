import { AppError } from "../../utils/error-handling"

export interface LoginData {
  username: string
  password: string
}

export interface AuthToken {
  access: string
  refresh: string
}

export interface AuthState {
  loading: boolean;
  error: AppError | null;
  isAuthenticated: boolean;
}
