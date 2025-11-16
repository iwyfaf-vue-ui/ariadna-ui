<template>
  <SelectSingle
    v-model="selectSingleValue"
    :options="options2"
    option-label="customLabel"
    option-value="customValue"
    label="Кастомный option label"
  />

  value = {{ selectSingleValue }}
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingle from '@iwyfaf-vue-ui/ariadna-ui/SelectSingle';

// Data
import { options2 } from './data';

const selectSingleValue = ref();
</script>
