import { computed, watchEffect } from 'vue';
import type { TAccordionProps } from '../../Accordion';
import type { TUseAccordionReturn } from './useAccordion.types';
import { ELibraryConfig } from '@/types/internal';
import { EAccordionConfig, EAccordionErrors } from '../../types/Accordion.enums';
import type { TAccordionItems } from '../../../AccordionItem/types/AccordionItem.types';

export default function useAccordion(
  props: TAccordionProps,
  accordions: TAccordionItems,
): TUseAccordionReturn {
  const componentClasses = computed(() => {
    const base = props.cssClass;

    const theme = `${base}--theme`;
    const disabled = props.disabled ? `${base}--disabled` : undefined;
    const modifier = props.modifier ? `${base}--${props.modifier}` : undefined;

    return [base, theme, disabled, modifier].filter(Boolean).join(' ');
  });

  function updateAccordion(id: string, value: boolean) {
    const index = accordions.value.findIndex((accordion) => accordion.id === id);

    if (index === -1) return;

    if (!props.singleMode) {
      if (value) {
        accordions.value[index].open();
        return;
      }

      accordions.value[index].close();
      return;
    }

    accordions.value.forEach((accordion) =>
      value && accordion.id === id ? accordion.open() : accordion.close(),
    );
  }

  function openAll() {
    if (props.singleMode) {
      return;
    }

    accordions.value.forEach((accordion) => accordion.open());
  }

  function closeAll() {
    accordions.value.forEach((accordion) => accordion.close());
  }

  function updateBy(index: number, value = true) {
    const accordion = accordions.value[index];

    if (!accordion) {
      return;
    }

    updateAccordion(accordion.id, value);
  }

  watchEffect(() => {
    if (props.opened && props.singleMode) {
      throw new Error(
        `${ELibraryConfig.NAME}(${EAccordionConfig.NAME}): ${EAccordionErrors.OPENED_SINGLE_MODE_CONFLICT}`,
      );
    }
  });

  return {
    componentClasses,
    updateAccordion,
    openAll,
    closeAll,
    updateBy,
  };
}
