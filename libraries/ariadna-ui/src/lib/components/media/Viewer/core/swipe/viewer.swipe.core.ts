import type {
  TViewerSwipeCore,
  TViewerSwipeCoreContainerSize,
  TViewerSwipeCoreOptions,
  TViewerSwipeCoreOptionsUpdate,
} from './viewer.swipe.core.types';
import Observable from '@/shared/utils/patterns/observable/observable.utils';

export class ViewerSwipeCore implements TViewerSwipeCore {
  private galleryLength: number;
  private loop: boolean;
  private readonly _onResetView: Observable<void>;
  private readonly _onSlideChange: Observable<number>;
  private currentIndex: number;
  private readonly verge: number;
  private _isDragging: boolean = false;
  private oldPosition: number = 0;
  private completeShift: boolean = false;
  private containerSize: TViewerSwipeCoreContainerSize;
  private _swipeOffset: number = 0;

  public get onResetView() {
    return this._onResetView;
  }

  public get onSlideChange() {
    return this._onSlideChange;
  }

  public get index(): number {
    return this.currentIndex;
  }

  public get isDragging(): boolean {
    return this._isDragging;
  }

  public get swipeOffset(): number {
    return this._swipeOffset;
  }

  constructor(options: TViewerSwipeCoreOptions) {
    this.galleryLength = options.galleryLength;
    this.containerSize = options.containerSizes ?? { width: 0, height: 0 };
    this.verge = options.verge ?? 10;
    this.loop = options.loop ?? false;
    this.currentIndex = options.initialIndex ?? 0;

    this._onResetView = new Observable<void>();
    this._onSlideChange = new Observable<number>();
  }

  public next(): void {
    this.updateIndex(this.currentIndex + 1);
  }

  public prev(): void {
    this.updateIndex(this.currentIndex - 1);
  }

  public updateIndex(index: number) {
    const newIndex = this.normalizeIndex(index);

    if (this.currentIndex !== newIndex) {
      this._onSlideChange.notify(newIndex);
    }

    this.currentIndex = newIndex;
    this._onResetView.notify();
  }

  public normalizeIndex(index: number) {
    if (this.loop) {
      if (index < 0) return this.galleryLength - 1;
      if (index > this.galleryLength - 1) return 0;
    }

    return Math.max(Math.min(this.galleryLength - 1, index), 0);
  }

  public swipeStart(clientX: number): void {
    this._isDragging = true;
    this.oldPosition = clientX;
    this._swipeOffset = 0;
  }

  public swipe(clientX: number): void {
    if (!this._isDragging) {
      return;
    }

    const shiftPercentage = ((this.oldPosition - clientX) / this.containerSize.width) * 100;

    this.completeShift = Math.abs(shiftPercentage) > this.verge;
    this._swipeOffset = shiftPercentage;
  }

  public swipeEnd(): void {
    this._isDragging = false;

    if (this.completeShift) {
      if (this._swipeOffset < 0) {
        this.prev();
      } else {
        this.next();
      }

      this._swipeOffset = 0;
      this.completeShift = false;
      return;
    }

    this._swipeOffset = 0;
  }

  public updateOptions(options: TViewerSwipeCoreOptionsUpdate) {
    this.galleryLength = options.galleryLength ?? this.galleryLength;
    this.loop = options.loop ?? this.loop;
  }

  public updateContainerSizes(sizes: TViewerSwipeCoreContainerSize) {
    this.containerSize = sizes;
  }
}
