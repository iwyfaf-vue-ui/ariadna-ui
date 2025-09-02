<template>
  <InputNumber
    v-model="inputNumberValue"
    label="Placeholder from props"
    placeholder="Placeholder from props"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);
</script>
