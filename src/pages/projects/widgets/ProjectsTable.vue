<script setup lang="ts">
import { PropType, computed } from 'vue'
import { defineVaDataTableColumns } from 'vuestic-ui'
import { Project } from '../types'
import { Pagination, Sorting } from '../../../data/pages/projects'
import { useVModel } from '@vueuse/core'

const columns = defineVaDataTableColumns([
  { label: 'Store name', key: 'storeName', sortable: true },
  { label: 'Product name', key: 'productName', sortable: true },
  { label: 'Picture', key: 'imageUrl', sortable: false },
  { label: 'Link', key: 'url', sortable: false },
  { label: 'Price in euro', key: 'priceValue', sortable: true, button: true },
])

const props = defineProps({
  projects: {
    type: Array as PropType<Project[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  sortBy: {
    type: Object as PropType<Sorting['sortBy']>,
    required: true,
  },
  sortingOrder: {
    type: Object as PropType<Sorting['sortingOrder']>,
    required: true,
  },
  pagination: {
    type: Object as PropType<Pagination>,
    required: true,
  },
})

const emit = defineEmits<{
  (event: 'edit', project: Project): void
  (event: 'delete', project: Project): void
}>()

const sortByVModel = useVModel(props, 'sortBy', emit)
const sortingOrderVModel = useVModel(props, 'sortingOrder', emit)

const totalPages = computed(() => Math.ceil(props.pagination.total / props.pagination.perPage))
</script>

<template>
  <div>
    <VaDataTable
      v-model:sort-by="sortByVModel"
      v-model:sorting-order="sortingOrderVModel"
      :items="projects"
      :columns="columns"
      :loading="loading"
    >
      <template #cell(storeName)="{ rowData }">
        <div class="ellipsis max-w-[230px] lg:max-w-[450px]">
          {{ rowData.storeName }}
        </div>
      </template>
      <template #cell(productName)="{ rowData }">
        <div class="ellipsis max-w-[230px] lg:max-w-[450px]">
          {{ rowData.productName }}
        </div>
      </template>
      <template #cell(imageUrl)="{ rowData: project }">
        <div class="flex">
          <img :src="project.imageUrl" alt="Product Image" class="w-[100px] h-auto object-contain" />
        </div>
      </template>
      <template #cell(url)="{ rowData: project }">
        <a :href="project.url" target="_blank" rel="noopener noreferrer" class="text-[var(var(--va-primary)]">
          View details
        </a>
      </template>
      <template #cell(priceValue)="{ rowData: project }">
        <div class="ellipsis max-w-[230px] lg:max-w-[450px]">
          {{ project.priceValue }}
        </div>
      </template>
    </VaDataTable>
    <div class="flex flex-col-reverse md:flex-row gap-2 justify-between items-center py-2">
      <div>
        <b>{{ $props.pagination.total }} results.</b>
        Results per page
        <VaSelect v-model="$props.pagination.perPage" class="!w-20" :options="[10, 50, 100]" />
      </div>

      <div v-if="totalPages > 1" class="flex">
        <VaButton
          preset="secondary"
          icon="va-arrow-left"
          aria-label="Previous page"
          :disabled="$props.pagination.page === 1"
          @click="$props.pagination.page--"
        />
        <VaButton
          class="mr-2"
          preset="secondary"
          icon="va-arrow-right"
          aria-label="Next page"
          :disabled="$props.pagination.page === totalPages"
          @click="$props.pagination.page++"
        />
        <VaPagination
          v-model="$props.pagination.page"
          buttons-preset="secondary"
          :pages="totalPages"
          :visible-pages="5"
          :boundary-links="false"
          :direction-links="false"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.va-data-table {
  ::v-deep(tbody .va-data-table__table-tr) {
    border-bottom: 1px solid var(--va-background-border);
  }
}
</style>
