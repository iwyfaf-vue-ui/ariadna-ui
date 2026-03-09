<template>
  <Toast group="api-remove-all" />

  <Button @click="showToast">Показать Toast</Button>
  <Button @click="removeToast">Удалить все Toast</Button>
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
    summary: 'RemoveAll Function',
    ttl: 3000,
    group: 'api-remove-all',
  });
}

function removeToast() {
  toastApi.removeAll();
}
</script>
