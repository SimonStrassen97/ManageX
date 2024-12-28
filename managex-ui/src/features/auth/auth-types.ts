export interface LoginData {
  username: string
  password: string
}

export interface Token {
  access: string
  refresh: string
}

export interface CurrentUser {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
}

export interface AuthState {
  token: Token | null
  user: CurrentUser | null
  loading: boolean
  error: string | null
}
