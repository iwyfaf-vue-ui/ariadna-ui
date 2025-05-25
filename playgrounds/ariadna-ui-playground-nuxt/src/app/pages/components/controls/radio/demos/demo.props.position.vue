<template>
  <Radio v-model="radioValue" value="Vue" position="right">Vue (position left)</Radio>
  <Radio v-model="radioValue" value="React" position="left">React (position right<)</Radio>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Radio from '@iwyfaf-vue-ui/ariadna-ui/Radio';

const radioValue = ref(false);
</script>
