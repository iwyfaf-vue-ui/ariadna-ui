<template>
  <SelectMultiple v-model="selectMultipleValue" :options="options" label="Valid is on" valid />
  <SelectMultiple
    v-model="selectMultipleValue"
    :options="options"
    label="Valid is off"
    :valid="false"
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
