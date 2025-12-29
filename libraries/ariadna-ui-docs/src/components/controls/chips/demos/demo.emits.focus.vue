<template>
  <Chips v-model="chipsValue" label="Focus emit" @focus="onFocus" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';

const chipsValue = ref(['Vue', 'React', 'Angular']);

function onFocus(event: Event) {
  console.log(event);
}
</script>
