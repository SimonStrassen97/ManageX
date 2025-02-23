// src/features/users/user-types.ts
import { AppError } from "../utils/error-handling"

export interface User {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
}

export interface UsersState {
  users: User[]
  loading: boolean
  error: AppError | null
}

export interface CurrentUserState {
  user: User
  loading: boolean
  error: AppError | null
}

export interface UsersState {
  users: User[]
  loading: boolean
  error: AppError | null
}

export interface NewUser extends Omit<User, "id"> {
  password: string
}
