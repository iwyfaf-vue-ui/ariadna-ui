<template>
  <SelectSingle
    v-model="selectSingleValue"
    :options="options"
    label="Update:model-value emit"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingle from '@iwyfaf-vue-ui/ariadna-ui/SelectSingle';

// Types
import type { TSelectSingleProps } from '@iwyfaf-vue-ui/ariadna-ui/SelectSingle';

// Data
import { options } from './data';

const selectSingleValue = ref();

function onUpdateModelValue(event: TSelectSingleProps['modelValue']) {
  console.log(event);
}
</script>
