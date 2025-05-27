<template>
  <Rating v-model="ratingValue" label="Шаг заполнения звезды 0.5" :fill-step="0.5" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Rating from '@iwyfaf-vue-ui/ariadna-ui/Rating';

const ratingValue = ref(0);
</script>
