<template>
  <component
    :is="props.tag"
    :type="props.tag === 'button' ? 'button' : undefined"
    :class="componentClasses"
  >
    <span v-if="!!slots.icon" :class="`${props.cssClass}__icon`">
      <slot name="icon" />
    </span>

    <span :class="`${props.cssClass}__label`">
      <slot />
    </span>
  </component>
</template>

<script setup lang="ts">
// Types
import type { TTagProps, TTagSlots } from '@/lib/components/data/Tag/Tag';
import { ETagPropsDefault } from '@/lib/components/data/Tag/types/Tag.enums';

// Composables
import useTag from '@/lib/components/data/Tag/composables/useTag/useTag';

const props = withDefaults(defineProps<TTagProps>(), {
  tag: ETagPropsDefault.TAG,
  size: ETagPropsDefault.SIZE,
  cssClass: ETagPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TTagSlots>();

const { componentClasses } = useTag(props);
</script>
