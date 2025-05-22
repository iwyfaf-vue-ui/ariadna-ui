<template>
  <Checkbox v-model="checkboxValue" :invalid="invalidState" :errors="errorsMessages">
    {{ `Errors is ${invalidState ? 'on' : 'off'}` }}
  </Checkbox>

  <Button @click="toggle">Send checkbox to invalid state</Button>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Checkbox from '@iwyfaf-vue-ui/ariadna-ui/Checkbox';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

const checkboxValue = ref(false);
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
