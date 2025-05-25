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
        :value="props.value"
        :checked="vModel === props.value"
        type="radio"
        :id="uniqueID"
        :disabled="props.disabled"
        :name="props.name"
        :class="{
          [`${props.cssClass}__input`]: true,
          [`${props.cssClass}__input--hidden`]: props.custom,
        }"
        @focus="onFocus"
        @blur="onBlur"
        @change="onChange"
      />

      <span
        v-if="props.custom"
        :class="`${props.cssClass}__custom`"
        tabindex="0"
        @keydown.prevent.space="updateModel"
      >
        <slot v-if="!!slots.custom" name="custom" />
      </span>

      <span v-if="!!slots.default" :class="`${props.cssClass}__content`">
        <slot />
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
// Types
import type { TRadioEmits, TRadioProps, TRadioSlots } from '../Radio/Radio';
import { ERadioPropsDefault } from '../Radio/types/Radio.enums';

// Composables
import useRadio from './composables/useRadio/useRadio';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TRadioProps>(), {
  modelValue: null,
  value: null,
  size: ERadioPropsDefault.SIZE,
  cssClass: ERadioPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TRadioSlots>();
const emits = defineEmits<TRadioEmits>();
const vModel = defineModel<TRadioProps['modelValue']>();

const {
  uniqueID,
  componentClasses,
  updateModel,
  onFocus,
  onBlur,
  onChange,
  onMouseOver,
  onMouseLeave,
} = useRadio(props, emits, vModel);
</script>
