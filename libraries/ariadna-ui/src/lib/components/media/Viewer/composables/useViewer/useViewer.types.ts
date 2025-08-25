import type { ComputedRef } from 'vue';
import type { TViewerGallery } from '../../types/Viewer.types';
import type { EViewerMedia } from '../../types/Viewer.enums';

/**
 * @description
 * Return type for the `useViewer` composable function.
 * Contains reactive properties and methods for Viewer component functionality.
 */
export type TUseViewerReturn = {
  /**
   * Reactive computed property generating CSS class string based on component props (modifier, size, states, etc.).
   */
  componentClasses: ComputedRef<string>;

  /**
   * Parses the provided gallery and returns an array of media items, each with its type.
   *
   * @param {TViewerGallery} gallery - The gallery object to be parsed.
   * @returns {{[p: string]: any, type: EViewerMedia}[]} - An array of objects, each containing media item properties
   * and a `type` field of `EViewerMedia`.
   */
  parseGallery: (gallery: TViewerGallery) => { [p: string]: any; type: EViewerMedia }[];

  /**
   * Computed property containing only image items from the gallery.
   */
  videoGallery: ComputedRef<TViewerGallery>;

  /**
   * Computed property containing all media items from the gallery, regardless of type.
   */
  imageGallery: ComputedRef<TViewerGallery>;

  /**
   * Computed property containing all media items from the gallery, regardless of type.
   */
  generalGallery: ComputedRef<TViewerGallery>;
};
