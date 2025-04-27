<template>
  <a
    v-if="renderType === 'external'"
    :href="props.item.href"
    target="_blank"
    rel="noopener noreferrer"
    :class="componentClasses"
  >
    <slot />
  </a>

  <a
    v-else-if="renderType === 'native'"
    :href="props.item.href"
    :class="componentClasses"
    v-bind="$attrs"
  >
    <slot />
  </a>

  <RouterLink
    v-else-if="renderType === 'internal'"
    v-slot="{ href, navigate }"
    custom
    :to="props.item.href"
    :class="componentClasses"
  >
    <a v-bind="$attrs" :href="href" :class="componentClasses" @click="navigate">
      <slot />
    </a>
  </RouterLink>

  <div v-else :class="componentClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Types
import type { TSidebarMenuItemLinkProps } from './SidebarMenuItemLink';

// Composables
import useSidebarMenuItemLink from '../../composables/useSidebarMenuItemLink/useSidebarMenuItemLink';

const props = defineProps<TSidebarMenuItemLinkProps>();

const { renderType, componentClasses } = useSidebarMenuItemLink(props);
</script>
