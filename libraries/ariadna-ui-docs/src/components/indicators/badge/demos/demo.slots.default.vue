<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap">
    <Badge> Default slot </Badge>
    <Badge>
      <template #default> Explicit default slot </template>
    </Badge>
  </div>
</template>

<script setup lang="ts">
import Badge from '@iwyfaf-vue-ui/ariadna-ui/Badge';
</script>
