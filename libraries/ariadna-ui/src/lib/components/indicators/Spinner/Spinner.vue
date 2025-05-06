<template>
  <div :class="componentClasses">
    <div :class="`${props.cssClass}__loader`"></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// Types
import type { TSpinnerProps, TSpinnerSlots } from './Spinner';
import { ESpinnerPropsDefault } from './types/Spinner.enums';

// Composables
import useSpinner from './composables/useSpinner/useSpinner';

const props = withDefaults(defineProps<TSpinnerProps>(), {
  size: ESpinnerPropsDefault.SIZE,
  cssClass: ESpinnerPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TSpinnerSlots>();

const { componentClasses } = useSpinner(props);
</script>
