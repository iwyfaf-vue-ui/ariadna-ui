import { DataSelector } from '@/shared/tests/DataSelector';
import type { TAccordionProps } from '../../../Accordion/Accordion';
import { EAccordionPropsDefault } from '../../../Accordion/types/Accordion.enums';
import { EAccordionItemPropsDefault } from '../../types/AccordionItem.enums';
import type { TAccordionItemProps } from '../../AccordionItem';

export class AccordionItemSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly headerEl: string = '';
  public readonly revealEl: string = '';
  public readonly contentEl: string = '';
  public readonly themeModifier: string = '';
  public readonly primaryModifier: string = '';
  public readonly activeModifier: string = '';
  public readonly focusedModifier: string = '';
  public readonly hoverModifier: string = '';
  public readonly disabledModifier: string = '';

  public cssClassProp: TAccordionProps['cssClass'] = 'newCssClass';
  public modifierProp: TAccordionProps['modifier'] = 'primary';
  public ariaLabelProp: TAccordionItemProps['ariaLabel'] = 'New aria label';

  constructor(className: string = EAccordionPropsDefault.CSS_CLASS + '-item') {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.headerEl = `.${className}__header`;
    this.revealEl = `.${className}__reveal`;
    this.contentEl = `.${className}__content`;
    this.themeModifier = `${className}--theme`;
    this.primaryModifier = `${className}--primary`;
    this.activeModifier = `${className}--active`;
    this.focusedModifier = `${className}--focused`;
    this.hoverModifier = `${className}--hover`;
    this.disabledModifier = `${className}--disabled`;
  }

  public mockProps: TAccordionItemProps = {
    opened: false,
    disabled: false,
    ariaLabel: EAccordionItemPropsDefault.ARIA_LABEL,
  };
}
