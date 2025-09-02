<template>
  <InputNumber
    v-model="inputNumberValue"
    v-model:addon-before="addonBeforeValue"
    label="Addon before"
  >
  </InputNumber>

  <InputNumber
    v-model="inputNumberValue"
    v-model:addon-before="addonBeforeValue"
    label="Addon before"
  >
    <template #addonBefore> 💲 </template>
  </InputNumber>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);
const addonBeforeValue = ref('$');
</script>
