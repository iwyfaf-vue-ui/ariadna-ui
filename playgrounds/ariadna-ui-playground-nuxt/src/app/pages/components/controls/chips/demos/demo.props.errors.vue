<template>
  <Chips
    v-model="chipsValue"
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
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

const chipsValue = ref(['Vue', 'React', 'Angular']);
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
