export interface User {
  id: number
  username: string
  first_name: string
  last_name: string
}

export interface UserList {
  users: User[]
  loading: boolean
  error: null | string
}
