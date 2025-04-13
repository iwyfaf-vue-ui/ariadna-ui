<template>
  <h1>Button</h1>

  <Button size="large">
    Push me
    <template #loading> Zzz... </template>
  </Button>
  <Button modifier="primary"> Primary </Button>
  <Button modifier="secondary"> Secondary </Button>
  <Button modifier="success"> Success </Button>
  <Button modifier="warning"> Warning </Button>
  <Button modifier="danger"> Danger </Button>
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
