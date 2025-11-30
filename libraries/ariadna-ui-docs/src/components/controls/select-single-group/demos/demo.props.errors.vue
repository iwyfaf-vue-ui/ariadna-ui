<template>
  <SelectSingleGroup
    v-model="selectSingleGroupValue"
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
import SelectSingleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleGroup';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Data
import { options } from './data';

const selectSingleGroupValue = ref(null);
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
