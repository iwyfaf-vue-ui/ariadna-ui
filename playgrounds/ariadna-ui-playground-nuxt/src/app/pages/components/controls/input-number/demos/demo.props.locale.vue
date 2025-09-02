<template>
  <InputNumber
    v-model="inputNumberValue"
    label="Russian locale"
    prefix="$ "
    suffix=" for м²"
    locale="ru-RU"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';

const inputNumberValue = ref(0);
</script>
