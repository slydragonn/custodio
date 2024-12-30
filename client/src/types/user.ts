import { PasswordData } from './passwords'

export interface UserData {
  ID: string
  CreatedAt: Date
  UpdatedAt: Date
  Name: string
  Email: string
  Passwords: PasswordData[]
}

export interface UserRegister {
  name: string
  email: string
  password: string
}

export interface UserLogin {
  email: string
  password: string
}

export type Token = string | null
