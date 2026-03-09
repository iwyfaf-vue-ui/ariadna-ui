<template>
  <Toast group="api-created" />

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
    summary: 'Created Hook',
    ttl: 3000,
    group: 'api-created',
  });

  toastApi.created(() => {
    alert('Toast lifecycle hook is: created');
  });
}
</script>
