<template>
  <div :class="componentClasses">
    <div :class="`${props.cssClass}__group`">
      <label v-if="props.label" :for="uniqueID" :class="`${props.cssClass}__label`">
        {{ props.label }}
      </label>

      <textarea
        v-model="vModel"
        :id="uniqueID"
        :placeholder="defaultPlaceholder"
        :autocomplete="props.autocomplete ? 'on' : 'off'"
        :rows="props.rows"
        :cols="props.cols"
        :spellcheck="props.spellcheck"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :name="props.name"
        :class="`${props.cssClass}__textarea`"
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
import type { TTextareaEmits, TTextareaProps, TTextareaSlots } from './Textarea';
import { ETextareaPropsDefault } from './types/Textarea.enums';

// Composables
import useTextarea from './composables/useTextarea/useTextarea';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TTextareaProps>(), {
  modelValue: null,
  rows: ETextareaPropsDefault.ROWS,
  cols: ETextareaPropsDefault.COLS,
  spellcheck: true,
  errors: () => [],
  cssClass: ETextareaPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TTextareaSlots>();
const emits = defineEmits<TTextareaEmits>();
const vModel = defineModel<TTextareaProps['modelValue']>();

const {
  uniqueID,
  defaultPlaceholder,
  listeners,
  componentClasses,
  onExpandEnter,
  onExpandAfterEnter,
  onExpandBeforeLeave,
} = useTextarea(props, slots, emits);
</script>
