<template>
  <InputNumber
    v-model="inputNumberValue"
    label="vModel return masked value"
    prefix="$ "
    suffix=" for м²"
    locale="en-US"
    masked
  />

  masked v-model value = {{ inputNumberValue }}
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);
</script>
