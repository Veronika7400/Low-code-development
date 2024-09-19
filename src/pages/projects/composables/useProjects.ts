import { Ref, ref, unref } from 'vue'
import { getProjects, Sorting, Pagination } from '../../../data/pages/projects'
import { Project } from '../types'
import { watchIgnorable } from '@vueuse/core'

const makePaginationRef = () => ref<Pagination>({ page: 1, perPage: 10, total: 0 })
const makeSortingRef = () => ref<Sorting>({ sortBy: 'priceValue', sortingOrder: 'asc' })

export const useProjects = (options?: { sorting?: Ref<Sorting>; pagination?: Ref<Pagination> }) => {
  const isLoading = ref(false)
  const projects = ref<Project[]>([])
  let word = 'ssd'
  const { sorting = makeSortingRef(), pagination = makePaginationRef() } = options ?? {}

  const fetch = async (searchWord: string = 'ssd') => {
    isLoading.value = true
    word = searchWord
    const { data, pagination: newPagination } = await getProjects(
      {
        ...unref(sorting),
        ...unref(pagination),
      },
      searchWord,
    )
    projects.value = data as Project[]
    console.log(projects.value)
    ignoreUpdates(() => {
      pagination.value = newPagination
    })

    isLoading.value = false
  }

  const { ignoreUpdates } = watchIgnorable([pagination, sorting], () => fetch(word), { deep: true })

  fetch()

  return {
    isLoading,

    projects,

    fetch,

    pagination,
    sorting,
  }
}
