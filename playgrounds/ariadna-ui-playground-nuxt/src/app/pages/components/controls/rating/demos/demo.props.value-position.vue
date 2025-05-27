<template>
  <Rating
    v-model="ratingValue"
    label="Рендер текущего значения слева"
    show-value
    value-position="left"
  />

  <Rating
    v-model="ratingValue"
    label="Рендер текущего значения сверху"
    show-value
    value-position="top"
  />

  <Rating
    v-model="ratingValue"
    label="Рендер текущего значения справа"
    show-value
    value-position="right"
  />

  <Rating
    v-model="ratingValue"
    label="Рендер текущего значения снизу"
    show-value
    value-position="bottom"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Rating from '@iwyfaf-vue-ui/ariadna-ui/Rating';

const ratingValue = ref(0);
</script>
