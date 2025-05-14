import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import { EInputTextPropsDefault } from '../../types/InputText.enums';
import type { TInputTextProps } from '../../InputText';

export class InputTextSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly groupEl: string = '';
  public readonly labelEl: string = '';
  public readonly inputEl: string = '';
  public readonly placeholderEl: string = '';
  public readonly errorsEl: string = '';
  public readonly errorsExpandEl: string = '';
  public readonly themeModifier: string = '';
  public readonly sizeSmallModifier: string = '';
  public readonly sizeMediumModifier: string = '';
  public readonly sizeLargeModifier: string = '';
  public readonly focusedModifier: string = '';
  public readonly hoveredModifier: string = '';
  public readonly filledModifier: string = '';
  public readonly disabledModifier: string = '';
  public readonly validModifier: string = '';
  public readonly invalidModifier: string = '';

  public modelValueProp: TInputTextProps['modelValue'] = 'abc';
  public labelProp: TInputTextProps['label'] = 'label value';
  public idProp: TInputTextProps['id'] = 'custom-id';
  public placeholderProp: TInputTextProps['placeholder'] = 'custom placeholder';
  public nameProp: TInputTextProps['name'] = 'input name';
  public sizeProp: TInputTextProps['size'] = 'small';
  public cssClassProp: TInputTextProps['cssClass'] = 'newCssClass';

  constructor(className: string = EInputTextPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.groupEl = `.${className}__group`;
    this.labelEl = `.${className}__label`;
    this.inputEl = `.${className}__input`;
    this.placeholderEl = `.${className}__placeholder`;
    this.errorsEl = `.${className}__errors`;
    this.errorsExpandEl = `.${className}__errors-expand`;
    this.themeModifier = `${className}--theme`;
    this.sizeSmallModifier = `${className}--small`;
    this.sizeMediumModifier = `${className}--medium`;
    this.sizeLargeModifier = `${className}--large`;
    this.focusedModifier = `${className}--focused`;
    this.hoveredModifier = `${className}--hovered`;
    this.filledModifier = `${className}--filled`;
    this.disabledModifier = `${className}--disabled`;
    this.validModifier = `${className}--valid`;
    this.invalidModifier = `${className}--invalid`;
  }

  public mockProps: TInputTextProps = {
    modelValue: null,
    cssClass: EInputTextPropsDefault.CSS_CLASS,
  };

  static async getInputTextPlaceholderSlotCustom(): Promise<string> {
    return await this.readFile(
      path.resolve(__dirname, 'components/InputText/slot.placeholder.custom.html').trim(),
    );
  }

  static async getInputTextErrorsSlotCustom(): Promise<string> {
    return await this.readFile(
      path.resolve(__dirname, 'components/InputText/slot.errors.custom.html').trim(),
    );
  }
}
