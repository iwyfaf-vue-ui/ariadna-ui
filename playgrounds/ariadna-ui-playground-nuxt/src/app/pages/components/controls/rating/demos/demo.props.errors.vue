<template>
  <Rating
    v-model="ratingValue"
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
import Rating from '@iwyfaf-vue-ui/ariadna-ui/Rating';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

const ratingValue = ref(0);
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
