<template>
  <SelectMultiple v-model="selectMultipleValue" :options="options" label="Invalid is on" invalid />
  <SelectMultiple
    v-model="selectMultipleValue"
    :options="options"
    label="Invalid is off"
    :invalid="false"
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
