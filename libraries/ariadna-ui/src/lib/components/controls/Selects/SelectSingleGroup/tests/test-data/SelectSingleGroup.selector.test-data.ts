import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import { ESelectSingleGroupPropsDefault } from '../../types/SelectSingleGroup.enums';
import type { TSelectSingleGroupProps } from '../../SelectSingleGroup';

export class SelectSingleGroupSelectorTestData extends DataSelector {
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
  public readonly optionsGroupEl: string = '';
  public readonly optionsGroupLabelEl: string = '';
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

  public modelValueProp: TSelectSingleGroupProps['modelValue'] = 'abc';
  public filterValueProp: TSelectSingleGroupProps['filterValue'] = 'filter';
  public labelProp: TSelectSingleGroupProps['label'] = 'label value';
  public idProp: TSelectSingleGroupProps['id'] = 'custom-id';
  public placeholderProp: TSelectSingleGroupProps['placeholder'] = 'custom placeholder';
  public filterProp: TSelectSingleGroupProps['filter'] = { filterLabel: [[{ field: 'label' }]] };
  public sizeProp: TSelectSingleGroupProps['size'] = 'small';
  public cssClassProp: TSelectSingleGroupProps['cssClass'] = 'newCssClass';
  public modifierProp: TSelectSingleGroupProps['modifier'] = 'primary';
  public ariaLabelProp: TSelectSingleGroupProps['ariaLabel'] = 'customAriaLabel';

  constructor(className: string = ESelectSingleGroupPropsDefault.CSS_CLASS) {
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
    this.optionsGroupEl = `.${className}__options-group`;
    this.optionsGroupLabelEl = `.${className}__options-group-label`;
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

  public mockProps: TSelectSingleGroupProps = {
    modelValue: null,
    options: this.optionsExample(),
    optionLabel: ESelectSingleGroupPropsDefault.OPTION_LABEL,
    optionValue: null,
    optionGroupLabel: ESelectSingleGroupPropsDefault.OPTION_GROUP_LABEL,
    optionGroupChildren: ESelectSingleGroupPropsDefault.OPTION_GROUP_CHILDREN,
    size: ESelectSingleGroupPropsDefault.SIZE,
    errors: [],
    cssClass: ESelectSingleGroupPropsDefault.CSS_CLASS,
    ariaLabel: ESelectSingleGroupPropsDefault.ARIA_LABEL,
  };

  public optionsExample() {
    return [
      {
        label: 'Group 1',
        children: [
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
        ],
      },
      {
        label: 'Group 2',
        children: [
          { label: 'Option 3', value: 3 },
          { label: 'Option 4', value: 4 },
        ],
      },
    ];
  }

  public newOptionsExample() {
    return [
      {
        label: 'New group 1',
        children: [
          { label: 'New option 1', value: 1 },
          { label: 'New option 2', value: 2 },
        ],
      },
      {
        label: 'New group 2',
        children: [
          { label: 'New option 3', value: 3 },
          { label: 'New option 4', value: 4 },
        ],
      },
    ];
  }

  public customOptionsLabel() {
    return [
      {
        label: 'New group 1',
        children: [
          { optionLabel: 'New option 1', value: 1 },
          { optionLabel: 'New option 2', value: 2 },
        ],
      },
      {
        label: 'New group 2',
        children: [
          { optionLabel: 'New option 3', value: 3 },
          { optionLabel: 'New option 4', value: 4 },
        ],
      },
    ];
  }

  public customOptionsValue() {
    return [
      {
        label: 'New group 1',
        children: [
          { label: 'New option 1', optionValue: 1 },
          { label: 'New option 2', optionValue: 2 },
        ],
      },
      {
        label: 'New group 2',
        children: [
          { label: 'New option 3', optionValue: 3 },
          { label: 'New option 4', optionValue: 4 },
        ],
      },
    ];
  }

  public customOptionsGroupLabel() {
    return [
      {
        groupLabel: 'New group 1',
        children: [
          { label: 'New option 1', value: 1 },
          { label: 'New option 2', value: 2 },
        ],
      },
      {
        groupLabel: 'New group 2',
        children: [
          { label: 'New option 3', value: 3 },
          { label: 'New option 4', value: 4 },
        ],
      },
    ];
  }

  public customOptionsGroupChildren() {
    return [
      {
        label: 'New group 1',
        items: [
          { label: 'New option 1', value: 1 },
          { label: 'New option 2', value: 2 },
        ],
      },
      {
        label: 'New group 2',
        items: [
          { label: 'New option 3', value: 3 },
          { label: 'New option 4', value: 4 },
        ],
      },
    ];
  }

  public errorsExample() {
    return ['Field is required', 'Field must be amazing!'];
  }

  static async getSelectSingleGroupOptionsGroupSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.options-group.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupOptionsGroupSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.options-group.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupOptionsSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.options.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupOptionsSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.options.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupEmptySlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.empty.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupEmptySlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.empty.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupFilterInputSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.filter-input.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupFilterInputSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.filter-input.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupEmptyFilterSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.empty-filter.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupEmptyFilterSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.empty-filter.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupFilterIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.filter-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupFilterIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.filter-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupToggleIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.toggle-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupToggleIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.toggle-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupCleanIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.clean-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupCleanIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.clean-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupLoadingIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.loading-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupLoadingIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.loading-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupLoadingSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.loading.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupLoadingSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.loading.custom.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupErrorsSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.errors.default.html'),
      )
    ).trim();
  }

  static async getSelectSingleGroupErrorsSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectSingleGroup/slot.errors.custom.html'),
      )
    ).trim();
  }
}
