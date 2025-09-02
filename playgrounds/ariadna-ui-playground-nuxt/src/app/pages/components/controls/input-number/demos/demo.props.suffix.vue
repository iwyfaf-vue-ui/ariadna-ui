<template>
  <InputNumber v-model="inputNumberValue" label="Suffix is м² " prefix="$ " suffix=" for м²" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);
</script>
