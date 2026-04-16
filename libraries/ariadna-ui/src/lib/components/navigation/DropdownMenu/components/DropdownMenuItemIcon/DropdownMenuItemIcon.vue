<template>
  <span :class="componentClasses" aria-hidden="true">
    <i v-if="isIconString" :class="props.icon" />
    <component v-else :is="props.icon" />
  </span>
</template>

<script setup lang="ts">
// Types
import type { TDropdownMenuItemIconProps } from './DropdownMenuItemIcon';

// Composables
import useDropdownMenuItemIcon from '../../composables/useDropdownMenuItemIcon/useDropdownMenuItemIcon';

const props = defineProps<TDropdownMenuItemIconProps>();

const { isIconString, componentClasses } = useDropdownMenuItemIcon(props);
</script>
