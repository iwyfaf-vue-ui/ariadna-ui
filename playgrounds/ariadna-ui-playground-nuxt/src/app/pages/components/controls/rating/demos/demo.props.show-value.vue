<template>
  <Rating v-model="ratingValue" label="Рендер текущего значения" show-value />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Rating from '@iwyfaf-vue-ui/ariadna-ui/Rating';

const ratingValue = ref(0);
</script>
