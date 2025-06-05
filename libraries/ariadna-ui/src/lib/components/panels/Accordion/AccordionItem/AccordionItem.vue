<template>
  <div :class="componentClasses" @mouseover="onMouseOver" @mouseleave="onMouseLeave">
    <div
      ref="accordion"
      :class="`${cssClass}-item__header`"
      :tabindex="disabledState ? -1 : 0"
      role="button"
      :aria-expanded="openedState"
      :aria-disabled="disabledState"
      :aria-pressed="openedState"
      :aria-controls="id"
      :aria-label="props.ariaLabel"
      @click.stop="clickableHeader && updateAccordionWrapper(id, !openedState)"
      @focus="onFocus"
      @blur="onBlur"
      @keydown.prevent.space="toggle"
      @keydown.prevent.enter="toggle"
      @keydown.prevent.esc="onKeyDownEcsHandler"
      @keydown.prevent.up="onKeyUpOrDownHandler"
      @keydown.prevent.down="onKeyUpOrDownHandler"
    >
      <slot name="header" :opened="openedState">Header</slot>
      <slot name="activator" :opened="openedState" :open="open" :close="close" :toggle="toggle" />
    </div>

    <Transition
      :name="`${cssClass}-item__reveal`"
      @enter="onExpandEnter"
      @after-enter="onExpandAfterEnter"
      @before-leave="onExpandBeforeLeave"
    >
      <div v-show="openedState" :class="`${cssClass}-item__content`" :id="id">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// Vue
import { defineExpose, useTemplateRef } from 'vue';

// Types
import type {
  TAccordionItemEmits,
  TAccordionItemExposes,
  TAccordionItemProps,
  TAccordionItemSlots,
} from '../AccordionItem/AccordionItem';
import { EAccordionItemPropsDefault } from '../AccordionItem/types/AccordionItem.enums';

// Composables
import useAccordionItem from './composables/useAccordionItem/useAccordionItem';

// Providers
import { AccordionProviderKey } from '../Accordion/providers/Accordion.provider';

// Shared
import injectStrict from '@/shared/validators/vue/inject-strict.vue.validator';

const props = withDefaults(defineProps<TAccordionItemProps>(), {
  ariaLabel: EAccordionItemPropsDefault.ARIA_LABEL,
});
const slots = defineSlots<TAccordionItemSlots>();
const emits = defineEmits<TAccordionItemEmits>();

const accordionRef = useTemplateRef('accordion');

const { accordions, updateAccordion, opened, clickableHeader, disabled, cssClass, modifier } =
  injectStrict(AccordionProviderKey);

const {
  id,
  componentClasses,
  openedState,
  disabledState,
  updateAccordionWrapper,
  toggle,
  open,
  close,
  onMouseOver,
  onMouseLeave,
  onKeyDownEcsHandler,
  onKeyUpOrDownHandler,
  onBlur,
  onFocus,
  onExpandEnter,
  onExpandAfterEnter,
  onExpandBeforeLeave,
} = useAccordionItem(
  props,
  emits,
  accordionRef,
  accordions,
  updateAccordion,
  opened,
  disabled,
  cssClass,
  modifier,
);

defineExpose<TAccordionItemExposes>({
  toggle,
  open,
  close,
});
</script>
