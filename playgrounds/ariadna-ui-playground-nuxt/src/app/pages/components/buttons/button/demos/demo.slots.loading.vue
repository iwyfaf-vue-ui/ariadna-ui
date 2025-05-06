<template>
  <Button loading>
    Loading button

    <template #loading>
      <Spinner size="small" />
    </template>
  </Button>
</template>

<script setup lang="ts">
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';
</script>
