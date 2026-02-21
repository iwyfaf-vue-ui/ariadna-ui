import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import { ESelectSingleFlatPropsDefault } from '../../types/SelectSingleFlat.enums';
import type { TSelectSingleFlatProps } from '../../SelectSingleFlat';

export class SelectSingleFlatSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly groupEl: string = '';
  public readonly labelEl: string = '';
  public readonly headerEl: string = '';
  public readonly headerGroupEl: string = '';
  public readonly textEl: string = '';
  public readonly inputEl: string = '';
  public readonly placeholderEl: string = '';
  public readonly selectedTextEl: string = '';
  public readonly animationEl: string = '';
  public readonly loadingEl: string = '';
  public readonly loadingIconEl: string = '';
  public readonly toggleIconEl: string = '';
  public readonly toggleIconOpenedModifier: string = '';
  public readonly cleanIconEl: string = '';
  public readonly bodyEl: string = '';
  public readonly bodyOpenedModifier: string = '';
  public readonly filterEl: string = '';
  public readonly filterInputEl: string = '';
  public readonly filterIconEl: string = '';
  public readonly listEl: string = '';
  public readonly emptyOptionsEl: string = '';
  public readonly emptyFilterEl: string = '';
  public readonly listLoadingEl: string = '';
  public readonly listLoadingIconEl: string = '';
  public readonly optionsEl: string = '';
  public readonly optionEl: string = '';
  public readonly optionSelectedModifier: string = '';
  public readonly optionFocusedModifier: string = '';
  public readonly virtualScrollerEl: string = '';
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
  public readonly openedModifier: string = '';
  public readonly disabledModifier: string = '';
  public readonly validModifier: string = '';
  public readonly invalidModifier: string = '';

  public modelValueProp: TSelectSingleFlatProps['modelValue'] = 'abc';
  public filterValueProp: TSelectSingleFlatProps['filterValue'] = 'filter';
  public labelProp: TSelectSingleFlatProps['label'] = 'label value';
  public idProp: TSelectSingleFlatProps['id'] = 'custom-id';
  public placeholderProp: TSelectSingleFlatProps['placeholder'] = 'custom placeholder';
  public sizeProp: TSelectSingleFlatProps['size'] = 'small';
  public cssClassProp: TSelectSingleFlatProps['cssClass'] = 'newCssClass';
  public modifierProp: TSelectSingleFlatProps['modifier'] = 'primary';
  public ariaLabelProp: TSelectSingleFlatProps['ariaLabel'] = 'customAriaLabel';

  constructor(className: string = ESelectSingleFlatPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.groupEl = `.${className}__group`;
    this.labelEl = `.${className}__label`;
    this.headerEl = `.${className}__header`;
    this.headerGroupEl = `.${className}__header-group`;
    this.textEl = `.${className}__text`;
    this.inputEl = `.${className}__input`;
    this.placeholderEl = `.${className}__placeholder`;
    this.selectedTextEl = `.${className}__selected-text`;
    this.animationEl = `.${className}__animation`;
    this.loadingEl = `.${className}__loading`;
    this.loadingIconEl = `.${className}__loading-icon`;
    this.toggleIconEl = `.${className}__toggle-icon`;
    this.toggleIconOpenedModifier = `${className}__toggle-icon--opened`;
    this.cleanIconEl = `.${className}__clean-icon`;
    this.bodyEl = `.${className}__body`;
    this.bodyOpenedModifier = `${className}__body--opened`;
    this.filterEl = `.${className}__filter`;
    this.filterInputEl = `.${className}__filter-input`;
    this.filterIconEl = `.${className}__filter-icon`;
    this.listEl = `.${className}__list`;
    this.emptyOptionsEl = `.${className}__empty-options`;
    this.emptyFilterEl = `.${className}__empty-filter`;
    this.listLoadingEl = `.${className}__list-loading`;
    this.listLoadingIconEl = `.${className}__list-loading-icon`;
    this.optionsEl = `.${className}__options`;
    this.optionEl = `.${className}__option`;
    this.optionSelectedModifier = `${className}__option--selected`;
    this.optionFocusedModifier = `${className}__option--focused`;
    this.virtualScrollerEl = `.${className}-virtual-scroller`;
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
    this.openedModifier = `${className}--opened`;
    this.disabledModifier = `${className}--disabled`;
    this.validModifier = `${className}--valid`;
    this.invalidModifier = `${className}--invalid`;
  }

  public mockProps: TSelectSingleFlatProps = {
    modelValue: null,
    options: this.optionsExample(),
    size: ESelectSingleFlatPropsDefault.SIZE,
    errors: [],
    cssClass: ESelectSingleFlatPropsDefault.CSS_CLASS,
    ariaLabel: ESelectSingleFlatPropsDefault.ARIA_LABEL,
  };

  public optionsExample() {
    return ['Option 1', 'Option 2', 'Option 3'];
  }

  public newOptionsExample() {
    return ['New Option 1', 'New Option 2', 'New Option 3'];
  }

  public errorsExample() {
    return ['Field is required', 'Field must be amazing!'];
  }

  static async getSelectSingleFlatOptionsSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.options.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatOptionsSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.options.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatEmptySlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.empty.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatEmptySlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.empty.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatFilterInputSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.filter-input.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatFilterInputSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.filter-input.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatEmptyFilterSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.empty-filter.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatEmptyFilterSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.empty-filter.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatFilterIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.filter-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatFilterIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.filter-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatToggleIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.toggle-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatToggleIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.toggle-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatCleanIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.clean-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatCleanIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.clean-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatLoadingIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.loading-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatLoadingIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.loading-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatLoadingSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.loading.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatLoadingSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.loading.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatErrorsSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.errors.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleFlatErrorsSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleFlat/slot.errors.custom.html'),
      )
    ).trim();
  }
}
