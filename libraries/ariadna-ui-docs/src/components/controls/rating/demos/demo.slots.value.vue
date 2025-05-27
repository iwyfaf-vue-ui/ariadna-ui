<template>
  <Rating v-model="ratingValue" label="custom stars" show-value>
    <template #value="{ value, starCount }"> Выбрано {{ value }} из {{ starCount }} </template>
  </Rating>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Rating from '@iwyfaf-vue-ui/ariadna-ui/Rating';

const ratingValue = ref(0);
</script>
