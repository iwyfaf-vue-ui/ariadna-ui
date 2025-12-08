<template>
  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    :options="optionsStrings"
    label="Custom label slot"
  >
    <template #label="{ selectedOptions, label }">
      <span v-if="selectedOptions.length === 0"> Выберите опцию ⬇️ </span>
      <span v-else>{{ label }} 💩</span>
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
