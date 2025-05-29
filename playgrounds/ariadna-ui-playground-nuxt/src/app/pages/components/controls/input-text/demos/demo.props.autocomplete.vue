<template>
  <InputText v-model="inputTextValue" label="Autocomplete is on" autocomplete />
  <InputText v-model="inputTextValue" label="Autocomplete is off" :autocomplete="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

const inputTextValue = ref(null);
</script>
