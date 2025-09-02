<template>
  <InputNumber v-model="inputNumberValue" label="Blur emit" @blur="onBlur" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);

function onBlur(event: Event) {
  console.log(event);
}
</script>
