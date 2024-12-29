export interface PasswordData {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  username: string
  password: string
  website: string
  note: string
  favorite: boolean
  userId: string
}

export interface PasswordForm {
  name: string
  username: string
  password: string
  website: string
  note: string
  favorite: boolean
}
