<template>
  <InputNumber
    v-model="inputNumberValue"
    v-model:addon-before="addonBeforeValue"
    v-model:addon-after="addonAfterValue"
    label="Addon after"
  />

  <InputNumber
    v-model:addon-before="addonBeforeValue"
    v-model="inputNumberValue"
    v-model:addon-after="addonAfterValue"
    label="Addon after"
  >
    <template #addonBefore> 💲 </template>
    <template #addonAfter> 💰 </template>
  </InputNumber>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);
const addonBeforeValue = ref('$');
const addonAfterValue = ref('₽');
</script>
