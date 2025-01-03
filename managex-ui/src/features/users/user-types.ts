export interface User {
  id: number
  username: string
  first_name: string
  last_name: string
}

export interface UsersState {
  users: User[]
  loading: boolean
  error: null | string
}

export interface CurrentUser extends User {
  email: string
}

export interface CurrentUserState {
  user: CurrentUser | null
  loading: boolean
  error: null | string
}

export interface NewUser extends Omit<CurrentUser, "id"> {
  password: string
}
