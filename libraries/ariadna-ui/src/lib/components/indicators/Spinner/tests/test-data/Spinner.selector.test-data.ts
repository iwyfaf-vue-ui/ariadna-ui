import { DataSelector } from '@/shared/tests/DataSelector';
import type { TSpinnerProps } from '../../Spinner';
import { ESpinnerPropsDefault } from '../../types/Spinner.enums';

export class SpinnerSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly loaderEl: string = '';
  public readonly primaryModifier: string = '';
  public readonly themeModifier: string = '';
  public readonly sizeSmallModifier: string = '';
  public readonly sizeMediumModifier: string = '';
  public readonly sizeLargeModifier: string = '';
  public sizeProp: TSpinnerProps['size'] = 'small';
  public cssClassProp: TSpinnerProps['cssClass'] = 'newCssClass';
  public modifierProp: TSpinnerProps['modifier'] = 'primary';

  constructor(className: string = ESpinnerPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.loaderEl = `.${className}__loader`;
    this.primaryModifier = `${className}--primary`;
    this.themeModifier = `${className}--theme`;
    this.sizeSmallModifier = `${className}--small`;
    this.sizeMediumModifier = `${className}--medium`;
    this.sizeLargeModifier = `${className}--large`;
  }

  public spinnerContent() {
    return 'Loading...';
  }
}
