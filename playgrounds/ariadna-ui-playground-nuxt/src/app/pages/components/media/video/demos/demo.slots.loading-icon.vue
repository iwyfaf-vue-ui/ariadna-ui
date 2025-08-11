<template>
  <Video src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4">
    <template #loadingIcon>
      <Spinner css-class="ar-spinner-atom" />
    </template>
  </Video>
</template>

<script setup lang="ts">
// Components
import Video from '@iwyfaf-vue-ui/ariadna-ui/Video';
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';
</script>
