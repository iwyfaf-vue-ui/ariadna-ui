<template>
  <SelectSingleFlat v-model="selectSingleFlatValue" :options="options" label="Valid is on" valid />
  <SelectSingleFlat
    v-model="selectSingleFlatValue"
    :options="options"
    label="Valid is off"
    :valid="false"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleFlat';

// Data
import { options } from './data';

const selectSingleFlatValue = ref(null);
</script>
