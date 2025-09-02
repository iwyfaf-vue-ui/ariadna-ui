<template>
  <InputNumber v-model="inputNumberValue" label="Disabled is on" disabled />
  <InputNumber v-model="inputNumberValue" label="Disabled is off" :disabled="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);
</script>
