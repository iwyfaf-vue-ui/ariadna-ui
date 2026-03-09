<template>
  <Toast group="prop-hide-progressbar" hide-progressbar />

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
    summary: 'Hide Progressbar',
    detail: 'Toast without progressbar',
    ttl: 3000,
    group: 'prop-hide-progressbar',
  });
}
</script>
