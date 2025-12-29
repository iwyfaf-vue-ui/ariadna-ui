<template>
  <Chips
    v-model="chipsValue"
    label="Placeholder будет передан в input элемент компонента"
    placeholder="Placeholder из props"
  />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';

const chipsValue = ref(['Vue', 'React', 'Angular']);
</script>
