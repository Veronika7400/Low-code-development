import { User } from './../../pages/users/types'
import axios from 'axios'

export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: keyof User | undefined
  sortingOrder: 'asc' | 'desc' | null
}

export type Filters = {
  isActive: boolean
  search: string
}

const getSortItem = (obj: any, sortBy: string) => {
  return obj[sortBy]
}

export const getUsers = async (filters: Partial<Filters & Pagination & Sorting>) => {
  try {
    const { isActive, search, sortBy, sortingOrder } = filters
    const response = await axios.get('http://localhost:5288/api/Identity/GetUsers', { params: filters })
    let filteredUsers = response.data as User[]

    filteredUsers = filteredUsers.filter((user) => user.active === isActive)

    if (search) {
      filteredUsers = filteredUsers.filter((user) => user.fullname.toLowerCase().includes(search.toLowerCase()))
    }

    if (sortBy && sortingOrder) {
      filteredUsers = filteredUsers.sort((a, b) => {
        const first = getSortItem(a, sortBy)
        const second = getSortItem(b, sortBy)
        if (first > second) {
          return sortingOrder === 'asc' ? 1 : -1
        }
        if (first < second) {
          return sortingOrder === 'asc' ? -1 : 1
        }
        return 0
      })
    }
    const { page = 1, perPage = 10 } = filters || {}
    return {
      data: filteredUsers.slice((page - 1) * perPage, page * perPage),
      pagination: {
        page,
        perPage,
        total: filteredUsers.length,
      },
    }
  } catch (error) {
    console.error('Failed to fetch users:', error)
    throw error
  }
}

export const addUser = async (user: User) => {
  try {
    const formattedUser = {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      username: user.username,
      role: user.role.toString(),
      avatar: user.avatar,
      active: user.active,
    }
    const response = await axios.post('http://localhost:5288/api/Identity/AddUser', formattedUser)
    console.log('User added successfully:', response.data)
  } catch (error) {
    console.error('Failed to add user:', error)
    throw error
  }
}

export const updateUser = async (user: User) => {
  try {
    const formattedUser = {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      username: user.username,
      role: user.role.toString(),
      avatar: user.avatar,
      active: user.active,
    }
    const response = await axios.post('http://localhost:5288/api/Identity/UpdateUser', formattedUser)
    console.log('User updated successfully:', response.data)
  } catch (error) {
    console.error('Failed to update user:', error)
    throw error
  }
}

export const removeUser = async (user: User) => {
  try {
    const response = await axios.delete(`http://localhost:5288/api/Identity/DeleteUser/${user.id}`)
    console.log(`User with ID ${user.id} has been successfully deleted.`)
    return response
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}
