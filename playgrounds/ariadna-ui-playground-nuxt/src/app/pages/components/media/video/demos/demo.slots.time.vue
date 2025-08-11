<template>
  <Video src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4">
    <template #time="{ timePassedInSeconds, durationInSeconds, parseTime }">
      Вопроизведено {{ parseTime(timePassedInSeconds) }} из {{ parseTime(durationInSeconds) }}
    </template>
  </Video>
</template>

<script setup lang="ts">
// Components
import Video from '@iwyfaf-vue-ui/ariadna-ui/Video';
</script>
