import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import { EPanelPropsDefault } from '../../types/Panel.enums';
import type { TPanelProps } from '../../Panel';

export class PanelSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly headerEl: string = '';
  public readonly iconsEl: string = '';
  public readonly expanderEl: string = '';
  public readonly innerEl: string = '';
  public readonly innerCollapseModifier: string = '';
  public readonly contentEl: string = '';
  public readonly footerEl: string = '';
  public readonly themeModifier: string = '';
  public readonly primaryModifier: string = '';
  public readonly hoveredModifier: string = '';
  public readonly collapsedModifier: string = '';

  public headerProp: TPanelProps['header'] = 'Header from prop';
  public cssClassProp: TPanelProps['cssClass'] = 'newCssClass';
  public modifierProp: TPanelProps['modifier'] = 'primary';

  constructor(className: string = EPanelPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.headerEl = `.${className}__header`;
    this.iconsEl = `.${className}__icons`;
    this.expanderEl = `.${className}__expander`;
    this.innerEl = `.${className}__inner`;
    this.innerCollapseModifier = `${className}__inner--collapse`;
    this.contentEl = `.${className}__content`;
    this.footerEl = `.${className}__footer`;
    this.themeModifier = `${className}--theme`;
    this.primaryModifier = `${className}--primary`;
    this.hoveredModifier = `${className}--hovered`;
    this.collapsedModifier = `${className}--collapsed`;
  }

  public mockProps: TPanelProps = {
    cssClass: EPanelPropsDefault.CSS_CLASS,
  };

  static async getPanelDefaultSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Panel/slot.default.custom.html'))
    ).trim();
  }

  static async getPanelHeaderSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Panel/slot.header.custom.html'))
    ).trim();
  }

  static async getPanelIconsSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Panel/slot.icons.custom.html'))
    ).trim();
  }

  static async getPanelToggleButtonSlotDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/Panel/slot.toggle-button.default.html'),
      )
    ).trim();
  }

  static async getPanelToggleButtonSlotCustom(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/Panel/slot.toggle-button.custom.html'),
      )
    ).trim();
  }

  static async getPanelToggleIconSlotDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Panel/slot.toggle-icon.default.html'))
    ).trim();
  }

  static async getPanelToggleIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Panel/slot.toggle-icon.custom.html'))
    ).trim();
  }

  static async getPanelFooterSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Panel/slot.footer.custom.html'))
    ).trim();
  }
}
