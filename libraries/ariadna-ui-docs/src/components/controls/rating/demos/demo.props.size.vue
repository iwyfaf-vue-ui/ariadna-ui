<template>
  <Rating v-model="ratingValue" label="Size is small" size="small" />
  <Rating v-model="ratingValue" label="Size is medium" size="medium" />
  <Rating v-model="ratingValue" label="Size is large" size="large" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Rating from '@iwyfaf-vue-ui/ariadna-ui/Rating';

const ratingValue = ref(0);
</script>
