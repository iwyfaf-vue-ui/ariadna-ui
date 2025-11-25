<template>
  <SelectMultiple
    v-model="selectMultipleValue"
    :options="options"
    label="Custom multiselectCheckbox slot"
    multiselect-checkbox
  >
    <template #multiselectCheckbox="{ select, checked }">
      <input
        :checked="checked"
        type="checkbox"
        name="multiselect"
        :aria-label="checked ? 'Unselect all' : 'Select all'"
        @change="select"
      />
    </template>
  </SelectMultiple>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultiple from '@iwyfaf-vue-ui/ariadna-ui/SelectMultiple';
import Checkbox from '@iwyfaf-vue-ui/ariadna-ui/Checkbox';

// Data
import { options } from './data';

const selectMultipleValue = ref();
</script>
