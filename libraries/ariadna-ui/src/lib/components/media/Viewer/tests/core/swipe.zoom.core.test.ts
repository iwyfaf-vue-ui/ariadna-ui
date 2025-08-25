import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ViewerSwipeCore } from '../../core/swipe/viewer.swipe.core';
import type {
  TViewerSwipeCoreOptions,
  TViewerSwipeCoreContainerSize,
} from '../../core/swipe/viewer.swipe.core.types';
import Observable from '@/shared/utils/patterns/observable/observable.utils';

describe('ViewerSwipeCore', () => {
  let options: TViewerSwipeCoreOptions;
  let core: ViewerSwipeCore;
  let containerSize: TViewerSwipeCoreContainerSize;

  beforeEach(() => {
    containerSize = { width: 100, height: 50 };
    options = {
      galleryLength: 5,
      containerSizes: containerSize,
      verge: 10,
      loop: false,
      initialIndex: 2,
    };
    core = new ViewerSwipeCore(options);
  });

  describe('constructor & getters', () => {
    it('Should initialize with provided options.', () => {
      expect(core.index).toEqual(2);
      expect(core.isDragging).toEqual(false);
      expect(core.swipeOffset).toEqual(0);
      expect(core['galleryLength']).toEqual(5);
      expect(core['loop']).toEqual(false);
      expect(core['verge']).toEqual(10);
      expect(core['containerSize']).toStrictEqual(containerSize);
      expect(core.onResetView).toBeInstanceOf(Observable);
      expect(core.onSlideChange).toBeInstanceOf(Observable);
    });

    it('Should use default values for missing options.', () => {
      const c = new ViewerSwipeCore({ galleryLength: 3 });
      expect(c.index).toEqual(0);
      expect(c['verge']).toEqual(10);
      expect(c['loop']).toEqual(false);
      expect(c['containerSize']).toStrictEqual({ width: 0, height: 0 });
    });
  });

  describe('normalizeIndex', () => {
    it('Should clamp index within bounds when loop is false.', () => {
      expect(core.normalizeIndex(-1)).toEqual(0);
      expect(core.normalizeIndex(0)).toEqual(0);
      expect(core.normalizeIndex(4)).toEqual(4);
      expect(core.normalizeIndex(5)).toEqual(4);
    });

    it('Should wrap index when loop is true.', () => {
      core.updateOptions({ loop: true });
      expect(core.normalizeIndex(-1)).toEqual(4);
      expect(core.normalizeIndex(5)).toEqual(0);
      expect(core.normalizeIndex(2)).toEqual(2);
    });
  });

  describe('updateIndex', () => {
    it('Should update index and notify when index changes.', () => {
      const slideChangeSpy = vi.fn();
      const resetViewSpy = vi.fn();
      core.onSlideChange.observe(slideChangeSpy);
      core.onResetView.observe(resetViewSpy);

      core.updateIndex(3);
      expect(core.index).toEqual(3);
      expect(slideChangeSpy).toHaveBeenCalledWith(3);
      expect(resetViewSpy).toHaveBeenCalled();
    });

    it('Should not notify onSlideChange if index does not change.', () => {
      const slideChangeSpy = vi.fn();
      core.onSlideChange.observe(slideChangeSpy);

      core.updateIndex(core.index);
      expect(slideChangeSpy).not.toHaveBeenCalled();
    });
  });

  describe('next & prev', () => {
    it('Should increment index with next.', () => {
      core.updateIndex(2);
      core.next();

      expect(core.index).toEqual(3);
    });

    it('Should decrement index with prev.', () => {
      core.updateIndex(2);
      core.prev();

      expect(core.index).toEqual(1);
    });

    it('Should clamp index at bounds when loop is false.', () => {
      core.updateIndex(4);
      core.next();
      expect(core.index).toEqual(4);

      core.updateIndex(0);
      core.prev();
      expect(core.index).toEqual(0);
    });

    it('Should wrap index at bounds when loop is true.', () => {
      core.updateOptions({ loop: true });
      core.updateIndex(4);
      core.next();
      expect(core.index).toEqual(0);

      core.updateIndex(0);
      core.prev();
      expect(core.index).toEqual(4);
    });
  });

  describe('swipeStart', () => {
    it('Should set isDragging true and reset swipeOffset.', () => {
      core.swipeStart(50);

      expect(core.isDragging).toEqual(true);
      expect(core['oldPosition']).toEqual(50);
      expect(core.swipeOffset).toEqual(0);
    });
  });

  describe('swipe', () => {
    beforeEach(() => {
      core.swipeStart(100);
    });

    it('Should update swipeOffset and completeShift if verge exceeded.', () => {
      core.swipe(80); // shift = 20/100*100 = 20%
      expect(core.swipeOffset).toBeCloseTo(20);
      expect(core['completeShift']).toEqual(true);
    });

    it('Should not set completeShift if verge not exceeded.', () => {
      core.swipe(95); // shift = 5/100*100 = 5%
      expect(core.swipeOffset).toBeCloseTo(5);
      expect(core['completeShift']).toEqual(false);
    });

    it('Should do nothing if not dragging.', () => {
      core['_isDragging'] = false;
      core.swipe(50);
      expect(core.swipeOffset).toEqual(0);
    });
  });

  describe('swipeEnd', () => {
    it('Should move to prev if swipeOffset < 0 and completeShift.', () => {
      core.swipeStart(50);
      core['oldPosition'] = 50;
      core.swipe(70); // shift = -20%
      core.swipeEnd();

      expect(core.index).toEqual(1);
      expect(core.swipeOffset).toEqual(0);
      expect(core.isDragging).toEqual(false);
      expect(core['completeShift']).toEqual(false);
    });

    it('Should move to next if swipeOffset > 0 and completeShift.', () => {
      core.swipeStart(50);
      core['oldPosition'] = 50;
      core.swipe(30); // shift = 20%
      core.swipeEnd();

      expect(core.index).toEqual(3);
      expect(core.swipeOffset).toEqual(0);
      expect(core.isDragging).toEqual(false);
      expect(core['completeShift']).toEqual(false);
    });

    it('Should reset swipeOffset if not completeShift.', () => {
      core.swipeStart(50);
      core['oldPosition'] = 50;
      core.swipe(49); // shift = 1%
      core.swipeEnd();

      expect(core.index).toEqual(2);
      expect(core.swipeOffset).toEqual(0);
      expect(core.isDragging).toEqual(false);
      expect(core['completeShift']).toEqual(false);
    });
  });

  describe('updateOptions', () => {
    it('Should update galleryLength and loop.', () => {
      core.updateOptions({ galleryLength: 10, loop: true });

      expect(core['galleryLength']).toEqual(10);
      expect(core['loop']).toEqual(true);
    });

    it('Should not update properties if not provided.', () => {
      core.updateOptions({});

      expect(core['galleryLength']).toEqual(5);
      expect(core['loop']).toEqual(false);
    });
  });

  describe('updateContainerSizes', () => {
    it('Should update containerSize.', () => {
      const newSize = { width: 200, height: 100 };
      core.updateContainerSizes(newSize);

      expect(core['containerSize']).toStrictEqual(newSize);
    });
  });
});
