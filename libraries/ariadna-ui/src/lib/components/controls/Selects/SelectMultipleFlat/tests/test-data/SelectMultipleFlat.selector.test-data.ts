import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import { ESelectMultipleFlatPropsDefault } from '../../types/SelectMultipleFlat.enums';
import type { TSelectMultipleFlatProps } from '../../SelectMultipleFlat';

export class SelectMultipleFlatSelectorTestData extends DataSelector {
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

  public modelValueProp: TSelectMultipleFlatProps['modelValue'] = this.newOptionsExample();
  public filterValueProp: TSelectMultipleFlatProps['filterValue'] = 'filter';
  public labelProp: TSelectMultipleFlatProps['label'] = 'label value';
  public idProp: TSelectMultipleFlatProps['id'] = 'custom-id';
  public placeholderProp: TSelectMultipleFlatProps['placeholder'] = 'custom placeholder';
  public sizeProp: TSelectMultipleFlatProps['size'] = 'small';
  public cssClassProp: TSelectMultipleFlatProps['cssClass'] = 'newCssClass';
  public modifierProp: TSelectMultipleFlatProps['modifier'] = 'primary';
  public ariaLabelProp: TSelectMultipleFlatProps['ariaLabel'] = 'customAriaLabel';

  constructor(className: string = ESelectMultipleFlatPropsDefault.CSS_CLASS) {
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

  public mockProps: TSelectMultipleFlatProps = {
    modelValue: [],
    options: this.optionsExample(),
    size: ESelectMultipleFlatPropsDefault.SIZE,
    errors: [],
    cssClass: ESelectMultipleFlatPropsDefault.CSS_CLASS,
    ariaLabel: ESelectMultipleFlatPropsDefault.ARIA_LABEL,
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

  static async getSelectMultipleFlatLabelSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.label.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatLabelSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.label.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatOptionsSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.options.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatOptionsSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.options.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatEmptySlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.empty.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatEmptySlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.empty.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatTilesSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.tiles.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatTilesSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.tiles.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatMultiselectCheckboxSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(
          __dirname,
          'components/SelectMultipleFlat/slot.multiselect-checkbox.default.html',
        ),
      )
    ).trim();
  }

  static async getSelectMultipleFlatMultiselectCheckboxSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(
          __dirname,
          'components/SelectMultipleFlat/slot.multiselect-checkbox.custom.html',
        ),
      )
    ).trim();
  }

  static async getSelectMultipleFlatFilterInputSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.filter-input.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatFilterInputSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.filter-input.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatEmptyFilterSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.empty-filter.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatEmptyFilterSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.empty-filter.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatFilterIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.filter-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatFilterIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.filter-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatToggleIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.toggle-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatToggleIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.toggle-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatCleanIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.clean-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatCleanIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.clean-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatLoadingIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.loading-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatLoadingIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.loading-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatLoadingSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.loading.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatLoadingSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.loading.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatErrorsSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.errors.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleFlatErrorsSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleFlat/slot.errors.custom.html'),
      )
    ).trim();
  }
}
