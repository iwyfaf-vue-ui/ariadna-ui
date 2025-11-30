<template>
  <SelectSingleGroup v-model="selectSingleGroupValue" :options="[]" label="Реализация vModel">
    <template #empty> Нет данных для рендера. </template>
  </SelectSingleGroup>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleGroup';

const selectSingleGroupValue = ref();
</script>
