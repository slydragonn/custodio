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
  Name: string
  Username: string
  Password: string
  Website: string
  Note: string
  Favorite: boolean
}
