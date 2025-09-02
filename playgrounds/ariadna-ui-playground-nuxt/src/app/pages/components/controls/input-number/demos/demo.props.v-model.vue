<template>
  <InputNumber v-model="inputNumberValue" label="Реализация vModel" />

  v-model value = {{ inputNumberValue }}
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);
</script>
