<template>
  <Dropbox v-model="popoverValue">
    <p>Default slot</p>
  </Dropbox>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Dropbox from '@iwyfaf-vue-ui/ariadna-ui/Dropbox';

const popoverValue = ref(true);
</script>
