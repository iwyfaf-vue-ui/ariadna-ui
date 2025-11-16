<template>
  <SelectSingle
    v-model="selectSingleValue"
    v-model:filter-value="selectSingleValueFilter"
    :options="options"
    label="Реализация vModel"
    :filter="{ filterLabel: [[{ field: 'label' }]] }"
  >
    <template #filterIcon>
      <i class="icon-line-search"></i>
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
const selectSingleValueFilter = ref('');
</script>
