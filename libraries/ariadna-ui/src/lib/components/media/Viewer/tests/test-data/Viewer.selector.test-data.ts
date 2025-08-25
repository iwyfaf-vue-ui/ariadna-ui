import { DataSelector } from '@/shared/tests/DataSelector';
import * as path from 'path';
import type { TViewerProps } from '../../Viewer';
import { EViewerMedia, EViewerPropsDefault } from '../../types/Viewer.enums';

export class ViewerSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly galleryEl: string = '';
  public readonly galleryLabelEl: string = '';
  public readonly galleryItemEl: string = '';
  public readonly galleryItemSelectedModifier: string = '';
  public readonly contentEl: string = '';
  public readonly emptyEl: string = '';
  public readonly contentZoomModifier: string = '';
  public readonly controlsEl: string = '';
  public readonly controlsCloseEl: string = '';
  public readonly controlsNextEl: string = '';
  public readonly controlsNextDisabledModifier: string = '';
  public readonly controlsPrevEl: string = '';
  public readonly controlsPrevDisabledModifier: string = '';
  public readonly controlsZoomEl: string = '';
  public readonly sliderEl: string = '';
  public readonly sliderNoTransitionModifier: string = '';
  public readonly sliderIsCalculatingModifier: string = '';
  public readonly sliderItemEl: string = '';
  public readonly sliderItemDraggingModifier: string = '';
  public readonly sliderItemCalculatingModifier: string = '';
  public readonly sliderItemImageEl: string = '';
  public readonly sliderItemVideoEl: string = '';
  public readonly sliderItemNestedEl: string = '';
  public readonly activeModifier: string = '';
  public readonly primaryModifier: string = '';
  public readonly themeModifier: string = '';

  public cssClassProp: TViewerProps['cssClass'] = 'newCssClass';

  constructor(className: string = EViewerPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.galleryEl = `.${className}__gallery`;
    this.galleryLabelEl = `.${className}__gallery-label`;
    this.galleryItemEl = `.${className}__gallery-item`;
    this.galleryItemSelectedModifier = `${className}__gallery-item--selected`;
    this.contentEl = `.${className}__content`;
    this.emptyEl = `.${className}__empty`;
    this.contentZoomModifier = `${className}__content--zoom`;
    this.controlsEl = `.${className}__controls`;
    this.controlsCloseEl = `.${className}__controls-close`;
    this.controlsNextEl = `.${className}__controls-next`;
    this.controlsNextDisabledModifier = `${className}__controls-next--disabled`;
    this.controlsPrevEl = `.${className}__controls-prev`;
    this.controlsPrevDisabledModifier = `${className}__controls-prev--disabled`;
    this.controlsZoomEl = `.${className}__controls-zoom`;
    this.sliderEl = `.${className}__slider`;
    this.sliderNoTransitionModifier = `${className}__slider--no-transition`;
    this.sliderIsCalculatingModifier = `${className}__slider--is-calculating`;
    this.sliderItemEl = `.${className}__slider-item`;
    this.sliderItemDraggingModifier = `${className}__slider-item--dragging`;
    this.sliderItemCalculatingModifier = `${className}__slider-item-calculating`;
    this.sliderItemImageEl = `.${className}__slider-item-image`;
    this.sliderItemVideoEl = `.${className}__slider-item-video`;
    this.sliderItemNestedEl = `.${className}__slider-item-nested`;
    this.activeModifier = `${className}--active`;
    this.primaryModifier = `${className}--primary`;
    this.themeModifier = `${className}--theme`;
  }

  public mockProps: TViewerProps = {
    moveSlowFactor: EViewerPropsDefault.MOVE_SLOW_FACTOR as number,
    resizeCalculationMs: EViewerPropsDefault.RESIZE_CALCULATION_MS as number,
    swipeVerge: EViewerPropsDefault.SWIPE_VERGE as number,
    zoomStep: EViewerPropsDefault.ZOOM_STEP as number,
    zoomMax: EViewerPropsDefault.ZOOM_MAX as number,
    queue: [EViewerMedia.VIDEO, EViewerMedia.IMAGE],
    appendTo: EViewerPropsDefault.APPEND_TO as string,
    cssClass: EViewerPropsDefault.CSS_CLASS as string,
  };

  static async getViewerSlotEmptyCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.empty.custom.html'))
    ).trim();
  }

  static async getViewerSlotEmptyDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.empty.default.html'))
    ).trim();
  }

  static async getViewerSlotCloseIconDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.close-icon.default.html'))
    ).trim();
  }

  static async getViewerSlotCloseIconCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.close-icon.custom.html'))
    ).trim();
  }

  static async getViewerSlotPrevIconDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.prev-icon.default.html'))
    ).trim();
  }

  static async getViewerSlotPrevIconCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.prev-icon.custom.html'))
    ).trim();
  }

  static async getViewerSlotNextIconDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.next-icon.default.html'))
    ).trim();
  }

  static async getViewerSlotNextIconCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.next-icon.custom.html'))
    ).trim();
  }

  static async getViewerSlotZoomInfoDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.zoom-info.default.html'))
    ).trim();
  }

  static async getViewerSlotZoomInfoCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.zoom-info.custom.html'))
    ).trim();
  }

  static async getViewerSlotGalleryVideoItemDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/slot.gallery-video-item.default.html'),
      )
    ).trim();
  }
}
