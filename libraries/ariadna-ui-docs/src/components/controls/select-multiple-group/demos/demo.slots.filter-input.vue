<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    v-model:filter-value="selectMultipleGroupValueFilter"
    :options="options"
    label="Custom filterInput slot"
    :filter="{ filterLabel: [[{ field: 'label' }]] }"
  >
    <template #filterInput="{ onFilter }">
      <InputText
        v-model="selectMultipleGroupValueFilter"
        label="Встроенная фильтрация"
        placeholder="Встроенная фильтрация"
        aria-label="Фильтрация элементов"
        @input="onFilter(selectMultipleGroupValueFilter)"
      />
    </template>
  </SelectMultipleGroup>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

// Data
import { options } from './data';

const selectMultipleGroupValue = ref([]);
const selectMultipleGroupValueFilter = ref('');
</script>
