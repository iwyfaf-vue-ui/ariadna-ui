<template>
  <SelectSingleGroup
    v-model="selectSingleGroupValue"
    :options="[]"
    label="Иконка загрузки в контроле"
    placeholder="Загрузка..."
    loading
  >
    <template #loading>
      <Spinner />
    </template>
  </SelectSingleGroup>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectSingleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleGroup';
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';

const selectSingleGroupValue = ref();
</script>
