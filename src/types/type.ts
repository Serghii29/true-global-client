export interface User {
  id: number
  email: string
  access_token: string
}

export interface UserData {
  email: string
  password: string
  name?: string
}

export interface ResponeUser {
  email: string
  hashed_password: string
  name: string
  id: string
  createdAt: string
}

export interface ResponeUserData {
  token: string
  user: ResponeUser
}
