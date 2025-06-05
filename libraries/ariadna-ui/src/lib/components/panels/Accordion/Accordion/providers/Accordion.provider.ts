import type { InjectionKey } from 'vue';
import type { TAccordionItems } from '../../AccordionItem/types/AccordionItem.types';
import type { TAccordionProps } from '../Accordion';

export type TAccordionProvider = {
  accordions: TAccordionItems;
  updateAccordion: (id: string, value: boolean) => void;
  opened: boolean;
  clickableHeader: TAccordionProps['clickableHeader'];
  disabled: TAccordionProps['disabled'];
  cssClass: TAccordionProps['cssClass'];
  modifier: TAccordionProps['modifier'];
};

export const AccordionProviderKey: InjectionKey<TAccordionProvider> = Symbol('AccordionProvider');
