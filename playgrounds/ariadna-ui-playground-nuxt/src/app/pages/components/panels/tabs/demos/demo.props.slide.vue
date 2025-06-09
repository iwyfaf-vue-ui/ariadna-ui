<template>
  <Tabs :tabs="tabs" slide></Tabs>
</template>

<script setup lang="ts">
// Components
import Tabs from '@iwyfaf-vue-ui/ariadna-ui/Tabs';

const tabs = Array.from({ length: 50 }, (_, i) => [{ title: `Title ${i}` }]).flat();
</script>
