<template>
  <span v-if="props.badge !== undefined" :class="componentClasses">
    <template v-if="isBadgeNotComponent">{{ props.badge }}</template>
    <component v-else :is="props.badge" />
  </span>
</template>

<script setup lang="ts">
// Types
import type { TDropdownMenuItemBadgeProps } from './DropdownMenuItemBadge';

// Composables
import useDropdownMenuItemBadge from '../../composables/useDropdownMenuItemBadge/useDropdownMenuItemBadge';

const props = defineProps<TDropdownMenuItemBadgeProps>();

const { isBadgeNotComponent, componentClasses } = useDropdownMenuItemBadge(props);
</script>
