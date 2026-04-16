<template>
  <DropdownMenu :data="dropdownMenuItems" css-class="custom-dropdown-menu">
    <template #activator="{ opened, toggle }">
      <Button @click="toggle">{{ opened ? 'Close' : 'Open' }} dropdown</Button>
    </template>
  </DropdownMenu>
</template>

<script setup lang="ts">
// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import DropdownMenu from '@iwyfaf-vue-ui/ariadna-ui/DropdownMenu';

// Data
import { dropdownMenuItems } from './data';
</script>
