export type UserRole = 'admin' | 'user'

export type User = {
  id: string
  fullname: string
  email: string
  username: string
  role: UserRole
  avatar: string
  active: boolean
}
