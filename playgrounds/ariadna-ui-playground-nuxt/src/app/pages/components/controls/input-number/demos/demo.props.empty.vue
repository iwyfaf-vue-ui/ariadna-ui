<template>
  <InputNumber v-model="inputNumberValue" label="Empty value" empty="No value" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref();
</script>
