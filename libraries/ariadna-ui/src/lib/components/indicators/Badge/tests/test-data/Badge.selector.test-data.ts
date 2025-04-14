import { DataSelector } from '@/shared/tests/DataSelector';
import type { TBadgeProps } from '../../Badge';
import { EBadgePropsDefault } from '../../types/Badge.enums';

export class BadgeSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly primaryModifier: string = '';
  public readonly themeModifier: string = '';
  public readonly sizeSmallModifier: string = '';
  public readonly sizeMediumModifier: string = '';
  public readonly sizeLargeModifier: string = '';
  public readonly roundedModifier: string = '';
  public readonly floatingModifier: string = '';
  public sizeProp: TBadgeProps['size'] = 'small';
  public cssClassProp: TBadgeProps['cssClass'] = 'newCssClass';
  public modifierProp: TBadgeProps['modifier'] = 'primary';

  constructor(className: string = EBadgePropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.primaryModifier = `${className}--primary`;
    this.themeModifier = `${className}--theme`;
    this.sizeSmallModifier = `${className}--small`;
    this.sizeMediumModifier = `${className}--medium`;
    this.sizeLargeModifier = `${className}--large`;
    this.roundedModifier = `${className}--rounded`;
    this.floatingModifier = `${className}--floating`;
  }
}
