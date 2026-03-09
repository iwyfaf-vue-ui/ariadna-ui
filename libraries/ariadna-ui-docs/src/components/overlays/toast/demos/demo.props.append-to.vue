<template>
  <Toast group="prop-append-to" append-to="#app" />

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
    summary: 'AppendTo teleports',
    detail: 'Mount to teleports element',
    ttl: 3000,
    group: 'prop-append-to',
  });
}
</script>
