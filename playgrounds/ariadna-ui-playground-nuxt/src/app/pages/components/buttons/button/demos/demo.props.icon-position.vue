<template>
  <Button icon-position="left">
    Icon left
    <template #icon> 💩 </template>
  </Button>

  <Button icon-position="top">
    Icon top
    <template #icon> 💩 </template>
  </Button>

  <Button icon-position="right">
    Icon right
    <template #icon> 💩 </template>
  </Button>

  <Button icon-position="bottom">
    Icon bottom
    <template #icon> 💩 </template>
  </Button>
</template>

<script setup lang="ts">
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
</script>
