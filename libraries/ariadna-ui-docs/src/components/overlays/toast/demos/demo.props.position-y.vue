<template>
  <Toast position-y="center" group="position-y" />
  <Toast position-y="bottom" group="position-y" />
  <Toast position-y="top" group="position-y" />

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
    summary: 'Position Y',
    detail: 'Different positions on the Y axis',
    ttl: 3000,
    group: 'position-y',
  });
}
</script>
