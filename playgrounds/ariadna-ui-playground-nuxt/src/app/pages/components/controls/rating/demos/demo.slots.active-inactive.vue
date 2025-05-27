<template>
  <Rating v-model="ratingValue" label="custom stars">
    <template #active>
      <i class="star-icon-filled"></i>
    </template>

    <template #inactive>
      <i class="star-icon"></i>
    </template>
  </Rating>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Rating from '@iwyfaf-vue-ui/ariadna-ui/Rating';

const ratingValue = ref(0);
</script>
