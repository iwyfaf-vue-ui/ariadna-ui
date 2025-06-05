<template>
  <div :class="componentClasses" tabindex="-1" role="presentation">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref, provide, defineExpose } from 'vue';

// Types
import type { TAccordionExposes, TAccordionProps, TAccordionSlots } from '../Accordion/Accordion';
import type { TAccordionItem, TAccordionItems } from '../AccordionItem/types/AccordionItem.types';
import { EAccordionPropsDefault } from '../Accordion/types/Accordion.enums';

// Composables
import useAccordion from './composables/useAccordion/useAccordion';

// Providers
import { AccordionProviderKey } from './providers/Accordion.provider';

const props = withDefaults(defineProps<TAccordionProps>(), {
  clickableHeader: true,
  cssClass: EAccordionPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TAccordionSlots>();

const accordions: TAccordionItems = ref<Array<TAccordionItem>>([]);

const { componentClasses, updateAccordion, openAll, closeAll, updateBy } = useAccordion(
  props,
  accordions,
);

provide(AccordionProviderKey, {
  accordions,
  updateAccordion: updateAccordion,
  opened: props.opened,
  clickableHeader: props.clickableHeader,
  disabled: props.disabled,
  cssClass: props.cssClass,
  modifier: props.modifier,
});

defineExpose<TAccordionExposes>({
  openAll,
  closeAll,
  updateBy,
});
</script>
