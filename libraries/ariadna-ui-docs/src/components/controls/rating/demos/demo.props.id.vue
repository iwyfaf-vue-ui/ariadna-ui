<template>
  <Rating v-model="ratingValue" label="Default id" />
  <Rating v-model="ratingValue" label="Custom id" id="custom-id" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Rating from '@iwyfaf-vue-ui/ariadna-ui/Rating';

const ratingValue = ref(0);
</script>
