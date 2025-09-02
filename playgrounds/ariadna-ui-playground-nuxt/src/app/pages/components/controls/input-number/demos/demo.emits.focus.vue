<template>
  <InputNumber v-model="inputNumberValue" label="Focus emit" @focus="onFocus" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);

function onFocus(event: Event) {
  console.log(event);
}
</script>
