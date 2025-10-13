import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import { EVirtualScrollerPropsDefault } from '../../types/VirtualScroller.enums';
import type { TVirtualScrollerProps } from '../../VirtualScroller';

export class VirtualScrollerSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly contentEl: string = '';
  public readonly itemEl: string = '';
  public readonly themeModifier: string = '';

  public itemHeightProp: TVirtualScrollerProps<any>['itemHeight'] = 42;
  public heightProp: TVirtualScrollerProps<any>['height'] = 500;
  public overscanProp: TVirtualScrollerProps<any>['overscan'] = 100;
  public cssClassProp: TVirtualScrollerProps<any>['cssClass'] = 'newCssClass';

  constructor(className: string = EVirtualScrollerPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.contentEl = `.${className}__content`;
    this.itemEl = `.${className}__item`;
    this.themeModifier = `${className}--theme`;
  }

  public mockProps: TVirtualScrollerProps<any> = {
    items: Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`),
    itemHeight: 42,
    height: EVirtualScrollerPropsDefault.HEIGHT as number,
    overscan: EVirtualScrollerPropsDefault.OVERSCAN as number,
    cssClass: EVirtualScrollerPropsDefault.CSS_CLASS as string,
  };

  static async getVirtualScrollerDefaultSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/VirtualScroller/slot.default.default.html'),
      )
    ).trim();
  }

  static async getVirtualScrollerDefaultSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/VirtualScroller/slot.default.custom.html'),
      )
    ).trim();
  }
}
