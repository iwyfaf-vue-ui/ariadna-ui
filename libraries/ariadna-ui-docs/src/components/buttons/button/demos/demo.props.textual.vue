<template>
  <div style="display: flex; gap: 1rem; flex-wrap: wrap">
    <Button textual> Textual default button </Button>
    <Button modifier="primary" textual> Textual primary button </Button>
    <Button modifier="secondary" textual> Textual secondary button </Button>
    <Button modifier="success" textual> Textual success button </Button>
    <Button modifier="warning" textual> Textual warning button </Button>
    <Button modifier="danger" textual> Textual danger button </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
</script>
