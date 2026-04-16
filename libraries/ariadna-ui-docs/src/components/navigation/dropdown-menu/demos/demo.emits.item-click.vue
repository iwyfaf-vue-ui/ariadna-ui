<template>
  <DropdownMenu
    :data="dropdownMenuItems"
    @item-click="(payload: TDropdownMenuItem) => console.log(payload)"
  >
    <template #activator="{ opened, toggle }">
      <Button @click="toggle">{{ opened ? 'Close' : 'Open' }} dropdown</Button>
    </template>
  </DropdownMenu>
</template>

<script setup lang="ts">
// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import DropdownMenu from '@iwyfaf-vue-ui/ariadna-ui/DropdownMenu';
import type { TDropdownMenuItem } from '@iwyfaf-vue-ui/ariadna-ui/DropdownMenu';

// Data
import { dropdownMenuItems } from './data';
</script>
