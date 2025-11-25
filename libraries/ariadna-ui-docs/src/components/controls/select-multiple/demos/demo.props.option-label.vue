<template>
  <SelectMultiple
    v-model="selectMultipleValue"
    :options="options2"
    option-label="customLabel"
    label="Кастомный option label"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultiple from '@iwyfaf-vue-ui/ariadna-ui/SelectMultiple';

// Data
import { options2 } from './data';

const selectMultipleValue = ref();
</script>
