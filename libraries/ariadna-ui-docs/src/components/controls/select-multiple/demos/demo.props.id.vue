<template>
  <SelectMultiple v-model="selectMultipleValue" :options="options" label="Default id" />
  <SelectMultiple
    v-model="selectMultipleValue"
    :options="options"
    label="Custom id"
    id="custom-id"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultiple from '@iwyfaf-vue-ui/ariadna-ui/SelectSingle';

// Data
import { options } from './data';

const selectMultipleValue = ref();
</script>
