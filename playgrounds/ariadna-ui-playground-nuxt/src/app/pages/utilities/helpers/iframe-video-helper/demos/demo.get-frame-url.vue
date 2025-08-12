<template>
  <iframe v-for="iframe in iframesData" :src="iframe.src" frameborder="0"></iframe>
</template>

<script setup lang="ts">
// Helpers
import IframeVideoHelper from '@iwyfaf-vue-ui/ariadna-ui/IframeVideoHelper';

const iframesData = [
  {
    label: 'YouTube',
    src: IframeVideoHelper.getIframeUrl('https://www.youtube.com/watch?v=fe4EK4HSPkI'),
  },
  {
    label: 'Rutube',
    src: IframeVideoHelper.getIframeUrl(
      'https://rutube.ru/video/3372d062546231e6928f02c2f82bdf7a/',
    ),
  },
];
</script>
