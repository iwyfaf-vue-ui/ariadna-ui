<template>
  <InputNumber
    v-model="inputNumberValue"
    label="Custom errors slot"
    :invalid="invalidState"
    :errors="errorsMessages"
  >
    <template #errors="{ errors }">
      <ul>
        <li v-for="(error, idx) in errors" :key="`error-${idx + 1}`">
          {{ error }}
        </li>
      </ul>
    </template>
  </InputNumber>

  <Button @click="toggle">Send input to invalid state</Button>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

const inputNumberValue = ref(0);
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
