<template>
  <Rating v-model="ratingValue" label="Readonly is on" readonly />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Rating from '@iwyfaf-vue-ui/ariadna-ui/Rating';

const ratingValue = ref(0.3);
</script>
