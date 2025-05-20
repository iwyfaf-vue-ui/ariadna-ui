<template>
  <Textarea
    v-model="textareaValue"
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
  </Textarea>

  <Button @click="toggle">Send textarea to invalid state</Button>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Textarea from '@iwyfaf-vue-ui/ariadna-ui/Textarea';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

const textareaValue = ref(null);
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
