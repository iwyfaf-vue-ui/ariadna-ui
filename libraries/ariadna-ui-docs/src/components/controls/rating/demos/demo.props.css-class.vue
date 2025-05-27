<template>
  <Rating v-model="ratingValue" label="Custom cssClass" css-class="custom-input-text" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Rating from '@iwyfaf-vue-ui/ariadna-ui/Rating';

const ratingValue = ref(0);
</script>
