<template>
  <span v-if="$slots.default" :class="componentClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
// Types
import type { TBadgeProps, TBadgeSlots } from './Badge';
import { EBadgePropsDefault } from './types/Badge.enums';

// Composables
import useBadge from './composables/useBadge/useBadge';

const props = withDefaults(defineProps<TBadgeProps>(), {
  size: EBadgePropsDefault.SIZE,
  cssClass: EBadgePropsDefault.CSS_CLASS,
});
const slots = defineSlots<TBadgeSlots>();

const { componentClasses } = useBadge(props);
</script>
