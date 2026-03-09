<template>
  <Toast group="slot-infoIcon">
    <template #infoIcon> 💩 </template>
  </Toast>

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
    modifier: 'info',
    summary: 'Slot infoIcon',
    ttl: 3000,
    group: 'slot-infoIcon',
  });
}
</script>
