<template>
  <InputNumber v-model="inputNumberValue" label="Readonly is on" readonly />
  <InputNumber v-model="inputNumberValue" label="Readonly is off" :readonly="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);
</script>
