import { DataSelector } from '@/shared/tests/DataSelector';
import type { TSidebarMenuItem, TSidebarMenuProps } from '../../SidebarMenu';
import { ESidebarMenuPropsDefault } from '../../types/SidebarMenu.enums';
import * as path from 'path';

export class SidebarMenuSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly wrapperEl: string = '';
  public readonly headerEl: string = '';
  public readonly itemsEl: string = '';
  public readonly itemsSubEl: string = '';
  public readonly footerEl: string = '';
  public readonly collapsedModifier: string = '';
  public readonly themeModifier: string = '';

  public readonly scrollEl: string = '';
  public readonly scrollAreaEl: string = '';
  public readonly scrollAnimationEl: string = '';
  public readonly scrollBarEl: string = '';
  public readonly scrollThumbEl: string = '';
  public readonly scrollDraggableModifier: string = '';

  public readonly itemEl: string = '';
  public readonly itemHoverModifier: string = '';
  public readonly itemOpenModifier: string = '';
  public readonly itemDisabledModifier: string = '';
  public readonly itemLevelModifier: string = '';
  public readonly itemSubEl: string = '';
  public readonly itemWrapperEl: string = '';
  public readonly itemDropdownEl: string = '';
  public readonly itemDropdownOpenModifier: string = '';
  public readonly itemTitleEl: string = '';
  public readonly itemExpandEl: string = '';

  public readonly linkEl: string = '';
  public readonly linkTextualEl: string = '';
  public readonly linkWeblinkEl: string = '';
  public readonly linkActiveModifier: string = '';

  public readonly iconEl: string = '';

  public readonly badgeEl: string = '';

  public readonly actionEl: string = '';

  public cssClassProp: TSidebarMenuProps['cssClass'] = 'newCssClass';

  constructor(className: string = ESidebarMenuPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.wrapperEl = `.${className}__wrapper`;
    this.headerEl = `.${className}__header`;
    this.itemsEl = `.${className}__items`;
    this.itemsSubEl = `.${className}__items-sub`;
    this.footerEl = `.${className}__footer`;
    this.collapsedModifier = `${className}--collapsed`;
    this.themeModifier = `${className}--theme`;

    this.scrollEl = `.${className}__scroll`;
    this.scrollAreaEl = `.${className}__scroll-area`;
    this.scrollAnimationEl = `.${className}__scroll-animation`;
    this.scrollBarEl = `.${className}__scroll-bar`;
    this.scrollThumbEl = `.${className}__scroll-thumb`;
    this.scrollDraggableModifier = `.${className}__scroll--draggable`;

    this.itemEl = `.${className}__item`;
    this.itemHoverModifier = `.${className}__item--hover`;
    this.itemOpenModifier = `.${className}__item--open`;
    this.itemDisabledModifier = `.${className}__item--disabled`;
    this.itemLevelModifier = `.${className}__item--level-`;
    this.itemSubEl = `.${className}__item-sub`;
    this.itemWrapperEl = `.${className}__item-wrapper`;
    this.itemDropdownEl = `.${className}__item-dropdown`;
    this.itemDropdownOpenModifier = `.${className}__item-dropdown--open`;
    this.itemTitleEl = `.${className}__item-title`;
    this.itemExpandEl = `.${className}__item-expand`;

    this.linkEl = `.${className}__link`;
    this.linkTextualEl = `.${className}__link-textual`;
    this.linkWeblinkEl = `.${className}__link-weblink`;
    this.linkActiveModifier = `.${className}__link--active`;

    this.iconEl = `.${className}__icon`;

    this.badgeEl = `.${className}__badge`;

    this.actionEl = `.${className}__action`;
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

  public item: TSidebarMenuItem = {
    title: 'Dashboard',
    icon: 'mdi-view-dashboard',
    badge: 'New',
    href: '/dashboard',
    native: false,
    hidden: false,
    expand: false,
    disabled: false,
    action: () => {
      console.log('Dashboard clicked');
    },
    actionIcon: 'mdi-pencil',
    children: [
      {
        title: 'Subitem',
        icon: 'mdi-subdirectory-arrow-right',
        badge: 1,
        href: '/dashboard/subitem',
        native: true,
        hidden: false,
        expand: false,
        disabled: false,
        action: () => {
          console.log('Subitem clicked');
        },
        actionIcon: 'mdi-pencil-outline',
        children: [],
      },
    ],
  };

  static async getSidebarMenuItemLinkSlotDefaultCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SidebarMenuItemLink/slot.default.custom.html'),
      )
    ).trim();
  }

  static async getSidebarMenuScrollSlotDefaultCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SidebarMenuScroll/slot.default.custom.html'),
      )
    ).trim();
  }

  static async getSidebarMenuItemSlotDropdownIconCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SidebarMenuItem/slot.dropdown-icon.custom.html'),
      )
    ).trim();
  }

  static async getSidebarMenuItemSlotActionIconCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SidebarMenuItem/slot.action-icon.custom.html'),
      )
    ).trim();
  }

  static async getSidebarMenuSlotHeaderCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/SidebarMenu/slot.header.custom.html'))
    ).trim();
  }

  static async getSidebarMenuSlotFooterCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/SidebarMenu/slot.footer.custom.html'))
    ).trim();
  }

  static async getSidebarMenuSlotDropdownIconCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SidebarMenu/slot.dropdown-icon.custom.html'),
      )
    ).trim();
  }

  static async getSidebarMenuSlotActionIconCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/SidebarMenu/slot.action-icon.custom.html'),
      )
    ).trim();
  }
}
