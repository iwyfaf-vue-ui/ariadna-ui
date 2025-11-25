import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import { ESelectMultiplePropsDefault } from '../../types/SelectMultiple.enums';
import type { TSelectMultipleProps } from '../../SelectMultiple';

export class SelectMultipleSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly groupEl: string = '';
  public readonly labelEl: string = '';
  public readonly headerEl: string = '';
  public readonly headerGroupEl: string = '';
  public readonly textEl: string = '';
  public readonly inputEl: string = '';
  public readonly textSelectedEl: string = '';
  public readonly placeholderEl: string = '';
  public readonly selectedLabelEl: string = '';
  public readonly tileEl: string = '';
  public readonly animationEl: string = '';
  public readonly loadingEl: string = '';
  public readonly loadingIconEl: string = '';
  public readonly toggleIconEl: string = '';
  public readonly toggleIconOpenedModifier: string = '';
  public readonly cleanIconEl: string = '';
  public readonly bodyEl: string = '';
  public readonly bodyOpenedModifier: string = '';
  public readonly filterEl: string = '';
  public readonly filterCheckboxEl: string = '';
  public readonly filterInputEl: string = '';
  public readonly filterIconEl: string = '';
  public readonly listEl: string = '';
  public readonly emptyOptionsEl: string = '';
  public readonly emptyFilterEl: string = '';
  public readonly listLoadingEl: string = '';
  public readonly listLoadingIconEl: string = '';
  public readonly optionsEl: string = '';
  public readonly optionEl: string = '';
  public readonly virtualScrollerEl: string = '';
  public readonly optionSelectedModifier: string = '';
  public readonly optionFocusedModifier: string = '';
  public readonly optionCheckboxEl: string = '';
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

  public modelValueProp: TSelectMultipleProps['modelValue'] = this.newOptionsExample();
  public filterValueProp: TSelectMultipleProps['filterValue'] = 'filter';
  public labelProp: TSelectMultipleProps['label'] = 'label value';
  public idProp: TSelectMultipleProps['id'] = 'custom-id';
  public placeholderProp: TSelectMultipleProps['placeholder'] = 'custom placeholder';
  public filterProp: TSelectMultipleProps['filter'] = { filterLabel: [[{ field: 'label' }]] };
  public sizeProp: TSelectMultipleProps['size'] = 'small';
  public cssClassProp: TSelectMultipleProps['cssClass'] = 'newCssClass';
  public modifierProp: TSelectMultipleProps['modifier'] = 'primary';
  public ariaLabelProp: TSelectMultipleProps['ariaLabel'] = 'customAriaLabel';

  constructor(className: string = ESelectMultiplePropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.groupEl = `.${className}__group`;
    this.labelEl = `.${className}__label`;
    this.headerEl = `.${className}__header`;
    this.headerGroupEl = `.${className}__header-group`;
    this.textEl = `.${className}__text`;
    this.inputEl = `.${className}__input`;
    this.textSelectedEl = `.${className}__text-selected`;
    this.placeholderEl = `.${className}__placeholder`;
    this.selectedLabelEl = `.${className}__selected-label`;
    this.tileEl = `.${className}__tile`;
    this.animationEl = `.${className}__animation`;
    this.loadingEl = `.${className}__loading`;
    this.loadingIconEl = `.${className}__loading-icon`;
    this.toggleIconEl = `.${className}__toggle-icon`;
    this.toggleIconOpenedModifier = `${className}__toggle-icon--opened`;
    this.cleanIconEl = `.${className}__clean-icon`;
    this.bodyEl = `.${className}__body`;
    this.bodyOpenedModifier = `${className}__body--opened`;
    this.filterEl = `.${className}__filter`;
    this.filterCheckboxEl = `.${className}__filter-checkbox`;
    this.filterInputEl = `.${className}__filter-input`;
    this.filterIconEl = `.${className}__filter-icon`;
    this.listEl = `.${className}__list`;
    this.emptyOptionsEl = `.${className}__empty-options`;
    this.emptyFilterEl = `.${className}__empty-filter`;
    this.listLoadingEl = `.${className}__list-loading`;
    this.listLoadingIconEl = `.${className}__list-loading-icon`;
    this.optionsEl = `.${className}__options`;
    this.optionEl = `.${className}__option`;
    this.virtualScrollerEl = `.${className}-virtual-scroller`;
    this.optionSelectedModifier = `${className}__option--selected`;
    this.optionFocusedModifier = `${className}__option--focused`;
    this.optionCheckboxEl = `.${className}__option-checkbox`;
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

  public mockProps: TSelectMultipleProps = {
    modelValue: [],
    options: this.optionsExample(),
    optionLabel: ESelectMultiplePropsDefault.OPTION_LABEL,
    optionValue: null,
    size: ESelectMultiplePropsDefault.SIZE,
    errors: [],
    cssClass: ESelectMultiplePropsDefault.CSS_CLASS,
    ariaLabel: ESelectMultiplePropsDefault.ARIA_LABEL,
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

  static async getSelectMultipleLabelSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.label.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleLabelSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.label.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleOptionsSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.options.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleOptionsSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.options.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleEmptySlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.empty.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleEmptySlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.empty.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleTilesSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.tiles.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleTilesSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.tiles.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleMultiselectCheckboxSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.multiselect-checkbox.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleMultiselectCheckboxSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.multiselect-checkbox.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFilterInputSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.filter-input.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFilterInputSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.filter-input.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleEmptyFilterSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.empty-filter.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleEmptyFilterSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.empty-filter.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFilterIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.filter-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFilterIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.filter-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleToggleIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.toggle-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleToggleIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.toggle-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleCleanIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.clean-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleCleanIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.clean-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleLoadingIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.loading-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleLoadingIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.loading-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleLoadingSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.loading.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleLoadingSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.loading.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleErrorsSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.errors.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleErrorsSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultiple/slot.errors.custom.html'),
      )
    ).trim();
  }
}
