<template>
  <InputNumber v-model="inputNumberValue" label="Default id" />
  <InputNumber v-model="inputNumberValue" label="Custom id" id="custom-id" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);
</script>
