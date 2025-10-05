import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import { EInputNumberPropsDefault } from '../../types/InputNumber.enums';
import type { TInputNumberProps } from '../../InputNumber';

export class InputNumberSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly groupEl: string = '';
  public readonly labelEl: string = '';
  public readonly inputEl: string = '';
  public readonly decrementControlEl: string = '';
  public readonly incrementControlEl: string = '';
  public readonly addonBeforeEl: string = '';
  public readonly addonAfterEl: string = '';
  public readonly placeholderEl: string = '';
  public readonly errorsEl: string = '';
  public readonly errorsExpandEl: string = '';
  public readonly themeModifier: string = '';
  public readonly primaryModifier: string = '';
  public readonly sizeSmallModifier: string = '';
  public readonly sizeMediumModifier: string = '';
  public readonly sizeLargeModifier: string = '';
  public readonly focusedModifier: string = '';
  public readonly hoveredModifier: string = '';
  public readonly filledModifier: string = '';
  public readonly disabledModifier: string = '';
  public readonly validModifier: string = '';
  public readonly invalidModifier: string = '';

  public modelValueProp: TInputNumberProps['modelValue'] = 10;
  public labelProp: TInputNumberProps['label'] = 'label value';
  public idProp: TInputNumberProps['id'] = 'custom-id';
  public placeholderProp: TInputNumberProps['placeholder'] = 'custom placeholder';
  public nameProp: TInputNumberProps['name'] = 'input name';
  public sizeProp: TInputNumberProps['size'] = 'small';
  public cssClassProp: TInputNumberProps['cssClass'] = 'newCssClass';
  public modifierProp: TInputNumberProps['modifier'] = 'primary';

  public addonBefore: string | null = 'addon before';
  public addonAfter: string | null = 'addon after';

  constructor(className: string = EInputNumberPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.groupEl = `.${className}__group`;
    this.labelEl = `.${className}__label`;
    this.inputEl = `.${className}__input`;
    this.decrementControlEl = `.${className}__decrement-control`;
    this.incrementControlEl = `.${className}__increment-control`;
    this.addonBeforeEl = `.${className}__addon-before`;
    this.addonAfterEl = `.${className}__addon-after`;
    this.placeholderEl = `.${className}__placeholder`;
    this.errorsEl = `.${className}__errors`;
    this.errorsExpandEl = `.${className}__errors-expand`;
    this.themeModifier = `${className}--theme`;
    this.primaryModifier = `${className}--primary`;
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

  public mockProps: TInputNumberProps = {
    modelValue: 0,
    size: EInputNumberPropsDefault.SIZE,
    step: EInputNumberPropsDefault.STEP,
    empty: null,
    cssClass: EInputNumberPropsDefault.CSS_CLASS as string,
  };

  static async getInputNumberPlaceholderSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputNumber/slot.placeholder.custom.html'),
      )
    ).trim();
  }

  static async getInputNumberDecrementControlSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputNumber/slot.decrement-control.default.html'),
      )
    ).trim();
  }

  static async getInputNumberDecrementControlSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputNumber/slot.decrement-control.custom.html'),
      )
    ).trim();
  }

  static async getInputNumberIncrementControlSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputNumber/slot.increment-control.default.html'),
      )
    ).trim();
  }

  static async getInputNumberIncrementControlSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputNumber/slot.increment-control.custom.html'),
      )
    ).trim();
  }

  static async getInputNumberAddonBeforeSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputNumber/slot.addon-before.default.html'),
      )
    ).trim();
  }

  static async getInputNumberAddonBeforeSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputNumber/slot.addon-before.custom.html'),
      )
    ).trim();
  }

  static async getInputNumberAddonAfterSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputNumber/slot.addon-after.default.html'),
      )
    ).trim();
  }

  static async getInputNumberAddonAfterSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputNumber/slot.addon-after.custom.html'),
      )
    ).trim();
  }

  static async getInputNumberErrorsSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/InputNumber/slot.errors.custom.html'))
    ).trim();
  }
}
