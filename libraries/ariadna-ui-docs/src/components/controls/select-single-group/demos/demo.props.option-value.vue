<template>
  <SelectSingleGroup
    v-model="selectSingleGroupValue"
    :options="options2"
    option-label="customLabel"
    option-value="customValue"
    label="Кастомный option label"
  />

  value = {{ selectSingleGroupValue }}
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleGroup';

// Data
import { options2 } from './data';

const selectSingleGroupValue = ref();
</script>
