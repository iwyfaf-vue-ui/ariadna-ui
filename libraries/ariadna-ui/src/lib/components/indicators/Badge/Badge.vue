<template>
  <component v-if="$slots.default" :is="props.tag" :class="componentClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
// Types
import type { TBadgeProps, TBadgeSlots } from './Badge';
import { EBadgePropsDefault } from './types/Badge.enums';

// Composables
import useBadge from './composables/useBadge/useBadge';

const props = withDefaults(defineProps<TBadgeProps>(), {
  tag: EBadgePropsDefault.TAG,
  size: EBadgePropsDefault.SIZE,
  cssClass: EBadgePropsDefault.CSS_CLASS,
});
const slots = defineSlots<TBadgeSlots>();

const { componentClasses } = useBadge(props);
</script>
