<template>
  <SelectSingleFlat
    v-model="selectSingleFlatValue"
    :options="options"
    label="Update:model-value emit"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleFlat';

// Types
import type { TSelectSingleProps } from '@iwyfaf-vue-ui/ariadna-ui/SelectSingle';

// Data
import { options } from './data';

const selectSingleFlatValue = ref([]);

function onUpdateModelValue(event: TSelectSingleProps['modelValue']) {
  console.log(event);
}
</script>
