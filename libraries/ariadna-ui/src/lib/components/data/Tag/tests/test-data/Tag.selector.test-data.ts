import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import { ETagPropsDefault } from '../../types/Tag.enums';
import type { TTagProps } from '../../Tag';

export class TagSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly iconEl: string = '';
  public readonly labelEl: string = '';
  public readonly themeModifier: string = '';
  public readonly primaryModifier: string = '';
  public readonly sizeSmallModifier: string = '';
  public readonly sizeMediumModifier: string = '';
  public readonly sizeLargeModifier: string = '';
  public readonly roundedModifier: string = '';

  public sizeProp: TTagProps['size'] = 'small';
  public cssClassProp: TTagProps['cssClass'] = 'newCssClass';
  public modifierProp: TTagProps['modifier'] = 'primary';

  constructor(className: string = ETagPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.iconEl = `.${className}__icon`;
    this.labelEl = `.${className}__label`;
    this.themeModifier = `${className}--theme`;
    this.primaryModifier = `${className}--primary`;
    this.sizeSmallModifier = `${className}--small`;
    this.sizeMediumModifier = `${className}--medium`;
    this.sizeLargeModifier = `${className}--large`;
    this.roundedModifier = `${className}--rounded`;
  }

  public mockProps: TTagProps = {
    tag: ETagPropsDefault.TAG,
    size: ETagPropsDefault.SIZE,
    cssClass: ETagPropsDefault.CSS_CLASS,
  };

  static async getTagDefaultSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Tag/slot.default.custom.html'))
    ).trim();
  }

  static async getTagIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Tag/slot.icon.custom.html'))
    ).trim();
  }
}
