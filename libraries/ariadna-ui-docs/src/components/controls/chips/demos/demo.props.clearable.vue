<template>
  <Chips
    v-model="chipsValue"
    label="Clearable режим показывает элемент для очистки данных компонента"
    placeholder="Укажите значение и нажмите Enter"
    writable
    clearable
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';

const chipsValue = ref(['Vue', 'React', 'Angular']);
</script>
