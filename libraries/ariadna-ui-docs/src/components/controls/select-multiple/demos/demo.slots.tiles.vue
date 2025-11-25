<template>
  <SelectMultiple v-model="selectMultipleValue" :options="options" label="Custom label slot" tiles>
    <template #tiles="{ selectedOptions, removeTile, optionLabel }">
      <span
        v-for="(option, index) in selectedOptions"
        :key="`${option[optionLabel]}-${index}`"
        @click.stop="removeTile(option)"
      >
        {{ option[optionLabel] }} 💩
      </span>
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
