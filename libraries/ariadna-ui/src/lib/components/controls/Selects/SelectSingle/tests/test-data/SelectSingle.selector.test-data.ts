import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import { ESelectSinglePropsDefault } from '../../types/SelectSingle.enums';
import type { TSelectSingleProps } from '../../SelectSingle';

export class SelectSingleSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly groupEl: string = '';
  public readonly labelEl: string = '';
  public readonly headerEl: string = '';
  public readonly headerGroupEl: string = '';
  public readonly textEl: string = '';
  public readonly inputEl: string = '';
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

  public modelValueProp: TSelectSingleProps['modelValue'] = 'abc';
  public filterValueProp: TSelectSingleProps['filterValue'] = 'filter';
  public labelProp: TSelectSingleProps['label'] = 'label value';
  public idProp: TSelectSingleProps['id'] = 'custom-id';
  public placeholderProp: TSelectSingleProps['placeholder'] = 'custom placeholder';
  public filterProp: TSelectSingleProps['filter'] = { filterLabel: [[{ field: 'label' }]] };
  public sizeProp: TSelectSingleProps['size'] = 'small';
  public cssClassProp: TSelectSingleProps['cssClass'] = 'newCssClass';
  public modifierProp: TSelectSingleProps['modifier'] = 'primary';
  public ariaLabelProp: TSelectSingleProps['ariaLabel'] = 'customAriaLabel';

  constructor(className: string = ESelectSinglePropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.groupEl = `.${className}__group`;
    this.labelEl = `.${className}__label`;
    this.headerEl = `.${className}__header`;
    this.headerGroupEl = `.${className}__header-group`;
    this.textEl = `.${className}__text`;
    this.inputEl = `.${className}__input`;
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

  public mockProps: TSelectSingleProps = {
    modelValue: null,
    options: this.optionsExample(),
    optionLabel: ESelectSinglePropsDefault.OPTION_LABEL,
    optionValue: null,
    size: ESelectSinglePropsDefault.SIZE,
    errors: [],
    cssClass: ESelectSinglePropsDefault.CSS_CLASS,
    ariaLabel: ESelectSinglePropsDefault.ARIA_LABEL,
  };

  public optionsExample() {
    return [
      {
        label: 'Option 1',
        value: 1,
      },
      {
        label: 'Option 2',
        value: 2,
      },
      {
        label: 'Option 3',
        value: 3,
      },
    ];
  }

  public newOptionsExample() {
    return [
      {
        label: 'New Option 1',
        value: 'Value 1',
      },
      {
        label: 'New Option 2',
        value: 'Value 2',
      },
      {
        label: 'New Option 3',
        value: 'Value 3',
      },
    ];
  }

  public errorsExample() {
    return ['Field is required', 'Field must be amazing!'];
  }

  static async getSelectSingleOptionsSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.options.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleOptionsSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.options.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleEmptySlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.empty.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleEmptySlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/SelectSingle/slot.empty.custom.html'))
    ).trim();
  }

  static async getSelectSingleFilterInputSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.filter-input.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleFilterInputSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.filter-input.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleEmptyFilterSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.empty-filter.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleEmptyFilterSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.empty-filter.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleFilterIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.filter-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleFilterIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.filter-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleToggleIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.toggle-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleToggleIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.toggle-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleCleanIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.clean-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleCleanIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.clean-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleLoadingIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.loading-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleLoadingIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.loading-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleLoadingSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.loading.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleLoadingSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.loading.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleErrorsSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.errors.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleErrorsSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingle/slot.errors.custom.html'),
      )
    ).trim();
  }
}
