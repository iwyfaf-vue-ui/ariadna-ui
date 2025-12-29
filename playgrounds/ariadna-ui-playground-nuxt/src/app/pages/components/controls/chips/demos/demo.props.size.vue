<template>
  <Chips
    v-model="chipsValue"
    label="Size is small"
    placeholder="Укажите значение и нажмите Enter"
    writable
    clearable
    size="small"
  />

  <Chips
    v-model="chipsValue"
    label="Size is medium"
    placeholder="Укажите значение и нажмите Enter"
    writable
    clearable
    size="medium"
  />

  <Chips
    v-model="chipsValue"
    label="Size is large"
    placeholder="Укажите значение и нажмите Enter"
    writable
    clearable
    size="large"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';

const chipsValue = ref(['Vue', 'React', 'Angular']);
</script>
