import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import type { TTextareaProps } from '../../Textarea';
import { ETextareaPropsDefault } from '../../types/Textarea.enums';
import type { TButtonProps } from '@/lib/components/buttons/Button/Button';

export class TextareaSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly groupEl: string = '';
  public readonly labelEl: string = '';
  public readonly textareaEl: string = '';
  public readonly placeholderEl: string = '';
  public readonly errorsEl: string = '';
  public readonly errorsExpandEl: string = '';
  public readonly themeModifier: string = '';
  public readonly primaryModifier: string = '';
  public readonly focusedModifier: string = '';
  public readonly hoveredModifier: string = '';
  public readonly filledModifier: string = '';
  public readonly disabledModifier: string = '';
  public readonly validModifier: string = '';
  public readonly invalidModifier: string = '';

  public modelValueProp: TTextareaProps['modelValue'] = 'abc';
  public labelProp: TTextareaProps['label'] = 'label value';
  public idProp: TTextareaProps['id'] = 'custom-id';
  public placeholderProp: TTextareaProps['placeholder'] = 'custom placeholder';
  public nameProp: TTextareaProps['name'] = 'textarea name';
  public rowsProp: TTextareaProps['rows'] = '20';
  public colsProp: TTextareaProps['cols'] = '40';
  public cssClassProp: TTextareaProps['cssClass'] = 'newCssClass';
  public modifierProp: TButtonProps['modifier'] = 'primary';

  constructor(className: string = ETextareaPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.groupEl = `.${className}__group`;
    this.labelEl = `.${className}__label`;
    this.textareaEl = `.${className}__textarea`;
    this.placeholderEl = `.${className}__placeholder`;
    this.errorsEl = `.${className}__errors`;
    this.errorsExpandEl = `.${className}__errors-expand`;
    this.themeModifier = `${className}--theme`;
    this.primaryModifier = `${className}--primary`;
    this.focusedModifier = `${className}--focused`;
    this.hoveredModifier = `${className}--hovered`;
    this.filledModifier = `${className}--filled`;
    this.disabledModifier = `${className}--disabled`;
    this.validModifier = `${className}--valid`;
    this.invalidModifier = `${className}--invalid`;
  }

  public mockProps: TTextareaProps = {
    modelValue: null,
    cssClass: ETextareaPropsDefault.CSS_CLASS,
  };

  static async getTextareaPlaceholderSlotCustom(): Promise<string> {
    return await this.readFile(
      path.resolve(__dirname, 'components/Textarea/slot.placeholder.custom.html').trim(),
    );
  }

  static async getTextareaErrorsSlotCustom(): Promise<string> {
    return await this.readFile(
      path.resolve(__dirname, 'components/Textarea/slot.errors.custom.html').trim(),
    );
  }
}
