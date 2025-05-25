<template>
  <Radio v-model="radioValue" value="Vue">Vue (Default id)</Radio>
  <Radio v-model="radioValue" value="React" id="custom-id">React (Custom id)</Radio>
  <Radio v-model="radioValue" value="Angular">Angular</Radio>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Radio from '@iwyfaf-vue-ui/ariadna-ui/Radio';

const radioValue = ref(null);
</script>
