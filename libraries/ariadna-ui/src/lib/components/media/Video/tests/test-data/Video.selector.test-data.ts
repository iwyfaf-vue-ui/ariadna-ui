import { DataSelector } from '@/shared/tests/DataSelector';
import * as path from 'path';
import { EVideoPropsDefault } from '../../types/Video.enums';
import type { TVideoProps } from '../../Video';

export class VideoSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly videoEl: string = '';
  public readonly loadingEl: string = '';
  public readonly controlsEl: string = '';
  public readonly controlsVisibleModifier: string = '';
  public readonly controlsGroupEl: string = '';
  public readonly controlsActionEl: string = '';
  public readonly controlsVolumeModifier: string = '';
  public readonly controlsActionModifier: string = '';
  public readonly controlsActionPlayEl: string = '';
  public readonly controlsActionStopEl: string = '';
  public readonly controlsFullscreenEl: string = '';
  public readonly controlsFullscreenIconEl: string = '';
  public readonly controlsUnFullscreenIconEl: string = '';
  public readonly controlsFullscreenModifier: string = '';
  public readonly controlsVolumeEl: string = '';
  public readonly controlsVolumeIconEl: string = '';
  public readonly controlsVolumeSliderEl: string = '';
  public readonly timeEl: string = '';
  public readonly timelineEl: string = '';
  public readonly timelineModifier: string = '';
  public readonly timelineTimePopupEl: string = '';
  public readonly timelineTimePopupVisibleModifier: string = '';
  public readonly primaryModifier: string = '';
  public readonly themeModifier: string = '';

  public cssClassProp: TVideoProps['cssClass'] = 'newCssClass';

  constructor(className: string = EVideoPropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.videoEl = `.${className}__video`;
    this.loadingEl = `.${className}__loading`;
    this.controlsEl = `.${className}__controls`;
    this.controlsVisibleModifier = `${className}__controls--visible`;
    this.controlsGroupEl = `.${className}__controls-group`;
    this.controlsActionEl = `.${className}__controls-action`;
    this.controlsActionModifier = `${className}__controls-action--focused`;
    this.controlsActionPlayEl = `.${className}__controls-action-play`;
    this.controlsActionStopEl = `.${className}__controls-action-stop`;
    this.controlsFullscreenEl = `.${className}__controls-fullscreen`;
    this.controlsFullscreenIconEl = `.${className}__controls-fullscreen-icon`;
    this.controlsUnFullscreenIconEl = `.${className}__controls-unfullscreen-icon`;
    this.controlsFullscreenModifier = `${className}__controls-fullscreen--focused`;
    this.controlsVolumeEl = `.${className}__controls-volume`;
    this.controlsVolumeIconEl = `.${className}__controls-volume-icon`;
    this.controlsVolumeModifier = `${className}__controls-volume--focused`;
    this.controlsVolumeSliderEl = `.${className}__controls-volume-slider`;
    this.timeEl = `.${className}__time`;
    this.timelineEl = `.${className}__timeline`;
    this.timelineModifier = `${className}__timeline--focused`;
    this.timelineTimePopupEl = `.${className}__timeline-time-popup`;
    this.timelineTimePopupVisibleModifier = `${className}__timeline-time-popup--visible`;
    this.primaryModifier = `${className}--primary`;
    this.themeModifier = `${className}--theme`;
  }

  public mockProps: TVideoProps = {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    preload: EVideoPropsDefault.PRELOAD,
    controls: true,
    timeToHideControlsMs: EVideoPropsDefault.TIME_TO_HIDE_CONTROLS_MS as number,
    timeToHideControlsOnOutsideMs: EVideoPropsDefault.TIME_TO_HIDE_CONTROLS_ON_OUTSIDE_MS as number,
    volume: EVideoPropsDefault.VOLUME as number,
    fastForwardSeconds: EVideoPropsDefault.FAST_FORWARD_SECONDS as number,
    fastRewindSeconds: EVideoPropsDefault.FAST_REWIND_SECONDS as number,
    cssClass: EVideoPropsDefault.CSS_CLASS as string,
  };

  static async getVideoSlotDefaultCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.default.custom.html'))
    ).trim();
  }

  static async getVideoSlotPlayIconDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.play-icon.default.html'))
    ).trim();
  }

  static async getVideoSlotPlayIconCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.play-icon.custom.html'))
    ).trim();
  }

  static async getVideoSlotStopIconDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.stop-icon.default.html'))
    ).trim();
  }

  static async getVideoSlotStopIconCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.stop-icon.custom.html'))
    ).trim();
  }

  static async getVideoSlotVolumeIconDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.volume-icon.default.html'))
    ).trim();
  }

  static async getVideoSlotVolumeIconCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.volume-icon.custom.html'))
    ).trim();
  }

  static async getVideoSlotFullscreenIconDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.fullscreen-icon.default.html'))
    ).trim();
  }

  static async getVideoSlotFullscreenIconCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.fullscreen-icon.custom.html'))
    ).trim();
  }

  static async getVideoSlotUnFullscreenIconDefault(): Promise<string> {
    return (
      await this.readFile(
        path.resolve(__dirname, 'components/slot.un-fullscreen-icon.default.html'),
      )
    ).trim();
  }

  static async getVideoSlotUnFullscreenIconCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.un-fullscreen-icon.custom.html'))
    ).trim();
  }

  static async getVideoSlotLoadingIconDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.loading-icon.default.html'))
    ).trim();
  }

  static async getVideoSlotLoadingIconCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.loading-icon.custom.html'))
    ).trim();
  }

  static async getVideoSlotTimeDefault(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.time.default.html'))
    ).trim();
  }

  static async getVideoSlotTimeCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/slot.time.custom.html'))
    ).trim();
  }
}
