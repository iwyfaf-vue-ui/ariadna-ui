<template>
  <Toast group="prop-onMouseEnter" :on-mouse-enter="() => console.log('onMouseEnter')" />

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
    summary: 'Prop onMouseEnter',
    detail: 'Run callback when fire event onMouseEnter',
    ttl: 3000,
    group: 'prop-onMouseEnter',
  });
}
</script>
