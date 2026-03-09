<template>
  <Toast group="prop-onMouseLeave" :on-mouse-leave="() => console.log('onMouseLeave')" />

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
    summary: 'Prop onMouseLeave',
    detail: 'Run callback when fire event onMouseLeave',
    ttl: 3000,
    group: 'prop-onMouseLeave',
  });
}
</script>
