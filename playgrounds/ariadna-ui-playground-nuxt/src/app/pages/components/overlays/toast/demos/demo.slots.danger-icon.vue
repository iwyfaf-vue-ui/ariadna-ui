<template>
  <Toast group="slot-dangerIcon">
    <template #dangerIcon> 💩 </template>
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
    modifier: 'danger',
    summary: 'Slot dangerIcon',
    ttl: 3000,
    group: 'slot-dangerIcon',
  });
}
</script>
