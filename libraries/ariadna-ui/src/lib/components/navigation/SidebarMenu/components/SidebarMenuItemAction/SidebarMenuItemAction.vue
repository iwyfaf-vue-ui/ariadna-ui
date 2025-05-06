<template>
  <span
    v-if="props.action"
    tabindex="0"
    :class="componentClasses"
    @click.prevent.stop="props.action"
  >
    <template v-if="isActionString">
      {{ props.actionIcon }}
    </template>

    <component v-else :is="props.actionIcon"></component>
  </span>
</template>

<script setup lang="ts">
// Types
import type { TSidebarMenuItemActionProps } from './SidebarMenuItemAction';

// Composables
import useSidebarMenuItemAction from '../../composables/useSidebarMenuItemAction/useSidebarMenuItemAction';

const props = withDefaults(defineProps<TSidebarMenuItemActionProps>(), {
  actionIcon: '...',
});

const { isActionString, componentClasses } = useSidebarMenuItemAction(props);
</script>
