export interface PasswordData {
  ID: string
  CreatedAt: Date
  UpdatedAt: Date
  Name: string
  Username: string
  Password: string
  Website: string
  Note: string
  Favorite: boolean
  UserID: string
}

export interface PasswordForm {
  name: string
  username: string
  password: string
  website: string
  note: string
  favorite: boolean
}
