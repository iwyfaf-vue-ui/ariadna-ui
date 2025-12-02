<template>
  <SelectMultipleGroup
    v-model="selectMultipleGroupValue"
    :options="[]"
    label="Custom loadingIcon slot"
    placeholder="Загрузка..."
    loading
  >
    <template #loadingIcon>
      <Spinner />
    </template>
  </SelectMultipleGroup>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';

const selectMultipleGroupValue = ref([]);
</script>
