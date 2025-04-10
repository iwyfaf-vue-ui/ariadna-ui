<template>
  <h1>Button</h1>

  <Button size="large">
    Push me
    <template #loading> Zzz... </template>
  </Button>
  <Button modifier="danger" textual rounded>
    Push me
    <template #icon> © </template>
    <template #loading> Zzz... </template>
  </Button>
</template>

<script setup lang="ts">
// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Button',
});
</script>
