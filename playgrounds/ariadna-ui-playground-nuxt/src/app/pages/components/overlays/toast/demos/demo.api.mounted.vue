<template>
  <Toast group="api-mounted" />

  <Button @click="showToast">Показать Toast</Button>
</template>

<script setup lang="ts">
// Components
import Toast from '@iwyfaf-vue-ui/ariadna-ui/Toast';
import type { TToastEvent } from '@iwyfaf-vue-ui/ariadna-ui/Toast';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Composables
import useToast from '@iwyfaf-vue-ui/ariadna-ui/useToast';

const toastApi = useToast();

function showToast() {
  toastApi.add({
    summary: 'Mounted Hook',
    ttl: 3000,
    group: 'api-mounted',
  });

  toastApi.mounted(() => {
    alert('Toast lifecycle hook is: mounted');
  });
}
</script>
