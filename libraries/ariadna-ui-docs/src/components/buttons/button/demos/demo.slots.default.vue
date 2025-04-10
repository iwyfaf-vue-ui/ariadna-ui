<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap">
    <Button> Default slot </Button>
    <Button>
      <template #default> Explicit default slot </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
</script>
