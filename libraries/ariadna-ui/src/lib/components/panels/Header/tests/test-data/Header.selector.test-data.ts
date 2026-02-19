import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import { EHeaderPropsDefault } from '../../types/Header.enums';
import type { THeaderProps } from '../../Header';

export class HeaderSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly headEl: string = '';
  public readonly headLogoEl: string = '';
  public readonly headTitleEl: string = '';
  public readonly headSubtitleEl: string = '';
  public readonly contentEl: string = '';
  public readonly rightEl: string = '';
  public readonly themeModifier: string = '';
  public readonly primaryModifier: string = '';
  public readonly hoveredModifier: string = '';
  public readonly scrolledModifier: string = '';

  public tagProp: THeaderProps['tag'] = 'div';
  public scrollThresholdProp: THeaderProps['scrollThreshold'] = 100;
  public cssClassProp: THeaderProps['cssClass'] = 'newCssClass';
  public modifierProp: THeaderProps['modifier'] = 'primary';

  constructor(className: string = EHeaderPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.headEl = `.${className}__head`;
    this.headLogoEl = `.${className}__head-logo`;
    this.headTitleEl = `.${className}__head-title`;
    this.headSubtitleEl = `.${className}__head-subtitle`;
    this.contentEl = `.${className}__content`;
    this.rightEl = `.${className}__right`;
    this.themeModifier = `${className}--theme`;
    this.primaryModifier = `${className}--primary`;
    this.hoveredModifier = `${className}--hovered`;
    this.scrolledModifier = `${className}--scrolled`;
  }

  public mockProps: THeaderProps = {
    tag: EHeaderPropsDefault.TAG,
    cssClass: EHeaderPropsDefault.CSS_CLASS,
  };

  static async getHeaderLogoSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Header/slot.logo.custom.html'))
    ).trim();
  }

  static async getHeaderTitleSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Header/slot.title.custom.html'))
    ).trim();
  }

  static async getHeaderSubtitleSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Header/slot.subtitle.custom.html'))
    ).trim();
  }

  static async getHeaderDefaultSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Header/slot.default.custom.html'))
    ).trim();
  }

  static async getHeaderRightSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Header/slot.right.custom.html'))
    ).trim();
  }
}
