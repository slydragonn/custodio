import { PasswordData } from './passwords'

export interface UserData {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  email: string
  passwords: PasswordData[]
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
