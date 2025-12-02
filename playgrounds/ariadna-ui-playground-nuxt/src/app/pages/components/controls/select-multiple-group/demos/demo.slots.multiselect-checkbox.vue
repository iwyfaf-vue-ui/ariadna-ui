<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
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
  </SelectMultipleGroup>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';

// Data
import { options } from './data';

const selectMultipleGroupValue = ref([]);
</script>
