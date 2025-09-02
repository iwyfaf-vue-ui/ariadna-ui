<template>
  <InputNumber v-model="inputNumberValue" label="Autocomplete is on" autocomplete />
  <InputNumber v-model="inputNumberValue" label="Autocomplete is off" :autocomplete="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);
</script>
