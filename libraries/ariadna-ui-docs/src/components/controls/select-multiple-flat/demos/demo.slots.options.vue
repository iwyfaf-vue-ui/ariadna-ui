<template>
  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    :options="optionsStrings"
    label="Custom options slot"
  >
    <template #options="{ option, checked }">
      <Checkbox :model-value="checked" :aria-label="option" />

      {{ option }} 💩
    </template>
  </SelectMultipleFlat>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleFlat';
import Checkbox from '@iwyfaf-vue-ui/ariadna-ui/Checkbox';

// Data
import { optionsStrings } from './data';

const selectMultipleFlatValue = ref([]);
</script>
