import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import type { TCardProps } from '../../Card';
import { ECardPropsDefault } from '../../types/Card.enums';

export class CardSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly bodyEl: string = '';
  public readonly pictureEl: string = '';
  public readonly contentEl: string = '';
  public readonly contentHeaderEl: string = '';
  public readonly contentTextEl: string = '';
  public readonly contentTextCollapseModifier: string = '';
  public readonly contentTextCollapsedModifier: string = '';
  public readonly contentFooterEl: string = '';
  public readonly footerEl: string = '';
  public readonly themeModifier: string = '';
  public readonly primaryModifier: string = '';

  public tagProp: TCardProps['tag'] = 'article';
  public cssClassProp: TCardProps['cssClass'] = 'newCssClass';
  public modifierProp: TCardProps['modifier'] = 'primary';

  constructor(className: string = ECardPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.bodyEl = `.${className}__body`;
    this.pictureEl = `.${className}__picture`;
    this.contentEl = `.${className}__content`;
    this.contentHeaderEl = `.${className}__content-header`;
    this.contentTextEl = `.${className}__content-text`;
    this.contentTextCollapseModifier = `${className}__content-text--collapse`;
    this.contentTextCollapsedModifier = `${className}__content-text--collapsed`;
    this.contentFooterEl = `.${className}__content-footer`;
    this.footerEl = `.${className}__footer`;
    this.themeModifier = `${className}--theme`;
    this.primaryModifier = `${className}--primary`;
  }

  public mockProps: TCardProps = {
    cssClass: ECardPropsDefault.CSS_CLASS,
  };

  static async getCardPictureSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Card/slot.picture.custom.html'))
    ).trim();
  }

  static async getCardContentHeaderSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/Card/slot.content-header.custom.html'),
      )
    ).trim();
  }

  static async getCardContentSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Card/slot.content.custom.html'))
    ).trim();
  }

  static async getCardContentFooterSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/Card/slot.content-footer.custom.html'),
      )
    ).trim();
  }

  static async getCardFooterSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Card/slot.footer.custom.html'))
    ).trim();
  }
}
