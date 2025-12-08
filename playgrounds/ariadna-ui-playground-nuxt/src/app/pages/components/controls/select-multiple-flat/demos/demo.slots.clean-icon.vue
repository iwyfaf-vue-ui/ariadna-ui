<template>
  <SelectMultipleFlat
    v-model="selectMultipleValue"
    :options="optionsStrings"
    label="Custom cleanIcon slot"
  >
    <template #cleanIcon>
      <i class="icon-line-close"></i>
    </template>
  </SelectMultipleFlat>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleFlat';

// Data
import { optionsStrings } from './data';

const selectMultipleValue = ref();
</script>
