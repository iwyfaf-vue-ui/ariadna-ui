<template>
  <InputNumber v-model="inputNumberValue" label="Change emit" @change="onChange" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);

function onChange(event: Event) {
  console.log(event);
}
</script>
