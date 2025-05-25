<template>
  <Radio v-model="radioValue" value="Vue" valid>Содержимое дефолтного слота</Radio>
  <Radio v-model="radioValue" value="React" valid>Содержимое дефолтного слота</Radio>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Radio from '@iwyfaf-vue-ui/ariadna-ui/Radio';

const radioValue = ref(null);
</script>
