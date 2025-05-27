import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import type { TRatingProps } from '../../Rating';
import { ERatingPropsDefault } from '../../types/Rating.enums';

export class RatingSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly labelEl: string = '';
  public readonly groupEl: string = '';
  public readonly ratingEl: string = '';
  public readonly ratingMaskEl: string = '';
  public readonly ratingMaskActiveModifier: string = '';
  public readonly ratingMaskInactiveModifier: string = '';
  public readonly valueEl: string = '';
  public readonly valueContentEl: string = '';
  public readonly resetEl: string = '';
  public readonly errorsEl: string = '';
  public readonly errorsExpandEl: string = '';
  public readonly themeModifier: string = '';
  public readonly primaryModifier: string = '';
  public readonly sizeSmallModifier: string = '';
  public readonly sizeMediumModifier: string = '';
  public readonly sizeLargeModifier: string = '';
  public readonly focusedModifier: string = '';
  public readonly hoveredModifier: string = '';
  public readonly disabledModifier: string = '';
  public readonly readonlyModifier: string = '';
  public readonly validModifier: string = '';
  public readonly invalidModifier: string = '';

  public modelValueProp: TRatingProps['modelValue'] = 0.2;
  public labelProp: TRatingProps['label'] = 'label value';
  public idProp: TRatingProps['id'] = 'custom-id';
  public starCountProp: TRatingProps['starCount'] = 10;
  public fillStepProp: TRatingProps['fillStep'] = 0.5;
  public sizeProp: TRatingProps['size'] = 'small';
  public valuePositionProp: TRatingProps['valuePosition'] = 'right';
  public cssClassProp: TRatingProps['cssClass'] = 'newCssClass';
  public modifierProp: TRatingProps['modifier'] = 'primary';

  constructor(className: string = ERatingPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.labelEl = `.${className}__label`;
    this.groupEl = `.${className}__group`;
    this.ratingEl = `.${className}__rating`;
    this.ratingMaskEl = `.${className}__rating-mask`;
    this.ratingMaskActiveModifier = `${className}__rating-mask--active`;
    this.ratingMaskInactiveModifier = `${className}__rating-mask--inactive`;
    this.valueEl = `.${className}__value`;
    this.valueContentEl = `.${className}__value-content`;
    this.resetEl = `.${className}__reset`;
    this.errorsEl = `.${className}__errors`;
    this.errorsExpandEl = `.${className}__errors-expand`;
    this.themeModifier = `${className}--theme`;
    this.primaryModifier = `${className}--primary`;
    this.sizeSmallModifier = `${className}--small`;
    this.sizeMediumModifier = `${className}--medium`;
    this.sizeLargeModifier = `${className}--large`;
    this.focusedModifier = `${className}--focused`;
    this.hoveredModifier = `${className}--hovered`;
    this.disabledModifier = `${className}--disabled`;
    this.readonlyModifier = `${className}--readonly`;
    this.validModifier = `${className}--valid`;
    this.invalidModifier = `${className}--invalid`;
  }

  public mockProps: TRatingProps = {
    modelValue: 0,
    starCount: ERatingPropsDefault.STAR_COUNT as number,
    fillStep: ERatingPropsDefault.FILL_STEP as number,
    size: ERatingPropsDefault.SIZE,
    valuePosition: ERatingPropsDefault.VALUE_POSITION,
    errors: [],
    cssClass: ERatingPropsDefault.CSS_CLASS as string,
  };

  static async getRatingActiveSlotDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Rating/slot.active.default.html'))
    ).trim();
  }

  static async getRatingActiveSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Rating/slot.active.custom.html'))
    ).trim();
  }

  static async getRatingInactiveSlotDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Rating/slot.inactive.default.html'))
    ).trim();
  }

  static async getRatingInactiveSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Rating/slot.inactive.custom.html'))
    ).trim();
  }

  static async getRatingValueSlotDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Rating/slot.value.default.html'))
    ).trim();
  }

  static async getRatingValueSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Rating/slot.value.custom.html'))
    ).trim();
  }

  static async getRatingResetSlotDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Rating/slot.reset.default.html'))
    ).trim();
  }

  static async getRatingResetSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Rating/slot.reset.custom.html'))
    ).trim();
  }

  static async getRatingErrorsSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Rating/slot.errors.custom.html'))
    ).trim();
  }
}
