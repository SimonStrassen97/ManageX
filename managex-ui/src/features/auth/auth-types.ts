export interface LoginData {
  username: string
  password: string
}

export interface AuthToken {
  access: string
  refresh: string
}

export interface AuthState {
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}
