import { Project } from '../../pages/projects/types'
import projectsDb from './projects-db.json'
import axios from 'axios'

export type Pagination = {
  page: number
  perPage: number
  total: number
}

export type Sorting = {
  sortBy: keyof (typeof projectsDb)[number] | undefined
  sortingOrder: 'asc' | 'desc' | null
}

const getSortItem = (obj: any, sortBy: keyof (typeof projectsDb)[number]) => {
  return obj[sortBy]
}

export const getProjects = async (options: Sorting & Pagination, searchWord: string) => {
  const response = await axios.get(
    `http://localhost:5288/api/SearchByName/GetLowestPriceInEachStore?searchWord=${searchWord}`,
  )
  const projects = response.data as Project[]

  if (options.sortBy && options.sortingOrder) {
    projects.sort((a, b) => {
      a = getSortItem(a, options.sortBy!)
      b = getSortItem(b, options.sortBy!)
      if (a < b) {
        return options.sortingOrder === 'asc' ? -1 : 1
      }
      if (a > b) {
        return options.sortingOrder === 'asc' ? 1 : -1
      }
      return 0
    })
  }
  const normalizedProjects = projects.slice((options.page - 1) * options.perPage, options.page * options.perPage)

  return {
    data: normalizedProjects,
    pagination: {
      page: options.page,
      perPage: options.perPage,
      total: projectsDb.length,
    },
  }
}
