export enum UserRole {
  Admin = 'Admin',
  Student = 'Student'
}

export interface IUser {
  id?: string
  displayName: string
  email: string
  passwordHash: string
  role: UserRole
}
