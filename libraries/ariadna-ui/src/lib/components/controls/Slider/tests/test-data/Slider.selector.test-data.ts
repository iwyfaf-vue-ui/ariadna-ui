import { DataSelector } from '@/shared/tests/DataSelector';
import * as path from 'path';
import { ESliderPropsDefault } from '../../types/Slider.enums';
import type { TSliderProps } from '../../Slider';

export class SliderSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly groupEl: string = '';
  public readonly labelEl: string = '';
  public readonly pointsEl: string = '';
  public readonly pointEl: string = '';
  public readonly pointFirstModifier: string = '';
  public readonly pointLastModifier: string = '';
  public readonly pointValueEl: string = '';
  public readonly trackEl: string = '';
  public readonly trackAdditionalEl: string = '';
  public readonly trackAdditionalLeftModifier: string = '';
  public readonly trackAdditionalRightModifier: string = '';
  public readonly trackAdditionalVisibleModifier: string = '';
  public readonly trackAdditionalLabelEl: string = '';
  public readonly trackAdditionalThumbEl: string = '';
  public readonly trackAdditionalThumbDragModifier: string = '';
  public readonly trackAdditionalThumbLeftModifier: string = '';
  public readonly trackAdditionalThumbRightModifier: string = '';
  public readonly errorsEl: string = '';
  public readonly themeModifier: string = '';
  public readonly primaryModifier: string = '';
  public readonly pointsModifier: string = '';
  public readonly focusedModifier: string = '';
  public readonly hoveredModifier: string = '';
  public readonly disabledModifier: string = '';
  public readonly validModifier: string = '';
  public readonly invalidModifier: string = '';

  public labelProp: TSliderProps['label'] = 'label value';
  public idProp: TSliderProps['id'] = 'custom-id';
  public pointsProp: TSliderProps['points'] = [0, 25, 50, 75, 100];
  public cssClassProp: TSliderProps['cssClass'] = 'newCssClass';
  public modifierProp: TSliderProps['modifier'] = 'primary';

  constructor(className: string = ESliderPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.groupEl = `.${className}__group`;
    this.labelEl = `.${className}__label`;
    this.pointsEl = `.${className}__points`;
    this.pointEl = `.${className}__point`;
    this.pointFirstModifier = `${className}__point--first`;
    this.pointLastModifier = `${className}__point--last`;
    this.pointValueEl = `.${className}__point-value`;
    this.trackEl = `.${className}__track`;
    this.trackAdditionalEl = `.${className}__track-additional`;
    this.trackAdditionalLeftModifier = `${className}__track-additional--left`;
    this.trackAdditionalRightModifier = `${className}__track-additional--right`;
    this.trackAdditionalVisibleModifier = `${className}__track-additional--visible`;
    this.trackAdditionalLabelEl = `.${className}__track-additional-label`;
    this.trackAdditionalThumbEl = `.${className}__track-additional-thumb`;
    this.trackAdditionalThumbDragModifier = `.${className}__track-additional-thumb--drag`;
    this.trackAdditionalThumbLeftModifier = `.${className}__track-additional-thumb--left`;
    this.trackAdditionalThumbRightModifier = `.${className}__track-additional-thumb--right`;
    this.errorsEl = `.${className}__errors`;
    this.themeModifier = `${className}--theme`;
    this.primaryModifier = `${className}--primary`;
    this.pointsModifier = `${className}--points`;
    this.focusedModifier = `${className}--focused`;
    this.hoveredModifier = `${className}--hovered`;
    this.disabledModifier = `${className}--disabled`;
    this.validModifier = `${className}--valid`;
    this.invalidModifier = `${className}--invalid`;
  }

  public mockProps: TSliderProps = {
    modelValue: [],
    tracks: [{ key: 'track', thumb: true, label: true, zIndex: 1 }],
    min: ESliderPropsDefault.MIN as number,
    max: ESliderPropsDefault.MAX as number,
    step: null,
    points: null,
    errors: [],
    cssClass: ESliderPropsDefault.CSS_CLASS as string,
  };

  static async getSliderSlotPointDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.point.default.html'))
    ).trim();
  }

  static async getSliderSlotPointCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.point.custom.html'))
    ).trim();
  }

  static async getSliderErrorsSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.errors.custom.html'))
    ).trim();
  }
}
