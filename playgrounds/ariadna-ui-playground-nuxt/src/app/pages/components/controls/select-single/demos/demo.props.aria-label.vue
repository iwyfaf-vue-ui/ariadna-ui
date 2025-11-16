<template>
  <SelectSingle
    v-model="selectSingleValue"
    :options="options"
    label="Props aria-label"
    aria-label="Выпадающий список"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingle from '@iwyfaf-vue-ui/ariadna-ui/SelectSingle';

// Data
import { options } from './data';

const selectSingleValue = ref();
</script>
