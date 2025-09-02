<template>
  <InputNumber v-model="inputNumberValue" label="Step emit" controls @step="onStep" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';
import type { TInputNumberEmitStepPayload } from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);

function onStep(event: TInputNumberEmitStepPayload) {
  console.log(event);
}
</script>
