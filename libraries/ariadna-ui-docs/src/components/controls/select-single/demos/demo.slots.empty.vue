<template>
  <SelectSingle v-model="selectSingleValue" :options="[]" label="Реализация vModel">
    <template #empty> Нет данных для рендера. </template>
  </SelectSingle>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingle from '@iwyfaf-vue-ui/ariadna-ui/SelectSingle';

const selectSingleValue = ref();
</script>
