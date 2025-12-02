<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="options"
    label="Update:model-value emit"
    @update:model-value="onUpdateModelValue"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';

// Types
import type { TSelectMultipleGroupProps } from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';

// Data
import { options } from './data';

const selectMultipleGroupValue = ref([]);

function onUpdateModelValue(event: TSelectMultipleGroupProps['modelValue']) {
  console.log(event);
}
</script>
