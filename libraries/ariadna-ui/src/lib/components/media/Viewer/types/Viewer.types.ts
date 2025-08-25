/**
 * Represents a single media item for the Viewer component. The type allows for any set of properties,
 * enabling flexibility for various media types (e.g., images, videos, documents).
 */
export type TViewerMediaItem = {
  [key: string]: any;
};

/**
 * Defines a gallery as an array of media items to be displayed in the Viewer component.
 */
export type TViewerGallery = Array<TViewerMediaItem>;

/**
 * Callback type for handling the opening of a viewer with a gallery item.
 *
 * This function is invoked with the current gallery item, its index, and the entire array of items. It should return
 * a boolean indicating whether the operation was successful or should proceed.
 *
 * @template T - The type of the gallery item, extending TViewerMediaItem.
 *
 * @param galleryItem - The current gallery item to be opened in the viewer.
 * @param index - The index of the current gallery item within the array.
 * @param array - The array of all gallery items.
 *
 * @returns A boolean value indicating whether the viewer should proceed with opening the item.
 */
export type TViewerApiOpenWithGalleryCallback<T extends TViewerMediaItem = TViewerMediaItem> = (
  galleryItem: T,
  index: number,
  array: Array<T>,
) => boolean;
