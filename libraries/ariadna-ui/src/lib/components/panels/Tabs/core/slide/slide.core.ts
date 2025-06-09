import type { TContainerSize, TSlideCore, TSlideCoreOptions } from './slide.core.types';

export default class SlideCore implements TSlideCore {
  private containerSize: TContainerSize;
  private paddings: [number, number];
  private startX: number = 0;
  private _offset: number = 0;

  public get offset(): number {
    return this._offset;
  }

  private _isSliding: boolean = false;

  public get isSliding(): boolean {
    return this._isSliding;
  }

  constructor(options: TSlideCoreOptions) {
    this.containerSize = options.containerSize;
    this.paddings = options.paddings ?? [0, 0];
  }

  public slideStart(clientX: number): void {
    if (this.containerSize.scrollWidth <= this.containerSize.width) return;

    this._isSliding = true;
    this.startX = clientX;
  }

  public slideMove(clientX: number): void {
    if (!this.isSliding) return;

    const [_, paddingRight] = this.paddings;

    const step = 1.1;

    const deltaX = (clientX - this.startX) * -1 * step;
    this.startX = clientX;

    this._offset = this.clamp(
      0,
      this._offset + deltaX,
      this.containerSize.scrollWidth + paddingRight - this.containerSize.width,
    );
  }

  public slideEnd(): void {
    this._isSliding = false;
  }

  public updateContainerSize(newContainerSize: TContainerSize) {
    this.containerSize = newContainerSize;
  }

  public updatePaddings(newPaddings: [number, number]) {
    this.paddings = newPaddings;
  }

  private clamp(min: number, mid: number, max: number): number {
    return Math.min(Math.max(min, mid), max);
  }
}
