<template>
  <ul>
    <li>isYoutubeSupported = {{ isYoutubeSupported }}</li>
    <li>isRutubeSupported = {{ isRutubeSupported }}</li>
    <li>isCustomTubeSupported = {{ isCustomTubeSupported }}</li>
  </ul>
</template>

<script setup lang="ts">
// Helpers
import IframeVideoHelper from '@iwyfaf-vue-ui/ariadna-ui/IframeVideoHelper';

const isYoutubeSupported = IframeVideoHelper.isSupported(
  'https://www.youtube.com/watch?v=fe4EK4HSPkI',
);

const isRutubeSupported = IframeVideoHelper.isSupported(
  'https://rutube.ru/video/3372d062546231e6928f02c2f82bdf7a/',
);

const isCustomTubeSupported = IframeVideoHelper.isSupported('https://customTube.ru/video/');
</script>
