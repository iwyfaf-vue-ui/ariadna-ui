<template>
  <SelectMultipleGroup v-model="selectMultipleGroupValue" :options="[]" label="Реализация vModel">
    <template #empty> Нет данных для рендера. </template>
  </SelectMultipleGroup>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';

const selectMultipleGroupValue = ref([]);
</script>
