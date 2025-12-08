<template>
  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    :options="optionsStrings"
    label="Custom label slot"
    tiles
  >
    <template #tiles="{ selectedOptions, removeTile }">
      <span
        v-for="(option, index) in selectedOptions"
        :key="`${option}-${index}`"
        @click.stop="removeTile(option)"
      >
        {{ option }} 💩
      </span>
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
