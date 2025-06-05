import { DataSelector } from '@/shared/tests/DataSelector';
import type { TAccordionProps } from '../../Accordion';
import { EAccordionPropsDefault } from '../../types/Accordion.enums';

export class AccordionSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly themeModifier: string = '';
  public readonly primaryModifier: string = '';
  public readonly disabledModifier: string = '';

  public cssClassProp: TAccordionProps['cssClass'] = 'newCssClass';
  public modifierProp: TAccordionProps['modifier'] = 'primary';

  constructor(className: string = EAccordionPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.themeModifier = `${className}--theme`;
    this.primaryModifier = `${className}--primary`;
    this.disabledModifier = `${className}--disabled`;
  }

  public mockProps: TAccordionProps = {
    singleMode: false,
    opened: false,
    clickableHeader: false,
    disabled: false,
    cssClass: EAccordionPropsDefault.CSS_CLASS,
  };
}
