import { DataSelector } from '@/shared/tests/DataSelector';
import type { TButtonProps } from '@/lib/components/buttons/Button/Button';

export class ButtonSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly groupEl: string = '';
  public readonly groupIconEl: string = '';
  public readonly textEl: string = '';
  public readonly loadingEl: string = '';
  public readonly iconPositionLeftModifier: string = '';
  public readonly iconPositionRightModifier: string = '';
  public readonly iconPositionTopModifier: string = '';
  public readonly iconPositionBottomModifier: string = '';
  public readonly primaryModifier: string = '';
  public readonly themeModifier: string = '';
  public readonly sizeSmallModifier: string = '';
  public readonly sizeMediumModifier: string = '';
  public readonly sizeLargeModifier: string = '';
  public readonly roundedModifier: string = '';
  public readonly textualModifier: string = '';
  public readonly outlinedModifier: string = '';
  public readonly disabledModifier: string = '';
  public readonly loadingModifier: string = '';
  public readonly selectedModifier: string = '';
  public sizeProp: TButtonProps['size'] = 'small';
  public cssClassProp: TButtonProps['cssClass'] = 'newCssClass';
  public modifierProp: TButtonProps['modifier'] = 'primary';

  constructor(className: string = 'ar-button') {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.groupEl = `.${className}__group`;
    this.groupIconEl = `.${className}__icon`;
    this.textEl = `.${className}__text`;
    this.loadingEl = `.${className}__loading`;
    this.iconPositionLeftModifier = `${className}--icon-left`;
    this.iconPositionRightModifier = `${className}--icon-right`;
    this.iconPositionTopModifier = `${className}--icon-top`;
    this.iconPositionBottomModifier = `${className}--icon-bottom`;
    this.primaryModifier = `${className}--primary`;
    this.themeModifier = `${className}--theme`;
    this.sizeSmallModifier = `${className}--small`;
    this.sizeMediumModifier = `${className}--medium`;
    this.sizeLargeModifier = `${className}--large`;
    this.roundedModifier = `${className}--rounded`;
    this.textualModifier = `${className}--textual`;
    this.outlinedModifier = `${className}--outlined`;
    this.disabledModifier = `${className}--disabled`;
    this.loadingModifier = `${className}--loading`;
    this.selectedModifier = `${className}--selected`;
  }

  public buttonContent() {
    return 'Button text';
  }

  public loadingContent() {
    return 'Button loading state text';
  }
}
