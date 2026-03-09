<template>
  <Toast group="slot-closeIcon">
    <template #closeIcon="{ close }">
      <span @click="close"> 💩 </span>
    </template>
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
    summary: 'Slot closeIcon',
    ttl: 3000,
    group: 'slot-closeIcon',
  });
}
</script>
