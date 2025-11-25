<template>
  <SelectMultiple
    v-model="selectMultipleValue"
    :options="[]"
    label="Custom loadingIcon slot"
    placeholder="Загрузка..."
    loading
  >
    <template #loadingIcon>
      <Spinner />
    </template>
  </SelectMultiple>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultiple from '@iwyfaf-vue-ui/ariadna-ui/SelectMultiple';
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';

const selectMultipleValue = ref();
</script>
