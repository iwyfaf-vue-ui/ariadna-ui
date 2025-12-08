<template>
  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    :options="optionsStrings"
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
  </SelectMultipleFlat>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleFlat';

// Data
import { optionsStrings } from './data';

const selectMultipleFlatValue = ref([]);
</script>
