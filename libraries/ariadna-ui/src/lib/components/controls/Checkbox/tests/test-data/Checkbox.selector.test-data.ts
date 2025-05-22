import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import type { TCheckboxProps } from '../../Checkbox';
import { ECheckboxPropsDefault } from '../../types/Checkbox.enums';

export class CheckboxSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly labelEl: string = '';
  public readonly inputEl: string = '';
  public readonly inputHiddenEl: string = '';
  public readonly customEl: string = '';
  public readonly contentEl: string = '';
  public readonly errorsEl: string = '';
  public readonly errorsExpandEl: string = '';
  public readonly themeModifier: string = '';
  public readonly positionRightModifier: string = '';
  public readonly positionLeftModifier: string = '';
  public readonly sizeSmallModifier: string = '';
  public readonly sizeMediumModifier: string = '';
  public readonly sizeLargeModifier: string = '';
  public readonly primaryModifier: string = '';
  public readonly focusedModifier: string = '';
  public readonly hoveredModifier: string = '';
  public readonly checkedModifier: string = '';
  public readonly disabledModifier: string = '';
  public readonly validModifier: string = '';
  public readonly invalidModifier: string = '';

  public modelValueProp: TCheckboxProps['modelValue'] = true;
  public idProp: TCheckboxProps['id'] = 'custom-id';
  public nameProp: TCheckboxProps['name'] = 'input name';
  public sizeProp: TCheckboxProps['size'] = 'large';
  public positionProp: TCheckboxProps['position'] = 'right';
  public cssClassProp: TCheckboxProps['cssClass'] = 'newCssClass';
  public modifierProp: TCheckboxProps['modifier'] = 'primary';
  public ariaLabelProp: TCheckboxProps['ariaLabel'] = 'My checkbox label';

  constructor(className: string = ECheckboxPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.labelEl = `.${className}__label`;
    this.inputEl = `.${className}__input`;
    this.inputHiddenEl = `.${className}__input--hidden`;
    this.customEl = `.${className}__custom`;
    this.contentEl = `.${className}__content`;
    this.errorsEl = `.${className}__errors`;
    this.errorsExpandEl = `.${className}__errors-expand`;
    this.themeModifier = `${className}--theme`;
    this.positionRightModifier = `${className}--right`;
    this.positionLeftModifier = `${className}--left`;
    this.sizeSmallModifier = `${className}--small`;
    this.sizeMediumModifier = `${className}--medium`;
    this.sizeLargeModifier = `${className}--large`;
    this.primaryModifier = `${className}--primary`;
    this.focusedModifier = `${className}--focused`;
    this.hoveredModifier = `${className}--hovered`;
    this.checkedModifier = `${className}--checked`;
    this.disabledModifier = `${className}--disabled`;
    this.validModifier = `${className}--valid`;
    this.invalidModifier = `${className}--invalid`;
  }

  public mockProps: TCheckboxProps = {
    modelValue: false,
    cssClass: ECheckboxPropsDefault.CSS_CLASS,
  };

  static async getCheckboxDefaultSlotDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Checkbox/slot.default.default.html'))
    ).trim();
  }

  static async getCheckboxDefaultSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Checkbox/slot.default.custom.html'))
    ).trim();
  }

  static async getCheckboxCustomSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Checkbox/slot.custom.custom.html'))
    ).trim();
  }

  static async getCheckboxErrorsSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Checkbox/slot.errors.custom.html'))
    ).trim();
  }
}
