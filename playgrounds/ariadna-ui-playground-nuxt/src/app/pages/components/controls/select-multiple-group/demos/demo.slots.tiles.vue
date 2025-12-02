<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="options"
    label="Custom label slot"
    tiles
  >
    <template #tiles="{ selectedOptions, removeTile, optionLabel }">
      <span
        v-for="(option, index) in selectedOptions"
        :key="`${option[optionLabel]}-${index}`"
        @click.stop="removeTile(option)"
      >
        {{ option[optionLabel] }} 💩
      </span>
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
