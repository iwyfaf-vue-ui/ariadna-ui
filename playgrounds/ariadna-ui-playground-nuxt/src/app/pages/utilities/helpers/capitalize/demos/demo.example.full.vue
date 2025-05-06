<template>
  {{ capitalize('john') }}

  {{ capitalizeComputed }}
</template>

<script setup lang="ts">
// Utils
import capitalize from '@iwyfaf-vue-ui/ariadna-ui/Capitalize';

const capitalizeComputed = computed(() => capitalize('smith'));
</script>
