<script setup lang="ts">
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useProjects } from './composables/useProjects'
import ProjectCards from './widgets/ProjectCards.vue'
import ProjectTable from './widgets/ProjectsTable.vue'

const doShowAsCards = useLocalStorage('projects-view', true)
const { projects, isLoading, pagination, sorting, fetch } = useProjects()
const doShowProjectFormModal = ref(false)
const searchWord = ref('')

const searchProjects = async () => {
  try {
    await fetch(searchWord.value)
  } catch (error) {
    console.error('Error fetching projects:', error)
  }
  doShowProjectFormModal.value = true
}
</script>

<template>
  <h1 class="page-title">Budget Finds Hub</h1>

  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <div class="flex flex-col md:flex-row gap-2 justify-start">
          <VaButtonToggle
            v-model="doShowAsCards"
            color="background-element"
            border-color="background-element"
            :options="[
              { label: 'Cards', value: true },
              { label: 'Table', value: false },
            ]"
          />
        </div>
        <VaInput v-model="searchWord" placeholder="ssd" />
        <VaButton icon="search" @click="searchProjects">Search</VaButton>
      </div>

      <ProjectCards v-if="doShowAsCards" :projects="projects" :loading="isLoading" />
      <ProjectTable
        v-else
        v-model:sort-by="sorting.sortBy"
        v-model:sorting-order="sorting.sortingOrder"
        v-model:pagination="pagination"
        :projects="projects"
        :loading="isLoading"
      />
    </VaCardContent>
  </VaCard>
</template>
