<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap">
    <Spinner> Default slot </Spinner>
    <Spinner>
      <template #default> Explicit default slot </template>
    </Spinner>
  </div>
</template>

<script setup lang="ts">
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';
</script>
