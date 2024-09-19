<script setup lang="ts">
import { PropType } from 'vue'
import { Project } from '../types'

defineProps({
  projects: {
    type: Array as PropType<Project[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <VaInnerLoading
    v-if="projects.length > 0 || loading"
    :loading="loading"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[4rem]"
  >
    <VaCard
      v-for="project in projects"
      :key="project.storeName"
      :style="{ '--va-card-outlined-border': '1px solid var(--va-background-element)' }"
      outlined
    >
      <VaCardContent class="flex flex-col h-full">
        <h4
          class="va-h4 text-center self-stretch overflow-hidden line-clamp-2 text-ellipsis text-[var(--va-secondary)]"
        >
          {{ project.storeName }}
        </h4>
        <div class="flex flex-col items-center gap-4 grow">
          <img :src="project.imageUrl" alt="Product Image" class="h-auto w-[150px] h-[150px] object-contain" />
          <p>
            <span class="text-[var(--va-secondary)]"></span>
            <span>{{ project.productName }}</span>
          </p>
          <div class="text-[var(--va-primary)]" style="color: white">
            {{ project.priceValue + ' EUR ' }}
          </div>
        </div>
        <VaDivider class="my-6" />
        <div class="flex justify-between">
          <a :href="project.url" target="_blank" rel="noopener noreferrer" class="text-[var(--va-secondary)]">
            View details
          </a>
        </div>
      </VaCardContent>
    </VaCard>
  </VaInnerLoading>
  <div v-else class="p-4 flex justify-center items-center text-[var(--va-secondary)]">No projects</div>
</template>
