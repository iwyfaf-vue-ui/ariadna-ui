<template>
  <InputNumber
    v-model="inputNumberValue"
    label="Update:model-value emit"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

// Types
import type { Numberish } from '@iwyfaf-vue-ui/ariadna-ui/types';

const inputNumberValue = ref(0);

function onUpdateModelValue(event: Numberish | undefined) {
  console.log(event);
}
</script>
