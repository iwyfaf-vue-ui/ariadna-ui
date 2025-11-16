<template>
  <SelectSingle v-model="selectSingleValue" :options="options" label="Иконка открытия списка опций">
    <template #toggleIcon>
      <i class="icon-line-chevron-down"></i>
    </template>
  </SelectSingle>
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
