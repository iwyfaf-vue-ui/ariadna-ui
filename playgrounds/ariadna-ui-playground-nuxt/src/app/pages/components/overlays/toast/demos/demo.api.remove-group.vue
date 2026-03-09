<template>
  <Toast group="api-remove-group" />

  <Button @click="showToast">Показать Toast</Button>
  <Button @click="removeToast">Удалить Toast группы</Button>
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
    summary: 'RemoveGroup Function',
    ttl: 3000,
    group: 'api-remove-group',
  });
}

function removeToast() {
  toastApi.removeGroup('api-remove-group');
}
</script>
