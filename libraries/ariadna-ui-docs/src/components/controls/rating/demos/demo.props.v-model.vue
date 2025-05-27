<template>
  <Rating v-model="ratingValue" label="Реализация vModel" />

  v-model value = {{ ratingValue }}
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Rating from '@iwyfaf-vue-ui/ariadna-ui/Rating';

const ratingValue = ref(0.5);
</script>
