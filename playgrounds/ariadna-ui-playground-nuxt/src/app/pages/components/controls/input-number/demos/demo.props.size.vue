<template>
  <InputNumber v-model="inputNumberValue" label="Size is small" controls size="small" />
  <InputNumber v-model="inputNumberValue" label="Size is medium" controls size="medium" />
  <InputNumber v-model="inputNumberValue" label="Size is large" controls size="large" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);
</script>
