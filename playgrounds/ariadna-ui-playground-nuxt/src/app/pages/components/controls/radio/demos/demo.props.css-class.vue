<template>
  <Radio v-model="radioValue" value="Vue" css-class="custom-radio">Vue</Radio>
  <Radio v-model="radioValue" value="React" css-class="custom-radio">React</Radio>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Radio from '@iwyfaf-vue-ui/ariadna-ui/Radio';

const radioValue = ref(null);
</script>
