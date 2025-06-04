import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import type { TDialogProps } from '../../Dialog';
import { EDialogPropsDefault } from '../../types/Dialog.enums';

export class DialogSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly animationEl: string = '';
  public readonly overlayEl: string = '';
  public readonly containerEl: string = '';
  public readonly dialogEl: string = '';
  public readonly headerEl: string = '';
  public readonly contentEl: string = '';
  public readonly footerEl: string = '';
  public readonly themeModifier: string = '';
  public readonly primaryModifier: string = '';
  public readonly maximizedModifier: string = '';
  public readonly draggingModifier: string = '';
  public readonly contentScrollableModifier: string = '';
  public readonly shakeModifier: string = '';

  public visibleProp: TDialogProps['visible'] = true;
  public cssClassProp: TDialogProps['cssClass'] = 'newCssClass';
  public modifierProp: TDialogProps['modifier'] = 'primary';

  constructor(className: string = EDialogPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.animationEl = `.${className}__animation`;
    this.overlayEl = `.${className}__overlay`;
    this.containerEl = `.${className}__container`;
    this.dialogEl = `.${className}__dialog`;
    this.headerEl = `.${className}__header`;
    this.contentEl = `.${className}__content`;
    this.footerEl = `.${className}__footer`;
    this.themeModifier = `${className}--theme`;
    this.primaryModifier = `${className}--primary`;
    this.maximizedModifier = `${className}--maximized`;
    this.draggingModifier = `${className}--dragging`;
    this.contentScrollableModifier = `${className}--content-scrollable`;
    this.shakeModifier = `${className}--shake`;
  }

  public mockProps: TDialogProps = {
    visible: false,
    maximized: false,
    draggable: false,
    contentScrollable: false,
    persistent: false,
    noOverlayDismiss: false,
    noEscDismiss: false,
    shake: false,
    overlay: true,
    appendTo: EDialogPropsDefault.APPEND_TO,
    cssClass: EDialogPropsDefault.CSS_CLASS,
  };

  static async getDialogHeaderSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Dialog/slot.header.custom.html'))
    ).trim();
  }

  static async getDialogContentSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Dialog/slot.content.custom.html'))
    ).trim();
  }

  static async getDialogFooterSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Dialog/slot.footer.custom.html'))
    ).trim();
  }
}
