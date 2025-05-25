<template>
  <Radio v-model="radioValue" value="Vue" invalid>Invalid is on</Radio>
  <Radio v-model="radioValue" value="React" invalid>Invalid is on</Radio>
  <Radio v-model="radioValue" value="Angular">Invalid is off</Radio>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Radio from '@iwyfaf-vue-ui/ariadna-ui/Radio';

const radioValue = ref(null);
</script>
