<template>
  <InputText v-model="inputTextValue" label="Invalid is on" invalid />
  <InputText v-model="inputTextValue" label="Invalid is off" :invalid="false" />
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';

const inputTextValue = ref(null);
</script>
