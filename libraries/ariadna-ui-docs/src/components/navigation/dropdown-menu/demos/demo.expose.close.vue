<template>
  <DropdownMenu ref="dropdownMenu" :data="dropdownMenuItems" :close-on-click-outside="false">
    <template #activator="{ opened, toggle }">
      <Button @click="toggle">{{ opened ? 'Close' : 'Open' }} dropdown</Button>
    </template>
  </DropdownMenu>

  <Button @click="dropdownMenuRef?.close()">Close dropdown</Button>
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
