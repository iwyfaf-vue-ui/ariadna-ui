<template>
  <SelectSingleFlat
    v-model="selectSingleFlatValue"
    :options="options"
    :label="`Errors is ${invalidState ? 'on' : 'off'}`"
    :invalid="invalidState"
    :errors="errorsMessages"
  />

  <Button @click="toggle">Send input to invalid state</Button>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleFlat';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Data
import { options } from './data';

const selectSingleFlatValue = ref(null);
const invalidState = ref(false);
const errorsMessages = ref<Array<string>>([]);

function toggle() {
  invalidState.value = !invalidState.value;

  if (!errorsMessages.value.length) {
    errorsMessages.value = ['First error', 'Second error'];
  } else {
    errorsMessages.value = [];
  }
}
</script>
