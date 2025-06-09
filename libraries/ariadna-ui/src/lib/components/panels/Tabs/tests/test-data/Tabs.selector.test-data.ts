import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import type { TTabsProps } from '../../Tabs';
import { ETabsPropsDefault } from '../../types/Tabs.enums';
import type { TTabItem } from '../../types/Tabs.types';

export class TabsSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly headerEl: string = '';
  public readonly headerBoxEl: string = '';
  public readonly tabEl: string = '';
  public readonly tabActiveModifier: string = '';
  public readonly contentEl: string = '';
  public readonly contentActiveModifier: string = '';
  public readonly themeModifier: string = '';
  public readonly primaryModifier: string = '';

  public cssClassProp: TTabsProps['cssClass'] = 'newCssClass';
  public modifierProp: TTabsProps['modifier'] = 'primary';

  constructor(className: string = ETabsPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.headerEl = `.${className}__header`;
    this.headerBoxEl = `.${className}__header-box`;
    this.tabEl = `.${className}__tab`;
    this.tabActiveModifier = `${className}__tab--active`;
    this.contentEl = `.${className}__content`;
    this.contentActiveModifier = `${className}__content--active`;
    this.themeModifier = `${className}--theme`;
    this.primaryModifier = `${className}--primary`;
  }

  public mockProps: TTabsProps = {
    tabs: [],
    openedByDefault: 0,
    titleKey: ETabsPropsDefault.TITLE_KEY,
    cssClass: ETabsPropsDefault.CSS_CLASS,
  };

  public tabs: Array<TTabItem> = [
    { title: 'Tab 1', content: 'Content 1' },
    { title: 'Tab 2', content: 'Content 2' },
    { title: 'Tab 3', content: 'Content 3' },
  ];

  static async getDialogHeaderSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Dialog/slot.header.custom.html'))
    ).trim();
  }
}
