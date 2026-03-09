import { DataSelector } from '@/shared/tests/DataSelector';
import type { TToastProps } from '../../Toast';
import { EToastPropsDefault } from '../../types/Toast.enums';
import path from 'path';

export class ToastSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly messageEl: string = '';
  public readonly messageHeaderEl: string = '';
  public readonly messageIconEl: string = '';
  public readonly messageSummaryEl: string = '';
  public readonly messageAsideEl: string = '';
  public readonly messageCaptionEl: string = '';
  public readonly messageDetailEl: string = '';
  public readonly messageProgressEl: string = '';
  public readonly messageProgressBarEl: string = '';
  public readonly themeModifier: string = '';
  public readonly hoveredModifier: string = '';
  public readonly positionYTopModifier: string = '';
  public readonly positionYBottomModifier: string = '';
  public readonly positionYCenterModifier: string = '';
  public readonly positionXRightModifier: string = '';
  public readonly positionXLeftModifier: string = '';
  public readonly positionXCenterModifier: string = '';
  public readonly messageInfoModifier: string = '';
  public readonly messageWarningModifier: string = '';
  public readonly messageDangerModifier: string = '';
  public readonly messageSuccessModifier: string = '';

  public cssClassProp: TToastProps['cssClass'] = 'newCssClass';
  public positionYProp: TToastProps['positionY'] = 'bottom';
  public positionXProp: TToastProps['positionX'] = 'left';

  constructor(className: string = EToastPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.messageEl = `.${className}__message`;
    this.messageHeaderEl = `.${className}__message-header`;
    this.messageIconEl = `.${className}__message-icon`;
    this.messageSummaryEl = `.${className}__message-summary`;
    this.messageAsideEl = `.${className}__message-aside`;
    this.messageCaptionEl = `.${className}__message-caption`;
    this.messageDetailEl = `.${className}__message-detail`;
    this.messageProgressEl = `.${className}__message-progress`;
    this.messageProgressBarEl = `.${className}__message-progress-bar`;
    this.themeModifier = `${className}--theme`;
    this.hoveredModifier = `${className}--hovered`;
    this.positionYTopModifier = `${className}--y-top`;
    this.positionYBottomModifier = `${className}--y-bottom`;
    this.positionYCenterModifier = `${className}--y-center`;
    this.positionXRightModifier = `${className}--x-right`;
    this.positionXLeftModifier = `${className}--x-left`;
    this.positionXCenterModifier = `${className}--x-center`;
    this.messageInfoModifier = `${className}__message--info`;
    this.messageWarningModifier = `${className}__message--warning`;
    this.messageDangerModifier = `${className}__message--danger`;
    this.messageSuccessModifier = `${className}__message--success`;
  }

  public mockProps: TToastProps = {
    positionY: EToastPropsDefault.POSITION_Y,
    positionX: EToastPropsDefault.POSITION_X,
    group: EToastPropsDefault.GROUP,
    transition: EToastPropsDefault.TRANSITION,
    appendTo: EToastPropsDefault.APPEND_TO,
    cssClass: EToastPropsDefault.CSS_CLASS,
  };

  static async getToastDetailSlotDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Toast/slot.detail.default.html'))
    ).trim();
  }

  static async getToastDetailSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Toast/slot.detail.custom.html'))
    ).trim();
  }

  static async getToastMessageIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Toast/slot.message-icon.custom.html'))
    ).trim();
  }

  static async getToastSummarySlotDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Toast/slot.summary.default.html'))
    ).trim();
  }

  static async getToastSummarySlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Toast/slot.summary.custom.html'))
    ).trim();
  }

  static async getToastCaptionSlotDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Toast/slot.caption.default.html'))
    ).trim();
  }

  static async getToastCaptionSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Toast/slot.caption.custom.html'))
    ).trim();
  }

  static async getToastCloseIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Toast/slot.close-icon.custom.html'))
    ).trim();
  }

  static async getToastInfoIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Toast/slot.info-icon.custom.html'))
    ).trim();
  }

  static async getToastWarnIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Toast/slot.warn-icon.custom.html'))
    ).trim();
  }

  static async getToastDangerIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Toast/slot.danger-icon.custom.html'))
    ).trim();
  }

  static async getToastSuccessIconSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Toast/slot.success-icon.custom.html'))
    ).trim();
  }
}
