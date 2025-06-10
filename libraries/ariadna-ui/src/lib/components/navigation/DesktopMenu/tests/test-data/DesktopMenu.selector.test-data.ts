import { DataSelector } from '@/shared/tests/DataSelector';
import * as path from 'path';
import { EDesktopMenuPropsDefault } from '../../types/DesktopMenu.enums';
import type { TDesktopMenuProps, TSharedMenu } from '../../DesktopMenu';

export class DesktopMenuSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly wrapperEl: string = '';
  public readonly containerEl: string = '';
  public readonly rubricatorEl: string = '';
  public readonly rubricatorItemEl: string = '';
  public readonly rubricatorItemActiveModifier: string = '';
  public readonly rubricatorTextEl: string = '';
  public readonly rubricatorIconBeforeEl: string = '';
  public readonly rubricatorIconAfterEl: string = '';
  public readonly menuEl: string = '';
  public readonly menuTitleEl: string = '';
  public readonly menuWrapperEl: string = '';
  public readonly menuItemsEl: string = '';
  public readonly menuSubtitleEl: string = '';
  public readonly submenuEl: string = '';
  public readonly submenuItemEl: string = '';
  public readonly submenuItemHiddenModifier: string = '';
  public readonly submenuMoreEl: string = '';
  public readonly loadingEl: string = '';
  public readonly errorEl: string = '';
  public readonly overlayEl: string = '';
  public readonly themeModifier: string = '';
  public readonly loadingModifier: string = '';
  public readonly invalidModifier: string = '';

  public cssClassProp: TDesktopMenuProps['cssClass'] = 'newCssClass';

  constructor(className: string = EDesktopMenuPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.wrapperEl = `.${className}__wrapper`;
    this.containerEl = `.${className}__container`;
    this.rubricatorEl = `.${className}__rubricator`;
    this.rubricatorItemEl = `.${className}__rubricator-item`;
    this.rubricatorItemActiveModifier = `${className}__rubricator-item--active`;
    this.rubricatorTextEl = `.${className}__rubricator-text`;
    this.rubricatorIconBeforeEl = `.${className}__rubricator-icon-before`;
    this.rubricatorIconAfterEl = `.${className}__rubricator-icon-after`;
    this.menuEl = `.${className}__menu`;
    this.menuTitleEl = `.${className}__menu-title`;
    this.menuWrapperEl = `.${className}__menu-wrapper`;
    this.menuItemsEl = `.${className}__menu-items`;
    this.menuSubtitleEl = `.${className}__menu-subtitle`;
    this.submenuEl = `.${className}__submenu`;
    this.submenuItemEl = `.${className}__submenu-item`;
    this.submenuItemHiddenModifier = `${className}__submenu-item--hidden`;
    this.submenuMoreEl = `.${className}__submenu-more`;
    this.loadingEl = `.${className}__loading`;
    this.errorEl = `.${className}__error`;
    this.overlayEl = `.${className}__overlay`;
    this.themeModifier = `${className}--theme`;
    this.loadingModifier = `${className}--loading`;
    this.invalidModifier = `${className}--invalid`;
  }

  public mockProps: TDesktopMenuProps = {
    data: [],
    expandMode: EDesktopMenuPropsDefault.EXPAND_MODE,
    visibleItems: 0,
    overlay: true,
    cssClass: EDesktopMenuPropsDefault.CSS_CLASS,
  };

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

  static async getDesktopMenuSlotRubricatorDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.rubricator.default.html'))
    ).trim();
  }

  static async getDesktopMenuSlotRubricatorCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.rubricator.custom.html'))
    ).trim();
  }

  static async getDesktopMenuSlotLoadingCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.loading.custom.html'))
    ).trim();
  }

  static async getDesktopMenuSlotErrorCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.error.custom.html'))
    ).trim();
  }
}
