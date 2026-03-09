<template>
  <Toast group="transition-fade-in" transition="fade-in" />
  <Toast group="transition-fade-out" transition="fade-out" />
  <Toast group="transition-zoom-in" transition="zoom-in" />
  <Toast group="transition-bounce" transition="bounce" />
  <Toast group="transition-blurred" transition="blurred" />

  <Button @click="showToastFadeIn">Toast fade-in</Button>
  <Button @click="showToastFadeOut">Toast fade-out</Button>
  <Button @click="showToastZoomIn">Toast zoom-in</Button>
  <Button @click="showToastBounce">Toast bounce</Button>
  <Button @click="showToastBlurred">Toast blurred</Button>
</template>

<script setup lang="ts">
// Components
import Toast from '@iwyfaf-vue-ui/ariadna-ui/Toast';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Composables
import useToast from '@iwyfaf-vue-ui/ariadna-ui/useToast';

const toastApi = useToast();

function showToastFadeIn() {
  toastApi.add({
    summary: 'fade-in',
    detail: 'Transition fade-in',
    ttl: 3000,
    group: 'transition-fade-in',
  });
}

function showToastFadeOut() {
  toastApi.add({
    summary: 'fade-out',
    detail: 'Transition fade-out',
    ttl: 3000,
    group: 'transition-fade-out',
  });
}

function showToastZoomIn() {
  toastApi.add({
    summary: 'zoom-in',
    detail: 'Transition zoom-in',
    ttl: 3000,
    group: 'transition-zoom-in',
  });
}

function showToastBounce() {
  toastApi.add({
    summary: 'bounce',
    detail: 'Transition bounce',
    ttl: 3000,
    group: 'transition-bounce',
  });
}

function showToastBlurred() {
  toastApi.add({
    summary: 'blurred',
    detail: 'Transition blurred',
    ttl: 3000,
    group: 'transition-blurred',
  });
}
</script>
