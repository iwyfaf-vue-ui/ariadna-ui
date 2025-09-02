<template>
  <div :class="componentClasses">
    <div :class="`${props.cssClass}__group`">
      <label v-if="props.label" :for="uniqueID" :class="`${props.cssClass}__label`">
        {{ props.label }}
      </label>

      <div :class="`${props.cssClass}__wrapper`">
        <span
          v-if="props.controls"
          :class="`${props.cssClass}__decrement-control`"
          :tabindex="-1"
          @mousedown="startCalculation(false)"
          @mouseup="stopCalculation"
          @mouseleave="stopCalculation"
          @touchstart.prevent="startCalculation(false)"
          @touchend="stopCalculation"
        >
          <slot name="decrementControl">
            <Button :size="props.size" :modifier="props.modifier"> - </Button>
          </slot>
        </span>

        <div v-if="vAddonBeforeModel" :class="`${props.cssClass}__addon-before`">
          <slot name="addonBefore">
            {{ vAddonBeforeModel }}
          </slot>
        </div>

        <input
          v-model="maskedValue"
          v-input-number="options"
          :id="uniqueID"
          type="text"
          :placeholder="defaultPlaceholder"
          :autocomplete="props.autocomplete ? 'on' : 'off'"
          :disabled="props.disabled"
          :readonly="props.readonly"
          :name="props.name"
          :class="`${props.cssClass}__input`"
          :aria-valuemin="props.min"
          :aria-valuemax="props.max"
          :aria-valuenow="maskedValue"
          v-on="listeners"
          @input="inputHandler"
          @keydown.prevent.up="onKeyDownOrUpHandler"
          @keydown.prevent.down="onKeyDownOrUpHandler"
        />

        <div v-if="vAddonAfterModel" :class="`${props.cssClass}__addon-after`">
          <slot name="addonAfter">
            {{ vAddonAfterModel }}
          </slot>
        </div>

        <span
          v-if="props.controls"
          :class="`${props.cssClass}__increment-control`"
          :tabindex="-1"
          @mousedown="startCalculation(true)"
          @mouseup="stopCalculation"
          @mouseleave="stopCalculation"
          @touchstart.prevent="startCalculation(true)"
          @touchend="stopCalculation"
        >
          <slot name="incrementControl">
            <Button :size="props.size" :modifier="props.modifier"> + </Button>
          </slot>
        </span>
      </div>
    </div>

    <div v-if="!!slots.placeholder" :class="`${props.cssClass}__placeholder`">
      <slot name="placeholder" />
    </div>

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
// Vue
import type { ComputedRef } from 'vue';
import { computed, ref, watch } from 'vue';

// Types
import type { TInputNumberEmits, TInputNumberProps, TInputNumberSlots } from './InputNumber';
import { EInputNumberPropsDefault } from './types/InputNumber.enums';
import type { TInputNumberOptions } from './types/InputNumber.types';

// Components
import Button from '../../buttons/Button/Button.vue';

// Directives
import vInputNumber from './directives/InputNumber';

// Composables
import useInputNumber from './composables/useInputNumber/useInputNumber';

// Core
import InputNumberFormatterCore from './core/formatter/input-number.formatter.core';

// Shared
import type { Numberish } from '@/types';
import useInputNumberHandlers from '@/lib/components/controls/InputNumber/composables/useInputNumberHandlers/useInputNumberHandlers';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TInputNumberProps>(), {
  modelValue: 0,
  size: EInputNumberPropsDefault.SIZE,
  step: EInputNumberPropsDefault.STEP,
  empty: EInputNumberPropsDefault.EMPTY,
  errors: () => [],
  cssClass: EInputNumberPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TInputNumberSlots>();
const emits = defineEmits<TInputNumberEmits>();
const vAddonBeforeModel = defineModel<string | null>('addon-before', { default: null });
const vAddonAfterModel = defineModel<string | null>('addon-after', { default: null });

const options: ComputedRef<TInputNumberOptions> = computed(() => {
  return {
    prefix: props.prefix,
    suffix: props.suffix,
    locale: props.locale,
    min: props.min,
    max: props.max,
    step: props.step,
    empty: props.empty,
  };
});

const inputNumberFormatterCore = new InputNumberFormatterCore(options.value);
const maskedValue = ref(inputNumberFormatterCore.format(props.modelValue));
const unmaskedValue = ref<Numberish>('');

const emittedValue = computed(() => {
  return props.masked ? maskedValue.value : unmaskedValue.value;
});

const {
  uniqueID,
  defaultPlaceholder,
  listeners,
  componentClasses,
  onExpandEnter,
  onExpandAfterEnter,
  onExpandBeforeLeave,
} = useInputNumber(props, slots, emits);

const { inputHandler, onKeyDownOrUpHandler, startCalculation, stopCalculation } =
  useInputNumberHandlers(emits, maskedValue, unmaskedValue, emittedValue, inputNumberFormatterCore);

watch(
  () => props.modelValue,
  (newValue) => {
    const masked = inputNumberFormatterCore.format(newValue);

    if (masked !== maskedValue.value) {
      maskedValue.value = masked;
    }
  },
);
</script>
