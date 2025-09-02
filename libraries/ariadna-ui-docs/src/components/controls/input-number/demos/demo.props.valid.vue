<template>
  <InputNumber v-model="inputNumberValue" label="Valid is on" valid />
  <InputNumber v-model="inputNumberValue" label="Valid is off" :valid="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);
</script>
