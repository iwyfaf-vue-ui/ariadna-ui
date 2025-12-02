<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="[]"
    label="Состояние loading"
    placeholder="Загрузка..."
    loading
  >
  </SelectMultipleGroup>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';

const selectMultipleGroupValue = ref([]);
</script>
