import type {
  TViewerPositionCore,
  TViewerPositionCoreCoordinates,
  TViewerPositionCoreElementSize,
  TViewerPositionCoreOptions,
} from './viewer.position.core.types';

export class ViewerPositionCore implements TViewerPositionCore {
  private _items: Array<TViewerPositionCoreElementSize> = [];
  private _container: TViewerPositionCoreElementSize = { width: 0, height: 0 };
  private _coords: Array<TViewerPositionCoreCoordinates> = [];

  public get coords(): Array<TViewerPositionCoreCoordinates> {
    return this._coords;
  }

  constructor(options?: TViewerPositionCoreOptions) {
    if (options) {
      this._items = options.items;
      this._container = options.container;
    }

    this.calculateAll();
  }

  public updateContainerSize(size: TViewerPositionCoreElementSize): void {
    this._container = size;
    this.calculateAll();
  }

  public updateMoveItemSize(size: TViewerPositionCoreElementSize, index: number): void {
    this._items[index] = size;
    this.calculate(index);
  }

  public updateMoveItemsSize(items: Array<TViewerPositionCoreElementSize>): void {
    this._items = items;
    this.calculateAll();
  }

  private calculate(index: number): void {
    const item = this._items[index];

    if (item.height === 0 || item.width === 0) {
      return;
    }

    const scaledWidth = item.width;
    const scaledHeight = item.height;

    const centerX = (this._container.width - scaledWidth) / 2;
    const centerY = (this._container.height - scaledHeight) / 2;

    this._coords[index] = { x: centerX, y: centerY };
  }

  private calculateAll(): void {
    this._coords = this._items.map((item) => {
      const centerX = (this._container.width - item.width) / 2;
      const centerY = (this._container.height - item.height) / 2;

      return { x: centerX, y: centerY };
    });
  }
}
