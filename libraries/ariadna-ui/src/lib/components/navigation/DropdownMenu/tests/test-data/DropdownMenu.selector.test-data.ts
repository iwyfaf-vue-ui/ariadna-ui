import { DataSelector } from '@/shared/tests/DataSelector';
import type { TDropdownMenuItem } from '../../types/DropdownMenu.types';
import { EDropdownMenuPropsDefault } from '../../types/DropdownMenu.enums';
import type { TDropdownMenuProps } from '../../DropdownMenu';

export class DropdownMenuSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';

  // Root modifiers
  public readonly themeModifier: string = '';
  public readonly openModifier: string = '';
  public readonly disabledModifier: string = '';

  // Activator
  public readonly activatorEl: string = '';

  // List
  public readonly listEl: string = '';
  public readonly listSubModifier: string = '';
  public readonly listLevelModifier: string = '';
  public readonly listVerticalBottomRightModifier: string = '';
  public readonly listVerticalBottomLeftModifier: string = '';
  public readonly listVerticalTopRightModifier: string = '';
  public readonly listVerticalTopLeftModifier: string = '';

  // Item
  public readonly itemEl: string = '';
  public readonly itemSeparatorModifier: string = '';
  public readonly itemDisabledModifier: string = '';
  public readonly itemHasChildrenModifier: string = '';
  public readonly itemSubOpenModifier: string = '';
  public readonly itemLevelModifier: string = '';

  // Link / category
  public readonly linkEl: string = '';
  public readonly categoryEl: string = '';

  // Label
  public readonly labelEl: string = '';

  // Icon
  public readonly iconEl: string = '';

  // Badge
  public readonly badgeEl: string = '';

  // Arrow
  public readonly arrowEl: string = '';
  public readonly arrowOpenModifier: string = '';

  // Separator
  public readonly separatorEl: string = '';

  public cssClassProp: TDropdownMenuProps['cssClass'] = 'new-dropdown-menu';

  constructor(className: string = EDropdownMenuPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;

    this.themeModifier = `${className}--theme`;
    this.openModifier = `${className}--open`;
    this.disabledModifier = `${className}--disabled`;

    this.activatorEl = `.${className}__activator`;

    this.listEl = `.${className}__list`;
    this.listSubModifier = `${className}__list--sub`;
    this.listLevelModifier = `${className}__list--level-`;
    this.listVerticalBottomRightModifier = `${className}__list--vertical-bottom-right`;
    this.listVerticalBottomLeftModifier = `${className}__list--vertical-bottom-left`;
    this.listVerticalTopRightModifier = `${className}__list--vertical-top-right`;
    this.listVerticalTopLeftModifier = `${className}__list--vertical-top-left`;

    this.itemEl = `.${className}__item`;
    this.itemSeparatorModifier = `${className}__item--separator`;
    this.itemDisabledModifier = `${className}__item--disabled`;
    this.itemHasChildrenModifier = `${className}__item--has-children`;
    this.itemSubOpenModifier = `${className}__item--sub-open`;
    this.itemLevelModifier = `${className}__item--level-`;

    this.linkEl = `.${className}__link`;
    this.categoryEl = `.${className}__category`;

    this.labelEl = `.${className}__label`;

    this.iconEl = `.${className}__icon`;

    this.badgeEl = `.${className}__badge`;

    this.arrowEl = `.${className}__arrow`;
    this.arrowOpenModifier = `${className}__arrow--open`;

    this.separatorEl = `.${className}__separator`;
  }

  public mockProps: TDropdownMenuProps = {
    data: [],
    expandMode: EDropdownMenuPropsDefault.EXPAND_MODE,
    closeOnClickOutside: true,
    closeOnEscape: true,
    disabled: false,
    cssClass: EDropdownMenuPropsDefault.CSS_CLASS,
  };

  public getListLevelModifier(level: number): string {
    return `${this.className}__list--level-${level}`;
  }

  public getItemLevelModifier(level: number): string {
    return `${this.className}__item--level-${level}`;
  }

  public dummyIconComponent() {
    return {
      template: '<span>Icon</span>',
    };
  }

  public dummyBadgeComponent() {
    return {
      template: '<span>Badge</span>',
    };
  }

  public item: TDropdownMenuItem = {
    label: 'Dashboard',
    icon: 'mdi-view-dashboard',
    badge: 'New',
    href: '/dashboard',
    disabled: false,
    hidden: false,
    children: [
      {
        label: 'Subitem',
        icon: 'mdi-subdirectory-arrow-right',
        badge: 1,
        href: '/dashboard/subitem',
        disabled: false,
        hidden: false,
        children: [],
      },
    ],
  };
}
