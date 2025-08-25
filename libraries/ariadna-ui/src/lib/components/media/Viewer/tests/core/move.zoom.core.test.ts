import { describe, it, expect, beforeEach } from 'vitest';
import { ViewerMoveCore } from '../../core/move/viewer.move.core';
import type { TViewerMoveElementSize } from '../../core/move/viewer.move.core.types';

describe('ViewerMoveCore', () => {
  let core: ViewerMoveCore;
  const defaultContainer: TViewerMoveElementSize = { width: 1000, height: 800 };
  const defaultMoveItem: TViewerMoveElementSize = { width: 500, height: 400 };

  beforeEach(() => {
    core = new ViewerMoveCore({
      containerSize: { ...defaultContainer },
      moveItemSize: { ...defaultMoveItem },
      slowFactor: 1,
    });
  });

  describe('constructor', () => {
    it('Should initialize with provided options.', () => {
      expect(core.topOffset).toEqual(0);
      expect(core.leftOffset).toEqual(0);
      expect(core.isDragging).toBe(false);
    });

    it('Should initialize with default values if options are missing.', () => {
      const c = new ViewerMoveCore();
      expect(c.topOffset).toEqual(0);
      expect(c.leftOffset).toEqual(0);
      expect(c.isDragging).toBe(false);
    });
  });

  describe('start', () => {
    it('Should set isDragging to true after start.', () => {
      core.start(100, 200);

      expect(core.isDragging).toBe(true);
    });
  });

  describe('move', () => {
    it('Should not change offsets if move called before start.', () => {
      const prevTop = core.topOffset;
      const prevLeft = core.leftOffset;
      core.move(150, 250);

      expect(core.topOffset).toEqual(prevTop);
      expect(core.leftOffset).toEqual(prevLeft);
    });

    it('Should update offsets after start and move.', () => {
      // Используем размеры, при которых moveItem больше контейнера
      core = new ViewerMoveCore({
        containerSize: { width: 300, height: 200 },
        moveItemSize: { width: 1000, height: 800 },
        slowFactor: 1,
      });
      core.start(100, 200);
      core.move(120, 230);

      expect(core.leftOffset).not.toEqual(0);
      expect(core.topOffset).not.toEqual(0);
    });

    it('Should clamp offsets within limits.', () => {
      core = new ViewerMoveCore({
        containerSize: { width: 300, height: 200 },
        moveItemSize: { width: 1000, height: 800 },
        slowFactor: 1,
      });
      core.start(0, 0);
      core.move(10000, 10000); // big move
      // Offsets should be clamped to max
      const limits = (core as any).calculateLimits(1);

      expect(core.leftOffset).toBeLessThanOrEqual(limits.maxLeft);
      expect(core.leftOffset).toBeGreaterThanOrEqual(limits.minLeft);
      expect(core.topOffset).toBeLessThanOrEqual(limits.maxTop);
      expect(core.topOffset).toBeGreaterThanOrEqual(limits.minTop);
    });

    it('Should not change offsets if moveItem fits inside container.', () => {
      core = new ViewerMoveCore({
        containerSize: { width: 1000, height: 800 },
        moveItemSize: { width: 500, height: 400 },
        slowFactor: 1,
      });
      core.start(0, 0);
      core.move(100, 100);

      expect(core.leftOffset).toEqual(0);
      expect(core.topOffset).toEqual(0);
    });

    it('Should apply slowFactor to movement.', () => {
      core = new ViewerMoveCore({
        containerSize: { width: 300, height: 200 },
        moveItemSize: { width: 1000, height: 800 },
        slowFactor: 0.5,
      });
      core.start(0, 0);
      core.move(100, 100);

      // delta should be 50, not 100
      expect(core.leftOffset).toBeCloseTo(50);
      expect(core.topOffset).toBeCloseTo(50);
    });

    it('Should handle slowFactor = 0 (no movement).', () => {
      core = new ViewerMoveCore({
        containerSize: { width: 300, height: 200 },
        moveItemSize: { width: 1000, height: 800 },
        slowFactor: 0,
      });
      core.start(0, 0);
      core.move(100, 100);

      expect(core.leftOffset).toEqual(0);
      expect(core.topOffset).toEqual(0);
    });
  });

  describe('end', () => {
    it('Should set isDragging to false after end.', () => {
      core.start(10, 10);
      core.end();

      expect(core.isDragging).toBe(false);
    });
  });

  describe('reset', () => {
    it('Should reset offsets to zero.', () => {
      core.start(0, 0);
      core.move(100, 100);
      core.reset();

      expect(core.leftOffset).toEqual(0);
      expect(core.topOffset).toEqual(0);
    });
  });

  describe('updateOffsetsWithZoom', () => {
    it('Should not update offsets if oldZoom is 0.', () => {
      core.start(0, 0);
      core.move(100, 100);
      const prevLeft = core.leftOffset;
      const prevTop = core.topOffset;
      core.updateOffsetsWithZoom(2, 0, 500, 400);

      expect(core.leftOffset).toEqual(prevLeft);
      expect(core.topOffset).toEqual(prevTop);
    });

    it('Should not update offsets if moveItem fits inside container.', () => {
      core = new ViewerMoveCore({
        containerSize: { width: 1000, height: 800 },
        moveItemSize: { width: 500, height: 400 },
        slowFactor: 1,
      });
      core.start(0, 0);
      core.move(100, 100);
      const prevLeft = core.leftOffset;
      const prevTop = core.topOffset;
      core.updateOffsetsWithZoom(2, 1, 500, 400);

      expect(core.leftOffset).toEqual(prevLeft);
      expect(core.topOffset).toEqual(prevTop);
    });

    it('Should update offsets with zoom and center.', () => {
      core = new ViewerMoveCore({
        containerSize: { width: 300, height: 200 },
        moveItemSize: { width: 1000, height: 800 },
        slowFactor: 1,
      });
      // Не делаем move, offset = 0
      const prevLeft = core.leftOffset;
      const prevTop = core.topOffset;
      core.updateOffsetsWithZoom(5, 1, 150, 100);

      expect(core.leftOffset).not.toEqual(prevLeft);
      expect(core.topOffset).not.toEqual(prevTop);
    });

    it('Should clamp offsets after zoom.', () => {
      core = new ViewerMoveCore({
        containerSize: { width: 300, height: 200 },
        moveItemSize: { width: 1000, height: 800 },
        slowFactor: 1,
      });
      core.start(0, 0);
      core.move(10000, 10000);
      core.updateOffsetsWithZoom(10, 1, 0, 0);
      const limits = (core as any).calculateLimits(10);

      expect(core.leftOffset).toBeLessThanOrEqual(limits.maxLeft);
      expect(core.leftOffset).toBeGreaterThanOrEqual(limits.minLeft);
      expect(core.topOffset).toBeLessThanOrEqual(limits.maxTop);
      expect(core.topOffset).toBeGreaterThanOrEqual(limits.minTop);
    });
  });

  describe('updateContainerSize', () => {
    it('Should update container size.', () => {
      core.updateContainerSize({ width: 2000, height: 1600 });

      // Проверим через приватный способ (moveItemWithinContainerX)
      expect((core as any).containerSize.width).toEqual(2000);
      expect((core as any).containerSize.height).toEqual(1600);
    });
  });

  describe('updateMoveItemSize', () => {
    it('Should update move item size.', () => {
      core.updateMoveItemSize({ width: 2000, height: 1600 });

      expect((core as any).moveItemSize.width).toEqual(2000);
      expect((core as any).moveItemSize.height).toEqual(1600);
    });
  });

  describe('clamp/calculateLimits', () => {
    it('Should clamp value between min and max.', () => {
      const clamp = (core as any).clamp.bind(core);

      expect(clamp(0, 5, 10)).toEqual(5);
      expect(clamp(0, -5, 10)).toEqual(0);
      expect(clamp(0, 15, 10)).toEqual(10);
    });

    it('Should calculate correct limits for moveItem larger than container.', () => {
      core = new ViewerMoveCore({
        containerSize: { width: 300, height: 200 },
        moveItemSize: { width: 1000, height: 800 },
        slowFactor: 1,
      });
      const limits = (core as any).calculateLimits(1);

      expect(limits.maxLeft).toBeGreaterThan(0);
      expect(limits.minLeft).toBeLessThan(0);
      expect(limits.maxTop).toBeGreaterThan(0);
      expect(limits.minTop).toBeLessThan(0);
    });

    it('Should calculate zero limits for moveItem fitting container.', () => {
      core = new ViewerMoveCore({
        containerSize: { width: 1000, height: 800 },
        moveItemSize: { width: 500, height: 400 },
        slowFactor: 1,
      });
      const limits = (core as any).calculateLimits(1);

      expect(limits.maxLeft).toEqual(core.leftOffset);
      expect(limits.minLeft).toEqual(-core.leftOffset);
      expect(limits.maxTop).toEqual(core.topOffset);
      expect(limits.minTop).toEqual(-core.topOffset);
    });
  });
});
