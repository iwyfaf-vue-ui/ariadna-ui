import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import type { TDropboxProps } from '../../Dropbox';
import { EDropboxPropsDefault } from '../../types/Dropbox.enums';

export class DropboxSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly activatorEl: string = '';
  public readonly contentEl: string = '';
  public readonly contentHeaderEl: string = '';
  public readonly contentMainEl: string = '';
  public readonly contentVerticalBottomCenterModifier: string = '';
  public readonly themeModifier: string = '';
  public readonly primaryModifier: string = '';
  public readonly openedModifier: string = '';

  public modelValueProp: TDropboxProps['modelValue'] = true;
  public cssClassProp: TDropboxProps['cssClass'] = 'newCssClass';
  public modifierProp: TDropboxProps['modifier'] = 'primary';

  constructor(className: string = EDropboxPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.activatorEl = `.${className}__activator`;
    this.contentEl = `.${className}__content`;
    this.contentHeaderEl = `.${className}__content-header`;
    this.contentMainEl = `.${className}__content-main`;
    this.contentVerticalBottomCenterModifier = `${className}__content--vertical-bottom-center`;
    this.themeModifier = `${className}--theme`;
    this.primaryModifier = `${className}--primary`;
    this.openedModifier = `${className}--opened`;
  }

  public mockProps: TDropboxProps = {
    modelValue: false,
    disableAutoPosition: false,
    closeOnClickOutside: false,
    closeOnEscape: true,
    cssClass: EDropboxPropsDefault.CSS_CLASS,
  };

  static async getDropboxDefaultSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Dropbox/slot.default.custom.html'))
    ).trim();
  }

  static async getDropboxActivatorSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Dropbox/slot.activator.custom.html'))
    ).trim();
  }

  static async getDropboxHeaderSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Dropbox/slot.header.custom.html'))
    ).trim();
  }
}
