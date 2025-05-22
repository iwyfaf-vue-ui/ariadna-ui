<template>
  <div :class="componentClasses">
    <label
      :aria-labelledby="uniqueID"
      :class="`${props.cssClass}__label`"
      @mouseover="onMouseOver"
      @mouseleave="onMouseLeave"
    >
      <input
        v-model="vModel"
        :checked="vModel"
        type="checkbox"
        :id="uniqueID"
        :disabled="props.disabled"
        :name="props.name"
        :class="{
          [`${props.cssClass}__input`]: true,
          [`${props.cssClass}__input--hidden`]: props.custom,
        }"
        :aria-label="props.ariaLabel"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
      />

      <span
        v-if="props.custom"
        :class="`${props.cssClass}__custom`"
        tabindex="0"
        @keydown.prevent.space="toggleModel"
      >
        <slot v-if="!!slots.custom" name="custom" />
      </span>

      <span v-if="!!slots.default" :class="`${props.cssClass}__content`">
        <slot />
      </span>
    </label>

    <Transition
      :name="`${cssClass}__errors-expand`"
      @enter="onExpandEnter"
      @after-enter="onExpandAfterEnter"
      @before-leave="onExpandBeforeLeave"
    >
      <div v-if="props.invalid && props.errors.length" :class="`${props.cssClass}__errors`">
        <slot name="errors" :errors="props.errors">
          <div
            v-for="(error, i) in props.errors"
            :key="`error-${i + 1}`"
            :class="`${props.cssClass}__errors-${i + 1}`"
          >
            {{ error }}
          </div>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// Types
import type { TCheckboxEmits, TCheckboxProps, TCheckboxSlots } from '../Checkbox/Checkbox';
import { ECheckboxPropsDefault } from '../Checkbox/types/Checkbox.enums';

// Composables
import useCheckbox from './composables/useCheckbox/useCheckbox';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TCheckboxProps>(), {
  modelValue: false,
  size: ECheckboxPropsDefault.SIZE,
  errors: () => [],
  cssClass: ECheckboxPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TCheckboxSlots>();
const emits = defineEmits<TCheckboxEmits>();
const vModel = defineModel<TCheckboxProps['modelValue']>();

const {
  uniqueID,
  componentClasses,
  toggleModel,
  onFocus,
  onBlur,
  onChange,
  onMouseOver,
  onMouseLeave,
  onExpandEnter,
  onExpandAfterEnter,
  onExpandBeforeLeave,
} = useCheckbox(props, emits, vModel);
</script>
