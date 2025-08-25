import type Observable from '@/shared/utils/patterns/observable/observable.utils';

/**
 * Represents the size of the swipe viewer container.
 */
export type TViewerSwipeCoreContainerSize = {
  /**
   * The width of the container in pixels.
   */
  width: number;

  /**
   * The height of the container in pixels.
   */
  height: number;
};

/**
 * Options for configuring the swipe core behavior of the Viewer.
 */
export type TViewerSwipeCoreOptions = {
  /**
   * The total number of items in the gallery.
   */
  galleryLength: number;

  /**
   * The dimensions of the swipe container.
   *
   * @optional
   */
  containerSizes?: TViewerSwipeCoreContainerSize | null;

  /**
   * Enables or disables looping of the gallery.
   *
   * @optional
   */
  loop?: boolean;

  /**
   * The threshold in pixels for swipe actions.
   *
   * @optional
   */
  verge?: number;

  /**
   * The initial index to display.
   *
   * @optional
   */
  initialIndex?: number;
};

/**
 * Represents the updatable subset of swipe core options.
 */
export type TViewerSwipeCoreOptionsUpdate = Partial<
  Pick<TViewerSwipeCoreOptions, 'galleryLength' | 'loop'>
>;

/**
 * Type for the swipe core logic, managing swipe gestures, state, and events in the viewer.
 */
export type TViewerSwipeCore = {
  /**
   * The current index of the displayed item in the gallery.
   */
  index: number;

  /**
   * The current swipe offset in pixels, representing the drag distance.
   */
  swipeOffset: number;

  /**
   * Indicates whether a swipe gesture is currently in progress.
   */
  isDragging: boolean;

  /**
   * Observable triggered when the view is reset to its initial state.
   */
  onResetView: Observable<void>;

  /**
   * Observable triggered when the slide index changes.
   */
  onSlideChange: Observable<number>;

  /**
   * Advances to the next item in the gallery.
   */
  next(): void;

  /**
   * Moves to the previous item in the gallery.
   */
  prev(): void;

  /**
   * Updates the current index to the specified value.
   *
   * @param {number} index - The new index to set as the current item.
   */
  updateIndex(index: number): void;

  /**
   * Normalizes the given index within the gallery bounds.
   *
   * @param {number} index - The index to normalize.
   */
  normalizeIndex(index: number): void;

  /**
   * Initiates a swipe gesture at the specified X coordinate.
   *
   * @param {number} clientX - The X coordinate where the swipe starts.
   */
  swipeStart(clientX: number): void;

  /**
   * Updates the swipe gesture with the current X coordinate.
   *
   * @param {number} clientX - The current X coordinate during the swipe.
   */
  swipe(clientX: number): void;

  /**
   * Completes the swipe gesture and finalizes the state.
   */
  swipeEnd(): void;

  /**
   * Updates swipe core options such as gallery length or loop mode.
   *
   * @param {TViewerSwipeCoreOptionsUpdate} options - The options to update.
   */
  updateOptions(options: TViewerSwipeCoreOptionsUpdate): void;

  /**
   * Updates the container size for swipe calculations.
   *
   * @param {TViewerSwipeCoreContainerSize} sizes - The new container size.
   */
  updateContainerSizes(sizes: TViewerSwipeCoreContainerSize): void;
};
