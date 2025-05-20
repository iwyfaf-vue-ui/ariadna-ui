import { DataSelector } from '@/shared/tests/DataSelector';
import * as path from 'path';
import { EPreviewerPropsDefault } from '../../types/Previewer.enums';
import type { TPreviewerProps } from '../../Previewer';
import { markRaw } from 'vue';

export class PreviewerSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly headerEl: string = '';
  public readonly descriptionEl: string = '';
  public readonly componentEl: string = '';
  public readonly actionEl: string = '';
  public readonly actionToggleEl: string = '';
  public readonly actionCopyEl: string = '';
  public readonly codeEl: string = '';
  public readonly codeExpandEl: string = '';
  public readonly primaryModifier: string = '';
  public readonly themeModifier: string = '';

  public componentSourceProp: TPreviewerProps['componentSource'] =
    '<span class="dummy">Test</span>';
  public cssClassProp: TPreviewerProps['cssClass'] = 'newCssClass';
  public modifierProp: TPreviewerProps['modifier'] = 'primary';

  constructor(className: string = EPreviewerPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.headerEl = `.${className}__header`;
    this.descriptionEl = `.${className}__description`;
    this.componentEl = `.${className}__component`;
    this.actionEl = `.${className}__action`;
    this.actionToggleEl = `.${className}__action-toggle`;
    this.actionCopyEl = `.${className}__action-copy`;
    this.codeEl = `.${className}__code`;
    this.codeExpandEl = `.${className}__code-expand`;
    this.primaryModifier = `${className}--primary`;
    this.themeModifier = `${className}--theme`;
  }

  public mockProps: TPreviewerProps = {
    component: {},
    componentSource: '<div></div>',
    cssClass: EPreviewerPropsDefault.CSS_CLASS,
  };

  public dummyComponent() {
    return markRaw({
      template: '<span class="dummy">Test</span>',
    });
  }

  static async getPreviewerSlotHeaderCustom(): Promise<string> {
    return await this.readFile(
      path.resolve(__dirname, 'components/slot.header.custom.html').trim(),
    );
  }

  static async getPreviewerSlotDescriptionCustom(): Promise<string> {
    return await this.readFile(
      path.resolve(__dirname, 'components/slot.description.custom.html').trim(),
    );
  }

  static async getPreviewerSlotShowCodeToggleDefault(): Promise<string> {
    return await this.readFile(
      path.resolve(__dirname, 'components/slot.show-code-toggle.default.html').trim(),
    );
  }

  static async getPreviewerSlotShowCodeToggleCustom(): Promise<string> {
    return await this.readFile(
      path.resolve(__dirname, 'components/slot.show-code-toggle.custom.html').trim(),
    );
  }

  static async getPreviewerSlotCopyDefault(): Promise<string> {
    return await this.readFile(path.resolve(__dirname, 'components/slot.copy.default.html').trim());
  }

  static async getPreviewerSlotCopyCustom(): Promise<string> {
    return await this.readFile(path.resolve(__dirname, 'components/slot.copy.custom.html').trim());
  }

  static async getPreviewerSlotSourceCustom(): Promise<string> {
    return await this.readFile(
      path.resolve(__dirname, 'components/slot.source.custom.html').trim(),
    );
  }
}
