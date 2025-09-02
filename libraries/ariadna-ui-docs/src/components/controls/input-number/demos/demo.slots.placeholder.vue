<template>
  <InputNumber
    v-model="inputNumberValue"
    label="Placeholder from prop will be ignored"
    placeholder="Placeholder from props"
  >
    <template #placeholder> Placeholder from slot. </template>
  </InputNumber>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);
</script>
