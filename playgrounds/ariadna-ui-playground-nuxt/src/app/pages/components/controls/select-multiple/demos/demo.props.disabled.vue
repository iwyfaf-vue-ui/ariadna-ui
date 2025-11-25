<template>
  <SelectMultiple
    v-model="selectMultipleValue"
    :options="options"
    label="Disabled is on"
    disabled
  />
  <SelectMultiple
    v-model="selectMultipleValue"
    :options="options"
    label="Disabled is off"
    :disabled="false"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultiple from '@iwyfaf-vue-ui/ariadna-ui/SelectMultiple';

// Data
import { options } from './data';

const selectMultipleValue = ref();
</script>
