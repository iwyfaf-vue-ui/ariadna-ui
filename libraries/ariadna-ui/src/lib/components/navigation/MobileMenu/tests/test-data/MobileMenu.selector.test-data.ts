import { DataSelector } from '@/shared/tests/DataSelector';
import * as path from 'path';
import { EMobileMenuPropsDefault } from '../../types/MobileMenu.enums';
import type { TMobileMenuProps, TSharedMenu } from '../../MobileMenu';
import type { TMobileMenuItem } from '../../types/MobileMenu.types';

export class MobileMenuSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly overlayEl: string = '';
  public readonly navbarEl: string = '';
  public readonly navbarItemEl: string = '';
  public readonly navbarItemActiveModifier: string = '';
  public readonly navbarItemIconEl: string = '';
  public readonly navbarItemLabelEl: string = '';
  public readonly menuEl: string = '';
  public readonly menuResizeModifier: string = '';
  public readonly pageEl: string = '';
  public readonly pageLoadingEl: string = '';
  public readonly pageTitleEl: string = '';
  public readonly pageItemEl: string = '';
  public readonly itemLabelEl: string = '';
  public readonly itemBeforeIconEl: string = '';
  public readonly itemAfterIconEl: string = '';
  public readonly headerEl: string = '';
  public readonly headerBackEl: string = '';
  public readonly headerBackVisibleModifier: string = '';
  public readonly openedModifier: string = '';
  public readonly themeModifier: string = '';

  public cssClassProp: TMobileMenuProps['cssClass'] = 'newCssClass';
  public ariaLabelProp: TMobileMenuProps['ariaLabel'] = 'Mobile Menu';

  constructor(className: string = EMobileMenuPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.overlayEl = `.${className}__overlay`;
    this.navbarEl = `.${className}__navbar`;
    this.navbarItemEl = `.${className}__navbar-item`;
    this.navbarItemActiveModifier = `.${className}__navbar-item--active`;
    this.navbarItemIconEl = `.${className}__navbar-item-icon`;
    this.navbarItemLabelEl = `.${className}__navbar-item-label`;
    this.menuEl = `.${className}__menu`;
    this.menuResizeModifier = `${className}__menu--resize`;
    this.pageEl = `.${className}__page`;
    this.pageLoadingEl = `.${className}__page-loading`;
    this.pageTitleEl = `.${className}__page-title`;
    this.pageItemEl = `.${className}__page-item`;
    this.itemLabelEl = `.${className}__item-label`;
    this.itemBeforeIconEl = `.${className}__item-before-icon`;
    this.itemAfterIconEl = `.${className}__item-after-icon`;
    this.headerEl = `.${className}__header`;
    this.headerBackEl = `.${className}__header-back`;
    this.headerBackVisibleModifier = `${className}__header-back--visible`;
    this.openedModifier = `${className}--opened`;
    this.themeModifier = `${className}--theme`;
  }

  public mockProps: TMobileMenuProps = {
    menu: [],
    animationTime: 300,
    cssClass: EMobileMenuPropsDefault.CSS_CLASS,
  };

  public menus: Array<TMobileMenuItem> = [
    {
      label: 'Menu 1',
      key: 'menu-1',
      items: [],
      loading: false,
    },
    {
      label: 'Menu 2',
      key: 'menu-2',
      items: [],
      loading: false,
    },
  ];

  public data: Array<TSharedMenu> = [
    {
      name: 'Theme',
      attributes: {
        url: null,
      },
      icon: {
        before: null,
        after: null,
      },
      children: [
        {
          name: 'Тема',
          attributes: {
            url: '/themes/',
          },
          icon: {
            before: null,
            after: null,
          },
          children: [
            {
              name: 'Палитры',
              attributes: {
                url: '/themes/palettes',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Шрифты',
              attributes: {
                url: '/themes/fonts',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Отступы',
              attributes: {
                url: '/themes/indents',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Радиусы',
              attributes: {
                url: '/themes/radii',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Переходы',
              attributes: {
                url: '/themes/transitions',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
          ],
        },
        {
          name: 'Тема',
          attributes: {
            url: '/themes/',
          },
          icon: {
            before: null,
            after: null,
          },
          children: [
            {
              name: 'Палитры',
              attributes: {
                url: '/themes/palettes',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Шрифты',
              attributes: {
                url: '/themes/fonts',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Отступы',
              attributes: {
                url: '/themes/indents',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Радиусы',
              attributes: {
                url: '/themes/radii',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Переходы',
              attributes: {
                url: '/themes/transitions',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
          ],
        },
        {
          name: 'Тема',
          attributes: {
            url: '/themes/',
          },
          icon: {
            before: null,
            after: null,
          },
          children: [
            {
              name: 'Палитры',
              attributes: {
                url: '/themes/palettes',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Шрифты',
              attributes: {
                url: '/themes/fonts',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Отступы',
              attributes: {
                url: '/themes/indents',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Радиусы',
              attributes: {
                url: '/themes/radii',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Переходы',
              attributes: {
                url: '/themes/transitions',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: 'Components',
      attributes: {
        url: null,
      },
      icon: {
        before: null,
        after: null,
      },
      children: [
        {
          name: 'Indicators',
          attributes: {
            url: '/components/indicators',
          },
          icon: {
            before: null,
            after: null,
          },
          children: [
            {
              name: 'Badge',
              attributes: {
                url: '/components/indicators/badge',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Spinner',
              attributes: {
                url: '/components/indicators/spinner',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
          ],
        },
        {
          name: 'Buttons',
          attributes: {
            url: '/components/buttons',
          },
          icon: {
            before: null,
            after: null,
          },
          children: [
            {
              name: 'Button',
              attributes: {
                url: '/components/buttons/button',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
          ],
        },
        {
          name: 'Controls',
          attributes: {
            url: '/components/controls',
          },
          icon: {
            before: null,
            after: null,
          },
          children: [
            {
              name: 'InputText',
              attributes: {
                url: '/components/controls/input-text',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Textarea',
              attributes: {
                url: '/components/controls/textarea',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Checkbox',
              attributes: {
                url: '/components/controls/checkbox',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Radio',
              attributes: {
                url: '/components/controls/radio',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Rating',
              attributes: {
                url: '/components/controls/rating',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
          ],
        },
        {
          name: 'Data',
          attributes: {
            url: '/components/data',
          },
          icon: {
            before: null,
            after: null,
          },
          children: [
            {
              name: 'Timeline',
              attributes: {
                url: '/components/data/timeline',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
          ],
        },
        {
          name: 'Navigation',
          attributes: {
            url: '/components/navigation',
          },
          icon: {
            before: null,
            after: null,
          },
          children: [
            {
              name: 'DesktopMenu',
              attributes: {
                url: '/components/navigation/desktop-menu',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'SidebarMenu',
              attributes: {
                url: '/components/navigation/sidebar-menu',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
          ],
        },
        {
          name: 'Panels',
          attributes: {
            url: '/components/panels',
          },
          icon: {
            before: null,
            after: null,
          },
          children: [
            {
              name: 'Accordion',
              attributes: {
                url: '/components/panels/accordion',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Card',
              attributes: {
                url: '/components/panels/card',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Tabs',
              attributes: {
                url: '/components/panels/tabs',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
          ],
        },
        {
          name: 'Overlays',
          attributes: {
            url: '/components/overlays',
          },
          icon: {
            before: null,
            after: null,
          },
          children: [
            {
              name: 'Dialog',
              attributes: {
                url: '/components/overlays/dialog',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
            {
              name: 'Dropbox',
              attributes: {
                url: '/components/overlays/dropbox',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
          ],
        },
        {
          name: 'Misc',
          attributes: {
            url: '/components/misc',
          },
          icon: {
            before: null,
            after: null,
          },
          children: [
            {
              name: 'Previewer',
              attributes: {
                url: '/components/misc/previewer',
              },
              icon: {
                before: null,
                after: null,
              },
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: 'Empty',
      attributes: {
        url: '/',
      },
      icon: {
        before: null,
        after: null,
      },
      children: [],
    },
  ];

  static async getMobileMenuSlotNavbarItemDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.navbar-item.default.html'))
    ).trim();
  }

  static async getMobileMenuSlotNavbarItemCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.navbar-item.custom.html'))
    ).trim();
  }

  static async getMobileMenuSlotAllContentDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.all-content.default.html'))
    ).trim();
  }

  static async getMobileMenuSlotAllContentCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.all-content.custom.html'))
    ).trim();
  }
}
