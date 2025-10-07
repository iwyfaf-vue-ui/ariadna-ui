import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import { EInputPasswordPropsDefault } from '../../types/InputPassword.enums';
import type { TInputPasswordProps, TInputPasswordRuleItem } from '../../InputPassword';

export class InputPasswordSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly groupEl: string = '';
  public readonly labelEl: string = '';
  public readonly inputEl: string = '';
  public readonly placeholderEl: string = '';
  public readonly toggleButtonEl: string = '';
  public readonly meterPanelEl: string = '';
  public readonly meterPanelModifier: string = '';
  public readonly progressBarEl: string = '';
  public readonly progressBarItemEl: string = '';
  public readonly conditionMessagesEl: string = '';
  public readonly conditionMessagesItemEl: string = '';
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

  public modelValueProp: TInputPasswordProps['modelValue'] = 'abc';
  public labelProp: TInputPasswordProps['label'] = 'label value';
  public idProp: TInputPasswordProps['id'] = 'custom-id';
  public placeholderProp: TInputPasswordProps['placeholder'] = 'custom placeholder';
  public nameProp: TInputPasswordProps['name'] = 'input name';
  public sizeProp: TInputPasswordProps['size'] = 'small';
  public cssClassProp: TInputPasswordProps['cssClass'] = 'newCssClass';
  public modifierProp: TInputPasswordProps['modifier'] = 'primary';

  constructor(className: string = EInputPasswordPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.groupEl = `.${className}__group`;
    this.labelEl = `.${className}__label`;
    this.inputEl = `.${className}__input`;
    this.placeholderEl = `.${className}__placeholder`;
    this.toggleButtonEl = `.${className}__toggle-button`;
    this.meterPanelEl = `.${className}__meter-panel`;
    this.meterPanelModifier = `${className}__meter-panel--visible`;
    this.progressBarEl = `.${className}__progress-bar`;
    this.progressBarItemEl = `.${className}__progress-bar-item`;
    this.conditionMessagesEl = `.${className}__condition-messages`;
    this.conditionMessagesItemEl = `.${className}__condition-messages-item`;
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

  public mockProps: TInputPasswordProps = {
    modelValue: null,
    size: EInputPasswordPropsDefault.SIZE,
    showPassword: false,
    rules: [],
    errors: [],
    cssClass: EInputPasswordPropsDefault.CSS_CLASS,
  };

  public rules: Array<TInputPasswordRuleItem> = [
    { condition: (_, rules) => rules.minLength(8), message: 'Min 8 chars.' },
    {
      condition: (_, rules) => rules.upperCase(),
      message: 'Uppercase required.',
    },
    {
      condition: (_, rules) => rules.lowerCase(),
      message: 'Lowercase required.',
    },
    {
      condition: (_, rules) => rules.specialSymbols('_'),
      message: 'Special symbol: _.',
    },
  ];

  static async getInputPasswordPlaceholderSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputPassword/slot.placeholder.custom.html'),
      )
    ).trim();
  }

  static async getInputPasswordToggleButtonSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputPassword/slot.toggle-button.default.html'),
      )
    ).trim();
  }

  static async getInputPasswordToggleButtonSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputPassword/slot.toggle-button.custom.html'),
      )
    ).trim();
  }

  static async getInputPasswordMeterSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputPassword/slot.meter.default.html'),
      )
    ).trim();
  }

  static async getInputPasswordMeterSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputPassword/slot.meter.custom.html'),
      )
    ).trim();
  }

  static async getInputPasswordMeterLabelSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputPassword/slot.meter-label.default.html'),
      )
    ).trim();
  }

  static async getInputPasswordMeterLabelSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputPassword/slot.meter-label.custom.html'),
      )
    ).trim();
  }

  static async getInputPasswordConditionsNotMetSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputPassword/slot.conditions-not-met.default.html'),
      )
    ).trim();
  }

  static async getInputPasswordConditionsNotMetSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputPassword/slot.conditions-not-met.custom.html'),
      )
    ).trim();
  }

  static async getInputPasswordErrorsSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/InputPassword/slot.errors.custom.html'),
      )
    ).trim();
  }
}
