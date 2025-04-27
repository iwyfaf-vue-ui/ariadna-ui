<template>
  <span v-if="props.badge" :class="componentClasses">
    <template v-if="isBadgeNotComponent">
      {{ props.badge }}
    </template>

    <component v-else :is="props.badge"></component>
  </span>
</template>

<script setup lang="ts">
// Types
import type { TSidebarMenuItemBadgeProps } from './SidebarMenuItemBadge';

// Composables
import useSidebarMenuItemBadge from '../../composables/useSidebarMenuItemBadge/useSidebarMenuItemBadge';

const props = defineProps<TSidebarMenuItemBadgeProps>();

const { isBadgeNotComponent, componentClasses } = useSidebarMenuItemBadge(props);
</script>
