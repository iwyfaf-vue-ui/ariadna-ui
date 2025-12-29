import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import { EChipsPropsDefault } from '../../types/Chips.enums';
import type { TChipsProps } from '../../Chips';

export class ChipsSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly groupEl: string = '';
  public readonly labelEl: string = '';
  public readonly listEl: string = '';
  public readonly itemEl: string = '';
  public readonly itemFocusedModifier: string = '';
  public readonly itemRemoveEl: string = '';
  public readonly itemClearEl: string = '';
  public readonly inputEl: string = '';
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
  public readonly selectedModifier: string = '';
  public readonly disabledModifier: string = '';
  public readonly validModifier: string = '';
  public readonly invalidModifier: string = '';

  public modelValueProp: TChipsProps['modelValue'] = ['Vue', 'React', 'Angular'];
  public labelProp: TChipsProps['label'] = 'label value';
  public idProp: TChipsProps['id'] = 'custom-id';
  public placeholderProp: TChipsProps['placeholder'] = 'custom placeholder';
  public sizeProp: TChipsProps['size'] = 'small';
  public cssClassProp: TChipsProps['cssClass'] = 'newCssClass';
  public modifierProp: TChipsProps['modifier'] = 'primary';

  constructor(className: string = EChipsPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.groupEl = `.${className}__group`;
    this.labelEl = `.${className}__label`;
    this.listEl = `.${className}__list`;
    this.itemEl = `.${className}__item`;
    this.itemFocusedModifier = `${className}__item--focused`;
    this.itemRemoveEl = `.${className}__item-remove`;
    this.itemClearEl = `.${className}__item-clear`;
    this.inputEl = `.${className}__input`;
    this.errorsEl = `.${className}__errors`;
    this.errorsExpandEl = `.${className}__errors-expand`;
    this.themeModifier = `${className}--theme`;
    this.primaryModifier = `${className}--primary`;
    this.sizeSmallModifier = `${className}--small`;
    this.sizeMediumModifier = `${className}--medium`;
    this.sizeLargeModifier = `${className}--large`;
    this.focusedModifier = `${className}--focused`;
    this.hoveredModifier = `${className}--hovered`;
    this.selectedModifier = `${className}--selected`;
    this.disabledModifier = `${className}--disabled`;
    this.validModifier = `${className}--valid`;
    this.invalidModifier = `${className}--invalid`;
  }

  public mockProps: TChipsProps = {
    modelValue: [],
    size: EChipsPropsDefault.SIZE,
    cssClass: EChipsPropsDefault.CSS_CLASS,
    errors: [],
  };

  public errorsExample() {
    return ['Field is required', 'Field must be amazing!'];
  }

  static async getChipsChipSlotDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Chips/slot.chip.default.html'))
    ).trim();
  }

  static async getChipsChipSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Chips/slot.chip.custom.html'))
    ).trim();
  }

  static async getChipsRemoveSlotDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Chips/slot.remove.default.html'))
    ).trim();
  }

  static async getChipsRemoveSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Chips/slot.remove.custom.html'))
    ).trim();
  }

  static async getChipsClearSlotDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Chips/slot.clear.default.html'))
    ).trim();
  }

  static async getChipsClearSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Chips/slot.clear.custom.html'))
    ).trim();
  }

  static async getChipsInputSlotDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Chips/slot.input.default.html'))
    ).trim();
  }

  static async getChipsInputSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Chips/slot.input.custom.html'))
    ).trim();
  }

  static async getChipsErrorsSlotDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Chips/slot.errors.default.html'))
    ).trim();
  }

  static async getChipsErrorsSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Chips/slot.errors.custom.html'))
    ).trim();
  }
}
