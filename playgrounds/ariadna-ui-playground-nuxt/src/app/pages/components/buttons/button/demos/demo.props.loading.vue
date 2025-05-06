<template>
  <Button size="small" loading>
    Loading small
    <template #loading>
      <Spinner size="small" />
    </template>
  </Button>

  <Button size="medium" loading>
    Loading medium
    <template #loading>
      <Spinner size="small" />
    </template>
  </Button>

  <Button size="large" loading>
    Loading large
    <template #loading>
      <Spinner size="small" />
    </template>
  </Button>
</template>

<script setup lang="ts">
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';
</script>
