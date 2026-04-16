<template>
  <DropdownMenu ref="dropdownMenu" :data="dropdownMenuItems" :close-on-click-outside="false" />

  <Button @click="dropdownMenuRef?.toggle()">Toggle dropdown</Button>
</template>

<script setup lang="ts">
// Vue
import { useTemplateRef } from 'vue';

// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import DropdownMenu from '@iwyfaf-vue-ui/ariadna-ui/DropdownMenu';

// Data
import { dropdownMenuItems } from './data';

const dropdownMenuRef = useTemplateRef<InstanceType<typeof DropdownMenu>>('dropdownMenu');
</script>
