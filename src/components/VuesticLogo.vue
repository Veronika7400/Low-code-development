<template>
  <RouterLink to="/">
    <svg :height="height" alt="Crawler Logo" fill="none" viewBox="0 0 90 40" xmlns="http://www.w3.org/2000/svg">
      <image
        xlink:href="Logo.png"
        width="100%"
        height="100%"
      />
      <defs>
        <linearGradient id="paint0_linear" gradientUnits="userSpaceOnUse" x1="0" x2="357.64" y1="56.1386" y2="56.1386">
          <stop :stop-color="colorsComputed.end" />
          <stop :stop-color="colorsComputed.start" offset="1" />
        </linearGradient>
      </defs>
    </svg>
  </RouterLink>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useColors } from 'vuestic-ui'

const { getColor } = useColors()

const props = withDefaults(
  defineProps<{
    height?: number
    start?: string
    end?: string
  }>(),
  {
    height: 60,
    start: 'primary',
    end: undefined,
  },
)

const colorsComputed = computed(() => {
  return {
    start: getColor(props.start),
    end: getColor(props.end || props.start),
  }
})
</script>
