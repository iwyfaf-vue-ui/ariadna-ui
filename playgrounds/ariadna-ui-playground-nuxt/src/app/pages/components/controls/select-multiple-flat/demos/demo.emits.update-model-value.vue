<template>
  <SelectMultipleFlat
    v-model="selectMultipleFlatValue"
    :options="optionsStrings"
    label="Update:model-value emit"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleFlat';

// Types
import type { TSelectMultipleFlatProps } from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleFlat';

// Data
import { optionsStrings } from './data';

const selectMultipleFlatValue = ref([]);

function onUpdateModelValue(event: TSelectMultipleFlatProps['modelValue']) {
  console.log(event);
}
</script>
