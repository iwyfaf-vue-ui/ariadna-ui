<template>
  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    :options="optionsStrings"
    label="Значение в виде плиток"
    tiles
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
