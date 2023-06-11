<script setup lang="ts">
import type { Heading } from '@/types/heading'

const props = defineProps<{
  headings: Heading[]
}>()
</script>
<template>
  <ul class="catalog-list">
    <template v-for="heading in props.headings" :key="heading.slug">
      <li class="catalog__item">
        <a :href="`#${heading.slug}`" class="catalog__link">
          {{ heading.text }}
        </a>
        <template v-if="heading.children.length">
          <CatalogTree :headings="heading.children" />
        </template>
      </li>

    </template>
  </ul>
</template>
<style scoped lang="postcss">
</style>
