<template>
  <h1>Capitalize</h1>

  {{ capitalize('john') }}
  {{ capitalizeComputed }}
</template>

<script setup lang="ts">
import capitalize from '@iwyfaf-vue-ui/ariadna-ui/Capitalize';

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Capitalize',
});

const capitalizeComputed = computed(() => capitalize('smith'));
</script>
