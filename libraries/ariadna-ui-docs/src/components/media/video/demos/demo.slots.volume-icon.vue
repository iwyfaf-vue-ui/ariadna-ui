<template>
  <Video src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4">
    <template #volumeIcon="{ volume }">
      <i v-if="volume === 0" class="icon-fill-volume-off"></i>
      <i v-else class="icon-fill-volume-on"></i>
    </template>
  </Video>
</template>

<script setup lang="ts">
// Components
import Video from '@iwyfaf-vue-ui/ariadna-ui/Video';
</script>
