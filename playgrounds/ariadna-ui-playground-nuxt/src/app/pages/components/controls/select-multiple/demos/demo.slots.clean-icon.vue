<template>
  <SelectMultiple v-model="selectMultipleValue" :options="options" label="Custom cleanIcon slot">
    <template #cleanIcon>
      <i class="icon-line-close"></i>
    </template>
  </SelectMultiple>
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
