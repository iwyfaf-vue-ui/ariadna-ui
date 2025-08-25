import type {
  TViewerZoomCore,
  TViewerZoomCoreOnZoomChangeData,
  TViewerZoomOptions,
} from './viewer.zoom.core.types';
import Observable from '@/shared/utils/patterns/observable/observable.utils';

export class ViewerZoomCore implements TViewerZoomCore {
  private _scale: number;

  public get scale(): number {
    return this._scale;
  }

  public get isScaled(): boolean {
    return this._scale !== 0;
  }

  public get normalizedScale(): number {
    return this.normalizeScale(this._scale);
  }

  private readonly _onZoomChange: Observable<TViewerZoomCoreOnZoomChangeData>;
  public get onZoomChange() {
    return this._onZoomChange;
  }

  private readonly minScale: number;
  private readonly maxScale: number;

  constructor(options: TViewerZoomOptions) {
    this._scale = 0;
    this.minScale = 0;
    this._onZoomChange = new Observable<TViewerZoomCoreOnZoomChangeData>();

    this.maxScale = options.maxScale;
  }

  public zoom(delta: number): void {
    this.setScale(this._scale + delta);
  }

  public zoomAt(delta: number, centerX: number, centerY: number): void {
    this.setScale(this._scale + delta, centerX, centerY);
  }

  public setScale(scale: number, centerX?: number, centerY?: number): void {
    const temp = this._scale;
    this._scale = Math.min(Math.max(scale, this.minScale), this.maxScale);
    this._onZoomChange.notify({ newValue: this._scale, oldValue: temp, centerX, centerY });
  }

  public normalizeScale(scale: number): number {
    return 1 + scale / 100;
  }
}
