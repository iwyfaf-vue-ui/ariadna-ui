import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ViewerZoomCore } from '../../core/zoom/viewer.zoom.core';
import type { TViewerZoomCoreOnZoomChangeData } from '../../core/zoom/viewer.zoom.core.types';

describe('ViewerZoomCore', () => {
  let zoomCore: ViewerZoomCore;
  const maxScale = 200;
  let onZoomChangeSpy: (data: TViewerZoomCoreOnZoomChangeData) => void;

  beforeEach(() => {
    zoomCore = new ViewerZoomCore({ maxScale });
    onZoomChangeSpy = vi.fn();
    zoomCore.onZoomChange.observe(onZoomChangeSpy);
  });

  describe('constructor', () => {
    it('Should initialize scale to 0 and set maxScale.', () => {
      expect(zoomCore.scale).toEqual(0);
      expect((zoomCore as any).minScale).toEqual(0);
      expect((zoomCore as any).maxScale).toEqual(maxScale);
    });

    it('Should initialize onZoomChange as Observable.', () => {
      expect(zoomCore.onZoomChange).toBeDefined();
      expect(typeof zoomCore.onZoomChange.observe).toBe('function');
      expect(typeof zoomCore.onZoomChange.notify).toBe('function');
    });
  });

  describe('scale', () => {
    it('Should return the current scale value.', () => {
      expect(zoomCore.scale).toEqual(0);

      zoomCore.setScale(50);

      expect(zoomCore.scale).toEqual(50);
    });
  });

  describe('isScaled', () => {
    it('Should return false when scale is 0.', () => {
      expect(zoomCore.isScaled).toBe(false);
    });

    it('Should return true when scale is not 0.', () => {
      zoomCore.setScale(10);
      expect(zoomCore.isScaled).toBe(true);
    });
  });

  describe('normalizedScale', () => {
    it('Should return 1 when scale is 0.', () => {
      expect(zoomCore.normalizedScale).toEqual(1);
    });

    it('Should return correct normalized value for positive scale.', () => {
      zoomCore.setScale(50);
      expect(zoomCore.normalizedScale).toEqual(1.5);
    });

    it('Should return correct normalized value for negative scale.', () => {
      zoomCore.setScale(-50);
      expect(zoomCore.normalizedScale).toEqual(1);
    });
  });

  describe('zoom', () => {
    it('Should increase scale by delta and notify.', () => {
      zoomCore.zoom(20);

      expect(zoomCore.scale).toEqual(20);
      expect(onZoomChangeSpy).toHaveBeenCalledWith({
        newValue: 20,
        oldValue: 0,
        centerX: undefined,
        centerY: undefined,
      });
    });

    it('Should decrease scale by negative delta and notify.', () => {
      zoomCore.setScale(50);
      zoomCore.zoom(-20);

      expect(zoomCore.scale).toEqual(30);
      expect(onZoomChangeSpy).toHaveBeenCalledWith({
        newValue: 30,
        oldValue: 50,
        centerX: undefined,
        centerY: undefined,
      });
    });

    it('Should clamp scale to minScale if result is less than minScale.', () => {
      zoomCore.zoom(-10);

      expect(zoomCore.scale).toEqual(0);
      expect(onZoomChangeSpy).toHaveBeenCalledWith({
        newValue: 0,
        oldValue: 0,
        centerX: undefined,
        centerY: undefined,
      });
    });

    it('Should clamp scale to maxScale if result is greater than maxScale.', () => {
      zoomCore.zoom(maxScale + 100);

      expect(zoomCore.scale).toEqual(maxScale);
      expect(onZoomChangeSpy).toHaveBeenCalledWith({
        newValue: maxScale,
        oldValue: 0,
        centerX: undefined,
        centerY: undefined,
      });
    });
  });

  describe('zoomAt', () => {
    it('Should increase scale by delta and notify with center.', () => {
      zoomCore.zoomAt(30, 100, 200);

      expect(zoomCore.scale).toEqual(30);
      expect(onZoomChangeSpy).toHaveBeenCalledWith({
        newValue: 30,
        oldValue: 0,
        centerX: 100,
        centerY: 200,
      });
    });

    it('Should clamp scale and notify with center.', () => {
      zoomCore.zoomAt(maxScale + 100, 10, 20);

      expect(zoomCore.scale).toEqual(maxScale);
      expect(onZoomChangeSpy).toHaveBeenCalledWith({
        newValue: maxScale,
        oldValue: 0,
        centerX: 10,
        centerY: 20,
      });
    });
  });

  describe('setScale', () => {
    it('Should set scale to given value and notify.', () => {
      zoomCore.setScale(100);

      expect(zoomCore.scale).toEqual(100);
      expect(onZoomChangeSpy).toHaveBeenCalledWith({
        newValue: 100,
        oldValue: 0,
        centerX: undefined,
        centerY: undefined,
      });
    });

    it('Should clamp scale to minScale.', () => {
      zoomCore.setScale(-100);

      expect(zoomCore.scale).toEqual(0);
      expect(onZoomChangeSpy).toHaveBeenCalledWith({
        newValue: 0,
        oldValue: 0,
        centerX: undefined,
        centerY: undefined,
      });
    });

    it('Should clamp scale to maxScale.', () => {
      zoomCore.setScale(maxScale + 100);

      expect(zoomCore.scale).toEqual(maxScale);
      expect(onZoomChangeSpy).toHaveBeenCalledWith({
        newValue: maxScale,
        oldValue: 0,
        centerX: undefined,
        centerY: undefined,
      });
    });

    it('Should notify with centerX and centerY if provided.', () => {
      zoomCore.setScale(50, 10, 20);
      expect(onZoomChangeSpy).toHaveBeenCalledWith({
        newValue: 50,
        oldValue: 0,
        centerX: 10,
        centerY: 20,
      });
    });
  });

  describe('normalizeScale', () => {
    it('Should return 1 for scale 0.', () => {
      expect(zoomCore.normalizeScale(0)).toEqual(1);
    });

    it('Should return correct normalized value for positive scale.', () => {
      expect(zoomCore.normalizeScale(50)).toEqual(1.5);
    });

    it('Should return correct normalized value for negative scale.', () => {
      expect(zoomCore.normalizeScale(-50)).toEqual(0.5);
    });
  });
});
