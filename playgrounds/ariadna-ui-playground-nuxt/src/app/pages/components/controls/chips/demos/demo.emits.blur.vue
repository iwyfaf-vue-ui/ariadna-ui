<template>
  <Chips v-model="chipsValue" label="Blur emit" @blur="onBlur" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';

const chipsValue = ref(['Vue', 'React', 'Angular']);

function onBlur(event: Event) {
  console.log(event);
}
</script>
