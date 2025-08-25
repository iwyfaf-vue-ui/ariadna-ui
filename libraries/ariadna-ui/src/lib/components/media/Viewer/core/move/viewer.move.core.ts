import type {
  TViewerMoveCore,
  TViewerMoveCoreOptions,
  TViewerMoveElementSize,
  TViewerMoveLimits,
  TViewerMovePosition,
} from './viewer.move.core.types';

export class ViewerMoveCore implements TViewerMoveCore {
  private _topOffset: number = 0;
  public get topOffset(): number {
    return this._topOffset;
  }

  private _leftOffset: number = 0;
  public get leftOffset(): number {
    return this._leftOffset;
  }

  private startDragPosition: TViewerMovePosition | null = null;
  private containerSize: TViewerMoveElementSize;
  private moveItemSize: TViewerMoveElementSize;
  private normalizedScale: number = 1;
  private readonly slowFactor: number = 1;

  public get isDragging(): boolean {
    return this.startDragPosition !== null;
  }

  constructor(options: Partial<TViewerMoveCoreOptions> = {}) {
    this.containerSize = options.containerSize ?? { width: 0, height: 0 };
    this.moveItemSize = options.moveItemSize ?? { width: 0, height: 0 };
    this.slowFactor = options.slowFactor ?? 1;
  }

  public start(clientX: number, clientY: number): void {
    this.startDragPosition = {
      x: clientX,
      y: clientY,
    };
  }

  public move(clientX: number, clientY: number): void {
    if (!this.startDragPosition) {
      return;
    }

    const deltaX = (clientX - this.startDragPosition.x) * this.slowFactor;
    const deltaY = (clientY - this.startDragPosition.y) * this.slowFactor;

    // Расчёт смещения, если слайд меньше контейнера, то ничего не делать.
    const newLeft = this.moveItemWithinContainerX() ? this._leftOffset : this._leftOffset + deltaX;
    const newTop = this.moveItemWithinContainerY() ? this._topOffset : this._topOffset + deltaY;

    const { minTop, maxTop, maxLeft, minLeft } = this.calculateLimits(this.normalizedScale);

    this._leftOffset = this.clamp(minLeft, newLeft, maxLeft);
    this._topOffset = this.clamp(minTop, newTop, maxTop);

    this.startDragPosition.x = clientX;
    this.startDragPosition.y = clientY;
  }

  public end() {
    this.startDragPosition = null;
  }

  public reset(): void {
    this._topOffset = 0;
    this._leftOffset = 0;
  }

  public updateOffsetsWithZoom(
    newZoom: number,
    oldZoom: number,
    centerX?: number,
    centerY?: number,
  ): void {
    this.normalizedScale = newZoom;

    if (oldZoom === 0 || this.moveItemWithinContainerX() || this.moveItemWithinContainerY()) {
      return;
    }

    const scaleFactor = newZoom / oldZoom;

    const oldLocalX = (centerX || 0) - this._leftOffset;
    const oldLocalY = (centerY || 0) - this._topOffset;

    this._leftOffset -= oldLocalX * (scaleFactor - 1);
    this._topOffset -= oldLocalY * (scaleFactor - 1);

    const { minTop, maxTop, maxLeft, minLeft } = this.calculateLimits(newZoom);

    this._leftOffset = this.clamp(minLeft, this._leftOffset, maxLeft);
    this._topOffset = this.clamp(minTop, this._topOffset, maxTop);
  }

  public updateContainerSize(size: TViewerMoveElementSize): void {
    this.containerSize = size;
  }

  public updateMoveItemSize(size: TViewerMoveElementSize): void {
    this.moveItemSize = size;
  }

  private clamp(min: number, mid: number, max: number): number {
    return Math.min(Math.max(min, mid), max);
  }

  private moveItemWithinContainerX(): boolean {
    return this.moveItemSize.width * this.normalizedScale <= this.containerSize.width;
  }
  private moveItemWithinContainerY(): boolean {
    return this.moveItemSize.height * this.normalizedScale <= this.containerSize.height;
  }

  /**
   * Calculate the limitations of the image offset relative to the center.
   * @param {number} zoom
   * @returns {TViewerMoveLimits}
   * @private
   */
  private calculateLimits(zoom: number): TViewerMoveLimits {
    // The size of the slide, including the zoom.
    const scaledWidth = this.moveItemSize.width * zoom;
    const scaledHeight = this.moveItemSize.height * zoom;

    const maxTop = this.moveItemWithinContainerY()
      ? this._topOffset
      : (scaledHeight - this.containerSize.height) / 2;
    const maxLeft = this.moveItemWithinContainerX()
      ? this._leftOffset
      : (scaledWidth - this.containerSize.width) / 2;

    return {
      maxTop,
      minTop: -maxTop,
      maxLeft,
      minLeft: -maxLeft,
    };
  }
}
