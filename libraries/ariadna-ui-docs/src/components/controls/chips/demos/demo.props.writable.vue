<template>
  <Chips
    v-model="chipsValue"
    label="Writable режим делает компонент редактируемым"
    placeholder="Укажите значение и нажмите Enter"
    writable
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';

const chipsValue = ref(['Vue', 'React', 'Angular']);
</script>
