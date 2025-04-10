<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap">
    <Button icon-position="left">
      Icon left
      <template #icon> © </template>
    </Button>

    <Button icon-position="top">
      Icon top
      <template #icon> © </template>
    </Button>

    <Button icon-position="right">
      Icon right
      <template #icon> © </template>
    </Button>

    <Button icon-position="bottom">
      Icon bottom
      <template #icon> © </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
</script>
