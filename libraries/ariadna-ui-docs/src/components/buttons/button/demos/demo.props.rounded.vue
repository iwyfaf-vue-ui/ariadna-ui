<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap">
    <Button rounded> Rounded default button </Button>
    <Button modifier="primary" rounded> Rounded primary button </Button>
    <Button modifier="secondary" rounded> Rounded secondary button </Button>
    <Button modifier="success" rounded> Rounded success button </Button>
    <Button modifier="warning" rounded> Rounded warning button </Button>
    <Button modifier="danger" rounded> Rounded danger button </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
</script>
