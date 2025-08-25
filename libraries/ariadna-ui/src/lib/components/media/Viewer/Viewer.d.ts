import type { ClassComponent, GlobalComponentConstructor } from '../../../../types/component';
import type { VNode } from 'vue';
import { EViewerMedia, EViewerPropsDefault } from './types/Viewer.enums';
export type {
  TViewerApiOpenWithGalleryCallback,
  TViewerGallery,
  TViewerMediaItem,
} from './types/Viewer.types';
export type { IIframeVideoHelper } from '../../../utilities/helpers/IframeVideoHelper/IframeVideoHelper';

/**
 * Component props definition.
 */
export type TViewerProps = {
  /**
   * The effect of slowing down the movement of the image. 1 is the normal speed. Less than 1 is slower, more than 1 is
   * faster.
   *
   * @type number
   * @default {@link EViewerPropsDefault.MOVE_SLOW_FACTOR}
   * @example :move-slow-factor="0.7"
   */
  moveSlowFactor?: number;

  /**
   * Time to calculate the slide animation in milliseconds.
   *
   * @type number
   * @default {@link EViewerPropsDefault.RESIZE_CALCULATION_MS}
   * @example :resize-calculation-ms="700"
   */
  resizeCalculationMs?: number;

  /**
   * The limit when the swipe will be counted (as a percentage, from 0 to 100).
   *
   * @type number
   * @default {@link EViewerPropsDefault.SWIPE_VERGE}
   * @example :swipe-verge="70"
   */
  swipeVerge?: number;

  /**
   * The step of zoom in / zoom out.
   *
   * @type number
   * @default {@link EViewerPropsDefault.ZOOM_STEP}
   * @example :zoom-step="20"
   */
  zoomStep?: number;

  /**
   * Maximum percentage zoom in (from 0 to n).
   *
   * @type number
   * @default {@link EViewerPropsDefault.ZOOM_MAX}
   * @example :zoom-max="300"
   */
  zoomMax?: number;

  /**
   * The order in which videos/images are displayed.
   *
   * @type {[EViewerMedia, EViewerMedia]}
   * @default [EViewerMedia.VIDEO, EViewerMedia.IMAGE]
   * @example :queue="['IMAGE', 'VIDEO']"
   */
  queue?: ['IMAGE' | 'VIDEO', 'IMAGE' | 'VIDEO'];

  /**
   * Turn on / turn off slider looping.
   *
   * @type boolean
   * @default false
   * @example :loop="true"
   */
  loop?: boolean;

  /**
   * User cannot dismiss Viewer by clicking on outside from slider content.
   *
   * @type boolean
   * @default false
   * @example :no-overlay-dismiss="true"
   */
  noOverlayDismiss?: boolean;

  /**
   * User cannot dismiss Viewer by hitting ESC key.
   *
   * @type boolean
   * @default false
   * @example :no-esc-dismiss="true"
   */
  noEscDismiss?: boolean;

  /**
   * An example of the IframeVideoHelper class.
   *
   * @type IIframeVideoHelper
   * @default undefined
   * @example :iframe-video-helper="IframeVideoHelper"
   */
  iframeVideoHelper?: IIframeVideoHelper;

  /**
   * A valid query selector or an HTMLElement to specify where the Viewer gets attached.
   *
   * @type 'body' | string
   * @default {@link EViewerPropsDefault.APPEND_TO}
   * @example append-to="#teleports"
   */
  appendTo?: 'body' | string;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link EViewerPropsDefault.CSS_CLASS}
   * @example css-class="example"
   */
  cssClass?: string;
};

/**
 * @description Component slots.
 */
export type TViewerSlots = {
  /**
   * Slot for rendering the empty state when no media is available.
   *
   * @returns {VNode[]}
   */
  empty(): VNode[];

  /**
   * Slot for rendering the close icon in the viewer.
   *
   * @returns {VNode[]}
   */
  closeIcon(): VNode[];

  /**
   * Slot for rendering the previous navigation icon.
   *
   * @returns {VNode[]}
   */
  prevIcon(): VNode[];

  /**
   * Slot for rendering the next navigation icon.
   *
   * @returns {VNode[]}
   */
  nextIcon(): VNode[];

  /**
   * Slot for rendering zoom information.
   *
   * @param {number} props.zoom - Indicates whether the Dropbox is currently open.
   * @returns {VNode[]}
   */
  zoomInfo(props: { zoom: number }): VNode[];

  /**
   * Slot for rendering a video item in the gallery.
   *
   * @param {TViewerMediaItem} props.videoItem - The video item to be displayed.
   * @returns {VNode[]}
   */
  galleryVideoItem(props: { videoItem: TViewerMediaItem }): VNode[];

  /**
   * Slot for rendering an image item in the gallery.
   *
   * @param {TViewerMediaItem} props.imageItem - The image item to be displayed.
   * @returns {VNode[]}
   */
  galleryImageItem(props: { imageItem: TViewerMediaItem }): VNode[];

  /**
   * Slot for rendering the label for video items in the gallery.
   *
   * @param {number} props.videoCount - The number of video items.
   * @returns {VNode[]}
   */
  galleryVideoLabel(props: { videoCount: number }): VNode[];

  /**
   * Slot for rendering the label for image items in the gallery.
   *
   * @param {number} props.imageCount - The number of image items.
   * @returns {VNode[]}
   */
  galleryImageLabel(props: { imageCount: number }): VNode[];

  /**
   * Slot for rendering a slider item, which can be either an image or a video.
   *
   * @param {TViewerMediaItem} props.mediaItem - The media item to be displayed in the slider.
   * @param {(iframe: Element) => void} props.registerIframe - A callback to register an iframe element if needed.
   * @returns {VNode[]}
   */
  sliderItem(props: {
    mediaItem: TViewerMediaItem;
    registerIframe: (iframe: Element) => void;
  }): VNode[];

  /**
   * Slot for rendering slide content while its calculating (calculating time is set in props.transitionMs).
   *
   * @returns {VNode[]}
   */
  calculating(): VNode[];
};

/**
 * @description Component emits.
 */
export type TViewerEmits = {
  /**
   * Emitted when the iframe video helper is updated.
   *
   * @param {"update:iframe-video-helper"} e - The event name.
   * @param {IIframeVideoHelper} iframeVideoHelper - An example of the IframeVideoHelper class.
   */
  (e: 'update:iframe-video-helper', iframeVideoHelper: IIframeVideoHelper): void;

  /**
   * Emitted when the viewer is opened.
   *
   * @param {"open"} e - The event name.
   */
  (e: 'open'): void;

  /**
   * Emitted when the viewer is closed.
   *
   * @param {"open"} e - The event name.
   */
  (e: 'close'): void;

  /**
   * Emitted when the current slide changes.
   *
   * @param {"slideChange"} e - The event name.
   * @param {TViewerMediaItem} slideItem - Current slide item element.
   * @returns {VNode[]}
   */
  (e: 'slideChange', slideItem: TViewerMediaItem): VNode[];
};

/**
 * Component exposes.
 */
export type TViewerExposes = {
  /**
   * Gets the current zoom level of the viewer.
   *
   * @returns {number} - The current zoom value as a number.
   */
  getZoom(): number;

  /**
   * Gets the current index of the active slide in the gallery.
   *
   * @returns {number} - The index of the current slide.
   */
  getIndex(): number;

  /**
   * Gets the total number of items in the gallery.
   *
   * @returns {number} - The length of the gallery.
   */
  getGalleryLength(): number;

  /**
   * Gets the currently displayed media item.
   *
   * @returns {TViewerMediaItem} - The current slide as a TViewerMediaItem.
   */
  getCurrentSlide(): TViewerMediaItem;
};

/**
 * Component API.
 */
export type TViewerApi = {
  /**
   * Registers a callback to be invoked when the Viewer component is created.
   *
   * @param {() => void} callback - The function to call upon creation.
   */
  created(callback: () => void): void;

  /**
   * Registers a callback to be invoked when the Viewer component is mounted to the DOM.
   *
   * @param {() => void} callback - The function to call upon mounting.
   */
  mounted(callback: () => void): void;

  /**
   * Registers a callback to be invoked when the Viewer component is unmounted from the DOM.
   *
   * @param {() => void} callback - The function to call upon unmounting.
   */
  unMounted(callback: () => void): void;

  /**
   * Sets the gallery to be displayed in the Viewer.
   *
   * @param {TViewerGallery} gallery - The gallery to set.
   */
  setGallery(gallery: TViewerGallery): void;

  /**
   * Sets the zoom level of the viewer.
   *
   * @param {number} zoom - The zoom value to set.
   */
  setZoom(zoom: number): void;

  /**
   * Enables or disables looping of the gallery.
   *
   * @param {boolean} loop - Whether to enable looping.
   */
  setLoop(loop: boolean): void;

  /**
   * Enables or disables swipe navigation.
   *
   * @param {boolean} swipe - Whether to enable swipe.
   */
  setSwipe(swipe: boolean): void;

  /**
   * Sets the source key for the viewer.
   *
   * @param {string} srcKey - The source key to set.
   */
  setSrcKey(srcKey: string): void;

  /**
   * Shows or hides the gallery.
   *
   * @param {boolean} show - Whether to show the gallery.
   */
  setShowGallery(show: boolean): void;

  /**
   * Opens the viewer.
   */
  open(): void;

  /**
   * Opens the viewer with a specific gallery and index or callback.
   *
   * @param {TViewerGallery} gallery - The gallery to open.
   * @param {number | TViewerApiOpenWithGalleryCallback<T>} index - The index to open or a callback function.
   */
  openWithGallery<T extends TViewerMediaItem = TViewerMediaItem>(
    gallery: TViewerGallery,
    index: number | TViewerApiOpenWithGalleryCallback<T>,
  ): void;

  /**
   * Navigates to the next item in the gallery.
   */
  next(): void;

  /**
   * Navigates to the previous item in the gallery.
   */
  prev(): void;

  /**
   * Navigates to the specified index in the gallery.
   *
   * @param {number} index - The index to navigate to.
   */
  goTo(index: number): void;
};

/**
 * Ariadna UI | Components | Viewer
 *
 * Viewer component is designed for viewing media content (images and videos) in the form of a gallery with the ability
 * to zoom, swipe, cycle through, and customize the interface through slots.
 */
declare class Viewer
  extends ClassComponent<TViewerProps, TViewerSlots, TViewerEmits, HTMLDivElement>
  implements TViewerExposes
{
  getZoom(): number;
  getIndex(): number;
  getGalleryLength(): number;
  getCurrentSlide(): TViewerMediaItem;
  setGallery(gallery: TViewerGallery): void;
  setZoom(zoom: number): void;
  setLoop(loop: boolean): void;
  setSwipe(swipe: boolean): void;
  setSrcKey(srcKey: string): void;
  setShowGallery(show: boolean): void;
  open(): void;
  next(): void;
  prev(): void;
  goTo(index: number): void;
  openWithGallery<T extends TViewerMediaItem = TViewerMediaItem>(
    gallery: TViewerGallery,
    index: number | TViewerApiOpenWithGalleryCallback<T>,
  ): void;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Viewer: GlobalComponentConstructor<Viewer>;
  }
}

export default Viewer;
