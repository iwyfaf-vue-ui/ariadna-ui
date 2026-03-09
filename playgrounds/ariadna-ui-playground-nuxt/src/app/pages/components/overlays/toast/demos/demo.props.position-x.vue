<template>
  <Toast position-x="center" group="position-x" />
  <Toast position-x="right" group="position-x" />
  <Toast position-x="left" group="position-x" />

  <Button @click="showToast">Показать Toast</Button>
</template>

<script setup lang="ts">
// Components
import Toast from '@iwyfaf-vue-ui/ariadna-ui/Toast';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Composables
import useToast from '@iwyfaf-vue-ui/ariadna-ui/useToast';

const toastApi = useToast();

function showToast() {
  toastApi.add({
    summary: 'Position X',
    detail: 'Different positions on the X axis',
    ttl: 3000,
    group: 'position-x',
  });
}
</script>
