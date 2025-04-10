<template>
  <component
    :is="props.tag"
    :class="componentClasses"
    :type="props.tag === 'button' ? props.type : undefined"
    :disabled="props.tag === 'button' ? isDisabled : undefined"
    :aria-disabled="isDisabled"
    :aria-selected="props.selected"
    :aria-busy="props.loading"
    @click="clickHandler"
  >
    <span :class="`${props.cssClass}__group`">
      <span v-if="!!slots.icon" :class="`${props.cssClass}__icon`" aria-hidden="true">
        <slot name="icon" />
      </span>

      <span v-if="!!slots.default" :class="`${props.cssClass}__text`">
        <slot />
      </span>
    </span>

    <span v-if="props.loading && $slots.loading" :class="`${props.cssClass}__loading`">
      <slot name="loading" />
    </span>
  </component>
</template>

<script setup lang="ts">
// Types
import type { TButtonEmits, TButtonProps, TButtonSlots } from './Button';
import { EButtonPropsDefault } from '../Button/types/Button.enums';

// Composables
import useButton from './composables/useButton/useButton';

const props = withDefaults(defineProps<TButtonProps>(), {
  tag: EButtonPropsDefault.TAG,
  iconPosition: EButtonPropsDefault.ICON_POSITION,
  size: EButtonPropsDefault.SIZE,
  cssClass: EButtonPropsDefault.CSS_CLASS,
  type: EButtonPropsDefault.TYPE,
});
const slots = defineSlots<TButtonSlots>();
const emits = defineEmits<TButtonEmits>();

const { isDisabled, componentClasses, clickHandler } = useButton(props, emits);
</script>
