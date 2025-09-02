<template>
  <InputNumber
    v-model:addon-before="addonBeforeValue"
    v-model="inputNumberValue"
    v-model:addon-after="addonAfterValue"
    label="Custom increment control"
    controls
  >
    <template #addonBefore> 💲 </template>
    <template #decrementControl>
      <Button>➖</Button>
    </template>

    <template #addonAfter> 💰 </template>
    <template #incrementControl>
      <Button>➕</Button>
    </template>
  </InputNumber>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

const inputNumberValue = ref(0);
const addonBeforeValue = ref('$');
const addonAfterValue = ref('₽');
</script>
