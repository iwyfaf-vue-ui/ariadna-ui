<template>
  <Rating v-model="ratingValue" label="custom stars" reset>
    <template #reset="{ reset }">
      <Button @click="reset">Очистить выбор</Button>
    </template>
  </Rating>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Rating from '@iwyfaf-vue-ui/ariadna-ui/Rating';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

const ratingValue = ref(0);
</script>
