<template>
  <Chips v-model="chipsValue" label="Value clear emit" writable clearable @clear="onClear" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';

const chipsValue = ref(['Vue', 'React', 'Angular']);

function onClear(event: Event) {
  console.log(event);
}
</script>
