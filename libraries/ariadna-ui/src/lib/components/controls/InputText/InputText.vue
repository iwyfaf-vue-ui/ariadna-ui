<template>
  <div :class="componentClasses">
    <div :class="`${props.cssClass}__group`">
      <label v-if="props.label" :for="uniqueID" :class="`${props.cssClass}__label`">
        {{ props.label }}
      </label>

      <input
        v-model="vModel"
        :type="props.type"
        :id="uniqueID"
        :placeholder="defaultPlaceholder"
        :autocomplete="props.autocomplete ? 'on' : 'off'"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :name="props.name"
        :class="`${props.cssClass}__input`"
        v-on="listeners"
      />
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
// Types
import type { TInputTextEmits, TInputTextProps, TInputTextSlots } from '../InputText/InputText';
import { EInputTextPropsDefault } from '../InputText/types/InputText.enums';

// Composables
import useInputText from './composables/useInputText/useInputText';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TInputTextProps>(), {
  modelValue: null,
  type: EInputTextPropsDefault.TYPE,
  size: EInputTextPropsDefault.SIZE,
  errors: () => [],
  cssClass: EInputTextPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TInputTextSlots>();
const emits = defineEmits<TInputTextEmits>();
const vModel = defineModel<TInputTextProps['modelValue']>();

const {
  uniqueID,
  defaultPlaceholder,
  listeners,
  componentClasses,
  onExpandEnter,
  onExpandAfterEnter,
  onExpandBeforeLeave,
} = useInputText(props, slots, emits);
</script>
