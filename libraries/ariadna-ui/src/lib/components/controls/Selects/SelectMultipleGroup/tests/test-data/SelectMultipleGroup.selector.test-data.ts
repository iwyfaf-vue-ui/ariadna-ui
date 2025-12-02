import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import { ESelectMultipleGroupPropsDefault } from '../../types/SelectMultipleGroup.enums';
import type { TSelectMultipleGroupProps } from '../../SelectMultipleGroup';

export class SelectMultipleGroupSelectorTestData extends DataSelector {
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

  public modelValueProp: TSelectMultipleGroupProps['modelValue'] = this.newOptionsExample();
  public filterValueProp: TSelectMultipleGroupProps['filterValue'] = 'filter';
  public labelProp: TSelectMultipleGroupProps['label'] = 'label value';
  public idProp: TSelectMultipleGroupProps['id'] = 'custom-id';
  public placeholderProp: TSelectMultipleGroupProps['placeholder'] = 'custom placeholder';
  public filterProp: TSelectMultipleGroupProps['filter'] = {
    filterLabel: [[{ field: 'label' }]],
  };
  public sizeProp: TSelectMultipleGroupProps['size'] = 'small';
  public cssClassProp: TSelectMultipleGroupProps['cssClass'] = 'newCssClass';
  public modifierProp: TSelectMultipleGroupProps['modifier'] = 'primary';
  public ariaLabelProp: TSelectMultipleGroupProps['ariaLabel'] = 'customAriaLabel';

  constructor(className: string = ESelectMultipleGroupPropsDefault.CSS_CLASS) {
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

  public mockProps: TSelectMultipleGroupProps = {
    modelValue: [],
    options: this.optionsExample(),
    optionLabel: ESelectMultipleGroupPropsDefault.OPTION_LABEL,
    optionValue: null,
    optionGroupLabel: ESelectMultipleGroupPropsDefault.OPTION_GROUP_LABEL,
    optionGroupChildren: ESelectMultipleGroupPropsDefault.OPTION_GROUP_CHILDREN,
    size: ESelectMultipleGroupPropsDefault.SIZE,
    errors: [],
    cssClass: ESelectMultipleGroupPropsDefault.CSS_CLASS,
    ariaLabel: ESelectMultipleGroupPropsDefault.ARIA_LABEL,
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

  static async getSelectMultipleGroupLabelSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.label.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupLabelSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.label.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupOptionsGroupSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.options-group.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupOptionsGroupSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.options-group.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupOptionsSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.options.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupOptionsSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.options.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupEmptySlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.empty.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupEmptySlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.empty.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupTilesSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.tiles.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupTilesSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.tiles.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupMultiselectCheckboxSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(
          __dirname,
          'components/SelectMultipleGroup/slot.multiselect-checkbox.default.html',
        ),
      )
    ).trim();
  }

  static async getSelectMultipleGroupMultiselectCheckboxSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(
          __dirname,
          'components/SelectMultipleGroup/slot.multiselect-checkbox.custom.html',
        ),
      )
    ).trim();
  }

  static async getSelectMultipleGroupFilterInputSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.filter-input.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupFilterInputSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.filter-input.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupEmptyFilterSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.empty-filter.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupEmptyFilterSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.empty-filter.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupFilterIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.filter-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupFilterIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.filter-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupToggleIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.toggle-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupToggleIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.toggle-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupCleanIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.clean-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupCleanIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.clean-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupLoadingIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.loading-icon.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupLoadingIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.loading-icon.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupLoadingSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.loading.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupLoadingSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.loading.custom.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupErrorsSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.errors.default.html'),
      )
    ).trim();
  }

  static async getSelectMultipleGroupErrorsSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SelectMultipleGroup/slot.errors.custom.html'),
      )
    ).trim();
  }
}
