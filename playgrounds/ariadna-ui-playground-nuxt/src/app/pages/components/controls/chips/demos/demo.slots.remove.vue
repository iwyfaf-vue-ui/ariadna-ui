<template>
  <Chips v-model="chipsValue" label="Реализация слота chip" writable clearable>
    <template #remove> 💩 </template>
  </Chips>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';

const chipsValue = ref(['Vue', 'React', 'Angular']);
</script>
