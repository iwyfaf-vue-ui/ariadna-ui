<template>
  <Radio v-model="radioValue" value="Vue" valid>Valid is on</Radio>
  <Radio v-model="radioValue" value="React" valid>Valid is on</Radio>
  <Radio v-model="radioValue" value="Angular">Valid is off</Radio>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Radio from '@iwyfaf-vue-ui/ariadna-ui/Radio';

const radioValue = ref(false);
</script>
