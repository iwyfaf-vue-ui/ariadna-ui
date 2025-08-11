<template>
  <Video src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4">
    <template #stopIcon>
      <i class="icon-fill-pause"></i>
    </template>
  </Video>
</template>

<script setup lang="ts">
// Components
import Video from '@iwyfaf-vue-ui/ariadna-ui/Video';
</script>
