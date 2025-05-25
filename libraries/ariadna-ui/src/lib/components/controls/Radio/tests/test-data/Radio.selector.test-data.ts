import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import type { TRadioProps } from '../../Radio';
import { ERadioPropsDefault } from '../../types/Radio.enums';

export class RadioSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly labelEl: string = '';
  public readonly inputEl: string = '';
  public readonly inputHiddenEl: string = '';
  public readonly customEl: string = '';
  public readonly contentEl: string = '';
  public readonly themeModifier: string = '';
  public readonly positionRightModifier: string = '';
  public readonly positionLeftModifier: string = '';
  public readonly sizeSmallModifier: string = '';
  public readonly sizeMediumModifier: string = '';
  public readonly sizeLargeModifier: string = '';
  public readonly primaryModifier: string = '';
  public readonly focusedModifier: string = '';
  public readonly hoveredModifier: string = '';
  public readonly checkedModifier: string = '';
  public readonly disabledModifier: string = '';
  public readonly validModifier: string = '';
  public readonly invalidModifier: string = '';

  public modelValueProp: TRadioProps['modelValue'] = 'React';
  public idProp: TRadioProps['id'] = 'custom-id';
  public nameProp: TRadioProps['name'] = 'input name';
  public sizeProp: TRadioProps['size'] = 'large';
  public positionProp: TRadioProps['position'] = 'right';
  public cssClassProp: TRadioProps['cssClass'] = 'newCssClass';
  public modifierProp: TRadioProps['modifier'] = 'primary';

  constructor(className: string = ERadioPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.labelEl = `.${className}__label`;
    this.inputEl = `.${className}__input`;
    this.inputHiddenEl = `.${className}__input--hidden`;
    this.customEl = `.${className}__custom`;
    this.contentEl = `.${className}__content`;
    this.themeModifier = `${className}--theme`;
    this.positionRightModifier = `${className}--right`;
    this.positionLeftModifier = `${className}--left`;
    this.sizeSmallModifier = `${className}--small`;
    this.sizeMediumModifier = `${className}--medium`;
    this.sizeLargeModifier = `${className}--large`;
    this.primaryModifier = `${className}--primary`;
    this.focusedModifier = `${className}--focused`;
    this.hoveredModifier = `${className}--hovered`;
    this.checkedModifier = `${className}--checked`;
    this.disabledModifier = `${className}--disabled`;
    this.validModifier = `${className}--valid`;
    this.invalidModifier = `${className}--invalid`;
  }

  public mockProps: TRadioProps = {
    modelValue: 'Vue',
    value: 'Vue',
    cssClass: ERadioPropsDefault.CSS_CLASS,
  };

  public newVModel() {
    return 'React';
  }

  static async getRadioDefaultSlotDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Radio/slot.default.default.html'))
    ).trim();
  }

  static async getRadioDefaultSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Radio/slot.default.custom.html'))
    ).trim();
  }

  static async getRadioCustomSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Radio/slot.custom.custom.html'))
    ).trim();
  }
}
