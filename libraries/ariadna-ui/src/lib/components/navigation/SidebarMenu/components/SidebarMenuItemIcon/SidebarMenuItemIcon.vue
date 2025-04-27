<template>
  <span :class="componentClasses" aria-hidden="true">
    <i v-if="isIconString" />
    <component v-else :is="props.icon" />
  </span>
</template>

<script setup lang="ts">
// Types
import type { TSidebarMenuItemIconProps } from './SidebarMenuItemIcon';

// Composables
import useSidebarMenuItemIcon from '../../composables/useSidebarMenuItemIcon/useSidebarMenuItemIcon';

const props = defineProps<TSidebarMenuItemIconProps>();

const { isIconString, componentClasses } = useSidebarMenuItemIcon(props);
</script>
