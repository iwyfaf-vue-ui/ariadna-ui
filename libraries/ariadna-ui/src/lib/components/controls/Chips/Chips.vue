<template>
  <div
    :class="componentClasses"
    :tabindex="props.disabled ? undefined : '0'"
    v-on="listeners"
    @keydown="
      onRootWrapperKeyDown($event);
      onInputKeyDown($event);
    "
  >
    <div :class="`${props.cssClass}__group`">
      <component
        :is="props.writable ? 'label' : 'div'"
        v-if="props.label"
        :for="uniqueID"
        :class="`${props.cssClass}__label`"
      >
        {{ props.label }}
      </component>

      <ul :class="`${props.cssClass}__list`" tabindex="-1" role="listbox">
        <li
          v-for="(chip, i) in vModel"
          :key="`${i}_${chip}`"
          :class="[
            `${props.cssClass}__item`,
            focusedIdx === i ? `${props.cssClass}__item--focused` : undefined,
          ]"
          role="option"
          :aria-selected="focusedIdx === i"
        >
          <slot name="chip" :value="chip">
            <span>{{ chip }}</span>
          </slot>

          <span :class="`${props.cssClass}__item-remove`" role="button" @click="removeChip(i)">
            <slot name="remove">X</slot>
          </span>
        </li>

        <li
          v-if="props.clearable && vModel.length"
          :class="`${props.cssClass}__item-clear`"
          tabindex="0"
          @click="clearChips"
        >
          <slot name="clear">
            <Button :size="props.size" :disabled="props.disabled" :modifier="props.modifier">
              Clear all
            </Button>
          </slot>
        </li>
      </ul>

      <div v-if="props.writable" :class="`${props.cssClass}__input`">
        <slot name="input" :id="uniqueID" :inputValue="writableModel">
          <InputText
            ref="inputText"
            v-model="writableModel"
            type="text"
            :id="uniqueID"
            :placeholder="props.placeholder"
            :size="props.size"
            :disabled="props.disabled"
            :modifier="props.modifier"
            tabindex="0"
          />
        </slot>
      </div>
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
import { useTemplateRef } from 'vue';

// Types
import type { TChipsEmits, TChipsProps, TChipsSlots } from './Chips';
import { EChipsPropsDefault } from './types/Chips.enums';

// Composables
import useChips from './composables/useChips/useChips';
import useChipsControls from './composables/useChipsControls/useChipsControls';
import useChipsKeyboard from './composables/useChipsKeyboard/useChipsKeyboard';

// Components
import Button from '../../buttons/Button/Button.vue';
import InputText from '../InputText/InputText.vue';

const props = withDefaults(defineProps<TChipsProps>(), {
  modelValue: () => [],
  size: EChipsPropsDefault.SIZE,
  cssClass: EChipsPropsDefault.CSS_CLASS,
  errors: () => [],
});
const emits = defineEmits<TChipsEmits>();
const slots = defineSlots<TChipsSlots>();
const vModel = defineModel<NonNullable<TChipsProps['modelValue']>>('modelValue', {
  default: [],
});
const writableModel = defineModel<string>('writableModelValue');

const inputTextRef = useTemplateRef<InstanceType<typeof InputText>>('inputText');

const {
  focusedIdx,
  uniqueID,
  listeners,
  componentClasses,
  onExpandEnter,
  onExpandAfterEnter,
  onExpandBeforeLeave,
} = useChips(props, emits);

const { addChip, removeChip, clearChips } = useChipsControls(
  props,
  emits,
  vModel,
  inputTextRef,
  writableModel,
);

const { onInputKeyDown, onRootWrapperKeyDown } = useChipsKeyboard(
  props,
  vModel,
  focusedIdx,
  addChip,
  removeChip,
  clearChips,
);
</script>
