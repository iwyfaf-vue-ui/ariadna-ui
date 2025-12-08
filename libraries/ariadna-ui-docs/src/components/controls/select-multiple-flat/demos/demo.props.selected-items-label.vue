<template>
  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    :options="optionsStrings"
    label="Переопределение label для отображаемых элементов"
    :max-selected-labels="3"
    selected-items-label="Выбрано элементов: {0}"
  />

  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    :options="optionsStrings"
    label="Переопределение label для отображаемых элементов"
    tiles
    :max-selected-labels="3"
    selected-items-label="Выбрано элементов: {0}"
  />
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
