<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap">
    <Button outlined> Outlined default button </Button>
    <Button modifier="primary" outlined> Outlined primary button </Button>
    <Button modifier="secondary" outlined> Outlined secondary button </Button>
    <Button modifier="success" outlined> Outlined success button </Button>
    <Button modifier="warning" outlined> Outlined warning button </Button>
    <Button modifier="danger" outlined> Outlined danger button </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
</script>
